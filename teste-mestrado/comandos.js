// Transforma a frase falada numa tarefa.
//   { tipo: "procurar" | "verificar", rotulo, alvo }  rotulo = null se o detector local não conhece
//   { tipo: "gravar" | "seguir" | "voltar" | "apagar", nome }  percursos gravados
//   { tipo: "lugar" | "apagarLugar" | "cadastrar" | "apagarPessoa", nome }  lugares e pessoas
//   { tipo: "ondeEstou" | "quem" | "listarPessoas" | "listarLugares" }
//   { tipo: "mapa" | "ondeFica", destino }             na rua, pelo GPS e o OpenStreetMap
//   { tipo: "predio" | "quantoFalta" }                 o que há perto na rua; quanto falta na rota
//   { tipo: "ler" | "trocarVoz" }                      ler texto pela câmera (IA na nuvem); outra voz do celular
//   { tipo: "velocidade", sentido: 1 | -1 }            falar mais rápido ou mais devagar
//   { tipo: "pausar", minutos }                        modo silêncio (minutos = null: até dizer continuar)
//   { tipo: "sim" | "nao" | "descrever" | "livre" | "lembrar" | "listar" | "terminar" | "parar" | "pausar"
//          | "retomar" | "explicar" | "desconhecido" }
//   { tipo: "menu", grupo }                            menu falado; grupo = nome do grupo citado ou null

import { acharObjeto } from "./vocabulario.js";
import { grupoDaFrase } from "./menu.js";

const PERCURSO = "(o |um |pelo |no )?(percurso|caminho|trajeto|rota)";
const ROTA = "percurso|caminho|trajeto|trajetoria|rota|trilha";
// "... chamado banheiro", "... até o banheiro", "... para a cozinha": o resto é o nome
const NOME_DA_ROTA = "( chamad[oa]| com (o )?nome( de)?| de nome| ate( o| a)?| para( o| a)?| pro| pra( o| a)?| d[oa])?(?<nome>.*)";

// Pedidos com um nome no fim: o grupo "nome" é o resto da frase
const COM_NOME = [
  // Gravação: vários jeitos de dizer, para não depender das palavras exatas
  ["terminar", new RegExp(`^((pode )?(termina|para|encerra|finaliza|salva|acaba|conclui|desliga|fecha)(r)?( de)?|fim d[ae]|chega de) ` +
    `(a |o |essa |esse |de )?(grava(cao|r|ndo)|${ROTA})`)],
  ["terminar", /^(terminei|acabei|cheguei|chegamos|acabou( a gravacao)?|fim da gravacao|gravacao (terminada|encerrada|concluida))\b/],
  ["voltar", new RegExp(`^volta(r)? ${PERCURSO}(?<nome>.*)`)],
  ["seguir", new RegExp(`^(segu(e|ir)|repet(e|ir)|faz(er)?|percorre(r)?|me leva) ${PERCURSO}(?<nome>.*)`)],
  ["apagar", new RegExp(`^(apaga(r)?|exclui(r)?|remove(r)?|deleta(r)?) ${PERCURSO}(?<nome>.*)`)],
  ["lugar", /^(lembra(r)?|guarda(r)?|salva(r)?|grava(r)?|memoriza(r)?) (deste |este |esse |desse |o )?(lugar|local|ambiente|comodo)( como| com o nome| de nome| chamado)?(?<nome>.*)/],
  // Pessoas: vários jeitos de pedir o cadastro ("cadastrar pessoa Maria", "te apresento a Maria", "essa é minha mãe")
  ["cadastrar", /^((eu )?(quero|vou|pode|vamos|preciso) )?(cadastra|registra|salva|memoriza|lembra|grava|reconhece|aprende|adiciona|guarda|conhece)(r)?( de| do| da)? (a |o |um |uma |essa |esta |esse |este |nova |novo )?(pessoa|rosto|amig[oa]|colega|conhecid[oa]|familiar)( chamad[ao]| de nome| d[ae]| do)?(?<nome>.*)/],
  ["cadastrar", /^(nova|novo) (pessoa|rosto|cadastro de pessoa)( chamad[ao]| d[ae])?(?<nome>.*)/],
  ["cadastrar", /^((eu )?(te|vou te|quero te) )?(apresento|apresentar|conheca|conhecer)( a| o)? (?<nome>.+)/],
  ["gravar", new RegExp(`^((eu )?(quero|vou|pode|preciso|vamos)( comecar a| comecar)? )?` +
    `(grava(r)?|comeca(r)?( a)? grava(r|cao)?|inicia(r)?( a)? grava(r|cao)?)` +
    `( (o |um |uma |a |esse |este |esta |essa |meu |minha |novo |nova )?(${ROTA}|gravacao))?${NOME_DA_ROTA}`)],
  ["gravar", new RegExp(`^((eu )?(quero|vou|pode|vamos) )?(memoriza|aprende|registra)(r)? (o |um |uma |a |esse |este |esta |essa )?(${ROTA})${NOME_DA_ROTA}`)],
  ["gravar", new RegExp(`^(nova|novo) (${ROTA}|gravacao)${NOME_DA_ROTA}`)],
  ["apagarLugar", /^(apaga|esquece|remove|exclui)r? (o )?(lugar|local) (?<nome>.+)/],
  ["cadastrar", /^(esta|essa|este|esse) (e|eh) (a |o |minha |meu )?(?<nome>.+)/],
  ["apagarPessoa", /^(apaga|esquece|remove|exclui)r? (a |o )?(pessoa|rosto)( d[ae])? (?<nome>.+)/],
  ["mapa", /^(navega(r)?|como (eu )?(chego|vou)|rota|caminho a pe|me leva) (ate |para |pra |a |ao |na |no |em |à )*(?<nome>.+)/],
];

