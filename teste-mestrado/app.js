import { Anunciador } from "./anunciador.js";
import { interpretar } from "./comandos.js";
import { Detector, DetectorExtra, ClassificadorCena } from "./modelos.js";
import { abrirNuvem, fotografar, lerChave, salvarChave } from "./nuvem.js";
import { abrirCamera } from "./camera.js";
import { Memoria } from "./memoria.js";
import { apagarLugar, descreverLugar, lembrarLugar, listarLugares, ondeEstou } from "./lugares.js";
import { Cadastro, Reconhecedor as ReconhecedorRostos, apagarPessoa, cadastrarPorFotos, listarPessoas } from "./pessoas.js";
import { Gravacao, SeguirPercurso, Sensores, acharPercurso, apagar, listar, renomear } from "./percursos.js";
import { Profundidade, definirGrandeAngular, distanciaPorTamanho, falarDistancia } from "./profundidade.js";
import { Procurar, ProcurarNaNuvem, Verificar, descrever } from "./tarefas.js";
import { adicionarObjetos, nomeFalado, normalizar } from "./vocabulario.js";
import { GRUPOS, falaDoGrupo, falaDoMenu, grupoDaFrase, montarListaDeComandos } from "./menu.js";
import { NavegarRua, buscarLugar, descreverPerto, direcaoFalada, distanciaM, erroGps, lugaresPerto, metrosFalados,
  posicaoAtual, rotaAPe, rumoEntre } from "./rua.js";

const $ = id => document.getElementById(id);
const video = $("video"), caixas = $("caixas"), estado = $("estado"), botao = $("pausar");
const QUADRO_MS = 200; // ~5 análises por segundo
// Tutorial em partes curtas: mostrado em lista (para o leitor de tela) e falado com pausas entre as partes
const TUTORIAL = [
  "Este site usa inteligência artificial para reconhecer o ambiente pela câmera do celular. " +
    "Ela identifica objetos, estima a que distância eles estão e avisa o que está no caminho.",
  "Segure o celular na altura do peito, com a câmera de trás virada para a frente.",
  "Para pedir algo, toque em qualquer lugar da tela e fale depois do bipe. Por exemplo: cadê a xícara, " +
    "ache a chave, tem um extintor, o que tem na minha frente, ou o caminho está livre.",
  "Dentro de um prédio, posso gravar um percurso e depois guiar você por ele: diga gravar percurso e um nome. " +
    "Para ler um livro, placa ou rótulo, diga leia este texto e segure o celular acima dele. " +
    "Na rua, diga que prédio é esse, onde fica a reitoria, ou me leva até e o nome do lugar, que eu guio você a pé pelo GPS.",
  "Eu lembro do que passou pela câmera no último minuto: pergunte o que eu passei, ou onde estava a porta. " +
    "Também guardo lugares, dizendo lembrar este lugar como cozinha, e depois respondo onde estou. " +
    "Posso reconhecer pessoas conhecidas, se elas concordarem: diga cadastrar pessoa e o nome. " +
    "Tudo isso fica só neste celular.",
  "Diga parar para cancelar, e menu para conhecer todos os comandos, separados por grupos. A distância é aproximada: " +
    "continue usando a bengala ou o cão-guia.",
];
const EXPLICACAO = TUTORIAL.join(" ");
// Subir a cada atualização publicada (número do PR): aparece no canto da tela
const VERSAO = "v44 · 29/10";
$("versao").textContent = VERSAO;
$("versao").setAttribute("aria-label", `Versão ${VERSAO.replace(/^v/, "").replace(" · ", ", de ")}`);

// Marca de 1 byte no navegador: quem já usou não ouve de novo a introdução nem a pergunta do tutorial
const TUTORIAL_OUVIDO = "assistencia.tutorial_ouvido";
const tutorialOuvido = () => { try { return localStorage.getItem(TUTORIAL_OUVIDO) === "1"; } catch { return false; } };
const marcarTutorialOuvido = () => { try { localStorage.setItem(TUTORIAL_OUVIDO, "1"); } catch {} };

const anunciador = new Anunciador();
let detector, extra = null, cena, profundidade = null, nuvem = null, tarefa = null, gravacao = null;
let leitura = null; // { cancelada } enquanto lê um texto em voz alta
let pausado = false, ouvindo = false, processando = false, aguardandoIntro = false, aguardandoGrupo = false;
let aguardandoNomePercurso = null; // nome provisório do percurso gravado sem nome
let ultimasDeteccoes = [], ultimaCena = null, espaco = null, ultimoQuadro = 0, quadros = 0;
const sensores = new Sensores();
const memoria = new Memoria(sensores);
const reconhecedor = new ReconhecedorRostos(anunciador, memoria);
const nomeProprio = n => n.trim().replace(/(^|\s)\p{L}/gu, l => l.toUpperCase());

