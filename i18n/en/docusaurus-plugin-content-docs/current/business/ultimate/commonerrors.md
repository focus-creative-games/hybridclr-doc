# Frequently Asked Questions

## ExecutionEngineException: Could not run the type initializer for origin DHE type 'xxx'

The reason is that the original AOT type replaced by DHE was accidentally created. After using DHE, you cannot create the original types corresponding to the types in the DHE assembly. There are several reasons for this error:

- DHE code is executed before loading the DHE assembly.
- Hot-reloaded dhe dll does not match the dhao file, resulting in incorrectly executing original AOT code that should not be executed, creating original AOT types. Only versions 4.5.7 and earlier that do not strictly verify the version of the dll will have this error.
- When throwing an exception or printing logs, accessing the original functions of the DHE assembly accidentally during the process of obtaining the function call stack frame. This bug exists in version 4.5.8 and earlier.
- `script debugging` build option is enabled.

## Only a small amount of code was changed, but the output log when generating DHA shows that a large number of structs and methods have changed

A small amount of code changes will generally only affect the function in which it is located. If a large number of functions change, it means that the original DHE DLL or the latest DHE DLL used when generating DHA is very different. There are several possible reasons:

- The wrong original DHE DLL or the latest DHE DLL was used
- Inconsistent development options lead to huge differences in DLLs. For example, the development option is turned on when building the main package, but the `CompileDll/activeTarget_development` command is not used when compiling the DLL. Or the development option is disabled when constructing the main package, but the `CompileDll/activeTarget_development` is used when compiling the DLL.
- The DHE assembly is a precompiled DLL. When constructing the main package, the DHE assembly is trimmed, resulting in a huge difference with the latest DHE DLL. The solution is to add `<assembly fullname="YourExternDll" preserve="all"/>` in `link.xml` to completely retain the DLL
