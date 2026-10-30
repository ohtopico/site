/* =====================================================================
   Arquivos do Word (.docx) e do Excel (.xlsx) gerados no navegador, sem biblioteca externa.
   MDO.docx(blocos, {autor, titulo}) e MDO.xlsx(abas, {autor}) devolvem um Blob; MDO.baixar(blob, nome) salva.
   Blocos do Word: {t: 'titulo'|'h1'|'h2'|'p'|'li'|'linhas'|'quebra'|'tabela', txt, negrito, n, linhas: [[...]]}
   Abas do Excel: {nome, larguras: [..], linhas: [[valor | {v, cor: 'RRGGBB', negrito, f: 'fórmula'}]]}
   Autora: Júlia Roberta Quoos Alves.
   ===================================================================== */
(function () {
  const enc = new TextEncoder();
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = b => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };

  /* ZIP sem compressão (método "store"): o Word e o Excel abrem normalmente. */
  function zip(arquivos) {
    const partes = [], central = []; let pos = 0;
    const u16 = v => [v & 255, (v >> 8) & 255], u32 = v => [v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >>> 24) & 255];
    for (const [nome, txt] of arquivos) {
      const n = enc.encode(nome), d = typeof txt === 'string' ? enc.encode(txt) : txt, c = crc32(d);
      const cab = [...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(c), ...u32(d.length), ...u32(d.length), ...u16(n.length), ...u16(0)];
      partes.push(Uint8Array.from(cab), n, d);
      central.push(Uint8Array.from([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(c), ...u32(d.length), ...u32(d.length),
        ...u16(n.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(pos)]), n);
      pos += cab.length + n.length + d.length;
    }
    const tam = central.reduce((s, x) => s + x.length, 0);
    const fim = Uint8Array.from([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(arquivos.length), ...u16(arquivos.length), ...u32(tam), ...u32(pos), ...u16(0)]);
    return new Blob([...partes, ...central, fim]);
  }
  const x = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
  const core = (o) => XML + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" ' +
    'xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    `<dc:title>${x(o.titulo || '')}</dc:title><dc:creator>${x(o.autor || 'Júlia Roberta Quoos Alves')}</dc:creator></cp:coreProperties>`;

  /* ---------- Word ---------- */
  function docx(blocos, o = {}) {
    const run = (t, p = {}) => `<w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>${p.b ? '<w:b/>' : ''}<w:sz w:val="${p.sz || 22}"/></w:rPr><w:t xml:space="preserve">${x(t)}</w:t></w:r>`;
    const par = (conteudo, p = {}) => `<w:p><w:pPr>${p.estilo ? `<w:pStyle w:val="${p.estilo}"/>` : ''}<w:spacing w:before="${p.antes || 0}" w:after="${p.depois == null ? 120 : p.depois}"/>${p.recuo ? `<w:ind w:left="${p.recuo}" w:hanging="300"/>` : ''}${p.quebra ? '<w:pageBreakBefore/>' : ''}</w:pPr>${conteudo}</w:p>`;
    const corpo = blocos.map(b => {
      if (b.t === 'titulo') return par(run(b.txt, { b: 1, sz: 40 }), { estilo: 'Title', depois: 200 });
      if (b.t === 'h1') return par(run(b.txt, { b: 1, sz: 30 }), { estilo: 'Heading1', antes: 240, quebra: b.quebra });
      if (b.t === 'h2') return par(run(b.txt, { b: 1, sz: 24 }), { estilo: 'Heading2', antes: 180 });
      if (b.t === 'li') return par(run('•  ' + b.txt, { b: b.negrito }), { recuo: 500 });
      if (b.t === 'quebra') return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
      if (b.t === 'linhas') return Array.from({ length: b.n || 3 }, () => par(run('_'.repeat(86), { sz: 20 }), { depois: 60 })).join('');
      if (b.t === 'tabela') {
        const borda = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(l => `<w:${l} w:val="single" w:sz="8" w:color="111111"/>`).join('');
        return `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${borda}</w:tblBorders></w:tblPr>` +
          b.linhas.map((l, i) => `<w:tr>${l.map(c => `<w:tc><w:tcPr>${i === 0 ? '<w:shd w:val="clear" w:color="auto" w:fill="FFF36B"/>' : ''}</w:tcPr>${par(run(c, { b: i === 0, sz: 20 }), { depois: 40 })}</w:tc>`).join('')}</w:tr>`).join('') +
          '</w:tbl>' + par('', { depois: 80 });
      }
      return par(run(b.txt, { b: b.negrito, sz: b.sz }), { antes: b.antes });
    }).join('');
    const doc = XML + '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + corpo +
      (o.rodape ? par(run(o.rodape, { sz: 16 }), { antes: 240 }) : '') +
      '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1000" w:right="1100" w:bottom="1000" w:left="1100" w:header="500" w:footer="500" w:gutter="0"/></w:sectPr></w:body></w:document>';
    const estilos = XML + '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
      '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/></w:rPr></w:style>' +
      [['Title', 'Title', 0], ['Heading1', 'heading 1', 1], ['Heading2', 'heading 2', 2]].map(([id, nome, nv]) =>
        `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${nome}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/>${nv ? `<w:pPr><w:keepNext/><w:outlineLvl w:val="${nv - 1}"/></w:pPr>` : ''}</w:style>`).join('') +
      '</w:styles>';
    return zip([
      ['[Content_Types].xml', XML + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>'],
      ['_rels/.rels', XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'],
      ['word/_rels/document.xml.rels', XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
      ['word/document.xml', doc], ['word/styles.xml', estilos], ['docProps/core.xml', core(o)]
    ]);
  }

  /* ---------- Excel ---------- */
  function xlsx(abas, o = {}) {
    const estilos = ['|'];
    const idEstilo = c => { const k = (c.cor || '') + '|' + (c.negrito ? 'b' : ''); let i = estilos.indexOf(k); if (i < 0) { estilos.push(k); i = estilos.length - 1; } return i; };
    const col = n => { let s = ''; n++; while (n) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };
    const folhas = abas.map(a => {
      const linhas = a.linhas.map((l, r) => `<row r="${r + 1}">${l.map((v, c) => {
        const cel = v !== null && typeof v === 'object' ? v : { v }; const ref = col(c) + (r + 1); const s = idEstilo(cel);
        if (cel.f) return `<c r="${ref}" s="${s}"><f>${x(cel.f)}</f></c>`;
        if (cel.v === '' || cel.v == null) return `<c r="${ref}" s="${s}"/>`;
        return typeof cel.v === 'number' ? `<c r="${ref}" s="${s}"><v>${cel.v}</v></c>` : `<c r="${ref}" s="${s}" t="inlineStr"><is><t xml:space="preserve">${x(cel.v)}</t></is></c>`;
      }).join('')}</row>`).join('');
      const cols = a.larguras ? `<cols>${a.larguras.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>` : '';
      return XML + `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0">${a.congelar ? `<pane xSplit="${a.congelar[0]}" ySplit="${a.congelar[1]}" topLeftCell="${col(a.congelar[0])}${a.congelar[1] + 1}" state="frozen"/>` : ''}</sheetView></sheetViews>${cols}<sheetData>${linhas}</sheetData></worksheet>`;
    });
    const fills = estilos.map(k => k.split('|')[0]);
    const unicasCor = [...new Set(fills.filter(Boolean))];
    const st = XML + '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<fonts count="2"><font><sz val="11"/><name val="Arial"/></font><font><b/><sz val="11"/><name val="Arial"/></font></fonts>' +
      `<fills count="${2 + unicasCor.length}"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>${unicasCor.map(c => `<fill><patternFill patternType="solid"><fgColor rgb="FF${c}"/><bgColor indexed="64"/></patternFill></fill>`).join('')}</fills>` +
      '<borders count="2"><border/><border><left style="thin"><color rgb="FFBBBBBB"/></left><right style="thin"><color rgb="FFBBBBBB"/></right><top style="thin"><color rgb="FFBBBBBB"/></top><bottom style="thin"><color rgb="FFBBBBBB"/></bottom></border></borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      `<cellXfs count="${estilos.length}">${estilos.map(k => { const [cor, b] = k.split('|'); const f = cor ? 2 + unicasCor.indexOf(cor) : 0;
        return `<xf xfId="0" fontId="${b ? 1 : 0}" fillId="${f}" borderId="1" applyFont="1" applyFill="1" applyBorder="1"><alignment vertical="center" wrapText="1"/></xf>`; }).join('')}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
    const nomes = abas.map((a, i) => x(String(a.nome || 'Aba ' + (i + 1)).replace(/[\\/?*[\]:]/g, ' ').slice(0, 31)));
    return zip([
      ['[Content_Types].xml', XML + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
        abas.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('') +
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>'],
      ['_rels/.rels', XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'],
      ['xl/workbook.xml', XML + '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
        nomes.map((n, i) => `<sheet name="${n}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('') + '</sheets></workbook>'],
      ['xl/_rels/workbook.xml.rels', XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        abas.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('') +
        `<Relationship Id="rId${abas.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
      ['xl/styles.xml', st], ...folhas.map((f, i) => [`xl/worksheets/sheet${i + 1}.xml`, f]), ['docProps/core.xml', core(o)]
    ]);
  }

  function baixar(blob, nome) {
    const tipos = { docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([blob], { type: tipos[nome.split('.').pop()] || 'application/octet-stream' }));
    a.download = nome; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  window.MDO = { docx, xlsx, zip, baixar };
})();
