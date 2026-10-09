# -*- coding: utf-8 -*-
"""Strip stray NUL bytes out of the live markdown docs.

The English `business/reload/quickstart.md` ends with `\n\x00\n\x00` and has
since before this refactor. The NULs render as nothing and Docusaurus builds
fine, but they make grep and git classify the file as binary, which hides it
from every content search.

Only the current docs are touched. The 8.5.0 and 8.15.0 snapshots inherited
the same bytes, but they are frozen releases and are deliberately left alone
so they stay byte-identical to the versions they were cut from.
"""
import os

ROOTS = [
    "docs",
    os.path.join("i18n", "en", "docusaurus-plugin-content-docs", "current"),
]
SKIP = {"node_modules", "build", ".docusaurus", ".git"}


def main():
    fixed = []
    for root in ROOTS:
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if d not in SKIP]
            for fn in filenames:
                if not fn.endswith(".md"):
                    continue
                path = os.path.join(dirpath, fn)
                with open(path, "rb") as f:
                    raw = f.read()
                if b"\x00" not in raw:
                    continue
                cleaned = raw.replace(b"\x00", b"")
                # the NULs sat on their own lines; leave exactly one newline
                cleaned = cleaned.rstrip(b"\r\n") + b"\n"
                with open(path, "wb") as f:
                    f.write(cleaned)
                fixed.append((path, raw.count(b"\x00"), len(raw), len(cleaned)))

    for path, n, before, after in fixed:
        print("%s\n  -%d NUL  %d -> %d bytes" % (path, n, before, after))
    print("files fixed: %d" % len(fixed))


if __name__ == "__main__":
    main()
