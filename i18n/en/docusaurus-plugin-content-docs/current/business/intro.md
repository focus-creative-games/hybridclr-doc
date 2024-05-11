# Introduction

We offer various high-end commercial versions and customizable technical services to meet the needs of game projects in various scenarios.

## Commercial Versions

:::tip

All commercial versions will be long-term supported for **Unity 2019-2022 LTS** versions, ensuring long-term stable technical support for projects.

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
| Unity 2019-2022 LTS      | ✔                 | ✔                    | ✔                | ✔                  |
| [DOTS](./dots)                    | ✔                  | ✔                    | ✔                | ✔                  |
| [Full Generic Sharing](./fullgenericsharing)          |                   | ✔                    | ✔                | ✔                  |
| [Metadata Optimization](./metadataoptimization.md) |                   | ✔                    | ✔                | ✔                  |
| [Standard Interpretation Performance Optimization](./basicoptimization)    |                   | ✔                    | ✔                | ✔                  |
| [Offline Instruction Optimization](./advancedoptimization)    |                   | ✔                    | ✔                | ✔                  |
| [Code Encryption](./basicencryption)         |                   | ✔                    | ✔                | ✔                  |
| [Hot Reload](./reload/hotreloadassembly)          |                   |                      |                  | ✔                  |
| [Access Control Mechanism](./accesspolicy)  |                   |                      |                  | ✔                  |
| [**DHE Technology**](./differentialhybridexecution)            |                   |                      | ✔                |                    |
| Technical Support        |                   | 1 year               | 2 years          | 2 years            |

### Pricing

| Version            | Price (RMB)            | Description                                                                      |
|--------------------|------------------------|----------------------------------------------------------------------------------|
| Community Edition  | 0                      | Unlimited usage period                                                          |
| Professional Edition | Contact us via email for business inquiry | Buy the right to use for one project permanently, includes 1 year of technical support and 1 year of code updates |
| Hot Reload Edition  | Contact us via email for business inquiry | Buy the right to use for one project permanently, includes 2 years of technical support and 2 years of code updates |
| Ultimate Edition   | Contact us via email for business inquiry | Buy the right to use for one project permanently, includes 2 years of technical support and 2 years of code updates |

### Trials

:::tip

Both free and paid trials are only available to enterprise users. Please contact `business@code-philosophy.com` with your **corporate email** to get trial support.

:::

All commercial versions support the following trial options:

| Trial Type                        | Price    | Service                                                              | Description                                                                                                                                                               |
|----------------------------------|----------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Free Trial without Full Source   | Free     | Technical support is available at a rate of 400 RMB/hour            | Only supports building iOS platform targets based on pre-compiled libil2cpp.a, does not provide C++ source code, does not provide tool source code. No trial period limit, but the runtime of the trial version will crash randomly after **30 minutes of startup or after three months of use**, please do not use it for formal releases. |
| Paid Trial with Full Source      | 10% of the total price of the commercial version | Equivalent technical support services to formal paid users | Provides source code and related tools for the trial version of the commercial version, which developers can build and test on their own. If you eventually purchase the formal version, the service fee can be deducted; otherwise, unless there is false advertising or major defects, the trial fee will not be refunded. |

Note that free trial versions do not support the following features:

- DOTS support
- Incremental GC

Documentation for free trial versions:

- [Professional Edition](./pro/freetrial)
- [Ultimate Edition](./ultimate/freetrial)
- [Hot Reload Edition](./reload/freetrial)

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

| Service Level | Scope of Problem Solving | Price     |
|---------------|---------------------------|-----------|
| Standard      | Technical Q&A for basic usage issues, does not include bug fixes or feature implementations in the scope of support | 400 RMB/hour |
| Expert        | Solve various complex problems within the scope of [Technical Support Contents], including bug fixes and feature implementations | 2000 RMB/hour |

## Contact Us

Please use your company's **corporate email** to email `business@code-philosophy.com` for inquiries. Emails initiated by personal email accounts such as QQ or 126 will be ignored, please understand.
