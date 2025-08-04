# Build and Hot Update

## Build Game

- Run `HybridCLR/Generate/All`
- Export project or directly Build in `Build Settings`
- Create AOT snapshot and add AOT snapshot directory to version control
- Add the MetaVersions directory from AOT snapshot to StreamingAssets directory to carry with the package (optional but strongly recommended)

## Create AOT Snapshot

:::warning
The dlls in AOT snapshot must exactly match the binary code in the built main package. Be sure to create after **exporting project** or **Build**!
:::

Process as follows:

- Create AOT base snapshot files
- Generate meta version for dhe dlls in base AOT snapshot
- Add final AOT snapshot directory to version control

### Create AOT Base Snapshot Files

Call `MetaVersionWorkflow.CreateAotSnapshot(BuildTarget target, string outputSnapshotDir)` to create snapshot base files.

CreateAotSnapshot does the following work:

- Copy all AOT and DHE dlls
- Copy inject rule files to InjectRules directory
- Create manifest.json to record all DHE assembly lists

Base snapshot directory structure as follows:

```txt
  AotSnapshot
  ├── *.dll
  ├── InjectRules
        ├──rule1.xml
        ├──rule2.xml
  └── manifest.json
```

### Generate meta version files for dhe dlls in base AOT snapshot

Call `MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(string prevSnapshotDir, string curSnapshotDir)` to generate corresponding meta version files for dhe dlls in snapshot.

Parameter rules for `prevSnapshotDir` in `MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles`:

- If it's the first AotSnapshot, since there's no older AotSnapshot, `prevSnapshotDir` takes null.
- If the project uses single main package mode, i.e., only one valid main package exists at the same time, and old main packages become invalid after releasing new main packages, then `prevSnapshotDir` takes null.
- If the project uses multiple main package mode, i.e., old main packages remain valid after releasing new main packages, then the `prevSnapshotDir` parameter takes the AotSnapshot directory of the previously released main package.

GenerateAotSnapshotMetaVersionFiles generates the following files:

- meta version and spec files. Generated to MetaVersions directory
- signature-mapper.json file

Directory structure before generation:

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

After generation, MetaVersions directory and signature-mapper.json file are added. Final directory structure:

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

### Carry AOT snapshot meta version files with package (optional but strongly recommended)

The parameter `originalMetaVersionFileBytes` of `RuntimeApi::LoadDifferentialHybridAssemblyWithMetaVersion` is the content of the corresponding meta version file in the AOT snapshot of the DHE assembly.
This meta version file is different for each main package and is completely determined when building the main package. This file is relatively small, so it's strongly recommended to carry it with the main package.

### Multi-platform

Most games release on multiple platforms. Due to significant differences in main package AOT dlls between different platforms, we **strongly recommend** maintaining separate AotSnapshot trees for each platform. Directory structure like this:

```txt
  Snapshots
  ├── PreAotSnapshotDir-StandaloneWindows64
  ├── CurrentAotSnapshotDir-StandaloneWindows64
  ├── PreAotSnapshotDir-Android64
  ├── CurrentAotSnapshotDir-Android64
  ├── PreAotSnapshotDir-iOS
  ├── CurrentAotSnapshotDir-iOS

```

For example, when calculating meta version for a newly released Win64 main package, use the snapshot directory of the previously released Win64 main package and the snapshot of the new main package to calculate the meta version for the new main package.

### Version Control of Snapshots

The directory structure given in the previous section `Multi-platform` is actually not convenient for version control. A directory structure suitable for version control should be like this:

```txt
  Snapshots
  ├── AotSnapshotDir-StandaloneWindows64
  ├── AotSnapshotDir-Android64
  ├── AotSnapshotDir-iOS
```

Snapshot update process:

