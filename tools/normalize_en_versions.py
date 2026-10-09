# -*- coding: utf-8 -*-
"""Phase 4: normalize English version-gating phrasing to one form.

zh was normalized to `自vX.Y.Z版本起`; en standardizes on
`Starting from vX.Y.Z,` (lowercase `starting from` mid-sentence), with
no `version` filler word, no backticks and no bold around the number.

Unity / Tuanjie engine versions keep their own numbering with no `v`
prefix and are left untouched.

`guide/features/pinvoke.md` is deliberately skipped here: its version
gate is stale post-9.0.0 content and is rewritten in phase 5.
"""
import io
import os

EN = "i18n/en/docusaurus-plugin-content-docs/current"

# (relative path, old, new)
EDITS = [
    # "Since version vX" -> "Starting from vX"
    ("business/pro/manual.md",
     "Since version v8.6.0, the libil2cpp directory",
     "Starting from v8.6.0, the libil2cpp directory"),
    ("business/pro/quickstart.md",
     "Since version v8.6.0, the libil2cpp directory",
     "Starting from v8.6.0, the libil2cpp directory"),
    ("business/reload/manual.md",
     "Since version v8.6.0, the libil2cpp directory",
     "Starting from v8.6.0, the libil2cpp directory"),
    # this one was invisible to grep until tools/strip_nul.py ran: the file
    # ended in NUL bytes, so git and grep both classified it as binary
    ("business/reload/quickstart.md",
     "Since version v8.6.0, the libil2cpp directory",
     "Starting from v8.6.0, the libil2cpp directory"),
    ("business/ultimate/manual.md",
     "Since version v8.6.0, the libil2cpp directory",
     "Starting from v8.6.0, the libil2cpp directory"),
    ("business/ultimate/quickstart-unchecked.md",
     "Since version v8.6.0, the libil2cpp directory",
     "Starting from v8.6.0, the libil2cpp directory"),

    # drop the "version" filler word
    ("business/ultimate/commonerrors.md",
     "Starting from version v8.4.0, a function signature",
     "Starting from v8.4.0, a function signature"),
    ("business/ultimate/injectrules.md",
     "Starting from version v4.5.9, custom configuration",
     "Starting from v4.5.9, custom configuration"),
    ("start/generic.md",
     "Starting from version v4.0.16, optimization and trimming",
     "Starting from v4.0.16, optimization and trimming"),

    # drop backticks around the version number
    ("business/ultimate/metaversionworkflow.md",
     "Starting from `v7.7.0`, the `MetaVersion` workflow",
     "Starting from v7.7.0, the `MetaVersion` workflow"),
    ("business/ultimate/retargetmetadata.md",
     "Starting from Ultimate version `v7.4.0`, `HybridCLR.Editor.AssemblyMetaRetarget`",
     "Starting from Ultimate v7.4.0, `HybridCLR.Editor.AssemblyMetaRetarget`"),
    ("guide/setup/hybridclr-unity-package.md",
     "**Starting from `v2.4.0`, this option will be set automatically",
     "**Starting from v2.4.0, this option will be set automatically"),
    ("guide/setup/projectsettings.md",
     "**Starting from `v2.4.0`, this option is automatically set",
     "**Starting from v2.4.0, this option is automatically set"),
    ("guide/setup/install.md",
     "but starting from `v5.0.0`, **support for Unity 2019 has been restored**",
     "but starting from v5.0.0, **support for Unity 2019 has been restored**"),
    ("principle/architecture.md",
     "Starting from version `v2.0.0-rc` (belonging to the main branch)",
     "Starting from v2.0.0-rc (belonging to the main branch)"),
    ("reference/commonerrors.md",
     "If you use `v3.0.2` and higher versions",
     "If you use v3.0.2 and higher versions"),

    # add the missing `v` prefix on hybridclr package versions
    ("guide/setup/hybridclr-unity-package.md",
     "Starting from version 2.3.1, support for directly copying",
     "Starting from v2.3.1, support for directly copying"),
    ("reference/commonerrors.md",
     "Starting from version 3.0.0, com.focus-creative-games.hybridclr_unity",
     "Starting from v3.0.0, com.focus-creative-games.hybridclr_unity"),
    ("reference/commonerrors.md",
     "Update to com.code-philosophy.hybridclr 2.0.10+ version",
     "Update to com.code-philosophy.hybridclr v2.0.10+"),

    # "Supported since vX." -> same gate wording as everywhere else
    ("business/ultimate/use-in-codes.md",
     "Supported since v6.6.0.",
     "Supported starting from v6.6.0."),
]


def main():
    missing = []
    touched = {}
    for rel, old, new in EDITS:
        path = os.path.join(EN, rel)
        with io.open(path, "r", encoding="utf-8", newline="") as f:
            text = f.read()
        if old not in text:
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
    print("files touched: %d, replacements: %d" % (len(touched), sum(touched.values())))
    if missing:
        print("UNMATCHED:")
        for rel, old in missing:
            print("  %s :: %s" % (rel, old))


if __name__ == "__main__":
    main()
