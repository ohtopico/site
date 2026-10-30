/* =====================================================================
   Primeiros passos no computador: missões para crianças pequenas.
   Teclado ABNT2 e mouse em 3D (usa o Laboratório 3D do material didático).
   As missões ficam salvas só no navegador (localStorage), sem cadastro.
   ===================================================================== */

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- missões e progresso ---------- */
const MISSOES = [
  ['mouse', 'Cliques', '#mouse'], ['teclas3d', 'Teclado 3D', '#teclado3d'], ['shift', 'Shift e Fixa', '#shift'],
  ['acento', 'Acentos', '#acentos'], ['ctrl', 'Ctrl', '#ctrl'], ['tab', 'Tab', '#tab'], ['esc', 'Esc', '#esc'],
  ['print', 'Print', '#print'], ['volume', 'Volume', '#volume'], ['programas', 'Programas', '#programas'], ['desligar', 'Desligar', '#desligar']
];
const CHAVE = 'ohtopico-computador-criancas';
let feitas = new Set();
try { feitas = new Set(JSON.parse(localStorage.getItem(CHAVE) || '[]')); } catch (e) { /* sem armazenamento: segue sem salvar */ }
function salvar() { try { localStorage.setItem(CHAVE, JSON.stringify([...feitas])); } catch (e) { /* ok */ } }
function desenhaMissoes() {
  $('#lista-missoes').innerHTML = MISSOES.map(([id, nome, ancora], i) =>
    `<li class="${feitas.has(id) ? 'ok' : ''}"><a href="${ancora}"><span class="b">${i + 1}</span>${nome}${feitas.has(id) ? '<span class="sr-only"> (completa)</span>' : ''}</a></li>`).join('');
  $('#placar-topo').textContent = `${feitas.size} de ${MISSOES.length} missões`;
  $$('[data-missao]').forEach(s => s.classList.toggle('ok', feitas.has(s.dataset.missao)));
  $('#parabens').hidden = feitas.size < MISSOES.length;
}
function marcar(id) {
  if (feitas.has(id)) return;
  feitas.add(id); salvar(); desenhaMissoes();
  if (feitas.size === MISSOES.length) setTimeout(() => falarSeLigado('Parabéns! Você completou todas as missões.'), 1600);
}
$('#recomecar').addEventListener('click', () => { feitas.clear(); salvar(); desenhaMissoes(); location.hash = '#mouse'; });
desenhaMissoes();

if (window.matchMedia && matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches) $('#aviso-toque').hidden = false;

/* ---------- voz (leitura em voz alta pelo navegador) ---------- */
const temVoz = 'speechSynthesis' in window;
let vozLigada = false;
try { vozLigada = localStorage.getItem(CHAVE + '-voz') === '1'; } catch (e) { /* ok */ }
let vozPt = null;
function achaVoz() { if (!temVoz) return; const vs = speechSynthesis.getVoices(); vozPt = vs.find(v => /pt[-_]BR/i.test(v.lang)) || vs.find(v => /^pt/i.test(v.lang)) || null; }
if (temVoz) { achaVoz(); speechSynthesis.addEventListener?.('voiceschanged', achaVoz); }
let botaoFalando = null;
function falar(txt, botao) {
  if (!temVoz) return;
  speechSynthesis.cancel();
  if (botaoFalando) botaoFalando.setAttribute('aria-pressed', 'false');
  const u = new SpeechSynthesisUtterance(txt.replace(/\s+/g, ' ').trim());
  u.lang = 'pt-BR'; u.rate = 0.95; if (vozPt) u.voice = vozPt;
  if (botao) { botaoFalando = botao; botao.setAttribute('aria-pressed', 'true'); u.onend = u.onerror = () => { botao.setAttribute('aria-pressed', 'false'); botaoFalando = null; }; }
  speechSynthesis.speak(u);
}
const falarSeLigado = txt => { if (vozLigada) falar(txt); };
/* Texto para a voz: troca símbolos das teclas por palavras */
const paraVoz = t => t.replace(/´/g, ' acento agudo ').replace(/~/g, ' til ').replace(/\^/g, ' chapéu ').replace(/\+/g, ' mais ').replace(/=/g, ' fica ');
$$('.licao .licao-cab .ouvir').forEach(b => {
  b.setAttribute('aria-pressed', 'false');
  b.addEventListener('click', () => {
    if (b.getAttribute('aria-pressed') === 'true') { speechSynthesis.cancel(); return; }
    const sec = b.closest('.licao');
    falar(sec.querySelector('h2').textContent + '. ' + paraVoz(sec.querySelector('.falar').innerText), b);
  });
});
$('#info-ouvir').addEventListener('click', () => falar($('#info-nome').textContent + '. ' + $('#info-texto').textContent));
const vozGeral = $('#voz-geral');
function mostraVoz() { vozGeral.setAttribute('aria-pressed', String(vozLigada)); vozGeral.textContent = vozLigada ? 'Voz ligada' : 'Ler em voz alta'; }
if (!temVoz) { vozGeral.hidden = true; $$('.ouvir').forEach(b => b.hidden = true); }
mostraVoz();
vozGeral.addEventListener('click', () => {
  vozLigada = !vozLigada; mostraVoz();
  try { localStorage.setItem(CHAVE + '-voz', vozLigada ? '1' : '0'); } catch (e) { /* ok */ }
  if (vozLigada) falar('Voz ligada. Agora eu leio as mensagens para você. ' + $('.hero .sub').textContent); else speechSynthesis.cancel();
});

/* Mensagem de retorno (e fala, se a voz estiver ligada) */
function fb(el, msg, tipo = '') {
  el.textContent = msg; el.className = 'feedback' + (tipo ? ' ' + tipo : '');
  falarSeLigado(msg);
}
function passos(lista, n) { $$(lista + ' li').forEach((li, i) => { li.classList.toggle('ok', i < n); li.classList.toggle('agora', i === n); }); }

