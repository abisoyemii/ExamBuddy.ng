import re, os
BASE = os.path.dirname(os.path.abspath(__file__))

PAGES = [
    ('/', 'index.html'),
    ('/about/', 'about/index.html'),
    ('/waec/', 'waec/index.html'),
    ('/jamb/', 'jamb/index.html'),
    ('/neco/', 'neco/index.html'),
    ('/nysc/', 'nysc/index.html'),
    ('/ielts/', 'ielts/index.html'),
    ('/sat/', 'sat/index.html'),
    ('/blog/', 'blog/index.html'),
    ('/cutoff-marks/', 'cutoff-marks/index.html'),
    ('/past-questions/', 'past-questions/index.html'),
    ('/study-resources/', 'study-resources/index.html'),
    ('/contact/', 'contact/index.html'),
    ('/privacy/', 'privacy/index.html'),
    ('/disclaimer/', 'disclaimer/index.html'),
    ('/exam-portals/', 'exam-portals/index.html'),
    ('/pq-waec/', 'pq-waec/index.html'),
    ('/pq-jamb/', 'pq-jamb/index.html'),
    ('/pq-neco/', 'pq-neco/index.html'),
    ('/pq-nabteb/', 'pq-nabteb/index.html'),
    ('/login/', 'login/index.html'),
]

with open('audit_results.txt', 'w', encoding='utf-8') as out:
    passed = []
    failed = []

    for url, relpath in PAGES:
        path = os.path.join(BASE, relpath)
        if not os.path.exists(path):
            failed.append(f'MISSING: {relpath}')
            continue
        html = open(path, 'rb').read().decode('utf-8', 'replace')
        page_issues = []

        # Title
        titles = re.findall(r'<title>([^<]+)</title>', html)
        if not titles:
            page_issues.append('Missing title')
        elif len(titles) > 1:
            page_issues.append(f'Duplicate title x{len(titles)}')
        else:
            t = titles[0].strip()
            if len(t) > 70:
                page_issues.append(f'Title too long ({len(t)} chars)')

        # Meta description
        if html.count('name="description"') == 0:
            page_issues.append('Missing meta description')
        elif html.count('name="description"') > 1:
            page_issues.append('Duplicate meta description')

        # Canonical
        canons = re.findall(r'<link rel="canonical"[^>]+>', html)
        if not canons:
            page_issues.append('Missing canonical')
        elif len(canons) > 1:
            page_issues.append(f'Duplicate canonical x{len(canons)}')
        elif 'www.exambuddy.com.ng' in canons[0]:
            page_issues.append('Wrong canonical domain')

        # Robots
        noindex_ok = url in ('/login/', '/dashboard/', '/reset-password/')
        robots = re.findall(r'<meta name="robots"[^>]+>', html)
        if not robots and not noindex_ok:
            page_issues.append('Missing robots meta')
        if robots and 'noindex' in robots[0].lower() and not noindex_ok:
            page_issues.append('Unexpected noindex')

        # Duplicate charset
        if html.count('<meta charset=') > 1:
            page_issues.append(f'Duplicate charset x{html.count("<meta charset=")}')

        # H1
        h1s = re.findall(r'<h1[\s>]', html)
        if not h1s:
            page_issues.append('Missing H1')
        elif len(h1s) > 1:
            page_issues.append(f'Multiple H1 x{len(h1s)}')

        # OG tags
        for og in ['og:title','og:description','og:image','og:url']:
            if og not in html:
                page_issues.append(f'Missing {og}')

        # Twitter card
        if 'twitter:card' not in html:
            page_issues.append('Missing twitter:card')

        if page_issues:
            failed.append(f'{url}: ' + ' | '.join(page_issues))
        else:
            passed.append(url)

    out.write(f'PASSED: {len(passed)}/{len(PAGES)}\n')
    for u in passed:
        out.write(f'  OK  {u}\n')
    out.write(f'\nFAILED: {len(failed)}/{len(PAGES)}\n')
    for f in failed:
        out.write(f'  FAIL {f}\n')

    # Sitemap
    sm = open(os.path.join(BASE,'sitemap.xml'), encoding='utf-8').read()
    urls = re.findall(r'<loc>(.*?)</loc>', sm)
    dupes = [u for u in set(urls) if urls.count(u) > 1]
    out.write(f'\nSITEMAP: {len(urls)} URLs | dupes={dupes} | wrong_domain={"www.exambuddy.com.ng" in sm}\n')

    # robots.txt
    rb = open(os.path.join(BASE,'robots.txt'), encoding='utf-8').read()
    out.write(f'ROBOTS: sitemap_ok={"https://exambuddy.ng/sitemap.xml" in rb}\n')

    # 404 page
    out.write(f'404 PAGE: {"exists" if os.path.exists(os.path.join(BASE,"404.html")) else "MISSING"}\n')
