# -*- coding: utf-8 -*-
"""Phase 5: port the 9.0.0 content changes from zh into the en tree.

v9.0.0 dropped Unity 2019/2020/2021, dropped 6000.5.x (not an LTS), and
removed support for defining `extern` functions in hot-update code. The zh
docs were updated for this in 3133a1fdf; the en tree was not, so every en
page that still describes the old support matrix is stale.

Scope comes from provenance, not from grepping `2019|2020|2021`: the file
list is the 34 files 3133a1fdf touched, paired with their en counterparts
through the phase-3 rename map (82196dfb7). Most other `2021` mentions in
the en tree are legitimate history (changelog dates, il2cpp bug reports
against specific versions, il2cpp_plus branch names, `Visual Studio 2019`)
and are left alone.

This file holds the mechanical one-to-one replacements. Pages needing real
rewriting rather than substitution (pinvoke, install,
supported-platforms-and-unity-versions) are handled separately.

Each edit is an exact string match; anything that fails to match is
reported as UNMATCHED rather than silently skipped.
"""
import io
import os

EN = "i18n/en/docusaurus-plugin-content-docs/current"

# (relative path, old, new)
EDITS = [
    # il2cpp_plus annual branches: 2021-main is no longer a supported branch,
    # and the `{version}-1.0` branches are gone entirely.
    ("principle/architecture.md",
     "Each annual version corresponds to a `{version}-main` branch, such as `2021-main`.\n"
     "\n"
     "Currently, each annual version also has an older 1.0 branch `{version}-1.0`, such as `2019-1.0`.",
     "Each annual version corresponds to a `{version}-main` branch, such as `2022-main` "
     "and `6000-main`."),

    # every supported version is now >= 2022.3 LTS, so the advice is no longer
    # version-conditional -- it applies to all of them.
    ("guide/practice/bestpractice.md",
     "## Don't Use `faster(smaller) builds` Option in 2021 Versions",
     "## Don't Use the `faster(smaller) builds` Option"),
    ("guide/practice/bestpractice.md",
     "Starting from 2021.3.x LTS versions, il2cpp fully supports `full generic sharing` technology.",
     "il2cpp fully supports `full generic sharing` technology."),

    # Unity 2019's Android platform is gone; only the Tuanjie HarmonyOS
    # platform still compiles libil2cpp.a during project export.
    ("guide/build/buildpipeline.md",
     "Unity 2019's Android platform and HarmonyOS platform of Unity China will "
     "automatically compile libil2cpp.a during the second step of `exporting project`. "
     "At this time, bridge functions and others have not been generated yet, so these "
     "platforms **cannot use** the optimized build process.",
     "The HarmonyOS platform of Unity China automatically compiles libil2cpp.a during "
     "the second step of `exporting project`. At this time, bridge functions and others "
     "have not been generated yet, so this platform **cannot use** the optimized build "
     "process."),

    # the 2021+/2020- compatibility split is meaningless now that 2022.3 is the
    # floor; only the com.unity.entities rule of thumb survives.
    ("guide/features/dots.md",
     "Currently only tested on Unity 2021+ versions; Unity 2020 and lower have not been "
     "tested for compatibility. Generally speaking, as long as",
     "Generally speaking, as long as"),

    # the measurements stay valid; naming 2021 as the build version does not.
    ("guide/performance/impactonappmemory.md",
     "We tested the memory of Android Armv8 platform apk built with Unity 2021 version.",
     "We tested the memory of Android Armv8 platform apk."),
    ("guide/performance/impactonappsize.md",
     "We tested the size of Android Armv8 platform apk built in Unity 2021.",
     "We tested the size of Android Armv8 platform apk."),

    # `.NetFramework 4` was the 2019/2020 setting; one value remains.
    ("guide/setup/projectsettings.md",
     "- Switch `Api Compatibility Level` to `.NetFramework 4` (Unity 2019, 2020) "
     "or `.Net Framework` (Unity 2021+).",
     "- Switch `Api Compatibility Level` to `.Net Framework`."),

    # the globalgamemanagers / ScriptingAssemblies split was a 2019-vs-2020+
    # difference. Only the json form is left. (The old en text also misspelled
    # the file as `ScriptingAssembles.json`.)
    ("guide/features/monobehaviour.md",
     "Different Unity versions have different names and formats for assembly list files.\n"
     "\n"
     "- 2019 version: globalgamemanagers file when uncompressed; saved to globalgamemanagers "
     "file then packaged with other files into data.unity3d file in BundleFile format when "
     "compressed.\n"
     "- 2020-2021 versions: Saved in ScriptingAssembles.json file.",
     "In the Unity versions currently supported, the assembly list is saved in the "
     "`ScriptingAssemblies.json` file."),

    # the supported LTS set, as stated on the landing page.
    ("intro.md",
     "- Supports all LTS versions including 2019.4.x, 2020.3.x, 2021.3.x, 2022.3.x, "
     "2023.2.x, and **6000.x.y** series",
     "- Supports all LTS versions: 2022.3.x, 2023.2.x and **6000.x.y** "
     "(excluding 6000.5.x)"),
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
            # already applied on an earlier run, or a real match failure
            if new in text:
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