$("comecar").addEventListener("click", comecar);
$("tutorial-comecar").addEventListener("click", comecar);
$("tutorial").addEventListener("click", abrirTutorial);
$("tutorial-voltar").addEventListener("click", fecharTutorial);
$("comecar").focus();
montarListaDeComandos($("lista-comandos"));

// Os modelos começam a baixar assim que a página abre, enquanto a pessoa ouve as boas-vindas;
// a profundidade, mais pesada, vem depois do detector e não segura o início.
const preparo = Promise.all([
  Detector.carregar(), ClassificadorCena.carregar().catch(() => null), abrirNuvem(),
]);
preparo.then(() => Profundidade.carregar()).then(p => { profundidade = p; }).catch(() => {});
// Detector treinado com a lista de objetos (opcional): os nomes dele entram no vocabulário dos pedidos
DetectorExtra.carregar().then(d => {
  if (!d) return;
  adicionarObjetos(d.nomesAtivos);
  extra = d;
}).catch(() => {});

// Boas-vindas faladas ao abrir. A maioria dos celulares só deixa o site falar depois de um toque,
// então isto às vezes não toca; para esses casos os rótulos dos botões dizem o mesmo pelo leitor de tela.
const BOAS_VINDAS = "Assistência por voz. Há dois botões grandes: Começar, em cima, e Como funciona, embaixo.";
const BOAS_VINDAS_DE_VOLTA = "Assistência por voz. Toque em Começar.";
let iniciado = false;
addEventListener("load", () => setTimeout(() => {
  if (!iniciado && $("tela-tutorial").hidden) anunciador.falar(tutorialOuvido() ? BOAS_VINDAS_DE_VOLTA : BOAS_VINDAS);
}, 600));

// --- Tutorial ----------------------------------------------------------------------

let tutorialAtivo = 0; // muda a cada abertura, para uma leitura antiga parar sozinha

function abrirTutorial() {
  anunciador.bipe(1, 0.01); // libera o áudio no iPhone
  $("inicio").hidden = true;
  $("tela-tutorial").hidden = false;
  const lista = $("partes");
  lista.replaceChildren(...TUTORIAL.map(t => Object.assign(document.createElement("li"), { textContent: t })));
  $("titulo-tutorial").focus();
  lerTutorial(++tutorialAtivo);
}

async function lerTutorial(id) {
  speechSynthesis.cancel();
  const itens = [...$("partes").children];
  for (const [i, texto] of TUTORIAL.entries()) {
    if (id !== tutorialAtivo) return;
    itens.forEach((li, j) => li.classList.toggle("falando", j === i));
    await falarEsperando(texto);
    await new Promise(r => setTimeout(r, 900)); // pausa entre as partes
  }
  if (id !== tutorialAtivo) return;
  itens.forEach(li => li.classList.remove("falando"));
  marcarTutorialOuvido();
  await falarEsperando("Fim do tutorial. Para começar, toque no botão Começar agora, logo abaixo.");
}

/** Fala e espera terminar (com limite, porque alguns navegadores não avisam o fim). */
function falarEsperando(texto) {
  return new Promise(ok => {
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "pt-BR";
    if (anunciador.voz) u.voice = anunciador.voz;
    u.rate = anunciador.velocidade;
    u.onend = u.onerror = ok;
    setTimeout(ok, 1500 + texto.length * 90 / anunciador.velocidade);
    speechSynthesis.speak(u);
  });
}

function fecharTutorial() {
  tutorialAtivo++;
  speechSynthesis.cancel();
  $("tela-tutorial").hidden = true;
  $("inicio").hidden = false;
  $("comecar").focus();
}

// Chave da API: só aparece fora do Claude, onde a IA não vem da conta de quem está vendo
const campoChave = $("chave");
campoChave.value = lerChave();
campoChave.addEventListener("change", () => salvarChave(campoChave.value.trim()));
window.claude?.use?.("sample").then(s => { if (s) $("campo-chave").hidden = true; }).catch(() => {});

