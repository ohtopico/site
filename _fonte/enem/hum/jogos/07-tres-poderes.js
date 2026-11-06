/* META {
  "id": "hum-tres-poderes", "icone": "⚖️", "titulo": "Três Poderes e cidadania", "tipo": "simulador",
  "intro": "Simule o funcionamento da República: mande cada tarefa para o Legislativo, o Executivo ou o Judiciário, separe direitos civis, políticos e sociais e avalie o papel da Justiça e da democracia ao longo da história.",
  "resumo": "Funções dos Três Poderes, direitos civis, políticos e sociais, tipos de democracia e o papel da Justiça.",
  "habs": ["H12", "H15", "H24"],
  "cola": [
    ["Legislativo:", "faz as leis e fiscaliza o Executivo (com ajuda do TCU). Federal: Congresso = Câmara (deputados, representam o povo) + Senado (3 senadores por estado). Estadual: Assembleia. Municipal: Câmara de Vereadores."],
    ["Executivo:", "governa e administra: presidente, governador, prefeito. Sanciona ou veta leis, edita medidas provisórias, comanda as Forças Armadas."],
    ["Judiciário:", "julga conflitos aplicando as leis. O STF guarda a Constituição. Garantias: habeas corpus (liberdade de locomoção), mandado de segurança, habeas data."],
    ["Direitos (T. H. Marshall):", "civis (liberdade, ir e vir, expressão, propriedade), políticos (votar, ser votado, se organizar em partidos) e sociais (saúde, educação, trabalho, previdência)."]
  ]
} */
const { sorteia: S, mix } = HUM;
const PODERES = ['🏛️ Legislativo', '🏢 Executivo', '⚖️ Judiciário'];
const TAREFAS = [
  ['Votar e aprovar um projeto de lei sobre o uso de celulares nas escolas', 0, 'Fazer leis é a função típica do <b>Legislativo</b> (Câmara e Senado).'],
  ['Instalar uma CPI para investigar desvios em contratos públicos', 0, 'A Comissão Parlamentar de Inquérito é um instrumento de <b>fiscalização</b> do Legislativo.'],
  ['Julgar o presidente da República num processo de impeachment', 0, 'Quem julga o impeachment por crime de responsabilidade é o <b>Senado</b>, presidido nessa hora pelo presidente do STF.'],
  ['Aprovar o orçamento anual da União', 0, 'O Executivo propõe, mas quem vota a Lei Orçamentária é o <b>Congresso</b>.'],
  ['Sancionar ou vetar uma lei aprovada pelo Congresso', 1, 'Sanção e veto são atos do <b>presidente</b>. O Congresso pode derrubar o veto.'],
  ['Editar uma medida provisória em caso de urgência', 1, 'A MP é do <b>Executivo</b>, tem força de lei por até 120 dias e precisa ser votada pelo Congresso.'],
  ['Organizar a vacinação em massa num município', 1, 'Executar políticas públicas (saúde, transporte, escolas) é tarefa do <b>Executivo</b>: aqui, a prefeitura.'],
  ['Comandar as Forças Armadas', 1, 'O presidente é o comandante supremo das Forças Armadas (Executivo).'],
  ['Declarar que uma lei é inconstitucional', 2, 'O <b>STF</b> é o guardião da Constituição e faz o controle de constitucionalidade.'],
  ['Conceder habeas corpus a uma pessoa presa ilegalmente', 2, 'O habeas corpus é uma garantia julgada pelo <b>Judiciário</b> para proteger a liberdade de locomoção.'],
  ['Decidir quem tem razão numa disputa entre vizinhos', 2, 'Resolver conflitos aplicando a lei é a função típica do <b>Judiciário</b>.'],
  ['Cassar o registro de um candidato por compra de votos', 2, 'A <b>Justiça Eleitoral</b> (TSE e TREs) é parte do Judiciário.']
];
const DIREITOS = [['Expressar a opinião sem censura', 0], ['Ir e vir livremente pelo país', 0], ['Ter um julgamento justo', 0], ['Professar qualquer religião', 0], ['Ter propriedade', 0],
  ['Votar nas eleições', 1], ['Candidatar-se a vereador', 1], ['Filiar-se a um partido político', 1], ['Assinar um projeto de lei de iniciativa popular', 1],
  ['Ser atendido no SUS', 2], ['Estudar em escola pública gratuita', 2], ['Receber aposentadoria', 2], ['Ter salário mínimo e férias remuneradas', 2]];
