# Access Control Policy

For some platform-type applications, they may load and execute third-party developed code. If these third-party codes are not restricted, it will bring security risks.
The access control mechanism is used to control the set of functions that these third-party codes can access.

## Access Policy File

We use access policy files to conveniently configure control information. Currently only class-level access control is supported (function-level access control may be supported in the future), that is, if a certain class is not allowed to be accessed, any function of that type cannot be called, including class constructors (functions from parent classes can still be called if they are not in the restriction range). A typical policy configuration file is as follows:

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

## Configuration Rules

The top-level tag is AccessPolicy, containing 0-N Rule and Target configuration items.

### Rule

Each Rule contains access control rules for multiple assemblies. Each Rule will calculate a set of types that restrict access, and the final set of restricted access is the union of all Rules, that is, as long as a certain Rule restricts access to a certain type, access to this type is not allowed in the end.

|Name|Type|Nullable|Description|
|-|-|-|-|
|id|attribute|No|Rule id. String type, cannot be empty, must be globally unique|
|assembly|sub-element||Restriction set for a single assembly. Rule can contain 0-N assemblies. The same Rule cannot have assemblies with the same name, but different Rules can have assemblies with the same name|

### assembly

A set of restriction rules for a single assembly, configuring which types of the assembly are prohibited from access.

|Name|Type|Nullable|Description|
|-|-|-|-|
|fullname|attribute|No|Assembly name. String type, cannot be empty. Assembly name does not include '.dll' (e.g., mscorlib)|
|type|sub-element||Restriction rules for a single type or a group of types. Can have 0-N elements|

Within the same assembly, if multiple rules appear that are related to a certain type, the last effective rule shall prevail. For example:

```xml
		<assembly fullname="mscorlib">
			<type fullname="System.IO.*"/> disable
			<type fullname="System.IO.File" access="1"/> enable
		</assembly>
```

In the above example, although `<type fullname="System.IO.*"/>` prohibits access to all types under the `System.IO` namespace, including `System.IO.File`, the subsequent `<type fullname="System.IO.File" access="1"/>` separately cancels the access restriction on `System.IO.File`.

### type

Restriction rules for one or a group of types.

|Name|Type|Nullable|Description|
|-|-|-|-|
|fullname|attribute|No|Type full name or type wildcard. When it's a type wildcard, only supports `*` full match or `xx.yy.zz.*` namespace wildcard, does not support `xx.yy*` prefix wildcard or `xx.*.yy` arbitrary wildcard. If you want to match all types with empty namespace, use `.*`|
|access|attribute|Yes|Whether accessible, default is false. When set to `true, yes, 1`, it's true; when set to `false, no, 0`, it's false|

### Target

Target configures the access restriction rules applied to code in the assembly.

|Name|Type|Nullable|Description|
|-|-|-|-|
|assembly|attribute|No|Target assembly for access restrictions, that is, functions accessed by code in this assembly must satisfy the access restriction rules specified in rules|
|accessAssemblyNotInRules|attribute|Yes|Whether assemblies not involved in rules can be accessed. Default is false, when set to `true, yes, 1`, it's true; when set to `false, no, 0`, it's false|
|rules|attribute|No|List of Rule ids, separated by `,`. Functions accessed by code in assembly must not be in the restriction set of any Rule|

## XmlAccessPolicyReader and BinaryAccessPolicyWriter

Access policy files are in xml format, which is complex to parse and has certain overhead when loaded at runtime. Therefore, it's necessary to convert AccessPolicy.xml to AccessPolicy.bin file in advance during packaging, and load the AccessPolicy.bin file at runtime.

The `HybridCLR.Editor.Security.AccessPolicyUtil` class implements the ConvertXmlAccessPolicyToBinaryAccessPolicy function, used to convert xml format to bin format.
Example code is as follows:

```csharp
        [MenuItem("Test/ConvertXmlAccessPolicyToBinary")]
        public static void ConvertXmlAccessPolicyToBinary()
        {
            string accessPolicyDir = Application.dataPath + "/AccessPolicy";
            AccessPolicyUtil.ConvertXmlAccessPolicyToBinaryAccessPolicy($"{accessPolicyDir}/AccessPolicy.xml",
				$"{accessPolicyDir}/AccessPolicy.bytes");
        }
```

## Validate AccessPolicy Configuration Validity

In practice, it's easy to incorrectly fill in names like `assembly.fullname`, `type.fullname`, etc., causing the expected access control policy to not be executed correctly.
`HybridCLR.Editor.Security.AccessPolicyConfigValidator` is used to check the validity of AccessPolicy to avoid such errors.

|Function|Description|
|-|-|
|ValidateRules|Check the validity of Rule rules|
|ValidateTargets|Check the validity of Target rules|

Example code is as follows:

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

## Pre-validate whether assembly meets AccessPolicy

`Assembly.Load` does not check whether there are illegal calls in the assembly when loading it. It only checks whether calling a function conforms to AccessPolicy when the function is called for the first time during runtime, which is inconvenient.
`HybridCLR.Editor.Security.AssemblyValidator` is used to offline pre-validate whether all calls in assembly conform to AccessPolicy.

Example code is as follows:

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

## Set access policy at runtime

The RuntimeApi class provides the LoadAccessPolicy function to set access policies. This function can be called multiple times during runtime to update access policies.

Example code is as follows:

```csharp

void LoadAccessPolicy()
{
	byte[] accessPolicyData = File.ReadAllBytes($"{Application.streamingAssetsPath}/AccessPolicy.bin");
	RuntimeApi.LoadAccessPolicy(accessPolicyData);
}

```
