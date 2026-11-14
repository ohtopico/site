"""Gera _fonte/guia-bncc/guia.html, a fonte do PDF "Guia do professor: Computação na BNCC".

Uso (da raiz do repositório):
    python _fonte/guia-bncc/gerar.py      # escreve guia.html
    node _fonte/guia-bncc/pdf.js          # gera o PDF, a capa e as prévias em guia-computacao-bncc/

Fundo branco em todas as páginas (o guia é para imprimir); cor só nos detalhes.
Títulos em Fredoka, texto em Lexend. As contas dos gabaritos são feitas aqui, não digitadas.
"""
from pathlib import Path

import qrcode

AQUI = Path(__file__).resolve().parent
SITE = 'ohtopico.com.br'
ZAP = 'https://wa.me/5551999222234'
TITULO_CURTO = 'Guia do professor: Computação na BNCC'

EIXO = {'pc': 'Pensamento computacional', 'md': 'Mundo digital', 'cd': 'Cultura digital'}


# ---------------------------------------------------------------- utilidades

def qr_svg(url, cor='#111'):
    q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=0)
    q.add_data(url)
    q.make(fit=True)
    m = q.get_matrix()
    n = len(m)
    r = ''.join(f'<rect x="{x}" y="{y}" width="1.02" height="1.02"/>' for y, row in enumerate(m) for x, v in enumerate(row) if v)
    return f'<svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}" shape-rendering="crispEdges" role="img" aria-label="QR code para {url}"><g fill="{cor}">{r}</g></svg>'


def cesar(texto, k):
    return ''.join(chr((ord(c) - 65 + k) % 26 + 65) if 'A' <= c <= 'Z' else c for c in texto)


def seta(direcao, tam=12):
    """Seta desenhada (as fontes não têm setas)."""
    rot = {'cima': 0, 'direita': 90, 'baixo': 180, 'esquerda': 270}[direcao]
    return (f'<svg width="{tam}mm" height="{tam}mm" viewBox="0 0 40 40" role="img" aria-label="seta para {direcao}">'
            f'<rect x="1" y="1" width="38" height="38" rx="6" fill="#fff" stroke="#111" stroke-width="2"/>'
            f'<g transform="rotate({rot} 20 20)"><path d="M20 7 L31 19 H24 V33 H16 V19 H9 Z" fill="#111"/></g></svg>')


def figura(forma, cor, grande, tam_mm=None):
    c = {'vermelho': '#d9483b', 'azul': '#2f6fd0'}[cor]
    s = 30 if grande else 17
    o = (40 - s) / 2
    if forma == 'circulo':
        f = f'<circle cx="20" cy="20" r="{s / 2}" fill="{c}" stroke="#111" stroke-width="1.6"/>'
    elif forma == 'quadrado':
        f = f'<rect x="{o}" y="{o}" width="{s}" height="{s}" fill="{c}" stroke="#111" stroke-width="1.6"/>'
    else:
        f = f'<polygon points="20,{o} {o + s},{o + s} {o},{o + s}" fill="{c}" stroke="#111" stroke-width="1.6"/>'
    t = tam_mm or 26
    nome = f'{forma.replace("circulo", "círculo")} {cor} {"grande" if grande else "pequeno"}'
    return (f'<svg width="{t}mm" height="{t}mm" viewBox="0 0 40 40" role="img" aria-label="{nome}">'
            f'<rect x=".8" y=".8" width="38.4" height="38.4" rx="4" fill="#fff" stroke="#111" stroke-width="1" stroke-dasharray="3 2"/>{f}</svg>')


def malha(colunas, linhas, cel_mm, conteudo=None, pintadas=(), rotulos=False):
    """Malha quadriculada em SVG. conteudo: {(c, l): svg interno em coordenadas 0..10}."""
    conteudo = conteudo or {}
    w, h = colunas * 10, linhas * 10
    partes = []
    for (c, l), s in conteudo.items():
        partes.append(f'<g transform="translate({c * 10} {l * 10})">{s}</g>')
    for c, l in pintadas:
        partes.append(f'<rect x="{c * 10}" y="{l * 10}" width="10" height="10" fill="#111"/>')
    linhas_svg = ''.join(f'<line x1="{c * 10}" y1="0" x2="{c * 10}" y2="{h}"/>' for c in range(colunas + 1))
    linhas_svg += ''.join(f'<line x1="0" y1="{l * 10}" x2="{w}" y2="{l * 10}"/>' for l in range(linhas + 1))
    return (f'<svg width="{colunas * cel_mm}mm" height="{linhas * cel_mm}mm" viewBox="-0.5 -0.5 {w + 1} {h + 1}">'
            f'{"".join(partes)}<g stroke="#111" stroke-width="0.4">{linhas_svg}</g></svg>')


ROBO = ('<rect x="2" y="3" width="6" height="5" rx="1" fill="#fff36b" stroke="#111" stroke-width=".5"/>'
        '<circle cx="4" cy="5.2" r=".6" fill="#111"/><circle cx="6" cy="5.2" r=".6" fill="#111"/>'
        '<line x1="5" y1="3" x2="5" y2="1.6" stroke="#111" stroke-width=".5"/><circle cx="5" cy="1.4" r=".5" fill="#111"/>')
PEDRA = '<ellipse cx="5" cy="6" rx="3.4" ry="2.4" fill="#c9c9c4" stroke="#111" stroke-width=".4"/>'
HORTA = ('<line x1="5" y1="8.4" x2="5" y2="4" stroke="#16703a" stroke-width=".7"/>'
         '<ellipse cx="3.5" cy="4.6" rx="1.8" ry="1" fill="#7cc58f" stroke="#16703a" stroke-width=".4"/>'
         '<ellipse cx="6.5" cy="3.8" rx="1.8" ry="1" fill="#7cc58f" stroke="#16703a" stroke-width=".4"/>'
         '<rect x="2" y="8" width="6" height="1.4" fill="#a87b4f"/>')
INICIO = '<circle cx="5" cy="5" r="3.4" fill="#fff" stroke="#111" stroke-width=".6"/><circle cx="5" cy="5" r="1.4" fill="#111"/>'


# ---------------------------------------------------------------- páginas

class Livro:
    def __init__(self):
        self.paginas = []

    def pagina(self, html, classe='', rodape=True):
        n = len(self.paginas) + 1
        rod = (f'<div class="rodape"><span><b>{TITULO_CURTO}</b> · Júlia Roberta Quoos Alves</span>'
               f'<span>{SITE} · {n}</span></div>') if rodape else ''
        self.paginas.append(f'<section class="pg {classe}">{html}{rod}</section>')
        return n


def capa():
    return f'''
<div class="topo"><i></i><i></i><i></i><span>guia-do-professor.pdf</span></div>
<div class="pontos" aria-hidden="true"></div>
<div class="miolo">
  <span class="rotulo">Material gratuito para professores</span>
  <h1>Guia do <span class="marca">professor</span></h1>
  <p class="sub">Computação na BNCC, da habilidade à aula: os três eixos, a progressão de cada etapa, como planejar e avaliar, e atividades com e sem tela para imprimir.</p>
  <div class="eixos"><span class="tag pc">Pensamento computacional</span><span class="tag md">Mundo digital</span><span class="tag cd">Cultura digital</span></div>
  <div class="numeros">
    <div><b>3</b><span>eixos explicados com exemplos de sala de aula</span></div>
    <div><b>12</b><span>atividades com folha do estudante para imprimir</span></div>
    <div><b>2</b><span>versões de cada atividade: com tela e sem tela</span></div>
  </div>
  <ul class="dentro">
    <li>Os três eixos com exemplos de sala de aula</li><li>Progressão da Educação Infantil ao Ensino Médio</li>
    <li>Roteiro para planejar a aula em 5 passos</li><li>Rubrica de avaliação em três níveis</li>
    <li>Gabarito de todas as atividades</li><li>Ficha de planejamento e lista de observação</li>
  </ul>
</div>
<div class="base">
  <div><b>Júlia Roberta Quoos Alves</b><span>Professora de Computação · {SITE}</span></div>
  <div class="etapas">Educação Infantil<br>Ensino Fundamental<br>Ensino Médio</div>
</div>'''


def como_usar(sumario):
    li = lambda itens: ''.join(f'<li class="{"sub" if sub else ""}"><span>{t}</span><span>{p}</span></li>' for t, p, sub in itens)
    corte = next(i for i, x in enumerate(sumario) if x[0].startswith('1. '))
    fim = next(i for i, x in enumerate(sumario) if x[0].startswith('Ficha'))
    linhas = (f'<div class="cols2" style="gap:7mm"><div><ul class="sumario">{li(sumario[:corte] + sumario[fim:])}</ul></div>'
              f'<div><ul class="sumario">{li([(t, p, False) for t, p, _ in sumario[corte:fim]])}</ul></div></div>')
    return f'''
<span class="rotulo">Antes de começar</span>
<h1>Como usar este guia</h1>
<p class="linha-fina">Este guia foi feito para quem vai dar a aula. Ele parte da pergunta que mais aparece nas escolas desde que a Computação entrou na BNCC: como transformar uma habilidade do documento em uma aula que funcione, com a turma e a estrutura que a escola tem hoje.</p>
<div class="cols2">
  <div>
    <h3>Para ler com calma</h3>
    <p>As páginas 3 a 13 explicam a norma, os três eixos, a progressão de cada etapa, um roteiro para planejar e um jeito simples de avaliar.</p>
    <h3>Para usar amanhã</h3>
    <p>As páginas 14 a 38 trazem 12 atividades. Cada uma tem duas páginas: a orientação para o professor e a folha do estudante, pronta para imprimir em preto e branco.</p>
  </div>
  <div>
    <h3>Com tela e sem tela</h3>
    <p>Toda atividade funciona sem computador. Quando a escola tem laboratório, tablets ou projetor, a versão com tela indica um jogo ou simulador gratuito do site, que abre no navegador e não pede cadastro.</p>
    <h3>Para planejar o ano</h3>
    <p>No fim há uma ficha de planejamento e uma lista de observação em branco, para copiar quantas vezes precisar.</p>
  </div>
</div>
<h2>Sumário</h2>
{linhas}
<p class="pequeno">Licença CC BY-NC-SA 4.0: pode copiar, imprimir, adaptar e distribuir para as escolas, sem fins comerciais, citando a autoria.</p>'''


def norma():
    return '''
<span class="rotulo">Parte 1 · O que mudou</span>
<h1>Da norma à <span class="marca">sala de aula</span></h1>
<p class="linha-fina">A Computação entrou na Educação Básica pelo complemento à BNCC aprovado no Parecer CNE/CEB nº 2/2022 e instituído pela Resolução CNE/CEB nº 1/2022. Desde então, ela faz parte do que os estudantes têm direito de aprender, da Educação Infantil ao Ensino Médio.</p>
<div class="cols2">
  <div class="caixa">
    <h3>O que a norma define</h3>
    <ul>
      <li>As competências e as habilidades de Computação de cada etapa, organizadas em três eixos.</li>
      <li>Que redes e escolas incluam essas habilidades nos currículos e nas propostas pedagógicas.</li>
      <li>A formação dos professores como parte da implementação.</li>
    </ul>
  </div>
  <div class="caixa amarela">
    <h3>O que a norma não exige</h3>
    <ul>
      <li>Uma disciplina própria de Computação.</li>
      <li>Laboratório de informática ou um computador por estudante.</li>
      <li>Carga horária fixa. Cada rede decide o formato.</li>
    </ul>
  </div>
</div>
<h2>As quatro perguntas do professor</h2>
<p>Quando a habilidade chega ao planejamento, a dúvida deixa de ser se a Computação vai acontecer e passa a ser como. Na prática, ela se divide em quatro perguntas. Cada parte deste guia responde uma delas.</p>
<ol class="passos">
  <li><span class="num">1</span><span class="t"><b>O que ensinar?</b>Os três eixos e o que cada um trabalha, com exemplos de sala (páginas 4 a 7).</span></li>
  <li><span class="num">2</span><span class="t"><b>Em que ordem?</b>A progressão por etapa, para que cada ano avance sobre o anterior em vez de repetir (páginas 8 a 10).</span></li>
  <li><span class="num">3</span><span class="t"><b>Com quais recursos?</b>Como planejar a aula e escolher entre a versão com tela e a sem tela (páginas 11 e 12).</span></li>
  <li><span class="num">4</span><span class="t"><b>Como saber se aprenderam?</b>Evidências, instrumentos e uma rubrica em três níveis (página 13).</span></li>
</ol>
<div class="janela"><div class="barra"><i></i><i></i><i></i><span>dica.txt</span></div><div class="corpo">
Antes de montar o planejamento, confira se o seu estado ou município já publicou um currículo ou referencial de Computação. Ele costuma distribuir as habilidades por ano e por componente e é o documento que a escola segue. O mapa dos currículos estaduais está em <b>ohtopico.com.br/material-didatico/bncc/curriculos-estaduais/</b>.
</div></div>'''


