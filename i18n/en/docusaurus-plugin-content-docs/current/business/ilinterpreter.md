# IL interpreter

Interpreter that directly executes raw IL instructions.

## introduce

The register instruction interpreter provided by hybridclr converts the original IL instruction into a unique register instruction before execution, and then interprets and executes it. There is not only the overhead of conversion instructions,
The converted instructions also take up a lot of memory. For most dlls, the converted register instructions will occupy approximately 0.9-1.5 times the dll size memory after full operation. This is for WebGL
For the platform, it is an expense that cannot be ignored.

We implement an interpreter that directly interprets and executes the original IL instructions. Although it will significantly reduce the execution performance, it saves memory. In some situations where memory is tight, it has certain practical significance.

## advantage

- No instruction conversion required before execution, faster startup
- No need to convert to register instructions, saving memory
- Some useful execution strategies can be implemented, such as switching to register instruction execution mode after executing 10 times
