# -*- coding: utf-8 -*-
"""Phase 5, batch D: the ultimate/ and */freetrial.md pages.

Two groups of edits:

1. Hunks of 3133a1fdf (Unity 2019/2020/2021 removal): the Unity.IL2CPP.dll
   placement lists in ultimate/manual.md and ultimate/quickstart-unchecked.md,
   the `Api Compatability Level` lines, the full-generic-sharing version list,
   and the AOT-generic-instantiation note in ultimate/loadassembly.md.

2. en translation drift predating 9.0.0: the three */freetrial.md pages still
   list `2021.3.31f1` / `2022.3.11f1` as the trial-supported versions and still
   describe the trial restriction as "DllEncryptor dll encryption module",
   where zh now says the encryption module is removed and libil2cpp ships as a
   precompiled `libil2cpp.a`. Ported from the current zh text.
"""
import io
import os

EN = os.path.join("i18n", "en", "docusaurus-plugin-content-docs", "current")

API_OLD_A = ("- Switch `Api Compatability Level` to `.Net 4.x` (Unity 2019-2020) "
             "or `.Net Framework` (Unity 2021+)")
API_OLD_B = ("- Switch `Api Compatibility Level` to `.Net 4.x` (Unity 2019-2020) "
             "or `.Net Framework` (Unity 2021+)")
API_NEW_A = "- Switch `Api Compatability Level` to `.Net Framework`"
API_NEW_B = "- Switch `Api Compatibility Level` to `.Net Framework`"

TRIAL_VERSIONS_OLD = "- 2021.3.31f1\n- 2022.3.11f1"
TRIAL_VERSIONS_NEW = ("- 2022.3.54 or higher, regardless of the version suffix "
                      "(such as f1, f2)")

EDITS = [
    # --- 1. 9.0.0 hunks -------------------------------------------------
    ("business/ultimate/manual.md", API_OLD_A, API_NEW_A),
    ("business/ultimate/quickstart-unchecked.md", API_OLD_B, API_NEW_B),

    ("business/ultimate/manual.md",
     "- 2020 version doesn't support full generic sharing\n"
     "- 2021 version needs to set IL2CPP Code Generation option to `faster(smaller)`\n"
     "- 2022 version has full generic sharing enabled by default and cannot be disabled.",
     "- 2022 and higher versions have full generic sharing enabled by default and it "
     "cannot be disabled."),

    ("business/ultimate/quickstart-unchecked.md",
     "  - If using **2022.3.x** or **2021.3.x**, replace "
     "`ModifiedDlls\\{version}\\Unity.IL2CPP.dll` with\n"
     "    `{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy"
     "\\Unity.IL2CPP.dll`.\n"
     "  - If using **2020.3.x**, replace `ModifiedDlls\\{version}\\Unity.IL2CPP.dll` with\n"
     "    `{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy"
     "\\netcoreapp3.1\\Unity.IL2CPP.dll`.\n"
     "  - If using **2019.4.x**, no action is required, as the **Install** process "
     "already copies the necessary files automatically.",
     "  - If using **2022.3.x**, replace `ModifiedDlls\\{version}\\Unity.IL2CPP.dll` with\n"
     "    `{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy"
     "\\Unity.IL2CPP.dll`."),

    ("business/ultimate/loadassembly.md",
     "If other hot update assemblies use generics from this DHE assembly, and the Unity "
     "version is less than 2021 or equals 2021 but the `Il2Cpp Code Generation` option "
     "also has AOT generic instantiation issues.",
     "If other hot update assemblies use generics from this DHE assembly, the same AOT "
     "generic instantiation issues arise when full generic sharing is not enabled."),

    # --- 2. freetrial drift --------------------------------------------
    ("business/pro/freetrial.md", TRIAL_VERSIONS_OLD, TRIAL_VERSIONS_NEW),
    ("business/reload/freetrial.md", TRIAL_VERSIONS_OLD, TRIAL_VERSIONS_NEW),
    ("business/ultimate/freetrial.md", TRIAL_VERSIONS_OLD, TRIAL_VERSIONS_NEW),

    ("business/pro/freetrial.md",
     "The trial version removes source code from some modules and calls compiled binary "
     "programs instead. The following are related modules.\n"
     "\n"
     "- DllEncryptor dll encryption module",
     "- The encryption module is removed\n"
     "- libil2cpp contains header files only; the source is replaced by a precompiled "
     "`libil2cpp.a`"),
    ("business/reload/freetrial.md",
     "The trial version removes source code from some modules and calls compiled binary "
     "programs instead. The following are related modules.\n"
     "\n"
     "- DllEncryptor dll encryption module",
     "- The encryption module is removed\n"
     "- libil2cpp contains header files only; the source is replaced by a precompiled "
     "`libil2cpp.a`"),
    ("business/ultimate/freetrial.md",
     "The trial version has removed source code for some modules and replaced them with "
     "calls to compiled binary programs. The following are the related modules.\n"
     "\n"
     "- DllEncryptor dll encryption module\n"
     "- DhaoGenerator dhao generation module",
     "- The encryption module is removed\n"
     "- The DHE-related C# source is replaced by precompiled binary tools\n"
     "- libil2cpp contains header files only; the source is replaced by a precompiled "
     "`libil2cpp.a`"),
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
