# DOTS Support

DOTS does not support dynamic registration of core types such as Component, System, and Aspect. As a result, DOTS-related types in hot updates cannot be recognized by the DOTS runtime and cannot operate normally.

The commercial version made some modifications to DOTS and adjusted the runtime code accordingly, ultimately supporting most of the features of DOTS. Especially for the flagship version, if the function marked `[BurstCompile]` is not modified,
It can be implemented by directly calling the burst function, which can greatly improve performance.

For details, please refer to the [Commercial version of DOTS support] (../business/dots) document.