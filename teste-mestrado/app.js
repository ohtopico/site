import { Anunciador } from "./anunciador.js";
import { interpretar } from "./comandos.js";
import { Detector, ClassificadorCena } from "./modelos.js";
import { abrirNuvem, lerChave, salvarChave } from "./nuvem.js";
import { Gravacao, SeguirPercurso, Sensores, acharPercurso, apagar, listar } from "./percursos.js";
import { Profundidade, distanciaPorTamanho, falarDistancia } from "./profundidade.js";
import { Procurar, ProcurarNaNuvem, Verificar, descrever } from "./tarefas.js";
import { nomeFalado } from "./vocabulario.js";

const $ = id => document.getElementById(id);
const video = $("video"), caixas = $("caixas"), estado = $("estado"), botao = $("pausar");
const QUADRO_MS = 200; // ~5 análises por segundo
const AJUDA = "Toque na tela e fale. Por exemplo: cadê a xícara, ache a chave, onde fica a saída, " +
  "tem um extintor, o que tem na minha frente, o caminho está livre, gravar percurso e o nome, " +
  "seguir percurso e o nome, me leva até e um endereço na rua, ou parar.";
const EXPLICACAO = "Este site usa inteligência artificial para reconhecer o ambiente pela câmera do celular. " +
  "Ela identifica objetos, estima a que distância eles estão e avisa obstáculos e espaços livres para virar. " +
  "Segure o celular na altura do peito, com a câmera para a frente. " +
  "Para pedir algo, toque em qualquer lugar da tela e fale. Por exemplo: cadê a xícara, ache a chave, " +
  "tem um extintor, o que tem na minha frente, ou o caminho está livre. " +
  "Também posso gravar um percurso dentro de um prédio e depois guiar você por ele: diga gravar percurso e um nome. " +
  "Na rua, diga me leva até e o endereço, que eu abro o Google Maps. " +
  "Diga parar para cancelar e ajuda para ouvir os exemplos de novo. " +
  "As imagens são analisadas no próprio celular; só quando peço ajuda à inteligência artificial na nuvem uma foto é enviada. " +
  "A distância é aproximada: continue usando a bengala ou o cão-guia.";

const anunciador = new Anunciador();
let detector, cena, profundidade = null, nuvem = null, tarefa = null, gravacao = null;
let pausado = false, ouvindo = false, processando = false, aguardandoIntro = true;
let ultimasDeteccoes = [], ultimaCena = null, espaco = null, ultimoQuadro = 0, quadros = 0;
const sensores = new Sensores();

$("comecar").addEventListener("click", comecar);

// Chave da API: só aparece fora do Claude, onde a IA não vem da conta de quem está vendo
const campoChave = $("chave");
campoChave.value = lerChave();
campoChave.addEventListener("change", () => salvarChave(campoChave.value.trim()));
window.claude?.use?.("sample").then(s => { if (s) $("config-nuvem").hidden = true; }).catch(() => {});
botao.addEventListener("click", ouvir);
$("digitar").addEventListener("submit", e => {
  e.preventDefault();
  const campo = $("comando");
  if (campo.value.trim()) executar(campo.value);
  campo.value = "";
});

async function comecar() {
  const aviso = $("aviso");
  aviso.textContent = "Carregando…";
  anunciador.falar("Carregando.");
  anunciador.bipe(1, 0.01); // libera o áudio no iPhone, que só toca depois de um toque
  const permissaoSensores = Sensores.pedirPermissao(); // também precisa vir direto do toque
  try {
    const camera = navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false,
    });
    [detector, cena, nuvem, profundidade] = await Promise.all([
      Detector.carregar(), ClassificadorCena.carregar().catch(() => null), abrirNuvem(),
      Profundidade.carregar().catch(() => null), permissaoSensores,
    ]);
    sensores.ligar();
    video.srcObject = await camera;
    await video.play();
  } catch (erro) {
    const msg = erro.name === "NotAllowedError"
      ? "Sem permissão da câmera, o site não funciona."
      : `Não consegui iniciar: ${erro.message}`;
    aviso.textContent = msg;
    anunciador.falar(msg, true);
    return;
  }
  navigator.wakeLock?.request("screen").catch(() => {}); // tela acesa durante o trajeto
  $("inicio").hidden = true;
  $("uso").hidden = false;
  if (!Reconhecedor || location.search.includes("teclado")) $("digitar").classList.add("visivel");
  botao.focus();
  anunciador.falar("Olá! Quer saber como o site funciona? Toque na tela e diga sim ou não.", true);
  requestAnimationFrame(laco);
}

