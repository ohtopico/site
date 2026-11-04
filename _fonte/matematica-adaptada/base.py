"""Atalho para montar uma ficha nova: as habilidades vêm só pelo código e o texto sai de bncc.py."""
from bncc import habilidades

_TEXTOS = {h['codigo']: h['texto'] for h in habilidades()}


def texto_curto(codigo):
    t = _TEXTOS[codigo].rstrip('.')
    return t[0].lower() + t[1:]


def ficha(slug, titulo, anos, resumo, codigos, tempo, material, passos, perfis, gabarito, A, B, C, extra=None):
    """codigos: lista de códigos da BNCC; um item pode ser (código, observação) para marcar a versão (ex.: 'versão C')."""
    habs = []
    for c in codigos:
        cod, obs = (c, '') if isinstance(c, str) else c
        habs.append((cod, texto_curto(cod) + (f' ({obs})' if obs else '')))
    d = dict(slug=slug, titulo=titulo, anos=anos, resumo=resumo, habilidades=habs, tempo=tempo, material=material,
             passos=passos, perfis=dict(zip(('down', 'tea', 'tdah'), perfis)), gabarito=dict(zip('ABC', gabarito)),
             versoes={'A': A, 'B': B, 'C': C})
    if extra:
        d.update(extra)
    return d
