/* Mundo do site sem internet: guarda o jogo e o que ele usa na primeira visita.
   Com internet, busca sempre a versão nova (e atualiza a cópia); sem internet, usa a cópia guardada. */
const CACHE = 'mundo-v3';
const ARQUIVOS = ['./', 'index.html', 'mundo.css', 'mundo.js', 'perguntas-npc.js', 'teleporte.js', 'olimpiada.js', 'manifest.webmanifest', 'icone-192.png', 'icone-512.png',
  '../material-didatico/assets/dados.js', '../material-didatico/assets/listas.js', '../material-didatico/assets/progresso.js', '../material-didatico/assets/missoes.js',
  '../simuladores/assets/sim-comum.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('mundo-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request, url = new URL(r.url);
  if (r.method !== 'GET' || url.hostname === 'gc.zgo.at' || url.hostname.endsWith('goatcounter.com')) return;
  const daqui = url.origin === location.origin, fonte = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!daqui && !fonte) return;
  e.respondWith(fetch(r).then(resp => {
    if (resp.ok || resp.type === 'opaque') { const copia = resp.clone(); caches.open(CACHE).then(c => c.put(r, copia)); }
    return resp;
  }).catch(() => caches.match(r, { ignoreSearch: true }).then(c => c || (r.mode === 'navigate' ? caches.match('index.html') : Response.error()))));
});
