import re, os

BASE = os.path.dirname(os.path.abspath(__file__))

issues = []

# 1. Check pq-jamb for placeholder/fake explanations
with open('pq-jamb/index.html', 'rb') as f:
    jamb = f.read().decode('utf-8', 'replace')

fake_exp = jamb.count('correct because mathematical proof') + jamb.count('correct because scientific fact') + jamb.count('correct because grammatical rule') + jamb.count('correct because definition matches')
with open('audit_out.txt', 'w', encoding='utf-8') as out:
    out.write('=== CONTENT & ADSENSE AUDIT ===\n\n')
    out.write(f'pq-jamb fake explanations: {fake_exp}\n')

    # 2. Check pq-waec question count
    with open('pq-waec/index.html', 'rb') as f:
        waec = f.read().decode('utf-8', 'replace')
    waec_qs = waec.count('"year":')
    out.write(f'pq-waec question objects: {waec_qs}\n')
    jamb_qs = jamb.count('"year":')
    out.write(f'pq-jamb question objects: {jamb_qs}\n')

    # 3. Check all pages for missing H1
    pages = ['index.html','waec/index.html','jamb/index.html','neco/index.html',
             'nysc/index.html','blog/index.html','contact/index.html',
             'about/index.html','cutoff-marks/index.html','study-resources/index.html',
             'pq-waec/index.html','pq-jamb/index.html','past-questions/index.html',
             'exam-portals/index.html','ielts/index.html','sat/index.html']

    out.write('\n=== H1 COUNTS ===\n')
    for p in pages:
        try:
            d = open(p, 'rb').read().decode('utf-8', 'replace')
            h1 = d.count('<h1')
            out.write(f'{p}: h1={h1}\n')
        except:
            out.write(f'{p}: FILE NOT FOUND\n')

    # 4. Check for broken internal links patterns
    out.write('\n=== BROKEN LINK PATTERNS ===\n')
    for p in pages:
        try:
            d = open(p, 'rb').read().decode('utf-8', 'replace')
            bad = re.findall(r'href="[^"]*//[^"]*"', d)
            bad2 = re.findall(r'href="/study-resorces/', d)
            if bad or bad2:
                out.write(f'{p}: double-slash={bad}, typo={bad2}\n')
        except: pass

    # 5. Check exam portal links are real
    out.write('\n=== OFFICIAL PORTAL LINKS ===\n')
    portals = ['waecdirect.org', 'waec.org.ng', 'jamb.org.ng', 'neco.gov.ng', 'portal.nysc.gov.ng']
    for portal in portals:
        count = sum(1 for p in pages if portal in open(p,'rb').read().decode('utf-8','replace') if os.path.exists(p))
        out.write(f'{portal}: found in {count} pages\n')

    out.write('\nDone.\n')