// Palavras que indicam um lugar na rua (vai para o mapa em vez da câmera)
const LUGAR = /\b(rua|avenida|av|praca|predio|bloco|reitoria|biblioteca|banco|loja|lanchonete|cafe|rodoviaria|estacao|shopping|mercado|supermercado|farmacia|hospital|posto|universidade|ufsm|faculdade|escola|parada|ponto de onibus|casa|centro|bairro|parque|igreja|prefeitura|restaurante|padaria|aeroporto|endereco)\b|\d/;

const PADROES = [
  // antes de "sim": "pode ficar em silêncio" é silêncio, não um sim
  ["pausar", /(modo (de )?(silencio(so)?|silenciar|espera|descanso|soneca)\b|^(silencio(so)?|pausa(r)?|descansa(r)?|shh+|psiu)\b|silencia(r)?\b|fi(ca|que|car)( em)? (quiet[ao]|calad[ao]|em silencio|mud[ao])|faz(er)? silencio|cala a boca|cal[ae]-?se|(para|pare|parar) de falar|nao fal[ae] (nada|mais))/],
  ["sim", /^(sim|quero|pode|claro|ok|por favor)\b/],
  ["nao", /^(nao|agora nao|depois|dispenso)\b/],
  ["explicar", /^(como (isso |o site |voce |o app |o aplicativo )?funciona|explica|explique|tutorial)/],
  ["velocidade", /(fal[ae]|le|leia|ler)( mais)? (rapido|devagar|depressa|lento)|(mais|menos) (rapido|devagar)/],
  ["ler", /^((le|ler|leia|leh)( para mim| pra mim)?( o| a| este| esse| esta| essa| isto| isso| aqui| de novo| a proxima| outra)*( (texto|pagina|livro|documento|placa|papel|carta|rotulo|bula|cardapio|embalagem|aviso|cartaz|receita))?\b|o que (esta )?escrito|proxima pagina)/],
  ["trocarVoz", /^(troca(r)?|muda(r)?|outra) (a |de )?voz/],
  ["predio", /((que|qual) (e )?(o |a )?(predio|edificio|bloco|loja|construcao|estabelecimento|lugar na rua)( e| eh)?( esse| este| aquele| aqui| a (minha )?frente| na (minha )?frente)|(qual|que) (e )?(esse|este|aquele) (predio|edificio|bloco|loja|lugar)|o que tem (por )?perto( daqui)?|o que tem na rua|onde estou na rua)/],
  ["quantoFalta", /(quanto (falta|tempo falta)|falta muito|onde (eu )?viro|qual (e )?(a )?proxima (curva|instrucao))/],
  ["ondeEstou", /(onde (eu )?estou|que lugar e (esse|este)|reconhece (o|este|esse) lugar)/],
  ["quem", /(quem (esta|e|ta)( aqui| ai| na (minha )?frente)?|quem e (essa|esta) pessoa|reconhece (essa|esta) pessoa)/],
  ["listarPessoas", /quais (sao )?(as )?pessoas/],
  ["listarLugares", /quais (sao )?(os )?lugares/],
  ["lembrar", /(o que (eu )?(passei|deixei|ficou)|o que (tinha|havia) (aqui|por aqui|atras)|o que voce (lembra|viu)|ficou para tras)/],
  ["listar", /(quais (sao )?(os |as )?(percursos|caminhos|trajetos|rotas)|lista(r)? (os |as )?(percursos|caminhos|trajetos|rotas))/],
  ["livre", /(caminho (esta )?livre|posso (seguir|ir|andar)|da para (passar|seguir)|tem espaco)/],
  ["parar", /^(parar?|para tudo|cancela(r)?|chega|pronto|achei|obrigad[ao])\b/],
  ["retomar", /^(continua(r)?|retoma(r)?|volta(r)?)\b/],
  ["menu", /^(menu|opcoes|ajuda|comandos|o que (voce )?(sabe|pode) fazer|quais (sao )?(os )?comandos)\b/],
  ["descrever", /(o que (tem|ha|existe|voce ve|esta)( aqui| na (minha )?frente| ao (meu )?redor| em volta)?|descreve|descreva)/],
  ["verificar", /^(sera que )?(aqui |o lugar |a sala |esse lugar |este lugar )?(tem|ha|existe)( algum| alguma| um| uma)? /],
  ["procurar", /(ach[ae]|encontr[ae]|procur[ae]|cade|onde (estava|estavam|esta|estao|fica|ficam|tem|ta)|me (leva|guia) (ate|para|pra)|busc[ae]|localiz[ae])/],
];

