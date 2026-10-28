// Transforma a frase falada numa tarefa.
//   { tipo: "procurar" | "verificar", rotulo, alvo }  rotulo = null se o detector local não conhece
//   { tipo: "gravar" | "seguir" | "voltar" | "apagar", nome }  percursos gravados
//   { tipo: "lugar" | "apagarLugar" | "cadastrar" | "apagarPessoa", nome }  lugares e pessoas
//   { tipo: "ondeEstou" | "quem" | "listarPessoas" | "listarLugares" }
//   { tipo: "mapa", destino }                          navegação a pé na rua (Google Maps)
//   { tipo: "sim" | "nao" | "descrever" | "livre" | "lembrar" | "listar" | "terminar" | "parar" | "pausar"
//          | "retomar" | "ajuda" | "explicar" | "desconhecido" }

import { acharObjeto } from "./vocabulario.js";

const PERCURSO = "(o |um |pelo |no )?(percurso|caminho|trajeto|rota)";

// Pedidos com um nome no fim: o grupo "nome" é o resto da frase
const COM_NOME = [
  ["terminar", new RegExp(`^(termina(r)?|para(r)?|fim da|encerra(r)?|finaliza(r)?|salva(r)?) (a )?grava(cao|r)`)],
  ["gravar", new RegExp(`^(grava(r)?|comeca(r)? a gravar|salva(r)?) ${PERCURSO}( chamado| com (o )?nome| de nome)?(?<nome>.*)`)],
  ["voltar", new RegExp(`^volta(r)? ${PERCURSO}(?<nome>.*)`)],
  ["seguir", new RegExp(`^(segu(e|ir)|repet(e|ir)|faz(er)?|percorre(r)?|me leva) ${PERCURSO}(?<nome>.*)`)],
  ["apagar", new RegExp(`^(apaga(r)?|exclui(r)?|remove(r)?|deleta(r)?) ${PERCURSO}(?<nome>.*)`)],
  ["lugar", /^(lembra(r)?|guarda(r)?|salva(r)?|grava(r)?|memoriza(r)?) (deste |este |esse |desse |o )?(lugar|local|ambiente|comodo)( como| com o nome| de nome| chamado)?(?<nome>.*)/],
  ["apagarLugar", /^(apaga|esquece|remove|exclui)r? (o )?(lugar|local) (?<nome>.+)/],
  ["cadastrar", /^(cadastra|registra|salva|memoriza|lembra)r? (a |o |um |uma )?(pessoa|rosto)( chamad[ao]| de nome| d[ae])?(?<nome>.*)/],
  ["cadastrar", /^(esta|essa|este|esse) (e|eh) (a |o )?(?<nome>.+)/],
  ["apagarPessoa", /^(apaga|esquece|remove|exclui)r? (a |o )?(pessoa|rosto)( d[ae])? (?<nome>.+)/],
  ["mapa", /^(navega(r)?|como (eu )?(chego|vou)|rota|caminho a pe|me leva) (ate |para |pra |a |ao |na |no |em |à )*(?<nome>.+)/],
];

// Palavras que indicam um lugar na rua (vai para o Google Maps em vez da câmera)
const LUGAR = /\b(rua|avenida|av|praca|rodoviaria|estacao|shopping|mercado|supermercado|farmacia|hospital|posto|universidade|ufsm|faculdade|escola|parada|ponto de onibus|casa|centro|bairro|parque|igreja|prefeitura|restaurante|padaria|aeroporto|endereco)\b|\d/;

