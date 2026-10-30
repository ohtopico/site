/* Gera as imagens de compartilhamento (og:image, 1200 × 630) no mesmo visual da janela de navegador
   usada no material didático. Quando a página tem algo para mostrar (um jogo, um simulador), a imagem
   leva uma captura de tela de verdade dela; assim a prévia no WhatsApp e no LinkedIn mostra o conteúdo.

     node _fonte/og/gerar.js            gera todas as imagens da lista IMAGENS
     node _fonte/og/gerar.js og-site    gera só as que têm "og-site" no nome do arquivo

   Precisa do pacote playwright (ou playwright-core com o Chrome instalado). Rode na raiz do site. */
const fs = require('fs');
const path = require('path');
const http = require('http');

const RAIZ = path.resolve(__dirname, '..', '..');

/* janela: texto da barra; faixa: selo acima do título; t1/t2: título (t2 vem marcado de amarelo);
   sub: frase abaixo; pills: até 3 etiquetas; url: rodapé; capturas: páginas que aparecem à direita */
const IMAGENS = [
  { arq: 'img/og-site.jpg', janela: 'ohtopico.com.br', faixa: 'Gratuito · para professores e estudantes', t1: 'IA, Computação', t2: 'e Matemática',
    sub: 'Formação de professores em IA, jogos, Laboratório 3D e simuladores',
    pills: ['Formação em IA', 'Jogos e 3D', 'BNCC 6º ao 9º ano'], url: 'ohtopico.com.br',
    capturas: ['/material-didatico/3d/cubo-rgb.html', '/material-didatico/jogos/robo.html', '/simuladores/rede-neural.html', '/ia-pra-prof/'] },
  { arq: 'material-didatico/assets/og-planos.jpg', janela: 'planos-de-aula.html', faixa: 'BNCC · 6º ao 9º ano', t1: 'Planos', t2: 'de aula',
    sub: 'Objetivos, etapas, avaliação e acessibilidade, prontos para imprimir', pills: ['Computação', 'Matemática', 'Metodologias ativas'],
    url: 'ohtopico.com.br/material-didatico', capturas: ['/material-didatico/planos/algoritmos-papel-ao-robo/'] },
  { arq: 'material-didatico/assets/og-fichas.jpg', janela: 'fichas.html', faixa: 'BNCC · 6º ao 9º ano', t1: 'Fichas para', t2: 'imprimir',
    sub: 'Atividades no papel, com gabarito e orientações para o professor', pills: ['Computação desplugada', 'Matemática', 'Gabarito'],
    url: 'ohtopico.com.br/material-didatico', capturas: ['/material-didatico/fichas/programando-colega-robo/'] },
  { arq: 'material-didatico/assets/og-listas.jpg', janela: 'listas.html', faixa: 'BNCC · 6º ao 9º ano', t1: 'Listas de', t2: 'exercícios',
    sub: 'Questões por habilidade, para resolver na tela ou imprimir, com gabarito', pills: ['Múltipla escolha', 'Verdadeiro ou falso', 'Dissertativas'],
    url: 'ohtopico.com.br/material-didatico', capturas: ['/material-didatico/listas/linguagem-programacao-6-ano/'] },
  { arq: 'material-didatico/assets/og-bncc.jpg', janela: 'bncc.html', faixa: 'Habilidade por habilidade', t1: 'BNCC', t2: 'na prática',
    sub: 'Plano de aula, slides, jogos, fichas e listas para cada habilidade', pills: ['Computação', 'Matemática', '6º ao 9º ano'],
    url: 'ohtopico.com.br/material-didatico', capturas: ['/material-didatico/bncc/ef06co02/'] },
  { arq: 'material-didatico/assets/og-laboratorio-3d.jpg', janela: 'laboratorio-3d.html', faixa: 'Gire, aproxime, experimente', t1: 'Laboratório', t2: '3D',
    sub: 'Matemática e Computação em cenas 3D que funcionam no navegador', pills: ['Material Dourado', 'Cubo RGB', 'Rede neural'],
    url: 'ohtopico.com.br/material-didatico', capturas: ['/material-didatico/3d/cubo-rgb.html'] },
  ...[
    ['index', 'Simuladores', 'no navegador', 'IA, estatística e arquitetura de computadores, sem instalar nada', ['IA', 'Estatística', 'Arquitetura'], '/simuladores/'],
    ['bases', 'Bases', 'numéricas', 'Binário, octal, hexadecimal e complemento de dois, passo a passo', ['Binário', 'Hexadecimal', 'Complemento de dois'], '/simuladores/bases.html'],
    ['cache', 'Memória', 'cache', 'Acertos, faltas e mapeamento da cache, acesso por acesso', ['Mapeamento', 'Acertos e faltas', 'Arquitetura'], '/simuladores/cache.html'],
    ['estatistica', 'Estatística', 'descritiva', 'Média, mediana, desvio padrão e gráficos com os seus dados', ['Média e mediana', 'Desvio padrão', 'Histograma'], '/simuladores/estatistica.html'],
    ['logica', 'Portas', 'lógicas', 'Monte circuitos com AND, OR e NOT e veja a tabela-verdade', ['AND, OR, NOT', 'Circuitos', 'Tabela-verdade'], '/simuladores/logica.html'],
    ['matriz-confusao', 'Matriz de', 'confusão', 'Acurácia, precisão, revocação e F1 de um classificador', ['Precisão', 'Revocação', 'F1'], '/simuladores/matriz-confusao.html'],
    ['mips', 'Mini', 'MIPS', 'Assembly MIPS passo a passo: registradores, memória e formatos R, I e J', ['Assembly', 'Registradores', 'Ciclo da instrução'], '/simuladores/mips.html'],
    ['pipeline-mips', 'Pipeline', 'MIPS', 'As cinco etapas do pipeline, conflitos e adiantamento, ciclo a ciclo', ['Pipeline', 'Conflitos', 'Adiantamento'], '/simuladores/pipeline-mips.html'],
    ['placa-mae', 'Placa-mãe', 'em 3D', 'Gire a placa e descubra o que faz cada componente do computador', ['Processador', 'Memória', 'Barramentos'], '/simuladores/placa-mae.html'],
    ['cpu-por-dentro', 'CPU por', 'dentro', 'O caminho de dados do MIPS em 3D, com a instrução viajando pelo pipeline', ['Caminho de dados', 'Pipeline', '3D'], '/simuladores/cpu-por-dentro.html'],
    ['proxima-palavra', 'A próxima', 'palavra', 'Como um modelo de linguagem escolhe a próxima palavra: probabilidade e temperatura', ['IA generativa', 'Probabilidade', 'Temperatura'], '/simuladores/proxima-palavra.html'],
    ['rede-neural', 'Rede neural', 'treinando', 'Taxa de aprendizado, lote, camadas e sobreajuste, ao vivo', ['Aprendizado de máquina', 'Sobreajuste', 'Ao vivo'], '/simuladores/rede-neural.html'],
    ['regressao', 'Regressão', 'linear', 'Ajuste a reta, veja o erro e faça previsões com os seus pontos', ['Mínimos quadrados', 'Erro', 'Previsão'], '/simuladores/regressao.html'],
    ['significancia', 'Significância', 'entre modelos', 'Quando a diferença entre dois modelos é real e quando é sorte', ['Teste estatístico', 'Valor-p', 'Modelos'], '/simuladores/significancia.html']
  ].map(([nome, t1, t2, sub, pills, pag]) => ({ arq: `simuladores/img/og-${nome}.jpg`, janela: pag.split('/').pop() || 'simuladores.html',
    faixa: 'Simulador gratuito', t1, t2, sub, pills, url: 'ohtopico.com.br' + pag.replace(/index\.html$|\.html$/, ''), capturas: [pag] })),
  /* Laboratório 3D: uma imagem por página, em material-didatico/3d/img/og-<página>.jpg. Cada página nova entra
     aqui e aponta o og:image para esse arquivo; o gerar.js do material usa a mesma imagem nos dados estruturados. */
  ...[
    ['torre-recursao', 'Torre da', 'recursão', 'Torre de Hanói em 3D: resolva, ensine a regra ao robô e veja a pilha de chamadas', ['Recursão', 'EF08CO01', '8º ano']],
    ['carro-que-aprende', 'Carro que', 'aprende', 'Um carrinho 3D aprende a pista por tentativa e erro: ajuste as recompensas e veja a IA trapacear', ['IA', 'Aprendizado por reforço', '8º e 9º ano']],
    ['cozinha-paralela', 'Cozinha', 'paralela', 'Robôs cozinheiros dividem os pedidos, disputam a panela e caem num impasse', ['Paralelismo', 'EF08CO05', '8º ano']],
    ['cidade-infectada', 'Cidade', 'infectada', 'Um malware se espalha pelo bairro: defenda a rede com firewall, atualização e backup', ['Segurança', 'EF09CO04', '8º e 9º ano']],
    ['tanque', 'Enche o', 'tanque', 'Prismas, cilindros e cones enchendo de água: estime o volume antes de ver', ['Volume', 'EF09MA19', '8º e 9º ano']],
    ['cofre-das-chaves', 'Cofre das', 'chaves', 'Disco de César, cadeados e mistura de tintas: como combinar uma chave secreta sem enviá-la', ['Criptografia', 'EF09CO05', '8º e 9º ano']],
    ['maquina-estados', 'Máquina de', 'estados', 'Catraca, semáforo e elevador que obedecem ao diagrama que você desenha', ['Autômatos', 'EF09CO03', '9º ano']],
    ['escada-pitagoras', 'Escada de', 'Pitágoras', 'Encoste escadas em prédios 3D, ache a diagonal da caixa e termine na diagonal do cubo', ['Teorema de Pitágoras', 'EF09MA13', '9º ano']],
    ['dados-verdade', 'Dados de', 'verdade', 'Lance 10, 100 e 1000 vezes e veja a frequência chegar perto da probabilidade', ['Probabilidade', 'Dado viciado', '6º ao 9º ano']],
    ['arvore-viva', 'Árvore', 'viva', 'Árvore de busca e pastas em 3D: insira, busque e veja a árvore crescer', ['Árvores', 'EF09CO01', '6º e 9º ano']],
    ['olhos-ia', 'Olhos', 'da IA', 'Uma rua 3D vista pela câmera de um assistente para pessoas cegas, com os acertos e os erros da IA', ['IA e acessibilidade', 'EF09CO07', '8º e 9º ano']],
    ['espaco-palavras', 'Espaço das', 'palavras', 'Palavras parecidas ficam perto: analogias e o viés que a IA aprende dos textos', ['Embeddings', 'Viés', 'EF09CO07']]
  ].map(([nome, t1, t2, sub, pills]) => ({ arq: `material-didatico/3d/img/og-${nome}.jpg`, janela: `${nome}.html`,
    faixa: 'Laboratório 3D · gratuito', t1, t2, sub, pills, url: `ohtopico.com.br/material-didatico/3d/${nome}`, capturas: [`/material-didatico/3d/${nome}.html`] })),
  { arq: 'mundo/og-mundo.jpg', janela: 'mundo.html', faixa: 'Passeie pelo site', t1: 'Mundo', t2: '3D',
    sub: 'Cada prédio é uma página: jogos, Laboratório 3D, simuladores, material didático e blog', pills: ['Jogos e 3D', 'Simuladores', 'Para professores'],
    url: 'ohtopico.com.br/mundo', capturas: ['/mundo/'] },
  { arq: 'dados-da-regiao/og-dados-da-regiao.jpg', janela: 'dados-da-regiao.html', faixa: 'Censo Escolar · IBGE', t1: 'Dados da', t2: 'educação',
    sub: 'Escolas e matrículas de Santa Cruz do Sul, Candelária e Novo Cabrais', pills: ['Mapa', 'Escolas', 'Matrículas'],
    url: 'ohtopico.com.br/dados-da-regiao', capturas: ['/dados-da-regiao/'] },
  { arq: 'interesse-por-ia/og-interesse-por-ia.jpg', janela: 'interesse-por-ia.html', faixa: 'Wikipédia em português', t1: 'Interesse', t2: 'por IA',
    sub: 'Quantas pessoas leem sobre inteligência artificial, mês a mês', pills: ['Dados abertos', 'Painel', 'Atualizado sozinho'],
    url: 'ohtopico.com.br/interesse-por-ia', capturas: ['/interesse-por-ia/'] },
  { arq: 'interesse-por-ia/og-notebooks.jpg', janela: 'notebooks.ipynb', faixa: 'Google Colab', t1: 'Notebooks', t2: 'de aula',
    sub: 'Python com dados reais da Wikipédia, prontos para abrir no Colab', pills: ['Python', 'Dados abertos', 'Colab'],
    url: 'ohtopico.com.br/interesse-por-ia/notebooks', capturas: ['/interesse-por-ia/notebooks/'] },
  { arq: 'freebies/simulador/og-simulador.jpg', janela: 'simulador-financeiro.html', faixa: 'Educação financeira', t1: 'Simulador', t2: 'financeiro',
    sub: 'Juros, parcelas e poupança para simular com a turma', pills: ['Juros', 'Parcelas', 'Poupança'],
    url: 'ohtopico.com.br/freebies/simulador', capturas: ['/freebies/simulador/'] }
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function modelo(o, fotos) {
  const pillCls = ['p-verde', 'p-amarelo', ''];
  const capturas = fotos.length === 1
    ? `<div class="shot um"><img src="${fotos[0]}" alt=""></div>`
    : `<div class="grade">${fotos.map(f => `<div class="shot"><img src="${f}" alt=""></div>`).join('')}</div>`;
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #f4f4f2 radial-gradient(#d9d9d6 1.2px, transparent 1.2px) 0 0 / 22px 22px; font-family: Lexend, sans-serif; color: #111; position: relative; overflow: hidden; }
  .win { position: absolute; left: 50px; top: 34px; width: 1090px; height: 520px; background: #fff; border: 3px solid #111; border-radius: 26px; box-shadow: 16px 16px 0 #111; overflow: hidden; }
  .bar { height: 52px; border-bottom: 3px solid #111; display: flex; align-items: center; padding: 0 26px; background: #f4f4f2; }
  .bar b { font-family: Sniglet; font-weight: 800; font-size: 18px; letter-spacing: .12em; text-transform: uppercase; }
  .dots { margin-left: auto; display: flex; gap: 9px; } .dots i { width: 22px; height: 22px; border: 2.5px solid #111; border-radius: 50%; }
  .body { display: flex; height: 462px; }
  .txt { flex: 0 0 580px; padding: 40px 20px 0 56px; height: 462px; overflow: hidden; }
  .faixa { display: inline-flex; align-items: center; gap: 10px; border: 2.5px solid #111; border-radius: 99px; padding: 6px 16px; font-family: Sniglet; font-weight: 800; font-size: 15px; letter-spacing: .1em; text-transform: uppercase; }
  .faixa i { width: 6px; height: 18px; background: #1f8a4c; border-radius: 2px; }
  h1 { font-family: Sniglet; font-weight: 800; font-size: 84px; line-height: .98; text-transform: uppercase; margin: 22px 0 14px; letter-spacing: .01em; }
  h1 span { display: inline-block; background: #fff06a; padding: 4px 12px 0; margin-left: -12px; }
  p.sub { font-size: 23px; color: #4a4a4a; line-height: 1.32; max-width: 500px; }
  .pills { display: flex; gap: 10px; margin-top: 22px; flex-wrap: wrap; }
  .pills span { border: 2px solid #111; border-radius: 99px; padding: 7px 16px; font-size: 17px; font-weight: 500; }
  .p-verde { background: #dff3e6; } .p-amarelo { background: #fff06a; }
  .vis { flex: 1; padding: 30px 30px 30px 10px; }
  .shot { border: 2.5px solid #111; border-radius: 16px; overflow: hidden; background: #fff; }
  .shot img { width: 100%; height: 100%; object-fit: cover; object-position: top left; display: block; }
  .um { height: 100%; transform: rotate(1.5deg); box-shadow: 8px 8px 0 #111; }
  .grade { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; height: 100%; }
  .grade .shot { box-shadow: 5px 5px 0 #111; }
  .rod { position: absolute; left: 54px; right: 58px; bottom: 18px; display: flex; align-items: center; justify-content: space-between; }
  .rod b { font-family: Sniglet; font-weight: 800; font-size: 22px; letter-spacing: .2em; text-transform: uppercase; }
  .rod span { border: 2px solid #111; border-radius: 99px; padding: 5px 18px; font-size: 19px; background: #fff; }
</style></head><body>
<div class="win">
  <div class="bar"><b>${esc(o.janela)}</b><div class="dots"><i></i><i></i><i></i></div></div>
  <div class="body">
    <div class="txt">
      <div class="faixa"><i></i>${esc(o.faixa)}</div>
      <h1>${esc(o.t1)}<br><span>${esc(o.t2)}</span></h1>
      <p class="sub">${esc(o.sub)}</p>
      <div class="pills">${o.pills.map((p, i) => `<span class="${pillCls[i] || ''}">${esc(p)}</span>`).join('')}</div>
    </div>
    <div class="vis">${capturas}</div>
  </div>
</div>
<div class="rod"><b>Júlia Quoos</b><span>${esc(o.url)}</span></div>
</body></html>`;
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.wasm': 'application/wasm' };
function servidor() {
  return new Promise(res => {
    const srv = http.createServer((req, resp) => {
      let f = path.join(RAIZ, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!f.startsWith(RAIZ)) { resp.writeHead(403); return resp.end(); }
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
      if (!fs.existsSync(f)) { resp.writeHead(404); return resp.end(); }
      resp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(resp);
    });
    srv.listen(0, '127.0.0.1', () => res(srv));
  });
}
async function navegador() {
  try { return await require('playwright').chromium.launch(); } catch (e) { /* sem o pacote completo */ }
  return require('playwright-core').chromium.launch({ channel: 'chrome' });
}

async function main() {
  const filtro = process.argv[2];
  const srv = await servidor();
  const base = `http://127.0.0.1:${srv.address().port}`;
  const browser = await navegador();
  const cache = {};
  try {
    for (const o of IMAGENS.filter(o => !filtro || o.arq.includes(filtro))) {
      const fotos = [];
      for (const pag of o.capturas) {
        if (!cache[pag]) {
          // tema claro, tela de notebook; esconde a barra do topo para sobrar conteúdo
          const p = await browser.newPage({ viewport: { width: 1000, height: 820 }, colorScheme: 'light' });
          await p.goto(base + pag, { waitUntil: 'load' });
          await p.addStyleTag({ content: '#topbar, .topbar, header.site, .estrelas, [class*="estrela"] { display: none !important; }' });
          await p.waitForTimeout(1500);
          cache[pag] = 'data:image/png;base64,' + (await p.screenshot()).toString('base64');
          await p.close();
        }
        fotos.push(cache[pag]);
      }
      const p = await browser.newPage({ viewport: { width: 1200, height: 630 } });
      await p.setContent(modelo(o, fotos), { waitUntil: 'networkidle' });
      await p.evaluate(async () => {
        await document.fonts.ready;
        // diminui o título até tudo caber na janela e nenhuma palavra passar da largura
        const h1 = document.querySelector('h1'), txt = document.querySelector('.txt');
        let t = 84;
        const passa = () => txt.scrollHeight > txt.clientHeight || h1.scrollWidth > h1.clientWidth + 2
          || [...h1.querySelectorAll('span')].some(s => s.getBoundingClientRect().right > txt.getBoundingClientRect().right);
        while (t > 40 && passa()) { t -= 2; h1.style.fontSize = t + 'px'; }
      });
      const saida = path.join(RAIZ, o.arq);
      fs.mkdirSync(path.dirname(saida), { recursive: true });
      await p.screenshot({ path: saida, type: 'jpeg', quality: 86 });
      await p.close();
      console.log('gerada', o.arq);
    }
  } finally {
    await browser.close();
    srv.close();
  }
}
module.exports = { IMAGENS };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
