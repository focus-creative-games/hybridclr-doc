# -*- coding: utf-8 -*-
"""Phase 5, batch B: the remaining mechanical 9.0.0 ports into the en tree.

Same provenance rule as tools/align_en_900.py -- every edit here mirrors a
specific hunk of 3133a1fdf, paired through the phase-3 rename map. Batch A
covered the guide/ and principle/ pages; this one covers start/, reference/
and business/.

Each edit is an exact string match. Already-applied edits are distinguished
from real match failures so the script is safe to re-run.
"""
import io
import os

EN = os.path.join("i18n", "en", "docusaurus-plugin-content-docs", "current")

EDITS = [
    # --- start/quickstart.md -------------------------------------------
    ("start/quickstart.md",
     "HybridCLR supports all LTS versions of Unity from 2019 to 6000. If your current "
     "version is not among the recommended versions below, please refer to the "
     "[Installing HybridCLR](../guide/setup/install.md) documentation.\n"
     ":::",
     "HybridCLR supports the Unity 2022.3.x, 2023.2.x and 6000.x.y (excluding 6000.5.x) "
     "LTS versions. If your current version is not among the recommended versions below, "
     "please refer to the [Installing HybridCLR](../guide/setup/install.md) documentation.\n"
     "\n"
     "Support for Unity 2019/2020/2021 was removed in v9.0.0; projects on those versions "
     "should use 8.15.0.\n"
     ":::"),
    ("start/quickstart.md",
     "- Install any of the following versions: 2019.4.40, 2020.3.26+, 2021.3.0+, "
     "2022.3.0+, 6000.0.0+",
     "- Install any of the following versions: 2022.3.0+, 2023.2.0+, 6000.0.0+"),
    ("start/quickstart.md",
     "install `Visual Studio 2019` or higher",
     "install `Visual Studio 2022` or higher"),
    # the <v4.0.0 incremental-GC note is moot: those versions predate every
    # supported Unity version here.
    ("start/quickstart.md",
     "- If you are using hybridclr package **lower than v4.0.0**, you need to disable "
     "the Use Incremental GC option\n",
     ""),
    ("start/quickstart.md",
     "- Switch `Api Compatability Level` to `.Net 4.x` (Unity 2019-2020) or "
     "`.Net Framework` (Unity 2021+)",
     "- Switch `Api Compatability Level` to `.Net Framework`"),

    # --- reference/faq.md ---------------------------------------------
    ("reference/faq.md",
     "Taking the 2019 version as an example, the libil2cpp.a file exported for Android "
     "in release mode: original version 12.69M, HybridCLR version 13.97M, which means "
     "an increase of approximately 1.3M.",
     "For the libil2cpp.a file exported for Android in release mode, the HybridCLR "
     "version is about 1.3M larger than the original. For detailed figures see "
     "[Impact on Package Size](../guide/performance/impactonappsize.md)."),

    # --- reference/issue.md -------------------------------------------
    ("reference/issue.md",
     "- Unity Editor version. e.g., 2020.3.33",
     "- Unity Editor version. e.g., 2022.3.60"),

    # --- business/differentialhybridexecution.md -----------------------
    # clarified now that hot-update assemblies can no longer define extern at all.
    ("business/differentialhybridexecution.md",
     "For example, extern functions can be defined directly in DHE without moving to "
     "AOT modules.",
     "For example, extern functions can be defined directly in DHE assemblies, whereas "
     "in pure hot update assemblies they must be moved into an AOT module."),
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
