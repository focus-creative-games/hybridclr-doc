# Execution Optimization

Currently, only standard interpretation execution optimization technology can be used, and the [Offline Instruction Optimization](./advancedoptimization) technology is still under development.

## Standard Instruction Optimization

Standard instruction optimization techniques are runtime optimization techniques. Careful and reliable optimization of common code paradigms has greatly improved the performance of common instructions such as variable access, numerical calculations, and object access. The performance of some special codes such as the typeof instruction has been improved by more than 1000%.

The **Business Edition** greatly improves the numerical calculation performance, and its performance is **280%-735%** of the Community Edition.

The following is the OnePlus 9R ArmV8 actual test report, with the test code appendix at the end.

### AOT time-consuming vs. Business Edition time-consuming vs. Community Edition time-consuming (the smaller the better)

![data](/img/benchmark/numeric_datas.jpg)

### Business Edition time-consuming/AOT time-consuming vs Community Edition time-consuming/AOT time-consuming (the smaller the better)

The performance of the AOT version is `4.1 - 90` times that of the Community Edition and `1.30 - 12.9` times that of the Business Edition.

![data](/img/benchmark/numeric_business_vs_aot_div_aot.jpg)


### Business Edition performance/Community Edition performance (the bigger, the better)

The performance of the Business Edition is `2.87-7.35` times that of the Community Edition.

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)

### Business Edition time-consuming/AOT version time-consuming (the smaller, the better)

The performance of the AOT version is `1.30 - 12.9` times that of the Business Edition.

![data](/img/benchmark/numeric_dialog_business_div_aot.jpg)
