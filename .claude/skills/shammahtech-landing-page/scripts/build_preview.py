#!/usr/bin/env python3
"""Gera um HTML único (CSS, JS e mídia embutidos) da landing page, para publicar como artefato.

Uso: python3 build_preview.py <saida.html> [pasta_do_site]
- Embute assets/css/tailwind.css, styles.css e script.js.
- Troca src/href/poster de assets/img/* por data: URIs.
- Remove a <source> MP4 (o WebM basta e evita dobrar o peso).
- Remove <!DOCTYPE>, <html>, <head>, <body> e metas charset/viewport (o publicador cria o esqueleto).
- Mantém as classes do <body> num <div> de fora e fixa o fundo escuro no body.
"""
import base64, mimetypes, os, re, sys

out = sys.argv[1]
root = sys.argv[2] if len(sys.argv) > 2 else os.getcwd()
os.chdir(root)

html = open("index.html", encoding="utf-8").read()
body_cls = (re.search(r'<body[^>]*class="([^"]*)"', html) or [None, ""])[1]


def read(p):
    return open(p, encoding="utf-8").read()


html = re.sub(
    r'<link rel="stylesheet" href="((?:assets/css/tailwind|styles)\.css)">',
    lambda m: "<style>" + read(m.group(1)) + "</style>", html)
html = html.replace('<script src="script.js"></script>', "<script>" + read("script.js") + "</script>")
html = re.sub(r'\s*<source src="assets/img/[^"]+\.mp4" type="video/mp4">', "", html)


def embed(m):
    path = m.group(2)
    mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
    data = base64.b64encode(open(path, "rb").read()).decode()
    return f'{m.group(1)}data:{mime};base64,{data}{m.group(3)}'


# só caminhos relativos locais (as URLs absolutas do og:image não casam)
html = re.sub(r'((?:src|href|poster)=")(assets/img/[^"]+)(")', embed, html)
html = re.sub(r"<!DOCTYPE html>\s*", "", html, flags=re.I)
html = re.sub(r"</?(html|head|body)\b[^>]*>", "", html, flags=re.I)
html = re.sub(r'<meta charset[^>]*>|<meta name="viewport"[^>]*>', "", html)

end_style = html.index("</style>", html.rindex("<style>")) + len("</style>")
html = (html[:end_style]
        + "\n<style>body{background:#020617;color:#f1f5f9}</style>\n"
        + f'<div class="{body_cls}">' + html[end_style:] + "</div>")

open(out, "w", encoding="utf-8").write(html)
print(f"{out}: {len(html)/1e6:.1f} MB")
