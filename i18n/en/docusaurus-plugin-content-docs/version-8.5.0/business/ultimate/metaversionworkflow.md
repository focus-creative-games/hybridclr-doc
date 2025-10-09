# MetaVersion Workflow

DHE hot updates once had two workflows:

- DHAO workflow
- MetaVersion workflow

In `v7.6.0` and earlier versions, the build workflow was the DHAO workflow. The DHAO workflow uses dhao files to record which types and functions have changed. After hybridclr loads the dhe assembly, it decides whether to call the original aot function or interpret and execute the latest code when executing functions based on the change information recorded in the dhao file.

dhao is calculated by comparing the latest hot update dhe dll with the original dhe dll of the main package. Its principle is direct and simple, but the disadvantage is that if there are multiple main packages after official release, corresponding dhao files need to be generated for each main package.
When there are many main packages, this process is relatively complex and difficult to manage.

Starting from `v7.7.0`, the `MetaVersion` workflow was added. It completely solves the above shortcomings of the DHAO workflow.

## Principle

The MetaVersion workflow calculates a unique version number for each type and function in the dll. When calling `RuntimeApi.LoadDifferentialHybridAssemblyWithMetaVersion` to load DHE assemblies,
by comparing the meta version of the latest hot update assembly with the meta version of the AOT snapshot of the current main package, it can determine whether a type or function has changed.
Finally, only one meta version file needs to be calculated for each hot update DHE dll, which can be used for hot updates of all main packages.

## Basic Concepts

Before diving into the MetaVersion workflow, you need to understand several terms:

- Snapshot
- inject rule files
- meta version files
- meta spec files
- manifest.json
- signature-mapper.json

### Snapshot

Snapshot is a collection of files needed to calculate meta version files, which includes the following files:

- dll files
- inject rule files
- manifest.json
- meta version files
- meta spec files
- signature-mapper.json files

There are two types of Snapshots: AOT Snapshot and HotUpdate Snapshot.

### Inject Rule Files

By default, code is injected at the beginning of almost all DHE functions. Injected code can greatly alleviate the dirty function contamination problem, but the disadvantage is that it increases code size and brings a small amount of additional overhead. Inject Rule files are used to
customize code injection rules, allowing some functions not to be injected. For detailed documentation, see [Function Injection Strategy](./injectrules).

### manifest.json

Records information such as the DHE assembly list. When comparing and calculating meta version files of two AOT Snapshots, it checks the consistency of the DHE assembly list. Only AOT Snapshots with completely identical DHE assembly lists
can correctly calculate meta version.

### meta version files

meta version files store version information for all metadata. When loading DHE assemblies, by comparing the meta version file of the hot update assembly with the meta version file of the original DHE assembly to determine whether changes have occurred,
and then decide whether to call the original AOT function or interpret and execute the function.

meta version files use the `.mv.bytes` suffix.

### meta spec files

meta spec files are the readable version of meta version files, this file is not used during runtime. It is recommended to add it to the repository, but do not add it to the hot update resource system, as it serves no purpose!

There are two types of meta spec files:

- `*.mv.spec`. Records complete meta version information
- `*.mv.diff.spec`. Records meta version information that has version changes. Reading this file can quickly know which types and functions have changed

### signature-mapper.json files

When C# code changes (especially when adding or deleting types and functions), the tokens of the same types and functions in the generated dll are likely to change. If meta version files only record the tokens of these metadata,
then the runtime needs to spend a lot of time finding the mapping relationship between old and new tokens when loading. A better solution is to record the signature information of each token and quickly establish
the mapping relationship between old and new tokens by comparing signatures.

Since signature strings are very long, to save space and facilitate runtime comparison, signature strings are pre-mapped to unique integers. The signater-mapper.json file is used to record this mapping relationship.

signature-mapper.json is only needed when generating meta version, this file is not used during runtime. It is recommended to add this file to version control, but do not add it to the hot update resource system!

