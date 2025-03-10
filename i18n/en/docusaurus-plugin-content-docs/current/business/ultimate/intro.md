# Introduction

The Ultimate Edition is primarily aimed at projects with strict performance requirements. Compared to the community edition, the Ultimate Edition has a significant performance improvement, almost reaching native performance levels (**100% unchanged**), while also offering good optimizations in terms of security and memory.

## Supported Versions

Supports all Unity 2019-6000 LTS versions.

## Advantages

- Includes all features of the [Professional Edition](../pro/intro).
- Incorporates the innovative [DHE](../differentialhybridexecution) technology, where unchanged code performs identically to native code. Compared to the purely interpreted approach of the community edition, DHE offers an astonishing **3-30 times** or higher performance boost, achieving nearly native performance levels overall.
- Includes two years of technical support.

## Predictable Effects

The effects of DHE technology are predictable. It's possible to know the final effect without actually running DHE.

Before hot updates, the performance is identical to native code. After hot updates, at the function level, the changed functions are executed in an interpreted manner. When generating the dhao file, all changed functions are also printed out. Therefore, developers can estimate in advance which functions' performance has been affected by the hot update behavior.

## Differences from Solutions like InjectFix

Overall, the Ultimate Edition meets the needs of projects that require arbitrary logic hot updates while maintaining native performance, while InjectFix is primarily used for fixing function bugs, with a world of difference between the two. The specific differences are as follows:

| Solution | Ultimate Edition | InjectFix |
|----------|------------------|-----------|
| Code Change Limitations | Can be changed arbitrarily | Only supports fixing functions and very small-scale code additions (due to many unsupported features and bugs) |
| Supported C# Features | Inherits the characteristics of the community version, with almost no code limitations | Many features missing, significant limitations on type inheritance, delegates, generics, reflection, multithreading, async, or simply cannot work properly (similar defects to ILRuntime) |
| Performance | Unchanged functions are the same as AOT, changed functions are interpreted, but interpretation performance is extremely efficient (average performance is more than ten times that of InjectFix) | Even unchanged functions suffer performance degradation due to instrumentation. Additionally, interpreter performance is extremely inefficient |
| GC | Completely identical to native | Significant additional GC |
| Workflow | Automatic tagging, one-click completion, no manual involvement required | Manual tagging, time-consuming, error-prone, and tedious, disaster in multi-version maintenance |
| Stability Level | Extensively verified in numerous projects, extremely high stability | Many unsupported features and bugs |
