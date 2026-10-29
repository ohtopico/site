// Modelos que rodam no navegador: detector de objetos COCO (MediaPipe) e,
// se existir modelos/cena.onnx, a MobileNet de cena (ONNX Runtime Web).
// A profundidade fica em profundidade.js.

import { FilesetResolver, ObjectDetector } from "./vendor/mediapipe/vision_bundle.mjs";

export class Detector {
  static async carregar() {
    const arquivos = await FilesetResolver.forVisionTasks(new URL("./vendor/mediapipe/wasm", import.meta.url).href);
    const opcoes = (delegate) => ({
      baseOptions: { modelAssetPath: "modelos/efficientdet_lite0.tflite", delegate },
      runningMode: "VIDEO",
      maxResults: 10,
      scoreThreshold: 0.4,
    });
    let detector;
    try {
      detector = await ObjectDetector.createFromOptions(arquivos, opcoes("GPU"));
    } catch {
      detector = await ObjectDetector.createFromOptions(arquivos, opcoes("CPU"));
    }
    return new Detector(detector);
  }

  constructor(detector) {
    this.detector = detector;
  }

  /**
   * Tudo o que o detector viu, do maior (mais próximo) para o menor.
   * cx: centro horizontal de 0 (esquerda) a 1 (direita); tamanho: altura relativa à imagem.
   */
  detectar(video, instante) {
    const largura = video.videoWidth, altura = video.videoHeight;
    const { detections } = this.detector.detectForVideo(video, instante);
    return detections.map(d => {
      const c = d.boundingBox;
      return {
        rotulo: d.categories[0].categoryName,
        confianca: d.categories[0].score,
        cx: (c.originX + c.width / 2) / largura,
        tamanho: c.height / altura,
        caixa: c,
      };
    }).sort((a, b) => b.tamanho - a.tamanho);
  }
}

/** ONNX Runtime Web, carregado só quando algum modelo ONNX é usado. */
let ortPromessa;
export function carregarOrt() {
  ortPromessa ??= import("./vendor/ort/ort.wasm.min.mjs").then(ort => {
    ort.env.wasm.wasmPaths = new URL("./vendor/ort/", import.meta.url).href;
    ort.env.wasm.numThreads = 1; // threads exigem cabeçalhos de isolamento que nem todo servidor manda
    return ort;
  });
  return ortPromessa;
}

export const MEDIA = [0.485, 0.456, 0.406];
export const DESVIO = [0.229, 0.224, 0.225];

export class ClassificadorCena {
  /** Retorna null se não houver modelos/cena.onnx. */
  static async carregar() {
    const [modelo, rotulos] = await Promise.all([
      fetch("modelos/cena.onnx"), fetch("modelos/cena_labels.txt"),
    ]);
    if (!modelo.ok || !rotulos.ok) return null;
    const ort = await carregarOrt();
    const sessao = await ort.InferenceSession.create(new Uint8Array(await modelo.arrayBuffer()));
    const nomes = (await rotulos.text()).split("\n").map(s => s.trim().replaceAll("_", " ")).filter(Boolean);
    return new ClassificadorCena(ort, sessao, nomes);
  }

  constructor(ort, sessao, nomes) {
    this.ort = ort;
    this.sessao = sessao;
    this.nomes = nomes;
    this.lado = 224;
    this.canvas = new OffscreenCanvas(this.lado, this.lado);
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    this.entrada = new Float32Array(3 * this.lado * this.lado);
  }

  async classificar(video) {
    // Recorte quadrado central, como no treino
    const l = Math.min(video.videoWidth, video.videoHeight);
    const sx = (video.videoWidth - l) / 2, sy = (video.videoHeight - l) / 2;
    this.ctx.drawImage(video, sx, sy, l, l, 0, 0, this.lado, this.lado);
    const px = this.ctx.getImageData(0, 0, this.lado, this.lado).data;
    const n = this.lado * this.lado;
    for (let i = 0; i < n; i++) {
      for (let c = 0; c < 3; c++) {
        this.entrada[c * n + i] = (px[i * 4 + c] / 255 - MEDIA[c]) / DESVIO[c];
      }
    }
    const tensor = new this.ort.Tensor("float32", this.entrada, [1, 3, this.lado, this.lado]);
    const saida = await this.sessao.run({ [this.sessao.inputNames[0]]: tensor });
    const logits = saida[this.sessao.outputNames[0]].data;
    const max = Math.max(...logits);
    const exps = Array.from(logits, v => Math.exp(v - max));
    const soma = exps.reduce((a, b) => a + b, 0);
    const melhor = exps.indexOf(Math.max(...exps));
    return { rotulo: this.nomes[melhor], confianca: exps[melhor] / soma };
  }
}

