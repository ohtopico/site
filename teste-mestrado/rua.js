// Rua: GPS + OpenStreetMap, tudo falado, sem abrir outro app.
//   "que prédio é esse"        -> lugares com nome perto, na direção para onde a pessoa está virada
//   "onde fica a reitoria"     -> direção e distância até o lugar
//   "me leva até a reitoria"   -> rota a pé com instruções faladas, acompanhando o GPS
// Serviços públicos e gratuitos, sem chave: Overpass (lugares perto), Nominatim (busca por nome)
// e o servidor de rotas a pé do OpenStreetMap (OSRM).

import { diferenca } from "./percursos.js";

const OVERPASS = "https://overpass-api.de/api/interpreter";
const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const ROTAS = "https://routing.openstreetmap.de/routed-foot/route/v1/foot/";

const RAIO_PERTO_M = 150;       // "que prédio é esse" olha até essa distância
const FRENTE_GRAUS = 35;        // até isso para cada lado conta como "à frente"
const AVISO_ANTES_M = 40;       // "em 40 metros, vire à direita"
const NA_CURVA_M = 12;          // chegou na curva: fala a instrução
const CHEGOU_M = 15;
const FORA_DA_ROTA_M = 35;
const RECALCULAR_ESPERA_MS = 30000;
const LEMBRETE_MS = 60000;      // de tempos em tempos: quanto falta
const GPS_FRACO_M = 40;

// ---------- Geometria ----------------------------------------------------------------

const rad = g => (g * Math.PI) / 180;

/** Distância em metros entre dois pontos {lat, lon}. */
export function distanciaM(a, b) {
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371000 * Math.asin(Math.sqrt(h));
}

/** Rumo de a para b em graus (0 = norte, 90 = leste). */
export function rumoEntre(a, b) {
  const y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat));
  const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/** "à frente", "à direita", "atrás"... pelo rumo da pessoa; sem bússola, pelos pontos cardeais. */
export function direcaoFalada(rumoPessoa, rumoAlvo) {
  if (rumoPessoa == null) {
    const nomes = ["ao norte", "a nordeste", "a leste", "a sudeste", "ao sul", "a sudoeste", "a oeste", "a noroeste"];
    return nomes[Math.round(rumoAlvo / 45) % 8];
  }
  const d = diferenca(rumoPessoa, rumoAlvo);
  const a = Math.abs(d);
  if (a <= FRENTE_GRAUS) return "à sua frente";
  if (a >= 150) return "atrás de você";
  const lado = d > 0 ? "direita" : "esquerda";
  return a < 70 ? `à frente, um pouco à ${lado}` : a <= 110 ? `à sua ${lado}` : `atrás, à ${lado}`;
}

/** "a 30 metros", "a 1,2 quilômetro". */
export function metrosFalados(m) {
  if (m < 1000) {
    const r = m < 100 ? Math.max(5, Math.round(m / 5) * 5) : Math.round(m / 10) * 10;
    return `${r} metros`;
  }
  const km = Math.round(m / 100) / 10;
  return `${String(km).replace(".", ",")} ${km < 2 ? "quilômetro" : "quilômetros"}`;
}

// ---------- GPS ----------------------------------------------------------------------

export function posicaoAtual(timeout = 15000) {
  return new Promise((ok, erro) => {
    if (!navigator.geolocation) return erro(new Error("sem GPS"));
    navigator.geolocation.getCurrentPosition(
      p => ok({ lat: p.coords.latitude, lon: p.coords.longitude, precisao: p.coords.accuracy }),
      erro, { enableHighAccuracy: true, timeout, maximumAge: 5000 });
  });
}

export const erroGps = e => (e?.code === 1
  ? "Sem permissão de localização. Libere a localização para este site nas configurações do navegador."
  : "Não consegui achar sua posição pelo GPS. Tente de novo em um lugar aberto.");

// ---------- Consultas ao mapa ----------------------------------------------------------

async function pedirJson(url, opcoes) {
  const r = await fetch(url, opcoes);
  if (!r.ok) throw new Error(`mapa respondeu ${r.status}`);
  return r.json();
}

/** Lugares com nome perto (prédios, lojas, serviços), do mais perto para o mais longe. */
export async function lugaresPerto(pos, raio = RAIO_PERTO_M) {
  const em = `(around:${raio},${pos.lat},${pos.lon})`;
  const consulta = `[out:json][timeout:15];(` +
    ["building", "amenity", "shop", "office", "tourism", "leisure", "healthcare"]
      .map(t => `nwr${em}[name][${t}];`).join("") + `);out center tags 80;`;
  const dados = await pedirJson(OVERPASS, { method: "POST", body: "data=" + encodeURIComponent(consulta),
    headers: { "Content-Type": "application/x-www-form-urlencoded" } });
  return lugaresDoOverpass(dados, pos);
}

