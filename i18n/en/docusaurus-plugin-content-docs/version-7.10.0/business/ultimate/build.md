# Building and Hot Updating

## Building the Game

- Run `HybridCLR/Generate/All`.
- Export the project or build directly from the `Build Settings`.
- Create an AOT snapshot and add the AOT snapshot directory to version control.
- Add the `MetaVersions` directory from the AOT snapshot to the `StreamingAssets` directory, and package it with the game (optional but highly recommended).

## Creating AOT Snapshots

:::warning
The DLLs in the AOT snapshot must match the binary code of the main package exactly. Please create the AOT snapshot **after** exporting the project or building the main package!

:::

The process is as follows:

- Create the base AOT snapshot file.
- Generate meta versions for the DHE DLLs in the base AOT snapshot.
- Add the final AOT snapshot directory to version control.

### Creating the Base AOT Snapshot File

Call `MetaVersionWorkflow.CreateAotSnapshot(BuildTarget target, string outputSnapshotDir)` to create the base snapshot file.

`CreateAotSnapshot` performs the following tasks:

- Copies all AOT and DHE DLLs.
- Copies the inject rule files to the `InjectRules` directory.
- Creates a `manifest.json` file, which records the list of all DHE assemblies.

The base snapshot directory structure is as follows:

```txt
  AotSnapshot
  ├── *.dll
  ├── InjectRules
        ├── rule1.xml
        ├── rule2.xml
  └── manifest.json
```

### Generating Meta Version Files for DHE DLLs in the Base AOT Snapshot

Call `MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(string prevSnapshotDir, string curSnapshotDir)` to generate meta version files for the DHE DLLs in the snapshot.

The rules for the `prevSnapshotDir` parameter in `MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles` are as follows:

- If this is the first AotSnapshot (i.e., there is no older AotSnapshot), `prevSnapshotDir` should be `null`.
- If the project uses a single main package mode (i.e., only one main package is valid at a time and a new main package invalidates the old one), `prevSnapshotDir` should be `null`.
- If the project uses a multi-main package mode (i.e., old main packages remain valid after a new one is released), `prevSnapshotDir` should point to the AotSnapshot directory of the previously released main package.

`GenerateAotSnapshotMetaVersionFiles` generates the following files:

- Meta version and spec files, which are placed in the `MetaVersions` directory.
- A `signature-mapper.json` file.

The directory structure before generation is as follows:

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

After generation, the `MetaVersions` directory and `signature-mapper.json` file are added. The final directory structure is as follows:

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

### Including AOT Snapshot Meta Version Files in the Main Package (Optional but Highly Recommended)

The parameter `originalMetaVersionFileBytes` in `RuntimeApi::LoadDifferentialHybridAssemblyWithMetaVersion` is the content of the meta version file corresponding to the DHE assembly in the AOT snapshot. This meta version file is different for each main package and is fully determined during the main package build. It is small in size and highly recommended to be included with the main package.

### Multi-Platform Considerations

Most games are released on multiple platforms. Since there are significant differences in the main package AOT DLLs between platforms, we **strongly recommend** maintaining separate AotSnapshot trees for each platform. The directory structure should be similar to the following:

```txt
  Snapshots
  ├── PreAotSnapshotDir-StandaloneWindows64
  ├── CurrentAotSnapshotDir-StandaloneWindows64
  ├── PreAotSnapshotDir-Android64
  ├── CurrentAotSnapshotDir-Android64
  ├── PreAotSnapshotDir-iOS
  ├── CurrentAotSnapshotDir-iOS
```

For example, when calculating the meta version for a newly released Win64 main package, use the snapshot directory of the previously released Win64 main package and the new main package's snapshot to compute the meta version for the new main package.

### Version Control for Snapshots

The directory structure mentioned in the previous section is not convenient for version control. A more suitable directory structure for version control is as follows:

```txt
  Snapshots
  ├── AotSnapshotDir-StandaloneWindows64
  ├── AotSnapshotDir-Android64
  ├── AotSnapshotDir-iOS
```

The snapshot update process is as follows:

1. Create a `CurrentAotSnapshotDir-{buildTarget}` directory for the latest main package.
2. Compare `CurrentAotSnapshotDir-{buildTarget}` with `AotSnapshotDir-{buildTarget}` to generate the meta version files for `CurrentAotSnapshotDir-{buildTarget}`.
3. Replace `AotSnapshotDir-{buildTarget}` with `CurrentAotSnapshotDir-{buildTarget}`.
4. Commit `AotSnapshotDir-{buildTarget}` to the repository.

## Publishing Hot Updates

The flagship version is a superset of the professional and community versions, supporting both pure interpreted assemblies and DHE assemblies, which can coexist. Since DHE assemblies are compiled into AOT, they cannot depend on ordinary pure interpreted hot update assemblies; otherwise, the main package build will fail due to compilation errors. However, ordinary hot update assemblies can depend on DHE assemblies, and DHE assemblies can also depend on each other.

The configuration and publishing process for ordinary hot update assemblies is identical to that of the community version and will not be repeated here. Only the hot update process for DHE assemblies is described below.

- Use `HybridCLR/CompileDll/ActivedBuildTarget` to generate hot update DLLs.
- Generate meta version files for the hot update assemblies.
- Add the latest hot update DLLs and meta version files to the hot update resource management system.

### Generating Meta Version Files for Hot Update Assemblies

Call `MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(string aotSnapshotDir, string hotUpdateSnapshotDir)` to generate meta version files for the hot update assemblies.

Here, `aotSnapshotDir` is the latest `AotSnapshot-{buildTarget}` directory, and `hotUpdateSnapshotDir` is the directory containing the latest hot update assemblies.

After calling this function, meta version files for the DHE assemblies will be generated in the `{hotUpdateSnapshotDir}/MetaVersions` directory. The directory structure is similar to the following:

```txt
  HotUpdateSnapshot
  ├── *.dll
  ├── MetaVersions
    ├── *.mv.bytes
    ├── *.mv.spec
    ├── *.mv.diff.spec
```

Example code:

```csharp
        public static void GenerateHotUpdateMetaVersionFiles(BuildTarget target)
        {
            var latestSnapshotSolutionDir = GetAOTAssemblySnapshotDir(target);
            var newHotUpdateSolutionDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
            MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(latestSnapshotSolutionDir, newHotUpdateSolutionDir);
        }
```

The `*.mv.spec` file is a human-readable version of `*.mv.bytes`, while the `*.mv.diff.spec` file records the metadata changes in `*.mv.spec`. These two types of files are only used for debugging and are not needed during runtime. It is recommended to add them to the repository but not to the hot update resources, as they serve no purpose there.

## Other Considerations

### UserEditorSettings.development Option

The `development` option used when publishing the main package must be consistent with that used when publishing hot updates. In other words, the `development` option must be the same when creating the AotSnapshot and compiling the hot update DLLs. This is because the `development` option significantly affects the final compiled DLLs. Inconsistent `development` parameters will lead to significant changes in the meta version!

### Changes in HybridCLRSettings.differentialHybridAssemblies List

The function `MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(string prevSnapshotDir, string curSnapshotDir)` requires that the DHE assembly lists in the `prevSnapshotDir` and `curSnapshotDir` snapshots be identical.

If a new DHE assembly is added or an existing one is removed from a certain main package onwards, the meta version generation will fail. The solution is to create a new version tree for the AotSnapshot starting from this main package, such as `AotSnapshot-{buildTarget}-v2`.
