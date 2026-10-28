// Tarefas pedidas por voz. Cada uma recebe as detecções de cada quadro em aoQuadro()
// e devolve false quando termina.

import { estaPerto, ladoDe, onde } from "./anunciador.js";
import { falarDistancia } from "./profundidade.js";
import { nomeFalado } from "./vocabulario.js";
import { fotografar } from "./nuvem.js";

const PROCURA_LIMITE_MS = 45000;
const PERDEU_MS = 4000;
const DIRECAO_ESPERA_MS = 1500;
const VERIFICA_MS = 6000;
const VERIFICA_QUADROS = 2;
// Bem à frente: centro do objeto a menos de 12% do centro da imagem
const CENTRO = 0.12;
const PLURAL = n => (/[rzs]$/.test(n) ? `${n}es` : /l$/.test(n) ? `${n.slice(0, -1)}is` : /ão$/.test(n) ? `${n.slice(0, -2)}ões` : `${n}s`);

/** "Ache a xícara": guia por bipes (mais rápidos quanto mais centralizado) e por voz. */
export class Procurar {
  constructor(anunciador, rotulo, alvo) {
    this.a = anunciador;
    this.rotulo = rotulo;
    this.nome = nomeFalado(rotulo) || alvo;
    this.inicio = performance.now();
    this.vistoEm = null;
    this.ultimoLado = null;
    this.ultimaDirecao = 0;
    this.ultimoBipe = 0;
    this.a.falar(`Procurando ${this.nome}. Gire o celular devagar.`, true);
  }

  get descricao() { return `Procurando: ${this.nome}`; }

  aoQuadro(deteccoes) {
    const agora = performance.now();
    const alvo = deteccoes.find(d => d.rotulo === this.rotulo);
    this.a.aoVerObstaculos(deteccoes.filter(d => d !== alvo), true);

    if (!alvo) {
      if (this.vistoEm && agora - this.vistoEm > PERDEU_MS) {
        this.vistoEm = null;
        this.ultimoLado = null;
        this.a.falar(`Perdi ${this.nome} de vista.`);
      }
      if (!this.vistoEm && agora - this.inicio > PROCURA_LIMITE_MS) {
        this.a.falar(`Não encontrei ${this.nome}. Tente em outro lugar.`, true);
        return false;
      }
      return true;
    }

    this.vistoEm = agora;
    this.inicio = agora; // o limite de tempo conta a partir da última vez que viu
    const desvio = Math.abs(alvo.cx - 0.5);
    const lado = ladoDe(alvo.cx);
    const perto = estaPerto(alvo);
    const dist = falarDistancia(alvo.metros);

    // Bipe: intervalo de 700 ms (na borda) a 120 ms (no centro); tom sobe com a proximidade
    const intervalo = 120 + 580 * Math.min(desvio / 0.5, 1);
    if (agora - this.ultimoBipe > intervalo) {
      this.ultimoBipe = agora;
      this.a.bipe(perto ? 1400 : 500 + 900 * Math.min(alvo.tamanho, 1));
    }

    // Repete só quando muda a direção ou a distância falada
    const direcao = desvio < CENTRO ? "bem à frente" : onde(lado);
    const fala = `${this.nome} ${direcao}${dist ? ", " + dist : perto ? ", perto" : ""}`;
    if (fala !== this.ultimaFala && agora - this.ultimaDirecao > DIRECAO_ESPERA_MS) {
      this.ultimaFala = fala;
      this.ultimaDirecao = agora;
      if (desvio < CENTRO && perto) this.a.vibrar([200]);
      this.a.falar(fala, true);
    }
    return true;
  }
}

/** "Tem um extintor?": olha por alguns segundos e responde sim ou não. */
export class Verificar {
  constructor(anunciador, rotulo, alvo) {
    this.a = anunciador;
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
      this.a.falar(`Sim, tem ${this.nome} ${onde(ladoDe(alvo.cx))}${dist ? ", " + dist : ""}.`, true);
      return false;
    }
    if (performance.now() - this.inicio > VERIFICA_MS) {
      this.a.falar(`Não vi ${this.nome} por aqui.`, true);
      return false;
    }
    return true;
  }
}

/** "O que tem na minha frente?": lista o que está visível agora, da esquerda para a direita. */
export function descrever(deteccoes) {
  const grupos = new Map();
  for (const d of deteccoes) {
    const nome = nomeFalado(d.rotulo);
    if (!nome || d.confianca < 0.5) continue;
    const chave = `${nome}|${ladoDe(d.cx)}`;
    grupos.set(chave, { nome, lado: ladoDe(d.cx), n: (grupos.get(chave)?.n ?? 0) + 1 });
  }
  if (!grupos.size) return "Não reconheço nenhum objeto agora.";
  const ordem = { esquerda: 0, frente: 1, direita: 2 };
  const partes = [...grupos.values()].sort((x, y) => ordem[x.lado] - ordem[y.lado])
    .map(g => `${g.n > 1 ? `${g.n} ${PLURAL(g.nome)}` : g.nome} ${onde(g.lado)}`);
  return `Vejo ${partes.join(", ")}.`;
}

/**
 * Procura com a IA na nuvem: tira uma foto, pergunta, fala a resposta.
 * Se não encontrou, pede para girar e tenta de novo, até `tentativas` vezes.
 */
const INTERVALO_NUVEM_MS = 2500;

export class ProcurarNaNuvem {
  constructor(anunciador, nuvem, video, alvo, tentativas = 4) {
    this.a = anunciador;
    this.nuvem = nuvem;
    this.video = video;
    this.alvo = alvo;
    this.rotulo = null;
    this.tentativa = 0;
    this.tentativas = tentativas;
    this.ativa = true;
    this.a.falar(`Procurando ${alvo}. Segure o celular parado.`, true);
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
