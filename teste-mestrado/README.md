# Assistência por voz (teste do mestrado)

Protótipo de site para pessoas cegas, em `ohtopico.com.br/teste-mestrado/`. Abre no navegador do celular,
usa a câmera traseira e responde a pedidos falados. A tela inicial é um único botão; depois, a pessoa
toca em qualquer lugar e fala.

| Pedido falado | O que acontece |
|---|---|
| "cadê a xícara", "ache o celular" | procura com o detector no celular; quando acha, diz o lado, a distância e o que há no caminho, e para de procurar |
| "ache a chave", "onde fica a saída", "tem um extintor?" | objetos que o detector não conhece: tira uma foto e pergunta à IA na nuvem (Claude) |
| "tem uma cadeira aqui?" | olha por alguns segundos e responde sim ou não |
| "o que tem na minha frente?" | lista os objetos visíveis, da esquerda para a direita |
| "o caminho está livre?" | distância livre à esquerda, à frente e à direita (mapa de profundidade) |
| "gravar percurso banheiro" / "terminar gravação" | grava passos, curvas e objetos vistos |
| "seguir percurso banheiro" / "voltar pelo percurso banheiro" | guia pelo percurso, na ida ou na volta |
| "o que eu passei?", "onde estava a porta?" | memória curta: o que saiu da câmera no último minuto, com a direção pela bússola |
| "lembrar este lugar como cozinha" / "onde estou?" | guarda o lugar em texto (objetos e direções, mais uma frase da IA se houver) e reconhece depois |
| "cadastrar pessoa Maria" / "quem está aqui?" | reconhece pessoas cadastradas, só com o consentimento falado delas |
| "apagar pessoa Maria", "esquecer o lugar cozinha" | apaga do celular |
| "que prédio é esse?", "o que tem perto?" | na rua: prédios e lugares com nome à frente e dos lados (GPS, bússola e OpenStreetMap) |
| "onde fica a reitoria?" | direção e distância em linha reta até o lugar |
| "me leva até a reitoria" / "quanto falta?" | guia a pé por voz, sem abrir outro app ("em 40 metros, vire à direita"); recalcula se sair do caminho |
| "leia este texto", "ler de novo", "o que está escrito?" | fotografa a página, placa ou rótulo em resolução maior e lê em voz alta (IA na nuvem); tocar na tela interrompe |
| "trocar voz", "fale mais devagar", "fale mais rápido" | escolhe a voz mais natural do celular por padrão; a escolha fica guardada |
| "silêncio", "silêncio por 10 minutos", "continuar" | modo silêncio: para de analisar e de falar até continuar ou até acabar o tempo |
| "menu", depois o nome do grupo ("rua"), ou "menu leitura" | menu falado com todos os comandos, em 7 grupos; a mesma lista aparece por escrito na tela inicial |
| "parar", "como funciona" | controle e tutorial |

Ao procurar ou descrever, o site diz onde está cada objeto (lado e distância) e se há algo no caminho até ele
("xícara à direita, a 3 metros; cuidado, cadeira no caminho, a 1 metro").

Sem nenhum pedido, o site só avisa paredes e obstáculos à frente com a distância aproximada, vibra (Android)
quando algo está perto e diz quando um lado se abre e dá para virar. Os objetos são ditos quando a pessoa pede.
Uma fala nunca corta outra.

Na rua, os mapas vêm de serviços públicos do OpenStreetMap, sem chave: Overpass (lugares perto), Nominatim
(busca por nome) e o servidor de rotas a pé (routing.openstreetmap.de). Os prédios só aparecem se tiverem nome
no OpenStreetMap; quem quiser pode acrescentar os que faltam em openstreetmap.org. Na primeira vez, pergunta se a pessoa quer saber como funciona.

## Como funciona

- **Detector de objetos**: EfficientDet-Lite0 (80 classes do COCO) pelo MediaPipe, no celular.
- **Profundidade**: MiDaS v2.1 small quantizado em int8 (`modelos/midas_int8.onnx.part0/1`, juntados no navegador),
  pelo ONNX Runtime Web. A profundidade é relativa; a escala em metros vem de objetos de altura conhecida
  (pessoa, cadeira…) ou, sem eles, da suposição de que a borda de baixo da imagem é o chão a ~1,2 m.
  **As distâncias são aproximadas**; os limiares estão no topo de `anunciador.js` e `profundidade.js`.
- **Voz**: reconhecimento e fala do próprio navegador (Web Speech API, pt-BR).
- **IA na nuvem**: dentro do Claude usa a conta de quem abre; fora dele, uma chave da API da Anthropic colada em
  "Configurar IA na nuvem" (guardada só no navegador). Só esses pedidos enviam foto.
- **Percursos**: passos pelo acelerômetro e direção pela bússola; ficam salvos no navegador do celular.
- **Pessoas**: face-api (detector TinyFace + reconhecimento com vetor de 128 números), em `vendor/face-api` e
  `modelos/rostos`. Só carrega se houver alguém cadastrado. O vetor e o nome ficam no navegador do celular;
  nada vai para a internet. Reconhecer pessoas é dado biométrico (LGPD): cadastre só quem concordar e, em
  pesquisa com usuários, inclua no projeto do Comitê de Ética.
- **Memória em texto**: percursos, lugares e pessoas podem ser exportados e importados como `.txt` (JSON)
  em "Configuração para quem ajuda".
- **Câmera**: usa a ultra-angular (0,5x) quando o navegador mostra qual é; senão, a traseira padrão.
- **Detector treinado (opcional)**: com `modelos/objetos.onnx` e `objetos_labels.txt` (gerados pelo notebook
  `treino_detector_mobilenet.ipynb`, SSDLite + MobileNetV3), os objetos treinados entram junto com os do COCO.
  O modelo atual (Open Images, 49 objetos, mAP50 0,47) está dividido em `objetos.onnx.part0/1`; só valem detecções
  com confiança de 0,5 ou mais, e os objetos de `objetos_ignorar.txt` (os que o modelo acerta pouco) ficam com a IA na nuvem.
- **Ambiente (opcional)**: com `modelos/cena.onnx` e `cena_labels.txt` (gerados por `tools/export_onnx.py` a partir da
  MobileNet treinada em `mobilenet_cenas`), também fala o tipo de ambiente.

Bibliotecas em `vendor/` (MediaPipe Tasks Vision 0.10.14 e ONNX Runtime Web 1.19.2, licença Apache 2.0 e MIT),
copiadas para o site funcionar sem CDN.

## Limitações conhecidas

- Vibração não existe no iPhone (o Safari não permite); lá a fala substitui.
- O iPhone pede permissão para os sensores de movimento no primeiro toque.
- A tela precisa ficar aberta; o site mantém a tela acesa enquanto está em uso.
- Testado em Chromium com câmera simulada; ainda não testado num celular com pessoas cegas.
