// Objetos que o detector local conhece (COCO) com o nome falado e os sinônimos aceitos nos comandos.
// A chave é o rótulo do modelo; o primeiro termo é o nome que o site fala.
export const OBJETOS = {
  "person": ["pessoa", "gente", "alguem", "homem", "mulher", "crianca"],
  "bicycle": ["bicicleta", "bike"],
  "car": ["carro", "automovel"],
  "motorcycle": ["moto", "motocicleta"],
  "bus": ["ônibus", "onibus"],
  "truck": ["caminhão", "caminhao"],
  "traffic light": ["semáforo", "semaforo", "sinaleira", "sinal"],
  "fire hydrant": ["hidrante"],
  "stop sign": ["placa de pare", "pare"],
  "bench": ["banco"],
  "bird": ["pássaro", "passaro", "passarinho"],
  "cat": ["gato"],
  "dog": ["cachorro", "cão", "cao"],
  "backpack": ["mochila"],
  "umbrella": ["guarda-chuva", "guarda chuva", "sombrinha"],
  "handbag": ["bolsa"],
  "suitcase": ["mala"],
  "sports ball": ["bola"],
  "bottle": ["garrafa", "garrafinha"],
  "wine glass": ["taça", "taca"],
  "cup": ["xícara", "xicara", "caneca", "copo"],
  "fork": ["garfo"],
  "knife": ["faca"],
  "spoon": ["colher"],
  "bowl": ["tigela", "pote", "cumbuca"],
  "banana": ["banana"],
  "apple": ["maçã", "maca"],
  "orange": ["laranja"],
  "chair": ["cadeira"],
  "couch": ["sofá", "sofa"],
  "potted plant": ["planta", "vaso de planta"],
  "bed": ["cama"],
  "dining table": ["mesa"],
  "toilet": ["vaso sanitário", "vaso sanitario", "privada"],
  "tv": ["televisão", "televisao", "tv", "monitor"],
  "laptop": ["notebook", "computador", "laptop"],
  "mouse": ["mouse"],
  "remote": ["controle remoto", "controle"],
  "keyboard": ["teclado"],
  "cell phone": ["celular", "telefone"],
  "microwave": ["micro-ondas", "microondas"],
  "oven": ["forno", "fogão", "fogao"],
  "sink": ["pia"],
  "refrigerator": ["geladeira"],
  "book": ["livro", "caderno"],
  "clock": ["relógio", "relogio"],
  "vase": ["vaso"],
  "scissors": ["tesoura"],
  "teddy bear": ["urso de pelúcia", "ursinho", "pelucia"],
  "toothbrush": ["escova de dente", "escova de dentes"],
};

// Objetos que importam para quem anda: são avisados mesmo sem pedido
export const OBSTACULOS = new Set([
  "person", "bicycle", "car", "motorcycle", "bench", "dog", "suitcase", "backpack",
  "fire hydrant", "chair", "couch", "potted plant", "bed", "dining table", "toilet", "refrigerator",
]);

export const nomeFalado = rotulo => OBJETOS[rotulo]?.[0];

/**
 * Acrescenta as classes do detector treinado (nomes já em português, ex.: "carteira", "cedula_20").
 * Cada uma passa a ser falada e reconhecida nos pedidos pelo próprio nome.
 */
export function adicionarObjetos(rotulos) {
  for (const r of rotulos) {
    if (OBJETOS[r]) continue;
    const falado = r.replaceAll("_", " ");
    OBJETOS[r] = [falado];
    SINONIMOS.push([normalizar(falado), r]);
    // "cedula 20" também atende por "cédula de 20"
    if (/ \d/.test(falado)) SINONIMOS.push([normalizar(falado.replace(/ (\d)/, " de $1")), r]);
  }
  SINONIMOS.sort((a, b) => b[0].length - a[0].length);
}

export const normalizar = texto =>
  texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[?!.,]/g, " ").replace(/\s+/g, " ").trim();

// Sinônimo normalizado -> rótulo, do termo mais longo para o mais curto ("vaso de planta" antes de "vaso")
const SINONIMOS = Object.entries(OBJETOS)
  .flatMap(([rotulo, termos]) => termos.map(t => [normalizar(t), rotulo]))
  .sort((a, b) => b[0].length - a[0].length);

/** Acha o objeto citado na frase. Devolve o rótulo do detector ou null. */
export function acharObjeto(frase) {
  const f = ` ${normalizar(frase)} `;
  for (const [termo, rotulo] of SINONIMOS) {
    if (f.includes(` ${termo} `) || f.includes(` ${termo}s `)) return rotulo;
  }
  return null;
}