## Build and Hot Update Workflow

- Build main package
  - Export main package project or directly build main package
  - Create corresponding AOT Snapshot
  - Add the meta version file from AOT Snapshot to the main package's StreamingAssets directory (optional, but strongly recommended)
- Release hot update
  - Create HotUpdate Snapshot
  - Add the hot update dll and meta version from HotUpdate Snapshot to the hot update resource system

## AOT Snapshot

AOT Snapshot records the main package AOT information, it has several core functions:

- Records its own meta version information
- Used to calculate meta version information for subsequent versions of the main package
- Used to calculate meta version information for hot update code

The directory structure of AOT Snapshot is as follows:

```txt
  AotSnapshotDir
    ├── *.dll
    ├── InjectRules
    ├── MetaVersions
      ├── *.mv.bytes
      ├── *.mv.spec
      ├── *.mv.diff.spec
    ├── signature-mapper.json
    └── manifest.json
```

AOT Snapshot information is completely determined when building the main package, please add it to the project's version management system.

Since calling `RuntimeApi::LoadDifferentialHybridAssemblyWithMetaVersion` to load DHE assemblies requires AOT Snapshot's meta version files, it is recommended to include AOT Snapshot's
`*.mv.bytes` files with the package.

### Creating AOT Snapshot

:::warning
The dlls in AOT Snapshot must exactly match the binary code in the built main package. Make sure to create it **after exporting the project** or **Build**! Do not use AOT dlls generated by `HybridCLR/Generate/All`!
:::

The process is as follows:

- Create AOT base snapshot files
- Generate meta version for dhe dlls in the base AOT snapshot

#### Creating AOT Base Snapshot Files

Call `MetaVersionWorkflow.CreateAotSnapshot(BuildTarget target, string outputSnapshotDir)` to create snapshot base files.

CreateAotSnapshot performs the following tasks:

- Copy all AOT and DHE dlls
- Copy inject rule files to InjectRules directory
- Create manifest.json, record all DHE assembly lists

Base snapshot directory structure is as follows:

```txt
  AotSnapshot
  ├── *.dll
  ├── InjectRules
        ├──rule1.xml
        ├──rule2.xml
  └── manifest.json
```

#### Generate meta version files for dhe dlls in base AOT snapshot

Call `MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(string prevSnapshotDir, string curSnapshotDir)` to generate corresponding meta version files for dhe dlls in the snapshot.

The `prevSnapshotDir` parameter rules for `MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles`:

- If this is the first AotSnapshot, since there is no older AotSnapshot, `prevSnapshotDir` takes null.
- If the project uses single main package mode, i.e., only one valid main package at a time, and the old main package becomes invalid after releasing a new main package, then `prevSnapshotDir` takes null.
- If the project uses **multi-main package** mode, i.e., the old main package remains valid after releasing a new main package, then the `prevSnapshotDir` parameter takes the AotSnapshot directory of the most recently published main package with the same buildTarget.

GenerateAotSnapshotMetaVersionFiles generates the following files:

- meta version files. Generated to the MetaVersions directory
- signature-mapper.json file

Pre-generation directory structure is as follows:

```txt
  Snapshots
  ├── PrevAotSnapshotDir
      ├── *.dll
      ├── InjectRules
      ├── MetaVersions
        ├── *.mv.bytes
        ├── *.mv.spec
        ├── *.mv.diff.spec
      ├── signature-mapper.json
      └── manifest.json
  ├── CurrentSnapshotDir
      ├── *.dll
      ├── InjectRules
      └── manifest.json
```

After generation, MetaVersions directory and signature-mapper.json file are added, the final directory structure is as follows:

```txt
  Snapshots
  ├── PrevAotSnapshotDir
      ├── *.dll
      ├── InjectRules
      ├── MetaVersions
        ├── *.mv.bytes
        ├── *.mv.spec
        ├── *.mv.diff.spec
      ├── signature-mapper.json
      └── manifest.json
  ├── CurrentAotSnapshotDir
      ├── *.dll
      ├── InjectRules
      ├── MetaVersions (New)
        ├── *.mv.bytes
        ├── *.mv.spec
        ├── *.mv.diff.spec
      ├── signature-mapper.json (New)
      └── manifest.json
```