/* =====================================================================
   1. Mouse
   ===================================================================== */
{
  const balao = $('#balao'), campo = $('#campo-mouse'), fbEl = $('#mouse-fb');
  const PEDIDOS = [
    ['Clique no balão com o botão <b>esquerdo</b>.', 'verde'],
    ['Agora clique no balão com o botão <b>direito</b>.', 'vermelho'],
    ['Agora aperte a <b>rodinha</b> do mouse em cima do balão, como se fosse um botão.', 'amarelo'],
    ['Agora faça um <b>clique duplo</b>: dois cliques rápidos com o botão esquerdo.', 'branco'],
    ['Por último, gire a <b>rodinha</b> do mouse em cima da caixa de baixo.', 'verde']
  ];
  const NOMES = ['esquerdo', 'da rodinha', 'direito'];
  let passo = 0, bolaY = 0, toque = false;
  const move = () => {
    const w = campo.clientWidth - balao.offsetWidth - 10, h = campo.clientHeight - balao.offsetHeight - 30;
    balao.style.left = Math.max(5, Math.random() * w) + 'px'; balao.style.top = Math.max(5, Math.random() * h) + 'px';
    balao.classList.remove('estoura'); void balao.offsetWidth; balao.classList.add('estoura');
  };
  const mostra = () => {
    $('#mouse-pede').innerHTML = passo < PEDIDOS.length ? PEDIDOS[passo][0] : 'Muito bem! Você usou todas as partes do mouse.';
    balao.dataset.cor = PEDIDOS[Math.min(passo, 4)][1];
    passos('#mouse-passos', passo);
  };
  const avanca = msg => {
    passo++; fb(fbEl, msg, 'ok'); mostra();
    if (passo < 4) move();
    if (passo >= PEDIDOS.length) marcar('mouse');
  };
  campo.addEventListener('contextmenu', e => e.preventDefault());
  balao.addEventListener('pointerdown', e => { toque = e.pointerType === 'touch'; });
  balao.addEventListener('mousedown', e => {
    if (e.button === 1) e.preventDefault(); // não liga a rolagem automática
    if (passo > 2) return;
    const quer = [0, 2, 1][passo];
    if (e.button === quer) avanca(['Isso! Esse é o clique esquerdo.', 'Muito bem! O clique direito abre um menu de opções.', 'Ótimo! Você apertou a rodinha.'][passo]);
    else fb(fbEl, `Esse foi o botão ${NOMES[e.button] || 'de outro lado'}. Tente o botão ${NOMES[quer]}.`, 'bad');
  });
  /* No celular não há botão direito nem rodinha: um toque conta para os três primeiros passos */
  balao.addEventListener('click', e => {
    if ((toque || e.detail === 0) && passo <= 2) avanca('Isso! No celular e no tablet, o toque faz o papel do clique.');
  });
  balao.addEventListener('dblclick', () => { if (passo === 3) avanca('Perfeito! O clique duplo abre pastas e programas.'); });
  balao.addEventListener('keydown', e => { if (passo === 3 && e.key === 'Enter') avanca('Muito bem! Pelo teclado, o Enter abre o que está escolhido.'); });

  const rolar = $('#rolar'), bola = $('#bola-rolar');
  const desce = d => {
    if (passo !== 4) { if (passo < 4) fb(fbEl, 'Primeiro termine os cliques no balão.', 'bad'); return; }
    bolaY = Math.max(0, Math.min(100, bolaY + d));
    bola.style.top = (3 + bolaY / 100 * (rolar.querySelector('.trilho').clientHeight - 30)) + 'px';
    if (bolaY >= 100) avanca('Isso! A rodinha faz a página subir e descer.');
  };
  rolar.addEventListener('wheel', e => { if (passo === 4) { e.preventDefault(); desce(Math.sign(e.deltaY) * 8); } }, { passive: false });
  rolar.addEventListener('keydown', e => { if (passo === 4 && ['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); desce(10); } });
  let ty = null;
  rolar.addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, { passive: true });
  rolar.addEventListener('touchmove', e => { if (passo === 4 && ty != null) { const y = e.touches[0].clientY; desce(Math.abs(y - ty) / 3); ty = y; } }, { passive: true });
  if (feitas.has('mouse')) passo = PEDIDOS.length;
  mostra();
}

/* =====================================================================
   2. Teclado e mouse em 3D
   ===================================================================== */
const INFO = {
  Escape: ['Esc', 'Tecla de sair', 'Fecha janelinhas e menus, cancela o que você estava fazendo e tira o vídeo da tela cheia.'],
  Tab: ['Tab', 'Tecla de pular', 'Pula para a próxima caixa ou o próximo botão. Com o Shift junto, volta uma caixa.'],
  CapsLock: ['Fixa (Caps Lock)', 'Letras grandes', 'Aperte uma vez e todas as letras ficam grandes. Uma luzinha acende. Aperte de novo para desligar.'],
  ShiftLeft: ['Shift', 'Letra grande e símbolos', 'Segure o Shift e aperte uma letra para ela sair grande. Com os números, escreve o símbolo de cima, como o ponto de exclamação.'],
  ControlLeft: ['Ctrl', 'Tecla dos atalhos', 'Segure o Ctrl e aperte outra tecla: C copia, V cola, Z desfaz e A escolhe tudo.'],
  AltLeft: ['Alt', 'Tecla de ajuda', 'Junto com outras teclas faz atalhos. Alt mais Tab troca de janela.'],
  AltRight: ['Alt Gr', 'Símbolos extras', 'Segure o Alt Gr para escrever símbolos que aparecem no canto das teclas.'],
  MetaLeft: ['Windows', 'Tecla Iniciar', 'Abre o menu Iniciar, onde estão os programas e o botão de desligar.'],
  ContextMenu: ['Menu', 'Igual ao clique direito', 'Abre o mesmo menu de opções do botão direito do mouse.'],
  Space: ['Espaço', 'Barra de espaço', 'A tecla mais comprida. Ela coloca um espaço entre as palavras.'],
  Enter: ['Enter', 'Tecla de confirmar', 'Pula para a linha de baixo quando você escreve. Também confirma e abre o que está escolhido.'],
  Backspace: ['Backspace', 'Tecla de apagar', 'Apaga a letra que está antes do cursor, do lado esquerdo.'],
  PrintScreen: ['PrtSc (Print Screen)', 'Foto da tela', 'Tira uma foto de toda a tela. Depois é só colar com Ctrl mais V no Paint ou em uma mensagem.'],
  AudioVolumeMute: ['Mudo', 'Volume', 'Desliga o som. Aperte de novo para o som voltar.'],
  AudioVolumeDown: ['Diminuir o volume', 'Volume', 'Deixa o som mais baixo a cada toque.'],
  AudioVolumeUp: ['Aumentar o volume', 'Volume', 'Deixa o som mais alto a cada toque.'],
  BracketLeft: ['Acento agudo e crase', 'Tecla de acento', 'Aperte esta tecla e depois a vogal: assim sai á, é, í, ó, ú. Com o Shift, sai a crase, como em à.'],
  Quote: ['Til e chapéu', 'Tecla de acento', 'Aperte esta tecla e depois a letra: assim sai ã e õ. Com o Shift, sai o chapéu, como em ê e ô.'],
  Semicolon: ['Ç (cê-cedilha)', 'Letra', 'O teclado brasileiro tem uma tecla só para o ç, como em maçã.'],
  ArrowUp: ['Seta para cima', 'Setas', 'Move o cursor para cima. Em muitos jogos, faz o personagem andar.'],
  ArrowDown: ['Seta para baixo', 'Setas', 'Move o cursor para baixo e desce a página.'],
  ArrowLeft: ['Seta para a esquerda', 'Setas', 'Move o cursor uma letra para a esquerda.'],
  ArrowRight: ['Seta para a direita', 'Setas', 'Move o cursor uma letra para a direita.'],
  'mouse-esq': ['Botão esquerdo', 'Mouse', 'O clique mais usado: escolhe, abre e aperta botões. Dois cliques rápidos abrem pastas e programas.'],
  'mouse-dir': ['Botão direito', 'Mouse', 'Abre um menu com mais opções, como copiar e colar.'],
  'mouse-corpo': ['Mouse', 'Mouse', 'Apoie a mão em cima do mouse, com o dedo indicador no botão esquerdo e o dedo do meio no botão direito. Deslize na mesa para mover a setinha na tela.'],
  'mouse-meio': ['Rodinha', 'Mouse', 'Gire para subir e descer a página. Também dá para apertar, como um botão.']
};
INFO.ShiftRight = INFO.ShiftLeft; INFO.ControlRight = INFO.ControlLeft;
const NOME_CURTO = { ShiftRight: 'ShiftLeft', ControlRight: 'ControlLeft', NumpadEnter: 'Enter', MetaRight: 'MetaLeft' };

/* Linhas do teclado ABNT2: [código, rótulos (de cima para baixo), largura]; número solto = espaço vazio */
const DIG = [['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'], ['%', '5'], ['¨', '6'], ['&', '7'], ['*', '8'], ['(', '9'], [')', '0']];
const L = s => [...s].map(c => ['Key' + c, [c], 1]);
const LINHAS = [
  [['Escape', ['Esc'], 1], 0.25, ...[1, 2, 3, 4].map(n => ['F' + n, ['F' + n], 1]), 0.25, ...[5, 6, 7, 8].map(n => ['F' + n, ['F' + n], 1]), 0.25,
    ...[9, 10, 11, 12].map(n => ['F' + n, ['F' + n], 1]), 0.25, ['PrintScreen', ['PrtSc'], 1], 0.5,
    ['AudioVolumeMute', ['@mudo'], 1], ['AudioVolumeDown', ['@menos'], 1], ['AudioVolumeUp', ['@mais'], 1]],
  [['Backquote', ['"', "'"], 1], ...DIG.map((d, i) => ['Digit' + ((i + 1) % 10), d, 1]), ['Minus', ['_', '-'], 1], ['Equal', ['+', '='], 1], ['Backspace', ['@apagar'], 2]],
  [['Tab', ['Tab'], 1.5], ...L('QWERTYUIOP'), ['BracketLeft', ['`', '´'], 1], ['BracketRight', ['{', '['], 1], ['Enter', ['Enter'], 1.5]],
  [['CapsLock', ['Fixa', 'Caps Lock'], 1.75], ...L('ASDFGHJKL'), ['Semicolon', ['Ç'], 1], ['Quote', ['^', '~'], 1], ['Backslash', ['}', ']'], 1], ['Enter', [], 1.25]],
  [['ShiftLeft', ['Shift'], 1.25], ['IntlBackslash', ['|', '\\'], 1], ...L('ZXCVBNM'), ['Comma', ['<', ','], 1], ['Period', ['>', '.'], 1],
    ['Slash', [':', ';'], 1], ['IntlRo', ['?', '/'], 1], ['ShiftRight', ['Shift'], 1.75], 0.75, ['ArrowUp', ['@cima'], 1]],
  [['ControlLeft', ['Ctrl'], 1.5], ['MetaLeft', ['@win'], 1.25], ['AltLeft', ['Alt'], 1.25], ['Space', ['Espaço'], 6.5], ['AltRight', ['Alt Gr'], 1.25],
    ['ContextMenu', ['Menu'], 1.25], ['ControlRight', ['Ctrl'], 2], 0.5, ['ArrowLeft', ['@esq'], 1], ['ArrowDown', ['@baixo'], 1], ['ArrowRight', ['@dir'], 1]]
];
const COR_TECLA = code =>
  code === 'Escape' || code === 'PrintScreen' || code.startsWith('Audio') ? '#f2a9b3'
  : ['Tab', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'Enter', 'Backspace'].includes(code) ? '#9fdab4'
  : ['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'ContextMenu', 'BracketLeft', 'Quote'].includes(code) ? '#fff36b'
  : /^F\d/.test(code) ? '#e2e2df' : '#ffffff';

function nomeDaTecla(code) {
  const k = NOME_CURTO[code] || code;
  if (INFO[k]) return INFO[k][0];
  if (/^Key/.test(code)) return 'Letra ' + code.slice(3);
  if (/^Digit/.test(code)) return 'Número ' + code.slice(5);
  if (/^F\d+$/.test(code)) return 'Tecla ' + code;
  return 'Tecla de símbolos';
}
function infoDaTecla(code) {
  const k = NOME_CURTO[code] || code;
  if (INFO[k]) return INFO[k];
  if (/^Key/.test(code)) return [nomeDaTecla(code), 'Letra', `Escreve a letra ${code.slice(3)}. Ela aparece pequena; com o Shift ou com a Fixa ligada, sai grande.`];
  if (/^Digit/.test(code)) return [nomeDaTecla(code), 'Número', `Escreve o número ${code.slice(5)}. Com o Shift, escreve o símbolo que está em cima dele.`];
  if (/^F\d+$/.test(code)) return [nomeDaTecla(code), 'Tecla de função', 'Cada programa usa estas teclas de um jeito. O F5, por exemplo, recarrega a página no navegador.'];
  return [nomeDaTecla(code), 'Símbolos', 'Escreve pontuação e símbolos. O símbolo de cima sai com o Shift.'];
}

const palco = $('#palco');
let cena = null;
const teclas = new Map(); // código -> [meshes]
const mouseBt = {};       // 'mouse-esq' | 'mouse-dir' | 'mouse-meio' -> mesh
let mostrarTecla = () => {}, afundar = () => {};

async function montaCena() {
  /* importado aqui dentro: lab3d.js espera o clique em "Iniciar" e não pode travar o resto da página */
  const { lab3d, botoesCamera } = await import('../material-didatico/assets/lab3d.js');
  await Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1500))]);
  cena = lab3d(palco, { cam: [12.0, 21.5, 13.4], alvo: [12.0, 0, 3.2], min: 5, max: 40, chaoTam: 70 });
  if (!cena) return;
  /* tela estreita (celular): câmera mais longe para caber o teclado e o mouse */
  const longe = palco.clientWidth / palco.clientHeight < 1.5 ? 1.3 : 1;
  if (longe > 1) cena.posicionar([12.0, 21.5 * longe, 3.2 + 10.2 * longe], [12.0, 0, 3.2]);
  botoesCamera(cena);
  const T = cena.THREE;
  cena.descrever('Teclado e mouse em 3D. Clique em uma tecla ou em um botão do mouse para saber para que serve. Os botões "Onde fica a tecla" abaixo mostram as teclas importantes.');

  /* base do teclado */
  const base = cena.bloco(19.6, 0.45, 7.5, '#6f6f6b');
  base.position.set(-0.45, 0, -0.65);
  cena.add(base);

  const U = 1, ALT = 0.42, GAP = 0.1;
  const desenhaIcone = (ctx, nome, w, h) => {
    ctx.save(); ctx.translate(w / 2, h / 2); ctx.fillStyle = ctx.strokeStyle = '#111'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const falante = () => { ctx.beginPath(); ctx.moveTo(-34, -12); ctx.lineTo(-18, -12); ctx.lineTo(0, -30); ctx.lineTo(0, 30); ctx.lineTo(-18, 12); ctx.lineTo(-34, 12); ctx.closePath(); ctx.fill(); };
    const seta = ang => { ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(26, 14); ctx.lineTo(-26, 14); ctx.closePath(); ctx.fill(); };
    if (nome === 'mudo') { falante(); ctx.beginPath(); ctx.moveTo(10, -14); ctx.lineTo(36, 14); ctx.moveTo(36, -14); ctx.lineTo(10, 14); ctx.stroke(); }
    else if (nome === 'menos') { falante(); ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(36, 0); ctx.stroke(); }
    else if (nome === 'mais') { falante(); ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(36, 0); ctx.moveTo(23, -13); ctx.lineTo(23, 13); ctx.stroke(); }
    else if (nome === 'cima') seta(0); else if (nome === 'baixo') seta(Math.PI); else if (nome === 'esq') seta(-Math.PI / 2); else if (nome === 'dir') seta(Math.PI / 2);
    else if (nome === 'win') { [[-26, -26], [2, -26], [-26, 2], [2, 2]].forEach(([x, y]) => ctx.fillRect(x, y, 24, 24)); }
    else if (nome === 'apagar') {
      ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(50, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-74, 0); ctx.lineTo(-48, -20); ctx.lineTo(-48, 20); ctx.closePath(); ctx.fill();
      ctx.font = '600 26px Lexend, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Backspace', 0, 42);
    }
    ctx.restore();
  };
  function textura(rots, w, cor) {
    const cv = document.createElement('canvas'); cv.width = 128 * w; cv.height = 128;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = cor; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = '#111'; ctx.textBaseline = 'middle';
    if (rots.length === 1 && rots[0].startsWith('@')) desenhaIcone(ctx, rots[0].slice(1), cv.width, cv.height);
    else if (rots.length === 2 && rots[0].length === 1) {           // símbolo em cima e embaixo
      ctx.textAlign = 'left'; ctx.font = '600 44px Lexend, system-ui, sans-serif';
      ctx.fillText(rots[0], 26, 36); ctx.fillText(rots[1], 26, 90);
    } else if (rots.length === 2) {                                  // Fixa / Caps Lock
      ctx.textAlign = 'center'; ctx.font = '700 40px Lexend, system-ui, sans-serif'; ctx.fillText(rots[0], cv.width / 2, 46);
      ctx.font = '500 25px Lexend, system-ui, sans-serif'; ctx.fillText(rots[1], cv.width / 2, 90);
    } else if (rots.length === 1) {
      const t = rots[0], curto = t.length === 1;
      ctx.textAlign = curto ? 'left' : 'center';
      ctx.font = `${curto ? 600 : 600} ${curto ? 58 : (t.length > 4 && w < 1.3 ? 30 : 36)}px Lexend, system-ui, sans-serif`;
      ctx.fillText(t, curto ? 30 : cv.width / 2, curto ? 50 : 66);
    }
    const tex = new T.CanvasTexture(cv); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 8;
    return tex;
  }

  let z = 0;
  LINHAS.forEach((linha, r) => {
    let x = 0;
    if (r === 1) z += 0.3;
    linha.forEach(it => {
      if (typeof it === 'number') { x += it; return; }
      const [code, rots, w] = it;
      const cor = COR_TECLA(code);
      const lado = cena.material(new T.Color(cor).multiplyScalar(0.82).getStyle());
      const wReal = w, zExtra = 0, xPos = x; // o Enter em L é feito de duas peças, uma em cada linha
      const g = new T.BoxGeometry(wReal * U - GAP, ALT, U - GAP);
      const topo = new T.MeshStandardMaterial({ map: textura(rots, wReal, cor), roughness: 0.55 });
      const m = new T.Mesh(g, [lado, lado, topo, lado, lado, lado]);
      m.castShadow = true; m.receiveShadow = true;
      cena.comBordas(m);
      m.position.set(xPos + wReal / 2, 0.45 + ALT / 2, z + zExtra + 0.5);
      m.userData = { code, y0: m.position.y, cor };
      cena.add(m);
      cena.clicavel(m, () => clicouTecla(code));
      if (!teclas.has(code)) teclas.set(code, []);
      teclas.get(code).push(m);
      x += w;
    });
    z += 1;
  });

  /* ---------- mouse ---------- */
  const mouse = new T.Group();
  mouse.position.set(22.2, 0, 3.4);
  const elip = new T.Group(); elip.scale.set(1.15, 0.8, 1.85); mouse.add(elip);
  const corpoMat = cena.material('#c9c9c5');
  const sph = (phi0, phiLen, mat) => {
    const m = new T.Mesh(new T.SphereGeometry(1, 48, 24, phi0, phiLen, 0, Math.PI / 2), mat);
    m.castShadow = true; m.receiveShadow = true; return m;
  };
  const tras = sph(0, Math.PI, corpoMat); elip.add(tras);
  const meioFrente = sph(Math.PI + 1.48, 0.18, cena.material('#6f6f6b')); elip.add(meioFrente);
  const esq = sph(Math.PI * 1.5 + 0.09, Math.PI / 2 - 0.09, cena.material('#9fdab4'));
  const dir = sph(Math.PI, Math.PI / 2 - 0.09, cena.material('#f2a9b3'));
  [esq, dir].forEach(b => { b.scale.setScalar(1.012); elip.add(b); });
  const sapata = new T.Mesh(new T.CylinderGeometry(1, 1, 0.12, 48), corpoMat); sapata.position.y = 0.0; sapata.scale.set(1.15, 1, 1.85); mouse.add(sapata);
  const roda = new T.Mesh(new T.CylinderGeometry(0.24, 0.24, 0.2, 32), cena.material('#f2cf1d'));
  roda.rotation.z = Math.PI / 2; roda.position.set(0, 0.74, -0.62); roda.castShadow = true; cena.comBordas(roda, 40); mouse.add(roda);
  const fio = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([
    new T.Vector3(0, 0.12, -1.8), new T.Vector3(0, 0.1, -3.2), new T.Vector3(-1.5, 0.08, -4.6), new T.Vector3(-4, 0.06, -4.9)]), 40, 0.07, 8), cena.material('#111111'));
  mouse.add(fio);
  cena.add(mouse);
  mouseBt['mouse-esq'] = esq; mouseBt['mouse-dir'] = dir; mouseBt['mouse-meio'] = roda;
  const rotM = (txt, pos) => { const r = cena.rotulo(txt, { tam: 0.5 }); r.position.set(...pos); mouse.add(r); };
  rotM('Esquerdo', [-2.1, 1.0, -1.1]); rotM('Direito', [2.1, 1.0, -1.1]); rotM('Rodinha', [0, 1.7, -2.6]);
  [['mouse-esq', esq], ['mouse-dir', dir], ['mouse-meio', roda], ['mouse-corpo', tras], ['mouse-corpo', meioFrente]].forEach(([k, m]) => cena.clicavel(m, () => clicouTecla(k)));
  $('#ver-mouse').addEventListener('click', () => { cena.controls.target.set(22.2, 0.4, 2.8); cena.camera.position.set(22.2, 7.5, 10.5); cena.controls.update(); cena.pedeQuadro(); });

  /* clique físico do mouse em cima da cena: o botão 3D correspondente afunda */
  palco.addEventListener('contextmenu', e => e.preventDefault());
  palco.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    const k = ['mouse-esq', 'mouse-meio', 'mouse-dir'][e.button];
    if (!k) return;
    afundar(k);
    if (e.button !== 0) { e.preventDefault(); clicouTecla(k, true); }
  });

  /* ---------- animações ---------- */
  afundar = code => {
    if (mouseBt[code]) {
      const m = mouseBt[code];
      if (code === 'mouse-meio') { cena.animar(m, { rotation: [m.rotation.x - 1.2, 0, Math.PI / 2] }, 300); return; }
      cena.animar(m, { scale: [1.012, 0.93, 1.012] }, 90).then(() => cena.animar(m, { scale: [1.012, 1.012, 1.012] }, 160));
      return;
    }
    (teclas.get(code) || []).forEach(m => {
      cena.animar(m, { position: [m.position.x, m.userData.y0 - 0.24, m.position.z] }, 80)
        .then(() => cena.animar(m, { position: [m.position.x, m.userData.y0, m.position.z] }, 180));
    });
  };
  mostrarTecla = code => {
    const ms = mouseBt[code] ? [mouseBt[code]] : (teclas.get(code) || []);
      ms.forEach(m => {
      // só o topo da tecla brilha: as laterais usam materiais compartilhados
      const mats = Array.isArray(m.material) ? [m.material[2]] : [m.material];
      const y0 = m.userData.y0, pos = y => ({ position: [m.position.x, y, m.position.z] });
      cena.animar(m, pos(y0 + 0.7), 220).then(() => cena.animar(m, pos(y0), 260))
        .then(() => cena.animar(m, pos(y0 + 0.45), 200)).then(() => cena.animar(m, pos(y0), 220));
      mats.forEach(mt => { if (mt.emissive) { mt.emissive.setHex(0x1f8a4c); mt.emissiveIntensity = 0.5; } });
      setTimeout(() => { mats.forEach(mt => mt.emissive && mt.emissive.setHex(0)); cena.pedeQuadro(); }, 1600);
    });
  };
  /* o material das peças do mouse é compartilhado: guardo a altura de origem */
  Object.values(mouseBt).forEach(m => { m.userData.y0 = m.position.y; });
}

