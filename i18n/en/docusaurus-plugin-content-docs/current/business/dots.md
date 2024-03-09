# DOTS Support


The commercial version has modified the DOTS runtime code and hybridclr runtime code to support most DOTS features.


## Feature support status

:::tip

Note that we do not list features such as Shared Component separately, they are collectively classified into Component features.

:::

|Features|Community Edition|Professional Edition|Ultimate Edition|Hot Reload Edition|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component||✔|✔|✔|
|Unmanaged Component||✔|✔|✔|
|Managed System||✔|✔|✔|
|Unmanaged System||✔|✔|✔|
|Aspect||✔|✔|✔|
|IJobEntity||✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

## Precautions

1. The DOTS code of the hot update module of the professional version and hot reload version is executed in interpreted mode
2. The hot reload version cannot uninstall an assembly containing DOTS code.
3. The flagship version has marked the `[BurstCompile]` function. The original burst code will be executed before it is changed. After the change, it will be executed in interpreted mode. **The changed burst function needs to delete the [BurstCompile] attribute, otherwise an error will occur during runtime**
4. Since the serialization mechanism of Unity’s dots resources does not support the new hot update type, the SubScene of the resource containing the hot update component cannot correctly restore the Component.

## Supported Unity and DOTS versions

Since the DOTS code is constantly changing, currently only Unity 2022.3.0+ and com.unity.entities 1.0.16+ versions are supported. We are trying to support more Unity and DOTS versions.

Due to the high cost of maintaining multiple DOTS versions, developers who have special version requirements should contact us to pay for a separate order.