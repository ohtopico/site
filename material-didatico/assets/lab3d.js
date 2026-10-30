/* =====================================================================
   Laboratório 3D — base comum dos recursos manipuláveis de Matemática e Computação.
   Usa three.js (assets/vendor, licença MIT) sem dependência de CDN.

   Cada página chama lab3d(elemento, opções) e recebe uma "cena" com:
     bloco(), cilindro(), rotulo(), clicavel(), arrastavel(), animar(),
     descrever() (texto alternativo do canvas), vista() e loop().
   Tudo o que dá para fazer arrastando também precisa ter um botão:
   o canvas não é acessível por teclado ou leitor de tela sozinho.
   ===================================================================== */
import * as THREE from './vendor/three.module.min.js';
import { OrbitControls } from './vendor/OrbitControls.js';

export { THREE };

/* Paleta das peças: verde, amarelo e vermelho (sem azul), com cinzas */
export const COR = {
  verde: '#1f8a4c', verdeClaro: '#9fdab4', verdeEscuro: '#166c40',
  amarelo: '#f2cf1d', amareloClaro: '#fff36b',
  vermelho: '#c8323f', vermelhoClaro: '#f2a9b3',
  cinza: '#c9c9c5', cinzaEscuro: '#6f6f6b', papel: '#fafaf8', tinta: '#111111'
};

const reduzMovimento = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const temaEscuro = () => {
  const t = document.documentElement.getAttribute('data-theme');
  if (t) return t === 'dark';
  return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
};

export function webglOk() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
  catch (e) { return false; }
}

