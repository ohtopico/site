"""Jogos novos do 6º ano (EF06CO01 e EF06CO06). As outras habilidades do 6º ano já têm jogos no site (ver JOGOS_EXISTENTES em ano6.py)."""
from jogos4 import corredor


def txt(*ts):
    return [{'txt': t} for t in ts]


def t(s):
    return {'txt': s}


TIPOS = [t('texto'), t('número'), t('data'), t('sim ou não')]

JOGOS6 = [
    dict(
        id='colecoes-e-tipos', titulo='Coleções e Tipos de Dados', ano=6, habs=['EF06CO01'], tempo='15 min', leitura=True,
        resumo='Jogo para o 6º ano: agrupar informações em coleções e dizer o tipo de dado de cada uma (texto, número, data, sim ou não).',
        como=['Os programas guardam cada informação com um tipo: texto (nome, cidade), número (idade, nota), data (aniversário) e lógico, que só pode ser sim ou não (verdadeiro ou falso).',
              'Uma coleção junta informações do mesmo tipo, como a lista de nomes da turma ou a lista de notas de uma prova. Saber o tipo diz o que dá para fazer: somar números, ordenar datas, procurar texto.'],
        fases=[
            dict(tipo='classificar', fala='Guarde cada informação na coleção do seu tipo.', caixas=TIPOS,
                 itens=[{'f': t('Ana'), 'caixa': 0}, {'f': t('12'), 'caixa': 1}, {'f': t('07/09/2026'), 'caixa': 2}, {'f': t('sim'), 'caixa': 3},
                        {'f': t('Porto Alegre'), 'caixa': 0}, {'f': t('8,5'), 'caixa': 1}]),
            dict(tipo='pares', fala='Cada campo do cadastro da biblioteca tem um tipo. Ligue o campo ao tipo.',
                 pares=[[t('nome do livro'), t('texto')], [t('número de páginas'), t('número')], [t('data de devolução'), t('data')], [t('está emprestado?'), t('sim ou não')]]),
            dict(tipo='escolha', fala='Qual coleção tem só informações do mesmo tipo?',
                 opcoes=[t('7, 9, 10, 6'), t('Ana, 12, sim'), t('03/05, Bia, 4')], certa=0),
            dict(tipo='escolha', fala='Com qual tipo de dado dá para fazer a média da turma?', opcoes=txt('número', 'texto', 'sim ou não'), certa=0),
            dict(tipo='classificar', fala='Agora a ficha de saúde da escola. Guarde cada dado na coleção certa.', caixas=TIPOS,
                 itens=[{'f': t('1,45 m'), 'caixa': 1}, {'f': t('tem alergia? não'), 'caixa': 3}, {'f': t('15/03/2014'), 'caixa': 2}, {'f': t('Rua das Flores'), 'caixa': 0},
                        {'f': t('38 kg'), 'caixa': 1}, {'f': t('vacina em dia? sim'), 'caixa': 3}]),
            dict(tipo='escolha', fala='O telefone 51 99999-0000 é guardado como texto, e não como número. Por quê?',
                 opcoes=txt('Não fazemos contas com telefone', 'Telefone não tem algarismos', 'Número não pode ter espaço'), certa=0),
            dict(tipo='vf', fala='Verdadeiro ou falso: o dado lógico só pode ter dois valores, sim ou não.', cena=[t('sim'), t('não')], resposta=True),
            dict(tipo='sequencia', fala='Ordene a coleção de datas, da mais antiga para a mais nova.', itens=txt('02/01/2026', '15/03/2026', '30/06/2026', '12/10/2026')),
        ]),
    dict(
        id='um-algoritmo-para-todos', titulo='Um Algoritmo para Todos', ano=6, habs=['EF06CO06'], tempo='15–20 min', leitura=True, personagem='robo', alvo='estrela', parede='arvore',
        resumo='Jogo para o 6º ano: comparar casos parecidos, achar o que muda (o parâmetro) e criar um só algoritmo que resolve todos.',
        como=['Generalizar é olhar vários casos de um problema, ver o que fica igual e o que muda, e escrever uma solução só que serve para todos. O que muda vira um parâmetro, uma entrada do algoritmo.',
              'Nas fases do robô, as escadas têm tamanhos diferentes, mas o desenho é o mesmo: só muda o número de repetições.'],
        fases=[
            dict(tipo='escolha', fala='1 mesa tem 4 cadeiras, 2 mesas têm 8, 3 mesas têm 12. Qual regra serve para qualquer número de mesas?',
                 opcoes=txt('cadeiras = mesas × 4', 'cadeiras = mesas + 3', 'cadeiras = 12'), certa=0),
            dict(tipo='caminho', fala='Escada de 3 degraus. Use um grupo de repetição e escolha quantas vezes ele repete.', cols=4, rows=4, inicio=[0, 0], alvos=[[3, 3]], laco=True,
                 max=3, paredes=corredor(4, 4, [0, 0], 'dbdbdb')),
            dict(tipo='caminho', fala='Escada de 4 degraus. O programa é o mesmo, só muda o número de vezes.', cols=5, rows=5, inicio=[0, 0], alvos=[[4, 4]], laco=True,
                 max=3, paredes=corredor(5, 5, [0, 0], 'dbdbdbdb')),
            dict(tipo='escolha', fala='Para subir uma escada de N degraus, quantas vezes o grupo [direita, baixo] repete?', opcoes=txt('N vezes', '2 vezes', 'N + 2 vezes'), certa=0),
            dict(tipo='escolha', fala='Para 2 pessoas, 4 fatias; para 3 pessoas, 6 fatias; para 5 pessoas, 10 fatias. O que muda de um caso para o outro?',
                 opcoes=txt('o número de pessoas', 'as fatias por pessoa', 'o tamanho da pizza'), certa=0),
            dict(tipo='escolha', fala='Qual algoritmo serve para qualquer número de pessoas?',
                 opcoes=txt('receba P; fatias = P × 2; mostre fatias', 'fatias = 4; mostre fatias', 'receba P; fatias = 10; mostre fatias'), certa=0),
            dict(tipo='caminho', modo='prever', fala='O mesmo programa com parâmetro 4: repita 4 vezes [direita]. Onde o robô para?', cols=5, rows=3, inicio=[0, 1], alvos=[],
                 programa=[{'laco': 4, 'corpo': [{'d': 'd'}]}]),
            dict(tipo='sequencia', fala='Ordene os passos de generalizar um problema.',
                 itens=txt('resolver alguns casos', 'comparar os casos', 'achar o que muda', 'escrever um algoritmo com parâmetro', 'testar com um caso novo')),
        ]),
]
