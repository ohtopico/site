// Mapa de profundidade (MiDaS v2.1 small, int8) e o que se tira dele:
// distância aproximada em metros, obstáculos que o detector não conhece (parede, poste)
// e espaço livre dos lados para virar.
//
// O MiDaS dá profundidade RELATIVA (inversa: maior = mais perto). Para virar metros,
// multiplica-se por uma escala k (metros = k / valor), calibrada de dois jeitos:
//   1. objetos de altura conhecida (pessoa ~1,65 m) vistos pelo detector: distância pela câmera pinhole
//   2. sem objeto conhecido: assume que a borda de baixo da imagem é o chão a ~1,2 m

import { carregarOrt, MEDIA, DESVIO } from "./modelos.js";

const LADO = 256;
// Campo de visão do lado MAIOR da imagem: ~65° na câmera traseira comum, ~100° na ultra-angular
let FOV_LADO_MAIOR = 65 * Math.PI / 180;
export function definirGrandeAngular(sim) {
  FOV_LADO_MAIOR = (sim ? 100 : 65) * Math.PI / 180;
}

/** Campo de visão horizontal da imagem atual, em graus. */
export function fovHorizontal(video) {
  const rad = video.videoWidth >= video.videoHeight
    ? FOV_LADO_MAIOR
    : 2 * Math.atan(Math.tan(FOV_LADO_MAIOR / 2) * video.videoWidth / video.videoHeight);
  return rad * 180 / Math.PI;
}
const CHAO_BORDA_M = 1.2;

// Alturas típicas (m) dos objetos do COCO usados para calibrar e para dar distância
export const ALTURAS = {
  "person": 1.65, "chair": 0.9, "couch": 0.85, "bench": 0.8, "dining table": 0.75,
  "potted plant": 0.6, "bicycle": 1.0, "motorcycle": 1.1, "car": 1.5, "dog": 0.5,
  "suitcase": 0.6, "backpack": 0.5, "fire hydrant": 0.7, "bed": 0.6, "toilet": 0.75,
  "refrigerator": 1.7, "tv": 0.5, "laptop": 0.25, "bottle": 0.25, "cup": 0.1,
  "sink": 0.2, "oven": 0.85, "microwave": 0.3, "book": 0.22, "clock": 0.3, "vase": 0.3,
};

/** Distância (m) pelo tamanho na imagem, ou null se o objeto está cortado na borda. */
export function distanciaPorTamanho(d, video) {
  const altura = ALTURAS[d.rotulo];
  if (!altura) return null;
  const c = d.caixa, h = video.videoHeight;
  if (c.originY < 2 || c.originY + c.height > h - 2) return null; // cortado: altura medida é menor que a real
  const fovVertical = video.videoHeight >= video.videoWidth
    ? FOV_LADO_MAIOR
    : 2 * Math.atan(Math.tan(FOV_LADO_MAIOR / 2) * video.videoHeight / video.videoWidth);
  return altura / (d.tamanho * 2 * Math.tan(fovVertical / 2));
}

/** "a 1 metro", "a 2,5 metros", "a menos de meio metro". */
export function falarDistancia(m) {
  if (m == null || !isFinite(m)) return "";
  if (m < 0.6) return "a menos de 1 metro";
  const r = m < 3 ? Math.round(m * 2) / 2 : Math.round(m);
  return `a ${String(r).replace(".", ",")} ${r === 1 ? "metro" : "metros"}`;
}

export class Profundidade {
  static async carregar() {
    const partes = await Promise.all([0, 1].map(i => fetch(`modelos/midas_int8.onnx.part${i}`)));
    if (partes.some(r => !r.ok)) return null;
    const buffers = await Promise.all(partes.map(r => r.arrayBuffer()));
    const modelo = new Uint8Array(buffers.reduce((n, b) => n + b.byteLength, 0));
    let pos = 0;
    for (const b of buffers) { modelo.set(new Uint8Array(b), pos); pos += b.byteLength; }
    const ort = await carregarOrt();
    return new Profundidade(ort, await ort.InferenceSession.create(modelo));
  }

  constructor(ort, sessao) {
    this.ort = ort;
    this.sessao = sessao;
    this.canvas = new OffscreenCanvas(LADO, LADO);
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    this.entrada = new Float32Array(3 * LADO * LADO);
    this.k = null;
    this.mapa = null;
  }

