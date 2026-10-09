# -*- coding: utf-8 -*-
"""
给 docs/ 下所有 md 文件添加 frontmatter。

关键设计：slug 固定为文件当前的 URL 路径，这样后续移动文件不会改变 URL。
title 取文件第一个 H1；description 取 H1 之后第一段非空、非指令块的正文。
"""
import io, os, re, sys, json

DOCS = sys.argv[1] if len(sys.argv) > 1 else 'docs'

def first_h1(lines):
    for i, ln in enumerate(lines):
        m = re.match(r'^#\s+(.+?)\s*$', ln)
        if m:
            return i, m.group(1).strip()
    return None, None

def extract_desc(lines, h1_idx):
    """H1 之后第一段正文，跳过 admonition、图片、代码块、import。"""
    i = (h1_idx + 1) if h1_idx is not None else 0
    in_fence = False
    in_adm = False
    buf = []
    while i < len(lines):
        ln = lines[i].strip()
        if ln.startswith('```'):
            in_fence = not in_fence
            i += 1
            continue
        if in_fence:
            i += 1
            continue
        if ln.startswith(':::'):
            in_adm = not in_adm if not ln.endswith(':::') or ln == ':::' else in_adm
            if ln == ':::':
                in_adm = False
            elif ln.startswith(':::'):
                in_adm = True
            i += 1
            continue
        if in_adm:
            i += 1
            continue
        if not ln:
            if buf:
                break
            i += 1
            continue
        if ln.startswith('#'):
            if buf:
                break
            i += 1
            continue
        if ln.startswith('import ') or ln.startswith('![') or ln.startswith('|') or ln.startswith('<'):
            i += 1
            continue
        buf.append(ln)
        if len(' '.join(buf)) > 150:
            break
        i += 1
    if not buf:
        return None
    text = ' '.join(buf)
    # 去掉 markdown 链接语法、强调符号
    text = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', text)
    text = text.replace('**', '').replace('`', '').replace('*', '')
    text = re.sub(r'\s+', ' ', text).strip()
    if len(text) > 155:
        cut = text[:155]
        for sep in ('。', '，', '；', '. ', ', '):
            p = cut.rfind(sep)
            if p > 60:
                cut = cut[:p + len(sep.strip())]
                break
        text = cut.rstrip('，；,; ')
        if not text.endswith('。'):
            text += '。'
    return text

def yaml_quote(s):
    return "'" + s.replace("'", "''") + "'"

report = []
for root, dirs, files in os.walk(DOCS):
    dirs.sort()
    for fn in sorted(files):
        if not fn.endswith('.md'):
            continue
        path = os.path.join(root, fn).replace('\\', '/')
        raw = io.open(path, encoding='utf-8').read()
        if raw.lstrip().startswith('---'):
            report.append((path, 'SKIP already has frontmatter', ''))
            continue
        lines = raw.split('\n')
        h1_idx, title = first_h1(lines)
        rel = os.path.relpath(path, DOCS).replace('\\', '/')
        doc_id = rel[:-3]
        slug = '/' + doc_id
        desc = extract_desc(lines, h1_idx)
        if not title:
            title = doc_id.split('/')[-1]
        fm = ['---']
        fm.append('title: ' + yaml_quote(title))
        if desc:
            fm.append('description: ' + yaml_quote(desc))
        fm.append('slug: ' + slug)
        fm.append('---')
        body = raw.lstrip('\n')
        out = '\n'.join(fm) + '\n\n' + body
        io.open(path, 'w', encoding='utf-8', newline='').write(out)
        report.append((path, title, slug))

for p, t, s in report:
    print('%-58s | %-28s | %s' % (p, t[:28], s))
print('\ntotal:', len(report))
