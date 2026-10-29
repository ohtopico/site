// Tarefas pedidas por voz. Cada uma recebe as detecções de cada quadro em aoQuadro()
// e devolve false quando termina.

import { estaPerto, ladoDe, onde } from "./anunciador.js";
import { falarDistancia } from "./profundidade.js";
import { nomeFalado } from "./vocabulario.js";
import { fotografar } from "./nuvem.js";

const PROCURA_LIMITE_MS = 45000;
const PROCURA_QUADROS = 2;
const VERIFICA_MS = 6000;
const VERIFICA_QUADROS = 2;
// Bem à frente: centro do objeto a menos de 12% do centro da imagem
const CENTRO = 0.12;
const CORPO = 0.12; // meia largura do corredor que a pessoa ocupa, em fração da imagem

/**
 * Há algo entre a pessoa e o alvo? Olha um "corredor" que vai do centro de baixo da imagem
 * (onde a pessoa está) até o alvo. Primeiro objetos reconhecidos mais próximos que o alvo;
 * depois, com o mapa de profundidade, qualquer coisa na altura do corpo bem mais perto que ele.
 * Devolve { nome, metros } ou null.
 */
export function noCaminho(alvo, deteccoes, profundidade, video) {
  const x0 = Math.min(0.5, alvo.cx) - CORPO, x1 = Math.max(0.5, alvo.cx) + CORPO;
  const distAlvo = alvo.metros ?? Infinity;
  const fundoAlvo = (alvo.caixa.originY + alvo.caixa.height) / video.videoHeight;
  const candidatos = deteccoes.filter(d => {
    if (d === alvo || !nomeFalado(d.rotulo)) return false;
    const c = d.caixa;
    const dx0 = c.originX / video.videoWidth, dx1 = (c.originX + c.width) / video.videoWidth;
    if (dx1 < x0 || dx0 > x1) return false;
    // mais perto que o alvo: pela distância, ou, sem ela, por estar mais embaixo na imagem
    return d.metros != null && alvo.metros != null
      ? d.metros < alvo.metros - Math.max(0.5, 0.1 * alvo.metros)
      : (c.originY + c.height) / video.videoHeight > fundoAlvo + 0.05;
  }).sort((a, b) => (a.metros ?? 99) - (b.metros ?? 99));
  if (candidatos.length) return { nome: nomeFalado(candidatos[0].rotulo), metros: candidatos[0].metros };

  if (profundidade?.mapa && isFinite(distAlvo) && fundoAlvo > 0.35) {
    // Da altura do corpo até a linha onde o alvo toca o chão: o chão ali fica atrás do alvo
    const m = profundidade.metros(profundidade.regiao(Math.max(0, x0), Math.min(1, x1), 0.3, fundoAlvo, 0.9));
    if (m != null && m < distAlvo * 0.6 && m < 2.5) return { nome: "algo", metros: m };
  }
  return null;
}

/** "; cuidado, cadeira no caminho, a 1 metro" ou "". */
export function avisoCaminho(bloqueio) {
  if (!bloqueio) return "";
  const dist = falarDistancia(bloqueio.metros);
  return `; cuidado, ${bloqueio.nome} no caminho${dist ? ", " + dist : ""}`;
}


/**
 * "Ache a xícara": procura até ver o objeto em PROCURA_QUADROS quadros seguidos (evita alarme falso),
 * diz onde está e termina. Para ser guiado de novo, a pessoa pede outra vez.
 */
export class Procurar {
  constructor(anunciador, rotulo, alvo, profundidade, video, memoria) {
    this.a = anunciador;
    this.profundidade = profundidade;
    this.video = video;
    this.rotulo = rotulo;
    this.nome = nomeFalado(rotulo) || alvo;
    this.inicio = performance.now();
    this.seguidos = 0;
    this.ultimoBipe = 0;
    // Se a câmera já viu o objeto há pouco, começa dizendo para onde virar
    const lembranca = memoria?.ondeEstava(this.nome);
    this.a.falar(lembranca
      ? `Procurando ${this.nome}. Há pouco ele estava ${lembranca}.`
      : `Procurando ${this.nome}. Gire o celular devagar.`, true);
  }

  get descricao() { return `Procurando: ${this.nome}`; }

  aoQuadro(deteccoes) {
    const agora = performance.now();
    const alvo = deteccoes.find(d => d.rotulo === this.rotulo);
    this.a.aoVerObstaculos(deteccoes.filter(d => d !== alvo), true);

    if (!alvo) {
      this.seguidos = 0;
      if (agora - this.inicio > PROCURA_LIMITE_MS) {
        this.a.falar(`Não encontrei ${this.nome}. Tente em outro lugar.`, true);
        return false;
      }
      // Bipe baixo de vez em quando: ainda estou procurando
      if (agora - this.ultimoBipe > 2000) { this.ultimoBipe = agora; this.a.bipe(400, 0.04); }
      return true;
    }
    if (++this.seguidos < PROCURA_QUADROS) return true;

    const desvio = Math.abs(alvo.cx - 0.5);
    const perto = estaPerto(alvo);
    const dist = falarDistancia(alvo.metros);
    const direcao = desvio < CENTRO ? "bem à frente" : onde(ladoDe(alvo.cx));
    const bloqueio = perto ? null : noCaminho(alvo, deteccoes, this.profundidade, this.video);
    this.a.bipe(1400);
    this.a.vibrar(desvio < CENTRO && perto ? [200] : [80]);
    this.a.falar(`Achei: ${this.nome} ${direcao}${dist ? ", " + dist : perto ? ", perto" : ""}${avisoCaminho(bloqueio)}.`, true);
    return false;
  }
}