  /** Roda o MiDaS no quadro atual. Guarda o mapa (LADO x LADO, valores inversos) em this.mapa. */
  async estimar(video) {
    this.ctx.drawImage(video, 0, 0, LADO, LADO);
    const px = this.ctx.getImageData(0, 0, LADO, LADO).data;
    const n = LADO * LADO;
    for (let i = 0; i < n; i++) {
      for (let c = 0; c < 3; c++) this.entrada[c * n + i] = (px[i * 4 + c] / 255 - MEDIA[c]) / DESVIO[c];
    }
    const t = new this.ort.Tensor("float32", this.entrada, [1, 3, LADO, LADO]);
    const saida = await this.sessao.run({ [this.sessao.inputNames[0]]: t });
    this.mapa = saida[this.sessao.outputNames[0]].data;
    return this.mapa;
  }

  /** Percentil p (0..1) do mapa numa região em frações da imagem [x0, x1) x [y0, y1). */
  regiao(x0, x1, y0, y1, p) {
    const vals = [];
    for (let y = Math.floor(y0 * LADO); y < Math.floor(y1 * LADO); y += 2) {
      for (let x = Math.floor(x0 * LADO); x < Math.floor(x1 * LADO); x += 2) vals.push(this.mapa[y * LADO + x]);
    }
    vals.sort((a, b) => a - b);
    return vals[Math.min(vals.length - 1, Math.floor(p * vals.length))];
  }

  /** Ajusta a escala k com objetos de altura conhecida; sem eles, usa o chão na borda de baixo. */
  calibrar(deteccoes, video) {
    const amostras = [];
    for (const d of deteccoes) {
      const dist = distanciaPorTamanho(d, video);
      if (!dist || d.confianca < 0.5) continue;
      const c = d.caixa;
      const v = this.regiao(
        (c.originX + c.width * 0.3) / video.videoWidth, (c.originX + c.width * 0.7) / video.videoWidth,
        (c.originY + c.height * 0.3) / video.videoHeight, (c.originY + c.height * 0.7) / video.videoHeight, 0.5);
      if (v > 0) amostras.push(dist * v);
    }
    if (amostras.length) {
      amostras.sort((a, b) => a - b);
      const novo = amostras[Math.floor(amostras.length / 2)];
      this.k = this.k ? 0.8 * this.k + 0.2 * novo : novo;
      this.kPorObjeto = true;
    } else if (!this.kPorObjeto) {
      // O chão só serve de régua quando aparece: a borda de baixo bem mais perto que o meio da imagem.
      // De frente para uma parede, a borda de baixo também é parede e a régua mediria a parede a 1,2 m.
      const chao = this.regiao(0.35, 0.65, 0.92, 1, 0.5);
      const meio = this.regiao(0.35, 0.65, 0.3, 0.6, 0.5);
      if (chao > 0 && chao > 1.4 * meio) this.k = this.k ? 0.9 * this.k + 0.1 * chao * CHAO_BORDA_M : chao * CHAO_BORDA_M;
    }
  }

  metros(valor) {
    return this.k && valor > 0 ? this.k / valor : null;
  }

  /**
   * Distância livre (m) em três faixas verticais, olhando a altura do corpo (30% a 80% da imagem).
   * Usa o percentil 90 do valor inverso: o ponto mais próximo que não seja ruído.
   */
  espacoLivre() {
    if (!this.mapa) return null;
    const faixa = (x0, x1) => this.metros(this.regiao(x0, x1, 0.3, 0.8, 0.9));
    return { esquerda: faixa(0, 0.3), frente: faixa(0.35, 0.65), direita: faixa(0.7, 1) };
  }

  /** Distância no centro de uma caixa do detector (m). */
  distanciaDe(d, video) {
    if (!this.mapa) return null;
    const c = d.caixa;
    return this.metros(this.regiao(
      (c.originX + c.width * 0.3) / video.videoWidth, (c.originX + c.width * 0.7) / video.videoWidth,
      (c.originY + c.height * 0.3) / video.videoHeight, (c.originY + c.height * 0.7) / video.videoHeight, 0.5));
  }
}
