# -*- coding: utf-8 -*-
"""Phase 4: split the ~1400-line test-case appendix out of performance.md
into its own page, in both locales.

The appendix is self-contained (no outbound relative links, no inbound
anchor links), and the main body uses no <Tabs>, so the MDX imports move
to the new page.
"""
import io
import os

JOBS = [
    {
        "src": "docs/guide/performance/performance.md",
        "dst": "docs/guide/performance/performance-testcases.md",
        # 1-based line number of the "## 附录：测试用例代码" heading
        "appendix_heading_line": 149,
        "title": "执行性能测试用例代码",
        "description": "执行性能测试报告所使用的完整测试用例代码，包括商业化版本 vs xlua，以及 AOT vs 社区版 vs 商业化版本 vs Mono 两组对比测试。",
        "slug": "/guide/performance/testcases",
        "new_heading": "# 执行性能测试用例代码",
        "intro": "本页是[执行性能](./performance.md)测试报告所使用的完整测试用例代码。",
        "body_pointer": "完整的测试用例代码见[执行性能测试用例代码](./performance-testcases.md)。",
    },
    {
        "src": "i18n/en/docusaurus-plugin-content-docs/current/guide/performance/performance.md",
        "dst": "i18n/en/docusaurus-plugin-content-docs/current/guide/performance/performance-testcases.md",
        "appendix_heading_line": 136,
        "title": "Execution Performance Test Cases",
        "description": "Complete test case code used in the execution performance report, covering both the Commercial Version vs xlua and the AOT vs Community Edition vs Commercial Edition vs Mono comparisons.",
        "slug": "/guide/performance/testcases",
        "new_heading": "# Execution Performance Test Cases",
        "intro": "This page contains the complete test case code used in the [Execution Performance](./performance.md) report.",
        "body_pointer": "The complete test case code is available in [Execution Performance Test Cases](./performance-testcases.md).",
    },
]

IMPORTS = [
    "import Tabs from '@theme/Tabs';\n",
    "import TabItem from '@theme/TabItem';\n",
]


def read_lines(path):
    with io.open(path, "r", encoding="utf-8", newline="") as f:
        return f.readlines()


def write_lines(path, lines):
    with io.open(path, "w", encoding="utf-8", newline="") as f:
        f.writelines(lines)


def main():
    for job in JOBS:
        lines = read_lines(job["src"])
        idx = job["appendix_heading_line"] - 1
        heading = lines[idx].strip()
        assert heading.startswith("## "), "unexpected heading: %r" % heading

        body = lines[:idx]
        appendix = lines[idx + 1:]

        # --- new appendix page ---
        out = [
            "---\n",
            "title: '%s'\n" % job["title"],
            "description: '%s'\n" % job["description"],
            "slug: %s\n" % job["slug"],
            "---\n",
            "\n",
        ]
        out.extend(IMPORTS)
        out.extend(["\n", job["new_heading"] + "\n", "\n", job["intro"] + "\n"])
        # skip leading blank lines of the old appendix, then keep it verbatim
        while appendix and appendix[0].strip() == "":
            appendix.pop(0)
        out.append("\n")
        out.extend(appendix)
        if out and not out[-1].endswith("\n"):
            out.append("\n")
        write_lines(job["dst"], out)

        # --- trimmed main page: drop now-unused MDX imports, add pointer ---
        body = [ln for ln in body if ln not in IMPORTS]
        # collapse the blank gap left where the imports were
        while len(body) > 5 and body[5].strip() == "" and body[6].strip() == "":
            del body[5]
        while body and body[-1].strip() == "":
            body.pop()
        body.extend(["\n", job["body_pointer"] + "\n"])
        write_lines(job["src"], body)

        print("%s -> %d lines; %s -> %d lines" % (
            job["src"], len(body), job["dst"], len(out)))


if __name__ == "__main__":
    main()
