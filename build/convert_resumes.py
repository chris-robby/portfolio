"""Turns Resumes/ into browser-viewable PDFs in site/resumes/ with company-neutral
names and metadata. Cover letters are deliberately not published.
Usage: python build/convert_resumes.py"""
import html, os, re, subprocess, sys, tempfile
import docx
from pypdf import PdfReader, PdfWriter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, OUT = os.path.join(ROOT, 'Resumes'), os.path.join(ROOT, 'site', 'resumes')
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
P = 'Chris-Robby_Twungubumwe_'
MAP = {
 P+'Resume_AnalytiChem_SoftwareDev.pdf':      ('Software_Developer_EN', 'Software Developer'),
 P+'Resume_FutureElectronics_FullStack.pdf':  ('Full_Stack_EN', 'Full Stack Developer'),
 P+'Resume_Xsolla_FrontEnd.docx':             ('Front_End_EN', 'Front-End Developer'),
 P+'Resume_Fujitsu_JuniorDev.docx':           ('Junior_Developer_EN', 'Junior Software Developer'),
 P+'Resume_Jeppesen_ForeFlight.docx':         ('Python_Testing_EN', 'Software Application Developer'),
 P+'Resume_Alignerr_CodeReview.pdf':          ('AI_Code_Review_EN', 'Software Engineer, AI Code Review'),
 P+'CV_MDA_Automatisation.pdf':               ('Automatisation_DevOps_FR', 'Developpeur logiciel, Automatisation'),
 P+'CV_LGI_Developpeur.docx':                 ('IA_Agentique_FR', 'Developpeur logiciel, IA agentique'),
 P+'CV_Avionique_Logiciel.docx':              ('Cpp_Verification_FR', 'Developpeur logiciel, C/C++ et verification'),
}
CSS = """@page{size:letter;margin:.39in .43in}
body{margin:0;font:10pt/1.22 Calibri,Carlito,sans-serif;color:#000}
p{margin:0}.row{display:flex;justify-content:space-between;gap:12px;margin-top:4px}
.c{text-align:center}.h{color:#2B4C7E;font-weight:700;font-size:10.5pt;letter-spacing:.08em;
border-bottom:1px solid #2B4C7E;margin:9px 0 4px;padding-bottom:1px;break-after:avoid}
ul{margin:1px 0 0;padding-left:28px}li{margin:1px 0}a{color:inherit;text-decoration:none}"""

def run_html(r):
    t = html.escape(r.text.replace('\t', ''))
    if not t: return ''
    s = []
    if r.bold: s.append('font-weight:700')
    if r.italic: s.append('font-style:italic')
    if r.font.size: s.append(f'font-size:{r.font.size.pt}pt')
    if r.font.color is not None and r.font.color.type is not None: s.append(f'color:#{r.font.color.rgb}')
    return f'<span style="{";".join(s)}">{t}</span>'

def linkify(h):
    h = re.sub(r'([\w.]+@[\w.]+\.\w+)', r'<a href="mailto:\1">\1</a>', h)
    for u in ('linkedin.com/in/chris-robby-twungubumwe', 'github.com/chris-robby/?', 'theartofconsistency.app'):
        h = re.sub(rf'(?<![\w/.])({u})', r'<a href="https://\1">\1</a>', h, count=1)
    return h

def to_html(path, title):
    body, in_ul = [], False
    for i, p in enumerate(docx.Document(path).paragraphs):
        if not p.text.strip(): continue
        is_li = p.style.name == 'List Paragraph'
        if is_li and not in_ul: body.append('<ul>'); in_ul = True
        if not is_li and in_ul: body.append('</ul>'); in_ul = False
        inner = ''.join(run_html(r) for r in p.runs)
        if is_li: body.append(f'<li>{inner}</li>')
        elif p.alignment == 1: body.append(f'<p class="c">{linkify(inner)}</p>')
        elif p.text.isupper() or (p.text.upper() == p.text and len(p.text) < 40):
            body.append(f'<p class="h">{html.escape(p.text)}</p>')
        elif any('\t' in r.text for r in p.runs):
            k = next(j for j, r in enumerate(p.runs) if '\t' in r.text)
            l = ''.join(run_html(r) for r in p.runs[:k]); rr = ''.join(run_html(r) for r in p.runs[k:])
            body.append(f'<div class="row"><p>{l}</p><p style="white-space:nowrap">{rr}</p></div>')
        else: body.append(f'<p style="margin-top:2px">{inner}</p>')
    if in_ul: body.append('</ul>')
    return f'<!doctype html><html><head><meta charset="utf-8"><title>{title}</title><style>{CSS}</style></head><body>{"".join(body)}</body></html>'

def clean(src, dst, title):
    r = PdfReader(src); w = PdfWriter()
    for pg in r.pages: w.add_page(pg)
    w.add_metadata({'/Title': 'Chris-Robby Twungubumwe, ' + title, '/Author': 'Chris-Robby Twungubumwe'})
    with open(dst, 'wb') as f: w.write(f)
    return len(r.pages)

os.makedirs(OUT, exist_ok=True)
with tempfile.TemporaryDirectory() as tmp:
    for name, (slug, title) in MAP.items():
        src, dst = os.path.join(SRC, name), os.path.join(OUT, f'Chris-Robby_Twungubumwe_{slug}.pdf')
        if name.endswith('.docx'):
            h, raw = os.path.join(tmp, slug + '.html'), os.path.join(tmp, slug + '.pdf')
            open(h, 'w', encoding='utf-8').write(to_html(src, title))
            subprocess.run([CHROME, '--headless=new', '--disable-gpu', f'--user-data-dir={tmp}/p', '--no-pdf-header-footer',
                            f'--print-to-pdf={raw}', 'file:///' + h.replace(os.sep, '/')], check=True, capture_output=True, timeout=90)
            src = raw
        n = clean(src, dst, title)
        # verify nothing was lost and no target company leaked
        text = ' '.join(p.extract_text() for p in PdfReader(dst).pages)
        norm = lambda s: re.sub(r'\s+', '', s)
        missing = []
        if name.endswith('.docx'):
            nt = norm(text).replace('-', '')
            missing = [p.text[:50] for p in docx.Document(os.path.join(SRC, name)).paragraphs
                       if p.text.strip() and norm(p.text).replace('-', '') not in nt]
        meta = str(PdfReader(dst).metadata)
        leak = re.findall(r'Fujitsu|Jeppesen|ForeFlight|Xsolla|Alignerr|AnalytiChem|Future ?Electronics|MDA|LGI', text + meta)
        print(f'{slug:28} {n}pp missing={missing} leak={leak}')
