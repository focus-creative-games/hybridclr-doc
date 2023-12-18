# Support Unity DOTS technology

Currently, DOTS has initialized all core types such as Component and System when the system starts, resulting in errors when using custom Component and other types in the interpreter assembly.
The DOTS source code needs to be modified to support the hot update type.

The commercial version provides a solution to use DOTS technology normally in hot update modules. However, it should be noted that since the operation of Component becomes interpreted and executed, burst technology cannot be used, resulting in a significant performance drop.
The final effect is equivalent to using only the multi-threading of jobs to speed up execution.