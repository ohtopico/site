// Memória curta do que a câmera já viu. Cada objeto fica guardado com a direção absoluta
// (pela bússola) em que estava, então, quando sai do enquadramento, o site ainda sabe dizer
// "a porta estava à sua frente, há 5 segundos", relativo para onde a pessoa está virada agora.

import { diferenca } from "./percursos.js";
import { falarDistancia, fovHorizontal } from "./profundidade.js";
import { nomeFalado } from "./vocabulario.js";

const VALIDADE_MS = 60000;   // esquece depois de 1 minuto
const VALIDADE_PASSOS = 40;  // ou depois de andar uns 40 passos
const RESUMO_MAX = 4;

export class Memoria {
  constructor(sensores) {
    this.s = sensores;
    this.itens = new Map(); // nome falado -> registro
  }

  /** Guarda tudo o que o detector vê neste quadro (o mais próximo de cada tipo). */
  registrar(deteccoes, video) {
    const fov = fovHorizontal(video);
    const maisProximo = new Map();
    for (const d of deteccoes) {
      const nome = nomeFalado(d.rotulo);
      if (!nome || d.confianca < 0.5) continue;
      if ((maisProximo.get(nome)?.tamanho ?? -1) < d.tamanho) maisProximo.set(nome, d);
    }
    for (const [nome, d] of maisProximo) this.anotar(nome, (d.cx - 0.5) * fov, d.metros, d.tamanho);
    this.limpar();
  }

  /** Anota um objeto visto a `angulo` graus do centro da câmera (positivo = direita). */
  anotar(nome, angulo, metros = null, tamanho = null) {
    this.itens.set(nome, {
      nome, angulo, metros, tamanho,
      rumo: this.s.rumo != null ? (this.s.rumo + angulo + 360) % 360 : null,
      t: performance.now(),
      passos: this.s.passos,
    });
  }

  limpar() {
    const agora = performance.now();
    for (const [nome, r] of this.itens) {
      if (agora - r.t > VALIDADE_MS || this.s.passos - r.passos > VALIDADE_PASSOS) this.itens.delete(nome);
    }
  }

  /** "à sua frente, a 2 metros, há 5 segundos" ou null se não lembra. */
  ondeEstava(nome) {
    this.limpar();
    const r = this.itens.get(nome);
    if (!r) return null;
    // Com bússola, a direção é relativa a para onde a pessoa está virada agora
    const rel = r.rumo != null && this.s.rumo != null ? diferenca(this.s.rumo, r.rumo) : r.angulo;
    const lado = Math.abs(rel) < 30 ? "à sua frente" : Math.abs(rel) > 120 ? "atrás de você"
      : rel > 0 ? "à sua direita" : "à sua esquerda";
    const andou = this.s.passos - r.passos;
    const dist = andou < 3 ? falarDistancia(r.metros) : "";
    const segundos = Math.max(1, Math.round((performance.now() - r.t) / 1000));
    return `${lado}${dist ? ", " + dist : ""}, há ${segundos} ${segundos === 1 ? "segundo" : "segundos"}`;
  }

  /** "O que eu passei?": o que foi visto e não está mais no enquadramento, do mais recente ao mais antigo. */
  resumo(visiveis) {
    this.limpar();
    const fora = [...this.itens.values()]
      .filter(r => !visiveis.has(r.nome) && performance.now() - r.t > 1500)
      .sort((a, b) => b.t - a.t)
      .slice(0, RESUMO_MAX);
    if (!fora.length) return "Não lembro de nada que tenha saído da câmera no último minuto.";
    return fora.map(r => `${r.nome[0].toUpperCase()}${r.nome.slice(1)} estava ${this.ondeEstava(r.nome)}`).join(". ") + ".";
  }
}
