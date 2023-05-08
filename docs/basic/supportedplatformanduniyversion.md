---
title: 跨平台支持
date: 2022-05-25 11:50:18
permalink: /hybridclr/supported_platform/
categories:
  - HybridCLR
  - platform
tags:
  - 
author: 
  name: Code Philosophy
  link: https://github.com/focus-creative-games
---

# 支持的版本

HybridCLR由两部分构成

1. [il2cpp_plus](https://github.com/focus-creative-games/il2cpp_plus) 项目

    il2cpp_plus需要与匹配到 **unity年度版本** 级别

2. [HybridCLR仓库](https://github.com/focus-creative-games/hybridclr) HybridCLR 项目。 

    它包含了HybridCLR的核心源码，所有unity版本都共享同一份实现。

例如：

- 2020.3.20f1c1和2020.3.33f2都使用 il2cpp_plus 2020分支
- 2021.3.0f1和2021.3.5f1 都使用 il2cpp_plus 2021分支


我们只会适配LTS版本，普通版本请考虑升级。

## 版本支持说明

- 如果没有特殊版本要求，优化推荐使用2020.3.33版本。
- 2022版本尚未制作，等明年出第一个LTS版本再跟进。
- 5.x - 2018 系列不支持。


## 官方支持的版本

1. 2022 系列

    已支持2022.2.x系列，但要等待第一个LTS版本发布后再对外发布。

2. 2021 系列

    2021.3.0-最新版本。

3. 2020 系列

    2020.3.16-最新版本。推荐`>= 2020.3.26`的版本。注意，低于2020.3.26的版本需要先切到2020.3.26或更高版本中使用`HybridCLR/Installer`完成安装，再切回你的当前Unity版本。

4. 2019 系列

    2019.4.0-最新版本 。推荐使用2019.4.40版本。注意，低于2019.4.40的版本需要先切到2019.4.40中使用`HybridCLR/Installer`完成安装，再切回你的当前Unity版本。

    自3.x版本起，**移除了对2019系列的支持**。该版本的开发者请安装 hybridclr_unity 1.x或者2.x版本。

5. 5.x - 2018 系列

    不支持，也不计划支持。



# 跨平台支持

目前支持 Win(X64、X86)、Android(Arm64、Armv7)、macOS(X86、X64、Arm64)、iOS(Arm64)、WebGL、MiniGame（微信小游戏）。

**注意，自3.x版本起移除了32位的支持（但仍然支持WebGL）。有需求的开发者请使用1.x或者2.x版本。**

## Win


## macOS


## Android

## iOS


## WebGL

由于Unity自身的原因，WebGL平台只能全局安装，详细请看[安装HybridCLR](/hybridclr/install/)的全局安装部分文档。

WebGL目前打包问题较多，已知有几个

- 不能调用IO相关函数，因此你不能在link.xml中preserve整个 mscorlib或者preserve相关类和函数，也不能在代码中调用相关函数 。开发者如果发现编译出错，根据错误信息剔除一些不被支持的库，重试一次。强烈推荐先在未安装HybridCLR的情况下打包测试通过后，再接入HybridCLR，避免无法区分到底是WebGL还是HybridCLR引发的问题。

## MiniGame（微信小游戏）

问题及支持程度与WebGL平台基本相同。

不过注意：微信小游戏转换工具，默认会将IL2CPP Code Generation设置为Faster(Smaller) builds模式，如果未补充元数据，会导致无法访问AOT泛型函数。由于 Faster(smaller) 模式会严重伤害泛型函数的执行性能，即使使用补充元数据，也强烈推荐自己改微信工具源码，将BuildSettings中 `IL2CPP Code Generation` 设置为 `Faster`。

有关版本兼容性的补充说明：

- MiniGame2019和2020版本的推荐版本与HybridCLR的兼容版本有交叉，尽量直接选择那些交叉版本（如2019.4.35、2020.3.33），因为已经被项目验证过，基本不会遇到问题。
- MiniGame2021系列推荐版本为2021.2.5-2021.2.18，非HybridCLR支持的LTS版本，但这些版本已经被其他开发者验证过，也是可以正常使用HybridCLR的（可能需要少量代码调整）。如果有遇到问题，可以寻求我们的[商业技术支持](/hybridclr/price/)。
