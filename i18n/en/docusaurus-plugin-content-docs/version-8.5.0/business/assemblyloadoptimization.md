# Assembly::Load Loading Optimization

The commercial version optimizes Assembly::Load loading time from several aspects, ultimately reducing Assembly::Load time to **20%** of the original.

- Optimized InterpreterImage::InitRuntimeMetadatas code
- Lazily initialized some time-consuming metadata that doesn't need immediate initialization

