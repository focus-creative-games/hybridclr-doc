# -*- coding: utf-8 -*-
"""
把文档树下所有内部文档链接统一为「文件相对路径 + .md」形式。

用法: python tools/normalize_links.py [docs_root]

- /basic/foo.md        -> ../basic/foo.md  (相对当前文件)
- /basic/foo           -> ../basic/foo.md
- ./foo                -> ./foo.md
- ../business/bar      -> ../business/bar.md
- 保留 #anchor 片段
- 旧文件名(ALIASES)自动映射到新文件名
- 目标文件不存在则报错，不修改
"""
import io, os, re, sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else 'docs'
TAG = os.path.basename(ROOT.rstrip('/')) if ROOT != 'docs' else 'docs'

# 历史文件名 -> 现文件名（Phase 1 重命名）
ALIASES = {
    'basic/supportedplatformanduniyversion': 'basic/supported-platforms-and-unity-versions',
    'basic/com.code-philosophy.hybridclr':   'basic/hybridclr-unity-package',
    'other/relativepojects':                 'other/related-projects',
    'business/ultimate/useIncodes':          'business/ultimate/use-in-codes',
    'business/ultimate/quickstartunchecked': 'business/ultimate/quickstart-unchecked',
}

LINK = re.compile(r'(\[[^\]]*\])\(([^)\s]+)((?:\s+"[^"]*")?)\)')

doc_ids = set()
for root, dirs, files in os.walk(ROOT):
    for fn in files:
        if fn.endswith('.md'):
            p = os.path.join(root, fn).replace(os.sep, '/')
            doc_ids.add(os.path.relpath(p, ROOT).replace(os.sep, '/')[:-3])

errors = []
changes = []

def resolve(cur_rel, url):
    """返回 (target_doc_id, anchor) 或 None"""
    anchor = ''
    if '#' in url:
        url, anchor = url.split('#', 1)
        anchor = '#' + anchor
    if not url:
        return None
    if url.endswith('.md'):
        url = url[:-3]
    if url.startswith('/'):
        target = url.lstrip('/')
    else:
        base = os.path.dirname(cur_rel)
        target = os.path.normpath(os.path.join(base, url)).replace(os.sep, '/')
    target = ALIASES.get(target, target)
    return (target, anchor)

for root, dirs, files in os.walk(ROOT):
    for fn in sorted(files):
        if not fn.endswith('.md'):
            continue
        p = os.path.join(root, fn).replace(os.sep, '/')
        cur_rel = os.path.relpath(p, ROOT).replace(os.sep, '/')
        text = io.open(p, encoding='utf-8').read()
        orig = text

        def repl(m):
            label, url, title = m.group(1), m.group(2), m.group(3)
            if url.startswith(('http://', 'https://', 'mailto:', '#')):
                return m.group(0)
            if re.search(r'\.(jpg|jpeg|png|gif|svg|webp)$', url, re.I):
                return m.group(0)
            if url.startswith('/img/') or url.startswith('/static/'):
                return m.group(0)
            r = resolve(cur_rel, url)
            if r is None:
                return m.group(0)
            target, anchor = r
            if target not in doc_ids:
                errors.append((cur_rel, url, target))
                return m.group(0)
            # 构造相对路径
            base = os.path.dirname(cur_rel)
            newrel = os.path.relpath(target, base).replace(os.sep, '/')
            if not newrel.startswith('.'):
                newrel = './' + newrel
            newurl = newrel + '.md' + anchor
            if newurl != url:
                changes.append((cur_rel, url, newurl))
            return label + '(' + newurl + title + ')'

        text = LINK.sub(repl, text)
        if text != orig:
            io.open(p, 'w', encoding='utf-8', newline='').write(text)

out = io.open('tools/link_report_%s.txt' % TAG, 'w', encoding='utf-8')
out.write('root: %s\n\n' % ROOT)
out.write('=== BROKEN (未修改) %d ===\n' % len(errors))
for f, u, t in errors:
    out.write('%-45s %-40s -> %s\n' % (f, u, t))
out.write('\n=== REWRITTEN %d ===\n' % len(changes))
for f, u, n in changes:
    out.write('%-45s %-40s -> %s\n' % (f, u, n))
out.close()
print('root:', ROOT, '| broken:', len(errors), ' rewritten:', len(changes))
