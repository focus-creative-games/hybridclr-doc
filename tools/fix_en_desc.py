# -*- coding: utf-8 -*-
"""
修正 en 文档 frontmatter 中 description 的句末标点。

add_frontmatter.py 的截断逻辑统一用中文句号 `。` 作句子边界，
导致英文 description 末尾出现 `。` 或 `.。`。此脚本把英文 description
的句末标点规范为 `.`。
"""
import io, os, re

ROOT = 'i18n/en/docusaurus-plugin-content-docs/current'
DESC = re.compile(r"^description: '(.*)'$")

fixed = 0
for dirpath, dirs, files in os.walk(ROOT):
    for fn in sorted(files):
        if not fn.endswith('.md'):
            continue
        p = os.path.join(dirpath, fn).replace(os.sep, '/')
        lines = io.open(p, encoding='utf-8').read().split('\n')
        changed = False
        for i, line in enumerate(lines[:8]):
            m = DESC.match(line)
            if not m:
                continue
            d = m.group(1)
            new = d.rstrip()
            # 去掉结尾的中文句号（可能紧跟在英文句号后面）
            while new.endswith('。'):
                new = new[:-1].rstrip()
            if new and new[-1] not in '.!?:':
                new += '.'
            if new != d:
                lines[i] = "description: '%s'" % new
                changed = True
            break
        if changed:
            io.open(p, 'w', encoding='utf-8', newline='').write('\n'.join(lines))
            fixed += 1
            print('FIX', p)

print('\nfixed:', fixed)