def eixos_visao():
    col = lambda k, n, txt, itens: f'''<div class="caixa {k}"><div class="eixo-cab {k}"><span class="bola">{n}</span><h3 style="margin:0">{EIXO[k]}</h3></div>
<p>{txt}</p><ul>{''.join(f'<li>{i}</li>' for i in itens)}</ul></div>'''
    return f'''
<span class="rotulo">Parte 2 · O que ensinar</span>
<h1>Os três <span class="marca">eixos</span></h1>
<p class="linha-fina">As habilidades de Computação da BNCC se organizam em três eixos que andam juntos. Uma mesma aula costuma tocar mais de um, e é bom que seja assim: o eixo serve para conferir se o ano letivo está equilibrado, não para separar as aulas em caixas.</p>
<div class="cols3">
{col('pc', 'PC', 'Resolver problemas de um jeito que uma pessoa ou uma máquina possa executar.', ['Decomposição', 'Reconhecimento de padrões', 'Abstração', 'Algoritmos e programação'])}
{col('md', 'MD', 'Entender como as máquinas guardam, processam e transmitem informação.', ['Codificação da informação', 'Hardware e software', 'Redes e internet', 'Segurança dos dados'])}
{col('cd', 'CD', 'Usar e produzir tecnologia de forma crítica, ética, segura e responsável.', ['Cidadania e convivência digital', 'Uso crítico das informações', 'Autoria e direitos', 'Impactos sociais e ambientais'])}
</div>
<h2>Um exemplo que passa pelos três</h2>
<p>Uma turma de 6º ano vai organizar a votação do representante de turma.</p>
<table>
<tr><th style="width:42mm">Eixo</th><th>O que aparece na atividade</th></tr>
<tr><td><span class="tag pc">Pensamento computacional</span></td><td>Escrever o passo a passo da apuração, com a decisão de empate, e testar com votos inventados.</td></tr>
<tr><td><span class="tag md">Mundo digital</span></td><td>Discutir onde os votos ficam guardados se a votação for em um formulário on-line e quem pode acessá-los.</td></tr>
<tr><td><span class="tag cd">Cultura digital</span></td><td>Combinar regras para a campanha no grupo da turma: respeito, nada de montagens com a imagem dos colegas.</td></tr>
</table>
<h2>Como conferir o equilíbrio</h2>
<p>No fim de cada bimestre, liste as aulas dadas e marque o eixo principal de cada uma. Se um eixo ficou sem nenhuma aula, ele entra primeiro no bimestre seguinte. É comum o Pensamento computacional dominar no começo e a Cultura digital aparecer só em datas especiais; a progressão das páginas 8 e 9 ajuda a distribuir melhor.</p>'''


def eixo_pagina(k, n, titulo, intro, conceitos, exemplos, cuidado):
    cs = ''.join(f'<div class="caixa {k}" style="margin:0"><h4>{t}</h4><p style="margin:0">{d}</p></div>' for t, d in conceitos)
    ex = ''.join(f'<div class="ex-etapa"><div>{e}</div><div>{d}</div></div>' for e, d in exemplos)
    return f'''
<span class="rotulo">Parte 2 · Eixo {n} de 3</span>
<div class="eixo-cab {k}"><span class="bola">{k.upper()}</span><h1 style="margin:0">{titulo}</h1></div>
<p class="linha-fina" style="margin-top:3mm">{intro}</p>
<div class="cols2" style="gap:3mm">{cs}</div>
<h2>Na sala de aula, etapa por etapa</h2>
{ex}
<div class="janela" style="margin-top:4mm"><div class="barra"><i></i><i></i><i></i><span>cuidado.txt</span></div><div class="corpo">{cuidado}</div></div>'''


EIXOS_PAGINAS = [
    ('pc', 1, 'Pensamento computacional',
     'É a parte da Computação que ensina a resolver problemas de forma organizada e precisa. Não depende de computador: começa com o corpo e com o papel e chega à programação quando a turma já sabe o que quer que a máquina faça.',
     [('Decomposição', 'Dividir um problema grande em partes menores, que dá para resolver uma de cada vez.'),
      ('Padrões', 'Perceber o que se repete entre problemas ou dentro de um mesmo problema, para aproveitar a solução.'),
      ('Abstração', 'Separar o que importa do que pode ser deixado de lado, como um mapa que só mostra as ruas.'),
      ('Algoritmos', 'Escrever passos precisos, com sequência, repetição e decisão, que alguém ou algo possa seguir.')],
     [('Educação Infantil', 'Brincar de robô com setas no chão; separar brinquedos e explicar a regra usada.'),
      ('1º ao 3º ano', 'Ordenar os passos de uma rotina, criar algoritmos com setas e repetições, decidir se uma frase é verdadeira.'),
      ('4º e 5º ano', 'Repetições dentro de repetições, decisões com SE e SENÃO, organizar dados em tabelas e listas.'),
      ('6º e 7º ano', 'Programar com sequência, repetição e seleção; decompor, generalizar com parâmetros e depurar erros.'),
      ('8º e 9º ano', 'Listas, recursão, algoritmos de busca e ordenação, grafos, árvores e autômatos.'),
      ('Ensino Médio', 'Projetos com programação, modelagem de problemas reais e noções de como funcionam os sistemas de IA.')],
     'Programar não é o objetivo do eixo, é uma das ferramentas. Uma aula em que a turma copia blocos seguindo um tutorial pode ter tela o tempo todo e quase nenhum pensamento computacional. Uma aula com papel, em que cada grupo cria e testa o próprio algoritmo, pode ter muito.'),
    ('md', 2, 'Mundo digital',
     'Trata do que acontece dentro das máquinas e entre elas: como a informação vira número, onde fica guardada, como viaja pela internet e como se protege. É o eixo que tira o computador do lugar de caixa-preta.',
     [('Informação e codificação', 'Tudo o que o computador guarda, de letras a fotos, é representado por números.'),
      ('Hardware e software', 'As peças que se pode tocar e os programas que dizem o que elas devem fazer.'),
      ('Redes e internet', 'Como as mensagens se dividem em pacotes, seguem regras (protocolos) e chegam ao destino.'),
      ('Segurança', 'Senhas, criptografia, golpes e ataques, e o que fazer para se proteger.')],
     [('Educação Infantil', 'Reconhecer aparelhos do dia a dia e para que servem; brincar de mandar recados por códigos de cores.'),
      ('1º ao 3º ano', 'Diferenciar peças e programas, conhecer entradas e saídas, formatos de arquivo e onde as coisas ficam guardadas.'),
      ('4º e 5º ano', 'Números em binário, pixels e cores RGB, componentes do computador, armazenamento local e na nuvem.'),
      ('6º e 7º ano', 'Transmissão em pacotes, organização e compactação de arquivos, protocolos e segurança cibernética.'),
      ('8º e 9º ano', 'Estrutura da internet, processamento em paralelo e distribuído, malwares, ataques e criptografia.'),
      ('Ensino Médio', 'Infraestrutura, dados em grande escala, segurança da informação e o funcionamento de serviços que a turma usa.')],
     'O risco aqui é a aula virar uma lista de nomes de peças para decorar. Prefira atividades em que a turma simula o funcionamento: ser o pacote que viaja, codificar uma imagem com números, tentar descobrir uma senha curta.'),
    ('cd', 3, 'Cultura digital',
     'É o eixo da convivência e da responsabilidade: como as pessoas se comunicam, se informam, criam e se protegem em ambientes digitais, e quais efeitos a tecnologia tem na sociedade e no ambiente.',
     [('Convivência', 'Linguagem respeitosa, empatia com opiniões diferentes, combate ao cyberbullying.'),
      ('Uso crítico', 'Avaliar se uma informação é confiável e reconhecer boatos, vieses e conteúdos patrocinados.'),
      ('Autoria e dados', 'Direitos autorais, uso de imagem, dados pessoais, termos de uso e privacidade.'),
      ('Impactos', 'Consumo e descarte de eletrônicos, desigualdade de acesso, tecnologia e trabalho.')],
     [('Educação Infantil', 'Combinados para o uso de telas, cuidar do corpo, pedir ajuda a um adulto quando algo assusta.'),
      ('1º ao 3º ano', 'Senha é segredo, informação pessoal não se compartilha, criar em formato digital com cuidado.'),
      ('4º e 5º ano', 'Coletar dados com ética, checar fontes, citar quem criou, discutir tecnologia e trabalho.'),
      ('6º e 7º ano', 'Conduta na comunicação digital, cyberbullying, sustentabilidade e produção digital com autoria.'),
      ('8º e 9º ano', 'Redes sociais, dados pessoais, termos de uso, checagem de fatos e problemas sociais da cidade.'),
      ('Ensino Médio', 'Ética da IA, impactos no trabalho, desinformação em escala e participação cidadã.')],
     'Cultura digital não é palestra sobre perigos da internet. A turma aprende mais quando analisa casos parecidos com os dela, decide o que faria e produz algo: um combinado da turma, um guia para os mais novos, uma checagem publicada no mural.'),
]


PROGRESSAO = [
    ('Infantil ao 3º ano', [
        ('Etapa', 'Educação Infantil', '1º ano', '2º ano', '3º ano'),
        ('pc', 'Sequências com o corpo, padrões em brinquedos, classificar por cor e forma',
         'Separar por atributos, continuar padrões, seguir e criar passos com setas',
         'Modelos e atributos, algoritmos com repetições simples, prever o resultado',
         'Verdadeiro e falso, problema em partes, repetir até uma condição, achar erros'),
        ('md', 'Reconhecer aparelhos e para que servem, recados com códigos de cores',
         'O que é informação, guardar e enviar mensagens, a mesma ideia em códigos diferentes',
         'Cada máquina entende um conjunto de instruções, hardware e software',
         'Dado e informação, formatos de arquivo, dispositivos de entrada e saída'),
        ('cd', 'Combinados de uso de telas, pedir ajuda a um adulto',
         'Máquinas que ajudam as pessoas, usar a tecnologia com segurança, senha é segredo',
         'Tecnologias de casa e da escola, cuidados com o corpo ao usar telas',
         'Navegadores e buscadores, criar em formato digital, informação pessoal'),
    ]),
    ('4º ano ao Médio', [
        ('Etapa', '4º e 5º ano', '6º e 7º ano', '8º e 9º ano', 'Ensino Médio'),
        ('pc', 'Matrizes e registros, laços aninhados, listas e grafos, E, OU, NÃO, SE e SENÃO',
         'Tipos de dados, programação com sequência, repetição e seleção, decomposição, parâmetros, depuração, reúso',
         'Recursão, listas, busca e ordenação, grafos, árvores e autômatos',
         'Projetos com programação, modelagem, dados e noções de IA'),
        ('md', 'Binário, pixels e RGB, componentes, armazenamento local e remoto, sistema operacional',
         'Pacotes, gestão de arquivos e metadados, protocolos, segurança cibernética',
         'Estrutura da internet, paralelismo e sistemas distribuídos, malwares, criptografia',
         'Infraestrutura, segurança da informação, dados em grande escala'),
        ('cd', 'Criar com ferramentas digitais, dados com ética, fontes confiáveis, direitos autorais, trabalho',
         'Conduta digital, cyberbullying, consumo e descarte, produção e publicação com autoria',
         'Redes sociais, dados pessoais, termos de uso, privacidade, checagem, problemas sociais',
         'Ética da IA, trabalho, desinformação, participação cidadã'),
    ]),
]


