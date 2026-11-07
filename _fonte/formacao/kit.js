// Gera formacao-continuada/kit-formacao-secretarias.pdf (A4, 2 páginas, fundo branco para imprimir).
// Uso, na raiz do repositório: node _fonte/formacao/kit.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const raiz = path.join(__dirname, '..', '..');
const fonte = (nome, arq, peso) => `@font-face{font-family:${nome};font-weight:${peso};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(raiz, 'assets', 'fontes', arq)).toString('base64')}) format('woff2')}`;
const SAIDA = path.join(raiz, 'formacao-continuada', 'kit-formacao-secretarias.pdf');

const etapas = [
  ['Diagnóstico', 'Questionário curto antes do primeiro encontro: o que a equipe já usa e o que preocupa.'],
  ['Formato', 'Oficina, encontros ao longo de semanas ou mentoria para quem lidera.'],
  ['Regras', 'Combinado de uso de IA da escola, de acordo com a LGPD e as diretrizes nacionais.'],
  ['Prática com apoio', 'Planejar aulas, adaptar atividades e escrever comunicados, com canal para dúvidas.'],
  ['Avaliação', 'Retorno após cerca de 30 dias: utilidade, uso real e tempo poupado.'],
];

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
${fonte('Sniglet', 'sniglet-latin-800-normal.woff2', 800)}
${fonte('Lexend', 'lexend-latin-400-normal.woff2', 400)}
${fonte('Lexend', 'lexend-latin-600-normal.woff2', 600)}
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Lexend, sans-serif; color: #1b1b1b; background: #fff; font-size: 9.6pt; line-height: 1.4; }
.pagina { width: 210mm; height: 297mm; padding: 13mm 16mm 18mm; position: relative; page-break-after: always; overflow: hidden; }
.pagina:last-child { page-break-after: auto; }
h1, h2 { font-family: Sniglet, sans-serif; font-weight: 800; margin: 0; }
h1 { font-size: 22pt; line-height: 1.1; }
h2 { font-size: 13pt; margin: 0 0 2.5mm; padding-bottom: 1mm; border-bottom: 2px solid #f2c94c; display: inline-block; }
.sub { font-weight: 600; color: #444; margin: 2mm 0 4mm; }
p { margin: 0 0 3mm; }
ul { margin: 0; padding-left: 5mm; } li { margin-bottom: .8mm; }
.bloco { margin-bottom: 4.5mm; }
.etapas { display: grid; grid-template-columns: repeat(5, 1fr); gap: 3mm; }
.etapa { border: 1.4px solid #1b1b1b; border-radius: 4mm; padding: 2.5mm; font-size: 8.4pt; line-height: 1.3; }
.etapa b { display: block; font-family: Sniglet, sans-serif; font-size: 11pt; margin-bottom: 1mm; }
.etapa .n { display: inline-block; width: 6mm; height: 6mm; border-radius: 50%; background: #f2c94c; text-align: center; font-weight: 600; font-size: 9pt; line-height: 6mm; margin-bottom: 1.5mm; }
table { width: 100%; border-collapse: collapse; font-size: 8.8pt; }
th, td { text-align: left; vertical-align: top; padding: 1.5mm 2mm; border-bottom: 1px solid #bbb; }
th { font-weight: 600; border-bottom: 2px solid #1b1b1b; }
.duas { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; }
.preco { border: 2px solid #1b1b1b; border-radius: 5mm; padding: 4mm 5mm; }
.preco .valor { font-family: Sniglet, sans-serif; font-size: 22pt; line-height: 1.1; }
.preco .valor small { display: block; font-family: Lexend, sans-serif; font-weight: 600; font-size: 10pt; }
.preco .faixa { display: inline-block; background: #fdf0c4; border-radius: 2mm; padding: .5mm 2mm; font-weight: 600; font-size: 9pt; margin-bottom: 2mm; }
.rodape { position: absolute; left: 16mm; right: 16mm; bottom: 9mm; display: flex; justify-content: space-between; font-size: 8.5pt; font-weight: 600; border-top: 1px solid #1b1b1b; padding-top: 2mm; }
</style></head><body>

<section class="pagina">
  <h1>Formação continuada<br>de professores em IA</h1>
  <p class="sub">Proposta para secretarias municipais de educação e redes de ensino do Rio Grande do Sul</p>
  <p>Muitos professores já usam inteligência artificial, mas cada um aprendeu sozinho e com regras próprias. A formação continuada organiza esse uso para toda a rede: a equipe entende os fundamentos, usa a IA nas tarefas reais da semana, conhece os cuidados com os dados dos estudantes e, cerca de 30 dias depois, avalia o que mudou na prática. Não há pré-requisitos: a formação começa do zero, usa ferramentas gratuitas e não depende de laboratório de informática.</p>

  <div class="bloco">
    <h2>Por que agora</h2>
    <ul>
      <li>Parecer CNE/CP nº 15/2026, publicado em 6 de outubro de 2026: diretrizes nacionais de IA na educação, com uma régua de risco que vai de baixo a proibido.</li>
      <li>Política Nacional de Educação Digital (Lei nº 14.533/2023): prevê a formação de professores para o uso de tecnologias digitais.</li>
      <li>LGPD (Lei nº 13.709/2018) e BNCC Computação (Resolução CNE/CEB nº 1/2022): proteção de dados dos estudantes e computação no currículo.</li>
    </ul>
  </div>

  <div class="bloco">
    <h2>Cinco etapas, adaptadas à rede</h2>
    <div class="etapas">${etapas.map(([t, d], i) => `<div class="etapa"><span class="n">${i + 1}</span><b>${t}</b>${d}</div>`).join('')}</div>
  </div>

  <div class="bloco">
    <h2>Formatos</h2>
    <table>
      <thead><tr><th>Formato</th><th>Para quem</th><th>Como funciona</th></tr></thead>
      <tbody>
        <tr><td><b>Pacote para redes municipais</b></td><td>Secretarias municipais de educação</td><td>8 horas de formação, divididas em encontros como a rede preferir, com diagnóstico, regras de uso e prática com o material das escolas</td></tr>
        <tr><td>Formação continuada para redes</td><td>Secretarias de educação e redes de ensino</td><td>As cinco etapas completas: diagnóstico, oficinas por área, regras de uso, acompanhamento e retorno após 30 dias</td></tr>
        <tr><td>Oficina para a escola</td><td>Equipes de professores</td><td>Presencial ou on-line, com carga horária combinada; cada professor sai com um material pronto para usar</td></tr>
        <tr><td>Mentoria individual</td><td>Professores, coordenadores e gestores</td><td>Encontros on-line individuais, com plano de estudos e materiais da área de atuação</td></tr>
      </tbody>
    </table>
  </div>

  <div class="rodape"><span>Júlia Roberta Quoos Alves</span><span>ohtopico.com.br/formacao-continuada</span></div>
</section>

<section class="pagina">
  <div class="duas bloco">
    <div>
      <h2>O que a proposta inclui</h2>
      <ul>
        <li>Diagnóstico da equipe antes do primeiro encontro.</li>
        <li>Plano de formação com objetivos, carga horária, cronograma e alinhamento à BNCC Computação.</li>
        <li>Encontros presenciais ou on-line, com prática a partir do material real da escola.</li>
        <li>Combinado de uso de IA para a escola, de acordo com a LGPD e as orientações nacionais.</li>
        <li>Material de apoio gratuito: o guia IA pra Prof, a Computação do 1º ao 9º ano, o material adaptado e o Laboratório 3D de Matemática.</li>
        <li>Encontro de retorno cerca de 30 dias depois, com um resumo do que mudou na prática da equipe.</li>
      </ul>
    </div>
    <div>
      <h2>Conteúdos trabalhados</h2>
      <ul>
        <li>Como a IA generativa funciona, por que ela erra e como conferir o que ela produz.</li>
        <li>Ética, vieses e proteção de dados de estudantes (LGPD).</li>
        <li>Escrita de prompts com a fórmula P.A.C.T.O.</li>
        <li>Planejamento de aulas, adaptação de atividades e produção de materiais a partir da realidade da escola.</li>
        <li>Computação na BNCC e pensamento computacional.</li>
        <li>Combinados de uso de IA para a escola e para a turma.</li>
      </ul>
    </div>
  </div>

  <div class="duas bloco">
    <div>
      <h2>Investimento</h2>
      <div class="preco">
        <span class="faixa">Redes municipais</span>
        <div class="valor">R$ 2.000 <small>por 8 horas de formação</small></div>
        <p style="margin:2mm 0 0">Valor com desconto para redes: a hora avulsa de formação custa R$&nbsp;300 (8 horas sairiam por R$&nbsp;2.400). Para escolas e outras cargas horárias: R$&nbsp;300 por hora.</p>
      </div>
      <p style="margin-top:3mm">Nos encontros presenciais, somam-se deslocamento, alimentação e, quando necessário, hospedagem. A proposta escrita detalha as horas e cada custo, para facilitar o processo de contratação.</p>
    </div>
    <div>
      <h2>Como contratar</h2>
      <ol style="margin:0;padding-left:5mm">
        <li>Conversa inicial por e-mail: tamanho da equipe, etapas de ensino e o que já foi feito com IA.</li>
        <li>Envio da proposta escrita, com plano de formação, cronograma e valor total.</li>
        <li>Diagnóstico da equipe e realização dos encontros.</li>
        <li>Encontro de retorno e resumo dos resultados.</li>
      </ol>
    </div>
  </div>

  <div class="bloco">
    <h2>Quem conduz</h2>
    <p>Júlia Roberta Quoos Alves é professora licenciada em Informática e bacharela em Ciência da Computação pela UNISC, mestranda em Ciência da Computação na UFSM e formadora de professores no programa A União Faz a Vida, no Rio Grande do Sul. Foi bolsista de iniciação científica em IA pelo CNPq de 2020 a 2025 e trabalhou como engenheira de dados.</p>
    <p>É autora do guia IA pra Prof (ISBN 978-65-02-46268-3), com a fórmula P.A.C.T.O. para escrever prompts, e de materiais didáticos gratuitos de Computação alinhados à BNCC, publicados no site e na plataforma MEC RED. Já conduziu formação para a rede municipal de Lagoão (RS).</p>
  </div>

  <div class="duas bloco">
    <div>
      <h2>Para pedir a proposta</h2>
      <ul>
        <li>Número de professores e de escolas.</li>
        <li>Etapas de ensino atendidas pela rede.</li>
        <li>Período desejado e formato (presencial ou on-line).</li>
        <li>O que a equipe já fez com IA, se houver.</li>
      </ul>
    </div>
    <div>
      <h2>Contato</h2>
      <p><b>E-mail</b> contato@ohtopico.com.br<br><b>WhatsApp</b> (51) 99922-2234<br><b>Site</b> ohtopico.com.br/formacao-para-redes<br><b>LinkedIn</b> linkedin.com/in/ohtopico</p>
    </div>
  </div>

  <div class="rodape"><span>Júlia Roberta Quoos Alves</span><span>ohtopico.com.br</span></div>
</section>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent(html, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: SAIDA, format: 'A4', printBackground: true, preferCSSPageSize: true });
  if (process.argv[2] === '--previa') {
    await p.setViewportSize({ width: 794, height: 1123 * 2 });
    await p.screenshot({ path: process.argv[3], fullPage: true });
  }
  await b.close();
  console.log('ok', SAIDA);
})();