async function laco(agora) {
  requestAnimationFrame(laco);
  if (pausado || ouvindo || processando || agora - ultimoQuadro < QUADRO_MS || video.readyState < 2) return;
  ultimoQuadro = agora;
  processando = true;
  try {
    ultimasDeteccoes = detector.detectar(video, agora);
    // Profundidade a cada 2 quadros (~2,5 por segundo): é o modelo mais pesado
    if (profundidade && quadros++ % 2 === 0) {
      await profundidade.estimar(video);
      profundidade.calibrar(ultimasDeteccoes, video);
      espaco = profundidade.espacoLivre();
    }
    for (const d of ultimasDeteccoes) {
      d.metros = distanciaPorTamanho(d, video) ?? profundidade?.distanciaDe(d, video) ?? null;
    }
    gravacao?.aoQuadro(ultimasDeteccoes);
    if (tarefa) {
      if (!tarefa.aoQuadro(ultimasDeteccoes)) tarefa = null;
      anunciador.aoVerEspaco(espaco, false, true);
    } else {
      const avisouFrente = anunciador.aoVerObstaculos(ultimasDeteccoes);
      anunciador.aoVerEspaco(espaco, avisouFrente);
      if (cena) {
        ultimaCena = await cena.classificar(video);
        anunciador.aoVerCena(ultimaCena);
      }
    }
    desenhar();
  } finally {
    processando = false;
  }
}

// --- Voz ---------------------------------------------------------------------------

const Reconhecedor = window.SpeechRecognition || window.webkitSpeechRecognition;

function ouvir() {
  if (!Reconhecedor) {
    $("comando").focus();
    return;
  }
  if (ouvindo) return;
  ouvindo = true;
  document.body.classList.add("ouvindo");
  speechSynthesis.cancel();
  anunciador.bipe(660, 0.12);
  mostrar("Ouvindo…");
  const r = new Reconhecedor();
  r.lang = "pt-BR";
  r.interimResults = false;
  r.maxAlternatives = 1;
  let entendeu = false;
  r.onresult = e => {
    entendeu = true;
    ouvindo = false;
    document.body.classList.remove("ouvindo");
    executar(e.results[0][0].transcript);
  };
  r.onerror = e => {
    if (e.error === "not-allowed") anunciador.falar("Sem permissão do microfone.", true);
  };
  r.onend = () => {
    ouvindo = false;
    document.body.classList.remove("ouvindo");
    if (!entendeu) anunciador.falar("Não ouvi. Toque e fale de novo.", true);
  };
  r.start();
}

function executar(frase) {
  const pedido = interpretar(frase);
  mostrar(`“${frase}”`);
  const intro = aguardandoIntro;
  aguardandoIntro = false;
  switch (pedido.tipo) {
    case "sim":
    case "explicar":
      if (intro || pedido.tipo === "explicar") anunciador.falar(EXPLICACAO, true);
      else anunciador.falar("Ok.");
      return;
    case "nao":
      anunciador.falar(intro ? "Tudo bem. Toque na tela e diga o que procura." : "Ok.", true);
      return;
    case "procurar":
    case "verificar":
      pausado = false;
      tarefa?.cancelar?.();
      if (!pedido.rotulo) {
        // Fora dos objetos do detector local: pergunta à IA na nuvem
        if (!nuvem) {
          anunciador.falar(`Ainda não sei reconhecer ${pedido.alvo} sem a IA na nuvem.`, true);
          return;
        }
        tarefa = new ProcurarNaNuvem(anunciador, nuvem, video, pedido.alvo, pedido.tipo === "verificar" ? 2 : 4);
        return;
      }
      tarefa = pedido.tipo === "procurar"
        ? new Procurar(anunciador, pedido.rotulo, pedido.alvo)
        : new Verificar(anunciador, pedido.rotulo, pedido.alvo);
      return;
    case "descrever":
      anunciador.falar(descrever(ultimasDeteccoes), true);
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
      gravacao.terminar();
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
    case "mapa":
      abrirMapa(pedido.destino);
      return;
    case "parar":
      tarefa?.cancelar?.();
      tarefa = null;
      anunciador.reiniciar();
      anunciador.falar(gravacao ? "Ok. A gravação continua." : "Ok.");
      return;
    case "pausar":
      definirPausa(true);
      return;
    case "retomar":
      definirPausa(false);
      return;
    case "ajuda":
      anunciador.falar(AJUDA, true);
      return;
    default:
      anunciador.falar("Não entendi. Diga ajuda para ouvir os comandos.", true);
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

/** Abre a navegação a pé do Google Maps (app no celular, site no computador). */
function abrirMapa(destino) {
  const url = `https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=${encodeURIComponent(destino)}`;
  anunciador.falar(`Abrindo o Google Maps com o caminho a pé até ${destino}. Para voltar, use o botão voltar do celular.`, true);
  setTimeout(() => { location.href = url; }, 4500);
}

function definirPausa(valor) {
  pausado = valor;
  tarefa?.cancelar?.();
  tarefa = null;
  anunciador.reiniciar();
  document.body.classList.toggle("pausado", pausado);
  botao.setAttribute("aria-label", pausado
    ? "Pausado. Toque e diga continuar."
    : "Assistência ativa. Toque e fale um pedido.");
  anunciador.falar(pausado ? "Pausado" : "Retomado", true);
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
  if (gravacao) linhas.push(`● Gravando ${gravacao.nome}: ${gravacao.trechos.length} trecho(s)`);
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
