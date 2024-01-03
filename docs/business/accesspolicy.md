# 访问控制策略

对于一些平台型的应用，它们可能会加载和执行第三方开发的代码。如果不对这些第三方代码加以限制，会带来安全隐患。
访问控制机制用于控制这些第三方代码能访问的函数集合。

## 访问策略文件

我们使用访问策略文件来方便地配置控制信息。目前只支持类级别的访问控制（将来可能会支持函数粒度的访问控制），即如果某个类不允许访问，
则不能调用该类型的任何函数，包括类构造函数（来自父类的函数如果不在限制范围，则仍然可以调用）。一个典型的策略配置文件如下：


```xml
<AccessPolicy>

	<Rule id="DisableIO">
		<assembly fullname="mscorlib">
			<type fullname="System.IO.*"/> disable
			<type fullname="System.IO.File" access="1"/> enable
		</assembly>
	</Rule>

	<Rule id="DisableReflection">
		<assembly fullname="mscorlib">
			<type fullname="System.Reflection.*"/>
		</assembly>
	</Rule>

	<Rule id="DisableHybridCLR">
		<assembly fullname="HybridCLR.Runtime">
			<type fullname="*"/>
		</assembly>
	</Rule>

	<Target assembly="Tests2" accessAssemblyNotInRules="0" rules="DisableReflection,DisableIO,DisableHybridCLR"/>

</AccessPolicy>

```


## 配置规则

顶级tag为 AccessPolicy，包含0-N个Rule和Target两类配置项。

### Rule

每个Rule包含多个程序集的访问控制规则。每个Rule会计算出一个限制访问的类型集合，最终的限制访问的集合为所有Rule的并集，即只要某个Rule限制访问某个类型，
则最终不允许访问这个类型。

|名称|类型|可空|描述|
|-|-|-|-|
|id|属性|否|Rule的id。字符串类型，不可为空，必须全局唯一|
|assembly|子元素||针对单个程序集的限制集合，Rule下可以包含0-N个assembly，同一个Rule下不可有同名assembly,但不同Rule间可以有同名程序集|

### assembly

针对单个程序集的限制规则集合，配置了禁止访问该程序集的哪些类型。

|名称|类型|可空|描述|
|-|-|-|-|
|fullname|属性|否|程序集名。字符串类型，不可为空。程序集名不包含'.dll'（例如 mscorlib）|
|type|子元素||针对单个或者一组类型的限制规则。可以有0-N个元素|

同一个assembly内，如果出现多条规则都与某个类型相关，则以最后一条生效的规则为准。例如：

```xml
		<assembly fullname="mscorlib">
			<type fullname="System.IO.*"/> disable
			<type fullname="System.IO.File" access="1"/> enable
		</assembly>
```

上面的例子中，尽管`<type fullname="System.IO.*"/>`禁止访问`System.IO`命名空间下的所有类型，包括`System.IO.File`，但接下的
`<type fullname="System.IO.File" access="1"/>`又单独取消了对`System.IO.File`的访问限制。

### type

针对一个或者一组类型的限制规则。

|名称|类型|可空|描述|
|-|-|-|-|
|fullname|属性|否|类型全名或者类型通配符。如果为类型通配符时，只支持`*`全匹配或者`xx.yy.zz.*`命名空间通配，不支持`xx.yy*`这种前缀通配或者`xx.*.yy`这种任意通配。如果想匹配所有命名空间为空的类型，使用`.*`|
|access|属性|是|是否可访问，默认为false。当取 `true, yes, 1` 时为true，取`false, no, 0`时为false|


### Target

Target配置了程序集中代码被施加的访问限制规则。

|名称|类型|可空|描述|
|-|-|-|-|
|assembly|属性|否|访问限制的作用目标程序集，即该程序集中代码访问的函数必须满足rules中指定的访问限制规则|
|accessAssemblyNotInRules|属性|是|是否可以访问rules中未涉及的程序集。默认为false，当取 `true, yes, 1` 时为true，取`false, no, 0`时为false|
|rules|属性|否|Rule id列表，以`,`分割。assembly中代码访问的函数必须不在任何一个Rule的限制集合中|