export function lugaresDoOverpass(dados, pos) {
  const vistos = new Set();
  return (dados.elements || [])
    .map(e => ({ nome: e.tags?.name, lat: e.lat ?? e.center?.lat, lon: e.lon ?? e.center?.lon }))
    .filter(l => l.nome && l.lat != null && !vistos.has(l.nome) && vistos.add(l.nome))
    .map(l => ({ ...l, distancia: distanciaM(pos, l), rumo: rumoEntre(pos, l) }))
    .sort((a, b) => a.distancia - b.distancia);
}

/** Frase com o que está à frente (até 2) e o mais perto dos lados. */
export function descreverPerto(lugares, rumoPessoa) {
  if (!lugares.length) return "Não achei prédios nem lugares com nome aqui perto no mapa.";
  const fala = l => `${l.nome}, ${direcaoFalada(rumoPessoa, l.rumo)}, a ${metrosFalados(l.distancia)}`;
  if (rumoPessoa == null) return `Perto de você: ${lugares.slice(0, 3).map(fala).join("; ")}.`;
  const frente = lugares.filter(l => Math.abs(diferenca(rumoPessoa, l.rumo)) <= FRENTE_GRAUS).slice(0, 2);
  const outros = lugares.filter(l => !frente.includes(l)).slice(0, frente.length ? 1 : 3);
  return [...frente, ...outros].map(fala).join(". ") + ".";
}

/** Procura um lugar pelo nome, primeiro perto da pessoa (uns 5 km), depois no Brasil todo. */
export async function buscarLugar(texto, pos) {
  const base = `${NOMINATIM}?format=jsonv2&limit=1&accept-language=pt-BR&countrycodes=br&q=${encodeURIComponent(texto)}`;
  const caixa = pos ? `&viewbox=${pos.lon - 0.05},${pos.lat + 0.05},${pos.lon + 0.05},${pos.lat - 0.05}&bounded=1` : "";
  let r = pos ? await pedirJson(base + caixa) : [];
  if (!r.length) r = await pedirJson(base);
  if (!r.length) return null;
  return { nome: r[0].name || texto, lat: +r[0].lat, lon: +r[0].lon };
}

/** Rota a pé: lista de manobras {lat, lon, instrucao} e os pontos da linha (para saber se saiu da rota). */
export async function rotaAPe(de, para) {
  const dados = await pedirJson(`${ROTAS}${de.lon},${de.lat};${para.lon},${para.lat}` +
    "?steps=true&overview=full&geometries=geojson");
  return rotaDoOsrm(dados);
}

export function rotaDoOsrm(dados) {
  const rota = dados.routes?.[0];
  if (!rota) return null;
  const passos = rota.legs[0].steps.map(s => ({
    lat: s.maneuver.location[1], lon: s.maneuver.location[0],
    tipo: s.maneuver.type, rumoDepois: s.maneuver.bearing_after,
    instrucao: instrucaoFalada(s), distancia: s.distance,
  }));
  const linha = rota.geometry.coordinates.map(([lon, lat]) => ({ lat, lon }));
  return { passos, linha, distancia: rota.distance };
}

const LADOS = {
  left: "vire à esquerda", right: "vire à direita", "slight left": "vire levemente à esquerda",
  "slight right": "vire levemente à direita", "sharp left": "vire bem à esquerda", "sharp right": "vire bem à direita",
  straight: "siga em frente", uturn: "dê meia-volta",
};

export function instrucaoFalada(s) {
  const { type, modifier, exit } = s.maneuver;
  const rua = s.name ? ` pela ${s.name}` : "";
  if (type === "arrive") return "Você chegou";
  if (type === "depart") return `Siga${rua}`;
  if (type === "roundabout" || type === "rotary") return `Na rotatória, pegue a ${exit ?? 1}ª saída${rua}`;
  const acao = LADOS[modifier] ?? "siga em frente";
  if (type === "new name" || type === "continue") return `${acao === "siga em frente" ? "Continue em frente" : acao[0].toUpperCase() + acao.slice(1)}${rua}`;
  return `${acao[0].toUpperCase() + acao.slice(1)}${rua}`;
}

// ---------- Navegação (tarefa) ----------------------------------------------------------

/**
 * Guia a pé até o destino. Funciona como as outras tarefas: aoQuadro é chamado pelo laço da câmera
 * (que continua avisando paredes e obstáculos à frente) e devolve false quando termina.
 */
