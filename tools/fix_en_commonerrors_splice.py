# -*- coding: utf-8 -*-
"""Repair a pre-existing text splice in the English `reference/commonerrors.md`.

Lines 13-19 of the intro had the DOTS / Burst `StaticTypeReinit` paragraphs
spliced into the QQ group contact line, shredding it into
`- Beginner Group 2: **Th` ... `0274677 (Recommended)**` and leaving a second
splice inside `There are several solutions:`.

The damage predates this refactor -- it is present unchanged in every revision
back through 08aff73e4, under both the current `reference/` path and the old
`help/` path. The legitimate DOTS section further down the file (under
`### Encountering Invalid type name exception when running DOTS`) is intact and
complete, so the spliced text is pure duplication and is simply deleted.

The group number comes from the zh source of truth, docs/reference/commonerrors.md:
`- 新手2群：**680274677（推荐）**`.

Only the current docs are touched. The 8.5.0 and 8.15.0 en snapshots inherited
the same splice but are frozen releases, left byte-identical to what they were
cut from -- same policy as tools/strip_nul.py.
"""
import io
import os

PATH = os.path.join(
    "i18n", "en", "docusaurus-plugin-content-docs", "current",
    "reference", "commonerrors.md",
)

# The shredded block, verbatim: from the start of the broken contact line
# through the tail that still carries the end of the group number.
BROKEN_FIRST = "- Beginner Group 2: **Th"
BROKEN_LAST_TAIL = "0274677 (Recommended)**"

FIXED = "- Beginner Group 2: **680274677 (Recommended)**"


def main():
    with io.open(PATH, "r", encoding="utf-8", newline="") as f:
        text = f.read()

    start = text.find(BROKEN_FIRST)
    if start < 0:
        print("UNMATCHED: broken block start not found -- already repaired?")
        return
    end = text.find(BROKEN_LAST_TAIL, start)
    if end < 0:
        print("UNMATCHED: broken block tail not found")
        return
    end += len(BROKEN_LAST_TAIL)

    removed = text[start:end]
    text = text[:start] + FIXED + text[end:]

    with io.open(PATH, "w", encoding="utf-8", newline="") as f:
        f.write(text)

    print("%s" % PATH)
    print("  removed %d chars / %d lines of spliced text"
          % (len(removed), removed.count("\n")))
    print("  restored: %s" % FIXED)


if __name__ == "__main__":
    main()
