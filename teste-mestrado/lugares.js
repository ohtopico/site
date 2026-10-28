// Memória de lugares, em texto, guardada só neste celular.
// "Lembrar este lugar como cozinha" guarda os objetos vistos no último minuto (com a direção)
// e, se houver IA na nuvem, uma frase descrevendo o lugar. "Onde estou?" compara o que a câmera
// vê agora com os lugares guardados.

import { normalizar } from "./vocabulario.js";

const CHAVE = "assistencia.lugares";
const SEMELHANCA_MIN = 0.34;

export function listarLugares() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; }
}
function salvar(lista) {
  try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch {}
}
export function apagarLugar(nome) {
  const alvo = normalizar(nome);
  const l = listarLugares().find(x => normalizar(x.nome) === alvo || normalizar(x.nome).includes(alvo));
  if (l) salvar(listarLugares().filter(x => x.nome !== l.nome));
  return l;
}

/** Guarda o lugar. `objetos`: [{ nome, onde }] (onde = "à sua esquerda" etc.). Devolve o registro. */
export function lembrarLugar(nome, objetos, descricao = "") {
  const texto = `${nome}: ` + (objetos.length
    ? objetos.map(o => `${o.nome} ${o.onde}`).join(", ")
    : "nenhum objeto reconhecido") + (descricao ? `. ${descricao}` : "");
  const registro = { nome, objetos: [...new Set(objetos.map(o => o.nome))], texto, criado: new Date().toISOString() };
  salvar([...listarLugares().filter(l => normalizar(l.nome) !== normalizar(nome)), registro]);
  return registro;
}

/** Acrescenta a descrição da IA a um lugar já salvo (ela chega alguns segundos depois). */
export function descreverLugar(nome, descricao) {
  const lista = listarLugares();
  const l = lista.find(x => x.nome === nome);
  if (!l || !descricao) return;
  l.texto += `. ${descricao}`;
  salvar(lista);
}

/** O lugar guardado mais parecido com os objetos vistos agora, ou null. */
export function ondeEstou(vistos) {
  const agora = new Set(vistos);
  if (!agora.size) return null;
  let melhor = null, nota = SEMELHANCA_MIN;
  for (const l of listarLugares()) {
    const antes = new Set(l.objetos);
    const comum = [...agora].filter(n => antes.has(n)).length;
    const uniao = new Set([...agora, ...antes]).size;
    const j = uniao ? comum / uniao : 0;
    if (j >= nota) { nota = j; melhor = l; }
  }
  return melhor;
}
