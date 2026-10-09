---
title: 'Common Issues'
description: 'Common issues and solutions when using the Professional Edition.'
slug: /business/pro/commonerrors
---

# Common Issues

The Professional Edition workflow is essentially the same as the Community Edition, so the
Community Edition troubleshooting docs apply as well:

- [Common Errors](../../help/commonerrors.md)
- [FAQ](../../help/faq.md)

The following issues are specific to the Professional Edition.

## With full generic sharing enabled, is supplementary metadata still needed?

No. [Full generic sharing](../fullgenericsharing.md) completely solves the problem of missing AOT
generic instantiations, so the [supplementary metadata](../../basic/aotgeneric.md) mechanism is no
longer needed. Existing supplementary metadata configuration can be kept — it causes no conflict,
but it has no effect anymore.

## How do package size and memory usage change compared to the Community Edition?

[Metadata optimization](../metadataoptimization.md) significantly reduces metadata memory usage.
For concrete numbers see [Impact on App Size](../../basic/impactonappsize.md) and
[Impact on App Memory](../../basic/impactonappmemory.md).

## How can I confirm standard interpretation optimization is active?

[Standard interpretation optimization](../basicoptimization.md) is enabled by default once the
Professional Edition package is installed; no extra setup is required. You can verify it by
comparing against the test project in the [performance report](../../basic/performance.md).

## What if I hit a problem I cannot solve myself?

The Professional Edition includes one year of technical support. Please reach us at the business
email in [Contact Us](../../other/contactme.md), including your Unity version, HybridCLR version,
target platform, and the full error stack trace.
