# Frequently Asked Questions

## Issues with Json Serialization

When the assembly is unloaded, all type metadata is also unloaded. However, almost all commonly used serialization libraries cache reflection information about types. This means that if you use serialization libraries like Unity's JsonUtility or LitJson in your code, they will incorrectly cache reflection information. As a result, if you reload for the second (or third) time and attempt deserialization, errors will occur.

There are several solutions:

- Modify the code of these deserialization libraries to clear their reflection cache after unloading the assembly. For example, Unity's JsonUtility is natively implemented and cannot clear the cache, so you may need to switch to other Json libraries.
