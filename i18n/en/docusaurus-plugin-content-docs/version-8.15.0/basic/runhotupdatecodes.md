# Loading and Running

## Loading Update Assemblies

Obtain the hot update DLL bytes data according to your project's asset management approach. Then directly call `Assembly.Load(byte[] assemblyData)`. **Starting from v6.4.0, loading PDB symbol files is supported**, meaning you can call `Assembly.Load(byte[] assemblyData, byte[] pdbSymbolData)` to load both assembly and debug symbols simultaneously.

When executing `Assembly.Load`, both assemblyData and pdbSymbolData are internally copied. Please don't save assemblyData and pdbSymbolData after calling, as it will cause memory waste.

Code example:

```csharp
    // Get hot update dll data from your asset management system
    byte[] assemblyData = xxxx; 

    // Assembly.Load automatically copies assemblyData internally, you can release assemblyData after calling this function, no need to save it.
    Assembly ass = Assembly.Load(assemblyData);

    // Load both dll and pdb files simultaneously
    byte[] assData2 = yyy;
    byte[] pdbData2 = zzz;
    Assembly ass2 = Assembly.Load(assData2, pdbData2);
```

If you have multiple hot update DLLs, make sure to **load them in dependency order**, loading dependent assemblies first. After loading hot update DLLs, there are multiple ways to run hot update code, and these techniques are exactly the same as when not considering hot updates.

:::tip
If Assembly.Load takes too much time and causes stuttering, you can load asynchronously in other threads.
:::

## Running Hot Update Functions Directly Through Reflection

Assuming there's a HotUpdateEntry class in the hot update assembly with a static Main function as the main entry point, code like:

```csharp
class HotUpdateEntry
{
    public static void Main()
    {
        UnityEngine.Debug.Log("hello, HybridCLR");
    }
}
```

You can run it as follows:

```csharp
    // ass is the hot update assembly returned by Assembly.Load.
    // You can also find it after Assembly.Load with code like:
    // Assembly ass = AppDomain.CurrentDomain.GetAssemblies().First(assembly => assembly.GetName().Name == "Your-HotUpdate-Assembly");
    Type entryType = ass.GetType("HotUpdateEntry");
    MethodInfo method = entryType.GetMethod("Main");
    method.Invoke(null, null);
```

## Running After Creating Delegate Through Reflection

```csharp
    Type entryType = ass.GetType("HotUpdateEntry");
    MethodInfo method = entryType.GetMethod("Main");
    Action mainFunc = (Action)Delegate.CreateDelegate(typeof(Action), method);
    mainFunc();
```

## Creating Objects Through Reflection, Then Calling Interface Functions

Assuming there's an interface in AOT like this:

```csharp
public interface IEntry
{
    void Start();
}
```

A class implemented in hot update like this:

```csharp
class HotUpdateEntry : IEntry
{
    public void Start()
    {
        UnityEngine.Debug.Log("hello, HybridCLR");
    }
}
```

You can run it as follows:

```csharp
    Type entryType = ass.GetType("HotUpdateEntry");
    IEntry entry = (IEntry)Activator.CreateInstance(entryType);
    entry.Start();
```

## Running Script Code Through Dynamic AddComponent

Assuming there's code like this in hot update:

```csharp
class Rotate : MonoBehaviour
{
    void Update()
    {

    }
}
```

You run the following code in AOT:

```csharp
    Type type = ass.GetType("Rotate");
    GameObject go = new GameObject("Test");
    go.AddComponent(type);
```

## Restoring Hot Update Scripts Mounted to Prefabs or Scenes Packaged as AssetBundles Through Initialization

Assuming there's an entry script like this in hot update, which is mounted to `HotUpdatePrefab.prefab`.

```csharp

public class HotUpdateMain : MonoBehaviour
{
    void Start()
    {
        Debug.Log("hello, HybridCLR");
    }
}

```

You can run hot update logic by instantiating this prefab.

```csharp
        AssetBundle prefabAb = xxxxx; // Get the AssetBundle containing HotUpdatePrefab.prefab
        GameObject testPrefab = Instantiate(prefabAb.LoadAsset<GameObject>("HotUpdatePrefab.prefab"));
```

This method doesn't require any reflection and follows the same startup flow as native, so it's recommended to use this approach to initialize hot update entry code!
