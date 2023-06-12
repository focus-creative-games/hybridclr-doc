# HybridCLR源码结构及调试

## HybridCLR模块介绍

HybridCLR实现了以下功能：

- c++实现的dll解析库
- 元数据注册。由于il2cpp是静态AOT，原始代码并不支持动态注册，因为做了少量修改（几百行）
- 指令集转换。将原始IL指令转成更高效的寄存器指令
- 寄存器解释器。实现了一个高效的解释器。

目录结构上，与之对应：

- HybridCLR 自身源码
  - interpreter 解释器模块
  - metadata 元数据解析与注册模块
  - transform 指令集转换模块
- 对il2cpp源码的小幅修改。HybridCLR对il2cpp源码修改主要为支持动态注册元数据。大多数地方只是插入了hook处理，并未修改原始实现。例如:

```cpp
const char* il2cpp::vm::GlobalMetadata::GetStringFromIndex(StringIndex index)
{
    // ==={{ hybridclr
    if (hybridclr::metadata::IsInterpreterIndex(index))
    {
        return hybridclr::metadata::MetadataModule::GetStringFromEncodeIndex(index);
    }
    // ===}} hybridclr

    IL2CPP_ASSERT(index <= s_GlobalMetadataHeader->stringCount);
    const char* strings = ((const char*)s_GlobalMetadata + s_GlobalMetadataHeader->stringOffset) + index;
    return strings;
}
```

### transform 实现简介

?> 核心代码在 `hybridclr/transform/Transform.cpp`中`HiTransform::Transform`函数。

跟常规的指令树分析非常相似。分为几部分

- BasicBlock划分。将原始IL指令切分为多个BasicBlock，每个BasicBlock不包含任何跳转函数。这么做可以比较高效地避免意外的跨跳块的指令合并
- 模拟执行所有逻辑分支，包括跳转和异常分支，将每个IL指令转换为对应寄存器指令。
- 指令优化（待做）。预计于下个月版本开始开发。届时大多数指令可以获得100-300%的性能提升。

### interpreter 实现简介

?> 核心代码在`hybridclr/interpreter/Interpreter_Execute.cpp`中`Interpreter::Execute`函数。

比较直接，就是一个巨大的switch语句，解释执行指令。

## 调试

HybridCLR解释器核心工作包括两部分：

- 指令集转换。将基于栈的IL指令转换为基于寄存器的版本。在 HybridCLR/transform/transform.cpp 的 HiTransform::Transform函数。
- 寄存器指令的解释执行。在 HybridCLR/interpreter/interpreter_Execute.cpp的 Interpreter::Execute函数。

只要断点到这两个函数，就很容易逐步跟踪IL函数的转换转换到解决执行的整个流程。

### PC, MAC创建调试工程

- `Project Settings`设置
  - 修改 `C++ Compiler Configuration`为Debug。
- `Building Settings`中选中 "Create VisualStudio Solution"。

Build完成后，即产生一个可调试的工程。想了解更多，可参考[Unity官方文档](https://docs.unity3d.com/2020.3/Documentation/Manual/windowsstore-debugging-il2cpp.html)

### Android 创建调试工程

- `Project Settings`设置
  - 修改 `C++ Compiler Configuration`为Debug。
- `Building Settings`选中`Export Project`。
- Build完成后，使用Android Studio打开工程。
- 假设打包输出路径为build_android，在Android Studio中选择 Build->Make Module 'build_android.unityLibrary'，编译unityLibrary，等待编译完成
- 选择`Run->Edit Configurations...`，按下图所示进行设置。

![android studio debug](../img/hybridclr/android_studio_debug.png)
- 正常debug即可。
