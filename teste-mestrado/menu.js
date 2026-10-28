// Menu de comandos por grupos: falado ("menu", depois o nome do grupo) e escrito na tela inicial,
// para o leitor de tela. Uma lista só, para as duas formas não ficarem diferentes.

export const GRUPOS = [
  {
    nome: "objetos", padrao: /objeto|procurar|achar/,
    resumo: "achar coisas pela câmera",
    comandos: [
      ["cadê a chave", "procura e guia você com bipes, dizendo o lado, a distância e o que está no caminho"],
      ["tem extintor?", "diz se há o objeto por perto"],
      ["o que tem na minha frente?", "descreve os objetos à frente, do mais perto ao mais longe"],
      ["o caminho está livre?", "diz se dá para seguir em frente"],
    ],
  },
  {
    nome: "memória", padrao: /memoria|lugar|ambiente|lembra/,
    resumo: "lembrar o que passou e reconhecer lugares",
    comandos: [
      ["o que eu passei?", "o que saiu da câmera no último minuto"],
      ["onde estava a porta?", "a direção de algo que você já passou"],
      ["lembrar este lugar como cozinha", "guarda o lugar no celular, em texto"],
      ["onde estou?", "reconhece um lugar guardado"],
      ["quais são os lugares?", "lista os lugares guardados"],
      ["esquecer o lugar cozinha", "apaga um lugar"],
    ],
  },
  {
    nome: "pessoas", padrao: /pessoa|rosto|gente/,
    resumo: "reconhecer pessoas que concordaram em ser cadastradas",
    comandos: [
      ["cadastrar pessoa Maria", "pede o consentimento da pessoa e guarda o rosto só neste celular"],
      ["quem está aqui?", "diz quem das pessoas cadastradas está à frente"],
      ["quais são as pessoas?", "lista as pessoas cadastradas"],
      ["apagar pessoa Maria", "apaga a pessoa do celular"],
    ],
  },
  {
    nome: "caminhos", padrao: /caminho|percurso|trajeto|predio por dentro/,
    resumo: "gravar e repetir percursos dentro de prédios",
    comandos: [
      ["gravar o caminho até o banheiro", "começa a gravar passos e curvas enquanto você anda; também vale começar a gravar, sem nome, que eu pergunto no fim"],
      ["cheguei", "termina e salva o percurso; também vale terminar gravação, parar, ou pronto"],
      ["seguir percurso banheiro", "guia você pelo percurso gravado"],
      ["voltar pelo percurso banheiro", "guia o caminho de volta"],
      ["quais são os percursos?", "lista os percursos gravados"],
      ["apagar percurso banheiro", "apaga um percurso"],
    ],
  },
  {
    nome: "rua", padrao: /\brua\b|mapa|gps|fora/,
    resumo: "orientação na rua pelo GPS",
    comandos: [
      ["que prédio é esse?", "diz os prédios e lugares à frente e dos lados"],
      ["onde fica a reitoria?", "diz a direção e a distância até o lugar"],
      ["me leva até a reitoria", "guia a pé, falando quando virar"],
      ["quanto falta?", "diz a próxima curva e quanto falta"],
    ],
  },
  {
    nome: "leitura", padrao: /leitura|\bler\b|texto|livro/,
    resumo: "ler livros, placas e rótulos",
    comandos: [
      ["leia este texto", "fotografa a página e lê em voz alta"],
      ["ler de novo", "lê a próxima página ou tenta de novo"],
    ],
  },
  {
    nome: "voz", padrao: /voz|controle|configura|silencio/,
    resumo: "voz, velocidade, silêncio e parar",
    comandos: [
      ["trocar voz", "passa para outra voz do celular"],
      ["fale mais devagar", "ou fale mais rápido"],
      ["silêncio por 10 minutos", "fica em espera; sem dizer o tempo, espera até você dizer continuar"],
      ["continuar", "sai do silêncio"],
      ["parar", "para o que estiver fazendo"],
      ["como funciona", "ouve o tutorial"],
    ],
  },
];

/** O grupo citado na frase (já sem acentos), ou null. */
export const grupoDaFrase = f => GRUPOS.find(g => g.padrao.test(f)) ?? null;

const lista = nomes => nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1];

export const falaDoMenu = () =>
  `São ${GRUPOS.length} grupos: ${lista(GRUPOS.map(g => g.nome))}. Toque e diga o nome de um grupo, por exemplo: rua.`;

export const falaDoGrupo = g =>
  `${g.nome[0].toUpperCase() + g.nome.slice(1)}: ${g.resumo}. ` +
  g.comandos.map(([c, o]) => `Diga ${c.replace(/\?$/, "")}: ${o}.`).join(" ") +
  " Para outro grupo, toque e diga menu.";

/** Lista escrita, por grupos, para a tela inicial. */
export function montarListaDeComandos(destino) {
  for (const g of GRUPOS) {
    const titulo = document.createElement("h3");
    titulo.textContent = `${g.nome[0].toUpperCase() + g.nome.slice(1)}: ${g.resumo}`;
    const ul = document.createElement("ul");
    for (const [c, o] of g.comandos) {
      const li = document.createElement("li");
      const b = document.createElement("strong");
      b.textContent = `“${c}”`;
      li.append(b, ` ${o}`);
      ul.append(li);
    }
    destino.append(titulo, ul);
  }
}