const TIPOS = ['Direito civil (liberdades individuais)', 'Direito político (participar do poder)', 'Direito social (bem-estar)'];
const QS = [
  { hab: 'H12', texto: '“Se alguém arrancar o olho de um homem livre, arrancarão o seu olho. Se quebrar o osso de um homem livre, quebrarão o seu osso.”<cite>Código de Hamurábi, Mesopotâmia, c. 1750 a.C.</cite>',
    enun: 'O código escrito de Hamurábi teve importância histórica porque',
    certa: 'tornou as leis públicas e fixas, limitando a vingança privada pela lei de talião',
    erradas: ['garantiu direitos iguais a todas as pessoas, inclusive escravizados', 'criou a separação entre os Três Poderes', 'aboliu as penas físicas na Mesopotâmia', 'foi a primeira constituição democrática'],
    expl: '“Olho por olho” parece cruel hoje, mas fixava a pena <b>proporcional</b> ao dano. As penas variavam conforme a camada social: não havia igualdade perante a lei.' },
  { hab: 'H12', texto: 'Durante o Estado Novo (1937–1945) e a ditadura militar (1964–1985), o habeas corpus foi suspenso para crimes políticos. O AI-5 (1968) proibia que o Judiciário revisse atos do governo.',
    enun: 'Essas medidas mostram que, nos regimes autoritários,',
    certa: 'a independência do Judiciário é limitada para que o Executivo atue sem controle',
    erradas: ['o Judiciário ganha mais poder que o Executivo', 'os direitos civis são ampliados', 'a separação dos poderes é fortalecida', 'as leis passam a ser feitas por plebiscito'],
    expl: 'Democracia exige <b>freios e contrapesos</b>. Sem Judiciário independente e sem habeas corpus, prisões arbitrárias e tortura ficam sem controle.' },
  { hab: 'H24', texto: 'Na Atenas do século V a.C., os cidadãos votavam diretamente as leis na Assembleia (Eclésia). Mulheres, estrangeiros (metecos) e escravizados não eram cidadãos.',
    enun: 'Comparada às democracias atuais, a democracia ateniense era',
    certa: 'direta, porém restrita a uma pequena parte da população',
    erradas: ['representativa e com sufrágio universal', 'aberta a todos os moradores da cidade', 'baseada em eleições para presidente', 'organizada em Três Poderes independentes'],
    expl: 'Atenas: <b>democracia direta</b> e excludente (cerca de 10% a 20% da população eram cidadãos). Hoje: <b>representativa</b>, com sufrágio universal e instrumentos de participação direta.' },
  { hab: 'H24', texto: 'Em 1989, Porto Alegre criou o Orçamento Participativo: moradores se reúnem em assembleias de bairro para decidir parte dos investimentos da prefeitura.',
    enun: 'Essa experiência é exemplo de',
    certa: 'democracia participativa, que complementa a representação com a participação direta dos cidadãos',
    erradas: ['democracia ateniense, sem representantes eleitos', 'substituição da Câmara de Vereadores', 'ditadura do Executivo municipal', 'voto censitário, restrito a proprietários'],
    expl: 'Além de votar a cada quatro anos, o cidadão pode participar de conselhos, audiências, plebiscitos, referendos e projetos de iniciativa popular (como a Lei da Ficha Limpa, de 2010).' },
  { hab: 'H24', texto: 'Em 2005, os brasileiros foram às urnas responder se o comércio de armas de fogo e munição deveria ser proibido. Venceu o “não”.',
    enun: 'Como a lei já tinha sido aprovada e o povo foi chamado a confirmá-la ou rejeitá-la, essa consulta foi um',
    certa: 'referendo', erradas: ['plebiscito', 'projeto de iniciativa popular', 'impeachment', 'mandado de segurança'],
    expl: '<b>Plebiscito</b> = consulta <i>antes</i> da lei (ex.: 1993, forma e sistema de governo). <b>Referendo</b> = consulta <i>depois</i> do ato, para confirmar ou rejeitar (ex.: 2005, armas).' },
  { hab: 'H15', texto: 'Durante a Inquisição, tribunais da Igreja julgavam acusados de heresia. O acusado não sabia quem o denunciara, podia ser torturado para confessar e tinha os bens confiscados.',
    enun: 'Comparado a esse modelo, o processo penal das democracias atuais garante',
    certa: 'a presunção de inocência, o direito de defesa e a proibição da tortura',
    erradas: ['a confissão obtida sob tortura como prova válida', 'o julgamento por crimes de opinião religiosa', 'o sigilo sobre quem fez a acusação, sem direito de defesa', 'o confisco de bens antes do julgamento como regra'],
    expl: 'Iluministas como Beccaria (<i>Dos delitos e das penas</i>, 1764) criticaram a tortura e as penas cruéis. Essas ideias estão no art. 5º da Constituição.' },
  { hab: 'H15', texto: 'Na Revolta da Vacina (1904), a população do Rio de Janeiro enfrentou a polícia contra a vacinação obrigatória contra a varíola, feita com agentes entrando à força nas casas, ao mesmo tempo em que cortiços eram demolidos na reforma urbana.',
    enun: 'Uma análise crítica da revolta indica que ela foi motivada',
    certa: 'pelo autoritarismo da campanha e pela insatisfação com as reformas que expulsavam os pobres do centro',
    erradas: ['apenas pela ignorância da população sobre a ciência', 'pelo apoio da população às demolições', 'pela falta total de vacinas na cidade', 'pela defesa da volta da escravidão'],
    expl: 'A vacina era importante, mas o modo autoritário (invasões, falta de informação) e o “bota-abaixo” do prefeito Pereira Passos somaram revoltas. Avaliar criticamente é ver as várias causas.' }
];
const tarefa = t => ({ tipo: 'bins', hab: 'H24', emo: '📌', item: t[0], pergunta: 'Qual Poder faz isso?', opcoes: PODERES, certa: t[1], expl: t[2] });
const direito = d => ({ tipo: 'bins', hab: 'H24', emo: '🪪', item: d[0], pergunta: 'Que tipo de direito é esse?', opcoes: TIPOS, certa: d[1],
  expl: ['Direitos <b>civis</b> protegem a liberdade do indivíduo frente ao Estado (na Inglaterra, conquistados no séc. XVIII).', 'Direitos <b>políticos</b> garantem a participação no poder (séc. XIX).', 'Direitos <b>sociais</b> garantem bem-estar mínimo e dependem de ação do Estado (séc. XX).'][d[1]] });
HUM.jogo({ id: 'hum-tres-poderes', proximo: ['hum-quem-disse.html', 'Quem disse isso?'],
  fila: () => { const t = mix(TAREFAS), d = mix(DIREITOS), q = mix(QS).slice(0, 5).map(x => Object.assign({ tipo: 'mc' }, x));
    return [tarefa(t[0]), tarefa(t[1]), q[0], direito(d[0]), tarefa(t[2]), q[1], direito(d[1]), q[2], tarefa(t[3]), q[3], direito(d[2]), q[4]]; } });
