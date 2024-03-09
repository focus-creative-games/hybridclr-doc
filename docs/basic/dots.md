# DOTS支持

DOTS的并不支持动态注册Component、System、Aspect等核心类型，导致热更新中的DOTS相关类型无法被DOTS运行时识别，无法正常运行。

商业化版本对DOTS做了部分修改，并且相应调整了运行时代码，最终实现了支持DOTS绝大多数特性。尤其是旗舰版本，标记`[BurstCompile]`的函数如果未修改，
可以直接调用burst函数实现，可以极大提升性能。

具体请参见[商业化版本的DOTS 支持](../business/dots)文档。
