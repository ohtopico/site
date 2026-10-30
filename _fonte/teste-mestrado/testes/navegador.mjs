// Abre o site no Chromium sem tela, com câmera falsa e voz simulada:
//   window.__falas  tudo o que o site falou (speechSynthesis)
//   window.__ouvir(frase)  responde ao próximo reconhecimento de voz como se a pessoa tivesse dito a frase
import { chromium } from "playwright";
import { servir } from "./servidor.mjs";

function simularVoz() {
  window.__falas = [];
  const fala = {
    speaking: false, pending: false, paused: false,
    speak(u) {
      window.__falas.push(u.text);
      setTimeout(() => { u.onstart?.(); u.onend?.(); u.dispatchEvent?.(new Event("end")); }, 5);
    },
    cancel() {}, pause() {}, resume() {},
    getVoices: () => [], // SpeechSynthesisVoice não pode ser criada à mão; sem vozes, o site usa a padrão
    addEventListener() {}, removeEventListener() {}, onvoiceschanged: null,
  };
  Object.defineProperty(window, "speechSynthesis", { value: fala, configurable: true });

  let ativo = null;
  class Reconhecimento {
    start() { ativo = this; window.__ouvindo = true; }
    stop() { this.onend?.(); }
    abort() { this.onend?.(); }
  }
  window.SpeechRecognition = window.webkitSpeechRecognition = Reconhecimento;
  window.__ouvir = frase => {
    const r = ativo;
    ativo = null;
    window.__ouvindo = false;
    if (!r) return false;
    const resultado = [{ transcript: frase, confidence: 0.9 }];
    r.onresult?.({ results: [resultado] });
    r.onend?.();
    return true;
  };
}

/** Abre a página; devolve { pagina, erros, fechar }. erros junta exceções e console.error da página. */
export async function abrir({ esquema = "light", largura = 390, altura = 844, url = "" } = {}) {
  const servidor = await servir();
  const navegador = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--autoplay-policy=no-user-gesture-required"],
  });
  const contexto = await navegador.newContext({
    viewport: { width: largura, height: altura }, deviceScaleFactor: 1, colorScheme: esquema, locale: "pt-BR",
    permissions: ["camera", "microphone"], serviceWorkers: "block",
  });
  // Nada sai para a internet (fontes do Google, OpenStreetMap, API): o teste roda igual sem rede
  await contexto.route(r => !r.href.startsWith(servidor.url.replace(/teste-mestrado\/$/, "")), r => r.abort());
  await contexto.addInitScript(simularVoz);
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(`exceção: ${e.message}`));
  pagina.on("console", m => {
    // Recursos externos bloqueados acima geram erro de rede no console; esses não contam
    if (m.type() === "error" && !/net::ERR_FAILED|Failed to load resource/.test(m.text())) erros.push(`console: ${m.text()}`);
  });
  await pagina.goto(servidor.url + url, { waitUntil: "load" });
  return {
    pagina, erros,
    fechar: async () => { await navegador.close(); await servidor.fechar(); },
  };
}

/** Espera o site falar algo que case com o padrão (procura só a partir de `desde`). */
export async function esperarFala(pagina, padrao, { desde = 0, tempo = 15000 } = {}) {
  await pagina.waitForFunction(([fonte, flags, i]) => window.__falas.slice(i).some(f => new RegExp(fonte, flags).test(f)),
    [padrao.source, padrao.flags, desde], { timeout: tempo });
  return pagina.evaluate(([fonte, flags, i]) => window.__falas.slice(i).find(f => new RegExp(fonte, flags).test(f)),
    [padrao.source, padrao.flags, desde]);
}

/** Toca na tela de uso e "fala" a frase; devolve a primeira fala nova que case com o padrão. */
export async function pedir(pagina, frase, padrao) {
  const desde = await pagina.evaluate(() => window.__falas.length);
  await pagina.click("#pausar");
  await pagina.waitForFunction(() => window.__ouvindo === true);
  await pagina.evaluate(f => window.__ouvir(f), frase);
  return esperarFala(pagina, padrao, { desde });
}
