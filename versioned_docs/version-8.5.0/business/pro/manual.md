# 手册

## 安装

- 将hybridclr_unity解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`il2cpp_plus-{version}.zip`
- 解压 `hybridclr.zip`
- 将`hybridclr.zip`解压后的hybridclr目录放到`il2cpp-{version}.zip`解压后的libil2cpp目录下
- 打开 `HybridCLR/Installer`，开启`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装

![installer](/img/hybridclr/ultimate-installer.jpg)

## 使用

- 开启完全泛型共享参见 [完全泛型共享](../fullgenericsharing)
- 代码加密参见 [代码加固](../basicencryption)
- 元数据优化参见 [元数据优化](../metadataoptimization)
- 其他用法与社区版本完全相同