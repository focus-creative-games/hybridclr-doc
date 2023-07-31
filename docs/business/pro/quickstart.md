# 快速上手

与社区版本的[快速上手](../../beginner/quickstart.md)几乎相同，本文档只介绍不同之处。

## 安装

- 将hyridclr_unity解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`libil2cpp-{version}.7z`，
- 打开 `HybridCLR/Installer`，开启`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装

![installer](/img/hybridclr/ultimate-installer.jpg)

## 开启增量式GC


`Player Settings`中启用 `use incremental GC` 选项即可， 不需要对HybridCLR进行任何设置。

:::caution

目前增量式GC处理alpha阶段，建议已经上线或者快上线的项目不要开启这个选项。
:::

## 开启完全泛型共享

- 2020版本不支持完全泛型共享
- 2021版本需要设置 IL2CPP Code Generation选项为`faster(smaller)`
- 2022版本默认开启完全泛型共享，无法关闭。如果设置 IL2CPP Code Generation选项为`faster(smaller)`则能进一步减少包体。

## 开启和关闭初级指令优化

默认已经开启初级优化。可以通过 `RuntimeApi.EnableTransformOptimization`函数主动控制开启或者关闭这个特性。


