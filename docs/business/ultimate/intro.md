# 介绍

旗舰版主要面向有严格性能要求的项目。旗舰版相对社区版在性能方面有巨幅提升，几乎（**未改动时为100%**）达到原生性能水平，同时在安全性和内存方面有较好的优化。

## 支持的版本

支持所有 Unity 2019-2022 LTS版本。

## 优势

- 包含独创的 [Differential Hybrid Execution(DHE)](../differentialhybridexecution) 技术，未变化部分代码性能与原生完全相同，相较社区版本纯解释方式提升惊人的**3-30**倍甚至更高，整体**几乎达到**原生性能水平
- 支持Unity 2021起的il2cpp的`full generic sharing`技术，值类型也可以泛型共享了，以原生方式执行AOT泛型函数，极大提升了泛型函数的执行性能。不再需要对AOT进行补充元数据，简化了工作流，并且有效降低包体大小，明显降低了内存占用。对WebGL等包体和内存要求严苛的平台尤其有用
- 支持标准指令优化。对常见的代码范式进行谨慎可靠的优化，大幅提升了变量访问（50%-100%）、数值计算（100-300%）、对象访问（50-200%）等常见指令的性能，像一些特殊代码如typeof指令的性能，提升了1000%以上
- 支持标准代码加固。进行多重加密，使dll无法被ILSpy这样的工具反编译
- 优化了元数据分配，占用内存更少
- 提前将原始IL指令转换为寄存器指令，天然抗反编译破解，更安全
- 优化加载及运行过程中元数据分配，更节省内存
- 更敏捷的维护支持，随时获得最新的代码（社区版本出于维护成本考虑，只会定期发布版本）
- 原生代码已全部在包体中，被各大AppStore拒审的风险大幅降低
- 附含两年的技术支持，快速解决使用过程中遇到的各种问题


## 实践效果

:::tip
DHE技术的效果是可预测的。不需要实际运行DHE也可以基本知道最终效果。
:::

没有发生热更新前，性能与原生完全相同。发生热更新后，以函数为粒度，变化的函数变成以解释方式执行，并且可以自由选择
使用无优化或`标准指令优化`或`高级指令优化`的方式去执行它们。生成dhao文件时，也会将所有变化函数打印出来。DHE的效果
是可提前观测的。

以接入的某个非常火的SLG游戏为例：在重度战斗的场景下，原生帧率为44；接入社区版本后，帧率降到20多；接入DHE后，未热更新前，帧率甚至略高于原生（测试波动引起）；
接入DHE并且做了一定改动热更新后，帧率降到42。这与理论估计是完全相符的。


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
