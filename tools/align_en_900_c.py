# -*- coding: utf-8 -*-
"""Phase 5, batch C: port the 9.0.0 business/ changes into the en tree.

Mirrors the business/ hunks of 3133a1fdf. The three tier intro pages share
the same "Supports all Unity 2019-6000 LTS versions." sentence, so that one
is applied per-file rather than globally.
"""
import io
import os

EN = os.path.join("i18n", "en", "docusaurus-plugin-content-docs", "current")

SUPPORTED = ("Supports all currently supported Unity LTS versions "
             "(2022.3.x, 2023.2.x, 6000.x.y).")

EDITS = [
    ("business/pro/intro.md", "Supports all Unity 2019-6000 LTS versions.", SUPPORTED),
    ("business/reload/intro.md", "Supports all Unity 2019-6000 LTS versions.", SUPPORTED),
    ("business/ultimate/intro.md", "Supports all Unity 2019-6000 LTS versions.", SUPPORTED),

    ("business/intro.md",
     "All commercial versions provide long-term support for **Unity 2019-6000 LTS** "
     "versions, ensuring projects have long-lasting and stable technical support.",
     "All commercial versions provide long-term support for every currently supported "
     "**Unity LTS** version (2022.3.x, 2023.2.x, 6000.x.y), ensuring projects have "
     "long-lasting and stable technical support."),
    ("business/intro.md",
     "|Unity 2019-6000 LTS|",
     "|Unity 2022-6000 LTS|"),

    # full generic sharing is no longer version-conditional: every supported
    # version has it, and 2022+ enables it by default and cannot disable it.
    ("business/fullgenericsharing.md",
     "Supports Unity 2021 and higher LTS versions.",
     "All currently supported Unity versions (2022.3.x, 2023.2.x, 6000.x.y) support "
     "this feature."),
    ("business/fullgenericsharing.md",
     "The old generic sharing technology could only perform generic sharing for class "
     "types. Starting from 2021.3.x LTS versions, il2cpp already supports "
     "`full generic sharing` technology,",
     "The old generic sharing technology could only perform generic sharing for class "
     "types. il2cpp already supports `full generic sharing` technology,"),
    ("business/fullgenericsharing.md",
     "\nIf using 2021 version and there's no memory pressure, it's still recommended to "
     "use supplemental metadata technology to solve generic problems.\n",
     ""),
    ("business/fullgenericsharing.md",
     "- 2020 version does not support full generic sharing\n"
     "- 2021 version needs to set IL2CPP Code Generation option to `faster(smaller build)`\n"
     "- 2022 version enables full generic sharing by default and cannot be disabled.",
     "- 2022 and higher versions enable full generic sharing by default and it cannot be "
     "disabled."),

    ("business/metadataoptimization.md",
     "approximately 4 times the dll size. The drawback is that full generic sharing is "
     "only supported from 2021 onwards. Enabling",
     "approximately 4 times the dll size. Enabling"),
]


def main():
    missing = []
    done = 0
    touched = {}
    for rel, old, new in EDITS:
        path = os.path.join(EN, rel)
        with io.open(path, "r", encoding="utf-8", newline="") as f:
            text = f.read()
        if old not in text:
            if new and new in text:
                done += 1
            else:
                missing.append((rel, old))
            continue
        n = text.count(old)
        text = text.replace(old, new)
        with io.open(path, "w", encoding="utf-8", newline="") as f:
            f.write(text)
        touched[rel] = touched.get(rel, 0) + n

    for rel in sorted(touched):
        print("%-55s %d replacement(s)" % (rel, touched[rel]))
    print("---")
    print("files touched: %d, replacements: %d, already applied: %d"
          % (len(touched), sum(touched.values()), done))
    if missing:
        print("UNMATCHED:")
        for rel, old in missing:
            print("  %s :: %s" % (rel, old[:70]))


if __name__ == "__main__":
    main()
