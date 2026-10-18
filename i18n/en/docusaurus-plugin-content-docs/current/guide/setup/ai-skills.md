---
title: 'AI Skills'
description: 'The Agent Skills shipped with com.code-philosophy.hybridclr, what each one covers, and how to give them to a coding assistant.'
slug: /basic/ai-skills
---

# AI Skills

`com.code-philosophy.hybridclr` includes a set of [Agent Skills](https://agentskills.io/). A coding assistant that supports the format reads them when the task matches and follows the HybridCLR workflow. They are operational summaries; the corresponding documentation remains the full reference.

The skills are not tied to a particular editor or coding assistant. Any tool that can load a skill directory containing `SKILL.md` can use them.

## Included skills

| skill | Purpose |
| --- | --- |
| `hybridclr-setup` | Choose a matching Unity and package version, install the package, run `HybridCLR/Installer`, and recover from git or network failures |
| `hybridclr-configure` | Configure HybridCLR Settings and PlayerSettings, including the hot-update assembly lists, link.xml output, and IL2CPP |
| `hybridclr-hotupdate-assembly` | Split, create, compile, and load hot-update assemblies, and keep AOT assemblies from referencing hot-update code |
| `hybridclr-aot-generic` | Handle AOT generics: supplementary metadata, `LoadMetadataForAOTAssembly`, and `MissingMethodException` |
| `hybridclr-avoid-code-strip` | Keep IL2CPP from stripping AOT types and methods that hot-update code calls |
| `hybridclr-monobehaviour` | Use MonoBehaviour and ScriptableObject from hot-update code, including scripts on assets and Script Missing |
| `hybridclr-monopinvokecallback` | Reserve ReversePInvokeWrapper slots for `[MonoPInvokeCallback]` methods in hot-update code |
| `hybridclr-script-language` | Use HybridCLR alongside lua, JavaScript/TypeScript, or Python. Prefer ZLua / ZenTS, and follow the extra steps required by xlua, tolua, and puerts |

## Installation

After `com.code-philosophy.hybridclr` is installed, the skills are already in the package, but a coding assistant does not read inside a Unity package on its own. Hand it the skill directories you want it to use.

### Locate the skill directory

Inside the package, the skills live at `Data~/skills`:

- If the package is in the project's `Packages` folder: `Packages/com.code-philosophy.hybridclr/Data~/skills`
- If it was added from a git URL in Package Manager, Unity caches it under `Library/PackageCache/` in a `com.code-philosophy.hybridclr@...` folder, which also contains `Data~/skills`

Folder names ending in `~` are not shown in Unity's Project window. Open the path above in a file manager.

Each subdirectory is one skill and contains a `SKILL.md`. Do not take `SKILL.md` out of its directory.

### Give the skills to your assistant

1. Read the documentation of the assistant you use, and find the directory from which it loads project-level or user-level skills. The directory name and location are defined by that product.
2. Copy each skill **directory** you need into that location, or create a symbolic link to the directory. A link picks up package updates automatically. A copy must be replaced after you upgrade the package.
3. Refresh skills, or start a new session, using the steps that assistant documents.

You can install only the skills you need, or every subdirectory under `Data~/skills`.

## Usage

After the skills are installed, describe the task in normal language, such as installing HybridCLR, marking an assembly as hot-update, or diagnosing an AOT generic error. The assistant decides which skill to apply from the description at the top of each skill. You do not need to name a skill yourself.