/**
 * Detector treinado com os objetos da lista (notebook treino_detector_mobilenet.ipynb, SSDLite + MobileNetV3).
 * Opcional: só carrega se existirem modelos/objetos.onnx (ou dividido em .part0 e .part1, como o MiDaS)
 * e objetos_labels.txt. Os nomes em
 * objetos_ignorar.txt (também opcional) ficam de fora: objetos que o modelo acerta pouco, que é melhor
 * deixar para a IA na nuvem do que arriscar alarme falso.
 * Devolve detecções no mesmo formato do Detector, com rotulo = nome da classe.
 */
// O modelo treinado erra mais que o do COCO: só vale a detecção com pelo menos esta confiança
const CONFIANCA_EXTRA = 0.5;

export class DetectorExtra {
  static async carregar() {
    const rotulos = await fetch("modelos/objetos_labels.txt");
    if (!rotulos.ok) return null;
    let partes = await Promise.all([0, 1].map(i => fetch(`modelos/objetos.onnx.part${i}`)));
    if (partes.some(r => !r.ok)) partes = [await fetch("modelos/objetos.onnx")];
    if (partes.some(r => !r.ok)) return null;
    const buffers = await Promise.all(partes.map(r => r.arrayBuffer()));
    const bytes = new Uint8Array(buffers.reduce((n, b) => n + b.byteLength, 0));
    buffers.reduce((pos, b) => (bytes.set(new Uint8Array(b), pos), pos + b.byteLength), 0);
    const ort = await carregarOrt();
    const sessao = await ort.InferenceSession.create(bytes);
    const linhas = texto => texto.split("\n").map(s => s.trim()).filter(s => s && !s.startsWith("#"));
    const nomes = linhas(await rotulos.text());
    const ignorar = await fetch("modelos/objetos_ignorar.txt").then(r => (r.ok ? r.text() : "")).catch(() => "");
    return new DetectorExtra(ort, sessao, nomes, new Set(linhas(ignorar)));
  }

  constructor(ort, sessao, nomes, ignorar = new Set()) {
    this.ort = ort;
    this.sessao = sessao;
    this.nomes = nomes;
    this.ignorar = ignorar;
    this.nomesAtivos = nomes.filter(n => !ignorar.has(n));
    // Dois formatos aceitos: SSDLite (três saídas: caixas, pontuações, rótulos de 1 a K) ou
    // YOLO (uma saída: [1, N, 6] já com NMS, ou [1, 4+K, N] cru, rótulos de 0 a K-1)
    this.yolo = sessao.outputNames.length === 1;
    const forma = sessao.inputMetadata?.[0]?.shape;
    this.lado = typeof forma?.[2] === "number" ? forma[2] : 320;
    this.canvas = new OffscreenCanvas(this.lado, this.lado);
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    this.entrada = new Float32Array(3 * this.lado * this.lado);
  }

