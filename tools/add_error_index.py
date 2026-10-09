# -*- coding: utf-8 -*-
"""Phase 4: give `reference/commonerrors.md` a navigable index.

The page holds 79 error entries under three top-level sections. The
right-hand table of contents lists all 79 at once, which is not a usable
way to find an error. This inserts a short routing block immediately
before the first section: pick the stage the error occurred at, jump to
that section, and -- if the error is not here -- follow the pointers to
the sibling reference pages and the three commercial-tier error pages.

Section anchors are the github-slugger slugs Docusaurus derives from the
headings (Chinese characters are preserved verbatim, spaces become `-`).
"""
import io
import os

ZH = "docs"
EN = os.path.join("i18n", "en", "docusaurus-plugin-content-docs", "current")

REL = os.path.join("reference", "commonerrors.md")

ZH_BLOCK = u"""## 如何定位错误

错误按**发生阶段**分为三类。先确定错误出现在哪个阶段，再到对应小节中查找：

| 发生阶段 | 小节 | 典型表现 |
| --- | --- | --- |
| Unity Editor 中 | [Unity Editor下的错误](#unity-editor下的错误) | 安装、菜单命令、生成与编译dll时报错 |
| 打包构建时 | [打包时发生错误](#打包时发生错误) | il2cpp编译失败、链接错误、代码裁剪引起的错误 |
| 运行游戏时 | [运行时错误](#运行时错误) | 加载程序集失败、类型或函数找不到、崩溃 |

如果这里没有你遇到的错误，再查阅：

- [FAQ](./faq.md) —— 使用上的常见疑问
- [不支持的特性](./notsupportedfeatures.md) —— 先确认遇到的是限制而不是bug
- [il2cpp的bug](./il2cppbugs.md) —— 由Unity自身引起的问题
- [如何提交issue](./issue.md) —— 仍未解决时如何有效反馈

商业版各自还有专属的问题页：[专业版](../business/pro/commonerrors.md)、[旗舰版](../business/ultimate/commonerrors.md)、[热重载版](../business/reload/commonerrors.md)。

"""

EN_BLOCK = u"""## Locating Your Error

Errors are grouped by **the stage they occur at**. Work out which stage
you are in, then look in that section:

| Stage | Section | Typical symptoms |
| --- | --- | --- |
| In the Unity Editor | [Unity Editor Errors](#unity-editor-errors) | Installation, menu commands, generating and compiling dlls |
| While building | [Errors During Packaging](#errors-during-packaging) | il2cpp compile failures, link errors, code stripping |
| While running the game | [Runtime Errors](#runtime-errors) | Assembly load failures, missing types or methods, crashes |

If your error is not listed here, check:

- [FAQ](./faq.md) -- common questions about usage
- [Unsupported Features](./notsupportedfeatures.md) -- confirm it is a limitation rather than a bug
- [il2cpp Bugs](./il2cppbugs.md) -- problems caused by Unity itself
- [How to Submit an Issue](./issue.md) -- how to report effectively if nothing here helps

Each commercial edition also has its own error page: [Professional](../business/pro/commonerrors.md), [Ultimate](../business/ultimate/commonerrors.md), [Hot Reload](../business/reload/commonerrors.md).

"""

JOBS = [
    (os.path.join(ZH, REL), ZH_BLOCK, u"## Unity Editor下的错误\n"),
    (os.path.join(EN, REL), EN_BLOCK, u"## Unity Editor Errors\n"),
]


def main():
    for path, block, first_section in JOBS:
        with io.open(path, "r", encoding="utf-8", newline="") as f:
            text = f.read()
        if block.split(u"\n")[0] in text:
            print("%s: index already present, skipped" % path)
            continue
        if first_section not in text:
            print("UNMATCHED: %s :: %r" % (path, first_section))
            continue
        text = text.replace(first_section, block + first_section, 1)
        with io.open(path, "w", encoding="utf-8", newline="") as f:
            f.write(text)
        print("%s: index inserted before %s" % (path, first_section.strip()))


if __name__ == "__main__":
    main()
