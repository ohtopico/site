/* META {
  "id": "hum-manchete", "icone": "📰", "titulo": "Manchete na mira",
  "intro": "Do rádio de Vargas ao algoritmo da rede social. Separe sinais de notícia falsa e de notícia confiável e analise como a imprensa, a propaganda e a censura moldaram a política no Brasil e no mundo.",
  "resumo": "Meios de comunicação, propaganda política, censura, indústria cultural e checagem de notícias falsas.",
  "habs": ["H21", "H14", "H23"],
  "cola": [
    ["Era Vargas:", "rádio como integrador nacional, DIP (Departamento de Imprensa e Propaganda, 1939) controlava a imprensa e fazia culto a Vargas; “Hora do Brasil” (1935), hoje “A Voz do Brasil”."],
    ["Ditadura militar:", "censura prévia a jornais, músicas e novelas (AI-5), propaganda ufanista (“Brasil, ame-o ou deixe-o”), uso da Copa de 1970; a TV integrou o país via satélite (Embratel)."],
    ["Conceitos:", "indústria cultural (Adorno e Horkheimer), “o meio é a mensagem” e aldeia global (McLuhan), pós-verdade (emoção e crença pesam mais que os fatos), bolhas e câmaras de eco criadas por algoritmos."]
  ]
} */
const { sorteia: S, mix } = HUM;
const SINAIS = [
  ['🔠', 'Título em letras maiúsculas com “URGENTE!!! COMPARTILHE ANTES QUE APAGUEM”', 0, 'Apelo à emoção e à pressa é a marca da desinformação: quer que você compartilhe sem pensar.'],
  ['👤', 'Texto sem autor, sem data e sem citar de onde vieram os dados', 0, 'Sem fonte verificável, não há como checar.'],
  ['📅', 'Notícia verdadeira de 2016 circulando hoje como se fosse nova', 0, 'Tirar a notícia do contexto (data e lugar) também é desinformação.'],
  ['🖼️', 'Foto chocante que, numa busca reversa de imagem, aparece em outro país e outra época', 0, 'Imagem real, legenda falsa: é muito comum.'],
  ['🌐', 'Site com endereço parecido com o de um jornal famoso, mas com uma letra trocada', 0, 'Sites que imitam veículos conhecidos enganam pela aparência.'],
  ['🔗', 'Link para o estudo científico original e para o órgão oficial citado', 1, 'Fonte primária que você pode conferir é sinal de confiabilidade.'],
  ['📰', 'O mesmo fato aparece em vários veículos diferentes e independentes', 1, 'Checagem cruzada: quando várias redações independentes confirmam, a chance de ser verdade sobe.'],
  ['✍️', 'Reportagem assinada, com data, e que ouve os dois lados', 1, 'Autor identificado e contraditório são práticas do bom jornalismo.'],
  ['🔎', 'Agência de checagem explica como verificou a informação', 1, 'Transparência sobre o método ajuda o leitor a julgar.']
];
const QS = [
  { hab: 'H21', texto: 'Nos anos 1930 e 1940, o rádio chegou a milhões de lares. O governo Vargas criou a “Hora do Brasil” e o Departamento de Imprensa e Propaganda (DIP), e as rádios difundiam samba, futebol e radionovelas para todo o país.',
    enun: 'No Estado Novo, o rádio foi usado principalmente para',
    certa: 'construir uma identidade nacional e divulgar a imagem de Vargas como “pai dos pobres”',
    erradas: ['garantir a liberdade de imprensa e a crítica ao governo', 'fortalecer as oligarquias regionais contra o governo central', 'divulgar a cultura dos países do Eixo como modelo', 'substituir a escola pública obrigatória'],
    expl: 'O rádio <b>integrou</b> o país e foi peça central da <b>propaganda</b> do Estado Novo. O DIP também censurava jornais, livros e músicas.' },
  { hab: 'H21', texto: 'Durante a ditadura militar, jornais publicavam receitas de bolo e trechos de “Os Lusíadas” no lugar das matérias cortadas pelos censores.',
    enun: 'Essa estratégia dos jornais era uma forma de',
    certa: 'denunciar ao leitor, de maneira indireta, a existência da censura prévia',
    erradas: ['apoiar a política econômica do governo', 'atrair leitoras interessadas em culinária', 'cumprir uma lei que exigia conteúdo literário', 'economizar papel nas edições'],
    expl: 'O espaço “estranho” na página avisava ao leitor: algo foi cortado aqui. Músicos também driblaram a censura com metáforas (“Cálice”, de Chico Buarque e Gilberto Gil).' },
  { hab: 'H23', texto: '“Brasil, ame-o ou deixe-o.” — slogan difundido durante o governo Médici (1969–1974), auge da repressão e do “milagre econômico”.',
    enun: 'O slogan revela uma concepção de patriotismo que',
    certa: 'identificava amar o país com apoiar o governo, tratando os opositores como inimigos da nação',
    erradas: ['valorizava a crítica como forma de cidadania', 'estimulava a participação popular nas eleições diretas', 'defendia a anistia aos exilados políticos', 'propunha a integração do Brasil ao bloco socialista'],
    expl: 'Confundir <b>pátria</b> com <b>governo</b> é típico de regimes autoritários. Na democracia, criticar o governo é um direito do cidadão.' },
  { hab: 'H14', texto: 'Para Adorno e Horkheimer, a indústria cultural produz filmes, músicas e programas como mercadorias padronizadas. Já para outros estudiosos, o público reinterpreta o que consome e cria usos próprios para a cultura de massa.',
    enun: 'Os dois pontos de vista divergem quanto',
    certa: 'ao grau de passividade do público diante dos meios de comunicação',
    erradas: ['à existência dos meios de comunicação de massa', 'à data de invenção do rádio e da televisão', 'ao fato de a cultura de massa ser vendida', 'à importância da tecnologia na produção cultural'],
    expl: 'Frankfurt: público <b>passivo</b>, manipulado. Estudos culturais (como Stuart Hall) e Jesús Martín-Barbero: público <b>ativo</b>, que negocia sentidos. O ENEM adora comparar visões.' },
  { hab: 'H21', texto: 'Algoritmos de redes sociais mostram a cada usuário mais do que ele já curtiu e concorda. Pesquisas indicam que notícias falsas se espalham mais rápido que as verdadeiras, por serem mais emocionantes e surpreendentes.',
    enun: 'Um efeito desse funcionamento sobre a vida democrática é',
    certa: 'a formação de bolhas que dificultam o contato com opiniões diferentes e favorecem a polarização',
    erradas: ['a garantia de que todos recebem as mesmas informações', 'o fim da circulação de boatos', 'a redução do tempo que as pessoas passam conectadas', 'a eliminação da propaganda política'],
    expl: '<b>Bolhas</b> e <b>câmaras de eco</b> reforçam o que já pensamos. Junto com a desinformação, ajudam a criar a <b>pós-verdade</b>: crença e emoção valem mais que fatos.' },
  { hab: 'H23', texto: 'A Constituição garante a liberdade de expressão e proíbe a censura. O STF, porém, já decidiu que essa liberdade não protege o discurso de ódio nem a incitação ao racismo.',
    enun: 'Essa interpretação se baseia na ideia de que',
    certa: 'a liberdade de expressão convive com outros direitos, como a dignidade e a igualdade, e tem limites',
    erradas: ['a liberdade de expressão é absoluta e não admite exceção', 'o Estado pode censurar previamente qualquer jornal', 'apenas jornalistas têm direito à liberdade de expressão', 'a Constituição não trata de liberdade de expressão'],
    expl: 'Nenhum direito é absoluto quando atinge o direito de outros. Proibir a censura prévia não impede a <b>responsabilização</b> depois por crimes como racismo e calúnia.' },
  { hab: 'H21', texto: 'Na Alemanha nazista, o Ministério da Propaganda de Joseph Goebbels controlava o rádio, o cinema e a imprensa. Rádios baratos foram distribuídos para que os discursos de Hitler chegassem a todas as casas.',
    enun: 'Essa política mostra que os regimes totalitários',
    certa: 'usaram os meios de comunicação de massa para controlar a opinião pública e difundir a ideologia oficial',
    erradas: ['proibiram o uso do rádio por considerá-lo perigoso', 'garantiram a pluralidade de opiniões na imprensa', 'usaram o rádio apenas para entretenimento', 'deixaram a comunicação sob controle de empresas independentes'],
    expl: 'Propaganda + censura + culto ao líder. A repetição de mensagens simples e a criação de inimigos (judeus, comunistas) foram estratégias centrais.' }
];
const sinal = s => ({ tipo: 'bins', hab: 'H21', emo: s[0], item: s[1], pergunta: 'Isso é sinal de quê?', opcoes: ['🚩 Sinal de notícia falsa', '✅ Sinal de notícia confiável'], certa: s[2], expl: s[3] });
HUM.jogo({ id: 'hum-manchete', proximo: ['hum-linha-tempo.html', 'Linha do tempo'],
  fila: () => { const s = mix(SINAIS), q = mix(QS).slice(0, 6).map(x => Object.assign({ tipo: 'mc' }, x));
    return [sinal(s[0]), q[0], q[1], sinal(s[1]), q[2], q[3], sinal(s[2]), q[4], sinal(s[3]), q[5]]; } });