function mostraInfo(code) {
  const [nome, tipo, texto] = infoDaTecla(code);
  $('#info-tipo').textContent = tipo; $('#info-nome').textContent = nome; $('#info-texto').textContent = texto;
  falarSeLigado(nome + '. ' + texto);
}

/* ---------- jogo: ache a tecla ---------- */
const POOL = ['Escape', 'Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft', 'Space', 'Enter', 'Backspace', 'PrintScreen', 'BracketLeft', 'Quote', 'Semicolon', 'MetaLeft', 'AudioVolumeUp', 'mouse-dir', 'mouse-meio'];
const PEDE = {
  Escape: 'Clique na tecla Esc', Tab: 'Clique na tecla Tab', CapsLock: 'Clique na tecla Fixa (Caps Lock)', ShiftLeft: 'Clique em uma tecla Shift',
  ControlLeft: 'Clique em uma tecla Ctrl', Space: 'Clique na barra de Espaço', Enter: 'Clique na tecla Enter', Backspace: 'Clique na tecla de apagar (Backspace)',
  PrintScreen: 'Clique na tecla de tirar print (PrtSc)', BracketLeft: 'Clique na tecla do acento agudo', Quote: 'Clique na tecla do til',
  Semicolon: 'Clique na tecla do Ç', MetaLeft: 'Clique na tecla Windows', AudioVolumeUp: 'Clique na tecla de aumentar o volume',
  'mouse-dir': 'Clique no botão direito do mouse', 'mouse-meio': 'Clique na rodinha do mouse'
};
const RODADAS = 6;
let ache = null;
const igual = (a, b) => (NOME_CURTO[a] || a) === (NOME_CURTO[b] || b);
function acheMostra() {
  if (!ache) return;
  $('#ache-pede').textContent = PEDE[ache.fila[ache.i]];
  $('#ache-placar').textContent = `Tecla ${ache.i + 1} de ${RODADAS}`;
  falarSeLigado($('#ache-pede').textContent);
}
$('#ache-comecar').addEventListener('click', () => {
  const fila = [...POOL].sort(() => Math.random() - 0.5).slice(0, RODADAS);
  ache = { fila, i: 0, erros: 0 };
  $('#ache-comecar').textContent = 'Começar de novo';
  $('#ache-fb').textContent = '';
  acheMostra();
});
function acheConfere(code) {
  if (!ache) return false;
  const alvo = ache.fila[ache.i];
  if (igual(code, alvo)) {
    ache.i++; ache.erros = 0;
    if (ache.i >= RODADAS) {
      ache = null;
      $('#ache-pede').textContent = 'Você achou todas!'; $('#ache-placar').textContent = '';
      fb($('#ache-fb'), 'Muito bem! Você já sabe onde ficam as teclas importantes.', 'ok');
      marcar('teclas3d');
    } else { fb($('#ache-fb'), 'Acertou!', 'ok'); setTimeout(acheMostra, 900); }
    return true;
  }
  ache.erros++;
  fb($('#ache-fb'), `Essa é ${/^mouse/.test(code) ? 'o ' : 'a tecla '}${nomeDaTecla(code)}. ${ache.erros >= 2 ? 'Olhe a peça que está pulando.' : 'Tente de novo.'}`, 'bad');
  if (ache.erros >= 2) mostrarTecla(alvo);
  return true;
}
function clicouTecla(code, silencioso) {
  if (!silencioso) afundar(code);
  if (ache) { acheConfere(code); return; }
  mostraInfo(code);
}