export class NavegarRua {
  constructor(anunciador, sensores, destino, rota, inicio) {
    Object.assign(this, { a: anunciador, sensores, destino, rota });
    this.proximo = 1; // passos[0] é a partida
    this.avisado = new Set();
    this.ultimoLembrete = performance.now();
    this.ultimoRecalculo = 0;
    this.foraDaRota = 0;
    this.fim = false;
    this.pos = inicio;
    const p0 = rota.passos[0];
    const virar = sensores.rumo != null && p0.rumoDepois != null ? direcaoFalada(sensores.rumo, p0.rumoDepois) : null;
    const comeco = virar && virar !== "à sua frente" ? `O caminho começa ${virar}. Vire até ele ficar à sua frente. ` : "";
    this.a.falar(`Caminho até ${destino.nome}: ${metrosFalados(rota.distancia)}. ${comeco}${p0.instrucao}.`, true);
    this.vigia = navigator.geolocation.watchPosition(p => this.aoMover({
      lat: p.coords.latitude, lon: p.coords.longitude, precisao: p.coords.accuracy }),
    () => this.a.falarUmaVez("Perdi o sinal do GPS.", 30000), { enableHighAccuracy: true, maximumAge: 2000 });
  }

  aoMover(pos) {
    if (this.fim) return;
    this.pos = pos;
    if (pos.precisao > GPS_FRACO_M) this.a.falarUmaVez("GPS fraco, as distâncias podem estar erradas.", 60000);
    const passos = this.rota.passos;
    const alvo = passos[this.proximo];
    if (!alvo) return;
    const ate = distanciaM(pos, alvo);
    const falta = distanciaM(pos, this.destino);

    if (alvo.tipo === "arrive" || falta < CHEGOU_M) {
      if (falta < CHEGOU_M + Math.min(pos.precisao, 20)) {
        this.a.falar(`Você chegou a ${this.destino.nome}.`, true);
        this.a.vibrar([300]);
        this.cancelar();
        return;
      }
    } else if (ate < NA_CURVA_M) {
      this.a.vibrar([150]);
      this.a.falar(`${alvo.instrucao}.`, true);
      this.proximo++;
      return;
    } else if (ate < AVISO_ANTES_M && !this.avisado.has(this.proximo)) {
      this.avisado.add(this.proximo);
      this.a.falar(`Em ${metrosFalados(ate)}, ${alvo.instrucao.toLowerCase()}.`, true);
      return;
    }

    // Saiu da rota: recalcula (no máximo a cada 30 s)
    const longe = Math.min(...this.rota.linha.map(p => distanciaM(pos, p)));
    this.foraDaRota = longe > FORA_DA_ROTA_M + Math.min(pos.precisao, 30) ? this.foraDaRota + 1 : 0;
    const agora = performance.now();
    if (this.foraDaRota >= 3 && agora - this.ultimoRecalculo > RECALCULAR_ESPERA_MS) {
      this.ultimoRecalculo = agora;
      this.recalcular(pos);
      return;
    }
    if (agora - this.ultimoLembrete > LEMBRETE_MS) {
      this.ultimoLembrete = agora;
      this.a.falarUmaVez(`Faltam ${metrosFalados(falta)} até ${this.destino.nome}.`, 0, false, "rua|falta");
    }
  }

  async recalcular(pos) {
    this.a.falar("Você saiu do caminho. Recalculando.", true);
    try {
      const rota = await rotaAPe(pos, this.destino);
      if (!rota || this.fim) return;
      this.rota = rota;
      this.proximo = 1;
      this.avisado.clear();
      this.foraDaRota = 0;
      const p0 = rota.passos[0];
      const virar = this.sensores.rumo != null && p0.rumoDepois != null ? direcaoFalada(this.sensores.rumo, p0.rumoDepois) : "";
      this.a.falar(`Novo caminho: ${metrosFalados(rota.distancia)}. ${virar && virar !== "à sua frente" ? `Começa ${virar}. ` : ""}${p0.instrucao}.`, true);
    } catch {
      this.a.falar("Não consegui recalcular o caminho. Verifique a internet.", true);
    }
  }

  /** Quanto falta e para onde, quando a pessoa pergunta durante o caminho. */
  situacao() {
    const alvo = this.rota.passos[this.proximo];
    const falta = metrosFalados(distanciaM(this.pos, this.destino));
    if (!alvo || alvo.tipo === "arrive") return `Faltam ${falta} até ${this.destino.nome}.`;
    return `Em ${metrosFalados(distanciaM(this.pos, alvo))}, ${alvo.instrucao.toLowerCase()}. Faltam ${falta} no total.`;
  }

  aoQuadro() {
    return !this.fim;
  }

  cancelar() {
    this.fim = true;
    navigator.geolocation.clearWatch(this.vigia);
  }
}
