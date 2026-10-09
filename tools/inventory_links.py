# -*- coding: utf-8 -*-
"""列出 docs/ 下所有内部 markdown 链接，按形态分类。"""
import io, os, re

LINK = re.compile(r'\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)')

docs_files = set()
for root, dirs, files in os.walk('docs'):
    for fn in files:
        if fn.endswith('.md'):
            p = os.path.join(root, fn).replace(os.sep, '/')
            docs_files.add(os.path.relpath(p, 'docs').replace(os.sep, '/')[:-3])

buckets = {}
rows = []
for root, dirs, files in os.walk('docs'):
    for fn in sorted(files):
        if not fn.endswith('.md'):
            continue
        p = os.path.join(root, fn).replace(os.sep, '/')
        rel = os.path.relpath(p, 'docs').replace(os.sep, '/')
        text = io.open(p, encoding='utf-8').read()
        for m in LINK.finditer(text):
            url = m.group(2)
            if url.startswith(('http://', 'https://', 'mailto:', '#')):
                continue
            if re.search(r'\.(jpg|jpeg|png|gif|svg|webp)$', url, re.I):
                continue
            if url.startswith('/img/') or url.startswith('/static/'):
                continue
            kind = ('ABS-MD' if url.startswith('/') and url.endswith('.md')
                    else 'ABS-NOEXT' if url.startswith('/')
                    else 'REL-MD' if url.endswith('.md')
                    else 'REL-NOEXT')
            buckets[kind] = buckets.get(kind, 0) + 1
            rows.append((kind, rel, url))

out = io.open('tools/link_inventory.txt', 'w', encoding='utf-8')
for k in sorted(buckets):
    out.write('%s: %d\n' % (k, buckets[k]))
out.write('\n')
for kind, rel, url in sorted(rows):
    out.write('%-10s %-45s %s\n' % (kind, rel, url))
out.close()
for k in sorted(buckets):
    print(k, buckets[k])
print('total', len(rows))
