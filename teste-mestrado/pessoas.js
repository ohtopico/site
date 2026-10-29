// Reconhecer pessoas cadastradas. Só com consentimento falado da própria pessoa cadastrada.
// O rosto vira um vetor de 128 números (face-api, modelo de reconhecimento facial) guardado
// apenas neste celular, em texto (JSON) no armazenamento do navegador, junto com o nome.
// Nada é enviado para a internet; "apagar pessoa <nome>" remove o vetor.

import { onde, ladoDe } from "./anunciador.js";
import { falarDistancia } from "./profundidade.js";
import { normalizar } from "./vocabulario.js";

const CHAVE = "assistencia.pessoas";
const LIMIAR = 0.55;           // distância euclidiana máxima entre vetores para dizer que é a mesma pessoa
const AMOSTRAS = 5;            // vetores tirados no cadastro, guardados junto com a média
const AMOSTRAS_MINIMAS = 3;    // se o tempo acabar com pelo menos isso, o cadastro vale assim mesmo
const CADASTRO_LIMITE_MS = 25000; // sem nenhuma amostra nova nesse tempo, desiste (no celular cada amostra pode levar segundos)
const INTERVALO_MS = 1200;     // reconhecimento em segundo plano no máximo a cada 1,2 s
const ESPERA_MESMA_PESSOA_MS = 30000;

// ---------- Guardar ------------------------------------------------------------------

export function listarPessoas() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; }
}
function salvar(lista) {
  try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch {}
}
export function apagarPessoa(nome) {
  const alvo = normalizar(nome);
  const p = listarPessoas().find(x => normalizar(x.nome) === alvo || normalizar(x.nome).includes(alvo));
  if (p) salvar(listarPessoas().filter(x => x.nome !== p.nome));
  return p;
}

// ---------- Modelos (carregados só quando alguém usa) --------------------------------

let faceapi;
function carregar() {
  faceapi ??= import("./vendor/face-api/face-api.esm.js").then(async f => {
    await f.tf.setBackend("webgl").catch(() => f.tf.setBackend("cpu"));
    await f.tf.ready();
    const url = new URL("./modelos/rostos/", import.meta.url).href;
    await Promise.all([
      f.nets.tinyFaceDetector.loadFromUri(url),
      f.nets.faceLandmark68TinyNet.loadFromUri(url),
      f.nets.faceRecognitionNet.loadFromUri(url),
    ]);
    return f;
  });
  return faceapi;
}

/** Rostos no quadro: [{ vetor: Float32Array, cx, altura }], do maior para o menor. */
async function rostos(video) {
  const f = await carregar();
  const achados = await f.detectAllFaces(video, new f.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
    .withFaceLandmarks(true).withFaceDescriptors();
  return achados.map(r => ({
    vetor: r.descriptor,
    cx: (r.detection.box.x + r.detection.box.width / 2) / video.videoWidth,
    altura: r.detection.box.height / video.videoHeight,
  })).sort((a, b) => b.altura - a.altura);
}

function distancia(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
  return Math.sqrt(s);
}

/** Nome da pessoa cadastrada mais parecida, ou null. Compara com a média e com cada amostra guardada. */
function identificar(vetor, pessoas) {
  let melhor = null, menor = LIMIAR;
  for (const p of pessoas) {
    for (const v of [p.vetor, ...(p.amostras ?? [])]) {
      const d = distancia(vetor, v);
      if (d < menor) { menor = d; melhor = p.nome; }
    }
  }
  return melhor;
}

const media = vetores => vetores[0].map((_, i) => vetores.reduce((s, v) => s + v[i], 0) / vetores.length);
const arredondar = v => v.map(x => +x.toFixed(5));

function guardarPessoa(nome, vetores, forma) {
  salvar([...listarPessoas().filter(p => normalizar(p.nome) !== normalizar(nome)), {
    nome, vetor: arredondar(media(vetores)), amostras: vetores.map(arredondar),
    consentimento: new Date().toISOString(), ...(forma && { forma }),
  }]);
}

// ---------- Cadastro por fotos (tela de configuração) --------------------------------

/**
 * Cadastro feito por quem ajuda, com fotos da galeria: útil quando a pessoa não está presente.
 * Quem cadastra declara que a pessoa concordou (caixa obrigatória na tela).
 * Devolve { usadas, total }: quantas fotos tinham um rosto aproveitável.
 */
export async function cadastrarPorFotos(nome, arquivos) {
  const f = await carregar();
  const vetores = [];
  for (const arquivo of arquivos) {
    const img = new Image();
    img.src = URL.createObjectURL(arquivo);
    try {
      await img.decode();
      const achados = await f.detectAllFaces(img, new f.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 }))
        .withFaceLandmarks(true).withFaceDescriptors();
      // Numa foto com várias pessoas, vale o maior rosto
      const maior = achados.sort((a, b) => b.detection.box.height - a.detection.box.height)[0];
      if (maior) vetores.push(Array.from(maior.descriptor));
    } catch {} finally {
      URL.revokeObjectURL(img.src);
    }
  }
  if (vetores.length) guardarPessoa(nome, vetores, "fotos");
  return { usadas: vetores.length, total: arquivos.length };
}

// ---------- Cadastro (tarefa) --------------------------------------------------------

/**
 * "Cadastrar pessoa Maria": primeiro pede o consentimento da própria Maria (sim/não falado),
 * depois tira AMOSTRAS vetores do maior rosto visível e guarda a média.
 */
