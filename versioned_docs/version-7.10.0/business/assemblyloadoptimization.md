# Assembly::Load加载优化

商业化版本从以几个方面优化了Assembly::Load加载时间，最终将Assembly::Load时间减少为原来的**20%**。

- 优化InterpreterImage::InitRuntimeMetadatas的代码
- 延迟初始化了了部分耗时并且不需要立即初始化的metadata