/* botões "Onde fica a tecla?" */
const CHIPS = [['Escape', 'Esc'], ['Tab', 'Tab'], ['CapsLock', 'Fixa'], ['ShiftLeft', 'Shift'], ['ControlLeft', 'Ctrl'], ['AltLeft', 'Alt'], ['MetaLeft', 'Windows'],
  ['Space', 'Espaço'], ['Enter', 'Enter'], ['Backspace', 'Apagar'], ['BracketLeft', 'Acento agudo'], ['Quote', 'Til'], ['Semicolon', 'Ç'], ['PrintScreen', 'Print'],
  ['AudioVolumeUp', 'Volume'], ['mouse-esq', 'Clique esquerdo'], ['mouse-dir', 'Clique direito'], ['mouse-meio', 'Rodinha']];
$('#chips-teclas').innerHTML = CHIPS.map(([c, n]) => `<button class="chip" type="button" data-tecla="${c}">${n}</button>`).join('');
$$('#chips-teclas .chip').forEach(b => b.addEventListener('click', () => { mostrarTecla(b.dataset.tecla); mostraInfo(b.dataset.tecla); }));

montaCena();

/* teclado físico: a tecla de verdade afunda no teclado 3D */
const digitando = el => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
const atualizaFixa = e => {
  if (!e.getModifierState) return;
  const on = e.getModifierState('CapsLock');
  $('#luz-fixa').classList.toggle('ligada', on);
  $('#texto-fixa').textContent = on ? 'Fixa ligada: as letras saem grandes' : 'Fixa desligada';
};
document.addEventListener('keydown', e => {
  atualizaFixa(e);
  if (e.repeat) return;
  const code = NOME_CURTO[e.code] === 'Enter' ? 'Enter' : e.code;
  afundar(code);
  if (digitando(e.target) || $('#esc-janela').open) return;
  if (ache) { if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(code)) acheConfere(code); return; }
  if (teclas.has(code) && code !== 'Tab') mostraInfo(code);
});
document.addEventListener('keyup', e => {
  atualizaFixa(e);
  if (e.code === 'PrintScreen' || e.key === 'PrintScreen') {   // no Windows, o print só chega no keyup
    afundar('PrintScreen');
    if (ache) acheConfere('PrintScreen');
    printFeito('A tecla PrtSc foi apertada. A foto da tela está guardada: abra o Paint e aperte Ctrl + V para ver.');
  }
});