// Memória em texto: percursos, lugares e pessoas num arquivo .txt (JSON), para backup ou outro celular
const CHAVES_MEMORIA = ["assistencia.percursos", "assistencia.lugares", "assistencia.pessoas"];
$("exportar").addEventListener("click", () => {
  const dados = {};
  for (const k of CHAVES_MEMORIA) { try { dados[k] = JSON.parse(localStorage.getItem(k)) || []; } catch { dados[k] = []; } }
  const link = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(new Blob([JSON.stringify(dados, null, 1)], { type: "text/plain" })),
    download: "memoria-assistencia.txt",
  });
  link.click();
  URL.revokeObjectURL(link.href);
});
$("importar").addEventListener("change", async e => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;
  try {
    const dados = JSON.parse(await arquivo.text());
    for (const k of CHAVES_MEMORIA) if (Array.isArray(dados[k])) localStorage.setItem(k, JSON.stringify(dados[k]));
    $("aviso").textContent = "Memória importada.";
  } catch {
    $("aviso").textContent = "Arquivo inválido.";
  }
});
// Cadastro de pessoa por fotos da galeria, feito por quem ajuda
function mostrarPessoas() {
  $("lista-pessoas").replaceChildren(...listarPessoas().map(p => {
    const li = document.createElement("li");
    const apagar = Object.assign(document.createElement("button"), { type: "button", className: "pilula", textContent: "Apagar" });
    apagar.setAttribute("aria-label", `Apagar ${p.nome}`);
    apagar.addEventListener("click", () => { apagarPessoa(p.nome); mostrarPessoas(); });
    li.append(`${p.nome} `, apagar);
    return li;
  }));
}
mostrarPessoas();
$("pessoa-fotos").addEventListener("change", e => {
  const n = e.target.files.length;
  $("pessoa-estado").textContent = n ? `${n} ${n === 1 ? "foto escolhida" : "fotos escolhidas"}.` : "";
});
$("form-pessoa").addEventListener("submit", async e => {
  e.preventDefault();
  const nome = nomeProprio($("pessoa-nome").value);
  const fotos = [...$("pessoa-fotos").files].slice(0, 5);
  const estadoPessoa = $("pessoa-estado");
  if (!fotos.length) { estadoPessoa.textContent = "Escolha pelo menos uma foto."; return; }
  if (!nome || !$("pessoa-concorda").checked) return;
  estadoPessoa.textContent = "Analisando as fotos…";
  try {
    const { usadas, total } = await cadastrarPorFotos(nome, fotos);
    estadoPessoa.textContent = usadas
      ? `${nome} cadastrado com ${usadas} de ${total} ${total === 1 ? "foto" : "fotos"}.`
      : "Não achei um rosto nas fotos. Tente fotos de frente, com mais luz.";
    if (usadas) e.target.reset();
  } catch {
    estadoPessoa.textContent = "Não consegui analisar as fotos agora. Verifique a internet e tente de novo.";
  }
  mostrarPessoas();
});

botao.addEventListener("click", ouvir);
$("digitar").addEventListener("submit", e => {
  e.preventDefault();
  const campo = $("comando");
  if (campo.value.trim()) executar(campo.value);
  campo.value = "";
});

async function comecar() {
  if (iniciado) return;
  iniciado = true;
  tutorialAtivo++;
  const aviso = $("aviso");
  aviso.textContent = "Carregando…";
  if (!tutorialOuvido()) anunciador.falar("Carregando, um momento.", true);
  anunciador.bipe(1, 0.01); // libera o áudio no iPhone, que só toca depois de um toque
  const permissaoSensores = Sensores.pedirPermissao(); // também precisa vir direto do toque
  try {
    const camera = abrirCamera();
    [[detector, cena, nuvem]] = await Promise.all([preparo, permissaoSensores]);
    sensores.ligar();
    const { stream, grandeAngular } = await camera;
    definirGrandeAngular(grandeAngular);
    video.srcObject = stream;
    await video.play();
  } catch (erro) {
    const msg = erro.name === "NotAllowedError"
      ? "Sem permissão da câmera, o site não funciona."
      : `Não consegui iniciar: ${erro.message}`;
    aviso.textContent = msg;
    anunciador.falar(msg, true);
    iniciado = false;
    return;
  }
  navigator.wakeLock?.request("screen").catch(() => {}); // tela acesa durante o trajeto
  $("inicio").hidden = true;
  $("tela-tutorial").hidden = true;
  $("uso").hidden = false;
  if (!Reconhecedor || location.search.includes("teclado")) $("digitar").classList.add("visivel");
  botao.focus();
  anunciador.bipe(880, 0.1);
  anunciador.falar("Pronto.", true);
  // Um respiro antes da próxima instrução; o tutorial só é oferecido a quem ainda não ouviu
  setTimeout(() => {
    if (ouvindo || tarefa) return;
    if (tutorialOuvido()) {
      anunciador.falar("Toque na tela e diga o que procura, ou diga menu.");
    } else {
      aguardandoIntro = true;
      marcarTutorialOuvido(); // a pergunta só é feita uma vez; depois, "como funciona" ou "menu"
      anunciador.falar("Quer ouvir como o site funciona? Toque na tela e diga sim ou não. Depois, diga como funciona quando quiser.");
    }
  }, 2000);
  requestAnimationFrame(laco);
}

