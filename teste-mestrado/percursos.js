// Gravar e repetir percursos dentro de prédios, onde o GPS não serve.
// Um percurso é uma lista de trechos: virar (ou não) e andar N passos, com os objetos vistos no caminho.
// Passos vêm do acelerômetro e a direção da bússola do celular; os dois são aproximados,
// então o site fala "cerca de" e usa os objetos vistos como confirmação.

import { normalizar, nomeFalado } from "./vocabulario.js";

const CHAVE = "assistencia.percursos";
const CURVA_GRAUS = 50;        // mudança de rumo que conta como curva
const CURVA_ESTAVEL_MS = 1500; // a nova direção precisa se manter esse tempo
// Passo = pico da aceleração vertical (na direção da gravidade, sem ela). Com o celular junto ao
// peito o balanço é pequeno, então o limiar é baixo; o intervalo mínimo evita contar a mesma pisada duas vezes.
const PASSO_LIMIAR = 0.9;      // m/s² para cima do repouso
const PASSO_SOLTA = 0;         // precisa voltar a descer antes do próximo passo
const PASSO_INTERVALO_MS = 280;

// ---------- Sensores ----------------------------------------------------------------

/** Contador de passos e bússola. iPhone exige pedir permissão num toque (chamar pedirPermissao no clique). */
export class Sensores {
  constructor() {
    this.passos = 0;
    this.rumo = null; // graus, 0 = norte
    this.ultimoPasso = 0;
    this.acimaDoLimiar = false;
    this.filtrado = 0;
    this.gravidade = null;
    this.ultimoMovimento = 0; // última vez que o sensor de movimento mandou dados
  }

  /** O navegador está mandando dados de movimento? (no Android pode estar bloqueado nas permissões do site) */
  get movimentoOk() { return performance.now() - this.ultimoMovimento < 2000; }

  static async pedirPermissao() {
    for (const Evento of [window.DeviceMotionEvent, window.DeviceOrientationEvent]) {
      if (typeof Evento?.requestPermission === "function") {
        try { await Evento.requestPermission(); } catch {}
      }
    }
  }

  ligar() {
    addEventListener("devicemotion", e => {
      const a = e.accelerationIncludingGravity;
      if (!a || a.x == null) return;
      const agora = performance.now();
      this.ultimoMovimento = agora;
      // Gravidade estimada por média lenta; o que sobra, projetado na vertical, é o sobe e desce do corpo
      const g = this.gravidade ??= { x: a.x, y: a.y, z: a.z };
      g.x = 0.95 * g.x + 0.05 * a.x; g.y = 0.95 * g.y + 0.05 * a.y; g.z = 0.95 * g.z + 0.05 * a.z;
      const ng = Math.hypot(g.x, g.y, g.z) || 1;
      const vertical = ((a.x - g.x) * g.x + (a.y - g.y) * g.y + (a.z - g.z) * g.z) / ng;
      this.filtrado = 0.6 * this.filtrado + 0.4 * vertical;
      if (!this.acimaDoLimiar && this.filtrado > PASSO_LIMIAR && agora - this.ultimoPasso > PASSO_INTERVALO_MS) {
        this.acimaDoLimiar = true;
        this.ultimoPasso = agora;
        this.passos++;
      } else if (this.acimaDoLimiar && this.filtrado < PASSO_SOLTA) {
        this.acimaDoLimiar = false;
      }
    });
    const orientacao = e => {
      // iPhone dá o rumo pronto; Android dá alpha absoluto (sentido anti-horário)
      const rumo = e.webkitCompassHeading ?? (e.absolute && e.alpha != null ? 360 - e.alpha : null);
      if (rumo != null) this.rumo = rumo;
    };
    addEventListener("deviceorientationabsolute", orientacao);
    addEventListener("deviceorientation", orientacao);
  }

  get disponivel() { return this.rumo != null; }
}

/** Diferença de ângulo em graus, de -180 a 180 (positivo = horário = direita). */
export const diferenca = (de, para) => ((para - de + 540) % 360) - 180;

// ---------- Guardar ------------------------------------------------------------------

