# Assembly::Load Loading Time Optimization

The commercial version optimizes the Assembly::Load loading time from several aspects, and finally reduces the Assembly::Load time to ##20%## of the original.

- Optimize the code of InterpreterImage::InitRuntimeMetadatas
- Delayed initialization of some metadata that takes time and does not need to be initialized immediately
