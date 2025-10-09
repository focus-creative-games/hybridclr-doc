# Introduction

The Ultimate version is primarily aimed at projects with strict performance requirements. The Ultimate version has tremendous performance improvements compared to the community version, almost (**100% when unchanged**) reaching native performance levels, while also having good optimizations in terms of security and memory.

## Supported Versions

Supports all Unity 2019-6000 LTS versions.

## Advantages

- Includes all features of the [Professional version](../pro/intro)
- Includes the unique [DHE](../differentialhybridexecution) technology, where unchanged code sections perform identically to native code, providing an amazing **3-30** times or even higher performance improvement compared to the community version's pure interpretation approach, achieving **almost native** performance levels overall
- Supports multi-main package iterative updates. Multiple main packages (v1, v2, ..., vn) can exist simultaneously, all loading the same latest version of hot update code, with newer main packages having better performance.

## Predictable Effects

The effects of DHE technology are predictable. You can basically know the final effect without actually running DHE.

Before hot updates occur, performance is identical to native. After hot updates occur, changed functions are executed interpretively at the function granularity. When generating dhao files, all changed functions are also printed out.
Therefore, developers can estimate in advance which functions' performance will be affected by hot update behavior.

## Differences from Solutions like injectfix

Overall, the Ultimate version meets the needs of projects that want both arbitrary logic hot updates and native performance, while injectfix can basically only be used to fix function bugs - there's a world of difference between them. Specific differences are as follows:

|Solution|Ultimate Version|injectfix|
|-|-|-|
|Code Change Restrictions|Can change arbitrarily|Only supports fixing functions and adding code in very small scope (due to many unsupported features and bugs)|
|Supported C# Features|Inherits the characteristics of the community version with almost no code restrictions|Many missing features, with significant restrictions or complete inability to work properly for type inheritance, delegates, generics, reflection, multithreading, async (essentially similar defects to ILRuntime)|
|Performance|Unchanged functions same as AOT, changed ones use interpretation but with extremely efficient interpretation performance (average performance more than 10 times that of injectfix)|Unchanged functions have some performance degradation even when not modified due to instrumentation. Additionally, interpreter performance is extremely inefficient|
|GC|Identical to native|Has significant additional GC|
|Workflow|Automatic marking, one-click completion, no manual intervention required|Manual marking, time-consuming, error-prone, multi-version maintenance is a disaster|
|Stability Level|Verified by numerous projects, extremely high stability|Many unsupported features and bugs|
