"""Habilidades de Matemática da BNCC do Ensino Fundamental, para o mapa da página /matematica-adaptada/.

- 1º ao 5º ano: resumo de cada habilidade, escrito aqui (o texto oficial completo está no documento da BNCC).
- 6º ao 9º ano: texto oficial, lido de _fonte/planejamento/habilidades.json (a mesma base do planejamento anual).
Cada habilidade sai como dict: codigo, ano, unidade, texto.
"""
import json
from pathlib import Path

AQUI = Path(__file__).resolve().parent
UNIDADES = ['Números', 'Álgebra', 'Geometria', 'Grandezas e medidas', 'Probabilidade e estatística']

# ano: (fim de Números, fim de Álgebra, fim de Geometria, fim de Grandezas e medidas); o resto é Probabilidade e estatística
CORTES = {1: (8, 10, 14, 19), 2: (8, 11, 15, 20), 3: (9, 11, 16, 24), 4: (10, 15, 19, 25), 5: (9, 13, 18, 21)}

RESUMOS = {
    1: [
        'Usar números naturais para indicar quantidade ou ordem em situações do dia a dia.',
        'Contar de forma exata ou aproximada, usando pareamento e agrupamentos.',
        'Estimar e comparar quantidades de dois conjuntos (até cerca de 20 elementos).',
        'Contar coleções de até 100 objetos e registrar o resultado com palavras e números.',
        'Comparar números naturais de até duas ordens, com e sem a reta numérica.',
        'Construir fatos básicos da adição e usá-los no cálculo.',
        'Compor e decompor números de até duas ordens, com material manipulável.',
        'Resolver e elaborar problemas de adição e subtração (juntar, acrescentar, separar, retirar) com imagens ou material.',
        'Organizar e ordenar objetos por atributos, como cor, forma e medida.',
        'Descobrir os elementos que faltam em sequências de números, objetos ou figuras.',
        'Descrever a localização de pessoas e objetos no espaço (direita, esquerda, em frente, atrás).',
        'Descrever a localização usando pontos de referência e termos como entre, acima, abaixo.',
        'Relacionar figuras espaciais (cone, cilindro, esfera, bloco retangular) a objetos do mundo físico.',
        'Identificar e nomear figuras planas (círculo, quadrado, retângulo, triângulo).',
        'Comparar comprimentos, capacidades ou massas (mais alto, mais pesado, cabe mais).',
        'Relatar a sequência de acontecimentos de um dia, usando os horários quando possível.',
        'Reconhecer períodos do dia, dias da semana e meses do ano, com o calendário.',
        'Escrever uma data (dia, mês e ano) e indicar o dia da semana.',
        'Reconhecer moedas e cédulas do sistema monetário brasileiro em situações simples.',
        'Classificar eventos como "acontecerá com certeza", "talvez aconteça" e "é impossível acontecer".',
        'Ler dados expressos em tabelas e em gráficos de colunas simples.',
        'Realizar pesquisa com até duas variáveis categóricas e organizar os dados em representações pessoais.',
    ],
    2: [
        'Comparar e ordenar números naturais até a ordem de centenas, pelo valor posicional e pela função do zero.',
        'Estimar e contar quantidades de até 1000 objetos, por agrupamentos.',
        'Comparar quantidades de objetos de dois conjuntos (mais, menos, mesma quantidade) e indicar a diferença.',
        'Compor e decompor números de até três ordens, com adições.',
        'Construir fatos básicos da adição e da subtração para o cálculo mental ou escrito.',
        'Resolver e elaborar problemas de adição e subtração com números de até três ordens.',
        'Resolver e elaborar problemas de multiplicação por 2, 3, 4 e 5 com a ideia de parcelas iguais.',
        'Resolver e elaborar problemas de dobro, metade, triplo e terça parte.',
        'Construir sequências de números naturais em ordem crescente ou decrescente, com uma regularidade.',
        'Descrever o padrão de sequências repetitivas e recursivas, com palavras, símbolos ou desenhos.',
        'Descrever os elementos que faltam em sequências repetitivas e recursivas.',
        'Identificar e registrar a localização e os deslocamentos de pessoas e objetos em trajetos e mapas simples.',
        'Esboçar roteiros e plantas simples de ambientes familiares, com pontos de referência.',
        'Reconhecer, nomear e comparar figuras espaciais (cubo, bloco retangular, pirâmide, cone, cilindro, esfera).',
        'Reconhecer, comparar e nomear figuras planas por características comuns.',
        'Estimar, medir e comparar comprimentos com unidades não padronizadas e padronizadas (metro, centímetro, milímetro).',
        'Estimar, medir e comparar capacidade e massa (litro, mililitro, quilograma, grama).',
        'Indicar a duração de intervalos de tempo entre datas, usando o calendário.',
        'Medir a duração de um intervalo de tempo com relógio digital e registrar o início e o fim.',
        'Estabelecer a equivalência de valores entre moedas e cédulas em situações do dia a dia.',
        'Classificar resultados de eventos do dia a dia como muito prováveis, pouco prováveis, improváveis e impossíveis.',
        'Comparar informações de pesquisas em tabelas de dupla entrada e em gráficos de colunas ou barras.',
        'Realizar pesquisa com até três variáveis categóricas e organizar os dados em listas, tabelas e gráficos.',
    ],
    3: [
        'Ler, escrever e comparar números naturais até a ordem de unidade de milhar.',
        'Identificar características do sistema de numeração decimal, compondo e decompondo números de até quatro ordens.',
        'Construir e usar fatos básicos da adição e da multiplicação para o cálculo mental ou escrito.',
        'Relacionar números naturais e pontos da reta numérica para ordenar números.',
        'Usar diferentes procedimentos de cálculo mental e escrito para a adição e a subtração.',
        'Resolver e elaborar problemas de adição e subtração com os significados de juntar, acrescentar, separar, retirar, comparar e completar.',
        'Resolver e elaborar problemas de multiplicação (por 2, 3, 4, 5 e 10) com parcelas iguais e disposição retangular.',
        'Resolver e elaborar problemas de divisão por números de até 10, com resto zero e diferente de zero.',
        'Associar o quociente de uma divisão exata às ideias de metade, terça, quarta, quinta e décima partes.',
        'Identificar regularidades em sequências de números naturais obtidas por adições ou subtrações sucessivas.',
        'Compreender a ideia de igualdade para escrever diferentes sentenças com o mesmo resultado.',
        'Descrever e representar a localização e a movimentação de pessoas e objetos, com mudanças de direção.',
        'Associar figuras espaciais a objetos do mundo físico e nomear essas figuras.',
        'Descrever características de prismas, pirâmides, cilindros e cones e relacioná-los com suas planificações.',
        'Classificar e comparar figuras planas (triângulo, quadrado, retângulo, trapézio, paralelogramo) pelos lados e vértices.',
        'Reconhecer figuras congruentes, usando sobreposição e desenhos em malhas.',
        'Reconhecer que o resultado de uma medida depende da unidade de medida usada.',
        'Escolher a unidade e o instrumento de medida mais apropriados para cada medição.',
        'Estimar, medir e comparar comprimentos com unidades padronizadas (metro, centímetro, milímetro).',
        'Estimar e medir capacidade e massa (litro, mililitro, quilograma, grama) em contextos do dia a dia.',
        'Comparar áreas de faces de objetos e de figuras planas, visualmente ou por sobreposição.',
        'Ler e registrar medidas e intervalos de tempo com relógios analógicos e digitais.',
        'Ler horas em relógios digitais e analógicos e reconhecer a relação entre hora e minutos e entre minuto e segundos.',
        'Resolver e elaborar problemas de compra, venda e troca com o sistema monetário.',
        'Identificar os resultados possíveis de um evento aleatório e estimar os mais prováveis.',
        'Resolver problemas com dados de tabelas de dupla entrada e de gráficos de barras ou colunas.',
        'Ler, interpretar e comparar dados de tabelas e gráficos, produzindo um texto sobre eles.',
        'Realizar pesquisa com variáveis categóricas (até 50 elementos) e organizar os dados em tabelas e gráficos.',
    ],
    4: [
        'Ler, escrever e ordenar números naturais até a ordem de dezenas de milhar.',
        'Mostrar, por composição e decomposição, que todo número natural pode ser escrito com adições e multiplicações por potências de dez.',
        'Resolver e elaborar problemas de adição e subtração com números naturais, usando estimativa e cálculo mental.',
        'Usar as relações entre adição e subtração e entre multiplicação e divisão para ampliar as estratégias de cálculo.',
        'Usar as propriedades das operações para desenvolver estratégias de cálculo.',
        'Resolver e elaborar problemas de multiplicação com diferentes significados (parcelas iguais, disposição retangular, proporcionalidade).',
        'Resolver e elaborar problemas de divisão com divisor de até dois algarismos.',
        'Resolver problemas simples de contagem, com todas as combinações possíveis.',
        'Reconhecer as frações unitárias mais usadas (1/2, 1/3, 1/4, 1/5, 1/10 e 1/100) como partes da unidade, com a reta numérica.',
        'Reconhecer que as regras do sistema de numeração decimal se estendem aos décimos e centésimos, como no dinheiro.',
        'Identificar regularidades em sequências de múltiplos de um número natural.',
        'Reconhecer, por investigação, grupos de números que deixam o mesmo resto em uma divisão.',
        'Reconhecer, por investigação, as relações inversas entre as operações.',
        'Reconhecer que a igualdade se mantém ao adicionar ou subtrair o mesmo número dos dois termos.',
        'Determinar o número desconhecido que torna verdadeira uma igualdade com adição ou subtração.',
        'Descrever deslocamentos e localização em malhas quadriculadas e representações como plantas e mapas.',
        'Associar prismas e pirâmides às suas planificações e comparar seus atributos.',
        'Reconhecer ângulos retos e não retos em figuras, com dobraduras, esquadros ou programas de computador.',
        'Reconhecer simetria de reflexão em figuras planas e usá-la para construir figuras congruentes.',
        'Medir e estimar comprimentos (incluindo perímetros), massas e capacidades com unidades padronizadas.',
        'Medir, comparar e estimar a área de figuras em malha quadriculada, contando os quadradinhos.',
        'Ler e registrar medidas de tempo em horas, minutos e segundos e resolver problemas de duração.',
        'Reconhecer a temperatura como grandeza e o grau Celsius como unidade de medida.',
        'Registrar temperaturas máximas e mínimas do dia e organizar os dados em gráficos de colunas.',
        'Resolver e elaborar problemas de compra e venda com formas de pagamento, troco e desconto.',
        'Identificar, entre eventos do dia a dia, aqueles que têm maior chance de acontecer.',
        'Analisar dados de tabelas simples ou de dupla entrada e de gráficos de colunas ou pictóricos.',
        'Realizar pesquisa com variáveis categóricas e numéricas e organizar os dados em tabelas e gráficos de colunas.',
    ],
    5: [
        'Ler, escrever e ordenar números naturais até a ordem das centenas de milhar.',
        'Ler, escrever e ordenar números racionais na forma decimal, com a reta numérica.',
        'Identificar e representar frações menores e maiores que a unidade, como parte de um todo e como resultado de divisão.',
        'Identificar frações equivalentes.',
        'Comparar e ordenar números racionais positivos nas formas decimal e fracionária, com a reta numérica.',
        'Associar 10%, 25%, 50%, 75% e 100% à décima parte, quarta parte, metade, três quartos e um inteiro.',
        'Resolver e elaborar problemas de adição e subtração com números naturais e decimais.',
        'Resolver e elaborar problemas de multiplicação e divisão com números naturais e decimais.',
        'Resolver problemas simples de contagem, listando todos os agrupamentos possíveis.',
        'Concluir, por investigação, que a igualdade se mantém ao fazer a mesma operação nos dois membros.',
        'Resolver problemas com uma igualdade em que um dos termos é desconhecido.',
        'Resolver problemas de proporcionalidade direta entre duas grandezas (por exemplo, dobrar uma receita).',
        'Resolver problemas de partilha de uma quantidade em duas partes desiguais (uma o dobro da outra, por exemplo).',
        'Usar diferentes representações para localizar objetos no plano, como mapas e malhas quadriculadas.',
        'Interpretar, descrever e representar a localização e a movimentação de objetos no plano cartesiano (1º quadrante).',
        'Associar figuras espaciais às suas planificações e comparar seus atributos.',
        'Reconhecer, nomear e comparar polígonos pelos lados, vértices e ângulos, e desenhá-los.',
        'Reconhecer que, na ampliação e na redução de figuras em malhas, os ângulos se mantêm e os lados ficam proporcionais.',
        'Resolver problemas com medidas de comprimento, área, massa, tempo, temperatura e capacidade, transformando unidades.',
        'Concluir, por investigação, que figuras de mesmo perímetro podem ter áreas diferentes, e vice-versa.',
        'Reconhecer volume como grandeza e medir volumes empilhando cubos.',
        'Apresentar todos os resultados possíveis de um experimento aleatório e dizer se são igualmente prováveis.',
        'Determinar a probabilidade de um resultado em eventos aleatórios igualmente prováveis.',
        'Interpretar dados de tabelas e gráficos de colunas, pictóricos e de linhas, produzindo textos.',
        'Realizar pesquisa com variáveis categóricas e numéricas e organizar os dados em tabelas e gráficos, com e sem tecnologia.',
    ],
}


def unidade(ano, n):
    for nome, fim in zip(UNIDADES, CORTES[ano]):
        if n <= fim:
            return nome
    return UNIDADES[-1]


def habilidades():
    lista = [{'codigo': f'EF0{ano}MA{i + 1:02d}', 'ano': ano, 'unidade': unidade(ano, i + 1), 'texto': t}
             for ano, textos in RESUMOS.items() for i, t in enumerate(textos)]
    oficiais = json.loads((AQUI.parent / 'planejamento' / 'habilidades.json').read_text(encoding='utf-8'))['MA']
    lista += [{'codigo': h['codigo'], 'ano': h['ano'], 'unidade': h['eixo'], 'texto': h['texto']}
              for h in sorted(oficiais, key=lambda h: h['codigo'])]
    return lista


if __name__ == '__main__':
    from collections import Counter
    hs = habilidades()
    print(len(hs), Counter(h['ano'] for h in hs))