#### Multi-platform

Most games will be published on multiple platforms. Since the main package AOT dlls differ significantly between platforms, we **strongly recommend** maintaining separate AotSnapshot trees for each platform. The directory structure should look like this:

```txt
  Snapshots
  ├── PreAotSnapshotDir-StandaloneWindows64
  ├── CurrentAotSnapshotDir-StandaloneWindows64
  ├── PreAotSnapshotDir-Android64
  ├── CurrentAotSnapshotDir-Android64
  ├── PreAotSnapshotDir-iOS
  ├── CurrentAotSnapshotDir-iOS

```

For example, when calculating the meta version for a newly released Win64 main package, use the snapshot directory of the previously released Win64 main package and the snapshot of the new main package to calculate the meta version for this new main package.

#### Version Management

The directory structure given in the previous section `Multi-platform` is actually not convenient for version management. A directory structure suitable for version management should look like this:

```txt
  Snapshots
  ├── AotSnapshotDir-StandaloneWindows64
  ├── AotSnapshotDir-Android64
  ├── AotSnapshotDir-iOS
```

Snapshot update process is as follows:

- Create a **temporary** `CurrentAotSnapshotDir-{buildTarget}` directory for the latest main package.
- Compare `CurrentAotSnapshotDir-{buildTarget}` with `AotSnapshotDir-{buildTarget}` to calculate the meta version files for `CurrentAotSnapshotDir-{buildTarget}`.
- Replace `AotSnapshotDir-{buildTarget}` with `CurrentAotSnapshotDir-{buildTarget}`.
- Commit `AotSnapshotDir-{buildTarget}` to the repository.

## HotUpdate Snapshot

A HotUpdate Snapshot needs to be created every time a code hot update is released. Compared to AOT Snapshot, HotUpdate Snapshot only contains the following files:

- Latest hot update assembly files
- Latest DHE assembly meta version information
- signature-mapper.json

Directory structure is as follows:

```txt
  HotUpdateSnapshotDir
    ├── *.dll
    ├── MetaVersions
      ├── *.mv.bytes
      ├── *.mv.spec
      ├── *.mv.diff.spec
    ├── signature-mapper.json (New)
```

When publishing hot updates, only the hot update assembly dll files and DHE assembly meta version files are needed, add these two types of files to the hot update resource system.

### Creating HotUpdate Snapshot

Creation process:

- Use `HybridCLR/CompileDll/ActivedBuildTarget` to generate hot update dlls.
- Generate meta version files for hot update assemblies.

Call `MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(string aotSnapshotDir, string hotUpdateSnapshotDir)` to generate meta version files for hot update assemblies.
Where `aotSnapshotDir` is the latest `AotSnapshot-{buildTarget}` directory, and `hotUpdateSnapshotDir` is the latest hot update assembly directory.

After calling this function, meta version files corresponding to DHE assemblies will be generated in the `{hotUpdateSnapshotDir}/MetaVersions` directory. Directory structure is similar to:

```txt
  HotUpdateSnapshot
  ├── *.dll
  ├── MetaVersions
    ├── *.mv.bytes
    ├── *.mv.spec
    ├── *.mv.diff.spec
```

Example code is as follows:

```csharp
        public static void GenerateHotUpdateMetaVersionFiles(BuildTarget target)
        {
            var latestSnapshotSolutionDir = GetAOTAssemblySnapshotDir(target);
            var newHotUpdateSolutionDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
            MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(latestSnapshotSolutionDir, newHotUpdateSolutionDir);
        }

```

It is recommended to add `*.mv.spec` and `*.mv.diff.spec` to version management, but do not add them to the hot update resource system, because they are not needed!
