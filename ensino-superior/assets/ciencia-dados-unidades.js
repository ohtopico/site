/* Ciência de Dados — unidades
   pendente: true → aparece como “em preparação”, sem página própria. */
UNIDADES_POR_DISC.cd = [
  {
    id: 'u1', n: 1, titulo: 'O que é ciência de dados', sim: null,
    objetivos: ['Descrever o ciclo de um projeto de dados.', 'Diferenciar os papéis de analista, cientista e engenheiro de dados.', 'Classificar dados e variáveis.'],
    leitura: 'Provost & Fawcett, caps. 1 e 2. Bruce & Bruce, cap. 1.',
    secoes: [
      ['Uma definição de trabalho', `<p>Ciência de dados é o uso de <strong>programação, estatística e conhecimento do domínio</strong> para extrair conhecimento útil de dados e apoiar decisões. Ela começa sempre com uma <strong>pergunta</strong> (“por que as vendas caíram no inverno?”, “quais alunos têm risco de evasão?”), não com uma ferramenta.</p>`],
      ['O ciclo de um projeto', `<ol><li><strong>Entender o problema</strong> e definir como o sucesso será medido.</li><li><strong>Coletar</strong> os dados (arquivos, bancos, APIs, sensores).</li><li><strong>Limpar e preparar</strong> — costuma consumir a maior parte do tempo.</li><li><strong>Explorar</strong> com estatística descritiva e gráficos.</li><li><strong>Modelar</strong>, quando for o caso (previsão, classificação, agrupamento).</li><li><strong>Comunicar</strong> e colocar em uso: relatório, painel, modelo em produção.</li></ol><p>O processo é <strong>iterativo</strong>: a exploração muitas vezes revela que é preciso voltar à coleta ou reformular a pergunta. O modelo CRISP-DM, muito usado na indústria, descreve as mesmas etapas: entendimento do negócio, entendimento dos dados, preparação, modelagem, avaliação e implantação.</p>`],
      ['Papéis na área', `<ul><li><strong>Analista de dados</strong>: responde perguntas de negócio com consultas, estatística descritiva e painéis (SQL, planilhas, Power BI, Python).</li><li><strong>Cientista de dados</strong>: constrói modelos estatísticos e de aprendizado de máquina para prever e explicar.</li><li><strong>Engenheiro de dados</strong>: constrói e mantém os <em>pipelines</em> que levam os dados das fontes até os repositórios analíticos (bancos, data lakes, nuvem), garantindo qualidade e disponibilidade.</li></ul><p>Na prática, os papéis se sobrepõem — e todos dependem de dados bem cuidados.</p>`],
      ['Tipos de dados e de variáveis', `<p>Dados <strong>estruturados</strong> cabem em tabelas (linhas = observações, colunas = variáveis); <strong>semiestruturados</strong> têm alguma organização (JSON, XML); <strong>não estruturados</strong> incluem textos, imagens e áudio.</p><table class="tbl"><tr><th>Tipo</th><th>Subtipo</th><th>Exemplos</th></tr><tr><td rowspan="2">Qualitativa (categórica)</td><td>Nominal</td><td>cidade, curso, tipo sanguíneo</td></tr><tr><td>Ordinal</td><td>escolaridade, nível de satisfação</td></tr><tr><td rowspan="2">Quantitativa (numérica)</td><td>Discreta</td><td>número de filhos, faltas</td></tr><tr><td>Contínua</td><td>altura, renda, tempo</td></tr></table><p>O tipo da variável define quais resumos e gráficos fazem sentido: não se calcula a média de um CEP, mesmo que ele seja escrito com números.</p>`]
    ],
    exercicios: [
      ['Classifique as variáveis: idade em anos, estado civil, nota de 0 a 10, faixa de renda (baixa, média, alta), número de matrícula.', 'Idade: quantitativa (discreta, se em anos completos). Estado civil: qualitativa nominal. Nota: quantitativa contínua (ou discreta, se só inteiros). Faixa de renda: qualitativa ordinal. Matrícula: qualitativa nominal — é um identificador, não uma quantidade.'],
      ['Uma escola quer reduzir a evasão. Escreva uma pergunta de dados bem definida e diga como mediria o sucesso.', 'Exemplo: “Quais características do primeiro semestre (faltas, notas, distância de casa) estão associadas à evasão no segundo semestre?” Sucesso: identificar fatores com evidência e, depois, reduzir a taxa de evasão em relação ao ano anterior.'],
      ['Por que a etapa de limpeza costuma consumir a maior parte do tempo de um projeto?', 'Dados reais vêm com valores faltantes, duplicados, formatos inconsistentes, erros de digitação e registros fora do padrão; corrigir isso exige entender o domínio e verificar cada decisão.'],
      ['Diferencie o trabalho de um engenheiro de dados e o de um cientista de dados.', 'O engenheiro constrói a infraestrutura e os pipelines que disponibilizam dados confiáveis; o cientista usa esses dados para construir modelos e responder perguntas.']
    ]
  },
  {
    id: 'u2', n: 2, titulo: 'Python e pandas para análise de dados', sim: null,
    objetivos: ['Usar notebooks Jupyter ou Google Colab.', 'Criar e inspecionar Series e DataFrames.', 'Selecionar, filtrar, criar colunas e ordenar dados com pandas.'],
    leitura: 'McKinney, caps. 4 e 5. VanderPlas, cap. 3.',
    secoes: [
      ['Ambiente', `<p><strong>Notebooks</strong> (Jupyter, Google Colab) misturam código, resultados e texto — ideais para análise exploratória e para documentar o raciocínio. As bibliotecas centrais são <strong>NumPy</strong> (vetores numéricos), <strong>pandas</strong> (tabelas) e <strong>Matplotlib/Seaborn</strong> (gráficos).</p><pre><code>import pandas as pd
import numpy as np</code></pre>`],
      ['Series e DataFrame', `<p>Uma <code>Series</code> é uma coluna com índice; um <code>DataFrame</code> é uma tabela de Series que compartilham o índice.</p><pre><code>df = pd.DataFrame({
    'aluno': ['Ana', 'Bruno', 'Carla', 'Davi'],
    'turma': ['A', 'B', 'A', 'B'],
    'nota':  [8.5, 6.0, 9.2, 7.4],
    'faltas': [2, 10, 0, 4]
})
df.shape      # (4, 4): linhas, colunas
df.dtypes     # tipo de cada coluna
df.head()     # primeiras linhas
df.info()     # tipos e valores não nulos
df.describe() # resumo estatístico das colunas numéricas</code></pre>`],
      ['Selecionar e filtrar', `<pre><code>df['nota']                      # uma coluna (Series)
df[['aluno', 'nota']]           # várias colunas (DataFrame)
df.loc[0, 'aluno']              # por rótulo de linha e coluna
df.iloc[0:2]                    # por posição
df[df['nota'] >= 7]             # filtro
df[(df['turma'] == 'A') & (df['faltas'] < 5)]   # condições combinadas</code></pre><p>Use <code>&amp;</code> (e), <code>|</code> (ou) e parênteses em cada condição — <code>and</code>/<code>or</code> do Python não funcionam com Series.</p>`],
      ['Transformar e ordenar', `<pre><code>df['aprovado'] = df['nota'] >= 7                 # nova coluna
df['nota_100'] = df['nota'] * 10                  # operação vetorizada
df.sort_values('nota', ascending=False)           # ordenar
df['turma'].value_counts()                        # contagem por categoria
df.groupby('turma')['nota'].mean()                # média por grupo</code></pre><p>Operações em pandas são <strong>vetorizadas</strong>: aplicam-se à coluna inteira, sem laços explícitos — mais curtas e muito mais rápidas.</p>`]
    ],
    exercicios: [
      ['Com o DataFrame do exemplo, escreva o código para listar o nome e a nota dos alunos da turma B.', '<pre><code>df.loc[df[\'turma\'] == \'B\', [\'aluno\', \'nota\']]</code></pre>'],
      ['Qual a diferença entre <code>df.loc[1:2]</code> e <code>df.iloc[1:2]</code> com o índice padrão (0, 1, 2…)?', '<code>loc</code> usa rótulos e inclui o fim: linhas 1 e 2. <code>iloc</code> usa posições e exclui o fim: só a linha 1.'],
      ['Crie uma coluna <code>situacao</code> com “Aprovado” se nota ≥ 7 e “Recuperação” caso contrário.', '<pre><code>df[\'situacao\'] = np.where(df[\'nota\'] >= 7, \'Aprovado\', \'Recuperação\')</code></pre>'],
      ['Calcule a média de faltas por turma e ordene da maior para a menor.', '<pre><code>df.groupby(\'turma\')[\'faltas\'].mean().sort_values(ascending=False)</code></pre>'],
      ['Por que <code>df[df[\'nota\'] > 7 and df[\'faltas\'] < 5]</code> dá erro?', 'Porque <code>and</code> tenta avaliar a Series inteira como um único verdadeiro/falso, o que é ambíguo. O correto é <code>(df[\'nota\'] > 7) &amp; (df[\'faltas\'] < 5)</code>.']
    ]
  },
  {
    id: 'u3', n: 3, titulo: 'Coleta de dados: arquivos, SQL e APIs', sim: null,
    objetivos: ['Ler dados de arquivos CSV, Excel e JSON.', 'Consultar bancos relacionais com SQL e levar o resultado ao pandas.', 'Obter dados de APIs e portais de dados abertos de forma responsável.'],
    leitura: 'McKinney, cap. 6. Documentação do pandas (IO tools).',
    secoes: [
      ['Arquivos', `<pre><code>df = pd.read_csv('vendas.csv', sep=';', decimal=',', encoding='utf-8')
df = pd.read_excel('planilha.xlsx', sheet_name='2025')
df = pd.read_json('dados.json')
df.to_csv('saida.csv', index=False)</code></pre><p>Arquivos brasileiros costumam usar <strong>ponto e vírgula</strong> como separador e <strong>vírgula decimal</strong>; parâmetros errados fazem números virarem texto. Sempre confira com <code>df.info()</code> logo após a leitura.</p>`],
      ['Bancos de dados e SQL', `<p>Boa parte dos dados das organizações está em bancos relacionais. Uma consulta SQL filtra e agrega no próprio banco, trazendo só o necessário:</p><pre><code>SELECT turma, AVG(nota) AS media, COUNT(*) AS alunos
FROM matriculas
WHERE ano = 2025
GROUP BY turma
HAVING COUNT(*) >= 10
ORDER BY media DESC;</code></pre><p>Junções (<code>JOIN</code>) combinam tabelas por uma chave. No Python, o resultado vai direto para um DataFrame:</p><pre><code>import sqlite3
con = sqlite3.connect('escola.db')
df = pd.read_sql('SELECT * FROM matriculas WHERE ano = 2025', con)</code></pre>`],
      ['APIs', `<p>Uma API devolve dados estruturados (geralmente JSON) a partir de uma URL:</p><pre><code>import requests
resp = requests.get('https://api.exemplo.gov.br/v1/escolas', params={'uf': 'RS'}, timeout=30)
resp.raise_for_status()            # erro se a resposta não for 2xx
dados = resp.json()
df = pd.json_normalize(dados)       # achata JSON aninhado em colunas</code></pre><p>Respeite limites de requisição, guarde chaves de acesso fora do código e leia os termos de uso.</p>`],
      ['Dados abertos e responsabilidade', `<p>Portais como o <strong>Portal Brasileiro de Dados Abertos</strong> (dados.gov.br), o <strong>IBGE</strong> e o <strong>INEP</strong> (Censo Escolar, Enem) publicam dados públicos com dicionários de variáveis — leia o dicionário antes de analisar. Ao coletar dados de pessoas, a <strong>LGPD</strong> exige finalidade definida, necessidade e segurança; prefira dados anonimizados ou agregados. Raspagem de páginas web só deve ser feita quando permitida pelos termos do site e sem sobrecarregar o servidor.</p>`]
    ],
    exercicios: [
      ['Um CSV exportado de uma planilha brasileira foi lido e a coluna <code>valor</code> apareceu como texto (“12,50”). Qual a causa provável e como corrigir na leitura?', 'O separador decimal é vírgula. Ler com <code>pd.read_csv(..., sep=\';\', decimal=\',\')</code>.'],
      ['Escreva uma consulta SQL que mostre o total vendido por cidade em 2025, só para cidades com mais de R$ 10 000, da maior para a menor. Tabela: <code>vendas(cidade, valor, data)</code>.', '<pre><code>SELECT cidade, SUM(valor) AS total\nFROM vendas\nWHERE data >= \'2025-01-01\' AND data < \'2026-01-01\'\nGROUP BY cidade\nHAVING SUM(valor) > 10000\nORDER BY total DESC;</code></pre>'],
      ['Qual a diferença entre <code>WHERE</code> e <code>HAVING</code>?', '<code>WHERE</code> filtra linhas antes do agrupamento; <code>HAVING</code> filtra grupos depois da agregação.'],
      ['Por que é melhor filtrar e agregar no banco (SQL) do que trazer a tabela inteira para o pandas?', 'Reduz o volume transferido e o uso de memória, aproveita índices e otimizações do banco e deixa a análise mais rápida.'],
      ['Cite dois cuidados ao usar dados pessoais em uma análise.', 'Ter finalidade definida e coletar só o necessário (LGPD); anonimizar ou agregar os dados; proteger o acesso e não publicar informações que identifiquem pessoas.']
    ]
  },
  {
    id: 'u4', n: 4, titulo: 'Limpeza e preparação de dados', sim: 'estatistica',
    objetivos: ['Diagnosticar e tratar valores faltantes e duplicados.', 'Corrigir tipos e padronizar textos e datas.', 'Identificar outliers e organizar dados no formato tidy.'],
    leitura: 'McKinney, caps. 7 e 8. Wickham, “Tidy Data” (Journal of Statistical Software, 2014).',
    secoes: [
      ['Diagnóstico', `<pre><code>df.info()                    # tipos e não nulos
df.isna().sum()              # faltantes por coluna
df.duplicated().sum()        # linhas duplicadas
df['cidade'].unique()        # valores distintos (revela grafias diferentes)</code></pre><p>Antes de corrigir, entenda <strong>por que</strong> o problema existe: um faltante pode significar “não se aplica”, “não informado” ou falha no sistema — e cada caso pede um tratamento diferente.</p>`],
      ['Faltantes e duplicados', `<pre><code>df = df.drop_duplicates()
df = df.dropna(subset=['nota'])                       # remove linhas sem nota
df['renda'] = df['renda'].fillna(df['renda'].median()) # preenche com a mediana
df['bairro'] = df['bairro'].fillna('Não informado')</code></pre><p>Remover linhas pode enviesar a análise se os faltantes não forem aleatórios. Preencher com a <strong>mediana</strong> é mais robusto a outliers que a média. Registre toda decisão — ela faz parte do resultado.</p>`],
      ['Tipos, textos e datas', `<pre><code>df['valor'] = pd.to_numeric(df['valor'], errors='coerce')   # inválidos viram NaN
df['data'] = pd.to_datetime(df['data'], dayfirst=True)        # 31/12/2025
df['cidade'] = df['cidade'].str.strip().str.title()          # ' santa cruz ' → 'Santa Cruz'
df['mes'] = df['data'].dt.month</code></pre>`],
      ['Outliers', `<p>Valores muito distantes dos demais podem ser erros (idade 250) ou casos reais importantes (um cliente que compra muito). A regra do <strong>intervalo interquartil</strong> marca como suspeitos os valores abaixo de Q1 − 1,5×IQR ou acima de Q3 + 1,5×IQR, onde IQR = Q3 − Q1.</p><pre><code>q1, q3 = df['renda'].quantile([0.25, 0.75])
iqr = q3 - q1
suspeitos = df[(df['renda'] < q1 - 1.5*iqr) | (df['renda'] > q3 + 1.5*iqr)]</code></pre><p>Investigue antes de remover. Experimente a regra no simulador de estatística descritiva.</p>`],
      ['Dados tidy', `<p>Em dados <strong>tidy</strong> (organizados): cada variável é uma coluna, cada observação é uma linha e cada tipo de unidade observacional é uma tabela. Planilhas com um mês por coluna, por exemplo, precisam ser “derretidas”:</p><pre><code># colunas: produto, jan, fev, mar  →  colunas: produto, mes, vendas
longo = df.melt(id_vars='produto', var_name='mes', value_name='vendas')</code></pre>`]
    ],
    exercicios: [
      ['Uma coluna de cidades tem os valores “Santa Cruz do Sul”, “santa cruz do sul ” e “STA CRUZ DO SUL”. Como padronizar?', 'Remover espaços e padronizar caixa (<code>.str.strip().str.title()</code>) resolve os dois primeiros; abreviações como “STA” exigem um mapeamento explícito com <code>.replace({\'Sta Cruz Do Sul\': \'Santa Cruz Do Sul\'})</code> ou uma tabela de correspondência.'],
      ['Para os valores 2, 3, 3, 4, 5, 6, 30, calcule Q1, Q3, IQR e os limites para outliers (quartis pelo método do pandas).', 'Q1 = 3, Q3 = 5,5, IQR = 2,5. Limites: 3 − 3,75 = −0,75 e 5,5 + 3,75 = 9,25. O valor 30 é outlier. Confira no simulador.'],
      ['Por que preencher faltantes de renda com a média pode ser uma má ideia?', 'A renda costuma ter distribuição assimétrica com valores muito altos; a média é puxada por eles e superestima o valor típico. A mediana é mais representativa.'],
      ['Transforme em tidy uma tabela com colunas <code>escola, 2023, 2024, 2025</code> contendo o número de matrículas.', '<pre><code>df.melt(id_vars=\'escola\', var_name=\'ano\', value_name=\'matriculas\')</code></pre>']
    ]
  },
  {
    id: 'u5', n: 5, titulo: 'Análise exploratória e estatística descritiva', sim: 'estatistica',
    objetivos: ['Calcular e interpretar medidas de posição e de dispersão.', 'Resumir dados por grupos.', 'Medir a associação entre variáveis sem confundir correlação e causalidade.'],
    leitura: 'Bruce & Bruce, cap. 1. McKinney, cap. 10.',
    secoes: [
      ['Medidas de posição', `<ul><li><strong>Média</strong>: soma ÷ quantidade — sensível a valores extremos.</li><li><strong>Mediana</strong>: valor central dos dados ordenados — robusta a outliers.</li><li><strong>Moda</strong>: valor mais frequente — única medida que serve para variáveis nominais.</li><li><strong>Quartis</strong>: Q1, Q2 (mediana) e Q3 dividem os dados ordenados em quatro partes.</li></ul><p>Se a média é bem maior que a mediana, a distribuição tem cauda à direita (assimetria positiva) — típico de renda e de tempo de espera.</p>`],
      ['Medidas de dispersão', `<p><strong>Amplitude</strong> (máximo − mínimo), <strong>variância</strong> (média dos quadrados dos desvios em relação à média), <strong>desvio padrão</strong> (raiz da variância, na mesma unidade dos dados) e <strong>IQR</strong> (Q3 − Q1). Para uma amostra, a variância divide por <em>n</em> − 1; o pandas faz isso por padrão.</p><pre><code>df['nota'].mean(), df['nota'].median(), df['nota'].mode()
df['nota'].std()          # desvio padrão amostral
df['nota'].describe()     # contagem, média, desvio, mínimo, quartis e máximo</code></pre>`],
      ['Resumos por grupo', `<pre><code>df.groupby('turma')['nota'].agg(['count', 'mean', 'median', 'std'])
pd.crosstab(df['turma'], df['aprovado'], normalize='index')   # proporções por turma</code></pre><p>Comparar grupos é o coração da exploração: “a turma da manhã tem notas maiores que a da noite?” — mas cuidado com grupos pequenos, em que diferenças podem ser só acaso.</p>`],
      ['Correlação não é causalidade', `<p>O <strong>coeficiente de correlação de Pearson</strong> (de −1 a 1) mede a força da relação <em>linear</em> entre duas variáveis numéricas: <code>df['faltas'].corr(df['nota'])</code>. Uma correlação forte não prova que uma variável causa a outra: pode haver uma terceira variável por trás (vendas de sorvete e afogamentos sobem juntas por causa do calor), ou ser coincidência. Relações não lineares podem ter correlação perto de zero — sempre olhe o gráfico de dispersão.</p>`]
    ],
    exercicios: [
      ['Para os salários (em mil reais) 2, 2, 3, 3, 3, 4, 25, calcule média, mediana e moda. Qual representa melhor o salário típico?', 'Média = 42 ÷ 7 = 6; mediana = 3; moda = 3. A mediana (ou a moda), porque a média é puxada pelo valor 25.'],
      ['Duas turmas têm média 7. Na turma A o desvio padrão é 0,5 e na B é 2,5. O que isso significa?', 'Na turma A as notas estão concentradas perto de 7; na B estão muito mais espalhadas, com alunos bem acima e bem abaixo da média.'],
      ['Encontrou-se correlação de −0,8 entre faltas e nota. Podemos concluir que as faltas causam as notas baixas?', 'Não. Há uma associação forte e negativa, mas outras causas podem explicar ambas (trabalho, saúde, distância). Para falar em causa seria preciso um desenho de estudo apropriado.'],
      ['Escreva o código que mostra, para cada turma, a quantidade de alunos e a mediana das notas.', '<pre><code>df.groupby(\'turma\')[\'nota\'].agg([\'count\', \'median\'])</code></pre>']
    ]
  },
  {
    id: 'u6', n: 6, titulo: 'Visualização de dados', sim: 'estatistica',
    objetivos: ['Escolher o gráfico adequado à pergunta e ao tipo de variável.', 'Criar gráficos com Matplotlib e Seaborn.', 'Aplicar boas práticas de clareza, honestidade e acessibilidade.'],
    leitura: 'VanderPlas, cap. 4. Documentação do Seaborn.',
    secoes: [
      ['Que gráfico usar', `<table class="tbl"><tr><th>Pergunta</th><th>Gráfico</th></tr><tr><td>Comparar categorias</td><td>Barras (horizontais se os rótulos forem longos)</td></tr><tr><td>Evolução no tempo</td><td>Linhas</td></tr><tr><td>Distribuição de uma variável numérica</td><td>Histograma ou boxplot</td></tr><tr><td>Comparar distribuições entre grupos</td><td>Boxplots lado a lado</td></tr><tr><td>Relação entre duas numéricas</td><td>Dispersão</td></tr><tr><td>Parte de um todo (poucas categorias)</td><td>Barras empilhadas a 100%</td></tr></table><p>Gráficos de pizza e 3D dificultam a comparação de tamanhos; prefira barras.</p>`],
      ['Com Matplotlib e Seaborn', `<pre><code>import matplotlib.pyplot as plt
import seaborn as sns

sns.histplot(data=df, x='nota', bins=10)                 # distribuição
plt.show()
sns.boxplot(data=df, x='turma', y='nota')                # grupos
plt.show()
sns.scatterplot(data=df, x='faltas', y='nota', hue='turma')   # relação
plt.show()
df.groupby('mes')['vendas'].sum().plot(kind='line', marker='o')  # tempo
plt.title('Vendas por mês'); plt.ylabel('R$'); plt.show()</code></pre>`],
      ['Lendo um boxplot', `<p>A caixa vai de Q1 a Q3, com a linha da mediana no meio; os “bigodes” vão até os dados mais extremos dentro de 1,5×IQR; pontos isolados além disso são possíveis outliers. Boxplots lado a lado mostram de uma vez posição, dispersão e assimetria de vários grupos. O simulador desenha o histograma e o boxplot de qualquer conjunto de números.</p>`],
      ['Boas práticas', `<ul><li>Título que diz a <strong>conclusão</strong> (“Vendas caíram 20% no inverno”), eixos com unidade.</li><li>Em gráficos de barras, o eixo de valores <strong>começa em zero</strong>; cortar o eixo exagera diferenças.</li><li>Use cor com propósito (destacar, não decorar) e paletas seguras para daltonismo; não dependa só da cor — acrescente rótulos.</li><li>Ofereça texto alternativo ou a tabela com os valores para quem usa leitor de tela.</li><li>Menos é mais: remova grades pesadas, bordas e efeitos 3D.</li></ul>`]
    ],
    exercicios: [
      ['Escolha o gráfico: (a) número de matrículas por curso; (b) temperatura diária ao longo de um ano; (c) relação entre horas de estudo e nota; (d) distribuição das idades dos alunos.', '(a) Barras; (b) linhas; (c) dispersão; (d) histograma ou boxplot.'],
      ['Um gráfico de barras mostra vendas de 980 e 1 000 unidades com o eixo começando em 950. Qual o problema?', 'A barra de 1 000 parece três vezes maior que a de 980, embora a diferença real seja de 2%. Em barras, o eixo deve começar em zero.'],
      ['O que o boxplot mostra que a média não mostra?', 'A mediana, a dispersão (IQR), a assimetria e a presença de possíveis outliers.'],
      ['Escreva o código para boxplots das notas por turno usando Seaborn.', '<pre><code>sns.boxplot(data=df, x=\'turno\', y=\'nota\')\nplt.show()</code></pre>']
    ]
  },
  { id: 'u7', n: 7, titulo: 'Probabilidade, amostragem e inferência', pendente: true,
    resumo: 'Distribuições, amostras, intervalos de confiança e testes de hipótese com exemplos em Python.' },
  { id: 'u8', n: 8, titulo: 'Introdução ao aprendizado de máquina', pendente: true,
    resumo: 'Regressão e classificação supervisionadas com scikit-learn: preparar, treinar e prever.' },
  { id: 'u9', n: 9, titulo: 'Avaliação de modelos', pendente: true,
    resumo: 'Treino e teste, validação cruzada, métricas de erro, matriz de confusão e sobreajuste.' },
  { id: 'u10', n: 10, titulo: 'Ética, LGPD e comunicação de resultados', pendente: true,
    resumo: 'Vieses em dados e modelos, privacidade, reprodutibilidade, relatórios e painéis.' }
];
