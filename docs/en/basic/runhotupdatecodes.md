# Load and use hot update code

## Load assembly

According to your project resource management method, get the bytes data of the hot update dll. Then call Assembly.Load(byte[] assemblyData) directly. code like
as follows:

```csharp
     byte[] assemblyData = xxxx; // Get hot update dll data from your resource management system
     Assembly ass = Assembly. Load(assemblyData);
```

If there are multiple hot update dlls, please be sure to **load them in the order of dependencies**, and load the dependent assembly first.

After loading the hot update dll, there are many ways to run the hot update code, and these techniques are exactly the same as when hot update is not considered.

## Run the hot update function directly through reflection

Suppose there is a HotUpdateEntry class in the hot update set, the main entry is a static Main function, and the code is similar:

```csharp
class HotUpdateEntry
{
     public static void Main()
     {
         UnityEngine.Debug.Log("hello, HybridCLR");
     }
}
```


You run it like this:

```csharp
     // ass is the hot update assembly returned by Assembly.Load.
     // You can also find it through code similar to the following after Assembly.Load.
     // Assembly ass = AppDomain.CurrentDomain.GetAssemblies().First(assembly => assembly.GetName().Name == "Your-HotUpdate-Assembly");
     Type entryType = ass. GetType("HotUpdateEntry");
     MethodInfo method = entryType. GetMethod("Main");
     method.Invoke(null, null);
```

## Run after creating a Delegate through reflection

```csharp
     Type entryType = ass. GetType("HotUpdateEntry");
     MethodInfo method = entryType. GetMethod("Main");
     Action mainFunc = (Action)Delegate.CreateDelegate(typeof(Action), method);
     mainFunc();
```

## After creating the object through reflection, call the interface function

Suppose there is such an interface in AOT

```csharp
public interface IEntry
{
     void Start();
}
```

Such a class is implemented in hot update

```csharp
class HotUpdateEntry : IEntry
{
     public void Start()
     {
         UnityEngine.Debug.Log("hello, HybridCLR");
     }
}
```

You run it like this:

```csharp
     Type entryType = ass. GetType("HotUpdateEntry");
     IEntry entry = (IEntry) Activator. CreateInstance(entryType);
     entry. Start();
```

## Run script code through dynamic AddComponent

Suppose there is such code in hot update:

```csharp
class Rotate : MonoBehaviour
{
     void Update()
     {

     }
}
```

You run code like this in AOT:

```csharp
     Type type = ass. GetType("Rotate");
     GameObject go = new GameObject("Test");
     go. AddComponent(type);
```


## Restore the mounted hot update script from the prefab or scene packaged into assetbundle by initializing

Assuming that there is such an entry script in the hot update, this script is hung on `HotUpdatePrefab.prefab`.

```csharp

public class HotUpdateMain : MonoBehaviour
{
     void Start()
     {
         Debug. Log("hello, HybridCLR");
     }
}

```

You can run hot update logic by instantiating this prefab.

```csharp
         AssetBundle prefabAb = xxxxx; // Get the AssetBundle where HotUpdatePrefab.prefab is located
         GameObject testPrefab = Instantiate(prefabAb.LoadAsset<GameObject>("HotUpdatePrefab.prefab"));
```

This method does not require any reflection, and is the same as the original startup process. It is recommended to use this method to initialize the hot update entry code!