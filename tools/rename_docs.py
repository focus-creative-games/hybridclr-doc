# -*- coding: utf-8 -*-
"""
重命名拼错/不清晰的文档文件名，同时更新 zh/en 两个 locale 的引用和 sidebars.js。

slug 已在 frontmatter 中固定为旧 URL，所以改名不影响线上 URL。
"""
import io, os, re, subprocess, sys

RENAMES = [
    # (旧 doc id, 新 doc id)
    ('basic/supportedplatformanduniyversion', 'basic/supported-platforms-and-unity-versions'),
    ('basic/com.code-philosophy.hybridclr',   'basic/hybridclr-unity-package'),
    ('other/relativepojects',                 'other/related-projects'),
    ('business/ultimate/useIncodes',           'business/ultimate/use-in-codes'),
    ('business/ultimate/quickstartunchecked',  'business/ultimate/quickstart-unchecked'),
]

ROOTS = [
    'docs',
    'i18n/en/docusaurus-plugin-content-docs/current',
]

def git_mv(src, dst):
    r = subprocess.run(['git', 'mv', src, dst], capture_output=True, text=True)
    if r.returncode != 0:
        print('  !! git mv failed:', r.stderr.strip())
        return False
    return True

# 1. 移动文件
moved = []
for old, new in RENAMES:
    for root in ROOTS:
        src = os.path.join(root, old + '.md').replace('\\', '/')
        dst = os.path.join(root, new + '.md').replace('\\', '/')
        if not os.path.exists(src):
            print('SKIP (missing):', src)
            continue
        if git_mv(src, dst):
            moved.append((src, dst))
            print('MV', src, '->', dst)

# 2. 更新 md 内的相对链接。链接形态已统一为 ./x.md 或 ../dir/x.md
#    做法：按 basename 替换，并校验解析后的目标 id 匹配。
old_base = {}
for old, new in RENAMES:
    old_base[os.path.basename(old)] = (old, new, os.path.basename(new))

LINK = re.compile(r'(\[[^\]]*\])\(([^)\s]+)((?:\s+"[^"]*")?)\)')

link_fixes = 0
for root in ROOTS:
    for dirpath, dirs, files in os.walk(root):
        for fn in sorted(files):
            if not fn.endswith('.md'):
                continue
            p = os.path.join(dirpath, fn).replace('\\', '/')
            cur_rel = os.path.relpath(p, root).replace('\\', '/')
            text = io.open(p, encoding='utf-8').read()
            orig = text

            def repl(m):
                global link_fixes
                label, url, title = m.group(1), m.group(2), m.group(3)
                if url.startswith(('http://', 'https://', 'mailto:', '#', '/img/', '/static/')):
                    return m.group(0)
                frag = ''
                u = url
                if '#' in u:
                    u, frag = u.split('#', 1)
                    frag = '#' + frag
                if not u.endswith('.md'):
                    return m.group(0)
                base = os.path.dirname(cur_rel)
                target = os.path.normpath(os.path.join(base, u[:-3])).replace('\\', '/')
                for old, new in RENAMES:
                    if target == old:
                        newrel = os.path.relpath(new, base).replace('\\', '/')
                        if not newrel.startswith('.'):
                            newrel = './' + newrel
                        link_fixes += 1
                        return label + '(' + newrel + '.md' + frag + title + ')'
                return m.group(0)

            text = LINK.sub(repl, text)
            if text != orig:
                io.open(p, 'w', encoding='utf-8', newline='').write(text)
                print('LINKS', p)

# 3. 更新 sidebars.js 里的 doc id
sb = io.open('sidebars.js', encoding='utf-8').read()
orig_sb = sb
sb_fixes = 0
for old, new in RENAMES:
    for quote in ("'", '"'):
        needle = quote + old + quote
        if needle in sb:
            sb = sb.replace(needle, quote + new + quote)
            sb_fixes += 1
if sb != orig_sb:
    io.open('sidebars.js', 'w', encoding='utf-8', newline='').write(sb)

print('\nmoved files:', len(moved))
print('link fixes:', link_fixes)
print('sidebars.js id fixes:', sb_fixes)