def progressao(n, titulo, linhas, intro):
    cab = linhas[0]
    th = ''.join(f'<th>{c}</th>' for c in cab)
    corpo = ''.join(f'<tr><td><span class="tag {r[0]}">{EIXO[r[0]]}</span></td>{"".join(f"<td>{c}</td>" for c in r[1:])}</tr>' for r in linhas[1:])
    return f'''
<span class="rotulo">Parte 3 · Em que ordem · {n} de 2</span>
<h1>Progressão: <span class="marca">{titulo}</span></h1>
<p class="linha-fina">{intro}</p>
<table class="tab-prog"><thead><tr>{th}</tr></thead><tbody>{corpo}</tbody></table>'''


PROG_INTRO = [
    'Nos primeiros anos, quase tudo acontece com o corpo, com objetos e com o papel. A leitura ainda está se consolidando, então as instruções são faladas e as respostas são desenhos, setas e figuras.',
    'A partir do 4º ano, as mesmas ideias voltam com mais abstração: o que era seta vira programa, o que era recado vira pacote, o que era combinado vira análise de termos de uso. O Ensino Médio aprofunda e aplica em projetos.',
]

PROG_RODAPE = [
    '''<h2>Como ler a tabela</h2>
<p>Cada célula resume o que a turma trabalha naquele eixo e naquele ano, com base nas habilidades do complemento à BNCC. Na Educação Infantil, a Computação aparece dentro dos campos de experiência, sem códigos próprios de ano, e por isso a coluna traz brincadeiras e situações, não conteúdos.</p>
<div class="cols2">
<div class="caixa"><h3>Sinal de que a progressão está funcionando</h3><p>A turma reconhece a ideia de anos anteriores e faz algo novo com ela. Por exemplo: no 2º ano repetia um movimento três vezes; no 3º ano repete até encostar na parede, sem saber quantas vezes.</p></div>
<div class="caixa amarela"><h3>Sinal de alerta</h3><p>A mesma atividade aparece em vários anos sem mudança, como a palestra sobre senhas todo ano. Nesse caso, mantenha o tema e suba a exigência: do combinado no 1º ano à conta das combinações no 7º.</p></div>
</div>
<p class="pequeno">As 32 aulas de cada ano do 1º ao 6º, com folhas e gabaritos, estão em ohtopico.com.br/computacao-ano-a-ano/.</p>''',
    '''<h2>Turmas que nunca tiveram Computação</h2>
<p>Muitas turmas de 6º a 9º ano chegam sem ter visto nada dos anos iniciais. Antes de seguir a tabela, use duas ou três aulas para revisar o essencial: algoritmos com sequência, repetição e decisão; como a informação vira número; combinados de convivência digital. As atividades 4, 5 e 6 deste guia funcionam bem para isso, mesmo sendo do 3º ao 5º ano, se a discussão for mais aprofundada.</p>
<div class="caixa"><h3>Para o Ensino Médio</h3><p>O complemento à BNCC organiza o Ensino Médio em competências e habilidades que aprofundam os mesmos três eixos. A escola pode trabalhá-las em itinerários formativos, em projetos ou integradas às áreas. Um bom ponto de partida é entender como funcionam as ferramentas que a turma já usa, como a inteligência artificial que gera texto (atividade 12).</p></div>
<p class="pequeno">As 42 habilidades do 6º ao 9º ano, cada uma com plano de aula, slides, jogos e fichas, estão em ohtopico.com.br/material-didatico/bncc/.</p>''',
]


def espiral():
    itens = [
        ('Educação Infantil', 'O robô humano anda pelas setas desenhadas no chão.'),
        ('1º ano', 'Ordenar os passos de escovar os dentes e criar um caminho com setas.'),
        ('2º ano', 'Repetir: "três vezes para frente" no lugar de três setas iguais.'),
        ('3º ano', 'Repetir até: "anda até a parede", sem saber quantas vezes.'),
        ('4º ano', 'Repetição dentro de repetição para desenhar uma fileira de quadrados.'),
        ('5º ano', 'Decidir: SE o caminho está livre, ENTÃO anda, SENÃO vira.'),
        ('6º ano', 'Programar juntando sequência, repetição e seleção, com entradas e saídas.'),
        ('7º ano', 'Ler um programa linha por linha, achar e corrigir o erro.'),
        ('8º ano', 'Uma receita que usa a si mesma: recursão e algoritmos de ordenação.'),
        ('9º ano', 'Descrever um comportamento com estados e eventos, como um semáforo.'),
        ('Ensino Médio', 'Projetos com programação que resolvem um problema real da escola.'),
    ]
    marc = {'Educação Infantil', '3º ano', '6º ano', 'Ensino Médio'}
    ls = ''.join(f'<div class="{"d" if e in marc else ""}"><b>{e}</b>{t}</div>' for e, t in itens)
    return f'''
<span class="rotulo">Parte 3 · Em que ordem</span>
<h1>Uma ideia em <span class="marca">espiral</span></h1>
<p class="linha-fina">A melhor forma de enxergar a progressão é seguir uma ideia só ao longo dos anos. Aqui, a ideia de algoritmo, do primeiro passo da Educação Infantil ao projeto do Ensino Médio.</p>
<div class="cols2" style="grid-template-columns:1.25fr 1fr">
<div class="espiral">{ls}</div>
<div>
<div class="caixa pc"><h3>Por que isso importa</h3><p>Cada etapa só funciona se a anterior aconteceu. Quem nunca seguiu uma sequência de setas tem dificuldade para entender um laço; quem nunca usou um laço não entende recursão. Quando a turma trava, volte um degrau, não dois anos.</p></div>
<div class="caixa"><h3>Faça o mesmo com outras ideias</h3><p>Escolha uma ideia de cada eixo e trace o caminho dela na escola:</p><ul><li><b>Mundo digital:</b> recado em cores, binário, pixels, pacotes, criptografia.</li><li><b>Cultura digital:</b> senha é segredo, informação pessoal, dados com ética, termos de uso, privacidade.</li></ul><p>Esse exercício é ótimo para uma reunião pedagógica com professores de vários anos.</p></div>
</div></div>'''


def planejar():
    return '''
<span class="rotulo">Parte 4 · Com quais recursos</span>
<h1>Da habilidade à aula <span class="marca">em 5 passos</span></h1>
<p class="linha-fina">Um roteiro curto para transformar o texto da habilidade em uma aula de 50 minutos. Funciona para qualquer ano e qualquer eixo.</p>
<div class="cols2" style="grid-template-columns:1fr 1fr; gap:6mm">
<ol class="passos">
  <li><span class="num">1</span><span class="t"><b>Sublinhe o verbo</b>Ele diz o que a turma precisa fazer: classificar, elaborar, analisar, criar, discutir. A aula precisa terminar com a turma fazendo isso.</span></li>
  <li><span class="num">2</span><span class="t"><b>Encontre a situação</b>Procure um problema do dia a dia da turma em que a ideia aparece: a fila do lanche, o grupo da turma, o caminho até a escola.</span></li>
  <li><span class="num">3</span><span class="t"><b>Comece sem tela</b>Uma simulação com o corpo, cartões ou papel faz a ideia aparecer antes da ferramenta. Mesmo com laboratório, os primeiros 15 minutos rendem mais assim.</span></li>
  <li><span class="num">4</span><span class="t"><b>Escolha a evidência</b>Decida antes o que a turma vai entregar ou mostrar: uma folha, um programa, uma explicação oral. É isso que você vai avaliar.</span></li>
  <li><span class="num">5</span><span class="t"><b>Feche com a conexão</b>Termine perguntando onde aquilo aparece fora da escola. É o momento em que a ideia vira Computação de verdade para a turma.</span></li>
</ol>
<div>
<div class="caixa md">
<h3>Exemplo preenchido</h3>
<p><span class="cod">EF06CO07</span> Entender como a informação é quebrada em pedaços, transmitida em pacotes por vários equipamentos e reconstruída no destino.</p>
<table>
<tr><td style="width:24mm"><b>1. Verbo</b></td><td>Entender (e, para mostrar que entendeu, reconstruir a mensagem).</td></tr>
<tr><td><b>2. Situação</b></td><td>Uma foto enviada no grupo da família chega em pedaços e se monta no celular de quem recebe.</td></tr>
<tr><td><b>3. Sem tela</b></td><td>A turma vira uma rede: cada estudante é um equipamento que passa pacotes de papel. Um pacote se perde no caminho.</td></tr>
<tr><td><b>4. Evidência</b></td><td>Folha com a mensagem remontada e o pedido de reenvio do pacote que faltou.</td></tr>
<tr><td><b>5. Conexão</b></td><td>Por que um vídeo trava e depois continua? Por que uma foto às vezes carrega aos poucos?</td></tr>
</table>
<p class="pequeno">Essa é a atividade 7 deste guia, nas páginas 26 e 27.</p>
</div>
<div class="caixa amarela"><h3>Quando o tempo é curto</h3><p>Se a escola tem uma aula de Computação a cada 15 dias, junte duas habilidades próximas em uma aula só e deixe a folha do estudante como tarefa de casa. As habilidades da mesma linha da tabela de progressão combinam bem entre si.</p></div>
</div></div>'''


def com_sem_tela():
    return '''
<span class="rotulo">Parte 4 · Com quais recursos</span>
<h1>Com tela e <span class="marca">sem tela</span></h1>
<p class="linha-fina">A Computação desplugada, feita sem computador, não é um plano B para escolas sem laboratório. Ela é a melhor forma de apresentar uma ideia nova. A tela entra para praticar, testar mais casos e criar.</p>
<div class="cols2">
<div class="caixa"><h3>Comece sem tela quando</h3><ul><li>A ideia é nova para a turma.</li><li>Você quer ouvir o raciocínio de cada grupo.</li><li>A turma é pequena demais para o laboratório ou grande demais para os aparelhos.</li><li>A internet é instável ou não existe.</li></ul></div>
<div class="caixa"><h3>Use a tela quando</h3><ul><li>A turma já entendeu e precisa praticar muitos casos.</li><li>O erro precisa aparecer na hora, como ao testar um programa.</li><li>A atividade é de criação: vídeo, site, jogo, apresentação.</li><li>O tema é a própria ferramenta, como configurar a privacidade de uma conta.</li></ul></div>
</div>
<h2>O que dá para fazer com o que a escola tem</h2>
<table>
<tr><th style="width:38mm">A escola tem</th><th>Como organizar a aula</th></tr>
<tr><td>Nenhum equipamento</td><td>Todas as atividades deste guia na versão sem tela. Imprima a folha do estudante ou desenhe no quadro.</td></tr>
<tr><td>Um projetor ou uma TV</td><td>Faça a versão com tela no coletivo: a turma decide os comandos e um estudante por vez executa no computador do professor.</td></tr>
<tr><td>Alguns tablets ou computadores</td><td>Estações: um grupo usa o jogo enquanto os outros fazem a versão sem tela, e os grupos trocam a cada 15 minutos.</td></tr>
<tr><td>Laboratório</td><td>Comece com 10 a 15 minutos sem tela na própria sala e use o restante da aula nas máquinas, em duplas.</td></tr>
</table>
<div class="caixa amarela"><h3>E o celular?</h3><p>A Lei nº 15.100/2025 restringe o uso de celulares pelos estudantes na escola, mas permite o uso com fins pedagógicos, orientado pelo professor. Se a escola optar por isso, combine antes com a coordenação, prefira atividades em duplas e mantenha a versão sem tela pronta para quem não tem aparelho.</p></div>
<p class="pequeno">Todos os jogos e simuladores indicados no guia são gratuitos, abrem no navegador, funcionam em computadores simples e celulares e não pedem cadastro. Vários funcionam sem internet depois de abertos uma vez.</p>'''


