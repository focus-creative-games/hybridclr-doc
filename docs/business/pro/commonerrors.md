---
title: '常见问题'
description: '专业版使用过程中的常见问题与解决办法。'
slug: /business/pro/commonerrors
---

# 常见问题

专业版与社区版的工作流基本一致，因此社区版的问题排查文档同样适用：

- [常见错误](../../reference/commonerrors.md)
- [FAQ](../../reference/faq.md)

以下是专业版特有的问题。

## 开启完全泛型共享后，不再需要补充元数据了吗

是的。[完全泛型共享](../fullgenericsharing.md)彻底解决了AOT泛型实例化缺失的问题，因此不需要再使用
[补充元数据](../../guide/build/aotgeneric.md)机制。原有工程中的补充元数据配置可以保留，不会产生冲突，但已不起作用。

## 包体和内存与社区版相比有什么变化

[元数据优化](../metadataoptimization.md)显著降低了元数据内存占用。具体数据参见
[包体大小影响](../../guide/performance/impactonappsize.md)与[内存占用影响](../../guide/performance/impactonappmemory.md)。

## 如何确认标准解释优化已经生效

[标准解释优化](../basicoptimization.md)在安装专业版package后默认启用，无需额外设置。可以用
[性能测试报告](../../guide/performance/performance.md)中的测试工程对比验证。

## 遇到无法自行解决的问题怎么办

专业版包含一年技术支持，请通过[联系方式](../../community/contactme.md)中的商业合作邮箱联系我们，
并附上Unity版本、HybridCLR版本、目标平台及完整的报错堆栈。
