// IA de visão na nuvem, para objetos que o detector local não conhece (chave, extintor, saída…).
// Dois caminhos, nesta ordem:
//   1. aberto dentro do Claude (artifact): usa a conta Claude de quem está vendo, sem chave
//   2. fora dele: chave da API da Anthropic que a pessoa colou, guardada só neste navegador

const MODELO_API = "claude-haiku-5-5";
const CHAVE = "assistencia.chave_anthropic";

const instrucao = alvo => `Você ajuda uma pessoa cega a se orientar. A foto é da câmera do celular dela, apontada para a frente.
Pedido: encontrar "${alvo}" (pode ser um objeto, uma placa, uma porta ou um lugar, como a saída).
Responda só com JSON, sem texto fora dele:
{"encontrado": true|false,
 "lado": "esquerda"|"frente"|"direita"|null,
 "distancia": "perto"|"medio"|"longe"|null,
 "no_caminho": "o que houver entre a pessoa e o alvo (ex.: cadeira, degrau, porta fechada)" | null,
 "resposta": "frase curta em português para ser falada, no máximo 20 palavras: onde está, a distância aproximada em metros e, se houver, o que está no caminho; se não encontrou, diga isso"}
Se houver uma placa indicando o caminho (ex.: seta de saída), considere encontrado e diga para onde a placa aponta.`;

export const lerChave = () => { try { return localStorage.getItem(CHAVE) || ""; } catch { return ""; } };
export const salvarChave = valor => { try { valor ? localStorage.setItem(CHAVE, valor) : localStorage.removeItem(CHAVE); } catch {} };

const INSTRUCAO_LUGAR = `Você ajuda uma pessoa cega a reconhecer lugares. A foto é da câmera do celular dela.
Responda só com JSON: {"resposta": "uma frase em português, no máximo 20 palavras, descrevendo o lugar e o que o distingue (ex.: cozinha com balcão de mármore e janela à direita)"}`;

const INSTRUCAO_LER = `Você lê textos em voz alta para uma pessoa cega. A foto é de uma página, placa, rótulo ou papel.
Transcreva o texto legível na ordem natural de leitura (colunas de cima para baixo, da esquerda para a direita),
na língua original. Junte palavras quebradas por hífen no fim da linha. Ignore número de página, cabeçalho e rodapé repetidos.
Em embalagem, bula ou cardápio, comece pelo que é mais importante (nome, dose, validade, preço).
Responda só com JSON: {"texto": "o texto transcrito, ou vazio se não der para ler",
 "aviso": null ou uma frase curta dizendo como melhorar a foto, se o texto estiver cortado, desfocado, escuro ou de cabeça para baixo
 (ex.: "o texto está cortado à direita, mova o celular um pouco para a direita")}`;

/**
 * Devolve { origem, perguntar(foto, alvo), descreverLugar(foto), lerTexto(foto) } ou null.
 * lerTexto -> {texto, aviso}.
 * perguntar -> {encontrado, lado, distancia, no_caminho, resposta}; descreverLugar -> texto.
 */
export async function abrirNuvem() {
  const sample = await window.claude?.use?.("sample").catch(() => null);
  if (sample && (await sample.limits().catch(() => ({}))).images) {
    const json = (texto, foto) => sample.json(texto, { images: [foto], modelTier: "quick", cache: false });
    return {
      origem: "claude",
      perguntar: (foto, alvo) => json(instrucao(alvo), foto),
      descreverLugar: async foto => (await json(INSTRUCAO_LUGAR, foto)).resposta,
      lerTexto: foto => sample.json(INSTRUCAO_LER, { images: [foto], cache: false }),
    };
  }
  if (lerChave()) {
    return {
      origem: "api",
      perguntar: (foto, alvo) => perguntarApi(foto, instrucao(alvo)),
      descreverLugar: async foto => (await perguntarApi(foto, INSTRUCAO_LUGAR)).resposta,
      lerTexto: foto => perguntarApi(foto, INSTRUCAO_LER, 4000),
    };
  }
  return null;
}

async function perguntarApi(foto, texto, maxTokens = 200) {
  const dados = await new Promise((ok, erro) => {
    const r = new FileReader();
    r.onload = () => ok(r.result.split(",")[1]);
    r.onerror = erro;
    r.readAsDataURL(foto);
  });
  const resposta = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": lerChave(),
      "anthropic-version": "2023-06-01",
      // a chave é da própria pessoa e fica no navegador dela
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODELO_API,
      max_tokens: maxTokens,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: dados } },
          { type: "text", text: texto },
        ],
      }],
    }),
  });
  if (!resposta.ok) throw new Error(`API ${resposta.status}`);
  const bruto = (await resposta.json()).content.map(b => b.text ?? "").join("");
  return JSON.parse(bruto.slice(bruto.indexOf("{"), bruto.lastIndexOf("}") + 1));
}

/** Foto do quadro atual em JPEG, com no máximo `lado` px no lado maior (menos dados, resposta mais rápida). */
export function fotografar(video, lado = 768) {
  const escala = Math.min(1, lado / Math.max(video.videoWidth, video.videoHeight));
  const c = document.createElement("canvas");
  c.width = Math.round(video.videoWidth * escala);
  c.height = Math.round(video.videoHeight * escala);
  c.getContext("2d").drawImage(video, 0, 0, c.width, c.height);
  return new Promise(ok => c.toBlob(ok, "image/jpeg", lado > 768 ? 0.9 : 0.75));
}