export function lab3d(el, op = {}) {
  const o = Object.assign({ cam: [7, 6, 9], alvo: [0, 0, 0], fov: 38, chao: true, chaoTam: 40, min: 3, max: 40, polarMax: Math.PI * 0.49, ortho: false }, op);

  if (!webglOk()) {
    el.innerHTML = '<p class="lab-sem3d">Este navegador não conseguiu abrir a cena 3D. Os botões e o painel ao lado continuam funcionando, e a atividade também pode ser feita com o material concreto descrito em “Para o professor”.</p>';
    return null;
  }

  el.classList.add('lab-palco');
  el.setAttribute('role', 'img');
  el.tabIndex = 0;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(o.fov, 1, 0.1, 400);
  camera.position.set(...o.cam);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...o.alvo);
  controls.enableDamping = !reduzMovimento();
  controls.dampingFactor = 0.12;
  controls.minDistance = o.min; controls.maxDistance = o.max;
  controls.maxPolarAngle = o.polarMax;
  controls.enablePan = !!o.pan;
  controls.update();
  const camInicial = { pos: camera.position.clone(), alvo: controls.target.clone() };

  /* Luz: céu + sol com sombra suave, para dar volume sem escurecer as cores */
  const ceu = new THREE.HemisphereLight(0xffffff, 0xd8d8d2, 1.7);
  scene.add(ceu);
  const sol = new THREE.DirectionalLight(0xffffff, 1.6);
  sol.position.set(8, 14, 6);
  sol.castShadow = true;
  sol.shadow.mapSize.set(2048, 2048);
  const sc = sol.shadow.camera; sc.left = -18; sc.right = 18; sc.top = 18; sc.bottom = -18; sc.near = 1; sc.far = 60;
  sol.shadow.bias = -0.0005;
  scene.add(sol);

  let chao = null;
  if (o.chao) {
    chao = new THREE.Mesh(new THREE.PlaneGeometry(o.chaoTam, o.chaoTam), new THREE.ShadowMaterial({ opacity: 0.16 }));
    chao.rotation.x = -Math.PI / 2; chao.receiveShadow = true;
    scene.add(chao);
  }

  /* ---------- tema ---------- */
  const corBorda = new THREE.Color();
  function aplicaTema() {
    const esc = temaEscuro();
    corBorda.set(esc ? '#0a0a0a' : COR.tinta);
    matBorda.color.copy(corBorda);
    ceu.intensity = esc ? 1.35 : 1.7;
    if (chao) chao.material.opacity = esc ? 0.32 : 0.16;
    pedeQuadro();
  }
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', aplicaTema);

  /* ---------- peças ---------- */
  const matCache = {};
  function material(cor, extra = {}) {
    const k = cor + JSON.stringify(extra);
    if (!matCache[k]) matCache[k] = new THREE.MeshStandardMaterial(Object.assign({ color: new THREE.Color(cor), roughness: 0.62, metalness: 0.02 }, extra));
    return matCache[k];
  }
  const matBorda = new THREE.LineBasicMaterial({ color: corBorda });
  function comBordas(mesh, ang = 25) {
    const linhas = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, ang), matBorda);
    linhas.raycast = () => {};
    mesh.add(linhas);
    return mesh;
  }
  /* Bloco com o canto inferior em (0,0,0) quando base=true, ou centrado */
  function bloco(w, h, d, cor, op2 = {}) {
    const g = new THREE.BoxGeometry(w, h, d);
    if (op2.base !== false) g.translate(w / 2, h / 2, d / 2);
    const m = new THREE.Mesh(g, op2.material || material(cor, op2.mat || {}));
    m.castShadow = op2.sombra !== false; m.receiveShadow = true;
    if (op2.bordas !== false) comBordas(m);
    return m;
  }
  function cilindro(r, h, cor, op2 = {}) {
    const g = new THREE.CylinderGeometry(op2.rTopo ?? r, r, h, op2.seg || 48, 1, false, op2.ini || 0, op2.ang ?? Math.PI * 2);
    g.translate(0, h / 2, 0);
    const m = new THREE.Mesh(g, op2.material || material(cor, op2.mat || {}));
    m.castShadow = true; m.receiveShadow = true;
    if (op2.bordas !== false) comBordas(m, 40);
    return m;
  }

  /* Textura de quadriculado: cada face mostra as unidades da peça (Material Dourado) */
  let texGrade = null;
  function gradeTex() {
    if (texGrade) return texGrade;
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d');
    x.fillStyle = '#ffffff'; x.fillRect(0, 0, 64, 64);
    x.strokeStyle = 'rgba(0,0,0,.38)'; x.lineWidth = 4; x.strokeRect(0, 0, 64, 64);
    texGrade = new THREE.CanvasTexture(c);
    texGrade.wrapS = texGrade.wrapT = THREE.RepeatWrapping;
    texGrade.colorSpace = THREE.SRGBColorSpace; texGrade.anisotropy = 8;
    return texGrade;
  }
  /* blocoGrade(nx, ny, nz, cel, cor): bloco de nx·ny·nz cubinhos de aresta cel */
  function blocoGrade(nx, ny, nz, cel, cor, op2 = {}) {
    const w = nx * cel, h = ny * cel, d = nz * cel;
    const g = new THREE.BoxGeometry(w, h, d);
    const uv = g.attributes.uv;
    const dims = [[nz, ny], [nz, ny], [nx, nz], [nx, nz], [nx, ny], [nx, ny]];
    for (let f = 0; f < 6; f++) for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setXY(i, uv.getX(i) * dims[f][0], uv.getY(i) * dims[f][1]);
    }
    if (op2.base !== false) g.translate(w / 2, h / 2, d / 2);
    const k = 'grade' + cor;
    if (!matCache[k]) matCache[k] = new THREE.MeshStandardMaterial({ color: new THREE.Color(cor), map: gradeTex(), roughness: 0.6 });
    const m = new THREE.Mesh(g, matCache[k]);
    m.castShadow = true; m.receiveShadow = true;
    comBordas(m);
    return m;
  }
  /* Prisma a partir de um polígono no plano (pontos [x, z]) com altura h */
  function prisma(pts, h, cor, op2 = {}) {
    const sh = new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, -z)));
    const g = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(g, op2.material || material(cor, op2.mat || {}));
    m.castShadow = op2.sombra !== false; m.receiveShadow = true;
    if (op2.bordas !== false) comBordas(m, 10);
    return m;
  }
  /* Barra fina entre dois pontos (régua, cerca, transversal) */
  function haste(a, b, esp, cor, op2 = {}) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
    const L = A.distanceTo(B);
    const g = new THREE.BoxGeometry(esp, esp, L);
    const m = new THREE.Mesh(g, op2.material || material(cor, op2.mat || {}));
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.lookAt(B);
    m.castShadow = op2.sombra !== false;
    if (op2.bordas) comBordas(m);
    return m;
  }

  /* Rótulo em pílula (texto sempre de frente para a câmera) */
  function rotulo(texto, op2 = {}) {
    const esc = Object.assign({ tam: 0.6, fundo: '#ffffff', cor: '#111111', borda: '#111111', fonte: '600 56px Lexend, system-ui, sans-serif' }, op2);
    const cv = document.createElement('canvas');
    const ctx = cv.getContext('2d');
    ctx.font = esc.fonte;
    const tw = Math.ceil(ctx.measureText(texto).width);
    cv.width = tw + 64; cv.height = 96;
    ctx.font = esc.fonte;
    const r = 44;
    ctx.fillStyle = esc.fundo; ctx.strokeStyle = esc.borda; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.roundRect(3, 3, cv.width - 6, cv.height - 6, r); ctx.fill(); ctx.stroke();
    ctx.fillStyle = esc.cor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(texto, cv.width / 2, cv.height / 2 + 3);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: esc.depthTest ?? true, transparent: true }));
    sp.scale.set(esc.tam * cv.width / cv.height, esc.tam, 1);
    sp.renderOrder = 10;
    sp.raycast = () => {};
    sp.userData.texto = texto;
    return sp;
  }

  /* ---------- interação ---------- */
  const ray = new THREE.Raycaster();
  const ptr = new THREE.Vector2();
  const clicaveis = new Map();   // mesh -> fn
  const arrastaveis = new Map(); // mesh -> config
  function ndc(ev) {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
  }
  function achar(mapa) {
    const hits = ray.intersectObjects([...mapa.keys()], true);
    for (const h of hits) {
      let ob = h.object;
      while (ob && !mapa.has(ob)) ob = ob.parent;
      if (ob && ob.visible !== false) return { ob, ponto: h.point };
    }
    return null;
  }
  function clicavel(ob, fn) { clicaveis.set(ob, fn); return ob; }
  function esquecer(ob) { clicaveis.delete(ob); arrastaveis.delete(ob); }
  /* arrastavel(obj, { plano: 'xz' | 'xy', nivel, aoMover(obj, ponto), aoSoltar(obj) }) */
  function arrastavel(ob, cfg) { arrastaveis.set(ob, Object.assign({ plano: 'xz', nivel: 0 }, cfg)); return ob; }

  let baixo = null, arrasto = null;
  const planoTmp = new THREE.Plane(), ponto = new THREE.Vector3(), desloc = new THREE.Vector3();
  const cv = renderer.domElement;
  cv.style.touchAction = 'none';
  cv.addEventListener('pointerdown', ev => {
    baixo = { x: ev.clientX, y: ev.clientY };
    ndc(ev);
    const a = achar(arrastaveis);
    if (a) {
      const c = arrastaveis.get(a.ob);
      if (c.plano === 'xy') planoTmp.set(new THREE.Vector3(0, 0, 1), -(c.nivel ?? a.ob.position.z));
      else planoTmp.set(new THREE.Vector3(0, 1, 0), -(c.nivel ?? 0));
      if (ray.ray.intersectPlane(planoTmp, ponto)) {
        desloc.copy(a.ob.position).sub(ponto);
        arrasto = { ob: a.ob, c, moveu: false };
        controls.enabled = false;
        cv.setPointerCapture(ev.pointerId);
        c.aoPegar && c.aoPegar(a.ob);
      }
    }
  });
  cv.addEventListener('pointermove', ev => {
    if (!arrasto) return;
    ndc(ev);
    if (ray.ray.intersectPlane(planoTmp, ponto)) {
      const alvo = ponto.clone().add(desloc);
      if (arrasto.c.plano === 'xy') alvo.z = arrasto.ob.position.z; else alvo.y = arrasto.ob.position.y;
      arrasto.moveu = true;
      if (arrasto.c.aoMover) arrasto.c.aoMover(arrasto.ob, alvo); else arrasto.ob.position.copy(alvo);
      pedeQuadro();
    }
  });
  const solta = ev => {
    if (arrasto) {
      const a = arrasto; arrasto = null; controls.enabled = true;
      if (a.moveu) { a.c.aoSoltar && a.c.aoSoltar(a.ob); baixo = null; pedeQuadro(); return; }
    }
    if (baixo && Math.hypot(ev.clientX - baixo.x, ev.clientY - baixo.y) < 6) {
      ndc(ev);
      const a = achar(clicaveis);
      if (a) clicaveis.get(a.ob)(a.ob, a.ponto);
    }
    baixo = null; pedeQuadro();
  };
  cv.addEventListener('pointerup', solta);
  cv.addEventListener('pointercancel', () => { arrasto = null; baixo = null; controls.enabled = true; });
  cv.addEventListener('pointermove', ev => {
    if (arrasto || ev.buttons) return;
    ndc(ev);
    cv.style.cursor = achar(arrastaveis) ? 'grab' : (achar(clicaveis) ? 'pointer' : 'default');
  });

  /* Teclado no palco: setas giram a câmera, + e − aproximam */
  el.addEventListener('keydown', ev => {
    const k = ev.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') { girar(k === 'ArrowLeft' ? 0.18 : -0.18, 0); ev.preventDefault(); }
    else if (k === 'ArrowUp' || k === 'ArrowDown') { girar(0, k === 'ArrowUp' ? -0.12 : 0.12); ev.preventDefault(); }
    else if (k === '+' || k === '=') { zoom(0.85); ev.preventDefault(); }
    else if (k === '-' || k === '_') { zoom(1.18); ev.preventDefault(); }
  });
  function girar(dAz, dPol) {
    const s = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    s.theta += dAz; s.phi = Math.min(controls.maxPolarAngle, Math.max(0.05, s.phi + dPol));
    camera.position.copy(new THREE.Vector3().setFromSpherical(s).add(controls.target));
    controls.update(); pedeQuadro();
  }
  function zoom(f) {
    const v = camera.position.clone().sub(controls.target).multiplyScalar(f);
    const L = Math.min(controls.maxDistance, Math.max(controls.minDistance, v.length()));
    camera.position.copy(controls.target.clone().add(v.setLength(L))); controls.update(); pedeQuadro();
  }

  /* ---------- animação ---------- */
  const tweens = [];
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  /* animar(obj, { position: [x,y,z], rotation: [x,y,z], scale: [x,y,z] }, ms) → Promise */
  function animar(ob, alvo, ms = 450) {
    return new Promise(res => {
      const itens = [];
      for (const prop of ['position', 'rotation', 'scale']) {
        if (!alvo[prop]) continue;
        const de = ob[prop].toArray().slice(0, 3);
        itens.push({ prop, de, para: alvo[prop] });
      }
      for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].ob === ob) tweens.splice(i, 1);
      if (reduzMovimento() || ms <= 0) { itens.forEach(it => ob[it.prop].set(...it.para)); pedeQuadro(); res(); return; }
      tweens.push({ ob, itens, t0: performance.now(), ms, res });
      pedeQuadro();
    });
  }

  /* ---------- câmera ---------- */
  function vista(nome) {
    const t = controls.target, d = camera.position.distanceTo(t);
    const pos = {
      frente: [t.x, t.y + d * 0.12, t.z + d],
      cima: [t.x, t.y + d, t.z + 0.001],
      lado: [t.x + d, t.y + d * 0.12, t.z],
      inicio: camInicial.pos.toArray()
    }[nome];
    if (nome === 'inicio') controls.target.copy(camInicial.alvo);
    if (!pos) return;
    const de = camera.position.clone(), para = new THREE.Vector3(...pos);
    if (reduzMovimento()) { camera.position.copy(para); controls.update(); pedeQuadro(); return; }
    const t0 = performance.now();
    camAnim = now => {
      const k = Math.min(1, (now - t0) / 500);
      camera.position.lerpVectors(de, para, ease(k));
      controls.update();
      if (k >= 1) camAnim = null;
    };
    pedeQuadro();
  }
  let camAnim = null;
  function posicionar(pos, alvo) {
    controls.target.set(...alvo); camera.position.set(...pos);
    camInicial.pos.copy(camera.position); camInicial.alvo.copy(controls.target);
    controls.update(); pedeQuadro();
  }
  function enquadrar(alvo, dist) {
    controls.target.set(...alvo);
    if (dist) camera.position.copy(controls.target.clone().add(camera.position.clone().sub(controls.target).setLength(dist)));
    controls.update(); pedeQuadro();
  }

  /* ---------- texto alternativo do canvas ---------- */
  function descrever(txt) { el.setAttribute('aria-label', txt); }

  /* ---------- laço de desenho (só desenha quando algo muda) ---------- */
  const laços = [];
  function loop(fn) { laços.push(fn); pedeQuadro(); }
  let pedido = false, sempre = 0;
  function pedeQuadro() { if (!pedido) { pedido = true; requestAnimationFrame(quadro); } }
  function animarSempre(liga) { sempre = Math.max(0, sempre + (liga ? 1 : -1)); pedeQuadro(); }
  function quadro(now) {
    pedido = false;
    let continuar = sempre > 0;
    for (let i = tweens.length - 1; i >= 0; i--) {
      const tw = tweens[i];
      const k = Math.min(1, (now - tw.t0) / tw.ms), e = ease(k);
      tw.itens.forEach(it => tw.ob[it.prop].set(...it.de.map((v, j) => v + (it.para[j] - v) * e)));
      if (k >= 1) { tweens.splice(i, 1); tw.res(); } else continuar = true;
    }
    if (camAnim) { camAnim(now); continuar = true; }
    laços.forEach(fn => { if (fn(now) === true) continuar = true; });
    if (controls.update()) continuar = true;
    renderer.render(scene, camera);
    if (continuar) pedeQuadro();
  }
  controls.addEventListener('change', pedeQuadro);

  function ajusta() {
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    pedeQuadro();
  }
  new ResizeObserver(ajusta).observe(el);
  ajusta();
  aplicaTema();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => api.aoFontes && api.aoFontes());

  const api = {
    THREE, scene, camera, renderer, controls, sol,
    material, comBordas, bloco, blocoGrade, prisma, haste, cilindro, rotulo,
    clicavel, arrastavel, esquecer, animar, vista, enquadrar, posicionar, girar, zoom,
    descrever, loop, pedeQuadro, animarSempre,
    add: (...obs) => { scene.add(...obs); pedeQuadro(); return obs[0]; },
    remove: (...obs) => { obs.forEach(ob => { scene.remove(ob); esquecer(ob); }); pedeQuadro(); },
    limpar: grupo => { [...grupo.children].forEach(c => { grupo.remove(c); esquecer(c); }); pedeQuadro(); }
  };
  el.__cena = api;
  return api;
}

/* Botões de câmera padrão: liga os [data-vista] dentro do elemento */
export function botoesCamera(cena, raiz = document) {
  raiz.querySelectorAll('[data-vista]').forEach(b => b.addEventListener('click', () => cena && cena.vista(b.dataset.vista)));
}

/* Pequenos utilitários de matemática usados nas páginas */
export const mdc = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
export const mmc = (a, b) => Math.abs(a * b) / mdc(a, b);
export const fmt = (n, casas = 3) => Number(n.toFixed(casas)).toLocaleString('pt-BR', { maximumFractionDigits: casas });
