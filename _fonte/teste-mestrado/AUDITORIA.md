# Auditoria de acessibilidade — assistência por voz (30/10/2026)

Feita sobre a versão v47 de `teste-mestrado/`, com axe-core 4.10 (WCAG 2.2 A/AA e boas práticas) no Chromium,
telas inicial, tutorial e uso, tema claro e escuro, tela de celular (390 × 844), mais conferências à mão do
código e de capturas de tela. As conferências automáticas viraram `testes/acessibilidade.test.mjs`.

## Corrigido neste PR (só `index.html` e `estilo.css`)

| Problema | Quem é afetado | Correção |
|---|---|---|
| Campo "Digitar pedido" direto sobre a câmera: texto preto (ou branco, no escuro) por cima do vídeo, ilegível | quem tem baixa visão e usa o modo teclado | faixa de papel com borda atrás do campo |
| A pílula da versão cobria o botão Enviar | todos no modo teclado | campo desce 28 px |
| Foco do teclado invisível em "Importar memória" e "Escolher fotos" (o seletor CSS olhava o elemento errado) | quem usa teclado ou teclado Bluetooth no celular | o rótulo-botão ganha o contorno quando o campo escondido tem o foco |
| Tutorial e tela de uso sem região principal (`main`) | leitor de tela: o atalho "ir para o conteúdo principal" não achava nada | cada tela é um `<main>`; só uma aparece por vez |
| Títulos pulavam de h1 para h3 na lista de comandos | leitor de tela, ao navegar por títulos | h2 "Comandos por grupo" (só para leitor de tela) |
| `aria-label` da versão num `<p>` comum, que os leitores de tela ignoram; e fora de qualquer região | leitor de tela | `role="note"` dentro de um `<footer>` |
| `.sr-only` sem margem e borda zeradas (podia deixar 1 px visível ou mexer no layout) | — | classe completa |
| Botões grandes "pulam" ao receber foco mesmo com "reduzir movimento" ligado | quem tem enjoo ou vestibulopatia | sem animação com `prefers-reduced-motion` |
| Barra do navegador sempre branca, também no tema escuro | conforto no escuro | `theme-color` para claro e escuro |

Contraste: nenhum problema nos dois temas (o verde #166c40 sobre branco dá 6,5:1). Nomes de botões e campos,
idioma da página, zoom liberado e alvos de toque (todos com 44 px ou mais) estavam certos.

## Pendente (mexe em `app.js` ou precisa de decisão; fica para o tópico das funcionalidades)

1. **O site fala por cima do leitor de tela.** Com TalkBack ou VoiceOver ligados, as boas-vindas automáticas e o
   tutorial falado tocam junto com o leitor lendo o botão ou o título focado. Sugestão: uma opção "uso leitor de
   tela" (ou perguntar na primeira vez) que troca a fala própria por uma região `aria-live`, para o leitor falar
   com a voz e a velocidade que a pessoa já usa. Precisa de teste com usuários.
2. **Nada chega à linha braille.** O quadro de estado é `aria-hidden` e as falas só saem pelo alto-falante.
   A mesma região `aria-live` do item 1 resolveria, para quem é surdocego.
3. **A tela demora a responder ao toque enquanto os modelos rodam.** No teste (4 núcleos, sem placa de vídeo)
   cada quadro travou a página por 1,2 a 2,4 s, e o bipe depois do toque levou 3,4 s. O ONNX Runtime e o
   MediaPipe rodam na mesma thread da tela. Tentei `ort.env.wasm.proxy = true` (modelos num worker), mas os
   tensores reaproveitados chegam vazios ao worker: precisa criar tensores novos a cada quadro ou mover o laço
   de análise para um Worker. Vale medir no celular antes.
4. **"Toque e fale" para quem usa leitor de tela é "toque duas vezes".** Os rótulos podem dizer
   "Toque (com leitor de tela, toque duas vezes) e fale".

## O que só dá para conferir no celular, com gente

- TalkBack (Android, Chrome) e VoiceOver (iPhone, Safari): ordem de leitura, tela de uso como um botão só,
  anúncio do modo silêncio pela mudança do rótulo.
- Fonte grande do sistema e zoom de 200%: a tela inicial continua com Começar visível sem rolar?
- Modo de alto contraste do Android/Windows (`forced-colors`).
- Teste com pessoas cegas: depende da aprovação do Comitê de Ética (Plataforma Brasil).