export function listar() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; }
}
function salvar(lista) {
  try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch {}
}
/** Acha um percurso pelo nome falado (ignora acentos e artigos). */
export function acharPercurso(nome) {
  const alvo = normalizar(nome).replace(/^(o|a|do|da|de) /, "");
  return listar().find(p => normalizar(p.nome) === alvo)
    ?? listar().find(p => normalizar(p.nome).includes(alvo) || alvo.includes(normalizar(p.nome)));
}
/** Troca o nome de um percurso salvo (o que foi gravado sem nome). */
export function renomear(antigo, novo) {
  const lista = listar();
  const p = lista.find(x => x.nome === antigo);
  if (!p || !novo.trim()) return false;
  const nome = novo.trim();
  salvar([...lista.filter(x => x !== p && normalizar(x.nome) !== normalizar(nome)), { ...p, nome }]);
  return true;
}

export function apagar(nome) {
  const p = acharPercurso(nome);
  if (p) salvar(listar().filter(x => x !== p && x.nome !== p.nome));
  return p;
}

// ---------- Gravar -------------------------------------------------------------------

export class Gravacao {
  constructor(anunciador, sensores, nome) {
    this.a = anunciador;
    this.s = sensores;
    this.semNome = !nome;
    this.nome = nome || `percurso ${listar().length + 1}`;
    this.trechos = [];
    this.novoTrecho(null);
    this.a.falar(`Gravando ${this.semNome ? "o percurso" : this.nome}. Ande normalmente. ` +
      "Quando chegar, toque e diga cheguei, ou terminar gravação.", true);
    if (!sensores.disponivel) this.a.falar("A bússola não respondeu; vou gravar só os passos.");
    this.comeco = performance.now();
    this.passosNoComeco = sensores.passos;
    this.avisouSensor = false;
  }

  /** Avisa uma vez se, depois de alguns segundos, o sensor não manda dados ou nenhum passo foi contado. */
  conferirSensores() {
    if (this.avisouSensor || performance.now() - this.comeco < 8000) return;
    if (!this.s.movimentoOk) {
      this.avisouSensor = true;
      this.a.falar("O sensor de movimento do celular não está respondendo, então não consigo contar passos. " +
        "No Chrome, toque no cadeado ao lado do endereço, abra Permissões e ative Sensores de movimento.", true);
    } else if (this.s.passos === this.passosNoComeco) {
      this.avisouSensor = true;
      this.a.falar("Ainda não contei nenhum passo. Segure o celular firme, junto ao peito, e ande normalmente.", true);
    }
  }

  novoTrecho(virar) {
    this.trecho = { virar, passos: 0, marcos: [] };
    this.trechos.push(this.trecho);
    this.inicioPassos = this.s.passos;
    this.rumoTrecho = this.s.rumo;
    this.candidatoDesde = null;
  }

  /** Chamado a cada quadro, mesmo durante outras tarefas. */
  aoQuadro(deteccoes) {
    this.conferirSensores();
    this.trecho.passos = this.s.passos - this.inicioPassos;
    for (const d of deteccoes) {
      const nome = nomeFalado(d.rotulo);
      if (nome && d.tamanho > 0.25 && !this.trecho.marcos.some(m => m.nome === nome)) {
        this.trecho.marcos.push({ nome, aosPassos: this.trecho.passos });
      }
    }
    if (this.rumoTrecho == null) { this.rumoTrecho = this.s.rumo; return; }
    if (this.s.rumo == null) return;
    const delta = diferenca(this.rumoTrecho, this.s.rumo);
    if (Math.abs(delta) < CURVA_GRAUS) { this.candidatoDesde = null; return; }
    this.candidatoDesde ??= performance.now();
    if (performance.now() - this.candidatoDesde > CURVA_ESTAVEL_MS && this.trecho.passos >= 2) {
      const lado = delta > 0 ? "direita" : "esquerda";
      this.novoTrecho(lado);
      this.a.falar(`Curva à ${lado} anotada.`);
    }
  }

  terminar() {
    this.trecho.passos = this.s.passos - this.inicioPassos;
    const trechos = this.trechos.filter(t => t.passos > 0 || t.virar);
    if (!trechos.length) {
      this.a.falar("Não contei nenhum passo, o percurso não foi salvo.", true);
      return false;
    }
    salvar([...listar().filter(p => normalizar(p.nome) !== normalizar(this.nome)),
      { nome: this.nome, criado: new Date().toISOString(), trechos }]);
    const total = trechos.reduce((n, t) => n + t.passos, 0);
    const curvas = trechos.filter(t => t.virar).length;
    this.a.falar(`Percurso ${this.semNome ? "" : this.nome + " "}salvo: cerca de ${total} passos e ${curvas} ${curvas === 1 ? "curva" : "curvas"}.` +
      (this.semNome ? ` Qual o nome dele? Toque e diga o nome, por exemplo banheiro. Se não disser, fica ${this.nome}.` : ""), true);
    return true;
  }
}

