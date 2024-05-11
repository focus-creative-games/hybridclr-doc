# 函数注入策略

 为了避免脏函数传染，默认会在所有函数头部注入一小段检查跳转代码。这个注入代码对短函数性能和最终生成的代码长度的影响较为显著（增加30%左右代码）。
 虽然绝大多数情况下注入代码对整体性能影响微不足道，但罕见的特殊场合下，会观察到这个性能下降现象。
 自v4.5.9版本起，允许自定义配置这个注入行为。

 ## 脏函数传染

 我们称变化的函数为脏函数。如果未对il2cpp生成的原始代码作任何修改，对于非虚函数调用，存在脏函数链式传染的问题。例如：A函数调用B函数，
 B函数调用C函数，如果C函数发生变化，则A，B，C都被会标记为脏函数。在实践中，一些常用的基础函数发生变化，有可能导致巨量的代码被标记为脏函数，
 这显然不是我们期望的。

 ```csharp
 class Foo
 {

    public static void A()
    {
        B();
    }

    public static void B()
    {
        C();
    }

    public static void C()
    {
        // 旧代码为 new object();
        // 修改后，导致A、B、C都被标记为脏函数
        new List<int>();
    }
 }

 ```

 ## 间接函数优化技术

 我们使用间接函数优化的技术来克服这个问题。il2cpp生成代码时，在DHE函数的头部插入一段检查代码，如果函数未发生变化则继续执行，否则跳转到解释函数执行。


以下面csharp代码为例：

```csharp
    public class IndirectChangedNotInjectMethod
    {
        public static int ChangeMethod10(int x)
        {
            return ChangeMethod0(x);
        }

        public static int ChangeMethod100(int x)
        {
            return ChangeMethod10(x);
        }
    }

```

`ChangeMethod100`函数生成的原始il2cpp代码如下：

```cpp
 IL2CPP_EXTERN_C IL2CPP_METHOD_ATTR int32_t IndirectChangedNotInjectMethod_ChangeMethod100_mFE65234D8ACE343677581C1D96E05E9DFC7C2D1A (int32_t ___0_x, const RuntimeMethod* method) 
{
	{
		// return ChangeMethod10(x);
		int32_t L_0 = ___0_x;
		int32_t L_1;
		L_1 = IndirectChangedNotInjectMethod_ChangeMethod10_m1CFE86C6F8D9E11116BA0F8CACB72A31D4F8401E(L_0, NULL);
		return L_1;
	}
}
```

插入检查跳转代码后，变成：

 ```cpp
 
 IL2CPP_EXTERN_C IL2CPP_METHOD_ATTR int32_t IndirectChangedNotInjectMethod_ChangeMethod100_mFE65234D8ACE343677581C1D96E05E9DFC7C2D1A (int32_t ___0_x, const RuntimeMethod* method) 
{
	static bool s_Il2CppMethodInitialized;
	if (!s_Il2CppMethodInitialized)
	{
		il2cpp_codegen_initialize_runtime_metadata((uintptr_t*)&IndirectChangedNotInjectMethod_ChangeMethod100_mFE65234D8ACE343677581C1D96E05E9DFC7C2D1A_RuntimeMethod_var);
		s_Il2CppMethodInitialized = true;
	}
	method = IndirectChangedNotInjectMethod_ChangeMethod100_mFE65234D8ACE343677581C1D96E05E9DFC7C2D1A_RuntimeMethod_var;
	if (method->isInterpterImpl)
	{
		typedef int32_t (*RedirectFunc)(int32_t, const RuntimeMethod*);
		return ((RedirectFunc)method->methodPointerCallByInterp)(___0_x, method);
	}
	{
		// return ChangeMethod10(x);
		int32_t L_0 = ___0_x;
		int32_t L_1;
		L_1 = IndirectChangedNotInjectMethod_ChangeMethod10_m1CFE86C6F8D9E11116BA0F8CACB72A31D4F8401E(L_0, NULL);
		return L_1;
	}
}
 
 ```

 注入代码包含以下内容：

 - 头部的元数据初始块增加了当前函数对应的元数据的初始化代码。如果函数原来没有任何需要初始化的元数据，则新增整个元数据初始代码块
 - 新增一个分支检查代码。如果当前函数被替换为解释执行，则跳转到解释执行

