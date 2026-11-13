// Perguntas sobre a imagem (VQA, "visual question answering"): a pessoa pergunta qualquer coisa sobre o que a
// câmera vê ("a porta está aberta?", "de que cor é esta camisa?", "este pacote é de arroz ou de feijão?").
// Dois caminhos, nesta ordem:
//   1. IA na nuvem (Claude), em português, quando está configurada (nuvem.js)
//   2. IA no próprio celular: SmolVLM-256M-Instruct pelo transformers.js (WebGPU ou WebAssembly). Funciona sem
//      internet depois de baixar uma vez (~200 MB), mas é bem menos precisa e foi treinada em inglês: a pergunta
//      e a resposta passam pelo tradutor do próprio navegador quando ele existe (Chrome no computador).
// A IA do celular só baixa quando quem ajuda liga a opção na configuração (ou a pessoa diz "ligar IA do celular").

const MODELO_LOCAL = "HuggingFaceTB/SmolVLM-256M-Instruct";
const CHAVE_LOCAL = "assistencia.vqa_local";
const CONTEXTO_MS = 2 * 60 * 1000; // perguntas seguidas em até 2 minutos falam da mesma cena ("e a da esquerda?")

export const localLigada = () => { try { return localStorage.getItem(CHAVE_LOCAL) === "1"; } catch { return false; } };
export const ligarLocal = ligar => { try { ligar ? localStorage.setItem(CHAVE_LOCAL, "1") : localStorage.removeItem(CHAVE_LOCAL); } catch {} };

// --- Histórico curto, para perguntas de continuação -------------------------------------

const historico = [];
export function contexto() {
  const agora = Date.now();
  while (historico.length && agora - historico[0].hora > CONTEXTO_MS) historico.shift();
  return historico.map(h => ({ pergunta: h.pergunta, resposta: h.resposta }));
}
export const lembrar = (pergunta, resposta) => {
  historico.push({ pergunta, resposta, hora: Date.now() });
  if (historico.length > 3) historico.shift();
};

// --- IA no celular ----------------------------------------------------------------------

let carregando = null;

/**
 * Carrega o SmolVLM uma vez (fica no cache do navegador). `progresso(pct)` recebe de 0 a 100 durante o download.
 * Devolve { dispositivo, responder(foto, perguntaEmIngles) -> texto em inglês }.
 */
export function abrirLocal(progresso = () => {}) {
  carregando ??= (async () => {
    const t = await import("./vendor/transformers/transformers.min.js");
    t.env.allowLocalModels = false;
    t.env.backends.onnx.wasm.wasmPaths = new URL("vendor/transformers/", import.meta.url).href;
    const gpu = await navigator.gpu?.requestAdapter?.().catch(() => null);
    const dispositivo = gpu ? "webgpu" : "wasm";
    // Download: soma o tamanho de todos os arquivos para dar um só número
    const arquivos = new Map();
    const aoBaixar = p => {
      if (p.status !== "progress" || !p.total) return;
      arquivos.set(p.file, [p.loaded, p.total]);
      let feito = 0, total = 0;
      for (const [a, b] of arquivos.values()) { feito += a; total += b; }
      progresso(Math.floor(100 * feito / total));
    };
    const processador = await t.AutoProcessor.from_pretrained(MODELO_LOCAL, { progress_callback: aoBaixar });
    const modelo = await t.AutoModelForVision2Seq.from_pretrained(MODELO_LOCAL, {
      dtype: gpu
        ? { embed_tokens: "fp16", vision_encoder: "q4", decoder_model_merged: "q4" }
        : { embed_tokens: "q8", vision_encoder: "q8", decoder_model_merged: "q8" },
      device: dispositivo,
      progress_callback: aoBaixar,
    });
    progresso(100);
    return {
      dispositivo,
      async responder(foto, pergunta) {
        const imagem = await t.RawImage.fromBlob(foto);
        const mensagens = [{
          role: "user",
          content: [{ type: "image" }, { type: "text", text: `${pergunta} Answer briefly, in one short sentence.` }],
        }];
        const texto = processador.apply_chat_template(mensagens, { add_generation_prompt: true });
        const entradas = await processador(texto, [imagem], { do_image_splitting: false });
        const saida = await modelo.generate({ ...entradas, max_new_tokens: 48, do_sample: false });
        const novos = saida.slice(null, [entradas.input_ids.dims.at(-1), null]);
        return processador.batch_decode(novos, { skip_special_tokens: true })[0].trim();
      },
    };
  })();
  carregando.catch(() => { carregando = null; }); // se falhar (sem internet), tenta de novo na próxima pergunta
  return carregando;
}

// --- Tradutor do navegador (Translator API, Chrome 138+ no computador) ---------------------

const tradutores = {};
async function tradutor(de, para) {
  const T = globalThis.Translator;
  if (!T) return null;
  const chave = `${de}>${para}`;
  tradutores[chave] ??= (async () => {
    const disponivel = await T.availability({ sourceLanguage: de, targetLanguage: para });
    if (disponivel === "unavailable") return null;
    return T.create({ sourceLanguage: de, targetLanguage: para });
  })().catch(() => null);
  return tradutores[chave];
}

/**
 * Responde com a IA do celular. Devolve { resposta, idioma } (idioma "pt-BR", ou "en-US" quando não há tradutor
 * e a resposta fica em inglês).
 */
export async function responderNoCelular(local, foto, pergunta) {
  const [ptEn, enPt] = await Promise.all([tradutor("pt", "en"), tradutor("en", "pt")]);
  const emIngles = ptEn ? await ptEn.translate(pergunta).catch(() => pergunta) : pergunta;
  const resposta = await local.responder(foto, emIngles);
  if (enPt) {
    const pt = await enPt.translate(resposta).catch(() => null);
    if (pt) return { resposta: pt, idioma: "pt-BR" };
  }
  return { resposta, idioma: "en-US" };
}
