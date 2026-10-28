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
 "resposta": "frase curta em português para ser falada, no máximo 15 palavras, dizendo onde está e como chegar; se não encontrou, diga isso"}
Se houver uma placa indicando o caminho (ex.: seta de saída), considere encontrado e diga para onde a placa aponta.`;

export const lerChave = () => { try { return localStorage.getItem(CHAVE) || ""; } catch { return ""; } };
export const salvarChave = valor => { try { valor ? localStorage.setItem(CHAVE, valor) : localStorage.removeItem(CHAVE); } catch {} };

/** Devolve { origem, perguntar(foto: Blob, alvo) -> {encontrado, lado, distancia, resposta} } ou null. */
export async function abrirNuvem() {
  const sample = await window.claude?.use?.("sample").catch(() => null);
  if (sample && (await sample.limits().catch(() => ({}))).images) {
    return {
      origem: "claude",
      perguntar: (foto, alvo) => sample.json(instrucao(alvo), { images: [foto], modelTier: "quick", cache: false }),
    };
  }
  if (lerChave()) return { origem: "api", perguntar: perguntarApi };
  return null;
}

async function perguntarApi(foto, alvo) {
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
      max_tokens: 200,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: dados } },
          { type: "text", text: instrucao(alvo) },
        ],
      }],
    }),
  });
  if (!resposta.ok) throw new Error(`API ${resposta.status}`);
  const texto = (await resposta.json()).content.map(b => b.text ?? "").join("");
  return JSON.parse(texto.slice(texto.indexOf("{"), texto.lastIndexOf("}") + 1));
}

/** Foto do quadro atual em JPEG, com no máximo 768 px no lado maior (menos dados, resposta mais rápida). */
export function fotografar(video) {
  const escala = Math.min(1, 768 / Math.max(video.videoWidth, video.videoHeight));
  const c = document.createElement("canvas");
  c.width = Math.round(video.videoWidth * escala);
  c.height = Math.round(video.videoHeight * escala);
  c.getContext("2d").drawImage(video, 0, 0, c.width, c.height);
  return new Promise(ok => c.toBlob(ok, "image/jpeg", 0.75));
}