def avaliar():
    return '''
<span class="rotulo">Parte 5 · Como saber se aprenderam</span>
<h1>Como <span class="marca">avaliar</span></h1>
<p class="linha-fina">Em Computação, a melhor evidência de aprendizagem é a turma fazendo: explicando um algoritmo, encontrando um erro, justificando uma decisão. Uma prova escrita mede pouco disso. Combine instrumentos simples ao longo do bimestre.</p>
<h2>Instrumentos que cabem na rotina</h2>
<div class="cols2" style="gap:3mm">
<div class="caixa" style="margin:0"><h4>Observação com lista</h4><p style="margin:0">Durante a atividade, marque na lista da turma (página 40) quem já faz sozinho, quem precisa de ajuda e quem ainda não começou.</p></div>
<div class="caixa" style="margin:0"><h4>Folha do estudante</h4><p style="margin:0">Cada atividade do guia tem uma. Ela mostra o raciocínio, não só a resposta. Leia procurando o caminho.</p></div>
<div class="caixa" style="margin:0"><h4>Explicação oral</h4><p style="margin:0">Peça que um estudante explique o algoritmo do colega. Explicar o de outra pessoa é mais difícil e mais revelador.</p></div>
<div class="caixa" style="margin:0"><h4>Produção</h4><p style="margin:0">Um programa, um cartaz, um combinado da turma. Avalie com critérios combinados antes de começar.</p></div>
</div>
<h2>Rubrica em três níveis</h2>
<p>Serve para qualquer habilidade. Troque os exemplos pelos da sua aula.</p>
<table>
<tr><th style="width:30mm">Nível</th><th>O que o estudante faz</th><th style="width:58mm">Exemplo: algoritmos com repetição</th></tr>
<tr><td><b>Em início</b></td><td>Reconhece a ideia quando o professor mostra, mas ainda não usa sozinho.</td><td>Segue um algoritmo com repetição pronto, com ajuda.</td></tr>
<tr><td><b>Em desenvolvimento</b></td><td>Usa a ideia em situações parecidas com as da aula, às vezes com erros que consegue corrigir quando avisado.</td><td>Cria um algoritmo com repetição para um caminho parecido; corrige quando o robô bate.</td></tr>
<tr><td><b>Consolidado</b></td><td>Usa a ideia em situações novas, explica por que funciona e ajuda colegas.</td><td>Escolhe entre repetir um número de vezes e repetir até, e explica a escolha.</td></tr>
</table>
<div class="janela"><div class="barra"><i></i><i></i><i></i><span>erro.txt</span></div><div class="corpo">Em Computação, o erro faz parte do método. Programadores profissionais passam boa parte do tempo procurando e corrigindo erros. Valorize a turma que encontrou o próprio erro e explicou como corrigiu: isso é uma evidência de aprendizagem, não de fracasso.</div></div>'''


# ---------------------------------------------------------------- atividades

def pag_professor(i, a):
    passos = ''.join(f'<li>{p}</li>' for p in a['sem'])
    aval = ''.join(f'<li>{x}</li>' for x in a['avaliar'])
    hab = (f'<span class="cod">{a["cod"]}</span> {a["hab"]}' if a.get('cod') else a['hab'])
    gab = f'<div class="gab"><b>Gabarito e respostas esperadas.</b> {a["gab"]}</div>' if a.get('gab') else ''
    dica = f'<div class="caixa amarela" style="margin-top:3mm"><h4>Dica e inclusão</h4><p style="margin:0">{a["dica"]}</p></div>' if a.get('dica') else ''
    fecha = f'<div class="caixa" style="margin-top:3mm"><h4>Para fechar a aula</h4><p style="margin:0">{a["fechar"]}</p></div>'
    return f'''<div class="at">
<div class="at-cab"><div class="n"><span>{i}</span>Atividade · orientação para o professor</div>
<div class="tags"><span class="tag esc">{a["etapa"]}</span><span class="tag {a["eixo"]}">{EIXO[a["eixo"]]}</span></div></div>
<h1>{a["titulo"]}</h1>
<div class="hab {a["eixo"]}">{hab}</div>
<div class="meta"><div><b>Tempo</b>{a["tempo"]}</div><div><b>Materiais</b>{a["materiais"]}</div><div><b>Objetivo</b>{a["objetivo"]}</div></div>
<div class="duas-versoes">
<div class="versao"><h3>Sem tela <span class="ic">funciona em qualquer escola</span></h3><ol>{passos}</ol></div>
<div class="versao tela"><h3>Com tela</h3><p>{a["tela_txt"]}</p><span class="link">{a["tela_link"]}</span>
<h3>Para avaliar</h3><ul class="avaliar">{aval}</ul></div>
</div>
{fecha}{dica}{gab}
</div>'''


def pag_estudante(i, a):
    return f'''<div class="folha">
<div class="folha-cab"><b>Folha do estudante · Atividade {i}</b><div class="campos"><span>Nome:</span><span class="curto">Turma:</span><span class="curto">Data:</span></div></div>
<h1>{a["titulo"]}</h1>
{a["folha"]}
</div>'''


def folha_ei():
    conteudo = {(0, 4): INICIO, (3, 1): HORTA, (1, 3): PEDRA, (2, 2): PEDRA, (4, 3): PEDRA}
    vagas = ''.join('<div style="width:17mm;height:17mm;border:1.4px dashed #111;border-radius:2mm"></div>' for _ in range(8))
    setas = ''.join(seta(d, 15) for d in ['cima'] * 4 + ['direita'] * 4 + ['baixo'] * 2 + ['esquerda'] * 2)
    return f'''
<p class="instr"><b class="n">1</b>Ajude o robô a sair do círculo e chegar à horta sem passar pelas pedras. Cole as setas na ordem certa nos quadrados.</p>
<div style="display:flex;gap:8mm;align-items:center;justify-content:center">{malha(5, 5, 21, conteudo)}
<div class="pequeno" style="width:38mm"><p>{INICIO_SVG} início</p><p>{HORTA_SVG} horta</p><p>{PEDRA_SVG} pedra</p></div></div>
<p class="instr" style="margin-top:4mm"><b class="n">2</b>Cole aqui as setas do caminho:</p>
<div style="display:flex;gap:3mm;flex-wrap:wrap">{vagas}</div>
<div class="recorte"><div style="display:flex;gap:2.6mm;flex-wrap:wrap;justify-content:center">{setas}</div></div>'''


INICIO_SVG = f'<svg width="7mm" height="7mm" viewBox="0 0 10 10" style="vertical-align:middle">{INICIO}</svg>'
HORTA_SVG = f'<svg width="7mm" height="7mm" viewBox="0 0 10 10" style="vertical-align:middle">{HORTA}</svg>'
PEDRA_SVG = f'<svg width="7mm" height="7mm" viewBox="0 0 10 10" style="vertical-align:middle">{PEDRA}</svg>'


def folha_classificar():
    figs = [('circulo', 'vermelho', True), ('circulo', 'vermelho', False), ('quadrado', 'azul', True), ('triangulo', 'azul', False),
            ('triangulo', 'azul', True), ('quadrado', 'vermelho', False), ('triangulo', 'vermelho', True), ('circulo', 'azul', False)]
    fs = ''.join(figura(*f, tam_mm=24) for f in figs)
    padrao = ''.join(figura(f, c, True, tam_mm=19) for f, c in [('circulo', 'azul'), ('quadrado', 'vermelho')] * 2 + [('circulo', 'azul')])
    return f'''
<p class="instr"><b class="n">1</b>Recorte as figuras. Separe em duas caixas do jeito que você quiser e cole.</p>
<div class="caixas2"><div>Caixa 1</div><div>Caixa 2</div></div>
<p class="instr" style="margin-top:3mm"><b class="n">2</b>Qual foi a sua regra? Desenhe ou escreva.</p>
<div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">3</b>Desenhe a figura que vem depois.</p>
<div style="display:flex;gap:2.4mm;align-items:center">{padrao}<div style="width:19mm;height:19mm;border:1.6px solid #111;border-radius:2mm;display:grid;place-items:center;font:600 16pt Fredoka">?</div></div>
<div class="recorte"><div class="figs">{fs}</div></div>'''


def folha_hardware():
    itens = ['Teclado', 'Jogo do tablet', 'Mouse', 'Aplicativo de mensagens', 'Impressora', 'Programa de desenho', 'Tela', 'Navegador de internet', 'Fone de ouvido', 'Câmera']
    linhas = ''.join(f'<tr><td style="font-size:11pt">{t}</td><td></td><td></td></tr>' for t in itens)
    return f'''
<p class="instr"><b class="n">1</b>A professora vai ler cada nome. Marque um X: é uma <b>peça</b>, que dá para tocar, ou um <b>programa</b>, que dá instruções para a máquina?</p>
<table style="font-size:10pt"><tr><th></th><th style="width:42mm;text-align:center">Peça (hardware)</th><th style="width:42mm;text-align:center">Programa (software)</th></tr>{linhas}</table>
<p class="instr" style="margin-top:4mm"><b class="n">2</b>Desenhe um computador ou um tablet. Ligue com uma seta duas peças e escreva o nome delas.</p>
<div style="border:1.4px solid #111;border-radius:3mm;height:72mm"></div>'''


def folha_repetir():
    corredores = []
    for k, ini in enumerate([0, 2, 4]):
        cont = {(ini, 0): ROBO}
        parede = '<rect x="70" y="-0.5" width="3" height="11" fill="#111"/>'
        svg = malha(7, 1, 17, cont).replace('</svg>', parede + '</svg>').replace('viewBox="-0.5 -0.5 71 11"', 'viewBox="-0.5 -0.5 74 11"').replace('width="119mm"', 'width="124mm"')
        corredores.append(f'<div style="display:flex;align-items:center;gap:4mm;margin-bottom:3mm"><b style="font:600 13pt Fredoka;width:8mm">{"ABC"[k]}</b>{svg}<span class="pequeno">parede</span></div>'
                          f'<p style="margin:0 0 4mm 12mm">O robô andou ______ casas.</p>')
    return f'''
<p class="instr"><b class="n">1</b>O programa do robô é sempre o mesmo:</p>
<div class="cod-bloco" style="margin-bottom:4mm">repita até bater na parede:<br><span class="in">ande uma casa</span></div>
<p class="instr"><b class="n">2</b>Em cada corredor, faça um X na casa onde o robô vai parar e conte quantas casas ele andou.</p>
{''.join(corredores)}
<p class="instr"><b class="n">3</b>Agora o programa é <b>ande 4 casas</b>. Em qual corredor o robô bate na parede antes de terminar? ______</p>
<p class="instr"><b class="n">4</b>Qual programa funciona nos três corredores? Por quê?</p>
<div class="linha"></div><div class="linha"></div>'''


CORACAO = ['01100110', '11111111', '11111111', '11111111', '01111110', '00111100', '00011000', '00000000']


def folha_pixels():
    linhas = ''.join(f'<div style="height:11mm;display:flex;align-items:center;font:600 11pt Lexend;letter-spacing:1.6mm">{l}</div>' for l in CORACAO)
    vazias = ''.join('<div style="height:8mm;border-bottom:1px solid #111"></div>' for _ in range(8))
    return f'''
<p class="instr"><b class="n">1</b>Cada linha de números é uma linha da imagem. O <b>1</b> quer dizer pintar o quadradinho; o <b>0</b> quer dizer deixar em branco. Pinte e descubra a figura.</p>
<div style="display:flex;gap:6mm;align-items:flex-start;justify-content:center"><div style="padding-top:.5mm">{linhas}</div>{malha(8, 8, 11)}</div>
<p class="instr" style="margin-top:5mm"><b class="n">2</b>Crie a sua imagem na malha. Depois escreva o código de cada linha para um colega pintar.</p>
<div style="display:flex;gap:6mm;align-items:flex-start;justify-content:center">{malha(8, 8, 8)}<div style="width:62mm">{vazias}</div></div>
<p class="instr" style="margin-top:4mm"><b class="n">3</b>Quantos quadradinhos pintados tem o coração? ______</p>'''


