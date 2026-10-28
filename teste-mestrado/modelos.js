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