async function laco(agora) {
  requestAnimationFrame(laco);
  if (pausado || ouvindo || leitura || processando || agora - ultimoQuadro < QUADRO_MS || video.readyState < 2) return;
  ultimoQuadro = agora;
  processando = true;
  try {
    ultimasDeteccoes = detector.detectar(video, agora);
    if (extra) {
      ultimasDeteccoes = ultimasDeteccoes.concat(await extra.detectar(video)).sort((a, b) => b.tamanho - a.tamanho);
    }
    // Profundidade a cada 2 quadros (~2,5 por segundo): é o modelo mais pesado
    if (profundidade && quadros++ % 2 === 0) {
      await profundidade.estimar(video);
      profundidade.calibrar(ultimasDeteccoes, video);
      espaco = profundidade.espacoLivre();
    }
    for (const d of ultimasDeteccoes) {
      d.metros = distanciaPorTamanho(d, video) ?? profundidade?.distanciaDe(d, video) ?? null;
    }
    memoria.registrar(ultimasDeteccoes, video);
    reconhecedor.aoQuadro(ultimasDeteccoes, video); // não espera: roda em paralelo, no máximo a cada 1,2 s
    gravacao?.aoQuadro(ultimasDeteccoes);
    if (tarefa) {
      if (!tarefa.aoQuadro(ultimasDeteccoes)) tarefa = null;
      anunciador.aoVerEspaco(espaco, false, true);
    } else {
      // Andando: só paredes, obstáculos à frente e "dá para virar". Os objetos são ditos quando a pessoa
      // pede ("o que tem na minha frente"); o ambiente fica guardado para "onde estou".
      anunciador.aoVerEspaco(espaco, false);
      if (cena) ultimaCena = await cena.classificar(video);
    }
    desenhar();
  } finally {
    processando = false;
  }
}

// --- Voz ---------------------------------------------------------------------------

const Reconhecedor = window.SpeechRecognition || window.webkitSpeechRecognition;

// Microfone com redução de ruído do próprio celular. O Chrome mais novo aceita entregar esse áudio
// ao reconhecimento de voz (start com a trilha); os mais antigos ignoram e usam o microfone direto.
// Se o celular não deixar os dois usarem o microfone juntos, desliga isso de vez neste aparelho.
const SEM_MIC_LIMPO = "assistencia.sem_mic_limpo";
async function microfoneLimpo() {
  try { if (localStorage.getItem(SEM_MIC_LIMPO)) return null; } catch {}
  try {
    const s = await navigator.mediaDevices.getUserMedia({
      audio: { noiseSuppression: true, echoCancellation: true, autoGainControl: true, channelCount: 1 },
    });
    return s.getAudioTracks()[0] ?? null;
  } catch { return null; }
}

// Com barulho, o reconhecimento às vezes ouve outra coisa primeiro: das alternativas, vale a
// primeira que é um comando conhecido.
function melhorAlternativa(resultado) {
  const frases = Array.from(resultado, a => a.transcript);
  return frases.find(f => interpretar(f).tipo !== "desconhecido") ?? frases[0];
}

async function ouvir() {
  if (!Reconhecedor) {
    $("comando").focus();
    return;
  }
  if (ouvindo) return;
  ouvindo = true;
  document.body.classList.add("ouvindo");
  if (leitura) leitura.cancelada = true;
  leitura = null;
  anunciador.calar();
  anunciador.bipe(660, 0.12);
  mostrar("Ouvindo…");
  const r = new Reconhecedor();
  r.lang = "pt-BR";
  r.interimResults = false;
  r.maxAlternatives = 4;
  let entendeu = false;
  r.onresult = e => {
    entendeu = true;
    ouvindo = false;
    document.body.classList.remove("ouvindo");
    executar(melhorAlternativa(e.results[0]));
  };
  let tentarDeNovo = false;
  r.onerror = e => {
    if (e.error === "audio-capture" && trilha) {
      try { localStorage.setItem(SEM_MIC_LIMPO, "1"); } catch {}
      tentarDeNovo = true;
      return;
    }
    if (e.error === "not-allowed") anunciador.falar("Sem permissão do microfone.", true);
  };
  const trilha = await microfoneLimpo();
  r.onend = () => {
    trilha?.stop();
    ouvindo = false;
    document.body.classList.remove("ouvindo");
    if (tentarDeNovo) { ouvir(); return; }
    if (!entendeu) anunciador.falar("Não ouvi. Toque e fale de novo.", true);
  };
  try { r.start(trilha ?? undefined); } catch { r.start(); }
}

