from pathlib import Path
import re

root = Path('.').resolve()
ignore_files = {'index.html', 'googlefe1103ddcf2343f0.html'}
page_files = [p for p in root.glob('*.html') if p.name not in ignore_files]
page_files.sort()

mapping = {}
domains = ['https://www.exambuddy.com.ng/', 'https://exambuddy.com/', 'https://exambuddy.ng/']
for page in page_files + [root / 'index.html']:
    name = page.name
    if name == 'index.html':
        route = '/'
    else:
        route = '/' + page.stem + '/'
    mapping[name] = route
    mapping[name + '?'] = route + '?'
    for dom in domains:
        mapping[dom + name] = dom.rstrip('/') + route
        mapping[dom + name + '?'] = dom.rstrip('/') + route + '?'
        mapping[dom + name.replace('https://', '')] = dom.rstrip('/') + route

# sort replacement keys by length descending to avoid substring collisions
replace_keys = sorted(mapping.keys(), key=len, reverse=True)

# root-relative assets replacement patterns
asset_patterns = [
    (re.compile(r'(href|src)=(["\"])css/'), r'\1=\2/css/'),
    (re.compile(r'(href|src)=(["\"])js/'), r'\1=\2/js/'),
    (re.compile(r'(href|src)=(["\"])images/'), r'\1=\2/images/'),
    (re.compile(r'(href|src)=(["\"])assests/'), r'\1=\2/assests/'),
    (re.compile(r'(href|src)=(["\"])manifest\.json'), r'\1=\2/manifest.json'),
    (re.compile(r'(href|src)=(["\"])google-site-verification\.html'), r'\1=\2/google-site-verification.html'),
]

# function to rewrite text files
exts = {'.html', '.js', '.xml', '.txt'}
for path in root.rglob('*'):
    if path.suffix.lower() not in exts:
        continue
    if path.is_dir():
        continue
    text = path.read_text(encoding='utf-8')
    original = text

    # update resource paths
    for pat, repl in asset_patterns:
        text = pat.sub(repl, text)

    # update route references
    for key in replace_keys:
        text = text.replace(key, mapping[key])

    # update searchAction variants and old html? query path replacements
    text = re.sub(r'(["\'])([^"\']+?)\.html\?','\1/\2/?', text)
    text = re.sub(r'(https?://(?:www\.)?exambuddy(?:\.com(?:\.ng)?)?/)([^"\']+?)\.html\?','\1\2/?', text)

    # update folder-style page detection in shared-layout.js and main.js
    text = text.replace(
        "const page = location.pathname.split('/').pop().replace('.html', '') || 'index';",
        "const rawPath = location.pathname.replace(/\/$/, ''); const pageName = rawPath.split('/').pop(); const page = pageName === '' ? 'index' : pageName.replace('.html', '');"
    )

    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Updated references in {path.relative_to(root)}')

# Move pages into folders and create redirect stubs
for page in page_files:
    name = page.name
    dest_dir = root / page.stem
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_path = dest_dir / 'index.html'
    print(f'Moving {page.name} -> {dest_dir}/index.html')
    page.rename(dest_path)

    redirect = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url={mapping[name]}">
  <meta name="robots" content="noindex">
  <link rel="canonical" href="https://www.exambuddy.com.ng{mapping[name]}" />
  <title>Redirecting…</title>
</head>
<body>
  <p>Redirecting to <a href="{mapping[name]}">{mapping[name]}</a></p>
</body>
</html>
'''
    (root / name).write_text(redirect, encoding='utf-8')
    print(f'Created redirect stub at {name}')

print('Done. Remember to verify new URL routes and asset loading.')
