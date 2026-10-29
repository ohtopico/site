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
    this.lado = 320;
    this.canvas = new OffscreenCanvas(this.lado, this.lado);
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    this.entrada = new Float32Array(3 * this.lado * this.lado);
  }

  async detectar(video) {
    // A imagem inteira esticada para 320x320, valores de 0 a 1 (a normalização está dentro do modelo)
    this.ctx.drawImage(video, 0, 0, this.lado, this.lado);
    const px = this.ctx.getImageData(0, 0, this.lado, this.lado).data;
    const n = this.lado * this.lado;
    for (let i = 0; i < n; i++) for (let c = 0; c < 3; c++) this.entrada[c * n + i] = px[i * 4 + c] / 255;
    const t = new this.ort.Tensor("float32", this.entrada, [1, 3, this.lado, this.lado]);
    const r = await this.sessao.run({ [this.sessao.inputNames[0]]: t });
    const [caixas, pontuacoes, rotulos] = this.sessao.outputNames.map(k => r[k].data);
    const sx = video.videoWidth / this.lado, sy = video.videoHeight / this.lado;
    const saida = [];
    for (let i = 0; i < pontuacoes.length; i++) {
      const rotulo = this.nomes[Number(rotulos[i]) - 1];
      if (!rotulo || this.ignorar.has(rotulo) || pontuacoes[i] < CONFIANCA_EXTRA) continue;
      const [x0, y0, x1, y1] = [caixas[i * 4] * sx, caixas[i * 4 + 1] * sy, caixas[i * 4 + 2] * sx, caixas[i * 4 + 3] * sy];
      saida.push({
        rotulo,
        confianca: pontuacoes[i],
        cx: (x0 + x1) / 2 / video.videoWidth,
        tamanho: (y1 - y0) / video.videoHeight,
        caixa: { originX: x0, originY: y0, width: x1 - x0, height: y1 - y0 },
      });
    }
    return saida;
  }
}