POSTS = [
    ('A', 'Mensagem encaminhada muitas vezes · sem data', 'URGENTE! A escola vai fechar amanhã por causa do calor. Compartilhe com todos os grupos agora!'),
    ('B', 'Site da prefeitura · publicado em 3 de novembro', 'A Secretaria de Saúde divulga o calendário de vacinação nas escolas do município. Veja os dias de cada escola.'),
    ('C', 'Site desconhecido, com muitos anúncios', 'Cientistas descobrem: comer chocolate deixa qualquer pessoa mais inteligente em um dia. Clique e veja o segredo.'),
    ('D', 'Jornal da cidade · reportagem assinada · 10 de novembro', 'A biblioteca municipal vai abrir também aos sábados de manhã a partir de dezembro, informou a diretora.'),
]


def folha_fontes():
    ps = ''.join(f'<div class="post"><div class="de"><span class="letra">{l}</span>{d}</div>{t}</div>' for l, d, t in POSTS)
    cab = '<tr><th></th><th>Diz quem escreveu?</th><th>Tem data?</th><th>Pede pressa para compartilhar?</th><th>Parece bom demais ou assustador demais?</th><th>Confiável?</th></tr>'
    linhas = ''.join(f'<tr><td style="font:600 12pt Fredoka;text-align:center">{l}</td><td></td><td></td><td></td><td></td><td></td></tr>' for l, *_ in POSTS)
    return f'''
<p class="instr"><b class="n">1</b>Leia as quatro publicações. Todas foram inventadas para esta atividade.</p>
<div class="cols2" style="gap:3mm">{ps}</div>
<p class="instr" style="margin-top:4mm"><b class="n">2</b>Responda sim ou não para cada publicação.</p>
<table style="font-size:9pt">{cab}{"".join(linhas)}</table>
<style>.folha table td {{ height: 11mm; }}</style>
<p class="instr" style="margin-top:3mm"><b class="n">3</b>Escolha uma publicação que você marcou como não confiável. O que você faria antes de compartilhar?</p>
<div class="linha"></div><div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">4</b>Escreva uma regra para a turma sobre compartilhar notícias.</p>
<div class="linha"></div>'''


PACOTES = ['A REUNIÃO', 'SERÁ', 'NA SALA', '12', 'ÀS', '14H']
RECEBIDOS = [4, 1, 6, 2, 5]


def pacote(n, total, texto, de='Ana', para='Léo'):
    return f'<div class="pac"><div class="h"><span>De: {de} · Para: {para}</span><span>Pacote {n} de {total}</span></div><div class="c">{texto}</div></div>'


def folha_pacotes():
    rec = ''.join(pacote(n, 6, PACOTES[n - 1]) for n in RECEBIDOS)
    vazios = ''.join(f'<div class="pac"><div class="h"><span>De: ____ Para: ____</span><span>Pacote __ de __</span></div><div class="c"></div></div>' for _ in range(6))
    return f'''
<p class="instr"><b class="n">1</b>Léo recebeu estes pacotes, nesta ordem. Monte a mensagem.</p>
<div class="cols3" style="gap:2.4mm">{rec}</div>
<p style="margin-top:3mm">Mensagem montada:</p><div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">2</b>Um pacote se perdeu. Qual? ______ Escreva o pedido que o computador do Léo manda para o da Ana:</p>
<div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">3</b>Por que cada pacote leva o número e o total?</p>
<div class="linha"></div><div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">4</b>Escreva uma mensagem curta, divida em pacotes, recorte e entregue para a rede da turma.</p>
<div class="recorte"><div class="cols3" style="gap:2.4mm">{vazios}</div></div>'''


NOTAS = [6, 8, 7, 9]


def teste_mesa():
    """Valores do algoritmo com erro (soma recebe a nota) e do correto."""
    soma_err, soma_ok, linhas = 0, 0, []
    for n in NOTAS:
        soma_err = n
        soma_ok += n
        linhas.append((n, soma_err))
    return linhas, soma_err / len(NOTAS), soma_ok / len(NOTAS)


def br(x):
    return f'{x:.2f}'.rstrip('0').rstrip('.').replace('.', ',')


def folha_bugs():
    vazias = ''.join('<tr><td style="height:9mm"></td><td></td><td></td></tr>' for _ in range(5))
    return f'''
<p class="instr"><b class="n">1</b>Este algoritmo deveria calcular a média das notas de uma estudante. Leia com atenção.</p>
<div class="cod-bloco">
<span class="l">1</span>soma ← 0<br>
<span class="l">2</span>para cada nota na lista [{", ".join(map(str, NOTAS))}]:<br>
<span class="l">3</span><span class="in">soma ← nota</span><br>
<span class="l">4</span>media ← soma / {len(NOTAS)}<br>
<span class="l">5</span>se media &gt; 7:<br>
<span class="l">6</span><span class="in">escreva "aprovada"</span><br>
<span class="l">7</span>senão:<br>
<span class="l">8</span><span class="in">escreva "em recuperação"</span>
</div>
<p class="instr" style="margin-top:3mm"><b class="n">2</b>Faça o teste de mesa: anote o valor de cada variável a cada volta.</p>
<table style="font-size:10pt"><tr><th>Volta</th><th>nota</th><th>soma</th></tr>{vazias}</table>
<p>No fim: media = ________ e o algoritmo escreve: ______________________</p>
<p class="instr" style="margin-top:3mm"><b class="n">3</b>A média dessas notas deveria ser ______. Em qual linha está o erro? ______ Como corrigir?</p>
<div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">4</b>A escola aprova quem tem média 7 ou mais. Existe outro erro? Em qual linha? O que mudaria?</p>
<div class="linha"></div><div class="linha"></div>'''


def tempo_extenso(seg):
    unidades = [(31557600, 'anos'), (86400, 'dias'), (3600, 'horas'), (60, 'minutos')]
    for s, nome in unidades:
        if seg >= s:
            v = seg / s
            if v >= 1e6:
                return f'cerca de {br(v / 1e6)} milhões de {nome}'
            return f'cerca de {br(round(v, 1))} {nome}'
    return f'{seg} segundos'


SENHAS = [('3 algarismos (como um cadeado de mala)', 10, 3), ('4 algarismos', 10, 4), ('6 algarismos', 10, 6),
          ('6 letras minúsculas', 26, 6), ('8 caracteres: letras maiúsculas, minúsculas e algarismos', 62, 8)]


def milhar(n):
    return f'{n:,}'.replace(',', '.')


def folha_senhas():
    linhas = ''.join(f'<tr><td>{t}</td><td style="text-align:center">{b}</td><td style="text-align:center">{c}</td><td></td><td></td></tr>' for t, b, c in SENHAS)
    return f'''
<p class="instr"><b class="n">1</b>Um cadeado de 1 algarismo tem 10 senhas possíveis (de 0 a 9). Com 2 algarismos, são 10 × 10 = 100. Complete a tabela.</p>
<table style="font-size:9.4pt"><tr><th>Tipo de senha</th><th style="width:22mm">Opções em cada posição</th><th style="width:18mm">Posições</th><th style="width:40mm">Senhas possíveis</th><th style="width:34mm">Tempo testando 1 por segundo</th></tr>{linhas}</table>
<style>.folha table td {{ height: 12mm; }}</style>
<p class="instr" style="margin-top:3mm"><b class="n">2</b>O que aumenta mais a quantidade de senhas: usar mais tipos de caracteres ou mais posições? Explique com números da tabela.</p>
<div class="linha"></div><div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">3</b>Um computador consegue testar bilhões de senhas por segundo. O que isso muda nas suas respostas?</p>
<div class="linha"></div><div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">4</b>Qual é mais segura? Marque e explique.</p>
<p>( ) Bia2012 &nbsp;&nbsp;&nbsp; ( ) girafa azul come pastel na chuva &nbsp;&nbsp;&nbsp; ( ) 123456</p>
<div class="linha"></div>'''


TERMOS = [
    'Para usar o FotoTurma, você precisa ter 13 anos ou mais.',
    'Coletamos seu nome, e-mail, data de nascimento, as fotos que você publica, a localização do aparelho e a sua lista de contatos.',
    'As fotos publicadas podem ser usadas pelo FotoTurma em propagandas do aplicativo, sem pagamento a você.',
    'Podemos compartilhar seus dados com empresas parceiras para mostrar anúncios.',
    'Você pode excluir sua conta nas configurações. Fotos que outras pessoas já compartilharam podem continuar visíveis.',
    'Estes termos podem mudar a qualquer momento. Avisaremos pelo aplicativo.',
]


def folha_termos():
    ts = ''.join(f'<li>{t}</li>' for t in TERMOS)
    perguntas = ['Qual é a idade mínima?', 'Quais dados o aplicativo coleta?', 'Algum dado parece desnecessário para um app de fotos? Qual?',
                 'Quem mais recebe os seus dados?', 'O que pode acontecer com as suas fotos?', 'Se você sair do app, tudo some?']
    linhas = ''.join(f'<tr><td>{p}</td><td style="text-align:center"></td><td></td></tr>' for p in perguntas)
    return f'''
<p class="instr"><b class="n">1</b>Leia os termos de uso do FotoTurma, um aplicativo inventado para compartilhar fotos de trabalhos da escola.</p>
<div class="termos"><b style="font-family:Fredoka;font-size:12pt">Termos de uso do FotoTurma</b><ol>{ts}</ol></div>
<p class="instr" style="margin-top:3mm"><b class="n">2</b>Responda indicando o número da cláusula.</p>
<table style="font-size:9.4pt"><tr><th>Pergunta</th><th style="width:20mm">Cláusula</th><th style="width:80mm">Resposta em palavras simples</th></tr>{linhas}</table>
<style>.folha table td {{ height: 12mm; }}</style>
<p class="instr" style="margin-top:3mm"><b class="n">3</b>Você aceitaria esses termos? Reescreva uma cláusula do jeito que seria justo para quem usa.</p>
<div class="linha"></div><div class="linha"></div>'''


MSG1, K1 = 'COMPUTACAO NA ESCOLA', 3
MSG2, K2 = 'A SENHA FORTE PROTEGE', 5


def disco(raio_mm, texto_fora=True):
    import math
    letras = [chr(65 + i) for i in range(26)]
    r = 50
    t = ''.join(
        f'<text x="{50 + (r - 7) * math.sin(2 * math.pi * i / 26):.2f}" y="{50 - (r - 7) * math.cos(2 * math.pi * i / 26) + 2.4:.2f}" '
        f'transform="rotate({360 * i / 26:.2f} {50 + (r - 7) * math.sin(2 * math.pi * i / 26):.2f} {50 - (r - 7) * math.cos(2 * math.pi * i / 26):.2f})" '
        f'text-anchor="middle" font-family="Lexend" font-weight="600" font-size="6.4">{l}</text>' for i, l in enumerate(letras))
    divs = ''.join(
        f'<line x1="{50 + (r - 13) * math.sin(2 * math.pi * (i + .5) / 26):.2f}" y1="{50 - (r - 13) * math.cos(2 * math.pi * (i + .5) / 26):.2f}" '
        f'x2="{50 + r * math.sin(2 * math.pi * (i + .5) / 26):.2f}" y2="{50 - r * math.cos(2 * math.pi * (i + .5) / 26):.2f}" stroke="#111" stroke-width=".3"/>' for i in range(26))
    return (f'<svg width="{raio_mm * 2}mm" height="{raio_mm * 2}mm" viewBox="-1 -1 102 102"><circle cx="50" cy="50" r="{r}" fill="#fff" stroke="#111" stroke-width=".6" stroke-dasharray="2 1.4"/>'
            f'<circle cx="50" cy="50" r="{r - 13}" fill="none" stroke="#111" stroke-width=".4"/>{divs}{t}<circle cx="50" cy="50" r="1.4" fill="#111"/></svg>')