// ---------- Seguir -------------------------------------------------------------------

const inverso = lado => (lado === "direita" ? "esquerda" : "direita");

/** Percurso de volta: dá meia-volta e percorre os trechos ao contrário, com as curvas invertidas. */
function deVolta(trechos) {
  const r = [];
  for (let i = trechos.length - 1; i >= 0; i--) {
    const virar = i === trechos.length - 1 ? "meia-volta" : inverso(trechos[i + 1].virar);
    r.push({ ...trechos[i], virar, marcos: [...trechos[i].marcos].reverse() });
  }
  return r;
}

export class SeguirPercurso {
  constructor(anunciador, sensores, percurso, voltando = false) {
    this.a = anunciador;
    this.s = sensores;
    this.nome = percurso.nome;
    this.trechos = voltando ? deVolta(percurso.trechos) : percurso.trechos;
    this.i = -1;
    this.ativa = true;
    this.a.falar(`${voltando ? "Voltando pelo" : "Seguindo o"} percurso ${this.nome}.`, true);
    this.proximo();
  }

  get descricao() {
    const t = this.trechos[this.i];
    return `Percurso ${this.nome}: trecho ${this.i + 1} de ${this.trechos.length}` +
      (t && !this.virando ? `, ${this.s.passos - this.inicioPassos} de ${t.passos} passos` : "");
  }

  proximo() {
    this.i++;
    const t = this.trechos[this.i];
    if (!t) {
      this.a.falar(`Você chegou ao fim do percurso ${this.nome}.`, true);
      this.ativa = false;
      return;
    }
    this.avisouFalta = false;
    this.marcosAvisados = new Set();
    if (t.virar) {
      this.virando = true;
      this.rumoAntes = this.s.rumo;
      this.inicioVirada = performance.now();
      this.a.falar(t.virar === "meia-volta" ? "Vire-se para trás." : `Vire à ${t.virar}.`, true);
    } else {
      this.andar();
    }
  }

  andar() {
    this.virando = false;
    this.inicioPassos = this.s.passos;
    const t = this.trechos[this.i];
    if (t.passos > 0) this.a.falar(`Siga em frente, cerca de ${t.passos} passos.`);
    else this.proximo();
  }

  aoQuadro(deteccoes) {
    if (!this.ativa) return false;
    const t = this.trechos[this.i];
    if (this.virando) {
      // Considera a curva feita quando o rumo mudou o bastante, ou depois de 6 s sem bússola
      const alvo = t.virar === "meia-volta" ? 150 : 60;
      const girou = this.rumoAntes != null && this.s.rumo != null
        && (t.virar === "meia-volta" ? Math.abs(diferenca(this.rumoAntes, this.s.rumo)) > alvo
          : Math.sign(diferenca(this.rumoAntes, this.s.rumo)) === (t.virar === "direita" ? 1 : -1)
            && Math.abs(diferenca(this.rumoAntes, this.s.rumo)) > alvo);
      if (girou || (this.s.rumo == null && performance.now() - this.inicioVirada > 6000)) {
        this.a.bipe(1200, 0.1);
        this.andar();
      }
      return true;
    }
    const andados = this.s.passos - this.inicioPassos;
    for (const d of deteccoes) {
      const nome = nomeFalado(d.rotulo);
      if (nome && !this.marcosAvisados.has(nome) && t.marcos.some(m => m.nome === nome)) {
        this.marcosAvisados.add(nome);
        this.a.falar(`Passando por ${nome}, como na gravação.`);
      }
    }
    const faltam = t.passos - andados;
    if (!this.avisouFalta && t.passos >= 6 && faltam <= 3 && faltam > 0) {
      this.avisouFalta = true;
      this.a.falar(`Faltam ${faltam} passos.`);
    }
    if (faltam <= 0) this.proximo();
    return this.ativa;
  }

  cancelar() { this.ativa = false; }
}
