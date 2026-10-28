# Assistência por voz (teste do mestrado)

Protótipo de site para pessoas cegas, em `ohtopico.com.br/teste-mestrado/`. Abre no navegador do celular,
usa a câmera traseira e responde a pedidos falados. A tela inicial é um único botão; depois, a pessoa
toca em qualquer lugar e fala.

| Pedido falado | O que acontece |
|---|---|
| "cadê a xícara", "ache o celular" | procura com o detector no celular; bipes mais rápidos quando o objeto está no centro, voz com lado e distância |
| "ache a chave", "onde fica a saída", "tem um extintor?" | objetos que o detector não conhece: tira uma foto e pergunta à IA na nuvem (Claude) |
| "tem uma cadeira aqui?" | olha por alguns segundos e responde sim ou não |
| "o que tem na minha frente?" | lista os objetos visíveis, da esquerda para a direita |
| "o caminho está livre?" | distância livre à esquerda, à frente e à direita (mapa de profundidade) |
| "gravar percurso banheiro" / "terminar gravação" | grava passos, curvas e objetos vistos |
| "seguir percurso banheiro" / "voltar pelo percurso banheiro" | guia pelo percurso, na ida ou na volta |
| "me leva até a rodoviária" | abre o Google Maps a pé (só para a rua) |
| "parar", "pausar", "continuar", "ajuda" | controle |

Sem nenhum pedido, o site avisa obstáculos com a distância aproximada, vibra (Android) quando algo está perto
à frente e diz quando um lado se abre e dá para virar. Na primeira vez, pergunta se a pessoa quer saber como funciona.

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
- **Ambiente (opcional)**: com `modelos/cena.onnx` e `cena_labels.txt` (gerados por `tools/export_onnx.py` a partir da
  MobileNet treinada em `mobilenet_cenas`), também fala o tipo de ambiente.

Bibliotecas em `vendor/` (MediaPipe Tasks Vision 0.10.14 e ONNX Runtime Web 1.19.2, licença Apache 2.0 e MIT),
copiadas para o site funcionar sem CDN.

## Limitações conhecidas

- Vibração não existe no iPhone (o Safari não permite); lá a fala substitui.
- O iPhone pede permissão para os sensores de movimento no primeiro toque.
- A tela precisa ficar aberta; o site mantém a tela acesa enquanto está em uso.
- Testado em Chromium com câmera simulada; ainda não testado num celular com pessoas cegas.
