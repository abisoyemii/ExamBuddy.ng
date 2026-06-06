import pathlib, re
from urllib.parse import urlparse
root = pathlib.Path('.').resolve()
html_files = sorted(root.rglob('*.html'))
valid=set()
for p in html_files:
    rel='/' + str(p.relative_to(root)).replace('\\','/')
    valid.add(rel)
    if rel.endswith('/index.html'):
        valid.add(rel[:-10]+'')
        valid.add(rel[:-10]+'/')
if root.joinpath('index.html').exists():
    valid.add('/')

broken=[]
for p in html_files:
    text = p.read_text('utf-8', errors='ignore')
    for match in re.findall(r'href=["\]([^"\#?]+)', text):
        href = match.strip()
        if not href or href.startswith(('http://','https://','mailto:','tel:','javascript:','#')):
            continue
        if href.startswith('//'):
            continue
        if href.startswith('/'):
            target = href
        else:
            target = '/' + str((p.parent / href).resolve().relative_to(root)).replace('\\','/')
        if target.endswith('/index.html'):
            target = target[:-10] + '/'
        if target not in valid:
            broken.append((str(p.relative_to(root)), href, target))

print('TOTAL HTML files', len(html_files))
print('VALID target count', len(valid))
print('BROKEN LINKS', len(broken))
for i,(src,href,target) in enumerate(broken[:200],1):
    print(i, src, '->', href, '=>', target)
