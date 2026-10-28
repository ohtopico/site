import { OBSTACULOS, nomeFalado } from "./vocabulario.js";
import { falarDistancia } from "./profundidade.js";

// Decide o que falar e quando. Nenhuma fala corta outra: avisos automáticos esperam a fala atual
// terminar (só o mais recente fica guardado) e a mesma frase não se repete antes do intervalo de espera.
// Só a própria pessoa interrompe, ao tocar para dar um comando (calar).

const CENA_CONFIANCA_MIN = 0.6;
const CENA_QUADROS_ESTAVEIS = 5;
const CENA_ESPERA_MS = 20000;
const OBSTACULO_ESPERA_MS = 4000; // obstáculo perto
const OBSTACULO_LONGE_ESPERA_MS = 15000; // a média distância: só repete se continuar lá
const VIBRACAO_ESPERA_MS = 1000;

// Frações da altura da imagem; sem sensor de profundidade, tamanho na imagem faz as vezes de distância.
// Ajustar nos testes de campo.
export const TAMANHO_PERTO = 0.6;
export const TAMANHO_MEDIO = 0.3;

// Com distância em metros (quando há mapa de profundidade ou altura conhecida)
export const PERTO_M = 1.5;
const LIVRE_FRENTE_M = 1.3; // menos que isso à frente: parede ou obstáculo
const PAUSA_MS = 500;       // silêncio entre uma fala e o próximo aviso
const AVISO_VALIDO_MS = 3000; // aviso guardado que esperou mais que isso já não vale
const PAREDE_M = 1.8;       // lado "fechado"
const ABERTO_M = 3.5;       // lado "aberto": dá para virar
const ESPACO_ESPERA_MS = 8000;

/** Perto: pela distância em metros se houver, senão pelo tamanho na imagem. */
export const estaPerto = d => (d.metros != null ? d.metros < PERTO_M : d.tamanho >= TAMANHO_PERTO);

export const ladoDe = cx => (cx < 0.33 ? "esquerda" : cx > 0.67 ? "direita" : "frente");
export const onde = lado => ({ esquerda: "à esquerda", frente: "à frente", direita: "à direita" })[lado];

const CHAVE_VOZ = "assistencia.voz";
const CHAVE_VELOCIDADE = "assistencia.velocidade";

// As vozes mais naturais (neurais) costumam trazer isso no nome: "Online (Natural)" no Edge/Windows,
// "Aprimorada"/"Premium"/"Enhanced" no iPhone, "Google" no Chrome.
const pontos = v => (v.lang.replace("_", "-") === "pt-BR" ? 100 : 50)
  + (/natural|neural|online/i.test(v.name) ? 40 : 0)
  + (/premium|enhanced|aprimorad|melhorad|siri/i.test(v.name) ? 30 : 0)
  + (/google/i.test(v.name) ? 20 : 0)
  - (/compact|eloquence|espeak/i.test(v.name) ? 30 : 0);

/** Vozes em português, da mais natural para a menos. */
export const vozesPt = () => speechSynthesis.getVoices()
  .filter(v => v.lang.toLowerCase().startsWith("pt"))
  .sort((a, b) => pontos(b) - pontos(a));

const ler = chave => { try { return localStorage.getItem(chave); } catch { return null; } };
const gravar = (chave, valor) => { try { localStorage.setItem(chave, valor); } catch {} };

export class Anunciador {
  constructor() {
    this.ultimaFala = new Map();
    this.ultimaVibracao = 0;
    this.voz = null;
    this.reiniciar();
    this.velocidade = Number(ler(CHAVE_VELOCIDADE)) || 1.05;
    // A escolhida pela pessoa ("trocar voz"), senão a que parece mais natural
    const escolher = () => {
      const vozes = vozesPt();
      this.voz = vozes.find(v => v.name === ler(CHAVE_VOZ)) || vozes[0] || null;
    };
    escolher();
    speechSynthesis.addEventListener("voiceschanged", escolher);
  }

  /** Fala sem cortar o que está sendo dito: entra na fila. (`urgente` ficou só por compatibilidade.) */
  falar(texto, urgente = false) {
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "pt-BR";
    if (this.voz) u.voice = this.voz;
    u.rate = this.velocidade;
    u.onend = u.onerror = () => {
      if (speechSynthesis.speaking || speechSynthesis.pending) return;
      this.livreEm = performance.now() + PAUSA_MS;
      setTimeout(() => this.falarPendente(), PAUSA_MS + 20);
    };
    speechSynthesis.speak(u);
  }

  /** Passa para a próxima voz em português e guarda a escolha. Devolve a frase de apresentação. */
  trocarVoz() {
    const vozes = vozesPt();
    if (vozes.length < 2) return "Este celular só tem uma voz em português. Dá para instalar outras nas configurações de fala do sistema.";
    const i = (vozes.indexOf(this.voz) + 1) % vozes.length;
    this.voz = vozes[i];
    gravar(CHAVE_VOZ, this.voz.name);
    return `Esta é a voz ${i + 1} de ${vozes.length}. Para ouvir outra, diga trocar voz de novo.`;
  }

  /** Mais rápido (+1) ou mais devagar (-1), entre 0,7 e 1,6. */
  mudarVelocidade(sentido) {
    this.velocidade = Math.round(Math.min(1.6, Math.max(0.7, this.velocidade + 0.15 * sentido)) * 100) / 100;
    gravar(CHAVE_VELOCIDADE, this.velocidade);
    return sentido > 0 ? "Falando mais rápido." : "Falando mais devagar.";
  }

  ocupado() {
    return speechSynthesis.speaking || speechSynthesis.pending || performance.now() < (this.livreEm ?? 0);
  }

