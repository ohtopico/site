// Frases faladas -> pedido. O reconhecimento de voz devolve maiúsculas, acentos e pontuação variados,
// então as frases aqui vêm do jeito que o celular escreve.
import { test } from "node:test";
import assert from "node:assert/strict";
import { SITE } from "./servidor.mjs";

const { interpretar, minutosDe } = await import(`file://${SITE}/comandos.js`);
const { GRUPOS, grupoDaFrase } = await import(`file://${SITE}/menu.js`);
const { normalizar } = await import(`file://${SITE}/vocabulario.js`);

// [frase, campos esperados do pedido]
const CASOS = [
  // objetos
  ["Cadê a xícara?", { tipo: "procurar", rotulo: "cup", alvo: "xícara" }],
  ["ache o celular", { tipo: "procurar", rotulo: "cell phone" }],
  ["ache a chave", { tipo: "procurar", rotulo: null, alvo: "chave" }],
  ["Onde fica a saída?", { tipo: "procurar", rotulo: null, alvo: "saída" }],
  ["Tem um extintor?", { tipo: "verificar", rotulo: null, alvo: "extintor" }],
  ["tem uma cadeira aqui", { tipo: "verificar", rotulo: "chair" }],
  ["me leva até a xícara", { tipo: "procurar", rotulo: "cup" }],
  ["xícara", { tipo: "procurar", rotulo: "cup" }],
  ["O que tem na minha frente?", { tipo: "descrever" }],
  ["o caminho está livre", { tipo: "livre" }],
  // ambiente
  ["Descreva o ambiente", { tipo: "ambiente" }],
  ["como é este lugar", { tipo: "ambiente" }],
  ["o que você está vendo", { tipo: "ambiente" }],
  ["Onde estou?", { tipo: "ondeEstou" }],
  ["em que sala estou", { tipo: "ondeEstou" }],
  ["quantas pessoas tem aqui", { tipo: "contar", rotulo: "person" }],
  ["quantas cadeiras tem", { tipo: "contar", rotulo: "chair" }],
  ["Está claro ou escuro?", { tipo: "luz" }],
  ["é seguro andar", { tipo: "livre" }],
  ["Que horas são?", { tipo: "hora" }],
  // memória
  ["o que eu passei", { tipo: "lembrar" }],
  ["lembrar este lugar como cozinha", { tipo: "lugar", nome: "cozinha" }],
  ["esquecer o lugar cozinha", { tipo: "apagarLugar", nome: "cozinha" }],
  ["quais são os lugares", { tipo: "listarLugares" }],
  // pessoas
  ["Cadastrar pessoa Maria", { tipo: "cadastrar", nome: "maria" }],
  ["te apresento a Maria", { tipo: "cadastrar", nome: "maria" }],
  ["essa é a Maria", { tipo: "cadastrar", nome: "maria" }],
  ["quem está aqui", { tipo: "quem" }],
  ["apagar pessoa Maria", { tipo: "apagarPessoa", nome: "maria" }],
  // percursos
  ["gravar percurso banheiro", { tipo: "gravar", nome: "banheiro" }],
  ["gravar o caminho até o banheiro", { tipo: "gravar", nome: "banheiro" }],
  ["começar a gravar", { tipo: "gravar", nome: "" }],
  ["terminar gravação", { tipo: "terminar" }],
  ["Cheguei.", { tipo: "terminar" }],
  ["seguir percurso banheiro", { tipo: "seguir", nome: "banheiro" }],
  ["voltar pelo percurso banheiro", { tipo: "voltar", nome: "banheiro" }],
  ["apagar percurso banheiro", { tipo: "apagar", nome: "banheiro" }],
  ["quais são os percursos", { tipo: "listar" }],
  ["passos mais sensível", { tipo: "sensibilidade", sentido: 1 }],
  ["passos menos sensível", { tipo: "sensibilidade", sentido: -1 }],
  // rua
  ["Que prédio é esse?", { tipo: "predio" }],
  ["o que tem por perto", { tipo: "predio" }],
  ["o que tem perto de mim", { tipo: "descrever" }], // desde o #48: perto de mim é dentro de casa
  ["onde fica a reitoria", { tipo: "ondeFica", destino: "reitoria" }],
  ["me leva até a rodoviária", { tipo: "mapa", destino: "rodoviária" }],
  ["quanto falta", { tipo: "quantoFalta" }],
  // leitura e voz
  ["Leia este texto", { tipo: "ler" }],
  ["o que está escrito", { tipo: "ler" }],
  ["trocar voz", { tipo: "trocarVoz" }],
  ["fale mais devagar", { tipo: "velocidade", sentido: -1 }],
  ["fale mais rápido", { tipo: "velocidade", sentido: 1 }],
  ["silêncio", { tipo: "pausar", minutos: null }],
  ["Silêncio por 10 minutos", { tipo: "pausar", minutos: 10 }],
  ["pode ficar em silêncio", { tipo: "pausar" }],
  ["continuar", { tipo: "retomar" }],
  ["parar", { tipo: "parar" }],
  ["menu", { tipo: "menu", grupo: null }],
  ["menu rua", { tipo: "menu", grupo: "rua" }],
  ["Como funciona?", { tipo: "explicar" }],
  ["sim", { tipo: "sim" }],
  ["agora não", { tipo: "nao" }],
  ["blá blá blá", { tipo: "desconhecido" }],
];

for (const [frase, esperado] of CASOS) {
  test(`"${frase}" -> ${esperado.tipo}`, () => {
    const pedido = interpretar(frase);
    for (const [campo, valor] of Object.entries(esperado)) {
      assert.equal(pedido[campo], valor, `${campo} de "${frase}": ${JSON.stringify(pedido)}`);
    }
  });
}

// O menu falado e a lista escrita da tela inicial ensinam estas frases: todas têm de funcionar
test("todo comando do menu é entendido", () => {
  const falhas = GRUPOS.flatMap(g => g.comandos.map(([c]) => c))
    .filter(c => ["desconhecido", "sim", "nao"].includes(interpretar(c).tipo));
  assert.deepEqual(falhas, []);
});

test("cada grupo do menu é achado pelo próprio nome", () => {
  for (const g of GRUPOS) assert.equal(grupoDaFrase(normalizar(g.nome))?.nome, g.nome);
});

test("tempo do modo silêncio", () => {
  assert.equal(minutosDe("silencio por 10 minutos"), 10);
  assert.equal(minutosDe("silencio por meia hora"), 30);
  assert.equal(minutosDe("silencio por uma hora"), 60);
  assert.equal(minutosDe("silencio por duas horas"), 120);
  assert.equal(minutosDe("silencio"), null);
});
