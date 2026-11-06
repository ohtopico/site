// post de rede social desenhado em HTML (o motor mostra o "t" do item dentro da caixa)
const post = (nome, arroba, txt, extra = '') => `<div class="l-post"><div class="l-post-cab"><span class="l-post-av">${nome[0]}</span><span><b>${nome}</b> <small>${arroba}</small></span></div><div>${txt}</div>${extra ? `<div class="l-post-x">${extra}</div>` : ''}</div>`;
const C = (t, c, e) => ({ t, c, e });
const B = ['✅ Confiável', '⚠️ Suspeita'];
const svg = `<svg viewBox="0 0 620 220" role="img" aria-label="Checklist do checador: fonte, data, autor, outras fontes, tom alarmista, imagem">
  <style>.c{stroke:#1d2a1f;stroke-width:2.5}.t{font:700 14px Lexend,sans-serif;fill:#1d2a1f}.s{font:500 12px Lexend,sans-serif;fill:#3b3b3b}</style>
  <rect width="620" height="220" rx="16" fill="#fffdf6"/><text x="310" y="30" text-anchor="middle" style="font:800 19px Sniglet,Lexend,sans-serif">🕵️ Checklist do checador</text>
  ${[['🔗', 'Fonte', 'site conhecido? endereço estranho?'], ['📅', 'Data', 'notícia velha recirculando?'], ['✍️', 'Autor', 'quem assina? é especialista?'], ['🔍', 'Outras fontes', 'algum jornal confirma?'], ['📢', 'Tom', 'URGENTE, CAPS, “compartilhe”'], ['🖼️', 'Imagem', 'foto fora de contexto ou montagem?']]
    .map(([e, t, s], k) => { const x = 20 + (k % 3) * 200, y = 48 + Math.floor(k / 3) * 84; return `<rect class="c" x="${x}" y="${y}" width="186" height="72" rx="12" fill="${k % 2 ? '#dcecff' : '#fff6dd'}"/><text class="t" x="${x + 12}" y="${y + 28}">${e} ${t}</text><text class="s" x="${x + 12}" y="${y + 52}">${s}</text>`; }).join('')}
</svg>`;
module.exports = {
  id: 'ling-checador', arquivo: 'ling-checador.html', icone: '🕵️', titulo: 'Checador de notícias',
  resumo: 'Simulador de agência de checagem: analise posts, ache os sinais de desinformação e use a linguagem das mídias para resolver um problema social.',
  desc: 'Você trabalha numa agência de checagem. Os posts chegam na sua mesa: decida se são confiáveis ou suspeitos, aponte o sinal de alerta e responda às questões sobre mídia, informação e sociedade.',
  habs: ['H2', 'H3', 'H4'],
  figura: svg,
  intro: 'Desinformação é um problema social, e o ENEM cobra que você use o que sabe sobre a linguagem das mídias para reconhecê-la. Passe cada post pelo checklist antes de decidir.',
  cola: `${svg}
    <p><b>Sinais clássicos de desinformação:</b> apelo à urgência (“URGENTE”, “compartilhe antes que apaguem”), letras maiúsculas e muitas exclamações, ausência de fonte ou fonte vaga (“um médico disse”), promessas milagrosas, teoria da conspiração (“a mídia esconde”), foto antiga ou de outro lugar, link com endereço parecido com o de um jornal real.</p>
    <p><b>Bolha e algoritmo:</b> as redes mostram mais do que você já curte, o que reforça opiniões e facilita que boatos circulem entre quem concorda com eles.</p>
    <p><b>Postura crítica (H4):</b> desconfiar não é rejeitar tudo; é checar em mais de uma fonte e reconhecer interesses por trás de um texto (vender, ganhar cliques, influenciar votos).</p>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Post', n: 6, pede: 'Passe o post pelo checklist. Ele é confiável ou suspeito?', baldes: B, itens: [
      C(post('Zap da Família', 'encaminhado muitas vezes', '🚨🚨 URGENTE!!! Chá de folha de goiaba CURA diabetes em 3 dias. Os laboratórios escondem isso de você. COMPARTILHE ANTES QUE APAGUEM!!!'), 1, 'Cura milagrosa, sem fonte, caixa-alta, conspiração e pedido de compartilhar: todos os sinais de alerta.'),
      C(post('Ministério da Saúde', '@minsaude · conta oficial', 'A campanha de vacinação contra a gripe começa na segunda (12/5) para idosos e gestantes. Confira os postos da sua cidade no site oficial.', 'gov.br/saude'), 0, 'Conta oficial verificada, data, público e link para site do governo: confiável.'),
      C(post('Notícias Já 24h', 'n0ticias-ja.biz', 'Cientistas confirmam: celular no bolso causa infertilidade em 100% dos casos. Veja o vídeo chocante!', 'n0ticias-ja.biz/video-chocante'), 1, 'Site com endereço estranho (zero no lugar de “o”), “100% dos casos”, “vídeo chocante”: caça-cliques.'),
      C(post('Jornal da Cidade', '@jornaldacidade', 'Chuva forte alaga três bairros nesta terça; Defesa Civil orienta moradores a evitar a região do Arroio Dilúvio. Veja as rotas alternativas.', 'jornaldacidade.com.br · 14/05'), 0, 'Veículo identificado, data, fonte oficial citada (Defesa Civil) e informação útil.'),
      C(post('Tio Beto', 'compartilhou uma imagem', 'Olha a enchente HOJE em Porto Alegre!!! A mídia não mostra!!!', 'foto de 1941, em preto e branco'), 1, 'Foto antiga apresentada como atual e “a mídia não mostra”: imagem fora de contexto.'),
      C(post('Revista Ciência Hoje', '@cienciahoje', 'Estudo da USP publicado em revista científica relaciona a poluição do ar a internações por doenças respiratórias em São Paulo. Os autores dizem que mais pesquisas são necessárias.', 'link para o artigo original'), 0, 'Instituição, revista científica, dado com contexto e ressalva dos próprios pesquisadores.'),
      C(post('Pai de Aluno', 'grupo da escola', 'Um amigo meu que é médico disse que a vacina tem chip. Não vacinem os filhos!!!'), 1, 'Fonte vaga (“um amigo médico”), afirmação absurda e sem prova, apelo ao medo.'),
      C(post('INSS Oficial 2026', 'inss-beneficio-liberado.com', 'Seu benefício extra de R$ 1.500 foi liberado! Clique e informe seu CPF e senha do banco para receber hoje.'), 1, 'Golpe: site falso que imita órgão público e pede dados bancários.'),
      C(post('Agência Lupa', '@agencialupa', 'É falso que o Pix será taxado a partir de janeiro. A Receita Federal desmentiu a informação em nota oficial.', 'checagem · com link para a nota da Receita'), 0, 'Agência de checagem, cita a fonte oficial que desmentiu: confiável.'),
      C(post('Prefeitura de Santa Maria', '@prefsantamaria · conta oficial', 'Inscrições abertas para cursinho popular gratuito pré-ENEM até 20/2. Edital completo no site.', 'santamaria.rs.gov.br'), 0, 'Órgão oficial, prazo, link para edital: confiável.')
    ] },
    { tipo: 'achar', rotulo: 'Alerta', n: 3, itens: [
      { pede: 'Toque na expressão que é o principal sinal de alerta.', texto: 'Novo estudo mostra benefícios da caminhada. [[Compartilhe antes que apaguem]] este vídeo que a TV não quer mostrar!', e: 'Urgência artificial e teoria da conspiração são truques para você compartilhar sem pensar.' },
      { pede: 'Toque na fonte vaga, que não pode ser verificada.', texto: 'Segundo [[especialistas]], comer manga com leite faz mal. A informação circula há anos nas redes.', e: '“Especialistas” quem? Sem nome, instituição ou estudo, não dá para checar. (E o mito da manga com leite não tem base científica.)' },
      { pede: 'Toque na palavra que exagera e denuncia o caça-cliques.', texto: 'Você não vai acreditar: esse truque [[milagroso]] faz qualquer pessoa emagrecer 10 kg em uma semana.', e: 'Promessas milagrosas e números impossíveis são marca de desinformação e propaganda enganosa.' },
      { pede: 'Toque no detalhe que mostra que o site é falso.', texto: 'Leia a matéria completa em www.[[g1-n0ticias]].com e veja a verdade.', e: 'Endereço imitando um jornal real, com zero no lugar do “o”: típico de sites falsos.' }
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 2, itens: [
      { base: '<p>Um estudo do MIT analisou 126 mil boatos no Twitter e concluiu que notícias falsas tinham 70% mais chance de serem compartilhadas do que as verdadeiras. Os autores apontam que o falso costuma ser mais novo e mais emocionante, o que desperta surpresa e indignação.</p>', fonte: 'Pesquisa publicada na revista Science (2018), adaptado.',
        enun: 'Segundo o texto, a circulação mais rápida das notícias falsas se explica',
        alts: ['pelo apelo emocional e pela novidade, que estimulam o compartilhamento.', 'pela maior qualidade das informações falsas.', 'pela ação exclusiva de robôs nas redes sociais.', 'pelo fato de os jornais não usarem redes sociais.', 'pela falta de acesso à internet da população.'],
        e: 'Surpresa e indignação fazem as pessoas compartilharem. Entender a linguagem da mídia ajuda a resolver o problema (H2, H3).' },
      { base: '<p>Para enfrentar a desinformação, escolas têm incluído a <b>educação midiática</b> no currículo: os alunos aprendem a identificar fontes, comparar veículos, reconhecer publicidade disfarçada e verificar imagens.</p>',
        enun: 'A proposta descrita contribui para a sociedade porque',
        alts: ['forma leitores críticos, capazes de avaliar as informações que recebem.', 'proíbe os estudantes de usar redes sociais.', 'substitui o ensino de língua portuguesa.', 'ensina a produzir notícias falsas mais convincentes.', 'garante que toda informação na internet seja verdadeira.'],
        e: 'Postura crítica diante dos usos sociais da linguagem e das mídias: H4.' },
      { base: '<p>Às vésperas de uma eleição, circulou um áudio com a voz de um candidato admitindo um crime. Peritos mostraram depois que a gravação foi criada por inteligência artificial a partir de vídeos antigos do político.</p>',
        enun: 'O episódio evidencia que as novas tecnologias',
        alts: ['exigem do cidadão cuidado redobrado na verificação de conteúdos, mesmo os que parecem autênticos.', 'tornaram impossível qualquer manipulação de informação.', 'só são usadas para fins positivos nas eleições.', 'eliminaram a necessidade de peritos e jornalistas.', 'garantem que áudios e vídeos sempre sejam provas verdadeiras.'],
        e: 'Deepfakes mostram por que é preciso checar a fonte, não só confiar no que se vê ou ouve.' }
    ] }
  ]
};
