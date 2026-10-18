---
title: 'AI Skills'
description: 'com.code-philosophy.hybridclr 附带的 Agent Skills、各自用途，以及如何交给编程助手。'
slug: /basic/ai-skills
---

# AI Skills

`com.code-philosophy.hybridclr` 附带一组 [Agent Skills](https://agentskills.io/)。支持该格式的编程助手在处理相关任务时会读取这些说明，按 HybridCLR 的做法完成操作。它们是文档的操作摘要，详细规则仍以对应文档为准。

这些 skill 不绑定某一种编辑器或编程助手。只要对方能加载包含 `SKILL.md` 的 skill 目录，就可以使用。

## 包含的 skill

| skill | 用途 |
| --- | --- |
| `hybridclr-setup` | 选择匹配的 Unity 与 package 版本，安装包并运行 `HybridCLR/Installer`，处理 git 或网络导致的安装失败 |
| `hybridclr-configure` | 配置 HybridCLR Settings 与 PlayerSettings，包括热更新程序集列表、link.xml 输出和 IL2CPP |
| `hybridclr-hotupdate-assembly` | 划分、创建、编译和加载热更新程序集，避免 AOT 程序集引用热更新代码 |
| `hybridclr-aot-generic` | 处理 AOT 泛型：补充元数据、`LoadMetadataForAOTAssembly`，以及 `MissingMethodException` |
| `hybridclr-avoid-code-strip` | 避免热更新代码调用的 AOT 类型和方法被 IL2CPP 裁剪 |
| `hybridclr-monobehaviour` | 在热更新代码中使用 MonoBehaviour 和 ScriptableObject，处理资源挂脚本与 Script Missing |
| `hybridclr-monopinvokecallback` | 为热更新中的 `[MonoPInvokeCallback]` 预留 ReversePInvokeWrapper |
| `hybridclr-script-language` | 与 lua、JavaScript/TypeScript 或 Python 一起使用；优先 ZLua / ZenTS，并说明 xlua、tolua、puerts 需要的额外步骤 |

## 安装

安装 `com.code-philosophy.hybridclr` 之后，skill 已经在 package 里，但编程助手不会自动读取 Unity package 内部的目录，需要把要用的 skill 目录交给它。

### 找到 skill 目录

Skills 在 package 内的相对路径是 `Data~/skills`：

- 包放在工程的 `Packages` 目录时：`Packages/com.code-philosophy.hybridclr/Data~/skills`
- 通过 Package Manager 的 git URL 安装时，Unity 把包缓存在 `Library/PackageCache/` 下的 `com.code-philosophy.hybridclr@...` 目录中，其下同样有 `Data~/skills`

`Data~` 以 `~` 结尾，Unity 不会把它显示在 Project 窗口里。请在文件管理器中打开上述路径。

每个子目录是一个 skill，目录里有一份 `SKILL.md`。不要把 `SKILL.md` 单独拆出去。

### 交给编程助手

1. 查看你所用编程助手的文档，确认它从哪个目录加载项目级或用户级 skill。目录名和位置由该产品决定。
2. 把需要的 skill **子目录整体**复制到那个目录，或为子目录建立符号链接。使用链接时，package 升级后会自动用到新内容；使用复制时，升级 package 后需要重新复制。
3. 按该助手的说明刷新 skill 或新开一次会话。

可以只安装当前用到的几个 skill，也可以安装 `Data~/skills` 下的全部子目录。

## 使用

安装完成后，直接用自然语言描述要做的事，例如安装 HybridCLR、把某个程序集配成热更新，或排查 AOT 泛型报错。助手会根据每个 skill 开头的说明判断要不要采用它，不需要手动点名。
