# -*- coding: utf-8 -*-
import io, os, re

bad_list = []
for root, dirs, files in os.walk('docs'):
    for fn in sorted(files):
        if not fn.endswith('.md'):
            continue
        p = os.path.join(root, fn).replace(os.sep, '/')
        t = io.open(p, encoding='utf-8').read()
        m = re.search(r"^description: '(.*)'$", t, re.M)
        d = m.group(1) if m else None
        why = ''
        if d is None:
            why = 'NO-DESC'
        elif 'http' in d or d.startswith('!['):
            why = 'BADGE/URL'
        elif len(d) < 12:
            why = 'TOO-SHORT'
        if why:
            bad_list.append((why, p, d or ''))

out = io.open('tools/desc_audit.txt', 'w', encoding='utf-8')
for why, p, d in bad_list:
    out.write('%-11s %-50s %s\n' % (why, p, d[:90]))
out.write('\ntotal flagged: %d\n' % len(bad_list))
out.close()
print('flagged:', len(bad_list))
