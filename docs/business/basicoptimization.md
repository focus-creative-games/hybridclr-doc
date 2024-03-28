# 解释执行优化

目前仅可使用标准解释执行优化技术，[离线指令优化](./advancedoptimization)技术还在开发中。

## 标准指令优化技术

标准指令优化技术为运行时优化技术。对常见的代码范式进行谨慎可靠的优化，大幅提升了变量访问、数值计算、对象访问等常见指令的性能，像一些特殊代码如typeof指令的性能，提升了1000%以上。

**商业版**大幅提升了数值计算性能，其性能是社区版本的 **280%-735%**。

以下是OnePlus 9R ArmV8 实机测试报告，测试代码附录最后。

### AOT耗时 vs 商业化版本耗时 vs 社区版本耗时 （越小越好）

![data](/img/benchmark/numeric_datas.jpg)

### 商业化版本耗时/AOT耗时 vs 社区版本耗时/AOT耗时  （越小越好）

AOT版本性能是社区版本的`4.1 - 90`倍，是商业化版本的`1.30 - 12.9`倍。

![data](/img/benchmark/numeric_business_vs_aot_div_aot.jpg)


### 商业化版本性能/社区版本性能 （越大越好）

商业化版本性能是社区版本的`2.87-7.35`倍。

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)

### 商业化版本性能/AOT版本性能 （越小越好）

AOT版本性能是是商业化版本的`1.30 - 12.9`倍。

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)
