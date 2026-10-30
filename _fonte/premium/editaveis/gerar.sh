#!/bin/sh
# Refaz os arquivos editáveis da área premium em _privado/premium/arquivos/ e publica tudo criptografado.
# Rode na raiz do repositório. Ajuste os dois caminhos abaixo para onde estão os geradores no seu computador.
# Autora: Júlia Roberta Quoos Alves.
set -e
SLIDES=${SLIDES:-../projeto/posts/bncc-computacao/gerador}              # aulas6..9.py, lib.py, svg.py
APOSTILA=${APOSTILA:-../projeto/posts/apostilas/professor-bncc/gerador}  # saida/miolo.html (rode gerar.sh dela antes)
FONTES=${FONTES:-../projeto/posts/apostilas/robotica/gerador/fonts}       # Lexend, Sniglet, JetBrains Mono
P=_privado/premium
python3 _fonte/premium/editaveis/slides_pptx.py --gerador "$SLIDES" --fontes "$FONTES" --saida $P/arquivos/slides
python3 _fonte/premium/editaveis/apostila_docx.py "$APOSTILA/saida/miolo.html" $P/arquivos/apostila
python3 _fonte/premium/editaveis/planejamento_docx.py $P/arquivos/planejamento
python3 _fonte/premium/editaveis/jogo_html.py $P/arquivos/jogos $P/mesada-pro.html $P/treine-a-maquina.html
python3 _fonte/premium/proteger.py --site . --fontes $P "$@"   # sh gerar.sh --novas-senhas troca as senhas do mês
