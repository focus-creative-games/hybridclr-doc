# -*- coding: utf-8 -*-
"""Phase 5: port the 9.0.0 il2cppbugs changes into the en tree.

zh (3133a1fdf) dropped the two Unity-2019-only bug reports, since 2019 is
no longer a supported version, and generalized the closed-delegate note
from `unity2021` to `il2cpp`. Sections are deleted by their `## ` heading
up to (but not including) the next `## ` heading, so the code blocks they
contain go with them.
"""
import io
import os

EN = os.path.join("i18n", "en", "docusaurus-plugin-content-docs", "current")
PATH = os.path.join(EN, "reference", "il2cppbugs.md")

DROP_HEADINGS = [
    u"## 2019 generated delegate call code incorrectly handles open delegate when this is ValueType",
    u"## 2019 WebGL platform generated object member access code does not check null reference",
]

EDITS = [
    (u"but Unity 2021 throws ArgumentException.",
     u"but il2cpp throws ArgumentException."),
]


def drop_section(text, heading):
    start = text.find(heading)
    if start < 0:
        return text, False
    nxt = text.find(u"\n## ", start + len(heading))
    end = len(text) if nxt < 0 else nxt + 1
    return text[:start] + text[end:], True


def main():
    with io.open(PATH, "r", encoding="utf-8", newline="") as f:
        text = f.read()

    for h in DROP_HEADINGS:
        text, ok = drop_section(text, h)
        print("%s %s" % ("dropped " if ok else "ABSENT  ", h[:70]))

    for old, new in EDITS:
        if old in text:
            text = text.replace(old, new)
            print("replaced: %s" % old[:60])
        elif new in text:
            print("already applied: %s" % new[:60])
        else:
            print("UNMATCHED: %s" % old[:60])

    with io.open(PATH, "w", encoding="utf-8", newline="") as f:
        f.write(text)


if __name__ == "__main__":
    main()
