#!/usr/bin/env python3
"""
Comprehensive SEO Audit Script for ExamBuddy Nigeria
Identifies: broken links, missing metadata, orphan pages, noindex issues, etc.
"""

import os
import re
from pathlib import Path
from collections import defaultdict
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup

BASE_DIR = Path(__file__).parent
DOMAIN = "https://exambuddy.ng"

class SEOAudit:
    def __init__(self):
        self.html_files = []
        self.pages = {}
        self.links = defaultdict(list)
        self.broken_links = []
        self.issues = defaultdict(list)
        self.orphan_pages = set()
        
    def get_relative_url(self, filepath):
        """Convert file path to URL"""
        rel_path = filepath.relative_to(BASE_DIR)
        if rel_path.name == "index.html":
            url = "/" + str(rel_path.parent).replace("\\", "/")
            return url if url != "/" else "/"
        return "/" + str(rel_path).replace("\\", "/").replace("index.html", "").rstrip("/")
    
    def scan_html_files(self):
        """Find all HTML files"""
        for filepath in BASE_DIR.rglob("*.html"):
            # Skip root-level HTML files that are redirects/wrappers
            if filepath.parent == BASE_DIR:
                continue
            self.html_files.append(filepath)
        print(f"Found {len(self.html_files)} HTML files")
    
    def parse_pages(self):
        """Parse all pages for metadata and links"""
        for filepath in self.html_files:
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                soup = BeautifulSoup(content, 'html.parser')
                url = self.get_relative_url(filepath)
                
                # Extract metadata
                title = soup.find('title')
                meta_desc = soup.find('meta', attrs={'name': 'description'})
                h1 = soup.find('h1')
                canonical = soup.find('link', attrs={'rel': 'canonical'})
                robots = soup.find('meta', attrs={'name': 'robots'})
                og_title = soup.find('meta', attrs={'property': 'og:title'})
                twitter_card = soup.find('meta', attrs={'name': 'twitter:card'})
                
                self.pages[url] = {
                    'file': filepath,
                    'title': title.string if title else None,
                    'meta_desc': meta_desc.get('content') if meta_desc else None,
                    'h1': h1.string if h1 else None,
                    'h1_count': len(soup.find_all('h1')),
                    'canonical': canonical.get('href') if canonical else None,
                    'robots': robots.get('content') if robots else None,
                    'has_og': og_title is not None,
                    'has_twitter': twitter_card is not None,
                    'content': content,
                    'soup': soup
                }
                
                # Extract all internal links
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    # Skip external, anchor, mailto, tel links
                    if href.startswith(('http', 'mailto:', 'tel:', 'javascript:', '#')):
                        continue
                    # Normalize URL
                    clean_href = href.split('#')[0].rstrip('/')
                    if clean_href:
                        self.links[clean_href].append(url)
                
            except Exception as e:
                print(f"Error parsing {filepath}: {e}")
    
    def audit_metadata(self):
        """Check for missing/invalid metadata"""
        for url, data in self.pages.items():
            issues = []
            
            # Title checks
            if not data['title']:
                issues.append("Missing title tag")
            elif len(data['title']) > 60:
                issues.append(f"Title too long ({len(data['title'])} chars)")
            elif len(data['title']) < 30:
                issues.append(f"Title too short ({len(data['title'])} chars)")
            
            # Description checks
            if not data['meta_desc']:
                issues.append("Missing meta description")
            elif len(data['meta_desc']) > 160:
                issues.append(f"Description too long ({len(data['meta_desc'])} chars)")
            elif len(data['meta_desc']) < 120:
                issues.append(f"Description too short ({len(data['meta_desc'])} chars)")
            
            # H1 checks
            if not data['h1']:
                issues.append("Missing H1 tag")
            elif data['h1_count'] > 1:
                issues.append(f"Multiple H1 tags ({data['h1_count']})")
            
            # Canonical checks
            if not data['canonical']:
                issues.append("Missing canonical tag")
            
            # OG/Twitter checks
            if not data['has_og']:
                issues.append("Missing Open Graph tags")
            if not data['has_twitter']:
                issues.append("Missing Twitter card tags")
            
            # Noindex/Nofollow checks
            if data['robots']:
                if 'noindex' in data['robots']:
                    issues.append(f"Noindex detected: {data['robots']}")
                if 'nofollow' in data['robots']:
                    issues.append(f"Nofollow detected: {data['robots']}")
            
            if issues:
                self.issues[url] = issues
    
    def find_broken_links(self):
        """Find links to non-existent pages"""
        for link, sources in self.links.items():
            # Normalize for comparison
            normalized = link.rstrip('/') or '/'
            if normalized not in self.pages and not normalized + "/" in self.pages:
                self.broken_links.append({
                    'link': link,
                    'sources': sources,
                    'count': len(sources)
                })
    
    def find_orphan_pages(self):
        """Find pages with no incoming links"""
        linked_pages = set()
        for link, sources in self.links.items():
            linked_pages.add(link.rstrip('/') or '/')
        
        for url in self.pages.keys():
            if url not in linked_pages and url != '/':
                self.orphan_pages.add(url)
    
    def audit_sitemap(self):
        """Check sitemap validity"""
        sitemap_path = BASE_DIR / 'sitemap.xml'
        if not sitemap_path.exists():
            self.issues['sitemap'] = ["Sitemap not found"]
            return
        
        try:
            with open(sitemap_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all URLs in sitemap
            urls = re.findall(r'<loc>(.*?)</loc>', content)
            
            # Check for duplicates
            duplicates = [url for url in set(urls) if urls.count(url) > 1]
            if duplicates:
                self.issues['sitemap'].append(f"Duplicate URLs in sitemap: {len(duplicates)}")
            
            # Check for non-existent pages
            for url in urls:
                path = urlparse(url).path.rstrip('/') or '/'
                if path not in self.pages and path + '/' not in self.pages:
                    self.issues['sitemap'].append(f"Broken URL in sitemap: {url}")
                    
        except Exception as e:
            self.issues['sitemap'].append(f"Error parsing sitemap: {e}")
    
    def generate_report(self):
        """Generate audit report"""
        print("\n" + "="*80)
        print("SEO AUDIT REPORT - ExamBuddy Nigeria")
        print("="*80 + "\n")
        
        print(f"SUMMARY:")
        print(f"  Total Pages: {len(self.pages)}")
        print(f"  Pages with Issues: {len(self.issues)}")
        print(f"  Broken Links: {len(self.broken_links)}")
        print(f"  Orphan Pages: {len(self.orphan_pages)}\n")
        
        if self.issues:
            print("METADATA ISSUES:")
            for url, issues in sorted(self.issues.items()):
                if url != 'sitemap':
                    print(f"\n  {url}")
                    for issue in issues:
                        print(f"    - {issue}")
        
        if self.broken_links:
            print("\n\nBROKEN INTERNAL LINKS:")
            for link in sorted(self.broken_links, key=lambda x: -x['count'])[:20]:
                print(f"\n  {link['link']} (referenced {link['count']} times)")
                for source in link['sources'][:3]:
                    print(f"    From: {source}")
        
        if self.orphan_pages:
            print("\n\nORPHAN PAGES (no incoming links):")
            for url in sorted(self.orphan_pages):
                print(f"  {url}")
        
        print("\n" + "="*80)
    
    def run(self):
        """Run complete audit"""
        self.scan_html_files()
        self.parse_pages()
        self.audit_metadata()
        self.find_broken_links()
        self.find_orphan_pages()
        self.audit_sitemap()
        self.generate_report()
        
        return {
            'pages': self.pages,
            'issues': self.issues,
            'broken_links': self.broken_links,
            'orphan_pages': self.orphan_pages,
            'links': self.links
        }

if __name__ == "__main__":
    audit = SEOAudit()
    audit.run()
