# DOTS Support

:::tip

**Commercial customers need to contact us to obtain the com.unity.entities package code** and replace the corresponding package in their projects.

:::

The commercial version has modified the DOTS runtime code and HybridCLR runtime code to support most DOTS features.


## Support Status of Features

:::tip

Note that we do not separately list features like Shared Component; they are all classified under the Component feature.

:::

| Feature          | Community Edition | Professional Edition | Ultimate Edition | Hot Reload Edition |
|------------------|-------------------|----------------------|------------------|--------------------|
| Jobs             | ✔                 | ✔                    | ✔                | ✔                  |
| Managed Component|                   | ✔                    | ✔                | ✔                  |
| Unmanaged Component|                 | ✔                    | ✔                | ✔                  |
| Managed System   |                   | ✔                    | ✔                | ✔                  |
| Unmanaged System|                    | ✔                    | ✔                | ✔                  |
| Aspect           |                   | ✔                    | ✔                | ✔                  |
| IJobEntity       |                   | ✔                    | ✔                | ✔                  |
| BurstCompile     |                   |                      | ✔                |                    |
| SubScene         |                   |                      |                  |                    |

## Considerations

1. DOTS code in Professional Edition and Hot Reload Edition is executed in interpreted mode.
2. The Hot Reload Edition cannot unload assemblies containing DOTS code.
3. In the Ultimate Edition, functions marked with `[BurstCompile]` will be executed with the original Burst code if unchanged, otherwise, they will be executed in interpreted mode. **Changed Burst functions need to have the `[BurstCompile]` attribute removed, otherwise, errors will occur at runtime.**
4. Due to Unity's DOTS resource serialization mechanism not supporting the addition of new hot-updated types, SubScenes containing hot-updated components cannot be correctly restored.

## Supported Unity and DOTS Versions

Since DOTS code is constantly changing, it is currently only supported with the following version combinations:

- Unity 2021.3.0+ with com.unity.entities 0.51.1-preview.21
- Unity 2022.3.0+ with com.unity.entities 1.0.16

All commercial versions can use the above versions. For developers with special version requirements, due to the high cost of maintaining separate DOTS versions, customization will require an additional fee.
