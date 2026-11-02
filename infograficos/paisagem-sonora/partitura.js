/* Dados: SONYC-UST v2.3 (Cartwright et al., 2020), CC BY 4.0. Gerado a partir do annotations.csv. */
(function () {
const D = {"linhas": [{"id": "medium-sounding-engine", "nome": "motor médio (carro)", "grupo": "engine", "total": 1237, "taxa": [0.0963, 0.0971, 0.0939, 0.1097, 0.1, 0.0825, 0.0648, 0.0409, 0.0426, 0.0527, 0.0436, 0.0534, 0.0371, 0.0544, 0.0539, 0.0594, 0.0742, 0.0784, 0.0862, 0.0992, 0.0949, 0.0792, 0.0767, 0.0953], "pico": 3}, {"id": "large-sounding-engine", "nome": "motor grande (caminhão, ônibus)", "grupo": "engine", "total": 1878, "taxa": [0.082, 0.0947, 0.1168, 0.1305, 0.1513, 0.1975, 0.1574, 0.116, 0.1385, 0.1466, 0.1152, 0.0912, 0.1049, 0.1009, 0.0929, 0.0891, 0.0844, 0.0746, 0.0751, 0.0764, 0.0595, 0.0528, 0.0592, 0.0681], "pico": 5}, {"id": "reverse-beeper", "nome": "bipe de ré", "grupo": "alert-signal", "total": 534, "taxa": [0.0143, 0.0243, 0.0127, 0.0209, 0.0154, 0.0175, 0.0208, 0.0641, 0.0542, 0.0387, 0.0349, 0.0422, 0.0362, 0.0406, 0.039, 0.0297, 0.0191, 0.0162, 0.0135, 0.008, 0.0114, 0.0109, 0.0052, 0.0078], "pico": 7}, {"id": "chainsaw", "nome": "motosserra", "grupo": "powered-saw", "total": 194, "taxa": [0.002, 0.0, 0.0025, 0.0, 0.0, 0.0, 0.0046, 0.0497, 0.0195, 0.0198, 0.0131, 0.0112, 0.0172, 0.019, 0.0176, 0.0085, 0.0034, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], "pico": 7}, {"id": "small-medium-rotating-saw", "nome": "serra circular", "grupo": "powered-saw", "total": 101, "taxa": [0.0, 0.0, 0.0, 0.0026, 0.0077, 0.0, 0.0, 0.0144, 0.0115, 0.0107, 0.0131, 0.0103, 0.0072, 0.0069, 0.0084, 0.0011, 0.0022, 0.0, 0.0, 0.0013, 0.0, 0.0016, 0.0, 0.0019], "pico": 7}, {"id": "dog-barking-whining", "nome": "cachorro", "grupo": "dog", "total": 787, "taxa": [0.0143, 0.0024, 0.0, 0.0, 0.0051, 0.0075, 0.0231, 0.0475, 0.0737, 0.061, 0.0611, 0.0516, 0.047, 0.0423, 0.052, 0.0573, 0.0574, 0.0498, 0.0456, 0.059, 0.0266, 0.014, 0.0122, 0.0272], "pico": 8}, {"id": "jackhammer", "nome": "britadeira", "grupo": "machinery-impact", "total": 411, "taxa": [0.002, 0.0097, 0.0025, 0.0, 0.0026, 0.0, 0.0, 0.0276, 0.0568, 0.0708, 0.0576, 0.0482, 0.0307, 0.0293, 0.0167, 0.0085, 0.0022, 0.0012, 0.0049, 0.0027, 0.0013, 0.0016, 0.0035, 0.0], "pico": 9}, {"id": "non-machinery-impact", "nome": "batidas (porta, carga)", "grupo": "non-machinery-impact", "total": 604, "taxa": [0.0061, 0.0097, 0.0102, 0.0183, 0.0308, 0.02, 0.0324, 0.021, 0.0382, 0.0362, 0.0366, 0.0361, 0.0335, 0.0371, 0.0566, 0.0403, 0.0292, 0.0448, 0.0357, 0.0375, 0.0456, 0.0109, 0.0192, 0.0195], "pico": 14}, {"id": "small-sounding-engine", "nome": "motor pequeno (moto, cortador)", "grupo": "engine", "total": 175, "taxa": [0.0061, 0.0121, 0.0025, 0.0026, 0.0026, 0.0125, 0.0116, 0.0144, 0.016, 0.0091, 0.0087, 0.006, 0.0027, 0.0164, 0.0102, 0.0127, 0.0079, 0.0112, 0.0172, 0.008, 0.0063, 0.0047, 0.007, 0.0039], "pico": 18}, {"id": "car-horn", "nome": "buzina", "grupo": "alert-signal", "total": 1523, "taxa": [0.1127, 0.0728, 0.0888, 0.0601, 0.0205, 0.03, 0.037, 0.0365, 0.0453, 0.0445, 0.0576, 0.0663, 0.0732, 0.0777, 0.0956, 0.0891, 0.1181, 0.1119, 0.1244, 0.1367, 0.138, 0.0947, 0.1307, 0.1206], "pico": 20}, {"id": "person-or-small-group-shouting", "nome": "gritos", "grupo": "human-voice", "total": 362, "taxa": [0.0205, 0.0316, 0.0355, 0.0235, 0.0154, 0.005, 0.0, 0.0033, 0.0027, 0.0058, 0.0122, 0.0189, 0.0208, 0.0138, 0.0223, 0.0286, 0.0259, 0.0311, 0.0209, 0.0241, 0.0392, 0.0326, 0.0279, 0.035], "pico": 20}, {"id": "stationary-music", "nome": "música (de um lugar fixo)", "grupo": "music", "total": 327, "taxa": [0.0061, 0.0049, 0.0051, 0.0, 0.0051, 0.0, 0.0046, 0.0022, 0.0027, 0.0066, 0.0079, 0.0146, 0.0172, 0.0233, 0.0306, 0.0244, 0.0326, 0.0299, 0.0308, 0.0335, 0.0392, 0.0388, 0.0192, 0.0097], "pico": 20}, {"id": "person-or-small-group-talking", "nome": "conversa", "grupo": "human-voice", "total": 4010, "taxa": [0.1926, 0.1432, 0.132, 0.0783, 0.0513, 0.0175, 0.0486, 0.0464, 0.0631, 0.0758, 0.123, 0.1609, 0.2251, 0.2166, 0.2767, 0.3319, 0.3375, 0.3408, 0.3522, 0.4021, 0.3684, 0.4239, 0.3711, 0.284], "pico": 21}, {"id": "siren", "nome": "sirene", "grupo": "alert-signal", "total": 715, "taxa": [0.0512, 0.0316, 0.0533, 0.0261, 0.0385, 0.0275, 0.0301, 0.0155, 0.016, 0.0239, 0.0175, 0.0353, 0.038, 0.0336, 0.0446, 0.0477, 0.0495, 0.0547, 0.0554, 0.0523, 0.0544, 0.059, 0.0488, 0.0584], "pico": 21}], "silencio": [0.303, 0.32, 0.315, 0.384, 0.408, 0.445, 0.412, 0.338, 0.307, 0.303, 0.284, 0.293, 0.25, 0.242, 0.187, 0.208, 0.196, 0.201, 0.183, 0.185, 0.195, 0.18, 0.199, 0.241], "n_hora": [488, 412, 394, 383, 390, 400, 432, 905, 1126, 1214, 1146, 1162, 1106, 1159, 1077, 943, 889, 804, 812, 746, 790, 644, 574, 514], "sensores": [{"id": 0, "n": 509, "bairro": "Manhattan", "engine": 0.473, "machinery-impact": 0.041, "non-machinery-impact": 0.031, "powered-saw": 0.035, "alert-signal": 0.167, "music": 0.008, "human-voice": 0.122, "dog": 0.004, "silencio": 0.299}, {"id": 1, "n": 1146, "bairro": "Manhattan", "engine": 0.147, "machinery-impact": 0.007, "non-machinery-impact": 0.017, "powered-saw": 0.017, "alert-signal": 0.072, "music": 0.051, "human-voice": 0.281, "dog": 0.475, "silencio": 0.19}, {"id": 2, "n": 654, "bairro": "Manhattan", "engine": 0.45, "machinery-impact": 0.031, "non-machinery-impact": 0.014, "powered-saw": 0.02, "alert-signal": 0.139, "music": 0.005, "human-voice": 0.312, "dog": 0.002, "silencio": 0.196}, {"id": 3, "n": 598, "bairro": "Manhattan", "engine": 0.487, "machinery-impact": 0.035, "non-machinery-impact": 0.037, "powered-saw": 0.028, "alert-signal": 0.294, "music": 0.018, "human-voice": 0.166, "dog": 0.002, "silencio": 0.182}, {"id": 4, "n": 685, "bairro": "Manhattan", "engine": 0.239, "machinery-impact": 0.057, "non-machinery-impact": 0.054, "powered-saw": 0.091, "alert-signal": 0.107, "music": 0.042, "human-voice": 0.472, "dog": 0.013, "silencio": 0.182}, {"id": 5, "n": 407, "bairro": "Brooklyn", "engine": 0.251, "machinery-impact": 0.037, "non-machinery-impact": 0.039, "powered-saw": 0.012, "alert-signal": 0.113, "music": 0.391, "human-voice": 0.297, "dog": 0.0, "silencio": 0.197}, {"id": 6, "n": 1101, "bairro": "Manhattan", "engine": 0.163, "machinery-impact": 0.02, "non-machinery-impact": 0.033, "powered-saw": 0.005, "alert-signal": 0.128, "music": 0.077, "human-voice": 0.635, "dog": 0.009, "silencio": 0.165}, {"id": 7, "n": 333, "bairro": "Manhattan", "engine": 0.276, "machinery-impact": 0.015, "non-machinery-impact": 0.045, "powered-saw": 0.054, "alert-signal": 0.177, "music": 0.015, "human-voice": 0.174, "dog": 0.006, "silencio": 0.363}, {"id": 9, "n": 275, "bairro": "Manhattan", "engine": 0.244, "machinery-impact": 0.08, "non-machinery-impact": 0.069, "powered-saw": 0.062, "alert-signal": 0.105, "music": 0.007, "human-voice": 0.353, "dog": 0.004, "silencio": 0.284}, {"id": 10, "n": 380, "bairro": "Manhattan", "engine": 0.376, "machinery-impact": 0.032, "non-machinery-impact": 0.071, "powered-saw": 0.005, "alert-signal": 0.326, "music": 0.05, "human-voice": 0.237, "dog": 0.005, "silencio": 0.211}, {"id": 11, "n": 332, "bairro": "Manhattan", "engine": 0.304, "machinery-impact": 0.048, "non-machinery-impact": 0.054, "powered-saw": 0.075, "alert-signal": 0.157, "music": 0.03, "human-voice": 0.274, "dog": 0.003, "silencio": 0.238}, {"id": 13, "n": 349, "bairro": "Manhattan", "engine": 0.186, "machinery-impact": 0.072, "non-machinery-impact": 0.023, "powered-saw": 0.017, "alert-signal": 0.189, "music": 0.037, "human-voice": 0.295, "dog": 0.0, "silencio": 0.295}, {"id": 14, "n": 155, "bairro": "Brooklyn", "engine": 0.065, "machinery-impact": 0.019, "non-machinery-impact": 0.032, "powered-saw": 0.013, "alert-signal": 0.097, "music": 0.045, "human-voice": 0.29, "dog": 0.013, "silencio": 0.477}, {"id": 16, "n": 607, "bairro": "Manhattan", "engine": 0.405, "machinery-impact": 0.015, "non-machinery-impact": 0.02, "powered-saw": 0.013, "alert-signal": 0.214, "music": 0.015, "human-voice": 0.17, "dog": 0.005, "silencio": 0.295}, {"id": 17, "n": 249, "bairro": "Manhattan", "engine": 0.221, "machinery-impact": 0.076, "non-machinery-impact": 0.056, "powered-saw": 0.104, "alert-signal": 0.145, "music": 0.016, "human-voice": 0.265, "dog": 0.0, "silencio": 0.285}, {"id": 18, "n": 425, "bairro": "Manhattan", "engine": 0.219, "machinery-impact": 0.026, "non-machinery-impact": 0.049, "powered-saw": 0.028, "alert-signal": 0.144, "music": 0.007, "human-voice": 0.329, "dog": 0.002, "silencio": 0.346}, {"id": 19, "n": 341, "bairro": "Manhattan", "engine": 0.358, "machinery-impact": 0.021, "non-machinery-impact": 0.006, "powered-saw": 0.012, "alert-signal": 0.199, "music": 0.018, "human-voice": 0.367, "dog": 0.006, "silencio": 0.214}, {"id": 20, "n": 330, "bairro": "Manhattan", "engine": 0.512, "machinery-impact": 0.018, "non-machinery-impact": 0.015, "powered-saw": 0.003, "alert-signal": 0.176, "music": 0.027, "human-voice": 0.07, "dog": 0.006, "silencio": 0.294}, {"id": 22, "n": 190, "bairro": "Manhattan", "engine": 0.258, "machinery-impact": 0.058, "non-machinery-impact": 0.079, "powered-saw": 0.042, "alert-signal": 0.153, "music": 0.026, "human-voice": 0.158, "dog": 0.0, "silencio": 0.363}, {"id": 23, "n": 334, "bairro": "Manhattan", "engine": 0.38, "machinery-impact": 0.042, "non-machinery-impact": 0.027, "powered-saw": 0.015, "alert-signal": 0.129, "music": 0.006, "human-voice": 0.108, "dog": 0.003, "silencio": 0.362}, {"id": 24, "n": 527, "bairro": "Manhattan", "engine": 0.222, "machinery-impact": 0.015, "non-machinery-impact": 0.032, "powered-saw": 0.017, "alert-signal": 0.112, "music": 0.14, "human-voice": 0.258, "dog": 0.017, "silencio": 0.362}, {"id": 25, "n": 415, "bairro": "Manhattan", "engine": 0.376, "machinery-impact": 0.094, "non-machinery-impact": 0.029, "powered-saw": 0.014, "alert-signal": 0.173, "music": 0.019, "human-voice": 0.272, "dog": 0.0, "silencio": 0.243}, {"id": 27, "n": 1159, "bairro": "Manhattan", "engine": 0.169, "machinery-impact": 0.102, "non-machinery-impact": 0.017, "powered-saw": 0.164, "alert-signal": 0.104, "music": 0.047, "human-voice": 0.322, "dog": 0.003, "silencio": 0.24}, {"id": 28, "n": 110, "bairro": "Manhattan", "engine": 0.518, "machinery-impact": 0.009, "non-machinery-impact": 0.027, "powered-saw": 0.0, "alert-signal": 0.364, "music": 0.036, "human-voice": 0.091, "dog": 0.0, "silencio": 0.191}, {"id": 29, "n": 623, "bairro": "Manhattan", "engine": 0.157, "machinery-impact": 0.034, "non-machinery-impact": 0.048, "powered-saw": 0.112, "alert-signal": 0.157, "music": 0.112, "human-voice": 0.287, "dog": 0.008, "silencio": 0.271}, {"id": 30, "n": 139, "bairro": "Manhattan", "engine": 0.741, "machinery-impact": 0.007, "non-machinery-impact": 0.036, "powered-saw": 0.0, "alert-signal": 0.158, "music": 0.0, "human-voice": 0.101, "dog": 0.0, "silencio": 0.137}, {"id": 31, "n": 641, "bairro": "Manhattan", "engine": 0.153, "machinery-impact": 0.098, "non-machinery-impact": 0.022, "powered-saw": 0.067, "alert-signal": 0.109, "music": 0.098, "human-voice": 0.148, "dog": 0.264, "silencio": 0.212}, {"id": 32, "n": 580, "bairro": "Manhattan", "engine": 0.216, "machinery-impact": 0.041, "non-machinery-impact": 0.029, "powered-saw": 0.009, "alert-signal": 0.212, "music": 0.052, "human-voice": 0.395, "dog": 0.0, "silencio": 0.259}, {"id": 33, "n": 250, "bairro": "Manhattan", "engine": 0.448, "machinery-impact": 0.036, "non-machinery-impact": 0.016, "powered-saw": 0.028, "alert-signal": 0.172, "music": 0.016, "human-voice": 0.088, "dog": 0.0, "silencio": 0.304}, {"id": 34, "n": 550, "bairro": "Manhattan", "engine": 0.398, "machinery-impact": 0.065, "non-machinery-impact": 0.007, "powered-saw": 0.013, "alert-signal": 0.24, "music": 0.011, "human-voice": 0.198, "dog": 0.0, "silencio": 0.235}, {"id": 35, "n": 382, "bairro": "Manhattan", "engine": 0.144, "machinery-impact": 0.047, "non-machinery-impact": 0.031, "powered-saw": 0.099, "alert-signal": 0.107, "music": 0.058, "human-voice": 0.338, "dog": 0.0, "silencio": 0.293}, {"id": 36, "n": 156, "bairro": "Brooklyn", "engine": 0.109, "machinery-impact": 0.019, "non-machinery-impact": 0.013, "powered-saw": 0.013, "alert-signal": 0.109, "music": 0.045, "human-voice": 0.532, "dog": 0.0, "silencio": 0.282}, {"id": 37, "n": 535, "bairro": "Manhattan", "engine": 0.172, "machinery-impact": 0.077, "non-machinery-impact": 0.024, "powered-saw": 0.118, "alert-signal": 0.174, "music": 0.011, "human-voice": 0.196, "dog": 0.002, "silencio": 0.333}, {"id": 38, "n": 424, "bairro": "Manhattan", "engine": 0.215, "machinery-impact": 0.087, "non-machinery-impact": 0.021, "powered-saw": 0.073, "alert-signal": 0.248, "music": 0.05, "human-voice": 0.323, "dog": 0.012, "silencio": 0.212}, {"id": 39, "n": 141, "bairro": "Manhattan", "engine": 0.305, "machinery-impact": 0.092, "non-machinery-impact": 0.035, "powered-saw": 0.035, "alert-signal": 0.17, "music": 0.0, "human-voice": 0.163, "dog": 0.0, "silencio": 0.333}, {"id": 40, "n": 1346, "bairro": "Manhattan", "engine": 0.278, "machinery-impact": 0.179, "non-machinery-impact": 0.028, "powered-saw": 0.008, "alert-signal": 0.123, "music": 0.014, "human-voice": 0.05, "dog": 0.001, "silencio": 0.424}, {"id": 41, "n": 433, "bairro": "Manhattan", "engine": 0.242, "machinery-impact": 0.06, "non-machinery-impact": 0.035, "powered-saw": 0.028, "alert-signal": 0.215, "music": 0.051, "human-voice": 0.397, "dog": 0.007, "silencio": 0.21}, {"id": 46, "n": 153, "bairro": "Manhattan", "engine": 0.268, "machinery-impact": 0.007, "non-machinery-impact": 0.007, "powered-saw": 0.0, "alert-signal": 0.17, "music": 0.013, "human-voice": 0.706, "dog": 0.0, "silencio": 0.137}], "n": 18510};
const GRUPOS = {'engine':'motor','machinery-impact':'obra (britadeira)','non-machinery-impact':'batidas','powered-saw':'serra','alert-signal':'buzina, sirene, bipe','music':'música','human-voice':'voz','dog':'cachorro'};
const NS = 'http://www.w3.org/2000/svg';
const el = (n, a = {}, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
const pct = v => (v * 100).toLocaleString('pt-BR', {maximumFractionDigits: 1}) + '%';

function legenda(id) {
  const box = document.getElementById(id);
  for (const g in GRUPOS) box.insertAdjacentHTML('beforeend', `<span><b style="background:var(--c-${g})"></b>${GRUPOS[g]}</span>`);
}
legenda('legenda'); legenda('legenda2');

// Partitura
const L = D.linhas, ESQ = 210, CEL = 26, TOPO = 14, ALT = 30, W = ESQ + 24 * CEL + 10;
const H = TOPO + L.length * ALT + 70;
const svg = document.getElementById('partitura');
svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', W); svg.setAttribute('class', 'partitura'); svg.style.maxWidth = 'none';
const cabeca = el('rect', {x: ESQ, y: 0, width: CEL, height: TOPO + L.length * ALT, fill: 'var(--mark)', opacity: 0, rx: 6}, svg);
L.forEach((l, i) => {
  const y = TOPO + i * ALT + ALT / 2;
  el('line', {x1: ESQ - 6, x2: ESQ + 24 * CEL, y1: y, y2: y, stroke: 'var(--line)', 'stroke-width': 1}, svg);
  const t = el('text', {x: ESQ - 12, y: y + 4, 'text-anchor': 'end', 'font-size': 12.5}, svg); t.textContent = l.nome;
  const mx = Math.max(...l.taxa);
  l.taxa.forEach((v, h) => {
    const r = 1.5 + 10.5 * Math.sqrt(v / mx);
    const c = el('circle', {cx: ESQ + h * CEL + CEL / 2, cy: y, r, fill: `var(--c-${l.grupo})`, stroke: 'var(--ink)', 'stroke-width': v === mx ? 1.8 : 0}, svg);
    el('title', {}, c).textContent = `${l.nome}, ${h}h: ${pct(v)} das gravações`;
  });
});
// faixa de silêncio
const yS = TOPO + L.length * ALT + 8, hS = 28;
const ts = el('text', {x: ESQ - 12, y: yS + 18, 'text-anchor': 'end', 'font-size': 12.5}, svg); ts.textContent = 'silêncio (nenhum som)';
const maxS = Math.max(...D.silencio);
D.silencio.forEach((v, h) => {
  const hh = hS * v / maxS;
  const r = el('rect', {x: ESQ + h * CEL + 4, y: yS + hS - hh, width: CEL - 8, height: hh, rx: 3, fill: 'var(--c-silencio)', stroke: 'var(--ink)', 'stroke-width': 1}, svg);
  el('title', {}, r).textContent = `${h}h: ${pct(v)} das gravações sem nenhum dos sons`;
});
for (let h = 0; h < 24; h += 1) {
  const t = el('text', {x: ESQ + h * CEL + CEL / 2, y: yS + hS + 22, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--ink-2)'}, svg);
  t.textContent = h % 3 === 0 ? h + 'h' : '·';
}

// Sonificação: cada linha é uma nota de uma escala pentatônica (graves em cima)
const NOTAS = [98, 110, 130.8, 146.8, 164.8, 196, 220, 261.6, 293.7, 329.6, 392, 440, 523.3, 587.3];
let ctx = null, tocando = false, timers = [];
const botao = document.getElementById('tocar'), estado = document.getElementById('estado');
function parar() {
  timers.forEach(clearTimeout); timers = []; tocando = false;
  cabeca.setAttribute('opacity', 0); botao.textContent = '▶ Ouvir a partitura';
  estado.textContent = '24 horas em 12 segundos. Sons graves são motores; agudos são vozes e sirenes.';
}
botao.addEventListener('click', () => {
  if (tocando) { parar(); return; }
  try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume(); }
  catch (e) { estado.textContent = 'Este navegador não deixou tocar som.'; return; }
  tocando = true; botao.textContent = '■ Parar';
  const PASSO = 0.5;
  for (let h = 0; h < 24; h++) {
    timers.push(setTimeout(() => {
      cabeca.setAttribute('x', ESQ + h * CEL); cabeca.setAttribute('opacity', 0.55);
      estado.textContent = `${h}h`;
      const t0 = ctx.currentTime;
      L.forEach((l, i) => {
        const v = l.taxa[h] / Math.max(...l.taxa);
        if (v < 0.15) return;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = i < 3 ? 'triangle' : 'sine'; o.frequency.value = NOTAS[i];
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.06 * v * v, t0 + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + PASSO * 0.95);
        o.connect(g).connect(ctx.destination); o.start(t0); o.stop(t0 + PASSO);
      });
    }, h * PASSO * 1000));
  }
  timers.push(setTimeout(parar, 24 * PASSO * 1000 + 300));
});

// Retratos (flores)
const ORD = Object.keys(GRUPOS), DEST = new Set([1, 5, 14, 30, 46]);
const box = document.getElementById('retratos');
D.sensores.forEach(s => {
  const d = document.createElement('div'); d.className = 'retrato' + (DEST.has(s.id) ? ' destaque' : '');
  const f = el('svg', {viewBox: '-50 -50 100 100', width: 96, height: 96, role: 'img', 'aria-label': `sensor ${s.id}`});
  ORD.forEach((g, k) => {
    const a = (k / ORD.length) * 2 * Math.PI - Math.PI / 2, comp = 8 + 38 * Math.sqrt(Math.min(s[g], 0.75) / 0.75);
    const x = Math.cos(a) * comp, y = Math.sin(a) * comp, nx = Math.cos(a + Math.PI / 2) * 9, ny = Math.sin(a + Math.PI / 2) * 9;
    const p = el('path', {d: `M0 0 Q${x / 2 + nx} ${y / 2 + ny} ${x} ${y} Q${x / 2 - nx} ${y / 2 - ny} 0 0Z`, fill: `var(--c-${g})`, stroke: 'var(--ink)', 'stroke-width': 1}, f);
    el('title', {}, p).textContent = `${GRUPOS[g]}: ${pct(s[g])}`;
  });
  const m = el('circle', {r: 3 + 9 * s.silencio, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 1.5}, f);
  el('title', {}, m).textContent = `sem nenhum som: ${pct(s.silencio)}`;
  d.appendChild(f);
  d.insertAdjacentHTML('beforeend', `<strong>sensor ${s.id}</strong><span>${s.bairro} · ${s.n.toLocaleString('pt-BR')}</span>`);
  box.appendChild(d);
});


document.getElementById('theme-btn').addEventListener('click', () => {
  const root = document.documentElement;
  const escuro = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.theme = escuro ? 'light' : 'dark';
  try { localStorage.setItem('iapraprof:theme', JSON.stringify(root.dataset.theme)); } catch (e) {}
});
})();
