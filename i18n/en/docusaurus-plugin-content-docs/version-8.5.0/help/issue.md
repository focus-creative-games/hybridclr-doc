# Bug Report Template

Before reporting a bug, please confirm you have completed the following steps:  
- Carefully review the [Common Errors documentation](/help/commonerrors.md), as most beginner issues are covered there.
- If you're still certain it's a bug, please follow the **Report Template** below and send it to technical support (QQ1732047670).

## Bug Report

If you're certain it's a bug, please submit an issue following the bug report template below (you don't need to submit large files like exported projects), then directly report the issue to technical support, while also providing materials (like exported projects) via QQ.

**Bug Report Template**

- Unity Editor version. e.g., 2020.3.33
- Operating system. e.g., Win 10
- Problematic BuildTarget. e.g., Android 64
- com.code-philosophy.hybridclr version number. e.g., v2.3.1
- Screenshots and log files
- Reproduction conditions
- Location of problematic C# code (if identifiable)
- Free users must provide one of the following materials that meet the criteria, otherwise the report will be rejected, as non-standard bug reports waste too much of our time. Please understand.
  - Reproducible code segment
  - Reproducible minimal Unity project, required to be modified based on hybridclr_trial. Must reproduce immediately after building
  - Win 64 reproducible exported Debug project (must reproduce on startup) and hot update dlls (for instruction tracing)
- Commercial users can provide one of the following materials.
  - Reproducible minimal Unity project, preferably modified based on hybridclr_trial.
  - Win 64 reproducible exported Debug project (must reproduce on startup) and hot update dlls (for instruction tracing)
  - Android (64 or 32) reproducible exported Debug project, must be able to build successfully without issues like missing key store!!! Must reproduce after build and run.
  - Xcode exported project. Must reproduce on run.