对于大多数情况，注入代码只多了一次额外检查`if (method->isInterpterImpl)`，对整体性能影响可忽略不计。但对于短函数（如 `int GetValue() { return value; }`），
由于短函数本身代码简短，往往没有需要初始化的元数据，导致引入了两次额外检查，并有可能阻止了函数inline，造成可观测的性能下降（10%甚至更多）和显著的代码膨胀（增加了两块代码）。

即使不是短函数，注入代码导致DHE程序集生成的代码文件整体大小增加了30%，这个对包体影响不可忽视。

其实很多短函数并不会发生变化，注入代码是不必要的，避免注入可以显著提升它们的性能，也能一定程度减少最终生成的cpp代码大小。为此我们引入了注入策略文件来配置这个行为。

## 注入策略文件

我们通过配置部分或者全部函数（慎用，不推荐！）不注入来优化间接函数优化带来的性能下降和代码膨胀问题。函数注入策略(InjectRules)文件用于
实现这个目的。

:::tip
即使某个函数被标记为不注入，后续热更新中修改了此函数，并不会导致运行出错或者执行了旧逻辑，只会导致脏函数传染问题，即所有直接调用了此函数的函数都会被标记为脏函数。
:::

### HybridCLR Settings设置

在 `HybridCLR Settings`中`InjectRuleFiles`字段中填写注入策略文件路径，文件的相对路径为项目根目录（如`Assets/InjectRules/DefaultInjectRules.xml`）。

允许提供0-N个配置策略文件。如果没有任何配置策略文件，则默认对所有DHE程序集的函数注入。

### 配置规则

配置语法与link.xml非常相似。对于某个函数，如果匹配了多个规则，则以最后一条规则为准。

一个典型的注入策略文件如下：

```xml
<rules>
    <assembly fullname="*">
        <type fullname="*">
            <property name="*"/> 所有属性都不注入
        </type>
    </assembly>
	<assembly fullname="AssemblyA">
		<type fullname="Type1">
			<method name="*"/>
		</type>
		<type fullname="Type2">
			<property name="Age*"/>
			<property name="Age_3" mode="proxy"/>
			<property name="Count" mode="none"/>
			<property signature="System.String Name"/>
			<method name="Run*"/>
			<method name="Run_3" mode="proxy"/>
			<method name="Foo"/>
			<method signature="System.Int32 Sum(System.Int32,System.Int32)"/>
			<method signature="System.Int32 Sum2(System.Int32,System.Int32)"/>
			<event name="OnEvent*"/>
			<event name="OnEvent_3" mode="proxy"/>
			<event name="OnHello"/>
		</type>
	</assembly>
	<assembly fullname="AssemblyB">
		<type fullname="*">
			<method name="*"/>
		</type>
    </assembly>
</rules>
```

#### rules

最顶层tag为rules，rules下可以包含0-n个assembly规则。

|名称|类型|可空|描述|
|-|-|-|-|
|assembly|子元素|否|程序集规则|

#### assembly

配置针对某个或者一类程序集的规则。

|名称|类型|可空|描述|
|-|-|-|-|
|fullname|属性|否|程序集名称，不含'.dll'后缀。支持通配符，如'*'、'Unity.*'、'MyCustom*'之类|
|type|子元素|是|类型规则。可以包含0-N个|

#### type