function executar(frase) {
  // Logo depois do menu, basta dizer o nome do grupo ("rua")
  const grupo = aguardandoGrupo ? grupoDaFrase(normalizar(frase)) : null;
  aguardandoGrupo = false;
  let pedido = grupo ? { tipo: "menu", grupo: grupo.nome } : interpretar(frase);
  // Logo depois de salvar um percurso sem nome, a próxima frase é o nome dele (a não ser que seja "não")
  const provisorio = aguardandoNomePercurso;
  aguardandoNomePercurso = null;
  if (provisorio && pedido.tipo === "nao") {
    anunciador.falar(`Tudo bem, ficou ${provisorio}.`, true);
    return;
  }
  if (provisorio && !["parar", "menu"].includes(pedido.tipo)) {
    const nome = frase.trim().replace(/^(o |a |pode ser |chama |se chama |nome )+/i, "").replace(/[.!?]+$/, "");
    mostrar(`“${frase}”`);
    anunciador.falar(renomear(provisorio, nome) ? `Percurso ${nome} salvo. Para usar, diga seguir percurso ${nome}.`
      : `Ficou ${provisorio}.`, true);
    return;
  }
  // Gravando, "parar" e "pronto" encerram a gravação (a não ser que haja uma busca em andamento)
  if (gravacao && !tarefa && pedido.tipo === "parar") pedido = { tipo: "terminar" };
  mostrar(`“${frase}”`);
  // Sim/não durante um cadastro é o consentimento da pessoa, não resposta ao tutorial
  if ((pedido.tipo === "sim" || pedido.tipo === "nao") && tarefa?.aoResponder?.(pedido.tipo)) return;
  const intro = aguardandoIntro;
  aguardandoIntro = false;
  switch (pedido.tipo) {
    case "sim":
    case "explicar":
      if (intro || pedido.tipo === "explicar") {
        anunciador.falar(`${EXPLICACAO} Agora é com você: toque na tela e diga o que procura.`, true);
        marcarTutorialOuvido();
      }
      else anunciador.falar("Ok.");
      return;
    case "nao":
      anunciador.falar(intro ? "Tudo bem. Toque na tela e diga o que procura." : "Ok.", true);
      return;
    case "procurar":
    case "verificar":
      if (pausado) definirPausa(false, "calado");
      tarefa?.cancelar?.();
      if (!pedido.rotulo) {
        // Fora dos objetos do detector local: pergunta à IA na nuvem
        if (!nuvem) {
          anunciador.falar(`Ainda não sei reconhecer ${pedido.alvo} sem a IA na nuvem.`, true);
          return;
        }
        tarefa = new ProcurarNaNuvem(anunciador, nuvem, video, pedido.alvo, pedido.tipo === "verificar" ? 2 : 4, memoria);
        return;
      }
      tarefa = pedido.tipo === "procurar"
        ? new Procurar(anunciador, pedido.rotulo, pedido.alvo, profundidade, video, memoria)
        : new Verificar(anunciador, pedido.rotulo, pedido.alvo, profundidade, video);
      return;
    case "descrever":
      anunciador.falar(descrever(ultimasDeteccoes, profundidade, video), true);
      return;
    case "lembrar":
      anunciador.falar(memoria.resumo(new Set(ultimasDeteccoes.map(d => nomeFalado(d.rotulo)))), true);
      return;
    case "livre":
      anunciador.falar(descreverEspaco(), true);
      return;
    case "gravar":
      if (gravacao) {
        anunciador.falar(`Já estou gravando ${gravacao.nome}. Diga terminar gravação primeiro.`, true);
        return;
      }
      gravacao = new Gravacao(anunciador, sensores, pedido.nome);
      return;
    case "terminar":
      if (!gravacao) {
        anunciador.falar("Não há gravação em andamento.", true);
        return;
      }
      if (gravacao.terminar() && gravacao.semNome) aguardandoNomePercurso = gravacao.nome;
      gravacao = null;
      return;
    case "seguir":
    case "voltar": {
      const percurso = pedido.nome ? acharPercurso(pedido.nome) : listar().length === 1 ? listar()[0] : null;
      if (!percurso) {
        anunciador.falar(`Não achei o percurso ${pedido.nome}. ${nomesDosPercursos()}`, true);
        return;
      }
      tarefa?.cancelar?.();
      tarefa = new SeguirPercurso(anunciador, sensores, percurso, pedido.tipo === "voltar");
      return;
    }
    case "listar":
      anunciador.falar(nomesDosPercursos(), true);
      return;
    case "apagar": {
      const apagado = apagar(pedido.nome);
      anunciador.falar(apagado ? `Percurso ${apagado.nome} apagado.` : `Não achei o percurso ${pedido.nome}.`, true);
      return;
    }
    case "lugar": {
      const nome = pedido.nome || `lugar ${listarLugares().length + 1}`;
      const visiveis = new Set(ultimasDeteccoes.map(d => nomeFalado(d.rotulo)).filter(Boolean));
      const objetos = [...visiveis].map(n => ({ nome: n, onde: memoria.ondeEstava(n)?.split(",")[0] ?? "" }));
      // inclui o que passou pela câmera no último minuto, para o lugar não depender de um só ângulo
      for (const [n] of memoria.itens) if (!visiveis.has(n)) objetos.push({ nome: n, onde: memoria.ondeEstava(n)?.split(",")[0] ?? "" });
      const registro = lembrarLugar(nome, objetos);
      anunciador.falar(`Lugar ${nome} guardado, com ${registro.objetos.length} ${registro.objetos.length === 1 ? "objeto" : "objetos"}.`, true);
      if (nuvem) fotografar(video).then(f => nuvem.descreverLugar(f)).then(d => descreverLugar(nome, d)).catch(() => {});
      return;
    }
    case "ondeEstou": {
      const vistos = [...new Set([...ultimasDeteccoes.map(d => nomeFalado(d.rotulo)), ...memoria.itens.keys()])].filter(Boolean);
      const lugar = ondeEstou(vistos);
      anunciador.falar(lugar ? `Parece ${lugar.nome}. ${lugar.texto.split(": ")[1] ?? ""}`
        : listarLugares().length ? "Não reconheço este lugar. Para guardar, diga lembrar este lugar como e um nome."
          : "Ainda não há lugares guardados. Diga lembrar este lugar como e um nome.", true);
      return;
    }
    case "apagarLugar": {
      const l = apagarLugar(pedido.nome);
      anunciador.falar(l ? `Lugar ${l.nome} apagado.` : `Não achei o lugar ${pedido.nome}.`, true);
      return;
    }
    case "listarLugares": {
      const nomes = listarLugares().map(l => l.nome);
      anunciador.falar(nomes.length ? `Lugares guardados: ${nomes.join(", ")}.` : "Ainda não há lugares guardados.", true);
      return;
    }
    case "cadastrar":
      if (!pedido.nome) {
        anunciador.falar("Diga cadastrar pessoa e o nome dela.", true);
        return;
      }
      tarefa?.cancelar?.();
      tarefa = new Cadastro(anunciador, video, nomeProprio(pedido.nome));
      return;
    case "apagarPessoa": {
      const p = apagarPessoa(pedido.nome);
      anunciador.falar(p ? `${p.nome} foi apagado deste celular.` : `Não achei ${pedido.nome} entre as pessoas cadastradas.`, true);
      return;
    }
    case "listarPessoas": {
      const nomes = listarPessoas().map(p => p.nome);
      anunciador.falar(nomes.length ? `Pessoas cadastradas: ${nomes.join(", ")}.` : "Ainda não há pessoas cadastradas.", true);
      return;
    }
    case "quem":
      anunciador.falar("Olhando.", true);
      reconhecedor.quemEsta(video).then(t => anunciador.falar(t, true))
        .catch(() => anunciador.falar("Não consegui analisar os rostos agora.", true));
      return;
    case "mapa":
      irPara(pedido.destino);
      return;
    case "ondeFica":
      ondeFica(pedido.destino);
      return;
    case "predio":
      oQueTemPerto();
      return;
    case "quantoFalta":
      anunciador.falar(tarefa instanceof NavegarRua ? tarefa.situacao()
        : "Não estou guiando nenhum caminho agora. Diga me leva até e o nome do lugar.", true);
      return;
    case "parar":
      tarefa?.cancelar?.();
      tarefa = null;
      anunciador.reiniciar();
      anunciador.falar(gravacao ? "Ok. A gravação continua." : "Ok.");
      return;
    case "pausar":
      definirPausa(true, pedido.minutos);
      return;
    case "retomar":
      definirPausa(false);
      return;
    case "ler":
      lerTexto();
      return;
    case "trocarVoz":
      anunciador.falar(anunciador.trocarVoz(), true);
      return;
    case "velocidade":
      anunciador.falar(anunciador.mudarVelocidade(pedido.sentido), true);
      return;
    case "menu": {
      const g = GRUPOS.find(x => x.nome === pedido.grupo);
      aguardandoGrupo = !g;
      anunciador.falar(g ? falaDoGrupo(g) : falaDoMenu(), true);
      return;
    }
    default:
      anunciador.falar("Não entendi. Diga menu para conhecer os comandos.", true);
  }
}

