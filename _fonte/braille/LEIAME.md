# Braille e moldes táteis das fichas adaptadas

Gera, para cada ficha de `matematica-adaptada/fichas/` e `computacao-adaptada/fichas/`:

- `<slug>.brf`: versões A, B e C em braille, pronto para impressora braille (Braille ASCII, 40 celas por linha, 25 linhas por página, número da página no alto à direita).
- `<slug>-moldes-tateis.pdf`: uma página de instruções de montagem e um molde por figura, ampliado, com traço grosso, fundo branco e texturas no lugar das cores. O número do molde é o mesmo da figura no texto em braille.
- `material-adaptado/braille/<área>-<ano>-ano-braille.zip`: todos os .brf de um ano.

## Como rodar (na raiz do site)

```
python _fonte/matematica-adaptada/gerar.py
python _fonte/computacao-adaptada/gerar.py
python _fonte/braille/gerar.py          # .brf, zips, indice.json e o HTML dos moldes
node _fonte/braille/moldes.js           # PDFs dos moldes (Playwright)
python _fonte/computacao-adaptada/gerar.py && python _fonte/matematica-adaptada/gerar.py   # põe os links nas páginas
```

O `gerar.py` lê o HTML das fichas já geradas, então rode-o depois de mudar qualquer ficha. Ele avisa quando algum símbolo ficou sem braille.

## Decisões de transcrição (para a revisão da sala de recursos)

- Braille grau 1 (sem abreviaturas), Grafia Braille para a Língua Portuguesa: acentos, sinal de maiúscula (46), palavra toda em maiúscula (46 46).
- Números: sinal de número (3456), vírgula decimal (2), ponto separador de classes (3). Letra de a a j logo depois de número leva o prefixo (5).
- Código Matemático Unificado: + (235), − (36), × (236), ÷ (256), : (25), = (2356), > (135), < (246), % (456 356), R$ (46 1235 56), frações simples com o denominador na parte inferior da cela (3/4 = 3456 14 256), expoente com o sinal de índice superior (16).
- Viram palavras, para não arriscar um sinal pouco usado: ordinais (6º = sexto), grau (90 graus), raiz (raiz quadrada de), setas, figuras geométricas usadas como símbolo (quadrado vazio, círculo preto) e marcas de contagem (4 risquinhos).
- Onde a folha em tinta pede para circular, pintar ou ligar, o braille lista as opções e pede a resposta escrita. Lacunas aparecem como ( ). Tabelas viram uma linha por linha da tabela, com o nome de cada coluna.
- Cada figura vira "Figura N (molde tátil N): descrição", com os textos escritos na figura.