配置针对某个或某一类类型的注入规则。注意，支持泛型原始类型的注入规则，但不支持配置泛型实例类的注入规则。例如可以配置 **List\`1** 的注入规则，
但不能配置**List&lt;int&gt;**的注入规则。

- 如果某个函数满足多条规则，则以最后一条规则为准
- property被当成 `get_{name}`和`set_{name}`两条函数，因此`int Count`也能被`&lt;method name="get_Count"&gt;`匹配

|名称|类型|可空|描述|
|-|-|-|-|
|fullname|属性|否|类型全名称。支持通配符，如'*'、'Unity.*'、'MyCustom.*.TestType'之类|
|method|子元素|是|函数规则|
|property|子元素|是|属性规则|
|event|子元素|是|事件规则|

#### method

配置函数注入规则。

|名称|类型|可空|描述|
|-|-|-|-|
|name|属性|否|函数名。支持通配符，如'*'、'Run*'之类|
|signature|属性|是|函数签名。支持通配符，如'*'、'System.Int32 *(System.Int32)'|
|mode|子元素|是|注入类型，有效值为'none'或'proxy'。如果不填或者为空则取'none'|

#### property

配置属性注入规则。注意，属性被当成 `get_{name}`和`set_{name}`两条函数，因此`int Count`的getter函数`get_Count`也能被`&lt;method name="get_Count"&gt;`匹配。

|名称|类型|可空|描述|
|-|-|-|-|
|name|属性|否|函数名。支持通配符，如'*'、'Run*'之类|
|signature|属性|是|函数签名。支持通配符，如'*'、'System.Int32 \*'|
|mode|子元素|是|注入类型，有效值为'none'或'proxy'。如果不填或者为空则取'none'|

#### event

配置事件注入规则。注意，事件被当成`add_{name}`和`remove_{name}`两条函数，因此`Action OnDone`的add函数`add_OnDone`也能被`&lt;method name="add_OnDone"&gt;`匹配。

|名称|类型|可空|描述|
|-|-|-|-|
|name|属性|否|函数名。支持通配符，如'*'、'Run*'之类|
|signature|属性|是|函数签名。支持通配符，如'*'、'Action&lt;System.Int32&gt; On\*'|
|mode|子元素|是|注入类型，有效值为'none'或'proxy'。如果不填或者为空则取'none'|

## 代码生成注入规则

手动添加注入规则有可能是一件比较繁琐的事情，当按名字通配不能满足需求时，例如当你想对指令数小于10的短函数不注入时，代码生成相应的注入规则可以极大简化
构造注入规则的工作量。

代码实现生成注入规则不复杂，大致就是遍历每个DHE程序集，如果函数满足某个规则，则添加相应的注入规则。示例代码如下：

```csharp

public static void GenerateInjectRule(List<string> dheAssemblyNames, string outputInjectRuleFile)
{
	int minInjectMethodInstructions = 10;

	foreach (string dheDllPath in dheAssemblyNames)
	{
		using (var dheMod = ModuleDefMD.Load(dheDllPath))
		{
			// 添加注入规则  <assembly fullname="{dheMod.Assembly.Name}" />
			for (uint i = 1, n = dheMod.Metadata.TablesStream.MethodTable.Rows; i <= n; i++)
			{
				MethodDef methodDef = dheMod.ResolveMethod(i);
				if (methodDef.HasBody && methodDef.Body.Instructions.Count < minInjectMethodInstructions)
				{
					// 添加注入规则
					// <type name="{methodDef.DeclaringType.Name}">
					// <method name="{methodDef.Name}" />
					// </type>
				}
			}
		}
	}
}

```

### 构建工作流相关

注入策略文件需要与构建的主包一致，既每个独立发布的主包都必须备份当时所用的注入策略文件。就如每次生成dhao文件时需要使用构建主包时生成的AOT dll,
生成dhao文件时必须使用构建主包时备份的注入策略文件。如果使用了错误注入策略文件，会导致生成错误dhao文件，这有可能会导致运行了错误的逻辑甚至崩溃！