function nomesDosPercursos() {
  const nomes = listar().map(p => p.nome);
  if (!nomes.length) return "Ainda não há percursos gravados. Diga gravar percurso e um nome.";
  return `Percursos gravados: ${nomes.join(", ")}.`;
}

function descreverEspaco() {
  if (!espaco) return "Ainda não consigo medir o espaço.";
  const parte = (lado, m) => m == null ? null
    : m > 3.5 ? `${lado}, livre` : `${lado}, obstáculo ${falarDistancia(m)}`;
  return [parte("À frente", espaco.frente), parte("À esquerda", espaco.esquerda), parte("À direita", espaco.direita)]
    .filter(Boolean).join(". ") + ". Valores aproximados.";
}

// --- Ler textos (livro, placa, rótulo) pela IA na nuvem ----------------------------------

const pausa = ms => new Promise(ok => setTimeout(ok, ms));

/** Frases de até ~250 caracteres: falas longas travam em alguns navegadores e não dá para parar no meio. */
const cortarLonga = frase => frase.length <= 250 ? [frase]
  : frase.split(" ").reduce((p, w) => (p[p.length - 1].length + w.length < 200 ? (p[p.length - 1] += w + " ") : p.push(w + " "), p), [""]);

export const emFrases = texto => (texto.replace(/\s+/g, " ").match(/[^.!?;:]+[.!?;:]*\s*/g) || [])
  .flatMap(cortarLonga)
  .reduce((partes, f) => {
    const ultima = partes[partes.length - 1];
    if (ultima && ultima.length + f.length < 250) partes[partes.length - 1] = ultima + f;
    else partes.push(f);
    return partes;
  }, []).map(p => p.trim()).filter(Boolean);

