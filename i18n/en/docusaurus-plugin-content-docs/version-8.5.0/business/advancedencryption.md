# Advanced Code Hardening

Advanced code hardening uses custom assembly structures and custom instructions to greatly improve App security.

## Principle

Advanced code hardening technology improves code security from the following aspects:

- Uses custom randomizable assembly structures. The assembly structure definition itself can be randomized, by generating corresponding proprietary code to parse the corresponding structures, greatly increasing the difficulty of cracking
- Performs custom transformation on all metadata structures, making them unreadable by conventional IL decompilation tools (such as ILSpy)
- Pre-converts IL instructions irreversibly to custom register instruction sets, and the instruction set itself can also be randomized

## Other Advantages

- Removes unnecessary fields from dll files, making files smaller
- After loading metadata, the memory occupied by dll files can be released, while also releasing memory occupied by some non-lazy loaded metadata tables. Unlike original dlls that must keep the entire dll file content in memory, this is more memory efficient
- Since it has been pre-converted offline to custom register instruction sets, instruction translation is faster
- Works with advanced instruction optimization technology to maximize execution efficiency


