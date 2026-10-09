# -*- coding: utf-8 -*-
"""Phase 5, batch E: reference/commonerrors.md and reference/changelog.md.

Mirrors the commonerrors.md and changelog.md hunks of 3133a1fdf. Three
kinds of change:

- extern-in-hot-update entries now point at the migration path instead of
  describing parameter restrictions or "temporarily not supported"
- version-conditional advice de-versioned, since every supported version is
  now >= 2022.3
- one whole entry dropped: the 2020.3.0-2020.3.25 `il2cpp/external` copy
  workaround, which only applied to a version no longer supported

The changelog gets the 9.0.0 entry prepended to the list.
"""
import io
import os

EN = os.path.join("i18n", "en", "docusaurus-plugin-content-docs", "current")

PINVOKE = "[PInvoke Support](../guide/features/pinvoke.md)"

EDITS = [
    ("reference/commonerrors.md",
     "com.code-philosophy.hybridclr `v2.4.0` version has completely resolved this "
     "issue. You can upgrade to this version or revert to an older version of Visual "
     "Studio 2022 or use versions like 2019.",
     "com.code-philosophy.hybridclr `v2.4.0` version has completely resolved this "
     "issue; just upgrade to that version."),

    ("reference/commonerrors.md",
     "This is a problem caused by Unity modifying this function signature starting "
     "from Unity 2021.3.20.",
     "This is a problem caused by Unity modifying this function signature."),

    ("reference/commonerrors.md",
     "- You used a version lower than 2019 or higher than 2021, these versions are "
     "currently not supported",
     "- Your Unity version is not in the support list. Starting from v9.0.0 only "
     "2022.3.x, 2023.2.x and 6000.x.y (excluding 6000.5.x) are supported; see "
     "[Supported Unity Versions and Platforms](../guide/setup/"
     "supported-platforms-and-unity-versions.md)"),

    ("reference/commonerrors.md",
     "Because starting from versions 2021.3.31 and 2022.3.11, this macro definition "
     "was modified,",
     "Because Unity modified this macro definition starting from version 2022.3.11,"),

    # the whole 2020.3.0-2020.3.25 entry is gone from zh.
    ("reference/commonerrors.md",
     "### Packaging shows Building.BuilderFailedException: In file included from "
     "xxx\\HybridCLRData\\LocalIl2CppData-{platform}\\il2cpp\n"
     "\n"
     "If your version is 2020.3.0-2020.3.25, after completing installation in the "
     "Installer, copy `2020.3.x/Editor/Data/il2cpp/external` from any 2020.3.26+ "
     "version installation directory to replace `{project}/HybridCLRData/"
     "LocalIl2CppData-{platform}/il2cpp/external`\n"
     "\n",
     ""),

    ("reference/commonerrors.md",
     "Extern functions defined in hot update code don't support parameters or return "
     "values like string or arrays. Please modify the corresponding parameters to "
     "IntPtr and manually marshal these parameters, or move the function to AOT for "
     "definition. For details, see " + PINVOKE + ".",
     "Starting from **v9.0.0**, defining extern functions in hot update code is no "
     "longer supported. Move the function into an AOT assembly. For details, see "
     + PINVOKE + "."),

    ("reference/commonerrors.md",
     "The solution is to use .net 4.x for both packaging and compiling hot updates, "
     "or use .net standard 2.0 for packaging but switch api compatible level to "
     ".net 4.x (renamed to .net framework starting from 2021) when compiling hot "
     "update parts.",
     "The solution is to use .net framework for both packaging and compiling hot "
     "updates, or use .net standard 2.0 for packaging but switch api compatible level "
     "to .net framework when compiling hot update parts."),

    ("reference/commonerrors.md",
     "2. Using Unity 2021 and the `Il2Cpp Code Generation` option is "
     "`faster (smaller) build`, causing",
     "2. The `Il2Cpp Code Generation` option is `faster (smaller) build`, causing"),

    ("reference/commonerrors.md",
     "- Defined extern functions in hot updates, which is temporarily not supported. "
     "The solution is to move extern functions to the AOT part.",
     "- Defined extern functions in hot update code. This is no longer supported "
     "starting from **v9.0.0**; the solution is to move the extern functions to the "
     "AOT part. For details, see " + PINVOKE + "."),

    ("reference/commonerrors.md",
     "This is caused by missing bridge functions for extern functions defined in hot "
     "update code. Please reserve bridge functions related to extern functions in "
     "advance when building the main package. For details, see the document "
     + PINVOKE + ".",
     "This is caused by missing bridge functions for extern functions defined in hot "
     "update code. Starting from **v9.0.0**, defining extern functions in hot update "
     "code is no longer supported -- move these functions into an AOT assembly. For "
     "details, see the document " + PINVOKE + "."),

    ("reference/commonerrors.md",
     "If you're using Unity 2021 or higher, upgrade hybridclr package to `v3.0.2` or "
     "higher. If using Unity 2019 or 2020, merge the changes from commit record "
     "[Fix crash bug when using Memory Profiler to create snapshots]"
     "(https://github.com/focus-creative-games/hybridclr/commit/"
     "062bfa99c71a53a6cb35fc89a52d67bbff2bb2d0) to your current version.",
     "Upgrade the hybridclr package to `v3.0.2` or higher."),

    # --- changelog -----------------------------------------------------
    ("reference/changelog.md",
     "- 2024.6.11 Released v6.0.0, officially supporting 2023 and 6000",
     "- Released v9.0.0. Removed support for Unity 2019, 2020 and 2021; removed support "
     "for 6000.5.x (not an LTS version); removed support for defining extern functions "
     "in hot update code. 8.15.0 is the last version supporting Unity 2019/2020/2021.\n"
     "- 2024.6.11 Released v6.0.0, officially supporting 2023 and 6000"),
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
