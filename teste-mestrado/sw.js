// Guarda o site no celular para abrir rápido (e funcionar sem internet, menos a IA na nuvem e o mapa).
// Modelos e bibliotecas (pesados): usa a cópia guardada na hora e confere se há versão nova em segundo plano,
// que vale na próxima abertura. Páginas e código (leves): busca na internet primeiro, para as atualizações
// chegarem logo; sem internet, usa a cópia guardada.

const CACHE = "assistencia-v1";
const PESADO = /\/(modelos|vendor)\//;

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(
  caches.keys()
    .then(nomes => Promise.all(nomes.filter(n => n.startsWith("assistencia-") && n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()),
));

async function guardar(pedido, resposta) {
  if (resposta.ok && resposta.status === 200) {
    const cache = await caches.open(CACHE);
    await cache.put(pedido, resposta.clone());
  }
  return resposta;
}

self.addEventListener("fetch", e => {
  const pedido = e.request;
  const url = new URL(pedido.url);
  if (pedido.method !== "GET" || url.origin !== location.origin || pedido.headers.has("range")) return;
  if (PESADO.test(url.pathname)) {
    e.respondWith(caches.match(pedido).then(guardada => {
      const nova = fetch(pedido).then(r => guardar(pedido, r));
      if (guardada) { e.waitUntil(nova.catch(() => {})); return guardada; }
      return nova;
    }));
  } else {
    e.respondWith(fetch(pedido).then(r => guardar(pedido, r)).catch(() => caches.match(pedido).then(r => r ?? Response.error())));
  }
});
