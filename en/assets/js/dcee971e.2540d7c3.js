"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1609],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var a=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(n),m=l,h=d["".concat(s,".").concat(m)]||d[m]||p[m]||i;return n?a.createElement(h,r(r({ref:t},u),{},{components:n})):a.createElement(h,r({ref:t},u))}));function h(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var i=n.length,r=new Array(i);r[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[d]="string"==typeof e?e:l,r[1]=o;for(var c=2;c<i;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8794:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=n(7462),l=(n(7294),n(3905));const i={},r="Manual",o={unversionedId:"business/reload/manual",id:"business/reload/manual",title:"Manual",description:"Supported features",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/reload/manual.md",sourceDirName:"business/reload",slug:"/business/reload/manual",permalink:"/en/docs/business/reload/manual",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Quick Start",permalink:"/en/docs/business/reload/quickstart"},next:{title:"Free Trial",permalink:"/en/docs/business/reload/freetrial"}},s={},c=[{value:"Supported features",id:"supported-features",level:2},{value:"Unsupported features and special requirements",id:"unsupported-features-and-special-requirements",level:2},{value:"Memory unloading rate",id:"memory-unloading-rate",level:2},{value:"Installation",id:"installation",level:2},{value:"Full generic sharing",id:"full-generic-sharing",level:2},{value:"Code encryption",id:"code-encryption",level:2},{value:"Control access",id:"control-access",level:2},{value:"Uninstall assembly",id:"uninstall-assembly",level:2},{value:"RuntimeApi::TryUnloadAssembly",id:"runtimeapitryunloadassembly",level:3},{value:"RuntimeApi::ForceUnloadAssembly",id:"runtimeapiforceunloadassembly",level:3},{value:"HotReload compatibility check",id:"hotreload-compatibility-check",level:2},{value:"Solve the reference problem of unloaded objects",id:"solve-the-reference-problem-of-unloaded-objects",level:2},{value:"Known libraries with compatibility issues",id:"known-libraries-with-compatibility-issues",level:2}],u={toc:c},d="wrapper";function p(e){let{components:t,...i}=e;return(0,l.kt)(d,(0,a.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"manual"},"Manual"),(0,l.kt)("h2",{id:"supported-features"},"Supported features"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Supports uninstalling assemblies, uninstalling nearly 100% of the memory used by assemblies"),(0,l.kt)("li",{parentName:"ul"},"Supports reloading assemblies, the code can be changed arbitrarily or even completely different (MonoBehaviour and Scriptable have certain restrictions)"),(0,l.kt)("li",{parentName:"ul"},"Supports ",(0,l.kt)("strong",{parentName:"li"},"limiting the set of functions that can be accessed in hot updates of assemblies"),", which is suitable for creating sandbox environments in UGC games to avoid damage caused by malicious player code.")),(0,l.kt)("h2",{id:"unsupported-features-and-special-requirements"},"Unsupported features and special requirements"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Requires that business code will no longer use objects or functions in the uninstalled assembly, and exit all old logic in execution"),(0,l.kt)("li",{parentName:"ul"},"Cannot directly uninstall the dependent assembly, must first uninstall the dependent in reverse dependency order, and then uninstall the dependent. For example, if A.dll depends on B.dll, you need to uninstall A.dll first, then uninstall B.dll"),(0,l.kt)("li",{parentName:"ul"},"MonoBehaviour is related to ScriptableObject"),(0,l.kt)("li",{parentName:"ul"},"It is required that events or message functions in the overloaded MonoBehaviour, such as Awake and OnEable, do not be added or deleted (but the function body can change)"),(0,l.kt)("li",{parentName:"ul"},"It is required that the serialized field name of the script class with the same name in the old assembly does not change after overloading (the type can change)"),(0,l.kt)("li",{parentName:"ul"},"If the field type is a custom type A (class or struct or enum) in the uninstallable assembly, it must be given the ",(0,l.kt)("inlineCode",{parentName:"li"},"[Serializable]")," attribute"),(0,l.kt)("li",{parentName:"ul"},"The field type ",(0,l.kt)("inlineCode",{parentName:"li"},"List<A>")," is not supported, where A is a type in the uninstallable assembly, please replace it with ",(0,l.kt)("inlineCode",{parentName:"li"},"A[]")),(0,l.kt)("li",{parentName:"ul"},"Generic types cannot be inherited, such as ",(0,l.kt)("inlineCode",{parentName:"li"},"class MyScript : CommonScript<int>")),(0,l.kt)("li",{parentName:"ul"},"Some libraries that cache reflection information (this behavior is most common in serialization-related libraries, such as LitJson), need to clean up the cached reflection information after hot reloading"),(0,l.kt)("li",{parentName:"ul"},"Destructors, ~XXX(), are not supported. It is also not allowed to instantiate generic classes with destructors whose generic parameters are of this assembly type"),(0,l.kt)("li",{parentName:"ul"},"Incompatible with dots. Since dots caches a large amount of type information and the implementation is complex, it is difficult to clean up the cache information separately.")),(0,l.kt)("h2",{id:"memory-unloading-rate"},"Memory unloading rate"),(0,l.kt)("p",null,"Except for the following metadata memory that cannot be unloaded, almost all other (99.9%) metadata can be unloaded:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Script classes such as MonoBehavoiur and ScriptableObject. The Il2CppClass corresponding to them at the runtime level will be referenced by the Unity engine internally and cannot be released, but most member metadata such as method can be released"),(0,l.kt)("li",{parentName:"ul"},"Types marked with ",(0,l.kt)("inlineCode",{parentName:"li"},"[Serializable]"),". Similar to MonoBehaviour, they may also be referenced by the Unity engine memory during serialization and cannot be released."),(0,l.kt)("li",{parentName:"ul"},"Generic classes used during the operation of this assembly, but not involving this assembly type. For example, ",(0,l.kt)("inlineCode",{parentName:"li"},"List<int>")," metadata will not be released, but ",(0,l.kt)("inlineCode",{parentName:"li"},"List<MyHotReloadClass>")," will be released")),(0,l.kt)("p",null,"All unreleased metadata (MonoBehaviour, Serializable class) will be reused when the assembly is loaded again. Loading and unloading the same assembly multiple times will only cause one unreleased behavior, which will not cause leaks or continuous growth of unreleased metadata memory."),(0,l.kt)("p",null,"In actual projects, more than 99% of metadata memory can be unloaded for most assemblies."),(0,l.kt)("h2",{id:"installation"},"Installation"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Unzip hybridclr_unity and put it in the project Packages directory, rename it to com.code-philosophy.hybridclr"),(0,l.kt)("li",{parentName:"ul"},"Unzip the corresponding ",(0,l.kt)("inlineCode",{parentName:"li"},"il2cpp_plus-{version}.zip")," according to your unity version"),(0,l.kt)("li",{parentName:"ul"},"Unzip ",(0,l.kt)("inlineCode",{parentName:"li"},"hybridclr.zip")),(0,l.kt)("li",{parentName:"ul"},"Put the hybridclr directory after unzipping ",(0,l.kt)("inlineCode",{parentName:"li"},"hybridclr.zip")," into the libil2cpp directory after unzipping ",(0,l.kt)("inlineCode",{parentName:"li"},"il2cpp-{version}.zip")),(0,l.kt)("li",{parentName:"ul"},"Open ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR/Installer"),", turn on the ",(0,l.kt)("inlineCode",{parentName:"li"},"Copy libil2cpp from local")," option, select the libil2cpp directory just unzipped, and install it")),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"installer",src:n(9456).Z,width:"805",height:"263"})),(0,l.kt)("h2",{id:"full-generic-sharing"},"Full generic sharing"),(0,l.kt)("p",null,"See ",(0,l.kt)("a",{parentName:"p",href:"../fullgenericsharing"},"Full generic sharing"),"."),(0,l.kt)("h2",{id:"code-encryption"},"Code encryption"),(0,l.kt)("p",null,"See ",(0,l.kt)("a",{parentName:"p",href:"../basicencryption"},"Code hardening"),"."),(0,l.kt)("h2",{id:"control-access"},"Control access"),(0,l.kt)("p",null,"Sometimes you may want to limit the types and functions that hot update code can access, for example, sandbox games do not want UGC code to access file reading interfaces, access control can achieve this goal."),(0,l.kt)("p",null,"For details, please read the document ",(0,l.kt)("a",{parentName:"p",href:"../accesspolicy"},"Access Control Policy"),"."),(0,l.kt)("h2",{id:"uninstall-assembly"},"Uninstall assembly"),(0,l.kt)("p",null,"Currently, two interfaces are provided for uninstalling assemblies:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"RuntimeApi::TryUnloadAssembly"),(0,l.kt)("li",{parentName:"ul"},"RuntimeApi::ForceUnloadAssembly")),(0,l.kt)("h3",{id:"runtimeapitryunloadassembly"},"RuntimeApi::TryUnloadAssembly"),(0,l.kt)("p",null,"This interface attempts to uninstall the assembly. If the uninstallation succeeds, true is returned; if the uninstallation fails, the status quo is maintained and false is returned."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},'/// <summary>\n/// Try to uninstall the assembly\n/// </summary>\n/// <param name="assembly"></param>\n/// <param name="printObjectReferenceLink">Whether to print the reference chain when an illegal reference is found. This option will not only significantly extend the uninstallation time,\n/// but also cause a spike in native memory during uninstallation (it will fall back after uninstallation). It is strongly recommended that online projects turn off this option</param>\n/// <returns></returns>\npublic static extern bool TryUnloadAssembly(Assembly assembly, bool printObjectReferenceLink);\n')),(0,l.kt)("h3",{id:"runtimeapiforceunloadassembly"},"RuntimeApi::ForceUnloadAssembly"),(0,l.kt)("p",null,"This interface forcibly uninstalls the assembly. If an exception is issued during the uninstallation process, false is returned, otherwise true is returned. Regardless of the return result, the assembly will be removed."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},'/// <summary>\n/// Forcefully uninstall an assembly, regardless of whether there is still a reference to the assembly in the AppDomain\n/// </summary>\n/// <param name="assembly">Assembly to be uninstalled</param>\n/// <param name="ignoreObjectReferenceValidation">Whether to not call LiveObjectValidator to check for illegal references, it is recommended to take false</param>\n/// <param name="printObjectReferenceLink">Whether to print the reference chain when an illegal reference is found. This option will not only significantly extend the uninstall time,\n/// but also cause a spike in native memory during uninstallation (it will fall back after uninstallation is completed). It is strongly recommended that online projects do not enable this option</param>\n/// <returns>Whether there are no illegal references, true means no, false means yes</returns>\n/// <exception cref="UnloadAssemblyException"></exception>\npublic static bool ForceUnloadAssembly(Assembly assembly, bool ignoreObjectReferenceValidation, bool printObjectReferenceLink)\n{\n    throw new UnloadAssemblyException($"Failed to unload assembly {assembly.FullName}");\n}\n')),(0,l.kt)("h2",{id:"hotreload-compatibility-check"},"HotReload compatibility check"),(0,l.kt)("p",null,"Because the Unity engine caches metadata of some types (MonoBehaviour, Serializable classes) internally, there are some restrictions on the use of these classes. If these restrictions are violated, the runtime may crash.\n",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR.Editor.HotReload.HotReloadCompatibilityValidator")," can detect most of the codes that are incompatible with hot reload in advance."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},'[MenuItem("Test/CheckCompatibility")]\npublic static void CheckCompatibility()\n{\n    BuildTarget target = EditorUserBuildSettings.activeBuildTarget;\n    CompileDllCommand.CompileDll(target);\n    // This is the hot reload assembly, not the hot update assembly. Please do not add assemblies that do not require hot reload to this list.\n    var hotReloadDlls = new List<string> { "Tests" };\n    var assResolver = MetaUtil.CreateHotUpdateAndAOTAssemblyResolver(target, hotReloadDlls);\n    var validator = new HotReloadCompatibilityValidator(hotReloadDlls, assResolver);\n    if (!validator.Validate())\n    {\n        UnityEngine.Debug.LogError("CheckCompatibility failed");\n    }\n}\n\n')),(0,l.kt)("h2",{id:"solve-the-reference-problem-of-unloaded-objects"},"Solve the reference problem of unloaded objects"),(0,l.kt)("p",null,"Hot reload technology requires that the metadata of the unloaded assembly U cannot be held in the unloaded assembly or global memory. Including but not limited to:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Instances of the type of the uninstalled assembly"),(0,l.kt)("li",{parentName:"ul"},"Generic parameters of generic classes or functions that contain the type of the uninstalled assembly"),(0,l.kt)("li",{parentName:"ul"},"Reflection information related to the uninstalled assembly, such as Assembly, Type, MethodInfo, PropertyInfo, etc."),(0,l.kt)("li",{parentName:"ul"},"Delegate pointing to a function in the uninstalled assembly"),(0,l.kt)("li",{parentName:"ul"},"Asynchronous Task defined in the uninstalled assembly"),(0,l.kt)("li",{parentName:"ul"},"Others")),(0,l.kt)("p",null,"Actual projects may be very complex, and it is difficult and impractical for developers to find all illegal references. We have implemented illegal reference checks, and logs of all illegal references will be printed during the uninstallation process. Developers can clear all illegal references according to the printed logs."),(0,l.kt)("h2",{id:"known-libraries-with-compatibility-issues"},"Known libraries with compatibility issues"),(0,l.kt)("p",null,"Most incompatibility issues are essentially caused by the caching of uninstalled objects, types, or functions. Incompatibility issues can be resolved by manually clearing these illegal references."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Jobs in 2022 will cache type-related information, and you need to slightly modify the code of UnityEngine.CoreModule.dll (./modifydll.md). Versions lower than 2022 do not need to be modified"),(0,l.kt)("li",{parentName:"ul"},"Deserialization libraries such as LitJson will cache reflection information. You need to clean up the cached reflection information in the library after hot reload. The specific operation depends on the implementation of the library.")))}p.isMDXComponent=!0},9456:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/ultimate-installer-8a4fc30b6b8adf2de3a8b75efd16894c.jpg"}}]);