// Palavras que sobram depois do verbo e não fazem parte do nome do objeto
const VAZIAS = new Set(("o a os as um uma meu minha meus minhas pra para mim me por favor aqui ai " +
  "esta fica tem ha existe algum alguma onde cade sera que lugar sala esse este ate").split(" "));

// Igual a normalizar(), mas sem juntar espaços: cada posição continua batendo com a frase original
const semAcento = texto => [...texto.toLowerCase()].map(c => c.normalize("NFD")[0]).join("").replace(/[?!.,]/g, " ");

const NUMEROS = { um: 1, uma: 1, dois: 2, duas: 2, tres: 3, cinco: 5, dez: 10, quinze: 15, vinte: 20, trinta: 30, quarenta: 40 };

/** "por 10 minutos" -> 10, "meia hora" -> 30, "uma hora" -> 60; sem tempo -> null. */
export function minutosDe(f) {
  if (/meia hora/.test(f)) return 30;
  const m = f.match(/(\d+|um|uma|dois|duas|tres|cinco|dez|quinze|vinte|trinta|quarenta) (minuto|hora)/);
  if (!m) return null;
  const n = /\d/.test(m[1]) ? +m[1] : NUMEROS[m[1]];
  return m[2] === "hora" ? n * 60 : n;
}

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
    if (tipo === "pausar") return { tipo, minutos: minutosDe(f) };
    if (tipo === "menu") return { tipo, grupo: grupoDaFrase(f.slice(m[0].length))?.nome ?? null };
    if (tipo === "velocidade") return { tipo, sentido: /devagar|lento|menos rapido/.test(f) && !/menos devagar/.test(f) ? -1 : 1 };
    if (tipo !== "procurar" && tipo !== "verificar") return { tipo };
    const inicio = m.index + m[0].length;
    const resto = f.slice(inicio);
    // O alvo é falado de volta, então vem da frase original, com acentos
    const palavras = original.slice(inicio).split(/\s+/);
    const alvo = resto.split(/\s+/)
      .map((p, i) => (p && !VAZIAS.has(p) ? palavras[i] : null))
      .filter(Boolean).join(" ");
    if (!alvo) return { tipo: "desconhecido", frase };
    const rotulo = acharObjeto(resto);
    // "onde fica a reitoria" é no mapa; "onde fica a saída" é na câmera
    if (/onde fica/.test(m[0]) && !rotulo && LUGAR.test(resto)) return { tipo: "ondeFica", destino: alvo };
    return { tipo, rotulo, alvo };
  }
  // Só o nome de um objeto conhecido ("xícara") vale como procurar
  const rotulo = acharObjeto(f);
  if (rotulo) return { tipo: "procurar", rotulo, alvo: original.trim() };
  return { tipo: "desconhecido", frase };
}
