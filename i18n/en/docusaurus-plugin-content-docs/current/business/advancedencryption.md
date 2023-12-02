# Advanced code hardening

Advanced code hardening uses custom assembly structures and custom instructions to greatly improve App security.

## Principle


Advanced code hardening technology improves code security in the following aspects:

- Use custom randomizable assembly structures. The assembly structure definition itself can be randomized by generating corresponding proprietary code
To analyze the corresponding structure, greatly improving the difficulty of cracking
- Custom transformation of all metadata structures so that they can no longer be read by regular IL decompilation tools (such as ILSpy)
- Irreversibly convert IL instructions into custom register instruction sets in advance, and the instruction set itself can also be randomized


## Other advantages

- Since it has been converted offline to a custom register instruction set in advance, instruction translation is faster
- Cooperate with advanced instruction optimization technology to maximize execution efficiency