/** A câmera fica em 640x480 para a análise ser rápida; para ler, sobe a resolução só durante a foto. */
async function fotoNitida() {
  const trilha = video.srcObject?.getVideoTracks?.()[0];
  const antes = trilha?.getSettings?.();
  try {
    await trilha?.applyConstraints({ width: { ideal: 1920 }, height: { ideal: 1440 } });
    await pausa(700); // tempo para o foco e a exposição se ajustarem
  } catch {}
  const foto = await fotografar(video, 1568);
  if (antes?.width) trilha.applyConstraints({ width: { ideal: antes.width }, height: { ideal: antes.height } }).catch(() => {});
  return foto;
}

async function lerTexto() {
  if (!nuvem) {
    anunciador.falar("Para ler textos eu preciso da IA na nuvem, que ainda não está configurada.", true);
    return;
  }
  tarefa?.cancelar?.();
  tarefa = null;
  const minha = leitura = { cancelada: false };
  anunciador.calar();
  await falarEsperando("Segure o celular parado, uns 30 centímetros acima do texto. Vou fotografar depois de três bipes.");
  for (let i = 0; i < 3 && !minha.cancelada; i++) { anunciador.bipe(700); await pausa(800); }
  if (minha.cancelada) return;
  const foto = await fotoNitida();
  anunciador.bipe(1200, 0.15);
  await falarEsperando("Lendo.");
  let r;
  try {
    r = await nuvem.lerTexto(foto);
  } catch {
    if (!minha.cancelada) anunciador.falar("Não consegui falar com a IA. Verifique a internet.", true);
    if (leitura === minha) leitura = null;
    return;
  }
  if (minha.cancelada) return;
  const frases = emFrases(r?.texto || "");
  if (!frases.length) {
    await falarEsperando(r?.aviso || "Não encontrei texto. Aponte para a página e diga ler de novo.");
  } else {
    if (r.aviso) await falarEsperando(r.aviso);
    for (const f of frases) {
      if (minha.cancelada) return;
      await falarEsperando(f);
    }
    if (!minha.cancelada) await falarEsperando("Fim. Para a próxima página, toque e diga ler de novo.");
  }
  if (leitura === minha) leitura = null;
}

// --- Rua (GPS + OpenStreetMap) -----------------------------------------------------

async function irPara(destino) {
  tarefa?.cancelar?.();
  tarefa = null;
  anunciador.falar(`Procurando o caminho até ${destino}.`, true);
  let pos;
  try { pos = await posicaoAtual(); } catch (e) { anunciador.falar(erroGps(e), true); return; }
  try {
    const lugar = await buscarLugar(destino, pos);
    if (!lugar) { anunciador.falar(`Não achei ${destino} no mapa. Tente dizer o nome completo ou o endereço.`, true); return; }
    const rota = await rotaAPe(pos, lugar);
    if (!rota) { anunciador.falar(`Não achei um caminho a pé até ${lugar.nome}.`, true); return; }
    tarefa = new NavegarRua(anunciador, sensores, lugar, rota, pos);
  } catch {
    anunciador.falar("Não consegui consultar o mapa. Verifique a internet.", true);
  }
}

async function ondeFica(destino) {
  let pos;
  try { pos = await posicaoAtual(); } catch (e) { anunciador.falar(erroGps(e), true); return; }
  try {
    const lugar = await buscarLugar(destino, pos);
    if (!lugar) { anunciador.falar(`Não achei ${destino} no mapa.`, true); return; }
    const d = distanciaM(pos, lugar);
    anunciador.falar(`${lugar.nome} fica ${direcaoFalada(sensores.rumo, rumoEntre(pos, lugar))}, a ${metrosFalados(d)} em linha reta. ` +
      "Para ir até lá, diga me leva até e o nome.", true);
  } catch {
    anunciador.falar("Não consegui consultar o mapa. Verifique a internet.", true);
  }
}

