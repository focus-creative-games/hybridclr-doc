# Introduction

We offer various high-end commercial versions and customizable technical services to meet the needs of game projects in various scenarios.

## Commercial Versions

:::tip

All commercial versions will be long-term supported for **Unity 2019-6000 LTS** versions, ensuring long-term stable technical support for projects.

:::

Currently, there are three commercial versions, with specific feature comparisons as follows:

- [Professional Edition](./pro/intro.md). Significant improvements in [interpreted execution performance](./basicoptimization) (numeric instruction performance is **280%-735%** of the community version), optimized metadata memory, support for code encryption, effectively ensuring code security.
- [**Ultimate Edition**](./ultimate/intro.md). Includes all features of the Professional Edition, additionally featuring our core [DHE technology](./differentialhybridexecution), greatly improving performance, almost (**100% when unchanged**) reaching the same level as native AOT.
- [Hot Reload Edition](./reload/intro.md). Includes all features of the Professional Edition, and supports unloading and reloading individual assemblies. Currently, it can unload **100%** of the metadata memory of the assembly.

| Feature                  | Community Edition | Professional Edition | Ultimate Edition | Hot Reload Edition |
|--------------------------|-------------------|----------------------|------------------|--------------------|
| Interpreted Execution    | ✔                 | ✔                    | ✔                | ✔                  |
| MonoBehaviour            | ✔                 | ✔                    | ✔                | ✔                  |
| Supplementary Metadata   | ✔                 | ✔                    | ✔                | ✔                  |
| Incremental GC           | ✔                 | ✔                    | ✔                | ✔                  |
| Unity 2019-6000 LTS      | ✔                 | ✔                    | ✔                | ✔                  |
| [DOTS](../basic/dots)                    | ✔                  | ✔                    | ✔                | ✔                  |
| [Full Generic Sharing](./fullgenericsharing)          |                   | ✔                    | ✔                | ✔                  |
| [Metadata Optimization](./metadataoptimization.md) |                   | ✔                    | ✔                | ✔                  |
|[Hotfix](./hotfix)|✔|✔|✔|
|[Assembly::Load Loading Time Optimization](./assemblyloadoptimization)||✔|✔|✔|
|[Crash Report With Interpreter Stack Trace](./crashreport)||✔|✔|✔|
| [Standard Interpretation Performance Optimization](./basicoptimization)    |                   | ✔                    | ✔                | ✔                  |
| [Offline Instruction Optimization](./advancedoptimization)    |                   | ✔                    | ✔                | ✔                  |
| [Code Encryption](./basicencryption)         |                   | ✔                    | ✔                | ✔                  |
|global-metadata.dat encryption||✔|✔|✔|
| [Hot Reload](./reload/hotreloadassembly)          |                   |                      |                  | ✔                  |
| [Access Control Mechanism](./accesspolicy)  |                   |                      |                  | ✔                  |
| [**DHE Technology**](./differentialhybridexecution)            |                   |                      | ✔                |                    |
| Technical Support        |                   | 2 year               | 2 years          | 2 years            |

### Pricing

| Version            | Price (RMB)            | Description                                                                      |
|--------------------|------------------------|----------------------------------------------------------------------------------|
| Community Edition  | 0                      | Unlimited usage period                                                          |
| Professional Edition | Contact us via email for business inquiry | Buy the right to use for one project permanently, includes 2 year of technical support and 2 year of code updates |
| Hot Reload Edition  | Contact us via email for business inquiry | Buy the right to use for one project permanently, includes 2 years of technical support and 2 years of code updates |
| Ultimate Edition   | Contact us via email for business inquiry | Buy the right to use for one project permanently, includes 2 years of technical support and 2 years of code updates |

## Enterprise Technical Support

You can flexibly choose the technical service items needed by the enterprise. If subscribed annually, billing will be based on the service items, otherwise, it will be based on the service duration.

### Technical Support Contents

- Standard response and resolution of bugs, including one-on-one remote assistance and guidance. Most reproducible bugs will be fixed or provided with workarounds within 2-7 days.
- Solve some special platform compatibility issues.
- Support for some currently unsupported versions (excluding versions before 2018).
- Optimization guidance.
- Other services.

### Pricing

Since HybridCLR is easy to use and stable, most companies do not need long-term technical support. Therefore, only timed technical support services are provided.
Unused time in a single service can be retained for subsequent use. To save business costs, time-based billing under 2000 RMB **does not provide** contracts and invoices, please understand.

| Service Level | Scope of Problem Solving                                      | Price                      |
|---------------|--------------------------------------------------------------|----------------------------|
| Standard     | Provides technical support for basic usage questions, excluding bug fixes and implementation of unreleased features | 100 RMB per hour, billed in 15-minute increments (e.g., 15 minutes, 2 hours) |
| Expert       | Solves complex problems, including bug fixes                 | 1500 RMB per hour, billed in 30-minute increments (e.g., 30 minutes, 2 hours) |

## Contact Us

Please use your company's **corporate email** to email `business@code-philosophy.com` for inquiries. Emails initiated by personal email accounts such as QQ or 126 will be ignored, please understand.
