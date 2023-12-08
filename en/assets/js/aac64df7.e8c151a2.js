"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7566],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var n=a(7294);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var d=n.createContext({}),s=function(e){var t=n.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=s(e.components);return n.createElement(d.Provider,{value:t},e.children)},A="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,i=e.originalType,d=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),A=s(a),p=l,u=A["".concat(d,".").concat(p)]||A[p]||h[p]||i;return a?n.createElement(u,o(o({ref:t},c),{},{components:a})):n.createElement(u,o({ref:t},c))}));function u(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var i=a.length,o=new Array(i);o[0]=p;var r={};for(var d in t)hasOwnProperty.call(t,d)&&(r[d]=t[d]);r.originalType=e,r[A]="string"==typeof e?e:l,o[1]=r;for(var s=2;s<i;s++)o[s]=a[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}p.displayName="MDXCreateElement"},650:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>s});var n=a(7462),l=(a(7294),a(3905));const i={},o="manual",r={unversionedId:"business/ultimate/manual",id:"business/ultimate/manual",title:"manual",description:"Install",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/ultimate/manual.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/manual",permalink:"/en/docs/business/ultimate/manual",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Get started quickly",permalink:"/en/docs/business/ultimate/quickstart"},next:{title:"\u4e13\u4e1a\u7248",permalink:"/en/docs/pro"}},d={},s=[{value:"Install",id:"install",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Configure PlayerSettings",id:"configure-playersettings",level:3},{value:"Enable incremental GC",id:"enable-incremental-gc",level:3},{value:"Enable full generic sharing",id:"enable-full-generic-sharing",level:3},{value:"Turn on and off standard command optimization",id:"turn-on-and-off-standard-command-optimization",level:2},{value:"Configure HybridCLR",id:"configure-hybridclr",level:3},{value:"Reserve all DHE assemblies in link.xml",id:"reserve-all-dhe-assemblies-in-linkxml",level:3},{value:"dhao file",id:"dhao-file",level:2},{value:"Mark changed function information",id:"mark-changed-function-information",level:2},{value:"Used in code",id:"used-in-code",level:2},{value:"Pack",id:"pack",level:2},{value:"Non-encrypted workflow",id:"non-encrypted-workflow",level:3},{value:"Build the main package",id:"build-the-main-package",level:4},{value:"Hot update",id:"hot-update",level:4},{value:"Encryption workflow",id:"encryption-workflow",level:3},{value:"Build the main package",id:"build-the-main-package-1",level:4},{value:"Hot update",id:"hot-update-1",level:4},{value:"Precautions",id:"precautions",level:2},{value:"There are huge differences in the results of calculating dhao caused by external dll",id:"there-are-huge-differences-in-the-results-of-calculating-dhao-caused-by-external-dll",level:3}],c={toc:s},A="wrapper";function h(e){let{components:t,...i}=e;return(0,l.kt)(A,(0,n.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"manual"},"manual"),(0,l.kt)("h2",{id:"install"},"Install"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Unzip hybridclr_unity.zip, place it in the project Packages directory, and rename it com.code-philosophy.hybridclr"),(0,l.kt)("li",{parentName:"ul"},"Unzip the corresponding ",(0,l.kt)("inlineCode",{parentName:"li"},"libil2cpp-{version}.7z")," according to your unity version"),(0,l.kt)("li",{parentName:"ul"},"Open ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR/Installer"),", enable the ",(0,l.kt)("inlineCode",{parentName:"li"},"Copy libil2cpp from local")," option, select the libil2cpp directory you just decompressed, and install it."),(0,l.kt)("li",{parentName:"ul"},"Depending on your Unity version:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"If version >= 2020, replace the ",(0,l.kt)("inlineCode",{parentName:"li"},"ModifiedDlls\\{verions}\\Unity.IL2CPP.dll")," file with ",(0,l.kt)("inlineCode",{parentName:"li"},"{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy\\netcoreapp3.1\\Unity.IL2CPP.dll")," (Unity 2020) or ",(0,l.kt)("inlineCode",{parentName:"li"},"{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy\\Unity.IL2CPP.dll")," (Unity 2021+). If there is no file corresponding to your version, contact us to make one."),(0,l.kt)("li",{parentName:"ul"},"If the version is 2019, no operation is required because it has been automatically copied during the Install process")))),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"installer",src:a(9456).Z,width:"805",height:"263"})),(0,l.kt)("h2",{id:"configuration"},"Configuration"),(0,l.kt)("h3",{id:"configure-playersettings"},"Configure PlayerSettings"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Scripting Backend")," switched to ",(0,l.kt)("inlineCode",{parentName:"li"},"IL2CPP")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Api Compatability Level")," switched to ",(0,l.kt)("inlineCode",{parentName:"li"},".Net 4.x")," (Unity 2019-2020) or ",(0,l.kt)("inlineCode",{parentName:"li"},".Net Framework")," (Unity 2021+)")),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"player settings",src:a(4468).Z,width:"812",height:"129"})),(0,l.kt)("h3",{id:"enable-incremental-gc"},"Enable incremental GC"),(0,l.kt)("p",null,"Just enable the ",(0,l.kt)("inlineCode",{parentName:"p"},"use incremental GC")," option in ",(0,l.kt)("inlineCode",{parentName:"p"},"Player Settings"),", and there is no need to make any settings for HybridCLR."),(0,l.kt)("h3",{id:"enable-full-generic-sharing"},"Enable full generic sharing"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"The 2020 version does not support full generic sharing"),(0,l.kt)("li",{parentName:"ul"},"The 2021 version requires setting the IL2CPP Code Generation option to ",(0,l.kt)("inlineCode",{parentName:"li"},"faster(smaller)")),(0,l.kt)("li",{parentName:"ul"},"The 2022 version enables full generic sharing by default and cannot be turned off. If you set the IL2CPP Code Generation option to ",(0,l.kt)("inlineCode",{parentName:"li"},"faster(smaller)"),", you can further reduce the package body.")),(0,l.kt)("h2",{id:"turn-on-and-off-standard-command-optimization"},"Turn on and off standard command optimization"),(0,l.kt)("p",null,"Standard optimization is enabled by default. This feature can be actively controlled to be turned on or off through the ",(0,l.kt)("inlineCode",{parentName:"p"},"RuntimeApi.EnableTransformOptimization")," function."),(0,l.kt)("p",null,"Standard instruction optimization and advanced instruction optimization are two completely independent and mutually exclusive features. For each interpreted function, you can only choose to use one of the two or not use them at all."),(0,l.kt)("h3",{id:"configure-hybridclr"},"Configure HybridCLR"),(0,l.kt)("p",null,"As with the community version, click the ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/Settings")," menu to open the configuration dialog."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Field"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"),(0,l.kt)("th",{parentName:"tr",align:null}))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"differentialHybridAssemblies"),(0,l.kt)("td",{parentName:"tr",align:null},"DHE assembly list. Add the assembly name that requires differential hybrid execution to this list, such as HotUpdate. The same assembly cannot be added to the differentialHybridAssemblies and hotUpdateAssemlies lists at the same time."),(0,l.kt)("td",{parentName:"tr",align:null})))),(0,l.kt)("h3",{id:"reserve-all-dhe-assemblies-in-linkxml"},"Reserve all DHE assemblies in link.xml"),(0,l.kt)("p",null,"For user-owned code such as Assembly-CSharp, il2cpp generally does not cut it. However, for third-party assemblies that are directly added to Unity in the form of dlls, if all are not reserved, these dlls will be cut during packaging.\nThen there are huge changes when generating dhao files, which is obviously not what we expect."),(0,l.kt)("p",null,"Add similar configuration ",(0,l.kt)("inlineCode",{parentName:"p"},'<assembly fullname="YourExternDll" preserve="all"/>')," in ",(0,l.kt)("inlineCode",{parentName:"p"},"Assets/link.xml")," (or other custom link.xml) for all your dhe assemblies."),(0,l.kt)("h2",{id:"dhao-file"},"dhao file"),(0,l.kt)("p",null,"The dhao file is the core concept of DHE technology. The dhao file contains information about the changed types and functions in the latest hot update dll calculated offline. The runtime determines whether to use the latest interpreted version or directly call the original function when executing a hot update function based on the information in the dhao file. AOT function.\nOffline calculated dhao files are extremely critical for DHE technology. If there is no dhao file, the original AOT dll needs to be carried additionally, and the cost of calculating function changes is extremely high."),(0,l.kt)("p",null,"By comparing the latest hot update dll with the AOT dll generated during packaging, the changed types and functions are calculated offline and saved as a dhao file. Therefore, for the DHE mechanism to work properly, it must rely on the correctness of the dhao file, and the correctness of the dhao file\nIt relies on accurately providing the latest hot update dll and the AOT dll generated during packaging."),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR.Editor.DHE.BuildUtils")," provides multiple functions related to generating dhao files."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"function name"),(0,l.kt)("th",{parentName:"tr",align:null},"description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"GenerateUnchangedDHAODatas"),(0,l.kt)("td",{parentName:"tr",align:null},"Generate the dhao file of the first package (that is, when no changes have occurred)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"GenerateDHAODatas"),(0,l.kt)("td",{parentName:"tr",align:null},"Generate dhao files for hot update packages (that is, when code changes)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"EncryptDllAndGenerateUnchangedDHAODatas"),(0,l.kt)("td",{parentName:"tr",align:null},"When the primary code reinforcement is turned on, the encrypted dll and dhao files are generated in the first package (that is, when no changes have occurred)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"EncryptDllAndGenerateDHAODatas"),(0,l.kt)("td",{parentName:"tr",align:null},"When the primary code reinforcement is turned on, the encrypted dll and dhao files are generated in the hot update package (that is, when the code changes)")))),(0,l.kt)("h2",{id:"mark-changed-function-information"},"Mark changed function information"),(0,l.kt)("p",null,"At present, it is possible to automatically calculate the changed function by comparing the latest hot update dll with the aot dll generated during packaging. In most cases, manual operation is not required. But in fact, there is no perfect code that can judge logical equivalence.\nThe tool simply compares IL one by one to determine equivalence. Sometimes it may happen that the functions are equivalent but the IL changes (such as changing the order of two lines of unrelated code), it will be judged as a function change and the execution will be switched to interpretation.\nIf this happens, and there are extremely stringent performance requirements for the function, the developer can manually use the UnchangedAttribute attribute to mark the change of the function.\n",(0,l.kt)("inlineCode",{parentName:"p"},"[Unchanged]")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"[Unchanged(true)]")," represent unchanged, ",(0,l.kt)("inlineCode",{parentName:"p"},"[Unchanged(false)]")," represents change, and unmarked features are automatically calculated by the tool."),(0,l.kt)("p",null,"Incorrectly marking an unchanged function as changed will not affect the correctness of the run, only performance. Even if all hot update functions are marked as changes, they can still run normally. However, incorrectly marking the changed function as unchanged will not only cause errors in the running logic, but\nIn severe cases, it can even cause a crash!"),(0,l.kt)("admonition",{type:"caution"},(0,l.kt)("p",{parentName:"admonition"},"Unless there are special circumstances and you are an experienced expert, do not mark manually. Because the compiler often generates some hidden classes or fields, these class names are not stable. C# code that looks the same on the surface may not actually generate the same code. Forcibly marking it as ",(0,l.kt)("inlineCode",{parentName:"p"},"[Unchanged]")," will lead to incorrect running logic or even crash.")),(0,l.kt)("h2",{id:"used-in-code"},"Used in code"),(0,l.kt)("p",null,"At runtime, after hot update is completed, for each dhe assembly, call ",(0,l.kt)("inlineCode",{parentName:"p"},"RuntimeApi::LoadDifferentialHybridAssembly")," to load the hot update assembly."),(0,l.kt)("p",null,"Precautions:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Differential hybrid execution assembly should be loaded according to assembly dependency order."),(0,l.kt)("li",{parentName:"ul"},"If an assembly has not changed, the dhao field can be passed as null, but in this case the AOT dll generated during packaging must be used, and the hot update dll generated through the ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR/CompileDll/xxx")," command cannot be used."),(0,l.kt)("li",{parentName:"ul"},"The DHE assembly itself already contains metadata. Even if full generic sharing is not enabled, do not supplement metadata for the DHE assembly. If you supplement it, it will fail. Other non-DHE AOT assemblies can be supplemented as usual. metadata.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Loading DHE assembly"',title:'"Loading',DHE:!0,'assembly"':!0},'void LoadDifferentialHybridAssembly(string assemblyName)\n{\n     // Even if it is the first package, the dhao file needs to be provided\n     // In order to avoid unexpected errors, LoadDifferentialHybridAssembly requires strong verification, that is, the originalDll used to generate the dhao file must be the trimmed aot dll generated when constructing the main package.\n     // currentDll must be a dll consistent with dllBytes. The originalDllMd5 and currentDllMd5 used when generating this file are recorded in the dhao file.\n     // By checking this md5 match, ensure that the wrong currentDll or dhao file is not used\n     LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssembly(dllBytes, dhaoBytes, manifest.OriginalDllMd5, manifest.CurrentDllMd5);\n     if (err == LoadImageErrorCode.OK)\n     {\n         Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");\n     }\n     else\n     {\n         Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");\n     }\n}\n')),(0,l.kt)("h2",{id:"pack"},"Pack"),(0,l.kt)("p",null,"The files related to construction in DHE technology are dhe dll files and corresponding dhao files."),(0,l.kt)("h3",{id:"non-encrypted-workflow"},"Non-encrypted workflow"),(0,l.kt)("h4",{id:"build-the-main-package"},"Build the main package"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Use the trimmed AOT dll generated after building as the dhe dll of the first package (without any changes)"),(0,l.kt)("li",{parentName:"ul"},"Use ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR.Editor.DHE.BuildUtils.GenerateUnchangedDHAODatas")," to generate the dhao file of the first package"),(0,l.kt)("li",{parentName:"ul"},"Add dhe dll and dhao files to the hot update resource management system")),(0,l.kt)("p",null,"If you want to carry the dhe dll and dhao files of the first package with the package, please export the project first, then follow the above steps to generate the dhe dll and dhao files, and then add them to the exported project."),(0,l.kt)("h4",{id:"hot-update"},"Hot update"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Use ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR/CompileDll/ActivedBuildTarget")," to generate hot update dll."),(0,l.kt)("li",{parentName:"ul"},"Use ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR.Editor.DHE.BuildUtils.GenerateDHAODatas")," to generate the latest hot update dll dhao file"),(0,l.kt)("li",{parentName:"ul"},"Add the latest hot update dll and dhao files to the hot update resource management system")),(0,l.kt)("admonition",{type:"caution"},(0,l.kt)("p",{parentName:"admonition"},"If you package using the ",(0,l.kt)("strong",{parentName:"p"},"development build option"),", be sure to use ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/CompileDll/ActivedBuildTarget_Development")," to compile the hot update dll in Development mode. Otherwise, the comparison result is that almost all functions are judged to have changed.")),(0,l.kt)("h3",{id:"encryption-workflow"},"Encryption workflow"),(0,l.kt)("h4",{id:"build-the-main-package-1"},"Build the main package"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Use the trimmed AOT dll generated after building as the dhe dll of the first package (without any changes)"),(0,l.kt)("li",{parentName:"ul"},"Use ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR.Editor.DHE.BuildUtils.EncryptDllAndGenerateUnchangedDHAODatas")," to generate the dhao file of the first package and the encrypted dhe dll file"),(0,l.kt)("li",{parentName:"ul"},"Add dhe dll and dhao files to the hot update resource management system")),(0,l.kt)("p",null,"If you want to carry the dhe dll and dhao files of the first package with the package, please export the project first, then follow the above steps to generate the dhe dll and dhao files, and then add them to the exported project."),(0,l.kt)("h4",{id:"hot-update-1"},"Hot update"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Use ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR/CompileDll/ActivedBuildTarget")," to generate hot update dll."),(0,l.kt)("li",{parentName:"ul"},"Use ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR.Editor.DHE.BuildUtils.EncryptDllAndGenerateDHAODatas"),"generates the latest encrypted file of dhe dll and the corresponding dhao file"),(0,l.kt)("li",{parentName:"ul"},"Add the encrypted dhe dll and dhao files to the hot update resource management system")),(0,l.kt)("h2",{id:"precautions"},"Precautions"),(0,l.kt)("h3",{id:"there-are-huge-differences-in-the-results-of-calculating-dhao-caused-by-external-dll"},"There are huge differences in the results of calculating dhao caused by external dll"),(0,l.kt)("p",null,"If there is an external dll marked as a DHE assembly, the external dll will be trimmed when packaged, and when calculating the dhao file, the original external dll will be taken, resulting in a huge difference, which is not expected. There are several solutions:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"In link.xml ",(0,l.kt)("inlineCode",{parentName:"li"},'<assembly fullname="YourExternDll" preserve="all"/>')," completely retains the external dll"),(0,l.kt)("li",{parentName:"ol"},"Instead of using the latest hot update dll to calculate the difference, use the aot dll generated when the latest code is repackaged to calculate the difference.")))}h.isMDXComponent=!0},9456:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/ultimate-installer-8a4fc30b6b8adf2de3a8b75efd16894c.jpg"},4468:(e,t,a)=>{a.d(t,{Z:()=>n});const n="data:image/jpeg;base64,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"}}]);