  async detectar(video) {
    const W = video.videoWidth, H = video.videoHeight;
    // SSDLite: a imagem inteira esticada. YOLO: proporção mantida, com faixas cinza (como no treino)
    const escala = this.yolo ? this.lado / Math.max(W, H) : null;
    const [dx, dy] = this.yolo ? [(this.lado - W * escala) / 2, (this.lado - H * escala) / 2] : [0, 0];
    if (this.yolo) {
      this.ctx.fillStyle = "rgb(114,114,114)";
      this.ctx.fillRect(0, 0, this.lado, this.lado);
      this.ctx.drawImage(video, dx, dy, W * escala, H * escala);
    } else {
      this.ctx.drawImage(video, 0, 0, this.lado, this.lado);
    }
    // Valores de 0 a 1 (a normalização, quando existe, está dentro do modelo)
    const px = this.ctx.getImageData(0, 0, this.lado, this.lado).data;
    const n = this.lado * this.lado;
    for (let i = 0; i < n; i++) for (let c = 0; c < 3; c++) this.entrada[c * n + i] = px[i * 4 + c] / 255;
    const t = new this.ort.Tensor("float32", this.entrada, [1, 3, this.lado, this.lado]);
    const r = await this.sessao.run({ [this.sessao.inputNames[0]]: t });

    // Caixas em pixels da entrada -> pixels do vídeo
    const achados = this.yolo ? caixasYolo(r[this.sessao.outputNames[0]], this.nomes.length) : (() => {
      const [caixas, pontuacoes, rotulos] = this.sessao.outputNames.map(k => r[k].data);
      return Array.from(pontuacoes, (p, i) => ({
        classe: Number(rotulos[i]) - 1, pontuacao: p, caixa: Array.from(caixas.subarray(i * 4, i * 4 + 4)),
      }));
    })();
    const [sx, sy] = this.yolo ? [1 / escala, 1 / escala] : [W / this.lado, H / this.lado];
    const saida = [];
    for (const { classe, pontuacao, caixa } of achados) {
      const rotulo = this.nomes[classe];
      if (!rotulo || this.ignorar.has(rotulo) || pontuacao < CONFIANCA_EXTRA) continue;
      const x0 = Math.max(0, (caixa[0] - dx) * sx), y0 = Math.max(0, (caixa[1] - dy) * sy);
      const x1 = Math.min(W, (caixa[2] - dx) * sx), y1 = Math.min(H, (caixa[3] - dy) * sy);
      saida.push({
        rotulo,
        confianca: pontuacao,
        cx: (x0 + x1) / 2 / W,
        tamanho: (y1 - y0) / H,
        caixa: { originX: x0, originY: y0, width: x1 - x0, height: y1 - y0 },
      });
    }
    return saida;
  }
}

/** Saída do YOLO -> [{ classe, pontuacao, caixa: [x0, y0, x1, y1] }]. */
export function caixasYolo(tensor, numClasses) {
  const [, a, b] = tensor.dims;
  const d = tensor.data;
  if (b === 6) {
    // Exportado com NMS: [1, N, 6] = x0, y0, x1, y1, pontuação, classe
    const r = [];
    for (let i = 0; i < a; i++) {
      const o = i * 6;
      if (d[o + 4] > 0) r.push({ classe: Math.round(d[o + 5]), pontuacao: d[o + 4], caixa: [d[o], d[o + 1], d[o + 2], d[o + 3]] });
    }
    return r;
  }
  // Cru: [1, 4 + K, N] = cx, cy, w, h e a pontuação de cada classe; aqui faz o NMS
  const total = b, candidatos = [];
  for (let i = 0; i < total; i++) {
    let melhor = 0, classe = -1;
    for (let k = 0; k < numClasses; k++) {
      const p = d[(4 + k) * total + i];
      if (p > melhor) { melhor = p; classe = k; }
    }
    if (melhor < CONFIANCA_EXTRA) continue;
    const cx = d[i], cy = d[total + i], w = d[2 * total + i], h = d[3 * total + i];
    candidatos.push({ classe, pontuacao: melhor, caixa: [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2] });
  }
  candidatos.sort((p, q) => q.pontuacao - p.pontuacao);
  const ficam = [];
  for (const c of candidatos) {
    if (ficam.length >= 100) break;
    if (!ficam.some(f => f.classe === c.classe && iou(f.caixa, c.caixa) > 0.45)) ficam.push(c);
  }
  return ficam;
}

function iou(a, b) {
  const w = Math.min(a[2], b[2]) - Math.max(a[0], b[0]), h = Math.min(a[3], b[3]) - Math.max(a[1], b[1]);
  if (w <= 0 || h <= 0) return 0;
  const inter = w * h;
  return inter / ((a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - inter);
}
