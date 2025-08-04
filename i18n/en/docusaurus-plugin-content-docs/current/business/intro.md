# Introduction

We provide multiple high-end commercial versions and flexibly customizable technical services to meet game project requirements in various application scenarios.

## Commercial Versions

:::tip

All commercial versions provide long-term support for **Unity 2019-6000 LTS** versions, ensuring projects have long-lasting and stable technical support.

:::

Currently, there are three commercial versions with specific feature comparisons as follows:

- [Professional Edition](./pro/intro.md). Significantly improves [interpretation execution performance](./basicoptimization) (numerical instruction performance is **280%-735%** of the community version), optimizes metadata memory, supports code encryption, and effectively ensures code security
- [**Ultimate Edition**](./ultimate/intro.md). Includes all Professional Edition features, plus our core [DHE technology](./differentialhybridexecution), dramatically improving performance to nearly (**100% when unchanged**) the same level as native AOT
- [Hot Reload Edition](./reload/intro.md). Includes all Professional Edition features while supporting unloading and reloading individual assemblies, currently capable of unloading **100%** of assembly metadata memory

|Feature|Community|Professional|Ultimate|Hot Reload|
|-|-|-|-|-|
|Interpretation Execution|✔|✔|✔|✔|
|MonoBehaviour|✔|✔|✔|✔|
|Supplemental Metadata|✔|✔|✔|✔|
|Incremental GC|✔|✔|✔|✔|
|Unity 2019-6000 LTS|✔|✔|✔|✔|
|[DOTS](../basic/dots)|✔|✔|✔|✔|
|[Full Generic Sharing](./fullgenericsharing)||✔|✔|✔|
|[Metadata Optimization](./metadataoptimization.md)||✔|✔|✔|
|[Standard Interpretation Performance Optimization](./basicoptimization)||✔|✔|✔|
|[Hotfix Dynamic Hot Repair](./hotfix)||✔|✔|✔|
|[Assembly::Load Loading Optimization](./assemblyloadoptimization)||✔|✔|✔|
|[Crash Logs with Interpreter Stack Information](./crashreport)||✔|✔|✔|
|[Offline Instruction Optimization](./advancedoptimization)||✔|✔|✔|
|global-metadata.dat Encryption||✔|✔|✔|
|[Code Hardening](./basicencryption)||✔|✔|✔|
|[Hot Reload](./reload/hotreloadassembly)||||✔|
|[Access Control Mechanism](./accesspolicy)||||✔|
|[**DHE Technology**](./differentialhybridexecution)|||✔||
|Technical Support||2 years|2 years|2 years|

### Pricing Standards


|Version|Price (RMB)|Description|
|-|-|-|
|Community Edition|0|Unlimited use|
|Professional Edition|Contact business via email|Perpetual license for one project, includes 2 years technical support and 2 years code updates|
|Hot Reload Edition|Contact business via email|Perpetual license for one project, includes 2 years technical support and 2 years code updates|
|Ultimate Edition|Contact business via email|Perpetual license for one project, includes 2 years technical support and 2 years code updates|


## Enterprise Technical Support

You can flexibly choose the technical service projects needed by the enterprise. If you subscribe annually, billing is based on service items; otherwise, billing is based on service duration.

### Technical Support Content

- Standard bug response and resolution, including one-on-one remote assistance guidance. Most reproducible bugs will be fixed or provided with workaround solutions within 2-7 days
- Solve some special platform compatibility issues
- Support for some currently unsupported versions (excluding 2018 and earlier versions)
- Optimization guidance
- Other services

### Pricing Standards

Since HybridCLR is easy to use and runs stably, most companies do not require long-term technical support, so we only provide hourly technical support services.
Unused time from a single service session can be retained for future use. To save business costs, hourly billing of 1500 RMB and below **does not provide** contracts and invoices, please understand.

|Service Level|Problem Scope|Price|
|-|-|-|
|Standard|Provides basic usage technical Q&A, does not include bug fixes or unimplemented feature solutions|100 RMB/hour, billed in 15-minute intervals (e.g., 15 minutes, 2 hours)|
|Expert|Solves complex problems, including bug fixes|1500 RMB/hour, billed in 30-minute intervals (e.g., 30 minutes, 2 hours)|


## Contact Us

Please use your company's **corporate email** to send inquiries to `business@code-philosophy.com`. Emails sent from personal accounts like QQ or 126 email will be ignored, please understand.