- Create a `CurrentAotSnapshotDir-{buildTarget}` directory for the latest main package.
- Compare `CurrentAotSnapshotDir-{buildTarget}` with `AotSnapshotDir-{buildTarget}` to calculate meta version files for `CurrentAotSnapshotDir-{buildTarget}`.
- Replace `AotSnapshotDir-{buildTarget}` with `CurrentAotSnapshotDir-{buildTarget}`.
- Commit `AotSnapshotDir-{buildTarget}` to repository.

## Release Hot Update

The Ultimate version is a superset of Professional and community versions, supporting both community version's pure interpreted assemblies and DHE assemblies, which can coexist.

Since DHE assemblies are compiled into AOT, DHE assemblies cannot depend on ordinary pure interpreted hot update assemblies, otherwise building the main package will fail due to compilation errors. However, ordinary hot update assemblies can depend on DHE assemblies.
DHE assemblies can also depend on DHE assemblies.

The configuration and release process for ordinary hot update assemblies is exactly the same as the community version, so it won't be repeated here. Only the hot update process for DHE assemblies is introduced.

- Use `HybridCLR/CompileDll/ActivedBuildTarget` to generate hot update dlls.
- Generate meta version files for hot update assemblies.
- Add the latest hot update dlls and meta version files to the hot update resource management system.

### Generate meta version files for hot update assemblies

Call `MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(string aotSnapshotDir, string hotUpdateSnapshotDir)` to generate meta version files for hot update assemblies.
Where `aotSnapshotDir` is the latest `AotSnapshot-{buildTarget}` directory, and `hotUpdateSnapshotDir` is the latest hot update assembly directory.

After calling this function, meta version files corresponding to DHE assemblies will be generated in the `{hotUpdateSnapshotDir}/MetaVersions` directory. Directory structure similar to:

```txt
  HotUpdateSnapshot
  ├── *.dll
  ├── MetaVersions
    ├── *.mv.bytes
    ├── *.mv.spec
    ├── *.mv.diff.spec
```

Example code as follows:

```csharp
        public static void GenerateHotUpdateMetaVersionFiles(BuildTarget target)
        {
            var latestSnapshotSolutionDir = GetAOTAssemblySnapshotDir(target);
            var newHotUpdateSolutionDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
            MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(latestSnapshotSolutionDir, newHotUpdateSolutionDir);
        }

```

`*.mv.spec` is a readable version of `*.mv.bytes`, while `*.mv.diff.spec` records metadata that has version changes in `*.mv.spec`. These two types of files are only used for convenient problem tracking and are not used during runtime.
It's recommended to add them to the repository, but don't add them to hot update resources because they serve no purpose!

## Others

### UserEditorSettings.development option

The development option when releasing the main package and the development option when releasing hot updates must be consistent, i.e., the UserEditorSettings.development option must be consistent when creating AotSnapshot and compiling hot update dlls. Because development has a huge impact on the finally compiled dlls,
inconsistent development parameters will cause huge changes in calculated meta versions!

### Changes in HybridCLRSettings.differentialHybridAssemblies list

`MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(string prevSnapshotDir, string curSnapshotDir)` requires that the DHE assembly lists of prevSnapshotDir and curSnapshotDir snapshots are the same.

If DHE assemblies are added or removed from a certain main package onwards, it will cause meta version generation to fail. The solution is to create a brand new `AotSnapshot-{buildTarget}-v2` version tree starting from this main package. Directory structure similar to:

```txt
  Snapshots
  ├── AotSnapshotDir-StandaloneWindows64-v1
  ├── AotSnapshotDir-StandaloneWindows64-v2
```

- Use v1 version DHE list configuration to generate meta version files for v1 version AotSnapshot and HotUpdateSnapshot.
- Use v2 version DHE list configuration to generate meta version files for v2 version AotSnapshot and HotUpdateSnapshot.

When releasing hot updates, v1 main packages can only load v1 version HotUpdateSnapshot dlls and meta version files. v2 version main packages can only load v2 version HotUpdateSnapshot dlls and meta version files.