def folha_cifra():
    return f'''
<p class="instr"><b class="n">1</b>Recorte os dois discos. Coloque o menor sobre o maior e prenda no centro com um clipe ou um alfinete com tampinha. Girando, cada letra de fora aponta para uma letra de dentro.</p>
<div class="recorte"><div style="display:flex;justify-content:space-around;align-items:center">{disco(38)}{disco(27)}</div></div>
<p class="instr" style="margin-top:4mm"><b class="n">2</b>Esta mensagem foi cifrada andando {K1} letras para frente (A vira {cesar("A", K1)}). Decifre.</p>
<p style="font:600 14pt Lexend;letter-spacing:1.4mm;text-align:center;margin:2mm 0">{cesar(MSG1, K1)}</p>
<div class="linha"></div>
<p class="instr" style="margin-top:4mm"><b class="n">3</b>Esta outra usa uma chave que você não sabe. Dica: a primeira palavra tem uma letra só, e em português a palavra de uma letra mais comum é <b>A</b>.</p>
<p style="font:600 14pt Lexend;letter-spacing:1.4mm;text-align:center;margin:2mm 0">{cesar(MSG2, K2)}</p>
<p>Chave: ______ &nbsp; Mensagem:</p><div class="linha"></div>
<p class="instr" style="margin-top:4mm"><b class="n">4</b>Quantas chaves diferentes existem na cifra de César? Por que ela não serve para proteger as mensagens de hoje?</p>
<div class="linha"></div><div class="linha"></div>'''


FRASES = ['a turma gosta de programar', 'a turma gosta de jogar', 'a turma gosta de programar robôs', 'a professora gosta de ler',
          'a turma lê no pátio', 'a professora gosta de programar', 'a turma gosta de desenhar', 'o grupo gosta de programar']


def contar_seguintes(palavras_antes):
    """Conta as palavras que aparecem logo depois de uma sequência, em todas as frases."""
    k = len(palavras_antes)
    cont = {}
    for f in FRASES:
        p = f.split()
        for i in range(len(p) - k):
            if p[i:i + k] == palavras_antes:
                cont[p[i + k]] = cont.get(p[i + k], 0) + 1
    return dict(sorted(cont.items(), key=lambda x: -x[1]))


def folha_ia():
    fs = ''.join(f'<li>{f}</li>' for f in FRASES)
    def tab(rot):
        return (f'<table style="font-size:9.6pt;margin:1mm 0 3mm"><tr><th>Depois de "{rot}" vem...</th><th style="width:30mm">Quantas vezes</th></tr>'
                + ''.join('<tr><td style="height:8mm"></td><td></td></tr>' for _ in range(4)) + '</table>')
    return f'''
<p class="instr"><b class="n">1</b>Estas são todas as frases que a nossa "máquina" já leu. Ela só aprende com elas.</p>
<div class="caixa" style="margin:0 0 3mm"><ol style="columns:2;margin:0">{fs}</ol></div>
<p class="instr"><b class="n">2</b>Conte quais palavras aparecem logo depois de cada trecho.</p>
<div class="cols3" style="gap:3mm"><div>{tab("a")}</div><div>{tab("turma")}</div><div>{tab("gosta de")}</div></div>
<p class="instr"><b class="n">3</b>Comece com "a" e escolha sempre a palavra mais frequente. Que frase a máquina escreve?</p>
<div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">4</b>A máquina sabe se a frase é verdadeira para a sua turma? O que aconteceria se ela só tivesse lido frases sobre um grupo de pessoas?</p>
<div class="linha"></div><div class="linha"></div>
<p class="instr" style="margin-top:3mm"><b class="n">5</b>Escreva uma frase nova que a máquina nunca conseguiria criar só com essas frases. Por quê?</p>
<div class="linha"></div>'''


