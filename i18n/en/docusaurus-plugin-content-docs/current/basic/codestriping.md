# Code Stripping

Unity uses [Code Stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) technology to help reduce the package size of the il2cpp backend. If anti-cutting processing is not performed, since there are generally not many codes in the AOT main project, a large number of C# types and functions are
Clipping, resulting in the following exceptions when calling these clipped classes or functions during hot update:

```txt
     // missing type error
     Unity: TypeLoadException: Could not load type 'Xxx' from assembly 'yyy'

     // missing function error
     MissingMethodException: xxxx
```

## Solution

Determine which type or function is cut according to the log error log, keep this type or function in link.xml, or explicitly add calls to these classes or functions in the main project.

If you are not familiar with how to preserve this type or function in link.xml, please refer to [Code Stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html).

But this method is very troublesome after all. There are a lot of cut types in the actual project, and you perform the operation of "package-type missing-supplement-package" over and over again,
Too much time wasted. `com.code-philosophy.hybridclr` package provides a convenient menu command `HybridCLR/Generate/LinkXml`,
All AOT types and function references in the hot update project can be generated with one click.

Note that if you don't have any code referencing an assembly in your main project, even if it is kept in `link.xml`, the assembly will be completely trimmed. So for each AOT assembly to keep,
Make sure to explicitly reference one of its classes or functions in the main project code.

## AOT type and function reserved

Although the `HybridCLR/Generate/LinkXml` command of com.code-philosophy.hybridclr can intelligently scan out the AOT type you are currently referencing, it cannot predict the AOT type you will use in the future
type. Therefore, you still need to plan ahead in `Assets/link.xml` (note! Not the automatically generated link.xml) to reserve your future
types that may be used. Remember not to miss it, so as to avoid the embarrassing situation that the type used in a certain update is cut after it goes online!
