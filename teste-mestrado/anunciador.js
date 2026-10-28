import { OBSTACULOS, nomeFalado } from "./vocabulario.js";
import { falarDistancia } from "./profundidade.js";

// Decide o que falar e quando (mesmas regras do app Android).
// Obstáculo perto interrompe tudo (vibração + fala), ambiente só é falado quando muda
// e fica estável, e a mesma frase não se repete antes do intervalo de espera.

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
const LIVRE_FRENTE_M = 1.0; // menos que isso à frente, sem objeto conhecido: provável parede ou poste
const PAREDE_M = 1.8;       // lado "fechado"
const ABERTO_M = 3.5;       // lado "aberto": dá para virar
const ESPACO_ESPERA_MS = 8000;

/** Perto: pela distância em metros se houver, senão pelo tamanho na imagem. */
export const estaPerto = d => (d.metros != null ? d.metros < PERTO_M : d.tamanho >= TAMANHO_PERTO);

export const ladoDe = cx => (cx < 0.33 ? "esquerda" : cx > 0.67 ? "direita" : "frente");
export const onde = lado => ({ esquerda: "à esquerda", frente: "à frente", direita: "à direita" })[lado];

export class Anunciador {
  constructor() {
    this.ultimaFala = new Map();
    this.ultimaVibracao = 0;
    this.voz = null;
    this.reiniciar();
    const escolher = () => {
      const vozes = speechSynthesis.getVoices();
      this.voz = vozes.find(v => v.lang === "pt-BR") || vozes.find(v => v.lang.startsWith("pt")) || null;
    };
    escolher();
    speechSynthesis.addEventListener("voiceschanged", escolher);
  }

  falar(texto, urgente = false) {
    if (urgente) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "pt-BR";
    if (this.voz) u.voice = this.voz;
    u.rate = 1.1;
    speechSynthesis.speak(u);
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
   * Usa o mapa de profundidade: algo muito perto à frente que o detector não reconheceu,
   * e lados que passam de fechados (parede) para abertos (corredor, porta aberta): "pode virar".
   */
  aoVerEspaco(espaco, jaAvisouFrente, soFrente = false) {
    if (!espaco) return;
    if (!jaAvisouFrente && espaco.frente != null && espaco.frente < LIVRE_FRENTE_M) {
      this.vibrar();
      this.falarUmaVez(`Cuidado, algo à frente, ${falarDistancia(espaco.frente)}`, OBSTACULO_ESPERA_MS, true, "frente|desconhecido");
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
  falarUmaVez(texto, esperaMs, urgente = false, chave = texto) {
    const agora = performance.now();
    if (agora - (this.ultimaFala.get(chave) ?? -Infinity) < esperaMs) return;
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
    speechSynthesis.cancel();
  }
}
