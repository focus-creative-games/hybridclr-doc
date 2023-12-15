# Access Control Policy

For some platform-based applications, they may load and execute code developed by third parties. If these third-party codes are not restricted, security risks may arise.
Access control mechanisms are used to control the set of functions that these third-party code can access.

## Access policy file

We use access policy files to easily configure control information. Currently only class-level access control is supported (function-granular access control may be supported in the future), that is, if a class does not allow access,
Then you cannot call any function of that type, including class constructors (functions from the parent class can still be called if they are not in the restricted scope). A typical policy configuration file is as follows:


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


## Configuration rules

The top-level tag is AccessPolicy, which contains 0-N Rule and Target configuration items.

### Rule

Each Rule contains access control rules for multiple assemblies. Each Rule will calculate a set of types that restrict access. The final set of restricted access is the union of all Rules. That is, as long as a Rule restricts access to a certain type,
Then access to this type is ultimately not allowed.

|Attribute or element|Type|Nullable|Description|
|-|-|-|-|
|id|Attribute|No|The id of the Rule. String type, cannot be empty, must be globally unique |
|assembly|Sub-element|| For the restricted set of a single assembly, a Rule can contain 0-N assemblies. There cannot be an assembly with the same name under the same Rule, but there can be an assembly with the same name between different Rules|

### assembly

A set of restriction rules for a single assembly configures which types of access to that assembly are prohibited.

|Attribute or element|Type|Nullable|Description|
|-|-|-|-|
|fullname|property|no|assembly name. String type, cannot be empty. Assembly name does not contain '.dll' (e.g. mscorlib) |
|type|Sub-element|| Restriction rules for a single or a group of types. There can be 0-N elements|

In the same assembly, if there are multiple rules related to a certain type, the last rule that takes effect will prevail. For example:

```xml
<assembly fullname="mscorlib">
<type fullname="System.IO.*"/> disable
<type fullname="System.IO.File" access="1"/> enable
</assembly>
```

In the above example, although `<type fullname="System.IO.*"/>` prohibits access to all types under the `System.IO` namespace, including `System.IO.File`, the following
`<type fullname="System.IO.File" access="1"/>` has separately canceled the access restrictions on `System.IO.File`.

### type

Restrictive rules for one or a group of types.

|Attribute or element|Type|Nullable|Description|
|-|-|-|-|
|fullname|Attribute|No|The full name of the type or the type wildcard. If it is a type wildcard, only `*` full matching or `xx.yy.zz.*` namespace wildcarding is supported. Prefix wildcarding such as `xx.yy*` or `xx.*.yy` is not supported. Any kind of wildcard |
|access|Attribute|Yes|Whether it is accessible, the default is false. It is true when `true, yes, 1` is taken and false when `false, no, 0` is taken|


### Target

Target configures access restriction rules that are imposed on the code in the assembly.

|Attribute or element|Type|Nullable|Description|
|-|-|-|-|
|assembly|Attributes|No|The role of access restrictions is the target assembly, that is, the functions accessed by the code in the assembly must meet the access restriction rules specified in rules|
The |accessAssemblyNotInRules|property|is|whether assemblies not covered by rules can be accessed. The default is false. When `true, yes, 1` is taken, it is true, and when `false, no, 0` is taken, it is false|
|rules|Attribute|No|Rule id list, separated by `,`. The functions accessed by the code in the assembly must not be in any of the restricted sets of Rule |

## XmlAccessPolicyReader and BinaryAccessPolicyWriter

The access policy file is in xml format, which is complex to parse and requires a certain amount of overhead to load at runtime. Therefore, it is necessary to convert AccessPolicy.xml to AccessPolicy.bin file in advance when packaging, and load the AccessPolicy.bin file during runtime.

The `HybridCLR.Editor.Security.AccessPolicyUtil` class implements the ConvertXmlAccessPolicyToBinaryAccessPolicy function, which is used to convert xml format to bin format.
The sample code is as follows:

```csharp
         [MenuItem("Test/ConvertXmlAccessPolicyToBinary")]
         public static void ConvertXmlAccessPolicyToBinary()
         {
             string accessPolicyDir = Application.dataPath + "/AccessPolicy";
             AccessPolicyUtil.ConvertXmlAccessPolicyToBinaryAccessPolicy($"{accessPolicyDir}/AccessPolicy.xml",
$"{accessPolicyDir}/AccessPolicy.bytes");
         }
```

## Verify the legality of AccessPolicy configuration

In practice, it is easy to incorrectly fill in names such as `assembly.fullname` and `type.fullname`, resulting in the expected access control policy not being correctly implemented.
`HybridCLR.Editor.Security.AccessPolicyConfigValidator` is used to check the validity of AccessPolicy to avoid this error.

|Function|Description|
|-|-|
|ValidateRules|Check the legality of Rule rules|
|ValidateTargets|Check the legality of Target rules|

The sample code is as follows:

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

## Pre-verify whether the assembly meets AccessPolicy

`Assembly.Load` does not check whether there are illegal calls in the assembly when loading the assembly. During the running process, it only checks whether the calling function complies with the AccessPolicy when a function is called for the first time, which causes inconvenience.
`HybridCLR.Editor.Security.AssemblyValidator` is used to offline pre-verify whether all calls in the assembly comply with AccessPolicy.

The sample code is as follows:

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

The RuntimeApi class provides the LoadAccessPolicy function for setting access policies. This function can be called multiple times during operation to update the access policy.

The sample code is as follows:

```csharp

void LoadAccessPolicy()
{
byte[] accessPolicyData = File.ReadAllBytes($"{Application.streamingAssetsPath}/AccessPolicy.bin");
RuntimeApi.LoadAccessPolicy(accessPolicyData);
}

```