async function oQueTemPerto() {
  anunciador.falar("Olhando o mapa.", true);
  let pos;
  try { pos = await posicaoAtual(); } catch (e) { anunciador.falar(erroGps(e), true); return; }
  try {
    anunciador.falar(descreverPerto(await lugaresPerto(pos), sensores.rumo), true);
  } catch {
    anunciador.falar("Não consegui consultar o mapa. Verifique a internet.", true);
  }
}

// Modo silêncio: a câmera para de analisar e nada é falado até a pessoa dizer continuar,
// ou até acabar o tempo pedido ("silêncio por 10 minutos").
let fimDaPausa = null;

function definirPausa(valor, minutos = null) {
  pausado = valor;
  clearTimeout(fimDaPausa);
  fimDaPausa = null;
  tarefa?.cancelar?.();
  tarefa = null;
  anunciador.reiniciar();
  document.body.classList.toggle("pausado", pausado);
  botao.setAttribute("aria-label", pausado
    ? "Modo silêncio. Toque e diga continuar."
    : "Assistência ativa. Toque e fale um pedido.");
  if (!pausado) {
    if (minutos !== "calado") anunciador.falar(minutos === "fim" ? "Fim do silêncio. Estou de volta." : "Estou de volta.", true);
    return;
  }
  if (minutos) {
    fimDaPausa = setTimeout(() => definirPausa(false, "fim"), minutos * 60000);
    anunciador.falar(`Modo silêncio por ${minutos >= 60 && minutos % 60 === 0 ? `${minutos / 60} ${minutos === 60 ? "hora" : "horas"}` : `${minutos} minutos`}. Para voltar antes, toque e diga continuar.`, true);
  } else {
    anunciador.falar("Modo silêncio. Quando quiser, toque e diga continuar.", true);
  }
}

// --- Tela (para quem acompanha os testes) -------------------------------------------

const m = v => (v == null ? "?" : `${v.toFixed(1).replace(".", ",")} m`);

function mostrar(texto) {
  estado.dataset.fala = texto;
  estado.textContent = texto;
}

function desenhar() {
  const linhas = [];
  if (estado.dataset.fala) linhas.push(estado.dataset.fala);
  if (tarefa) linhas.push(tarefa.descricao);
  else if (pausado) linhas.push("Pausado");
  if (gravacao) linhas.push(`● Gravando ${gravacao.nome}: ${sensores.passos - gravacao.passosNoComeco} passos, ${gravacao.trechos.length} trecho(s)` +
    (sensores.movimentoOk ? "" : " · sem sensor de movimento"));
  if (espaco) linhas.push(`Livre: esq. ${m(espaco.esquerda)} · frente ${m(espaco.frente)} · dir. ${m(espaco.direita)}`);
  if (ultimaCena && !tarefa) linhas.push(`Ambiente: ${ultimaCena.rotulo} (${Math.round(ultimaCena.confianca * 100)}%)`);
  estado.textContent = linhas.join("\n");

  // Caixas desenhadas sobre o vídeo, que usa object-fit: cover
  const w = caixas.clientWidth, h = caixas.clientHeight;
  caixas.width = w;
  caixas.height = h;
  const escala = Math.max(w / video.videoWidth, h / video.videoHeight);
  const dx = (w - video.videoWidth * escala) / 2, dy = (h - video.videoHeight * escala) / 2;
  const ctx = caixas.getContext("2d");
  ctx.lineWidth = 3;
  ctx.font = "600 16px Lexend, system-ui, sans-serif";
  for (const d of ultimasDeteccoes) {
    const nome = nomeFalado(d.rotulo);
    if (!nome) continue;
    const alvo = tarefa?.rotulo === d.rotulo;
    // Sobre a câmera as cores são fixas: verde do site para o alvo, branco para o resto
    const cor = alvo ? "#166c40" : "#ffffff";
    const c = d.caixa;
    const x = dx + c.originX * escala, y = dy + c.originY * escala;
    ctx.strokeStyle = ctx.fillStyle = cor;
    ctx.strokeRect(x, y, c.width * escala, c.height * escala);
    const rotulo = d.metros != null ? `${nome} ${m(d.metros)}` : nome;
    // Etiqueta sempre dentro da tela, mesmo quando a caixa sai pela borda
    const largura = ctx.measureText(rotulo).width + 12;
    const ex = Math.min(Math.max(0, x - 1.5), w - largura), ey = Math.max(22, y);
    ctx.fillRect(ex, ey - 22, largura, 22);
    ctx.fillStyle = alvo ? "#ffffff" : "#111111";
    ctx.fillText(rotulo, ex + 6, ey - 6);
  }
}
