# -*- coding: utf-8 -*-
"""Phase 3: move docs into the new 6-category structure in both locales,
then rewrite every relative markdown link so it still resolves.

Slugs are frozen in frontmatter (phase 1), so no document URL changes.
"""
import os
import re
import subprocess
import sys

ROOTS = [
    "docs",
    "i18n/en/docusaurus-plugin-content-docs/current",
]

MAPPING = {
    # 开始使用
    "beginner/quickstart.md": "start/quickstart.md",
    "beginner/monobehaviour.md": "start/monobehaviour.md",
    "beginner/generic.md": "start/generic.md",
    # 使用指南 / 安装与配置
    "basic/supported-platforms-and-unity-versions.md": "guide/setup/supported-platforms-and-unity-versions.md",
    "basic/install.md": "guide/setup/install.md",
    "basic/projectsettings.md": "guide/setup/projectsettings.md",
    "basic/hotupdateassemblysetting.md": "guide/setup/hotupdateassemblysetting.md",
    "basic/hybridclr-unity-package.md": "guide/setup/hybridclr-unity-package.md",
    # 使用指南 / 编译与构建
    "basic/compileassembly.md": "guide/build/compileassembly.md",
    "basic/runhotupdatecodes.md": "guide/build/runhotupdatecodes.md",
    "basic/buildpipeline.md": "guide/build/buildpipeline.md",
    "basic/buildwebgl.md": "guide/build/buildwebgl.md",
    "basic/codestriping.md": "guide/build/codestriping.md",
    "basic/aotgeneric.md": "guide/build/aotgeneric.md",
    "basic/methodbridge.md": "guide/build/methodbridge.md",
    # 使用指南 / 特性与集成
    "basic/monobehaviour.md": "guide/features/monobehaviour.md",
    "basic/pinvoke.md": "guide/features/pinvoke.md",
    "basic/monopinvokecallback.md": "guide/features/monopinvokecallback.md",
    "basic/dots.md": "guide/features/dots.md",
    "basic/workwithscriptlanguage.md": "guide/features/workwithscriptlanguage.md",
    "basic/codeobfuscation.md": "guide/features/codeobfuscation.md",
    # 使用指南 / 性能与内存
    "basic/performance.md": "guide/performance/performance.md",
    "basic/memory.md": "guide/performance/memory.md",
    "basic/impactonappsize.md": "guide/performance/impactonappsize.md",
    "basic/impactonappmemory.md": "guide/performance/impactonappmemory.md",
    # 使用指南 / 进阶实践
    "basic/bestpractice.md": "guide/practice/bestpractice.md",
    "basic/migratefromnetstandard.md": "guide/practice/migratefromnetstandard.md",
    # 参考
    "basic/notsupportedfeatures.md": "reference/notsupportedfeatures.md",
    "basic/il2cppbugs.md": "reference/il2cppbugs.md",
    "help/faq.md": "reference/faq.md",
    "help/commonerrors.md": "reference/commonerrors.md",
    "help/issue.md": "reference/issue.md",
    "other/changelog.md": "reference/changelog.md",
    # 实现原理
    "basic/architecture.md": "principle/architecture.md",
    "basic/sourceinspect.md": "principle/sourceinspect.md",
    # 社区与支持
    "beginner/otherhelp.md": "community/otherhelp.md",
    "other/businesscase.md": "community/businesscase.md",
    "other/related-projects.md": "community/related-projects.md",
    "other/roadmap.md": "community/roadmap.md",
    "other/donate.md": "community/donate.md",
    "other/contactme.md": "community/contactme.md",
}

LINK_RE = re.compile(r"\]\((\.{1,2}/[^)\s]*?\.md)((?:#[^)\s]*)?)\)")


def run(args):
    p = subprocess.run(args, capture_output=True, text=True)
    if p.returncode != 0:
        sys.stderr.write("FAILED %s\n%s\n" % (" ".join(args), p.stderr))
        sys.exit(1)


def do_moves(root):
    moved = 0
    for old, new in MAPPING.items():
        src = os.path.join(root, old)
        dst = os.path.join(root, new)
        if not os.path.isfile(src):
            continue
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        run(["git", "mv", src.replace("\\", "/"), dst.replace("\\", "/")])
        moved += 1
    return moved


def rewrite_links(root):
    # new relative path -> old relative path, for files that moved
    new_to_old = {v: k for k, v in MAPPING.items()}
    rewrites = 0
    unresolved = []
    for dirpath, _dirs, files in os.walk(root):
        for fn in files:
            if not fn.endswith(".md"):
                continue
            abspath = os.path.join(dirpath, fn)
            new_self = os.path.relpath(abspath, root).replace("\\", "/")
            old_self = new_to_old.get(new_self, new_self)
            old_self_dir = os.path.dirname(old_self)
            new_self_dir = os.path.dirname(new_self)

            with open(abspath, "r", encoding="utf-8", newline="") as f:
                text = f.read()

            def repl(m):
                nonlocal rewrites
                target, frag = m.group(1), m.group(2)
                old_abs = os.path.normpath(
                    os.path.join(old_self_dir, target)).replace("\\", "/")
                if old_abs not in MAPPING and not os.path.isfile(
                        os.path.join(root, old_abs)):
                    # target neither moved nor still present at its old path
                    unresolved.append("%s -> %s" % (new_self, target))
                new_abs = MAPPING.get(old_abs, old_abs)
                rel = os.path.relpath(
                    new_abs, new_self_dir or ".").replace("\\", "/")
                if not rel.startswith("."):
                    rel = "./" + rel
                if rel != target:
                    rewrites += 1
                return "](%s%s)" % (rel, frag)

            new_text = LINK_RE.sub(repl, text)
            if new_text != text:
                with open(abspath, "w", encoding="utf-8", newline="") as f:
                    f.write(new_text)
    return rewrites, unresolved


def main():
    for root in ROOTS:
        moved = do_moves(root)
        print("%s: moved %d files" % (root, moved))
    for root in ROOTS:
        rewrites, unresolved = rewrite_links(root)
        print("%s: rewrote %d links" % (root, rewrites))
        for u in sorted(set(unresolved)):
            print("  UNRESOLVED %s" % u)
    # drop directories left empty
    for root in ROOTS:
        for dirpath, dirs, files in os.walk(root, topdown=False):
            if not dirs and not files:
                os.rmdir(dirpath)
                print("removed empty dir %s" % dirpath)


if __name__ == "__main__":
    main()
