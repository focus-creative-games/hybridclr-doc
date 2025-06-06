# 介绍

旗舰版主要面向有严格性能要求的项目。旗舰版相对社区版在性能方面有巨幅提升，几乎（**未改动时为100%**）达到原生性能水平，同时在安全性和内存方面有较好的优化。

## 支持的版本

支持所有 Unity 2019-6000 LTS版本。

## 优势

- 包含[专业版](../pro/intro)的所有功能
- 包含独创的 [DHE](../differentialhybridexecution) 技术，未变化部分代码性能与原生完全相同，相较社区版本纯解释方式提升惊人的**3-30**倍甚至更高，整体**几乎达到**原生性能水平
- 支持多主包迭代更新。即可以同时存在v1、v2，，，vn多个主包，它们都加载相同的最新版本的热更新代码，越新的主包性能越好。

## 可预测的效果

DHE技术的效果是可预测的。不需要实际运行DHE也可以基本知道最终效果。

没有发生热更新前，性能与原生完全相同。发生热更新后，以函数为粒度，变化的函数变成以解释方式执行。生成dhao文件时，也会将所有变化函数打印出来。
因此开发者可以提前估计热更新行为影响了哪些函数的性能。

## 与injectfix之类方案的区别

从整体来说，旗舰版满足既希望逻辑任意热更新又想保持原生性能的项目的需求，而injectfix基本只能用于修复函数bug，两者有天壤之别。具体差异如下：

|方案|旗舰版|injectfix|
|-|-|-|
|代码变更限制|可以任意变更|只支持修复函数及非常小范围地增加代码（因为有大量不支持的特性和bug）|
|支持的C#特性|继承了社区版本的特点，几乎没有代码限制|大量特性缺失，类型继承、delegate、泛型、反射、多线程、异步都有大量限制或者根本无法正常工作（本质上跟ILRuntime相似的缺陷）|
|性能|未变化函数跟AOT相同，变化走解释，但解释性能极其高效（平均性能在injectfix十倍以上）|未变化函数因为插桩缘故，即使不变更，性能也有一定程度下降。另外解释器性能极其低效|
|GC|跟原生完全相同|有大量额外GC|
|工作流|自动标记，一键完成，无需人工参与|手动标记，费时费力又容易出错，多版本维护是灾难|
|稳定性水平|大量项目验证，稳定性极高|大量不支持的特性及bug|