/* =====================================================================
   3. Shift e Fixa
   ===================================================================== */
{
  const campos = $$('#shift input');
  const confere = () => {
    let ok = 0;
    campos.forEach(c => { const certo = c.value.trim() === c.dataset.alvo; c.classList.toggle('ok', certo); if (certo) ok++; });
    return ok;
  };
  campos.forEach((c, i) => c.addEventListener('input', () => {
    const ok = confere();
    const v = c.value.trim();
    if (v === c.dataset.alvo) {
      if (ok === campos.length) { fb($('#shift-fb'), 'Perfeito! Você usou o Shift e a Fixa. Lembre de desligar a Fixa depois.', 'ok'); marcar('shift'); }
      else fb($('#shift-fb'), 'Isso mesmo!', 'ok');
    } else if (v.length >= c.dataset.alvo.length && v.toLowerCase() === c.dataset.alvo.toLowerCase()) {
      fb($('#shift-fb'), i === 1 ? 'Quase! As três letras precisam ser grandes. Ligue a Fixa.' : 'Quase! Olhe as letras grandes e pequenas.', 'bad');
    }
  }));
}

/* =====================================================================
   4. Acentos
   ===================================================================== */
{
  const PALAVRAS = [
    ['pé', 'Aperte a tecla do acento agudo, ao lado do P. Solte. Depois aperte o e.'],
    ['avó', 'Escreva av, aperte a tecla do acento agudo, solte e aperte o o.'],
    ['mãe', 'Escreva m, aperte a tecla do til, ao lado do Ç, solte e aperte o a.'],
    ['você', 'Segure o Shift e aperte a tecla do til para fazer o chapéu. Solte e aperte o e.'],
    ['maçã', 'O ç tem tecla própria, ao lado do L. Para o ã, aperte o til e depois o a.']
  ];
  const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  let n = 0;
  const campo = $('#acento-campo');
  const mostra = () => {
    if (n >= PALAVRAS.length) { $('#acento-n').textContent = PALAVRAS.length; $('#acento-palavra').textContent = PALAVRAS[PALAVRAS.length - 1][0]; return; }
    $('#acento-n').textContent = n + 1; $('#acento-palavra').textContent = PALAVRAS[n][0]; $('#acento-dica').textContent = '';
  };
  campo.addEventListener('input', () => {
    if (n >= PALAVRAS.length) return;
    const v = campo.value.normalize('NFC').trim().toLowerCase(), alvo = PALAVRAS[n][0];
    if (v === alvo) {
      campo.classList.add('ok');
      n++;
      if (n >= PALAVRAS.length) { fb($('#acento-fb'), 'Parabéns! Você escreveu todas as palavras com acento.', 'ok'); marcar('acento'); return; }
      fb($('#acento-fb'), `Muito bem, ${alvo} está certinho!`, 'ok');
      setTimeout(() => { campo.value = ''; campo.classList.remove('ok'); mostra(); campo.focus(); }, 1100);
    } else if (semAcento(v) === semAcento(alvo) || v.length >= alvo.length) {
      $('#acento-dica').textContent = PALAVRAS[n][1];
      fb($('#acento-fb'), 'Quase! Apague com o Backspace e tente de novo. A dica está aqui embaixo.', 'bad');
    } else if (/[´`~^¨]$/.test(campo.value)) {
      $('#acento-dica').textContent = 'O acento apareceu sozinho? Aperte a letra logo depois dele, sem apertar outra tecla no meio.';
    }
  });
  mostra();
}

/* =====================================================================
   5. Ctrl
   ===================================================================== */
{
  const origem = $('#ctrl-origem'), destino = $('#ctrl-destino');
  let feito = 0;
  const vai = (k, msg) => { if (feito < k) { feito = k; passos('#ctrl-passos', feito); fb($('#ctrl-fb'), msg, 'ok'); } };
  passos('#ctrl-passos', 0);
  origem.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') vai(1, 'A palavra ficou marcada. Agora aperte Ctrl + C.'); });
  origem.addEventListener('copy', () => { vai(2, 'Copiado! Agora clique na caixa branca e aperte Ctrl + V.'); });
  destino.addEventListener('paste', () => setTimeout(() => {
    if (destino.value.trim() === 'COMPUTADOR') { destino.classList.add('ok'); feito = 3; passos('#ctrl-passos', 3); fb($('#ctrl-fb'), 'Colou! Você usou o Ctrl para copiar e colar.', 'ok'); marcar('ctrl'); }
    else fb($('#ctrl-fb'), 'Colou outra coisa. Copie a palavra da caixa amarela de novo.', 'bad');
  }, 0));
  destino.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') fb($('#ctrl-fb'), 'Ctrl + Z desfaz o último passo.', '');
  });
  destino.addEventListener('input', e => {
    if (e.inputType === 'insertFromPaste') return;
    if (destino.value.trim().toUpperCase() === 'COMPUTADOR' && feito < 3) fb($('#ctrl-fb'), 'Você escreveu a palavra. Agora tente colar com Ctrl + V, sem digitar.', 'bad');
  });
}

/* =====================================================================
   6. Tab
   ===================================================================== */
{
  const [c1, c2, c3] = ['#tab-1', '#tab-2', '#tab-3'].map($);
  const pulou = new Set();
  [c1, c2].forEach((c, i) => c.addEventListener('keydown', e => {
    if (e.key === 'Tab' && !e.shiftKey && c.value.trim()) { pulou.add(i); c.classList.add('ok'); fb($('#tab-fb'), i === 0 ? 'Pulou para a próxima caixa!' : 'Mais um pulo! Agora escreva a cor.', 'ok'); }
  }));
  c3.addEventListener('input', () => {
    if (!c3.value.trim()) return;
    if (pulou.size === 2) { c3.classList.add('ok'); fb($('#tab-fb'), 'Muito bem! Você passou de caixa em caixa com o Tab.', 'ok'); marcar('tab'); }
    else fb($('#tab-fb'), 'Escreva nas caixas na ordem e use o Tab para pular de uma para a outra.', 'bad');
  });
  [c1, c2].forEach(c => c.addEventListener('focus', () => {
    if (pulou.size < 2 && c === c1 && !c1.value) fb($('#tab-fb'), '', '');
  }));
}

/* =====================================================================
   7. Esc
   ===================================================================== */
{
  const janela = $('#esc-janela');
  let peloEsc = false;
  $('#esc-abrir').addEventListener('click', () => { peloEsc = false; janela.showModal(); falarSeLigado('Aperte a tecla Esc para fechar esta janela.'); });
  janela.addEventListener('cancel', () => { peloEsc = true; });
  janela.addEventListener('keydown', e => { if (e.key === 'Escape') { peloEsc = true; afundar('Escape'); } });
  $('#esc-fechar').addEventListener('click', () => janela.close());
  janela.addEventListener('close', () => {
    if (peloEsc) { fb($('#esc-fb'), 'Isso! A janela fechou com o Esc. Ele também tira os vídeos da tela cheia.', 'ok'); marcar('esc'); }
    else fb($('#esc-fb'), 'A janela fechou com o mouse. Abra de novo e tente com a tecla Esc.', 'bad');
    $('#esc-abrir').focus();
  });
}

/* =====================================================================
   8. Print
   ===================================================================== */
function printFeito(msg) { fb($('#print-fb'), msg, 'ok'); marcar('print'); }
$('#print-feito').addEventListener('click', () => printFeito('Muito bem! Para ver a foto, abra o Paint e aperte Ctrl + V.'));

/* =====================================================================
   9. Volume (som feito pelo próprio navegador, sem arquivos)
   ===================================================================== */
{
  let ctx = null, ganho = null, timer = null, tocando = false, etapa = 0;
  const vol = $('#vol'), btn = $('#som-tocar');
  const nivel = () => Math.pow(vol.value / 100, 2) * 0.35;
  const NOTAS = [523, 587, 659, 523, 659, 784, 659, 587, 523, 392, 523, 0];
  const toca = () => {
    let i = 0;
    const nota = () => {
      const f = NOTAS[i++ % NOTAS.length];
      if (f) {
        const o = ctx.createOscillator(), env = ctx.createGain();
        o.type = 'triangle'; o.frequency.value = f; o.connect(env); env.connect(ganho);
        const t = ctx.currentTime; env.gain.setValueAtTime(0.0001, t); env.gain.exponentialRampToValueAtTime(1, t + 0.02); env.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
        o.start(t); o.stop(t + 0.32);
      }
    };
    nota(); timer = setInterval(nota, 300);
  };
  const vai = (k, msg) => { if (etapa < k) { etapa = k; passos('#vol-passos', etapa); fb($('#vol-fb'), msg, 'ok'); if (etapa === 3) marcar('volume'); } };
  passos('#vol-passos', 0);
  btn.addEventListener('click', () => {
    if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) { fb($('#vol-fb'), 'Este navegador não toca sons. Treine a barrinha mesmo assim.', 'bad'); return; } ctx = new AC(); ganho = ctx.createGain(); ganho.connect(ctx.destination); }
    if (ctx.state === 'suspended') ctx.resume();
    tocando = !tocando;
    if (tocando) { ganho.gain.value = nivel(); toca(); btn.textContent = 'Parar a música'; vai(1, 'A música está tocando. Agora arraste a barrinha até o fim, para o lado direito.'); }
    else { clearInterval(timer); btn.textContent = 'Tocar música'; }
  });
  vol.addEventListener('input', () => {
    $('#vol-n').textContent = vol.value;
    if (ganho) ganho.gain.setTargetAtTime(nivel(), ctx.currentTime, 0.03);
    if (!tocando) return;
    if (+vol.value >= 90) vai(2, 'Bem alto! Agora leve a barrinha para o lado esquerdo, para o som ficar bem baixinho.');
    if (etapa >= 2 && +vol.value <= 10) vai(3, 'Bem baixinho! Você já sabe mudar o volume.');
  });
}

/* =====================================================================
   10. Programas
   ===================================================================== */
{
  const PROGS = ['Navegador', 'Paint', 'Editor de texto', 'Explorador de Arquivos', 'Calculadora', 'Scratch'];
  const PERG = [['Quero desenhar uma casa.', 'Paint'], ['Quero ver um vídeo na internet.', 'Navegador'], ['Quero fazer a conta 25 + 17.', 'Calculadora'],
    ['Quero escrever uma carta.', 'Editor de texto'], ['Quero achar uma foto que guardei.', 'Explorador de Arquivos'], ['Quero criar um jogo com blocos.', 'Scratch']];
  const fila = [...PERG].sort(() => Math.random() - 0.5);
  let i = 0;
  const mostra = () => {
    if (i >= fila.length) {
      $('#quiz-pergunta').textContent = 'Você acertou todas!'; $('#quiz-opcoes').innerHTML = ''; $('#quiz-placar').textContent = '';
      return;
    }
    const [p, certo] = fila[i];
    const outros = PROGS.filter(x => x !== certo).sort(() => Math.random() - 0.5).slice(0, 2);
    const ops = [certo, ...outros].sort(() => Math.random() - 0.5);
    $('#quiz-pergunta').textContent = p + ' Qual programa eu uso?';
    $('#quiz-placar').textContent = `Pergunta ${i + 1} de ${fila.length}`;
    $('#quiz-opcoes').innerHTML = ops.map(o => `<button class="btn" type="button">${o}</button>`).join('');
    $$('#quiz-opcoes .btn').forEach(b => b.addEventListener('click', () => {
      if (b.textContent === certo) {
        b.classList.add('certo'); i++;
        if (i >= fila.length) { fb($('#quiz-fb'), 'Parabéns! Você já sabe para que serve cada programa.', 'ok'); marcar('programas'); }
        else fb($('#quiz-fb'), 'Certo!', 'ok');
        setTimeout(mostra, 800);
      } else { b.classList.add('errado'); b.disabled = true; fb($('#quiz-fb'), `O ${b.textContent} não é o melhor para isso. Tente outro.`, 'bad'); }
    }));
    falarSeLigado($('#quiz-pergunta').textContent);
  };
  mostra();
}

/* =====================================================================
   11. Desligar (computador de brinquedo)
   ===================================================================== */
{
  const ini = $('#btn-iniciar'), menu = $('#menu-iniciar'), en = $('#btn-energia'), menuEn = $('#menu-energia'), apagada = $('#tela-apagada');
  const brilha = el => { $$('.passo-brilha').forEach(x => x.classList.remove('passo-brilha')); if (el) el.classList.add('passo-brilha'); };
  const reset = () => {
    menu.hidden = true; menuEn.hidden = true; apagada.hidden = true; apagada.style.opacity = '';
    ini.setAttribute('aria-expanded', 'false'); en.setAttribute('aria-expanded', 'false');
    $('#pc-ligar').hidden = true; brilha(ini);
  };
  ini.addEventListener('click', () => {
    const abre = menu.hidden; menu.hidden = !abre; menuEn.hidden = true;
    ini.setAttribute('aria-expanded', String(abre));
    if (abre) { brilha(en); fb($('#desligar-fb'), 'O menu Iniciar abriu. Agora clique no botão Energia, o círculo com um risquinho.', 'ok'); }
    else brilha(ini);
  });
  en.addEventListener('click', () => {
    const abre = menuEn.hidden; menuEn.hidden = !abre; en.setAttribute('aria-expanded', String(abre));
    if (abre) { brilha($('#btn-desligar')); fb($('#desligar-fb'), 'Agora clique em Desligar.', 'ok'); }
  });
  $('#btn-suspender').addEventListener('click', () => fb($('#desligar-fb'), 'Suspender deixa o computador dormindo, mas ligado. Procure Desligar.', 'bad'));
  $('#btn-reiniciar').addEventListener('click', () => fb($('#desligar-fb'), 'Reiniciar desliga e liga de novo. Procure Desligar.', 'bad'));
  $('#btn-desligar').addEventListener('click', () => {
    brilha(null); apagada.hidden = false; apagada.querySelector('p').textContent = 'Desligando...';
    setTimeout(() => { apagada.querySelector('p').textContent = ''; }, 1600);
    fb($('#desligar-fb'), 'Pronto! O computador desligou do jeito certo. Agora é só esperar a tela apagar.', 'ok');
    marcar('desligar'); $('#pc-ligar').hidden = false;
  });
  $('#pc-ligar').addEventListener('click', reset);
  reset();
}