def atividades():
    linhas_mesa, media_err, media_ok = teste_mesa()
    mesa = '; '.join(f'volta {i + 1}: nota {n}, soma {s}' for i, (n, s) in enumerate(linhas_mesa))
    senhas_gab = '; '.join(f'{t.split(":")[0].split(" (")[0]}: {milhar(b ** c)} ({tempo_extenso(b ** c)})' for t, b, c in SENHAS)
    a_seg, turma_seg, gosta_seg = contar_seguintes(['a']), contar_seguintes(['turma']), contar_seguintes(['gosta', 'de'])
    fmt = lambda d: ', '.join(f'{p} ({n})' for p, n in d.items())
    frase = 'a ' + next(iter(a_seg)) + ' ' + next(iter(turma_seg)) + ' de ' + next(iter(gosta_seg))
    pintados = sum(l.count('1') for l in CORACAO)
    return [
        dict(etapa='Educação Infantil', eixo='pc', titulo='O caminho até a horta', fechar='Onde mais seguimos uma sequência de passos para chegar a um lugar? (O caminho da sala até o refeitório, a fila do parque.)',
             hab='Campos de experiência "Corpo, gestos e movimentos" e "Espaços, tempos, quantidades, relações e transformações": seguir e criar sequências de deslocamento, antecipar onde se vai chegar.',
             tempo='30 a 40 minutos', materiais='Fita crepe, cartões de seta, um objeto para ser a horta', objetivo='Seguir e criar uma sequência de comandos para chegar a um lugar.',
             sem=['Marque no chão uma malha de 5 por 5 quadrados com fita crepe. Coloque a "horta" em um quadrado e duas ou três "pedras" em outros.',
                  'Uma criança é o robô e só anda quando recebe um cartão: uma seta, um passo. Comece você mostrando os cartões.',
                  'Antes de o robô andar, pergunte: "Onde ele vai chegar?". Deixe as crianças apontarem.',
                  'Em pequenos grupos, as crianças colocam os cartões em fila no chão e depois o robô executa a fila inteira.',
                  'Se o robô pisar em uma pedra, a turma procura o cartão errado e troca. Comemore a correção.',
                  'Para fechar, as crianças colam as setas na folha, com ajuda.'],
             tela_txt='Em duplas, no tablet ou no computador, com o jogo Robô Ajudante, que não pede leitura: as crianças organizam as setas para o robô buscar as maçãs.',
             tela_link=f'{SITE}/material-didatico/jogos/robo-ajudante.html',
             avaliar=['Executa uma sequência de setas sem pular passos.', 'Antecipa onde o robô vai chegar.', 'Percebe o erro e sugere outra seta.'],
             dica='Para crianças com deficiência visual, troque a malha por uma trilha de tapetes com texturas diferentes e os cartões por setas em relevo, feitas com barbante colado.',
             gab='Um caminho possível: cima, cima, cima, direita, direita, direita. Há outros; vale qualquer caminho que não passe pelas pedras.',
             folha=folha_ei()),
        dict(etapa='1º ano', eixo='pc', titulo='Separar e dizer a regra', fechar='Onde as coisas são separadas por uma regra? (O mercado, a estante da sala, as pastas do computador.)', cod='EF01CO01',
             hab='Organizar objetos físicos ou digitais considerando diferentes características para esta organização, explicitando semelhanças (padrões) e diferenças.',
             tempo='50 minutos', materiais='Uma caixa com objetos da sala (tampinhas, lápis, blocos), tesoura, cola', objetivo='Classificar objetos por um atributo e explicar a regra usada.',
             sem=['Espalhe os objetos em uma mesa. Separe em dois montes sem dizer a regra e pergunte: "Que regra eu usei?".',
                  'Em grupos, as crianças separam os objetos com uma regra secreta. Os outros grupos tentam adivinhar.',
                  'Mostre que os mesmos objetos podem ser separados de jeitos diferentes: cor, tamanho, forma, para que servem.',
                  'Faça um padrão com objetos (tampinha, lápis, tampinha, lápis) e pergunte o que vem depois.',
                  'Na folha, cada criança recorta, separa, cola e desenha ou escreve a regra.'],
             tela_txt='Jogo Caixas Arrumadas, sem leitura: separar objetos pela cor, pela forma e pelo uso, completar padrões e achar o diferente.',
             tela_link=f'{SITE}/material-didatico/jogos/caixas-arrumadas.html',
             avaliar=['Separa usando um atributo de cada vez.', 'Explica a regra com palavras ou desenho.', 'Continua um padrão simples.'],
             dica='Ofereça figuras grandes e recortadas previamente para quem ainda tem dificuldade com a tesoura. A regra pode ser dita em voz alta e registrada pela professora.',
             gab='Várias regras valem: cor (vermelhos e azuis), tamanho (grandes e pequenos) ou forma. No padrão, a próxima figura é o quadrado vermelho.',
             folha=folha_classificar()),
        dict(etapa='2º ano', eixo='md', titulo='Peça ou programa?', fechar='O que acontece com um tablet sem nenhum programa? E com um jogo sem nenhum aparelho para rodar?', cod='EF02CO04',
             hab='Diferenciar componentes físicos (hardware) e programas que fornecem as instruções (software) para o hardware.',
             tempo='50 minutos', materiais='Um computador velho ou fotos de peças, cartões com nomes de programas', objetivo='Diferenciar hardware e software com exemplos do dia a dia.',
             sem=['Pergunte: "Dá para pegar um jogo com a mão?". Deixe a turma discutir.',
                  'Mostre peças de verdade (teclado, mouse, fone) e passe de mão em mão. Explique: são peças, o hardware.',
                  'Conte que, para a peça funcionar, alguém escreveu instruções: o programa, o software. Compare com uma receita e a panela.',
                  'Faça uma brincadeira: você diz um nome e a turma levanta a mão se é peça ou bate palmas se é programa.',
                  'Na folha, leia cada item em voz alta enquanto as crianças marcam.'],
             tela_txt='No jogo Oficina do Computador, em 3D, a turma conhece e monta as peças. Depois, abra um programa de desenho e pergunte: "Isso é peça ou programa?".',
             tela_link=f'{SITE}/material-didatico/jogos/partes-computador.html',
             avaliar=['Classifica corretamente a maioria dos itens.', 'Dá um exemplo novo de peça e de programa.', 'Explica que o programa dá instruções para a peça.'],
             dica='Se a escola tiver um computador quebrado, abra o gabinete com a turma (sem energia). Ver as peças por dentro costuma ser o momento mais lembrado do ano.',
             gab='Peças (hardware): teclado, mouse, impressora, tela, fone de ouvido, câmera. Programas (software): jogo do tablet, aplicativo de mensagens, programa de desenho, navegador de internet.',
             folha=folha_hardware()),
        dict(etapa='3º ano', eixo='pc', titulo='Repetir até a parede', fechar='Que tarefas da casa a gente repete até alguma coisa acontecer? (Mexer até engrossar, regar até a terra ficar úmida.)', cod='EF03CO02',
             hab='Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, que incluam sequências e repetições simples e aninhadas, além de repetições condicionais.',
             tempo='50 minutos', materiais='Espaço livre na sala ou no pátio, folha impressa', objetivo='Perceber quando usar "repita até" no lugar de "repita um número de vezes".',
             sem=['Coloque três estudantes a distâncias diferentes de uma parede. Dê a ordem "ande 4 passos" para os três. O que acontece?',
                  'Agora dê a ordem "ande até encostar na parede". Compare: qual funcionou para todos?',
                  'Escreva no quadro as duas formas: "repita 4 vezes" e "repita até bater na parede". Explique que a segunda tem uma condição.',
                  'Peça exemplos do dia a dia: "mexa até ficar homogêneo", "espere até o sinal abrir".',
                  'Resolva a folha em duplas e corrija simulando com o corpo.'],
             tela_txt='No jogo Anda Até Bater, sem leitura, a turma programa o robô com o bloco "anda até a parede" e descobre quando ele é melhor que contar as casas.',
             tela_link=f'{SITE}/material-didatico/jogos/anda-ate-bater.html',
             avaliar=['Simula corretamente onde o robô para.', 'Explica por que "repita até" funciona nos três corredores.', 'Dá um exemplo de repetição com condição do dia a dia.'],
             gab='O robô para sempre na última casa, junto da parede. Casas andadas: A, 6; B, 4; C, 2. Com "ande 4 casas", o robô do corredor C bate na parede antes de terminar (só há 2 casas livres). "Repita até bater na parede" funciona nos três, porque não depende de onde o robô começa.',
             folha=folha_repetir()),
        dict(etapa='4º ano', eixo='md', titulo='Imagem feita de números', fechar='Por que uma foto com mais pixels ocupa mais espaço no celular?', cod='EF04CO05',
             hab='Codificar diferentes informações para representação em computador (binária, ASCII, atributos de pixel, como RGB etc.).',
             tempo='50 minutos', materiais='Folha impressa, lápis preto ou de cor', objetivo='Entender que uma imagem digital é guardada como números.',
             sem=['Amplie uma foto no projetor ou no celular até aparecerem os quadradinhos. Conte que cada um é um pixel.',
                  'Desenhe no quadro uma malha de 4 por 4 e pinte uma figura simples. Escreva o código de cada linha com 1 e 0.',
                  'Dite outro código e a turma pinta no caderno. Confiram juntos.',
                  'Na folha, cada estudante decodifica o coração e cria a própria imagem.',
                  'As duplas trocam só os códigos, sem mostrar o desenho, e pintam a imagem do colega. Deu igual?'],
             tela_txt='No jogo Zeros, Uns e Cores, a turma representa números em binário com cartas de bolinhas e forma cores misturando luz vermelha, verde e azul (RGB).',
             tela_link=f'{SITE}/material-didatico/jogos/zeros-uns-e-cores.html',
             avaliar=['Decodifica a imagem sem erro.', 'Escreve o código da própria imagem corretamente.', 'Explica por que o computador precisa transformar a imagem em números.'],
             dica='Para estudantes com baixa visão, use uma malha maior, com quadrados de 2 cm, e peças de EVA para "pintar".',
             gab=f'A figura é um coração. Quadradinhos pintados: {pintados}. Para ir além: em uma tela colorida, cada pixel guarda três números, a quantidade de vermelho, de verde e de azul.',
             folha=folha_pixels()),
        dict(etapa='5º ano', eixo='cd', titulo='Confiável ou não?', fechar='Quem você conhece que poderia ajudar a checar uma notícia antes de compartilhar? Que site você usaria?', cod='EF05CO08',
             hab='Acessar as informações na internet de forma crítica para distinguir os conteúdos confiáveis de não confiáveis.',
             tempo='50 minutos', materiais='Folha impressa; se possível, um computador com projetor', objetivo='Usar critérios para avaliar se uma informação é confiável antes de compartilhar.',
             sem=['Pergunte se alguém já recebeu uma notícia que depois descobriu ser falsa. Ouça dois ou três relatos.',
                  'Construa com a turma uma lista de perguntas: quem escreveu? Quando? Pede pressa? É bom ou assustador demais? Outras fontes dizem o mesmo?',
                  'Em grupos, a turma aplica as perguntas às quatro publicações da folha.',
                  'Cada grupo defende a sua conclusão sobre uma publicação. Os outros podem discordar com argumentos.',
                  'Feche com uma regra da turma para compartilhar notícias e coloque no mural.'],
             tela_txt='No jogo Confiável ou Não?, a turma separa conteúdos confiáveis de não confiáveis. Depois, procure a mesma notícia em dois sites diferentes e compare.',
             tela_link=f'{SITE}/material-didatico/jogos/confiavel-ou-nao.html',
             avaliar=['Aplica pelo menos três critérios da lista.', 'Justifica a conclusão com base nos critérios.', 'Propõe o que fazer antes de compartilhar.'],
             gab='A: não confiável (sem autor, sem data, pede pressa). B: confiável, mas vale conferir no site oficial da prefeitura. C: não confiável (fonte desconhecida, promessa exagerada, pede clique). D: confiável (jornal identificado, data e fonte citada). Aceite respostas diferentes quando bem justificadas.',
             folha=folha_fontes()),
        dict(etapa='6º ano', eixo='md', titulo='Mensagem em pacotes', fechar='Por que um vídeo às vezes trava e depois continua do mesmo ponto?', cod='EF06CO07',
             hab='Entender como a informação é quebrada em pedaços, transmitida em pacotes por vários equipamentos e reconstruída no destino.',
             tempo='50 minutos', materiais='Folha impressa, tesoura, envelopes ou tiras de papel', objetivo='Explicar por que a mensagem viaja em pacotes numerados e como a falta de um é percebida.',
             sem=['Organize a sala como uma rede: cada fileira é um caminho e cada estudante é um equipamento que só passa o papel para o vizinho.',
                  'Escreva uma frase, recorte em pacotes numerados ("pacote 2 de 5") e entregue por caminhos diferentes.',
                  'Quem recebe no fundo da sala remonta a mensagem. Os pacotes chegam fora de ordem?',
                  'Repita escondendo um pacote. Como quem recebe percebe que faltou? O que faz?',
                  'Resolva a folha e, se der tempo, cada grupo manda a própria mensagem pela rede.'],
             tela_txt='No jogo Correio de Pacotes, a turma remonta mensagens enviadas em pacotes e pede o reenvio dos que se perderam.',
             tela_link=f'{SITE}/material-didatico/jogos/pacotes.html',
             avaliar=['Remonta a mensagem pela numeração.', 'Identifica o pacote perdido e pede o reenvio.', 'Explica para que serve o número e o total.'],
             gab=f'Mensagem: "{" ".join(PACOTES)}". Falta o pacote 3 ("NA SALA"); o pedido é algo como "Ana, reenvie o pacote 3 de 6". O número permite pôr em ordem, e o total mostra se falta algum.',
             folha=folha_pacotes()),
        dict(etapa='7º ano', eixo='pc', titulo='Caça aos bugs', fechar='Um aplicativo que você usa já deu erro? Como você acha que os programadores descobriram e corrigiram?', cod='EF07CO02',
             hab='Analisar programas para detectar e remover erros, ampliando a confiança na sua correção.',
             tempo='50 minutos', materiais='Folha impressa', objetivo='Usar o teste de mesa para encontrar e corrigir erros em um algoritmo.',
             sem=['Conte a origem da palavra bug na computação e diga que hoje a aula é de caçar bugs.',
                  'Faça no quadro um teste de mesa de um algoritmo curto e correto, mostrando como anotar o valor das variáveis a cada linha.',
                  'Em duplas, a turma faz o teste de mesa do algoritmo da folha e compara com a média calculada de cabeça.',
                  'Discuta: qual linha tem o erro? Como corrigir? Existe outro erro, que só aparece com certas notas?',
                  'Desafio: cada dupla escreve um algoritmo curto com um erro escondido e troca com outra.'],
             tela_txt='No Robô Coletor, cada dupla monta uma solução com repetição e depois coloca um erro de propósito. Outra dupla precisa achar e corrigir.',
             tela_link=f'{SITE}/material-didatico/jogos/robo.html',
             avaliar=['Faz o teste de mesa sem pular linhas.', 'Localiza o erro da linha 3 e propõe a correção.', 'Percebe o erro de condição da linha 5 e explica com um caso de teste.'],
             gab=f'Teste de mesa com o erro: {mesa}. No fim, media = {br(media_err)} e o algoritmo escreve "em recuperação". A média correta é {br(media_ok)}. Linha 3: o certo é soma ← soma + nota. Linha 5: com média 7 a estudante deveria ser aprovada, então o certo é media ≥ 7.',
             folha=folha_bugs()),
        dict(etapa='7º ano', eixo='md', titulo='Quantas senhas existem?', fechar='Que conta sua seria mais grave perder? Ela tem uma senha longa e só dela?', cod='EF07CO07',
             hab='Identificar problemas de segurança cibernética e experimentar formas de proteção.',
             tempo='50 minutos', materiais='Folha impressa, calculadora', objetivo='Mostrar com números por que senhas longas protegem mais.',
             sem=['Mostre um cadeado de mala de 3 algarismos e pergunte: "Quanto tempo leva para abrir testando todas as senhas?".',
                  'Calcule junto: 10 opções em cada posição, 3 posições, 10 × 10 × 10 = 1.000 senhas.',
                  'Em duplas, a turma completa a tabela com a calculadora.',
                  'Compare: o que cresce mais, usar mais tipos de caracteres ou mais posições?',
                  'Feche com hábitos de proteção: frase-senha longa, senha diferente para cada serviço, verificação em duas etapas.'],
             tela_txt='No jogo Senha Forte, a turma compara senhas, cria uma frase-senha sem dados pessoais e aprende hábitos que protegem as contas.',
             tela_link=f'{SITE}/material-didatico/jogos/senha.html',
             avaliar=['Calcula as combinações multiplicando as opções.', 'Compara os resultados e conclui que comprimento pesa muito.', 'Cria uma frase-senha sem dados pessoais.'],
             gab=f'{senhas_gab}. Com bilhões de tentativas por segundo, as senhas curtas caem em menos de um segundo; por isso o comprimento importa tanto. A frase-senha longa é a mais segura; "Bia2012" usa nome e ano, fáceis de adivinhar.',
             folha=folha_senhas()),
        dict(etapa='8º ano', eixo='cd', titulo='Li e concordo?', fechar='Depois desta aula, o que você vai conferir antes de instalar um aplicativo novo?', cod='EF08CO09',
             hab='Analisar criticamente as políticas e os termos de uso das redes sociais e demais plataformas.',
             tempo='50 minutos', materiais='Folha impressa', objetivo='Ler termos de uso procurando dados coletados, compartilhamento e direitos de quem usa.',
             sem=['Pergunte quem já leu os termos de uso de algum aplicativo antes de clicar em "Li e concordo". Normalmente quase ninguém.',
                  'Explique que os termos são um contrato e que a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) dá direitos a quem usa, com cuidado especial para dados de crianças e adolescentes.',
                  'Em grupos, a turma lê os termos do FotoTurma e responde à tabela.',
                  'Cada grupo apresenta a cláusula que considerou mais injusta e a versão reescrita.',
                  'Feche com uma lista do que procurar em qualquer termo de uso: dados coletados, com quem são compartilhados, idade mínima, como excluir a conta.'],
             tela_txt='Abra os termos de uso reais de um aplicativo que a turma usa e procure com Ctrl+F as palavras "dados", "terceiros", "idade" e "excluir". Compare com o FotoTurma.',
             tela_link='Termos de uso de um aplicativo que a turma conhece',
             avaliar=['Encontra nos termos as informações pedidas.', 'Explica cada cláusula em palavras simples.', 'Propõe uma cláusula mais justa e justifica.'],
             gab='Idade mínima: 13 anos (cláusula 1). Dados: nome, e-mail, data de nascimento, fotos, localização e contatos (2); localização e contatos parecem desnecessários. Recebem os dados: empresas parceiras, para anúncios (4). Fotos podem ir para propagandas, sem pagamento (3). Ao sair, fotos compartilhadas por outros podem continuar visíveis (5). Os termos podem mudar a qualquer momento (6).',
             folha=folha_termos()),
        dict(etapa='9º ano', eixo='md', titulo='Segredos em código', fechar='Onde a criptografia protege você todos os dias sem você perceber? (Mensagens, compras on-line, o cadeado do navegador.)', cod='EF09CO05',
             hab='Analisar técnicas de criptografia para armazenamento e transmissão de dados.',
             tempo='50 minutos', materiais='Folha impressa, tesoura, clipe ou alfinete com tampinha', objetivo='Cifrar e decifrar com a cifra de César e entender por que ela é fraca.',
             sem=['Pergunte como uma mensagem pode viajar pela internet sem que outros leiam. Ouça as ideias.',
                  'Apresente a cifra de César: cada letra anda um número fixo de casas no alfabeto. Monte o disco com a turma.',
                  'Em duplas, a turma decifra a primeira mensagem com a chave conhecida.',
                  'Desafio: decifrar a segunda sem saber a chave. Deixe as duplas descobrirem estratégias, como testar todas.',
                  'Discuta: se dá para testar 25 chaves em poucos minutos, por que os aplicativos de mensagens são seguros? Apresente a ideia de chaves enormes e da criptografia de ponta a ponta.'],
             tela_txt='No jogo Cifra de César, a turma decifra, descobre a chave e cifra mensagens, com fases cada vez mais difíceis.',
             tela_link=f'{SITE}/material-didatico/jogos/cifra.html',
             avaliar=['Cifra e decifra com a chave dada.', 'Descobre a chave desconhecida com uma estratégia.', 'Explica por que a cifra de César é fraca hoje.'],
             gab=f'Mensagem 1: "{MSG1}". Mensagem 2: chave {K2}, "{MSG2}". Existem 25 chaves úteis (a 26ª volta ao início); dá para testar todas rapidamente, à mão ou com um computador.',
             folha=folha_cifra()),
        dict(etapa='Ensino Médio', eixo='cd', titulo='Como a máquina escolhe a próxima palavra', fechar='Quando vale a pena usar uma IA na escola, e quando é melhor não usar? Como conferir o que ela respondeu?',
             hab='Pensamento computacional e Cultura digital no Ensino Médio: compreender, de forma simplificada, como sistemas de inteligência artificial que geram texto funcionam, e analisar criticamente seus limites e vieses.',
             tempo='50 minutos', materiais='Folha impressa', objetivo='Simular um modelo que prevê a próxima palavra e discutir de onde vêm os erros e os vieses da IA.',
             sem=['Pergunte como a turma acha que um assistente de IA escreve as respostas. Registre as hipóteses no quadro.',
                  'Explique que a nossa "máquina" só conhece as oito frases da folha e só sabe contar qual palavra costuma vir depois de outra.',
                  'Em grupos, a turma preenche as tabelas de contagem.',
                  'Gerem frases escolhendo sempre a palavra mais frequente e, depois, sorteando entre as opções.',
                  'Discuta: a máquina sabe se a frase é verdadeira? O que acontece se as frases que ela leu forem só sobre um grupo de pessoas? Ligue a discussão ao uso responsável da IA na escola.'],
             tela_txt='O simulador "Como a IA escolhe a próxima palavra" mostra as probabilidades de cada palavra e permite mudar a temperatura, deixando o texto mais previsível ou mais variado.',
             tela_link=f'{SITE}/simuladores/proxima-palavra.html',
             avaliar=['Conta corretamente as palavras seguintes.', 'Gera a frase mais provável e explica como chegou nela.', 'Relaciona os dados de treinamento aos vieses e erros da IA.'],
             gab=f'Depois de "a": {fmt(a_seg)}. Depois de "turma": {fmt(turma_seg)}. Depois de "gosta de": {fmt(gosta_seg)}. Frase mais provável: "{frase}". A máquina não sabe o que é verdade, só o que é frequente nas frases que leu; se elas forem enviesadas, as respostas também serão.',
             folha=folha_ia()),
    ]


