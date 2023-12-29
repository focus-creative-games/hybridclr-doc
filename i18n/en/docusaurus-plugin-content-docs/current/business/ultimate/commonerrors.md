# Common Errors

## ExecutionEngineException: Could not run the type initializer for origin DHE type 'xxx'

The reason is that the original AOT type was accidentally created which was replaced by DHE. After using DHE, you can no longer create primitive types corresponding to types in DHE assemblies. There are several reasons for this error:

- The code in the DHE assembly was executed before the DHE assembly was loaded.
- The hot update dhe dll does not match the dhao file, causing the original AOT code that should not be executed to be executed incorrectly, creating the original AOT type. Only versions 4.5.7 and earlier that do not strictly verify dll will have this error
- When an exception is thrown or a log is printed, the original function of the DHE assembly is accidentally accessed during the process of obtaining the function frame stack. 4.5.8 and earlier versions have this bug
- Enabled `script debugging` build parameters