/** "Tem um extintor?": olha por alguns segundos e responde sim ou não. */
export class Verificar {
  constructor(anunciador, rotulo, alvo, profundidade, video) {
    this.a = anunciador;
    this.profundidade = profundidade;
    this.video = video;
    this.rotulo = rotulo;
    this.nome = nomeFalado(rotulo) || alvo;
    this.inicio = performance.now();
    this.vezes = 0;
    this.a.falar(`Vou olhar. Gire o celular devagar.`, true);
  }

  get descricao() { return `Verificando: ${this.nome}`; }

  aoQuadro(deteccoes) {
    const alvo = deteccoes.find(d => d.rotulo === this.rotulo);
    if (alvo && ++this.vezes >= VERIFICA_QUADROS) {
      const dist = falarDistancia(alvo.metros);
      const caminho = avisoCaminho(noCaminho(alvo, deteccoes, this.profundidade, this.video));
      this.a.falar(`Sim, tem ${this.nome} ${onde(ladoDe(alvo.cx))}${dist ? ", " + dist : ""}${caminho}.`, true);
      return false;
    }
    if (performance.now() - this.inicio > VERIFICA_MS) {
      this.a.falar(`Não vi ${this.nome} por aqui.`, true);
      return false;
    }
    return true;
  }
}

/**
 * "O que tem na minha frente?": cada objeto com lado e distância, do mais perto para o mais longe,
 * dizendo quando há outra coisa no caminho até ele. No máximo DESCREVER_MAX objetos.
 */
const DESCREVER_MAX = 5;

export function descrever(deteccoes, profundidade, video) {
  const vistos = deteccoes.filter(d => nomeFalado(d.rotulo) && d.confianca >= 0.5)
    .sort((a, b) => (a.metros ?? 99) - (b.metros ?? 99) || b.tamanho - a.tamanho)
    .slice(0, DESCREVER_MAX);
  if (!vistos.length) return "Não reconheço nenhum objeto agora.";
  const partes = vistos.map(d => {
    const dist = falarDistancia(d.metros);
    const bloqueio = noCaminho(d, vistos, profundidade, video);
    const caminho = bloqueio ? `, com ${bloqueio.nome === "algo" ? "algo" : bloqueio.nome} no caminho` : "";
    const nome = nomeFalado(d.rotulo);
    return `${nome[0].toUpperCase()}${nome.slice(1)} ${onde(ladoDe(d.cx))}${dist ? ", " + dist : ""}${caminho}`;
  });
  return `${partes.length > 1 ? "Do mais perto para o mais longe. " : ""}${partes.join(". ")}.`;
}

/**
 * Procura com a IA na nuvem: tira uma foto, pergunta, fala a resposta.
 * Se não encontrou, pede para girar e tenta de novo, até `tentativas` vezes.
 */
const INTERVALO_NUVEM_MS = 2500;

export class ProcurarNaNuvem {
  constructor(anunciador, nuvem, video, alvo, tentativas = 4, memoria = null) {
    this.a = anunciador;
    this.memoria = memoria;
    this.nuvem = nuvem;
    this.video = video;
    this.alvo = alvo;
    this.rotulo = null;
    this.tentativa = 0;
    this.tentativas = tentativas;
    this.ativa = true;
    const lembranca = memoria?.ondeEstava(alvo);
    this.a.falar(lembranca
      ? `Há pouco ${alvo} estava ${lembranca}. Vou confirmar; segure o celular parado.`
      : `Procurando ${alvo}. Segure o celular parado.`, true);
    this.perguntar();
  }

  get descricao() { return `Procurando (IA): ${this.alvo}, tentativa ${this.tentativa}`; }

  async perguntar() {
    if (!this.ativa) return;
    this.tentativa++;
    try {
      const r = await this.nuvem.perguntar(await fotografar(this.video), this.alvo);
      if (!this.ativa) return;
      if (r.encontrado) {
        // Guarda na memória curta, para "onde estava a saída?" depois que ela sair da câmera
        const angulo = { esquerda: -25, frente: 0, direita: 25 }[r.lado] ?? 0;
        const metros = { perto: 1, medio: 3, longe: 6 }[r.distancia] ?? null;
        this.memoria?.anotar(this.alvo, angulo, metros);
        if (r.lado === "frente" && r.distancia === "perto") this.a.vibrar([200]);
        this.a.falar(r.resposta || `${this.alvo} ${onde(r.lado) ?? ""}`, true);
        this.ativa = false;
        return;
      }
      if (this.tentativa >= this.tentativas) {
        this.a.falar(`Não encontrei ${this.alvo}. Tente em outro lugar.`, true);
        this.ativa = false;
        return;
      }
      this.a.falar("Não vi. Gire um pouco e espere.", true);
      setTimeout(() => this.perguntar(), INTERVALO_NUVEM_MS);
    } catch (erro) {
      if (!this.ativa) return;
      this.ativa = false;
      this.a.falar(erro?.code === "not_granted" ? "A IA não foi autorizada." : "Não consegui falar com a IA. Verifique a internet.", true);
    }
  }

  // A tarefa vive enquanto houver pergunta em andamento; obstáculos perto continuam sendo avisados
  aoQuadro(deteccoes) {
    this.a.aoVerObstaculos(deteccoes, true);
    return this.ativa;
  }

  cancelar() { this.ativa = false; }
}