  /** Para tudo (a pessoa tocou para falar um comando). */
  calar() {
    this.pendente = null;
    this.livreEm = 0;
    speechSynthesis.cancel();
  }

  falarPendente() {
    const p = this.pendente;
    if (!p || this.ocupado()) return;
    this.pendente = null;
    if (performance.now() - p.quando < AVISO_VALIDO_MS) this.falarUmaVez(p.texto, p.esperaMs, p.urgente, p.chave);
  }

  aoVerCena({ rotulo, confianca }) {
    if (confianca < CENA_CONFIANCA_MIN) {
      this.contagem = 0;
      return;
    }
    if (rotulo === this.candidata) this.contagem++;
    else {
      this.candidata = rotulo;
      this.contagem = 1;
    }
    if (this.contagem === CENA_QUADROS_ESTAVEIS && rotulo !== this.cenaAnunciada) {
      this.cenaAnunciada = rotulo;
      if (!speechSynthesis.speaking) this.falarUmaVez(rotulo, CENA_ESPERA_MS);
    }
  }

  /** Avisa o obstáculo mais próximo. Com soPerto, só o que está perto (usado durante uma busca). */
  aoVerObstaculos(deteccoes, soPerto = false) {
    const maisPerto = deteccoes.find(d => OBSTACULOS.has(d.rotulo) && (d.tamanho >= TAMANHO_MEDIO || estaPerto(d)));
    if (!maisPerto) return false;
    const nome = nomeFalado(maisPerto.rotulo);
    const lado = ladoDe(maisPerto.cx);
    const dist = falarDistancia(maisPerto.metros);
    if (estaPerto(maisPerto)) {
      if (lado === "frente") this.vibrar();
      this.falarUmaVez(`${nome} ${onde(lado)}${dist ? ", " + dist : ", perto"}`, OBSTACULO_ESPERA_MS, true, `${nome}|${lado}|perto`);
      return lado === "frente";
    }
    if (!soPerto && !speechSynthesis.speaking) {
      this.falarUmaVez(`${nome} ${onde(lado)}${dist ? ", " + dist : ""}`, OBSTACULO_LONGE_ESPERA_MS, false, `${nome}|${lado}`);
    }
    return false;
  }

  /**
   * Usa o mapa de profundidade: parede ou obstáculo perto à frente (reconhecido ou não pelo detector),
   * e lados que passam de fechados (parede) para abertos (corredor, porta aberta): "pode virar".
   */
  aoVerEspaco(espaco, jaAvisouFrente, soFrente = false) {
    if (!espaco) return;
    const f = espaco.frente;
    if (!jaAvisouFrente && f != null && f < LIVRE_FRENTE_M) {
      // Parede: os três lados quase à mesma distância. Senão, é algo no meio do caminho.
      const parede = [espaco.esquerda, espaco.direita].every(m => m != null && m < Math.max(1.6 * f, f + 0.5));
      this.vibrar();
      this.falarUmaVez(`${parede ? "Parede" : "Cuidado, obstáculo"} à frente, ${falarDistancia(f)}`, OBSTACULO_ESPERA_MS, true, "frente");
    }
    if (soFrente) return;
    for (const lado of ["esquerda", "direita"]) {
      const m = espaco[lado];
      if (m == null) continue;
      const antes = this.lados[lado];
      const agora = m < PAREDE_M ? "fechado" : m > ABERTO_M ? "aberto" : antes.estado;
      if (agora === antes.candidato) antes.vezes++;
      else { antes.candidato = agora; antes.vezes = 1; }
      if (antes.vezes >= 2 && agora !== antes.estado) {
        if (antes.estado === "fechado" && agora === "aberto") {
          this.falarUmaVez(`Espaço livre ${onde(lado)}, dá para virar`, ESPACO_ESPERA_MS, false, `virar|${lado}`);
        }
        antes.estado = agora;
      }
    }
  }

  /** Bipe curto pelo Web Audio; tom mais agudo = mais perto. */
  bipe(frequencia = 880, duracao = 0.06) {
    this.audio ??= new AudioContext();
    const t = this.audio.currentTime;
    const osc = this.audio.createOscillator();
    const ganho = this.audio.createGain();
    osc.frequency.value = frequencia;
    ganho.gain.setValueAtTime(0.25, t);
    ganho.gain.exponentialRampToValueAtTime(0.001, t + duracao);
    osc.connect(ganho).connect(this.audio.destination);
    osc.start(t);
    osc.stop(t + duracao);
  }

  // `chave` agrupa frases que só mudam no número ("a 2 metros", "a 1,5 metro") para não repetir
  // Se já houver fala, guarda só o aviso mais recente (um urgente não é trocado por um comum)
  falarUmaVez(texto, esperaMs, urgente = false, chave = texto) {
    const agora = performance.now();
    if (agora - (this.ultimaFala.get(chave) ?? -Infinity) < esperaMs) return;
    if (this.ocupado()) {
      if (!this.pendente?.urgente || urgente) this.pendente = { texto, esperaMs, urgente, chave, quando: agora };
      return;
    }
    this.ultimaFala.set(chave, agora);
    this.falar(texto, urgente);
  }

  // navigator.vibrate só existe no Android; no iPhone a fala basta
  vibrar(padrao = [120, 80, 120]) {
    const agora = performance.now();
    if (agora - this.ultimaVibracao < VIBRACAO_ESPERA_MS) return;
    this.ultimaVibracao = agora;
    navigator.vibrate?.(padrao);
  }

  reiniciar() {
    this.ultimaFala?.clear();
    this.candidata = null;
    this.contagem = 0;
    this.cenaAnunciada = null;
    this.lados = { esquerda: { estado: null, candidato: null, vezes: 0 }, direita: { estado: null, candidato: null, vezes: 0 } };
    this.calar();
  }
}
