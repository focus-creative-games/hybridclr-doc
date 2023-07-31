"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3250],{3905:(e,t,n)=>{n.d(t,{Zo:()=>A,kt:()=>m});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},A=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,A=r(e,["components","mdxType","originalType","parentName"]),d=p(n),u=a,m=d["".concat(s,".").concat(u)]||d[u]||c[u]||l;return n?i.createElement(m,o(o({ref:t},A),{},{components:n})):i.createElement(m,o({ref:t},A))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=u;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[d]="string"==typeof e?e:a,o[1]=r;for(var p=2;p<l;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7987:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>r,toc:()=>p});var i=n(7462),a=(n(7294),n(3905));const l={},o="Getting Started",r={unversionedId:"business/ultimate/quickstart",id:"business/ultimate/quickstart",title:"Getting Started",description:"This tutorial guides you to experience HybridCLR hot update from an empty project. For the sake of simplicity, only the case where the BuildTarget is Windows or MacOS Standalone platform is demonstrated.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/ultimate/quickstart.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/quickstart",permalink:"/en/docs/business/ultimate/quickstart",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"introduce",permalink:"/en/docs/business/ultimate/intro"},next:{title:"manual",permalink:"/en/docs/business/ultimate/manual"}},s={},p=[{value:"Experience Goals",id:"experience-goals",level:2},{value:"Prepare the environment",id:"prepare-the-environment",level:2},{value:"Install Unity",id:"install-unity",level:3},{value:"Install IDE and related compilation environment",id:"install-ide-and-related-compilation-environment",level:3},{value:"Initialize the Unity hot update project",id:"initialize-the-unity-hot-update-project",level:2},{value:"Create project",id:"create-project",level:3},{value:"Create <code>ConsoleToScreen.cs</code> script",id:"create-consoletoscreencs-script",level:3},{value:"Create the main scene",id:"create-the-main-scene",level:3},{value:"Create HotUpdate hot update module",id:"create-hotupdate-hot-update-module",level:3},{value:"Install and configure HybridCLR",id:"install-and-configure-hybridclr",level:2},{value:"Install",id:"install",level:3},{value:"Configure HybridCLR",id:"configure-hybridclr",level:3},{value:"Configure PlayerSettings",id:"configure-playersettings",level:3},{value:"Create hot update script",id:"create-hot-update-script",level:2},{value:"Load hot update assembly",id:"load-hot-update-assembly",level:2},{value:"Trial run in Editor",id:"trial-run-in-editor",level:2},{value:"Build and Run",id:"build-and-run",level:2},{value:"Test hot update",id:"test-hot-update",level:2}],A={toc:p},d="wrapper";function c(e){let{components:t,...l}=e;return(0,a.kt)(d,(0,i.Z)({},A,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"getting-started"},"Getting Started"),(0,a.kt)("p",null,"This tutorial guides you to experience HybridCLR hot update from an empty project. For the sake of simplicity, only the case where the BuildTarget is ",(0,a.kt)("strong",{parentName:"p"},"Windows")," or ",(0,a.kt)("strong",{parentName:"p"},"MacOS")," Standalone platform is demonstrated.\nPlease run through the hot update process correctly on the Standalone platform and then try the hot update on the Android and iOS platforms. Their processes are very similar."),(0,a.kt)("p",null,"The difficulty of using the ultimate edition is similar to that of the community version, and most of the principles are the same. It is recommended to familiarize yourself with the community version before trying the ultimate edition."),(0,a.kt)("h2",{id:"experience-goals"},"Experience Goals"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Create hot update assembly"),(0,a.kt)("li",{parentName:"ul"},"Load the hot update assembly and execute the hot update code, print ",(0,a.kt)("inlineCode",{parentName:"li"},"Hello, HybridCLR")),(0,a.kt)("li",{parentName:"ul"},"Modify the hot update code to print ",(0,a.kt)("inlineCode",{parentName:"li"},"Hello, World"))),(0,a.kt)("h2",{id:"prepare-the-environment"},"Prepare the environment"),(0,a.kt)("h3",{id:"install-unity"},"Install Unity"),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"The ultimate edition does not support the 2019.4.x series.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Install any version of 2020.3.26+, 2021.3.0+, 2022.3.0+. Versions 2020.3.0-2020.3.25 are also supported, but after the installation is completed in the Installer, you need to copy ",(0,a.kt)("inlineCode",{parentName:"li"},"2020.3.x/Editor/Data/il2cpp/external")," from the installation directory of any version 2020.3.26+ to replace\n",(0,a.kt)("inlineCode",{parentName:"li"},"{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/external")),(0,a.kt)("li",{parentName:"ul"},"Depending on your operating system, when selecting modules during installation, you must select ",(0,a.kt)("inlineCode",{parentName:"li"},"Windows Build Support(IL2CPP)")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"Mac Build Support(IL2CPP)"))),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"select il2cpp modules",src:n(8581).Z,width:"721",height:"507"})),(0,a.kt)("h3",{id:"install-ide-and-related-compilation-environment"},"Install IDE and related compilation environment"),(0,a.kt)("p",null,"-Windows"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Under Win, you need to install ",(0,a.kt)("inlineCode",{parentName:"li"},"visual studio 2019")," or later. The installation must include at least the ",(0,a.kt)("inlineCode",{parentName:"li"},"Game Development with Unity")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"Game Development with C++")," components"),(0,a.kt)("li",{parentName:"ul"},"install git\n-Mac"),(0,a.kt)("li",{parentName:"ul"},"Requires MacOS version >= 12, xcode version >= 13, e.g. ",(0,a.kt)("inlineCode",{parentName:"li"},"xcode 13.4.1, macos 12.4")),(0,a.kt)("li",{parentName:"ul"},"install git")),(0,a.kt)("h2",{id:"initialize-the-unity-hot-update-project"},"Initialize the Unity hot update project"),(0,a.kt)("p",null,"The process of constructing a hot update project from scratch is tedious. The project structure, resources and codes can refer to the hybridclr_trial project, and its warehouse address is ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr_trial"},"github")," or ",(0,a.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/hybridclr_trial"}," gitee"),"."),(0,a.kt)("h3",{id:"create-project"},"Create project"),(0,a.kt)("p",null,"Create an empty Unity project."),(0,a.kt)("h3",{id:"create-consoletoscreencs-script"},"Create ",(0,a.kt)("inlineCode",{parentName:"h3"},"ConsoleToScreen.cs")," script"),(0,a.kt)("p",null,"This script has no direct effect on demonstrating hot updates. It can print the log to the screen, which is convenient for locating errors."),(0,a.kt)("p",null,"Create ",(0,a.kt)("inlineCode",{parentName:"p"},"Assets/ConsoleToScreen.cs")," script class, the code is as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'using System;\nusing System. Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\n\npublic class ConsoleToScreen : MonoBehaviour\n{\n     const int maxLines = 50;\n     const int maxLineLength = 120;\n     private string _logStr = "";\n\n     private readonly List<string>_lines = new List<string>();\n\n     public int fontSize = 15;\n\n     void OnEnable() { Application. logMessageReceived += Log; }\n     void OnDisable() { Application. logMessageReceived -= Log; }\n\n     public void Log(string logString, string stackTrace, LogType type)\n     {\n         foreach (var line in logString. Split(\'\\n\'))\n         {\n             if (line. Length <= maxLineLength)\n             {\n                 _lines. Add(line);\n                 continue;\n             }\n             var lineCount = line.Length / maxLineLength + 1;\n             for (int i = 0; i < lineCount; i++)\n             {\n                 if ((i + 1) * maxLineLength <= line.Length)\n                 {\n                     _lines.Add(line.Substring(i * maxLineLength, maxLineLength));\n                 }\n                 else\n                 {\n                     _lines.Add(line.Substring(i * maxLineLength, line.Length - i * maxLineLength));\n                 }\n             }\n         }\n         if (_lines. Count > maxLines)\n         {\n             _lines. RemoveRange(0, _lines. Count - maxLines);\n         }\n         _logStr = string. Join("\\n", _lines);\n     }\n\n     void OnGUI()\n     {\n         GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity,\n            new Vector3(Screen. width / 1200.0f, Screen. height / 800.0f, 1.0f));\n         GUI.Label(new Rect(10, 10, 800, 370), _logStr, new GUIStyle() { fontSize = Math.Max(10, fontSize) });\n     }\n}\n\n\n')),(0,a.kt)("h3",{id:"create-the-main-scene"},"Create the main scene"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Create default initial scene main.scene"),(0,a.kt)("li",{parentName:"ul"},"Create an empty GameObject in the scene and hang ConsoleToScreen on it"),(0,a.kt)("li",{parentName:"ul"},"Add the main scene to the list of packaged scenes in ",(0,a.kt)("inlineCode",{parentName:"li"},"Build Settings"))),(0,a.kt)("h3",{id:"create-hotupdate-hot-update-module"},"Create HotUpdate hot update module"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Create ",(0,a.kt)("inlineCode",{parentName:"li"},"Assets/HotUpdate")," directory"),(0,a.kt)("li",{parentName:"ul"},"Right-click ",(0,a.kt)("inlineCode",{parentName:"li"},"Create/Assembly Definition")," in the directory to create an assembly module named ",(0,a.kt)("inlineCode",{parentName:"li"},"HotUpdate"))),(0,a.kt)("h2",{id:"install-and-configure-hybridclr"},"Install and configure HybridCLR"),(0,a.kt)("h3",{id:"install"},"Install"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"After decompressing hyridclr_unity.zip, put it in the project Packages directory and rename it to com.code-philosophy.hybridclr"),(0,a.kt)("li",{parentName:"ul"},"Decompress the corresponding ",(0,a.kt)("inlineCode",{parentName:"li"},"libil2cpp-{version}.7z")," according to your unity version"),(0,a.kt)("li",{parentName:"ul"},"Open ",(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Installer"),", enable the ",(0,a.kt)("inlineCode",{parentName:"li"},"copy libil2cpp from local")," option, select the libil2cpp directory you just decompressed, and install"),(0,a.kt)("li",{parentName:"ul"},"Replace ",(0,a.kt)("inlineCode",{parentName:"li"},"{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy\\netcoreapp3.1\\Unity.IL2CPP.dll")," with ",(0,a.kt)("inlineCode",{parentName:"li"},"ModifiedDlls\\{verions}\\Unity.IL2CPP.dll")," according to your Unity version ( Unity 2020) or ",(0,a.kt)("inlineCode",{parentName:"li"},"{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy\\Unity.IL2CPP.dll")," (Unity 2021+). If your version is not available, contact us to make one")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"installer",src:n(9456).Z,width:"805",height:"263"})),(0,a.kt)("h3",{id:"configure-hybridclr"},"Configure HybridCLR"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Open the menu ",(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Settings")),(0,a.kt)("li",{parentName:"ul"},"Add ",(0,a.kt)("inlineCode",{parentName:"li"},"HotUpdate")," assembly in ",(0,a.kt)("inlineCode",{parentName:"li"},"differentialHybridAssemblies")," list")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"settings",src:n(8125).Z,width:"835",height:"386"})),(0,a.kt)("h3",{id:"configure-playersettings"},"Configure PlayerSettings"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Turn off the incremental GC (Use Incremental GC) option. Because it is not yet stable, it will not be demonstrated in this tutorial"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Scripting Backend")," switched to ",(0,a.kt)("inlineCode",{parentName:"li"},"IL2CPP")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Api Compatability Level")," switched to ",(0,a.kt)("inlineCode",{parentName:"li"},".Net 4.x")," (Unity 2019-2020) or ",(0,a.kt)("inlineCode",{parentName:"li"},".Net Framework")," (Unity 2021+)")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"player settings",src:n(4468).Z,width:"812",height:"129"})),(0,a.kt)("h2",{id:"create-hot-update-script"},"Create hot update script"),(0,a.kt)("p",null,"Create ",(0,a.kt)("inlineCode",{parentName:"p"},"Assets/HotUpdate/Hello.cs")," file, the code content is as follows"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'using System. Collections;\nusing UnityEngine;\n\npublic class Hello\n{\n     public static void Run()\n     {\n         Debug. Log("Hello, HybridCLR");\n     }\n}\n')),(0,a.kt)("h2",{id:"load-hot-update-assembly"},"Load hot update assembly"),(0,a.kt)("p",null,"In order to simplify the demonstration, we do not download HotUpdate.dll through the http server, but directly put HotUpdate.dll in the StreamingAssets directory."),(0,a.kt)("p",null,"HybridCLR is a native runtime implementation, so call ",(0,a.kt)("inlineCode",{parentName:"p"},"Assembly Assembly.Load(byte[])")," to load the hot update assembly."),(0,a.kt)("p",null,"Create the ",(0,a.kt)("inlineCode",{parentName:"p"},"Assets/LoadDll.cs")," script, then ",(0,a.kt)("strong",{parentName:"p"},"create a GameObject object in the main scene, add the LoadDll script"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'using HybridCLR;\nusing System;\nusing System. Collections;\nusing System.Collections.Generic;\nusing System.IO;\nusing System. Linq;\nusing System. Reflection;\nusing System. Threading. Tasks;\nusing UnityEngine;\nusing UnityEngine. Networking;\n\npublic class LoadDll : MonoBehaviour\n{\n\n     void Start()\n     {\n         // In the Editor environment, HotUpdate.dll.bytes has been automatically loaded and does not need to be loaded. Repeated loading will cause problems.\n         #if !UNITY_EDITOR\n         Assembly hotUpdateAss = LoadDifferentialHybridAssembly("HotUpdate");\n#else\n         // No need to load under Editor, directly find the HotUpdate assembly\n         Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");\n#endif\n         Type helloType = hotUpdateAss. GetType("Hello");\n         MethodInfo runMethod = helloType. GetMethod("Run");\n         runMethod.Invoke(null, null);\n     }\n\n     private Assembly LoadDifferentialHybridAssembly(string assName)\n     {\n         byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes");\n         string dhaoPath = $"{Application.streamingAssetsPath}/{assName}.dhao.bytes";\n         byte[] dhaoBytes = File.Exists(dhaoPath) ? File.ReadAllBytes(dhaoPath) : null;\n         LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssembly(dllBytes, dhaoBytes, true);\n         if (err == LoadImageErrorCode. OK)\n         {\n             Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");\n             return System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == assName);\n         }\n         else\n         {\n             Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");\n             return null;\n         }\n     }\n}\n\n')),(0,a.kt)("p",null,"So far, the creation of the entire hot update project has been completed! ! !"),(0,a.kt)("h2",{id:"trial-run-in-editor"},"Trial run in Editor"),(0,a.kt)("p",null,"Run the main scene, 'Hello, HybridCLR' will be displayed on the screen, indicating that the code is working properly."),(0,a.kt)("h2",{id:"build-and-run"},"Build and Run"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Run the menu ",(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/All")," to perform the necessary generation operations. ",(0,a.kt)("strong",{parentName:"li"},"This step cannot be missed"),"!!!"),(0,a.kt)("li",{parentName:"ul"},"Open the ",(0,a.kt)("inlineCode",{parentName:"li"},"Build Settings")," dialog box, click ",(0,a.kt)("inlineCode",{parentName:"li"},"Build"),", select the output directory ",(0,a.kt)("inlineCode",{parentName:"li"},"Release-Win64"),", and package the project."),(0,a.kt)("li",{parentName:"ul"},"Run menu ",(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/CreateAOTDllSnapshot"),". ",(0,a.kt)("strong",{parentName:"li"},"This step cannot be missed"),"!!!"),(0,a.kt)("li",{parentName:"ul"},"Copy ",(0,a.kt)("inlineCode",{parentName:"li"},"{proj}/HybridCLRData/AOTDllOutput/StandaloneWindows64/HotUpdate.dll")," (StandaloneMacXxx under MacOS) to ",(0,a.kt)("inlineCode",{parentName:"li"},"XXX_Data/StreamingAssets/HotUpdate.dll.bytes")),(0,a.kt)("li",{parentName:"ul"},"Run ",(0,a.kt)("inlineCode",{parentName:"li"},"Release-Win64/Xxx.exe"),", the screen will display 'Hello, HybridCLR', indicating that the hot update code has been successfully executed!")),(0,a.kt)("h2",{id:"test-hot-update"},"Test hot update"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Modify the ",(0,a.kt)("inlineCode",{parentName:"li"},'Debug.Log("Hello, HybridCLR");')," code in the Run function of ",(0,a.kt)("inlineCode",{parentName:"li"},"Assets/HotUpdate/Hello.cs")," to ",(0,a.kt)("inlineCode",{parentName:"li"},'Debug.Log("Hello, World");'),"."),(0,a.kt)("li",{parentName:"ul"},"Run the menu command ",(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/CompileDll/ActiveBulidTarget")," to recompile the hot update code."),(0,a.kt)("li",{parentName:"ul"},"Run ",(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/DHEAssmeblyOptionData")," to generate dhao data."),(0,a.kt)("li",{parentName:"ul"},"Copy ",(0,a.kt)("inlineCode",{parentName:"li"},"{proj}/HybridCLRData/HotUpdateDlls/StandaloneWindows64/HotUpdate.dll")," to replace ",(0,a.kt)("inlineCode",{parentName:"li"},"XXX_Data/StreamingAssets/HotUpdate.dll.bytes")),(0,a.kt)("li",{parentName:"ul"},"Copy ",(0,a.kt)("inlineCode",{parentName:"li"},"{proj}/HybridCLRData/DifferentialHybridOptionDatas/HotUpdate.dhao.bytes")," to ",(0,a.kt)("inlineCode",{parentName:"li"},"XXX_Data/StreamingAssets/HotUpdate.dhao.bytes")),(0,a.kt)("li",{parentName:"ul"},"Re-run the program, and you will find ",(0,a.kt)("inlineCode",{parentName:"li"},"Hello, World")," displayed on the screen, indicating that the hot update code has taken effect!")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"When no hot update happens, use original AOT dll, from ",(0,a.kt)("inlineCode",{parentName:"p"},"{proj}/HybridCLRData/AOTDllOutput/{target}")," directory. When a hot update occurs, use the latest hot update dll from ",(0,a.kt)("inlineCode",{parentName:"p"},"{proj}/HybridCLRData/HotUpdateDlls/{target}")," directory.")),(0,a.kt)("p",null,"This completes the hot update experience! ! !"))}c.isMDXComponent=!0},8581:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/select_il2cpp_modules-d895c3fb5390e04b53e40ada2b422239.jpg"},8125:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/ultimate-hybridclr-settings-691d452643eedbd03afd79edf57a2d8a.jpg"},9456:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/ultimate-installer-8a4fc30b6b8adf2de3a8b75efd16894c.jpg"},4468:(e,t,n)=>{n.d(t,{Z:()=>i});const i="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCACBAywDASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAEDBAIFBv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAfA652GVZyctWc5dScLRU65AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/PXJo9Hzuj1evIHqafC6PUjyh60+QPZ8ngAAAAAAAAAACSHXRWtFSzghIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhIhMGfnrk0dc9D0fOsL9Pn9GvnJBsnNybOco2c4+jT3g6KwAAAAAAANuKD2LvBHsz4o9HJSLlIuUi5SLlIuUi5SLlIuUi5SLlIuUi5SLlIuUi5SLlIuUi5SLlIuUi5SLlIuUi5SLlIuUi5SLlIu0YRuwhRz1yaOuehfRuM7VScRZ2ULbzLN3JXGiozzprK+ddZy1ecQAAAAAB3xaejzFZPeYdz10c82inuezjHryAAAAAAAAAAAAAAAAAAAAAAAAAC6ns7x6cxREwX9c9A9A89qgzNNhibrTzHodHmtkmJukwPTHmNvRgejJ5rRnAAAAExvMD3oPBe7J4L6DxihcKVwpXClcKVwpXClcKVwpXClcKVwpXClcKVwpXClcKVwpXClcKVwpXClcKVwpXClcKVwpXClcKV2gwt2EoiYL+uehZXoKHcnHXQ47iTl0K+rOCObJKtEZi2Kx31UJgAAAABhN7HrJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJgM8TBf1z0NuIa+sQ1d4hr7wjXf5o1WYRp7xjVlAAAAAAABi20HGqq0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzxMF/XPQ9PzOjb1ik12ecNtVEmqcPRr6xQa66OTf15/Rrv82TXzkk09YujXf53JtorrNt/nQaOOOTiJoLO6bSUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUCUSZ4mC/oAAAAAAAAAAAAAAAHQdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUhRAf//EACkQAAIDAQABAwIHAQEBAAAAAAABAhESAxMQMUIEIyEiMDJAUGAUIDP/2gAIAQEAAQUCj7f6P4kfaHCU44leXT4SRl1TMyFzk4uDvLf+a+JH2vn058+sEl3jrzR8l3z8nM80ZfUT7QkeWDT+pjuX7/8AMfEj7f8Ai3X8tRbWWm+c4j5TTfKacuc4lMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMp+nxI+3pblCcYoxBz5xhdRw4QioxUPq2vIPnBEIRlGHODjiFZjFfweH/wAu3Pqvqqlzlzj1j05zj5Zzj4/7ri+an2fNzPiR9vTc87lmPRxnubepMh0yPpLyeSbl5J61IXSaLZuWf4OqNmzZs2bNmzZs2bNmzZs2bNmzZs2bNmzZs2bNmzZs2bNmzZs2bNmzZs2bNmzZs2bNmzZs2bNmzZs36fEj7enj+z45peP7jgq8U7fKaT5TQuM3JcWyPJuS5OSzIz9vEnHMhcZa8MvD+rH9s/p1HtPkoQnHmufPkpcvE68Mrf080eGQ+M0f8878H5P7Tnzl1fTnLkz4kfb08yJzgn5F51LnzkukILyInPnHr5YWukKXaKF0jU5fZTg+S7LD6/b88d3+H6sKz/0fnn0hNSncN/aj2pz77F9Q4zf1H5pfUOUV9QlOPbPP+0jJxlKTlI+JH2/oI8n0Hyp+P8MGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDHp8SPt6NzUo84y5x5xlz5CvoYhhcucukYxacIk4whDUoQUInjgS/NBcoOcOccrnFwaTS5QfSSj4/0vpqxmMp5hb5rb5xXSPKK/u+L5qfZ83M+JH29NyUfRNpucnJzkyPSUZucmKc07bFOURTlEtlsl2bi+k2bnnUq8ky/w/Sto0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zTNM0zT9PiR9vTx/dxLMoSivG2eOd+OdeKdvlNLxTFxm5eOeXzfkcI0+aX8H8SH7v8D8SPt6LpDS6R8fXqpryLxvpCSXVRPLEXVI88dw6KKj05xh5Pu7hGEpc5P+BTIp6/wPxI+39B5UKdv/A/Ej7emPseOFeKBjmiMIbqPh6c1BQSlHEMZ568aMQw659nzyYiiUYofKMuyrD5xOsIIhBSjjmNIxC+kYxi+cSMIedQj4+vucOPPpCc4z7f4H4kfb0073OvJPWpM1Ic5SJz2W63JRU5J6lbnJl2aY5zYpyT8k0alW5Ztm2l5J6cpM8kyzcs6le/tylpmIijFO0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0Wi0WvT4kfb+gj+3/Ar2+J//xAAUEQEAAAAAAAAAAAAAAAAAAACA/9oACAEDAQE/AWX/AP/EABQRAQAAAAAAAAAAAAAAAAAAAID/2gAIAQIBAT8BZf8A/8QANRAAAgEEAgADBQYGAgMAAAAAAAERAjFBkRIhIjJRAxBCYXETIFBggaEjMEBSscFicnPw8f/aAAgBAQAGPwL8yU+9OaVNpdxqH1cmGUy0uSkmGWLMqqjqm5C76nos/wAtU++hVV8XT1YUVujjXP8A2RR4ooiqUUN1dL2cfqVVTUqfsvLA6ufb9nxiD2lTrcfDc9tFcckoGl7Tg4p8RS6aml9pL+g4tP5Zp+/E9f1kkf6O+v0Iaab+RDTTfyPEo+qLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuX91P3eKlRT5WujjxcwnyHQk1T9qqb/UVXDLUM5NTFExP/IdXFu3X1Q0pSU/4KH5l3LfRyuuMwVKGu11+jE6vicFKjt0tzsrXH4Jn+i9r/wCP/aKqlRV5/C4KaKk57ip/3Hsl7SUvtF1UezopdT/iJ9nCl1Pue/xv+JTNJ/Dpin3U/d48nx9JOPJx6Cqv3InyfVuy7Mv9TmnD+Ry51T6ycuTn1kuxxU+79l2ceTj0n+ijrZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjZjfup+79pP6EunodHp6ngq5YgjiS6Tul+hxg6vxn9zi+nKR16SPqwqvVwco6H1YpTUS4PtMfzkOlOaYqh/QT4e0snywUtKqavVnPh7SruPCUuaVytLLqImZMNzEJnTTvZnf9vIjqZi9mJpq7n0x+KxQpZFah+6n7vHj4OPH5k98uCX7FVceGqSl0y4c99HFcnf/AAK/k4ntL1TX2UX6nEHHxRw4/vJTeKXT+wk58nH9ylfE7/TAqanUoc9IXqlHlQlHiyKrvzcmuKI/ndrB7V8eq569Dy1coS8xTT/aKj0bZR4fLTA+n5ePbnMjqVPp+xS/E4fxVSNR8Uz/AKOSo7dXJ9n2cTTLn5/iqqV0Opvt+6n8D6pn9CGlomFoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxr3U/dpooU0tLr1KquaTKquaTK2vMl0J+0WH3lnPj8MxPzOMO9OfUdSTp8yv8h1VRalfsdd+JqT2fDP7sXKnuqqOsCpjt0tzsiyVCz80Oni1FapE6k/i/ZFofF1XHC4+Bf5RxhqK1T9SmpKO2v5ftJmOGPqjNUez8HUyOlrjTzomfoynwQ+70xP6HkfdE+W3foeTl4vFxpn/AOfjf8SmaT+HTFPup+7x5OPSffKcM5Opz6yd1PsVUyd1PZKqaf1Lnhqa+jOqmi7Ls4xH6ndTf6nHk49JIlwLxPq3ZH8uxZbLLZb9yy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WWyy2WW/dT92mibwco6JaFCnqRrj2ieL9COPZLpF4biURJMdCoXbcD41zA1zXJY/obvZd/kKn7tNfi5UqxD7at0OMufKjj35OP7ycXKt+yKL+Gpvs6mIfwpYF/0gVXfm5NcUUpz02Qps15SmtYgaolz6qxVV4uTx/Q2Zb8hU/gdmRD/IVP3eHUxz+f8A7Aunjl6nLrjHrcbie0dJ9cqfr0VVpRNNv1R9X4foU1v4L/6E6n4qlJEfCnIk56dXU/I58fhmJ+YmrdODgu+dXX0FVTmmr/A6mnV5Vf5DTV6oRR1D41djphyqZ5HtOKjhXBQnbupjqXcUzBT11NHQvD5qo6wUpXef1HTDlUzyPCvL7VI+0xHf1KX60+7lX7ZUcbr5fIXChUUrpL8hU/dmXIlycL5nLnVPrJ22eZndTYsJdIibnHk49CVU5J5P1O6n37l2+rHdT2Sqns6rq2RLg48nHoPu4l6OUcuTn1k7qY/HV3fv3ceTj0J5P1OH6k+65cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLl/dT+Zqfd/8QAKxAAAgECBgICAQUBAQEAAAAAAREAIWExQVGR0fCBsXGhEDBAUGDB4SDx/9oACAEBAAE/Ifaff9k6eIcZ7T7iAklTeEICnaWE0S1UAvBABdBtNEtVLzB4SsBWOSgMH9CADUpQMATBvgf1rp4hxntPuBNdYMWG6QXhCGCCT4ImgkVdVa/yOISzbyGM2BARADDxKeEFVQhcQsJAmIDG1YYFRsjUgVELtjAHIVEwIF66P+wwS4hL+s9PEOM9p9/+c4WP94jME8MIThFEZGDgAkjgCYgNgABOsBsCAJ1hVEfVEtNpabS02lptLTaWm0tNpabS02lptLTaWm0tNpabS02lptLTaWm0tNpabS02lptLTaWm0tNpabS02lptLTaWm0tNpabS02lptLTaWm0tNpabS02lptLTaWm0tNpabS02lptLTaWm0tNpabS02lptLTaWm0tNpabS02lptLTaWm0E6eIcZ7T7/LAhWmsBYi+cCoUKhqvqsUoChmgigYkbpHAUCXgRYjhfCpELD8xVBg861qVrjSPQFColYr5UW4vB4nIEpVtStPhDGsFYjVvMaPEADJgauLX7L6SAmB6SS6RfEHDIBIZE+I7gHGM3iJmmOpVco8zjUr4/mwGtUxNIQ0qgqawZ/JnTxDjPaff54vEJQJHBqR0CQEwTiYTAc4mSFxmdDW79wpklhCYMFQgjDlskoQBEHAqpoH+SEhLMyzXEygHoYph5AQrlOM5+yBBoQ2k20m020m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2k20m2kxhOniHGe0+/wAvgMdmu8LmBAXaAiIUxZoQEVGqOAjtCEXMteITEITP090AaBIJDMBmpKK+EDGGwtKx8v3TNQiqKhn4hVnET4XMC0d8IqioZ+IafCJjlNB/W/Qh1ISXANPqPqA/MALRXaFIpX4gSxJplQFrxysq0NeJWYLTk1CSFIqBrhDiA0TZhUwSwCTFkSpQi5CYGI1hJhGoBoAGbz/K6tgmBMGwaYMGfyZ08TOe0+/z94F1jWEQEiXywZzGQkYZox4W0QwaSgUVZCxTWCmVG45glODJA5awiSwNiBxDQSotQAkXEAyTVSGfuUDAxEC4xWXBiyf9fQh4gWhOIFxpARVB41HjnljAEckTnMDDtoVSgigfecbEpp+sWKHJXAwGKlihxEEP7gCxA5goFgv9lCkhD1q4cCzR6gcQBxZmOuJLG8WDGF2tSVwh1w4ZTiKq0U2CcdgMoZuAW40WhSkOEq0F5l6X8qTFYBjEVQmDP5M6eJnPaff8CSxhDQcwhgBGRm0NZWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWSyWQwnTxM57T7/IWCEtKav7hiBFQun1DEGKhdPqUgJs7hXaAdwAQaEYQNGS8kg2iAEBWzDJDkIBGaswlqhIkjG0Q4QkQCogFl5iRhGqGZgfqMOktT+u8oOGp+Y/4hhFmSwVhj40E4swyvFdU0GGxIGAqJp/kzqGUcdSEyQwScBPuGGzEBvBc/podBN0MgABqteKzVaWlcBFaFiZ0hYXq1TALqwJRjRZ1DrhYgscBQCmpuhTKw/mgGtUxNIQ0qgqawZ/JnTxM57T7/IOAM8lH5AiAYEQEIjgVUIkkEEWcY5BCCicVE7aCDySinExBARIhvGDyA5xCIKIEHEA4zDyAhXKbYscohiCmYpaaQiy14AkD8SWuJOkJKj7SNiFYr9MBJCrzqOJ1nEsuvidRxOo4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4nWcTrOJ1nE6zidZxOs4gwnTxM57T7/IM5JJ/IcfW3wOLAMAbTMphVQGdZkBioAd2kIRczXiExAArCEgSZIfMrxAJDtKh6ZzAIE8gH/YIYJ4gk/jWP/O0p8PX9iy50IrU+T/QuniZz2n3+QSaIKaEgIVgotEoIUL1x8RlzjAheRjMsb7JUGyrAdUawwQBeFFcQiQIvkkplMAGm64VSgigYXzg7KkVoQBCgDZRUl1cKi8NJsAITOyqvtnFRqTTQH5/Yq4IpLbf0Lp4mc9p9/wAD0xB0h8/0Lp4mc9p9/lMfLnihiyAFgNDxpAR0AcIlUtHDVwVipGILgxYqSurB8wQ0k7h43h/79QQzD/PPhAaoS9W62tFtROCUSQMVhjCoBCMbADA0ZLySDaKvgauAVAKC4J5d39QUQQNCSKXQYmAi54gE4hNfAAgmqsyBxQMREhVscOYAZ1FsV4hLkl4R/wDIRCi0FptYnKVd8xOoMY4y9Ss5gHGJl7h/kREhVscOYAhRjJbDPEKxkMen2NjAugE+vwSMBmFT7DaFUBJYrUnM/wBC6eJnPaff5+3jrHaDBkjQoPyQmElMss4mARYCW8YSJdBFnKEKhBGggAQEBiGsBQAni1IjyiYOUpKgGp56wiSQQRZxhLEScqyqVbUwhVlmuMJxkhMZIHkGWUUAli0OEoEnqpCeoizNcTAFCqgMRPAfMmKjOplcqmorCRTJKoLQlAk9VIoqgli89YSQAg2uYRzQACw/FyPMYveWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw3lhvLDeWG8sN5Ybyw/HTxM57T7/gcL+hnTxM5//9oADAMBAAIAAwAAABBDTzDjzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxSxhyxzzzzzzzzzzzzzTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjxSwChzCCzzzzzzzzyhyzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxThBjThTBTTzzzzzzgyzQCxzzzzzzzzzzzzzzzzzzzzzzzzzyhTxTzTzzTTjTTjTzzzzyTjzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTggizxxyxyzzzzzygwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwzxTyyzyzwzzzzzzzzyzTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxSwhQCBSzzyhgRwSTzjDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDTxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyDz//xAAUEQEAAAAAAAAAAAAAAAAAAACA/9oACAEDAQE/EGX/AP/EABQRAQAAAAAAAAAAAAAAAAAAAID/2gAIAQIBAT8QZf8A/8QAKxABAAIBAgYCAgIDAQEBAAAAAQARITFhQVFx0fDxgZGxwRChMEBgUCDh/9oACAEBAAE/EPC3f9J+j8pqTwt0sr9RtmH7Yl3VIC1zW4IghLbKrncdhiq4F5rU13qCUIxclUa5mVM5YWwc+k5l6rba1j09F64tvKg5WUEUJfKVRGco6a/81+j8pqTwt0Qw0q5INOOazMK+pQKGlLQlOMwQjEChVSBnWBCJIFSKvtMxpKVmdARcrbqstst3v6yttVsgbSFQlMNKFGhWYqVJQhG4Lpb8sVLhLPjwl655NTM24AXhVrW6VTU0ChWLx/zP6PympPC3f/Kpahsur6/3GalLabTm53PuHCVSgR5VcDv1pCbWyr+FebaUXmP+Cjz0F5gZVkFh9s9z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+89z7z3PvPc+8Sjeoo/DU/R+U1J4W7+UFEh6AVuC4k1dYmWMFholSqNA+OcLuBIaqFd8Yl+oEOFGj1OPU0muxDKFVb5UwQo4z4zaGc4I0lBtXQ18MkwQTAPQWGgJoq2mIxW5TEvHQ5nzEdYe57Bq48F4Vq6toPKLkrAS9zaNxFYylpXIhvrHjXDsZOmgZx/pw2n7WKw2ilNwNS6iDhwglHm3pUqEYSnqAl1wXRa1rFVEtMwUoC63lvgSiCSzMAlAXW8t8D/ANsS1mQHfhLglrMUd+VqeFuz9H5TUnhbv5WsXdf00iFbWjp8ROsCVE3bzcud2a4qxL0vCaQ5kbZodNXXMC0AQIFBY6VRWxpEUECsmKHXTEOUNIo6NzCwyiyhyvll+46uGy2i6XfLneJtd2kL83nAlBXVLCuw2bcbstGBKLMOn+kKo6VbR+qnkO08h2l/Dw6TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7TyHaeQ7QpkiqrW+Z+j8pqTwt38irQVwzwfHR1n3uUFU1yyZmDoItQVQuqBxmZrA2ZrpVmzfuRRV6Bm6W/JxIYmYrhw8TmZMmImAFUBbbQo4vDnH+HgFIa5hJZkAzVoN6cb2esFXMS4zpu9rOfOF20eLhbDOdNuPyqRV7aqn5s+4lHrDtKK/HCOHwL0Gqcw4sVIq9tVT82fcDgNK7PM4PGmcQyVWb1r88dN7x/m/pJRJoJd8rex8I8ZaLnxLsT5Na6wZ1iyKUzQvSKRF9Apty1t9QcAKADRCvIy68Lg40iuysWHq1WswCagBxujz3LqDLFBWNaOoZ/EpddTEHzbpszLgxhcQOTR+pg8Saql/Ku7QX/6qUAGRlfKXAoE1Er4WYg5fkZ+j8o6p4W7+Qar1XBVd61tTA50StiuV4DSteMeTEaZZ9g/cA04EoOAFzvsS8q0ToWIAueW/jGSCZHQak3rpmY6sSACVsOrhpiCA0NnIwlWU6uefIaXJrbvA1elcL1xvC6HUCw4XhvEvQ1leCAhRQoWWZOXGCtReQN25VpjRASbZBQPGrulxxAMxqvnmFP8AcvsAaKzX+6eiXQoYqgrVMrOrX9zijO8sX/mDVFIymhlxnFlY1i2I2cLQa1BG/wBU301Z01tXNaRudAvJfDWKhRgeqjVbfnKhjEkytCNJpw6TK7yzpsaLcVXqASL4OJQOXGtquIebN63CMAFWaXmFRMItqNHIVZT0D2C2AK8b4fN7+wHgJWMKuOddKu//AFGRusOEfE6xxjsRoofbP0flOKeFu/8ABuBZy6ubUwA2aKfFwshTQdAW6Ndn6m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1m149ZtePWbXj1nCoKUxs1P0flOKeFu/lfZSWuKubOq8VqVMZcQaymaWvCmYywg1lM0teFMsFZdLpoQcxPTXhG0GZgbrPEHjXPligzh3VS7ethf7zDFxDI0L0cLw7RWamxw+xik0yaR+qGCMCuRvGPmPT/60DLoZy1+oDVFtVzR5mDDfeOuw9UomNVu68BKU0MMRaUcmv3ESA4LiFnzcQQH24oN4w44c479ZAwBK+VgvSHEWqiqMKy3DshcJSQ6tWZ29gqA3ywvHC48dVM1EPX9P8bZyCa9HcT85UonNXLWGWOaoMFqENOitReC4vhUzKtGiwADUN1oOjdMAxogFtWbBSXi7rhMkp5CtBYurJ4jnDKivli9a/wDaEtZkB34S4JazFHflanhbs/R+U4p4W7+datTBfGkFBBadTnBQQWnU5x2wWmk6Mp6tYIrSnWF+wqtBsHaw+pcdPoqwofqJJNGRpFJ0SM2QJAoYC+RR9SsKKinLVvVo+prXDAPWpqP9sOqoEoK6pYV2GzbjdiwiwhlshEOmDG0zNBW60os4Z/ExZxLZclPHiYdpgSiURlrj5fuKBOaG6FjVcrB6k1OwbLM0TlFQqqi2Batr4Pr/ABmSIUKz9QFs+5HtEZ7/AL0Ut5uqKe8j2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9oj2iPaI9ogJlVqrW7c/R+U4p4W7+aQ7KrpVo2uCBoF9F1dcrxcUHlW8HWnk7MWWssAF7XelmuIPMLVxV6Z34c4BbKrKdOjW8mIonFAzdLfriQ1NicOHiczJkxAUxHxtoPJ2YjSgGA0tzz23iWpi8NBpTmDxMQKAl4MkEPBoFeZq7v6PGpjwSvSxqLZHKs8F/0QFtjnBfuBNI2IqaPN/wCC/R+U4p4W7+cY4QKSTKwwWUwEmpTsywuG4dXnBACbw6tcit1x/cbIwVqK+VpX9xWt9DrIiUxyb/Mw29UK4OeeXCY1U0VFHCzwtv4llvWqhTY89MyyVDDQS1TKzq1/cRAu4OTM64f6lihfqgAm2FJg/viSi0NG1z4UYmwQgesbAqsVw1ZZEyED9XK0FsK//f8AQBU3GNUMoQtVRwf+C/R+U4p4W7/X4f4smGOZq/uDw10aV/T/AMF+j8pxTwt38nGHoHNqta1dWC24kOuSnOiXwu7lxjJltXLQq8la1pBMLtUBmSC6Ya5Q3xmZoKXTDiGUjM0mBY603XUY1uZxdy3rQ+UBhRF0BdnVX4EH4q84DSgRXFbz0qNm9cNboKMq3rMED1fmAga43rWkoI4d1Uu3rYX+8xqug0vCFuJlJYIjaBDqt05kO3q4uC5EDeemIjBGaKosvxRDvXkTANQyXlcQ0umEOgv1ACXA6kVVpTgfEBmgK5rj5J+cscOUShpgXQcHCwiKRKVqwBeLri5YYGWiReefWCamdJURjm6sxsKOktYR0EAJcDqRVWlOB8Qchucq1DzmG0U0vW1f0SBYNdX+L5q/n+DY3AfSnmHGirGV8zRkB3ReX40P+C/R+U4p4W7+fyBtmsWVUFlSNKOFRYEChKhyuMpyZWi6XctzvFyAkjFUpeqKfMcCEzthunawZgKGFUC3V3V+ZSoqpQppZxmmXIYviYA2vRoUF8qD6nHDRbYqu3NoztC/YVWg2DtYfUaFwAKvAUHwRRqCCVZNA5VDQ8AUcJSfJhjQTGgUFB0KPqF8CQrebnXEyJ1asMlONxrpEKswnT4nNXGnUy83LndjQ7SCIgNPwfUVvrmow5Xyltm0VraXT8W/bABFqs2NZznEDIhoW6WtHyr8xCrMJ0+IGAlA7TdJ55c7soTy21cwdKF+4dEKCaAAH0fwmp0FMf1CBsmlj/gJSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSl7maz9H5Tinhbv+iHBml8z9H5Tin/2Q=="}}]);