# Differential Hybrid Execution

HybridCLR开创性地实现了 Differential Hybrid Execution(DHE) 差分混合执行技术。即可以对AOT dll任意增删改，会智能地让变化或者新增的类和函数以interpreter模式运行，但未改动的类和函数以AOT方式运行，让热更新的游戏逻辑的运行性能基本达到原生AOT的水平。

由于原生代码已全部在包体中，被AppStore拒审的风险大幅降低。

DHE只提供**商业化版本**，具体请见[商业化服务](/other/business.md)

## 原理

将标记为DHE的程序集也打入主包中，运行后再加载最新的热更新dll。执行过程中，调用某个DHE程序集的函数时，如果函数未发生变化，则直接调用原生的AOT实现，否则以解释方式执行最新的代码。
由于实践中两个版本往往不会修改太多代码，DHE基本上能接近原生的性能水平。

## 特性与优势

- 未变化部分代码性能与原生完全相同，相较纯解释版本提升惊人的**3-30**倍甚至更高，整体几乎达到原生性能水平。
- 可以任意变更代码，对代码基本无入侵，几乎没有特殊注意事项，使用方式跟社区版本近似。
- 工作流简单，不需要像xxxfix之类的方案那样自己标注哪些函数发生变化，由工具全部自动处理
- 对项目的改造成本比纯热更新版本更低。例如可以直接在DHE中定义extern函数，而不需要移到AOT模块。
- 高级版本包含了**解释指令优化，变化部分的大多数数值计算指令性能提升100-300%甚至更多**，进一步大幅提升性能水平。
- 原生代码已全部在包体中，被iOS拒审的风险大幅降低

## 未支持特性

- 加载DHE热更新代码前不能执行DHE对应的AOT assembly中的任何代码。意味着DHE不支持像mscorlib这种基础库的差分混合，但支持传统热更新assembly的差分热更新。
- 由于第一条的限制，不支持在DHE程序集中使用`[InitializeOnLoadMethod]`、`Script Execution Order settings`。
- 不支持DHE脚本挂载在随包资源中，包括Resources。（这条限制将来会放松或者去掉）
- 不能在DHE程序集中通过热更新新增extern函数。

## 安装

`HybridCLR/Installer`中完成安装后，手动将修改版本libil2cpp复制到`{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp`，完成安装。

## 配置

### 配置需要差分混合执行的assembly

通过`HybridCLR/Settings` 菜单打开配置对话框，将需要差分混合执行的assembly加入到 differentialHybridAssemblies (差分混合执行 dlls)。
差分混合执行assembly与普通的纯热更新assembly的工作流不一样，因为纯热更新assembly不需要打包到主工程中。因此同一个assembly不能同时加入
differentialHybridAssemblies和hotUpdateAssemlies列表。必须在执行差分混合执行assembly的任何代码之前执行`RuntimeApi::LoadDifferentialHybridAssembly`，
因此不是所有assembly都可以配置成为差分混合执行assembly，因为mscorlib这样的系统assembly运行时机很早。所幸像mscorlib这样的assembly也没有差分混合执行的需求，
而大多数游戏逻辑assembly都是在热更之后再执行的，满足差分混合执行的条件。

### 配置 差分混合执行的assembly的配置数据的导出目录

配置 HybridCLRSetting中 `differentialHybridOptionOutputDir` 字段。使用`HybridCLR/generate/DHEAssemblyOptionDatas` 会为每个差分混合assembly生成一个  `<assembly>.dhao.bytes` 文件 。

加载差分混合执行assembly需要一些配置数据。例如哪些函数发生变化是离线计算好的，这样不需要运行时判定函数是否发生变化了。配置数据在调用`RuntimeApi::LoadDifferentialHybridAssembly` 作为参数传入。

## 标记函数信息

目前已经可以自动计算变化的函数，不需要手动操作。但也支持手动使用`[Unchanged]`标注哪些函数未发生变化。

## 代码中使用

运行时，完成热更新后，对于每个混合执行 assembly，调用 `RuntimeApi::LoadDifferentialHybridAssembly` 加载热更新assembly。

!> 一定要按照assembly的依赖顺序加载 差分混合执行 assembly。

示例代码如下。

```csharp
void InitDifferentialHybridAssembly(string assemblyName)
{
    LoadImageErrCode err = RuntimeApi.LoadDifferentialHybridAssembly(GetAssemblyData(assemblyName), GetAssemblyOptionData(assemblyName));
}
```
## 打包

### Player Building 设置

- **关闭 development build 选项**，否则由于编译DHE dll使用release模式，会导致几乎所有函数都被判定为发生变化。


## 热更新



### `HybridCLR/generate/DHEAssemblyOptionDatas`

使用 `HybridCLR/generate/DHEAssemblyOptionDatas` 生成 相关配置数据文件，酌情配合实际项目的打包流程使用。

注意！由于 DHEAssemblyOptionDatas 的工作原理是对比最新的`DHE dll`与AssembliesPostIl2CppStrip目录下的aot dll的代码，离线生成变化的函数及类型信息。

!> 因此请确保AssembliesPostIl2CppStrip下的aot dll为上一次对外发布的app打包时生成的 aot dll，否则会出现计算错误！


