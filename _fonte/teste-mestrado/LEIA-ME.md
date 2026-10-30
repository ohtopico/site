# Testes do site de assistência por voz

Testes automáticos de `teste-mestrado/` (ohtopico.com.br/teste-mestrado). Rodam sozinhos em cada pull request
que mexe no site (`.github/workflows/testar-assistencia.yml`) e também à mão:

```
cd _fonte/teste-mestrado
npm install
npx playwright install chromium   # só na primeira vez
npm test                          # tudo (uns 4 minutos; o fluxo no Chromium é o mais lento)
node --test testes/comandos.test.mjs   # só as frases, em menos de 1 segundo
```

| Arquivo | O que confere |
|---|---|
| `testes/modulos.test.mjs` | cada `.js` carrega como módulo ES, sem nome declarado duas vezes nem import de algo que não existe (o erro que quebrou o site no PR #39 e que `node --check` não pega) |
| `testes/comandos.test.mjs` | frases faladas viram o pedido certo; todo comando ensinado no menu é entendido |
| `testes/fluxo.test.mjs` | no Chromium, com câmera falsa e voz simulada: a página abre sem erro, tutorial, Começar, foco, pedidos falados (hora, menu, o que tem na frente, silêncio) |
| `testes/acessibilidade.test.mjs` | axe-core (WCAG 2.2 A/AA e boas práticas) nas três telas, no tema claro e no escuro; foco visível pelo teclado; alvos de toque de 44 px; nome de cada controle para o leitor de tela; campo de digitar legível sobre a câmera |

A voz é simulada em `testes/navegador.mjs`: `window.__falas` guarda tudo o que o site falou e
`window.__ouvir("frase")` responde ao reconhecimento de voz. Nada sai para a internet durante os testes.

Ao criar um comando novo, acrescente a frase em `CASOS` de `comandos.test.mjs`.

O que os testes não substituem (precisa de celular e de pessoas): ver [AUDITORIA.md](AUDITORIA.md).