const PADROES = [
  ["sim", /^(sim|quero|pode|claro|ok|por favor)\b/],
  ["nao", /^(nao|agora nao|depois|dispenso)\b/],
  ["explicar", /^(como (isso|o site|voce) funciona|explica|explique)/],
  ["ondeEstou", /(onde (eu )?estou|que lugar e (esse|este)|reconhece (o|este|esse) lugar)/],
  ["quem", /(quem (esta|e|ta)( aqui| ai| na (minha )?frente)?|quem e (essa|esta) pessoa|reconhece (essa|esta) pessoa)/],
  ["listarPessoas", /quais (sao )?(as )?pessoas/],
  ["listarLugares", /quais (sao )?(os )?lugares/],
  ["lembrar", /(o que (eu )?(passei|deixei|ficou)|o que (tinha|havia) (aqui|por aqui|atras)|o que voce (lembra|viu)|ficou para tras)/],
  ["listar", /(quais (sao )?(os |as )?(percursos|caminhos|trajetos|rotas)|lista(r)? (os |as )?(percursos|caminhos|trajetos|rotas))/],
  ["livre", /(caminho (esta )?livre|posso (seguir|ir|andar)|da para (passar|seguir)|tem espaco)/],
  ["parar", /^(parar?|para tudo|cancela(r)?|chega|pronto|achei|obrigad[ao])\b/],
  ["pausar", /^(pausa(r)?|silencio|fica quiet[ao]|cala a boca)\b/],
  ["retomar", /^(continua(r)?|retoma(r)?|volta(r)?)\b/],
  ["ajuda", /^(ajuda|o que (voce )?(sabe|pode) fazer|comandos)\b/],
  ["descrever", /(o que (tem|ha|existe|voce ve|esta)( aqui| na (minha )?frente| ao (meu )?redor| em volta)?|descreve|descreva)/],
  ["verificar", /^(sera que )?(aqui |o lugar |a sala |esse lugar |este lugar )?(tem|ha|existe)( algum| alguma| um| uma)? /],
  ["procurar", /(ach[ae]|encontr[ae]|procur[ae]|cade|onde (estava|estavam|esta|estao|fica|ficam|tem|ta)|me (leva|guia) (ate|para|pra)|busc[ae]|localiz[ae])/],
];

// Palavras que sobram depois do verbo e não fazem parte do nome do objeto
const VAZIAS = new Set(("o a os as um uma meu minha meus minhas pra para mim me por favor aqui ai " +
  "esta fica tem ha existe algum alguma onde cade sera que lugar sala esse este ate").split(" "));

// Igual a normalizar(), mas sem juntar espaços: cada posição continua batendo com a frase original
const semAcento = texto => [...texto.toLowerCase()].map(c => c.normalize("NFD")[0]).join("").replace(/[?!.,]/g, " ");

export function interpretar(frase) {
  const f = semAcento(frase);
  const original = frase.toLowerCase().replace(/[?!.,]/g, " ");
  for (const [tipo, padrao] of COM_NOME) {
    const m = f.match(padrao);
    if (!m) continue;
    const ini = m.groups?.nome != null ? f.length - m.groups.nome.length : f.length;
    const nome = original.slice(ini).trim();
    if (tipo === "mapa") {
      // "me leva até a xícara" é procurar; "me leva até a rodoviária" é mapa
      if (m[0].startsWith("me leva") && (acharObjeto(nome) || !LUGAR.test(semAcento(nome)))) break;
      return { tipo, destino: nome };
    }
    return { tipo, nome };
  }
  for (const [tipo, padrao] of PADROES) {
    const m = f.match(padrao);
    if (!m) continue;
    if (tipo !== "procurar" && tipo !== "verificar") return { tipo };
    const inicio = m.index + m[0].length;
    const resto = f.slice(inicio);
    // O alvo é falado de volta, então vem da frase original, com acentos
    const palavras = original.slice(inicio).split(/\s+/);
    const alvo = resto.split(/\s+/)
      .map((p, i) => (p && !VAZIAS.has(p) ? palavras[i] : null))
      .filter(Boolean).join(" ");
    if (!alvo) return { tipo: "desconhecido", frase };
    return { tipo, rotulo: acharObjeto(resto), alvo };
  }
  // Só o nome de um objeto conhecido ("xícara") vale como procurar
  const rotulo = acharObjeto(f);
  if (rotulo) return { tipo: "procurar", rotulo, alvo: original.trim() };
  return { tipo: "desconhecido", frase };
}
