# Introduction

The professional version provides some advanced features that are not supported by the community version. It is **highly cost-effective** and is suitable for occasions that require high memory and package size, such as WebGL games.


## Advantage

- Supports the `full generic sharing` technology of il2cpp starting from Unity 2021. Value types can also be shared generically. AOT generic functions are executed natively, which greatly improves the execution performance of generic functions. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL.
- **Support incremental GC**
- Optimize metadata allocation during loading and running, with smaller memory footprint
- More agile maintenance support, get the latest code at any time (the community version will only be released regularly due to maintenance cost considerations).