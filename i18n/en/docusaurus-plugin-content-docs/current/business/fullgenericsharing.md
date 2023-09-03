# Fully generic sharing

Although supplementary metadata completely solves the AOT generic problem, supplementary metadata will cause the need to download the supplementary metadata dll with the package or hot update, resulting in an increase in package size or hot update time.
Loading supplementary metadata not only resulted in a noticeable increase in memory footprint, but also increased startup time. For occasions such as WeChat mini-games that have strict requirements on package size and memory, this is a problem that has a greater impact.
In addition, the supplemented generic functions are executed in an interpreted manner, which also reduces the running performance.

After HybridCLR supports `full generic sharing`, it no longer needs to supplement metadata, simplifies the workflow, runs AOT generics natively, greatly improves performance, and completely solves the above shortcomings of supplementing metadata.

## Supported versions

Supports Unity 2021 and later LTS versions.

## Principle

The old generic sharing technology can only perform generic sharing on class types. Since the 2021.3.x LTS version, il2cpp has supported `full generic sharing` technology,
That is, generic parameters can be shared regardless of their type (including value types). HybridCLR uses this mechanism to realize that it does not need to supplement metadata, and it can perfectly support AOT generics.


## set up

- 2021.3.x LTS version. Enabled when `Il2Cpp Code Generation` option in Build Settings is `faster(smaller) build`
`full generic sharing` mechanism. When this option is enabled, all generic instances of a generic function (regardless of whether the generic parameter is a value type or a class type) completely share a single code.
- 2022.3.x LTS version. Mandatory support for `full generic sharing`, even if the `faster runtime` option is used in Build Settings, this mechanism will be enabled. Difference from `faster(smaller) build`
The reason is: `faster runtime` will use a separate generic function to implement the generic function that has been instantiated in AOT, instead of using a fully generic shared version, which improves the execution performance of the generic function;
The `faster(smaller) build` option forces all generic functions of the same function to use one code, which has the same meaning as the 2021 version.