def mapa(ats, inicio):
    linhas = ''.join(
        f'<tr><td style="text-align:center;font:600 11pt Fredoka">{i + 1}</td><td><b>{a["titulo"]}</b></td><td>{a["etapa"]}</td>'
        f'<td><span class="tag {a["eixo"]}">{EIXO[a["eixo"]]}</span></td><td>{(f"<span class=cod>{a["cod"]}</span>" if a.get("cod") else "")}</td>'
        f'<td style="text-align:center">{inicio + 2 * i}</td></tr>' for i, a in enumerate(ats))
    return f'''
<span class="rotulo">Parte 6 · Para usar amanhã</span>
<h1>Mapa das <span class="marca">12 atividades</span></h1>
<p class="linha-fina">Uma atividade para cada etapa da Educação Infantil ao Ensino Médio, distribuídas pelos três eixos. Todas têm versão sem tela e versão com tela, orientação para o professor e folha do estudante para imprimir.</p>
<table style="font-size:9.2pt"><tr><th style="width:9mm">Nº</th><th>Atividade</th><th style="width:28mm">Etapa</th><th style="width:44mm">Eixo</th><th style="width:20mm">Habilidade</th><th style="width:12mm">Pág.</th></tr>{linhas}</table>
<div class="cols2" style="margin-top:3mm">
<div class="caixa"><h3>Como ler cada atividade</h3><p>Na primeira página, a orientação: habilidade, tempo, materiais, o passo a passo sem tela, a versão com tela, o que observar para avaliar e o gabarito. Na segunda, a folha do estudante.</p></div>
<div class="caixa amarela"><h3>Use em outros anos</h3><p>Uma atividade do 5º ano pode abrir o tema no 8º ano, com uma discussão mais aprofundada. Uma do 9º ano pode virar desafio para uma turma do 6º que já avançou.</p></div>
</div>'''


def ficha_planejamento():
    campos = [('Turma e data', 11), ('Habilidade (código e texto)', 20), ('Verbo da habilidade: o que a turma vai fazer', 14), ('Situação do dia a dia', 18),
              ('Início sem tela (10 a 15 minutos)', 30), ('Desenvolvimento (com ou sem tela)', 38), ('Evidência de aprendizagem', 18), ('Conexão com o mundo fora da escola', 15),
              ('Adaptações para estudantes com diferentes necessidades', 18)]
    cs = ''.join(f'<div style="border:1.3px solid #111;border-radius:2mm;padding:1.4mm 3mm;margin-bottom:2.4mm;height:{h}mm"><b style="font-size:8.6pt">{t}</b></div>' for t, h in campos)
    return f'''
<span class="rotulo">Para copiar</span>
<h1>Ficha de <span class="marca">planejamento</span></h1>
<p class="pequeno" style="margin-bottom:3mm">Segue o roteiro de 5 passos da página 11. Imprima quantas precisar.</p>
{cs}'''


def lista_observacao():
    linhas = ''.join('<tr><td style="height:7.4mm"></td><td></td><td></td><td></td><td></td></tr>' for _ in range(24))
    return f'''
<span class="rotulo">Para copiar</span>
<h1>Lista de <span class="marca">observação</span></h1>
<p class="pequeno">Atividade: ______________________________ Habilidade: __________ Turma: ________ Data: ________</p>
<p class="pequeno">Marque um nível por estudante. I: em início · D: em desenvolvimento · C: consolidado (rubrica da página 13).</p>
<table style="font-size:9pt"><tr><th>Estudante</th><th style="width:14mm;text-align:center">I</th><th style="width:14mm;text-align:center">D</th><th style="width:14mm;text-align:center">C</th><th style="width:62mm">Observação</th></tr>{linhas}</table>'''


def proximo_passo():
    url_guia = f'https://{SITE}/guia-computacao-bncc/?utm_source=guia&utm_medium=pdf'
    url_zap = ZAP + '?text=Ol%C3%A1%2C%20J%C3%BAlia.%20Li%20o%20guia%20do%20professor%20de%20Computa%C3%A7%C3%A3o%20na%20BNCC%20e%20quero%20conversar%20sobre%20forma%C3%A7%C3%A3o.'
    return f'''<div class="fecho">
<span class="rotulo">Próximo passo</span>
<h1>Para ir <span class="marca">além do guia</span></h1>
<p class="linha-fina">Este guia resolve a primeira aula. Para que a Computação aconteça o ano inteiro, em todas as turmas, a escola ou a rede precisa de um plano e de professores seguros para conduzir. É nisso que eu posso ajudar.</p>
<div class="bloco"><h2 style="margin-top:0">Formação de professores para escolas e redes</h2>
<p>Encontros presenciais ou on-line com a equipe, a partir das habilidades que a rede precisa trabalhar: os três eixos na prática, atividades com e sem tela, planejamento por ano e avaliação. Inclui diagnóstico da equipe antes e retorno depois dos encontros.</p>
<p style="margin:0"><b>{SITE}/formacao-continuada/</b> · <b>{SITE}/para-escolas/</b></p></div>
<div class="cols2">
<div class="bloco"><h3 style="margin-top:0">Mentoria individual</h3><p style="margin:0">Para a professora ou o coordenador que vai liderar a Computação na escola: planejamento do ano, escolha de materiais e acompanhamento.</p><p style="margin:2mm 0 0"><b>{SITE}/mentoria/</b></p></div>
<div class="bloco"><h3 style="margin-top:0">Material gratuito</h3><p style="margin:0">As 42 habilidades do 6º ao 9º ano com plano de aula, slides e fichas; um ano letivo completo do 1º ao 6º; jogos e simuladores sem cadastro.</p><p style="margin:2mm 0 0"><b>{SITE}/material-didatico/</b></p></div>
</div>
<div class="caixa amarela"><h3>Checklist para a coordenação</h3><ul class="avaliar" style="columns:2;column-gap:8mm">
<li>Conferir o currículo de Computação do estado ou do município.</li><li>Decidir o formato: componente próprio, integrado ou projetos.</li>
<li>Definir quem é responsável por cada habilidade, ano a ano.</li><li>Levantar os equipamentos e a internet de cada escola.</li>
<li>Planejar a formação dos professores antes do início das aulas.</li><li>Combinar como a aprendizagem será registrada e avaliada.</li>
<li>Escolher os materiais de apoio para cada ano.</li><li>Marcar uma revisão do plano no fim do primeiro semestre.</li></ul></div>
<div class="qr-linha" style="margin-top:5mm">
<div style="text-align:center">{qr_svg(url_zap)}<div class="pequeno">WhatsApp</div></div>
<div style="text-align:center">{qr_svg(url_guia)}<div class="pequeno">Página do guia</div></div>
<div><h3 style="margin-top:0">Vamos conversar?</h3><p>WhatsApp (51) 99922-2234<br>contato@ohtopico.com.br<br>{SITE}</p>
<p class="pequeno" style="margin:0">Júlia Roberta Quoos Alves é professora de Computação na educação básica e cria materiais abertos para professores de todo o Brasil.</p></div>
</div></div>'''


def montar():
    livro = Livro()
    ats = atividades()
    inicio_at = 15
    sumario = [('Da norma à sala de aula', 3, False), ('Os três eixos', 4, False), ('Pensamento computacional, Mundo digital e Cultura digital', '5 a 7', True),
               ('Progressão por etapa', 8, False), ('Uma ideia em espiral', 10, True), ('Da habilidade à aula em 5 passos', 11, False),
               ('Com tela e sem tela', 12, False), ('Como avaliar', 13, False), ('Mapa das 12 atividades', 14, False)]
    sumario += [(f'{i + 1}. {a["titulo"]}', inicio_at + 2 * i, True) for i, a in enumerate(ats)]
    sumario += [('Ficha de planejamento e lista de observação', '39 e 40', False), ('Para ir além do guia', 41, False)]

    livro.pagina(capa(), 'capa', rodape=False)
    livro.pagina(como_usar(sumario))
    livro.pagina(norma())
    livro.pagina(eixos_visao())
    for e in EIXOS_PAGINAS:
        livro.pagina(eixo_pagina(*e))
    for k, (titulo, linhas) in enumerate(PROGRESSAO):
        livro.pagina(progressao(k + 1, titulo, linhas, PROG_INTRO[k]) + PROG_RODAPE[k])
    livro.pagina(espiral())
    livro.pagina(planejar())
    livro.pagina(com_sem_tela())
    livro.pagina(avaliar())
    livro.pagina(mapa(ats, inicio_at))
    for i, a in enumerate(ats):
        n = livro.pagina(pag_professor(i + 1, a))
        assert n == inicio_at + 2 * i, (a['titulo'], n)
        livro.pagina(pag_estudante(i + 1, a), 'folha-pg')
    assert len(livro.paginas) + 1 == 39
    livro.pagina(ficha_planejamento())
    livro.pagina(lista_observacao())
    livro.pagina(proximo_passo())
    css = (AQUI / 'estilo.css').read_text(encoding='utf-8')
    return f'''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>Guia do professor: Computação na BNCC</title>
<meta name="author" content="Júlia Roberta Quoos Alves">
<meta name="description" content="Guia gratuito para professores: os três eixos da Computação na BNCC, progressão por etapa, planejamento, avaliação e 12 atividades com e sem tela.">
<style>{css}</style></head>
<body>
{"".join(livro.paginas)}
</body></html>'''


if __name__ == '__main__':
    (AQUI / 'guia.html').write_text(montar(), encoding='utf-8')
    print('ok', AQUI / 'guia.html')