## XmlAccessPolicyReader与BinaryAccessPolicyWriter

访问策略文件为xml格式，解析比较复杂，运行时加载有一定的开销。因此需要打包时提前将AccessPolicy.xml转为AccessPolicy.bin文件，运行时加载AccessPolicy.bin文件。

`HybridCLR.Editor.Security.AccessPolicyUtil`类实现了ConvertXmlAccessPolicyToBinaryAccessPolicy函数，用于将xml格式转换为bin格式。
示例代码如下：

```csharp
        [MenuItem("Test/ConvertXmlAccessPolicyToBinary")]
        public static void ConvertXmlAccessPolicyToBinary()
        {
            string accessPolicyDir = Application.dataPath + "/AccessPolicy";
            AccessPolicyUtil.ConvertXmlAccessPolicyToBinaryAccessPolicy($"{accessPolicyDir}/AccessPolicy.xml",
				$"{accessPolicyDir}/AccessPolicy.bytes");
        }
```

## 校验AccessPolicy配置合法性

实践中很容易错误地填写了`assembly.fullname`、`type.fullname`之类的名字，导致没有正确执行期望的访问控制策略。
`HybridCLR.Editor.Security.AccessPolicyConfigValidator` 用于检查 AccessPolicy的合法性，避免这种错误。

|函数|说明|
|-|-|
|ValidateRules|检查Rule规则的合法性|
|ValidateTargets|检查Target规则的合法性|

示例代码如下：

```csharp
	public static void ValidateAccessPolicy()
	{
		var reader = new XmlAccessPolicyReader();
		reader.LoadXmlFile("Assets/AccessPolicy/AccessPolicy.xml");
		List<string> hotUpdateDllNames = SettingsUtil.HotUpdateAssemblyNamesExcludePreserved;
		var assemblyCache = new AssemblyCache(MetaUtil.CreateHotUpdateAndAOTAssemblyResolver(EditorUserBuildSettings.activeBuildTarget, hotUpdateDllNames));
		var validator = new AccessPolicyConfigValidator(assemblyCache);

		var accessPolicy = reader.GetAccessPolicy();
		validator.ValidateRules(accessPolicy);
		validator.ValidateTargets(accessPolicy, new List<string> { "Tests2" });
	}
```

## 预校验程序集是否满足AccessPolicy

`Assembly.Load`加载程序集时不检查程序集中是否存在非法调用，运行过程中第一次调用某函数时才检查调用该函数是否符合AccessPolicy，这带来不便。
`HybridCLR.Editor.Security.AssemblyValidator`用于离线预校验assembly中所有调用是否符合AccessPolicy。

示例代码如下：

```csharp
        public static void ValidateAssembly()
        {
            var reader = new XmlAccessPolicyReader();
            reader.LoadXmlFile("Assets/AccessPolicy/AccessPolicy.xml");
            var validator = new AssemblyValidator(reader.GetAccessPolicy());
            string test2DllPath = $"{SettingsUtil.GetHotUpdateDllsOutputDirByTarget(EditorUserBuildSettings.activeBuildTarget)}/Tests2.dll";
            var mod = ModuleDefMD.Load(test2DllPath);
            validator.ValidateAssembly(mod);
        }

```

## 运行时设置访问策略

RuntimeApi类中提供了LoadAccessPolicy函数用于设置访问策略。运行过程中可以多次调用该函数更新访问策略。

示例代码如下：

```csharp

void LoadAccessPolicy()
{
	byte[] accessPolicyData = File.ReadAllBytes($"{Application.streamingAssetsPath}/AccessPolicy.bin");
	RuntimeApi.LoadAccessPolicy(accessPolicyData);
}

```
