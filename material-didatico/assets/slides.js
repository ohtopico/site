/* Slides de aula expositiva (30 min) para cada habilidade de Computação da BNCC.
   PDFs em material-didatico/slides/. Autora: Júlia Roberta Quoos Alves. */
(function () {
  const BASE = window.MD_BASE || '';
  window.SLIDES = {
    "EF06CO01": "Organizando informações",
    "EF06CO02": "Sequência, repetição e decisão",
    "EF06CO03": "Do problema ao programa",
    "EF06CO04": "Dividir para resolver",
    "EF06CO05": "Entradas e saídas",
    "EF06CO06": "Um algoritmo para todos os casos",
    "EF06CO07": "Como a mensagem viaja",
    "EF06CO08": "Arquivos em ordem",
    "EF06CO09": "Do outro lado da tela tem gente",
    "EF06CO10": "Quanto custa um celular?",
    "EF07CO01": "Fichas e listas",
    "EF07CO02": "Caça aos bugs",
    "EF07CO03": "Programar para outras matérias",
    "EF07CO04": "Pontos e ligações",
    "EF07CO05": "Escreva uma vez, use sempre",
    "EF07CO06": "As regras da conversa",
    "EF07CO07": "Proteja sua vida digital",
    "EF07CO08": "Discordar sem ferir",
    "EF07CO09": "Cyberbullying não é brincadeira",
    "EF07CO10": "Para onde vai o lixo eletrônico?",
    "EF07CO11": "Do roteiro à publicação",
    "EF08CO01": "Um problema dentro de outro",
    "EF08CO02": "Listas que crescem",
    "EF08CO03": "Buscar e ordenar",
    "EF08CO04": "Um programa para outra disciplina",
    "EF08CO05": "Muitas mãos",
    "EF08CO06": "Como a internet funciona",
    "EF08CO07": "Por dentro das redes sociais",
    "EF08CO08": "Seus dados valem muito",
    "EF08CO09": "Li e concordo?",
    "EF08CO10": "Privacidade é direito",
    "EF08CO11": "Checagem de fatos",
    "EF09CO01": "Árvores que decidem",
    "EF09CO02": "Resolver problemas de verdade",
    "EF09CO03": "Máquinas de estados",
    "EF09CO04": "Como agem os ataques",
    "EF09CO05": "Segredos em código",
    "EF09CO06": "Tecnologia para a nossa cidade",
    "EF09CO07": "Tecnologia não é neutra",
    "EF09CO08": "Desigualdade digital",
    "EF09CO09": "Isso é seu?",
    "EF09CO10": "Verdade em todos os formatos"
  };
  window.slidesUrl = c => window.SLIDES[c] ? `${BASE}slides/bncc-${c.toLowerCase()}-slides.pdf` : '';
  window.slidesBtn = (c, cls) => window.SLIDES[c]
    ? `<a class="${cls || 'btn ghost'}" href="${slidesUrl(c)}" download title="Baixar os slides da aula de ${c} (PDF)">📥 Baixar slides</a>` : '';
})();
