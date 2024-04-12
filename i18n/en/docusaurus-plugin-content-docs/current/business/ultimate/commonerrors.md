# Frequently Asked Questions

## ExecutionEngineException: Could not run the type initializer for origin DHE type 'xxx'

The reason is that the original AOT type replaced by DHE was accidentally created. After using DHE, you cannot create the original types corresponding to the types in the DHE assembly. There are several reasons for this error:

- DHE code is executed before loading the DHE assembly.
- Hot-reloaded dhe dll does not match the dhao file, resulting in incorrectly executing original AOT code that should not be executed, creating original AOT types. Only versions 4.5.7 and earlier that do not strictly verify the version of the dll will have this error.
- When throwing an exception or printing logs, accessing the original functions of the DHE assembly accidentally during the process of obtaining the function call stack frame. This bug exists in version 4.5.8 and earlier.
- `script debugging` build option is enabled.