export class Cadastro {
  constructor(anunciador, video, nome) {
    this.a = anunciador;
    this.video = video;
    this.nome = nome.trim();
    this.etapa = "consentimento";
    this.amostras = [];
    this.ativa = true;
    carregar(); // já vai baixando os modelos enquanto a pessoa responde
    this.a.falar(`Para cadastrar ${this.nome}, a própria pessoa precisa concordar. ` +
      `${this.nome}, você concorda em ter seu rosto guardado só neste celular, podendo apagar quando quiser? ` +
      "Toque na tela e diga sim ou não.", true);
  }

  get descricao() {
    return this.etapa === "consentimento" ? `Cadastro de ${this.nome}: aguardando consentimento`
      : `Cadastro de ${this.nome}: ${this.amostras.length} de ${AMOSTRAS} amostras`;
  }

  /** Recebe o sim ou não do consentimento. Devolve true se a resposta era para o cadastro. */
  aoResponder(tipo) {
    if (this.etapa !== "consentimento") return false;
    if (tipo === "nao") {
      this.a.falar(`Tudo bem, ${this.nome} não foi cadastrado.`, true);
      this.ativa = false;
      return true;
    }
    this.etapa = "captura";
    this.inicio = performance.now();
    this.a.falar(`Obrigado. Aponte o celular para o rosto de ${this.nome}, a um braço de distância. ` +
      `Cada bipe é uma foto; são ${AMOSTRAS}.`, true);
    return true;
  }

  aoQuadro() {
    if (!this.ativa) return false;
    if (this.etapa !== "captura" || this.ocupado) return true;
    // O prazo conta desde a última foto boa (ou do começo) e só depois que a instrução terminou de ser falada
    if (this.a.ocupado()) this.inicio = performance.now();
    if (performance.now() - this.inicio > CADASTRO_LIMITE_MS) {
      if (this.amostras.length >= AMOSTRAS_MINIMAS) { this.concluir(); return false; }
      this.a.falar(`Não consegui ver o rosto de ${this.nome} direito. Tente de novo com mais luz.`, true);
      this.ativa = false;
      return false;
    }
    this.ocupado = true;
    rostos(this.video).then(achados => {
      const rosto = achados[0];
      if (!rosto || rosto.altura < 0.15 || !this.ativa) return;
      this.amostras.push(Array.from(rosto.vetor));
      this.inicio = performance.now();
      this.a.bipe(700 + 100 * this.amostras.length, 0.06);
      if (this.amostras.length >= AMOSTRAS) this.concluir();
    }).catch(() => {}).finally(() => { setTimeout(() => { this.ocupado = false; }, 400); });
    return true;
  }

  concluir() {
    if (!this.ativa) return;
    guardarPessoa(this.nome, this.amostras);
    this.a.falar(`Pronto, ${this.nome} foi cadastrado. Para apagar, diga apagar pessoa ${this.nome}.`, true);
    this.ativa = false;
  }

  cancelar() { this.ativa = false; }
}

// ---------- Reconhecimento em segundo plano --------------------------------------------

export class Reconhecedor {
  constructor(anunciador, memoria) {
    this.a = anunciador;
    this.memoria = memoria;
    this.ultimo = 0;
    this.ocupado = false;
  }

  /**
   * Chamado a cada quadro. Só roda se há pessoas cadastradas e o detector viu alguém
   * grande o bastante para o rosto ser reconhecível.
   */
  aoQuadro(deteccoes, video) {
    const pessoas = listarPessoas();
    if (!pessoas.length || this.ocupado || performance.now() - this.ultimo < INTERVALO_MS) return;
    const gente = deteccoes.filter(d => d.rotulo === "person" && d.tamanho > 0.25);
    if (!gente.length) return;
    this.ultimo = performance.now();
    this.ocupado = true;
    rostos(video).then(achados => {
      for (const r of achados) {
        const nome = identificar(r.vetor, pessoas);
        if (!nome) continue;
        // a distância vem da caixa "pessoa" do detector que contém o rosto
        const corpo = gente.find(d => Math.abs(d.cx - r.cx) < 0.15);
        const dist = falarDistancia(corpo?.metros);
        this.memoria?.anotar(nome, (r.cx - 0.5) * 50, corpo?.metros ?? null);
        this.a.falarUmaVez(`${nome} ${onde(ladoDe(r.cx))}${dist ? ", " + dist : ""}`, ESPERA_MESMA_PESSOA_MS, false, `pessoa|${nome}`);
      }
    }).catch(() => {}).finally(() => { this.ocupado = false; });
  }

  /** "Quem está aqui?": responde na hora. */
  async quemEsta(video) {
    const pessoas = listarPessoas();
    const achados = await rostos(video);
    if (!achados.length) return "Não vejo nenhum rosto agora.";
    const conhecidos = [], desconhecidos = [];
    for (const r of achados) {
      const nome = pessoas.length ? identificar(r.vetor, pessoas) : null;
      (nome ? conhecidos : desconhecidos).push(nome ? `${nome} ${onde(ladoDe(r.cx))}` : r);
    }
    const partes = [...conhecidos];
    if (desconhecidos.length) {
      partes.push(desconhecidos.length === 1 ? "uma pessoa que não conheço" : `${desconhecidos.length} pessoas que não conheço`);
    }
    return `Vejo ${partes.join(" e ")}.`;
  }
}
