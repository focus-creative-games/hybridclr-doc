"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[687],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),d=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return i.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,p=r(e,["components","mdxType","originalType","parentName"]),c=d(n),m=a,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||l;return n?i.createElement(h,o(o({ref:t},p),{},{components:n})):i.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[c]="string"==typeof e?e:a,o[1]=r;for(var d=2;d<l;d++)o[d]=n[d];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1733:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>d});var i=n(7462),a=(n(7294),n(3905));const l={},o="Getting started",r={unversionedId:"beginner/quickstart",id:"beginner/quickstart",title:"Getting started",description:"This tutorial guides you to experience HybridCLR hot update from an empty project. For the sake of simplicity, only the case where the BuildTarget is Windows or MacOS Standalone platform is demonstrated.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/beginner/quickstart.md",sourceDirName:"beginner",slug:"/beginner/quickstart",permalink:"/en/docs/beginner/quickstart",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u65b0\u624b\u6559\u7a0b",permalink:"/en/docs/beginner"},next:{title:"Use MonoBehaviour",permalink:"/en/docs/beginner/monobehaviour"}},s={},d=[{value:"Experience Goals",id:"experience-goals",level:2},{value:"Prepare the environment",id:"prepare-the-environment",level:2},{value:"Install Unity",id:"install-unity",level:3},{value:"Install IDE and related compilation environment",id:"install-ide-and-related-compilation-environment",level:3},{value:"Initialize the Unity hot update project",id:"initialize-the-unity-hot-update-project",level:2},{value:"Create project",id:"create-project",level:3},{value:"Create <code>ConsoleToScreen.cs</code> script",id:"create-consoletoscreencs-script",level:3},{value:"Create the main scene",id:"create-the-main-scene",level:3},{value:"Create HotUpdate hot update module",id:"create-hotupdate-hot-update-module",level:3},{value:"Install and configure HybridCLR",id:"install-and-configure-hybridclr",level:2},{value:"Install <code>com.code-philosophy.hybridclr</code> package",id:"install-comcode-philosophyhybridclr-package",level:3},{value:"Initialize <code>com.code-philosophy.hybridclr</code>",id:"initialize-comcode-philosophyhybridclr",level:3},{value:"Configure HybridCLR",id:"configure-hybridclr",level:3},{value:"Configure PlayerSettings",id:"configure-playersettings",level:3},{value:"Create hot update script",id:"create-hot-update-script",level:2},{value:"Load hot update assembly",id:"load-hot-update-assembly",level:2},{value:"Call hot update code",id:"call-hot-update-code",level:2},{value:"Trial run in Editor",id:"trial-run-in-editor",level:2},{value:"Package and run",id:"package-and-run",level:2},{value:"Test hot update",id:"test-hot-update",level:2}],p={toc:d},c="wrapper";function u(e){let{components:t,...l}=e;return(0,a.kt)(c,(0,i.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"getting-started"},"Getting started"),(0,a.kt)("p",null,"This tutorial guides you to experience HybridCLR hot update from an empty project. For the sake of simplicity, only the case where the BuildTarget is ",(0,a.kt)("strong",{parentName:"p"},"Windows")," or ",(0,a.kt)("strong",{parentName:"p"},"MacOS")," Standalone platform is demonstrated."),(0,a.kt)("p",null,"Please run through the hot update process correctly on the Standalone platform and then try the hot update on the Android and iOS platforms. Their processes are very similar."),(0,a.kt)("h2",{id:"experience-goals"},"Experience Goals"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Create hot update assembly"),(0,a.kt)("li",{parentName:"ul"},"Load the hot update assembly and execute the hot update code, print ",(0,a.kt)("inlineCode",{parentName:"li"},"Hello, HybridCLR")),(0,a.kt)("li",{parentName:"ul"},"Modify the hot update code to print ",(0,a.kt)("inlineCode",{parentName:"li"},"Hello, World"))),(0,a.kt)("h2",{id:"prepare-the-environment"},"Prepare the environment"),(0,a.kt)("h3",{id:"install-unity"},"Install Unity"),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"HybridCLR also supports 2019.4.x, but beginners must install the appropriate version according to the following requirements, and do not install the 2019 version on their own. After running through the process, carefully read the ",(0,a.kt)("a",{parentName:"p",href:"/en/docs/basic/install"},"Install HybridCLR")," document and try other versions.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Install any version of 2020.3.26+, 2021.3.0+, 2022.3.0+. If you are not an experienced Unity developer, version 2021.3.1 is recommended."),(0,a.kt)("li",{parentName:"ul"},"Depending on your operating system, when selecting modules during installation, you must select ",(0,a.kt)("inlineCode",{parentName:"li"},"Windows Build Support(IL2CPP)")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"Mac Build Support(IL2CPP)"),".")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"select il2cpp modules",src:n(8581).Z,width:"721",height:"507"})),(0,a.kt)("h3",{id:"install-ide-and-related-compilation-environment"},"Install IDE and related compilation environment"),(0,a.kt)("p",null,"-Windows"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Under Win, you need to install ",(0,a.kt)("inlineCode",{parentName:"li"},"visual studio 2019")," or later. The installation must include at least the ",(0,a.kt)("inlineCode",{parentName:"li"},"Game Development with Unity")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"Game Development with C++")," components."),(0,a.kt)("li",{parentName:"ul"},"install git\n-Mac"),(0,a.kt)("li",{parentName:"ul"},"Requires MacOS version >= 12, xcode version >= 13, for example ",(0,a.kt)("inlineCode",{parentName:"li"},"xcode 13.4.1, macos 12.4"),"."),(0,a.kt)("li",{parentName:"ul"},"install git"),(0,a.kt)("li",{parentName:"ul"},"install cmake")),(0,a.kt)("h2",{id:"initialize-the-unity-hot-update-project"},"Initialize the Unity hot update project"),(0,a.kt)("p",null,"The process of constructing a hot update project from scratch is tedious. The project structure, resources and codes can refer to the hybridclr_trial project, and its warehouse address is ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr_trial"},"github")," or ",(0,a.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/hybridclr_trial"}," gitee"),"."),(0,a.kt)("h3",{id:"create-project"},"Create project"),(0,a.kt)("p",null,"Create an empty Unity project."),(0,a.kt)("h3",{id:"create-consoletoscreencs-script"},"Create ",(0,a.kt)("inlineCode",{parentName:"h3"},"ConsoleToScreen.cs")," script"),(0,a.kt)("p",null,"This script has no direct effect on demonstrating hot updates. It can print the log to the screen, which is convenient for locating errors."),(0,a.kt)("p",null,"Create ",(0,a.kt)("inlineCode",{parentName:"p"},"Assets/ConsoleToScreen.cs")," script class, the code is as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'using System;\nusing System. Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\n\npublic class ConsoleToScreen : MonoBehaviour\n{\n     const int maxLines = 50;\n     const int maxLineLength = 120;\n     private string _logStr = "";\n\n     private readonly List<string>_lines = new List<string>();\n\n     public int fontSize = 15;\n\n     void OnEnable() { Application. logMessageReceived += Log; }\n     void OnDisable() { Application. logMessageReceived -= Log; }\n\n     public void Log(string logString, string stackTrace, LogType type)\n     {\n         foreach (var line in logString. Split(\'\\n\'))\n         {\n             if (line. Length <= maxLineLength)\n             {\n                 _lines. Add(line);\n                 continue;\n             }\n             var lineCount = line.Length / maxLineLength + 1;\n             for (int i = 0; i < lineCount; i++)\n             {\n                 if ((i + 1) * maxLineLength <= line.Length)\n                 {\n                     _lines.Add(line.Substring(i * maxLineLength, maxLineLength));\n                 }\n                 else\n                 {\n                     _lines.Add(line.Substring(i * maxLineLength, line.Length - i * maxLineLength));\n                 }\n             }\n         }\n         if (_lines. Count > maxLines)\n         {\n             _lines. RemoveRange(0, _lines. Count - maxLines);\n         }\n         _logStr = string. Join("\\n", _lines);\n     }\n\n     void OnGUI()\n     {\n         GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity,\n            new Vector3(Screen. width / 1200.0f, Screen. height / 800.0f, 1.0f));\n         GUI.Label(new Rect(10, 10, 800, 370), _logStr, new GUIStyle() { fontSize = Math.Max(10, fontSize) });\n     }\n}\n\n\n')),(0,a.kt)("h3",{id:"create-the-main-scene"},"Create the main scene"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Create default initial scene main.scene"),(0,a.kt)("li",{parentName:"ul"},"Create an empty GameObject in the scene and hang ConsoleToScreen on it"),(0,a.kt)("li",{parentName:"ul"},"Add the main scene to the list of packaged scenes in ",(0,a.kt)("inlineCode",{parentName:"li"},"Build Settings"))),(0,a.kt)("h3",{id:"create-hotupdate-hot-update-module"},"Create HotUpdate hot update module"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Create ",(0,a.kt)("inlineCode",{parentName:"li"},"Assets/HotUpdate")," directory"),(0,a.kt)("li",{parentName:"ul"},"Right-click ",(0,a.kt)("inlineCode",{parentName:"li"},"Create/Assembly Definition")," in the directory to create an assembly module named ",(0,a.kt)("inlineCode",{parentName:"li"},"HotUpdate"))),(0,a.kt)("h2",{id:"install-and-configure-hybridclr"},"Install and configure HybridCLR"),(0,a.kt)("h3",{id:"install-comcode-philosophyhybridclr-package"},"Install ",(0,a.kt)("inlineCode",{parentName:"h3"},"com.code-philosophy.hybridclr")," package"),(0,a.kt)("p",null,"Click ",(0,a.kt)("inlineCode",{parentName:"p"},"Windows/Package Manager")," in the main menu to open the package manager. Click ",(0,a.kt)("inlineCode",{parentName:"p"},"Add package from git URL...")," as shown below, fill in ",(0,a.kt)("inlineCode",{parentName:"p"},"https://gitee.com/focus-creative-games/hybridclr_unity.git")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"https://github.com/focus-creative -games/hybridclr_unity.git"),"."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"add package",src:n(5283).Z,width:"808",height:"223"})),(0,a.kt)("p",null,"If you are not familiar with installing packages from url, please see ",(0,a.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/upm-ui-giturl.html"},"install from giturl"),"."),(0,a.kt)("p",null,"Due to domestic network reasons, you may encounter network exceptions in Unity and fail to install. You can first clone or download ",(0,a.kt)("inlineCode",{parentName:"p"},"com.code-philosophy.hybridclr")," to the local, rename the folder to ",(0,a.kt)("inlineCode",{parentName:"p"},"com.code-philosophy.hybridclr"),", and move it directly to the ",(0,a.kt)("inlineCode",{parentName:"p"},"Packages")," directory of the project."),(0,a.kt)("h3",{id:"initialize-comcode-philosophyhybridclr"},"Initialize ",(0,a.kt)("inlineCode",{parentName:"h3"},"com.code-philosophy.hybridclr")),(0,a.kt)("p",null,"Open the menu ",(0,a.kt)("inlineCode",{parentName:"p"},"HybridCLR/Installer..."),", click the ",(0,a.kt)("inlineCode",{parentName:"p"},"Install")," button to install. Wait patiently for about 30 seconds. After the installation is complete, the ",(0,a.kt)("inlineCode",{parentName:"p"},"Installation Successful")," log will be printed at the end."),(0,a.kt)("h3",{id:"configure-hybridclr"},"Configure HybridCLR"),(0,a.kt)("p",null,"Open the menu ",(0,a.kt)("inlineCode",{parentName:"p"},"HybridCLR/Settings"),", add the ",(0,a.kt)("inlineCode",{parentName:"p"},"HotUpdate")," assembly in the ",(0,a.kt)("inlineCode",{parentName:"p"},"Hot Update Assemblies")," configuration item, as shown below:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"settings",src:n(2035).Z,width:"1129",height:"793"})),(0,a.kt)("h3",{id:"configure-playersettings"},"Configure PlayerSettings"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Turn off the incremental GC (Use Incremental GC) option. Because incremental GC is not currently supported."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Scripting Backend")," switched to ",(0,a.kt)("inlineCode",{parentName:"li"},"IL2CPP"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Api Compatability Level")," switched to ",(0,a.kt)("inlineCode",{parentName:"li"},".Net 4.x")," (Unity 2019-2020) or ",(0,a.kt)("inlineCode",{parentName:"li"},".Net Framework")," (Unity 2021+).")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"player settings",src:n(5333).Z,width:"716",height:"386"})),(0,a.kt)("h2",{id:"create-hot-update-script"},"Create hot update script"),(0,a.kt)("p",null,"Create ",(0,a.kt)("inlineCode",{parentName:"p"},"Assets/HotUpdate/Hello.cs")," file, the code content is as follows"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'using System. Collections;\nusing UnityEngine;\n\npublic class Hello\n{\n     public static void Run()\n     {\n         Debug. Log("Hello, HybridCLR");\n     }\n}\n')),(0,a.kt)("p",null,"You may be concerned about whether the code in the hot update part has restrictions on C# syntax like other solutions. HybridCLR is a nearly complete implementation, and there are almost no restrictions on hot update code, so let's write it by ourselves."),(0,a.kt)("p",null,"See ",(0,a.kt)("a",{parentName:"p",href:"/en/docs/basic/notsupportedfeatures"},"Unsupported Features")," for rare exceptions."),(0,a.kt)("h2",{id:"load-hot-update-assembly"},"Load hot update assembly"),(0,a.kt)("p",null,"In order to simplify the demonstration, we do not download HotUpdate.dll through the http server, but directly put HotUpdate.dll in the StreamingAssets directory."),(0,a.kt)("p",null,"HybridCLR is a native runtime implementation, so call ",(0,a.kt)("inlineCode",{parentName:"p"},"Assembly Assembly.Load(byte[])")," to load the hot update assembly."),(0,a.kt)("p",null,"Create the ",(0,a.kt)("inlineCode",{parentName:"p"},"Assets/LoadDll.cs")," script, then ",(0,a.kt)("strong",{parentName:"p"},"create a GameObject object in the main scene, mount the LoadDll script"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'using HybridCLR;\nusing System;\nusing System. Collections;\nusing System.Collections.Generic;\nusing System.IO;\nusing System. Linq;\nusing System. Reflection;\nusing System. Threading. Tasks;\nusing UnityEngine;\nusing UnityEngine. Networking;\npublic class LoadDll : MonoBehaviour\n{\n\n     void Start()\n     {\n       // In the Editor environment, HotUpdate.dll.bytes has been automatically loaded and does not need to be loaded. Repeated loading will cause problems.\n#if !UNITY_EDITOR\n         Assembly hotUpdateAss = Assembly.Load(File.ReadAllBytes($"{Application.streamingAssetsPath}/HotUpdate.dll.bytes"));\n#else\n       // No need to load under Editor, directly find the HotUpdate assembly\n         Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");\n#endif\n     }\n}\n\n')),(0,a.kt)("h2",{id:"call-hot-update-code"},"Call hot update code"),(0,a.kt)("p",null,"Obviously, the main project cannot directly reference the hot update code. There are many ways to call the code in the hot update assembly from the main project. Here, the hot update code is called through reflection."),(0,a.kt)("p",null,"Add the reflection calling code after the ",(0,a.kt)("inlineCode",{parentName:"p"},"LoadDll.Start")," function, the final code is as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'     void Start()\n     {\n       // In the Editor environment, HotUpdate.dll.bytes has been automatically loaded and does not need to be loaded. Repeated loading will cause problems.\n#if !UNITY_EDITOR\n         Assembly hotUpdateAss = Assembly.Load(File.ReadAllBytes($"{Application.streamingAssetsPath}/HotUpdate.dll.bytes"));\n#else\n       // No need to load under Editor, directly find the HotUpdate assembly\n         Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");\n#endif\n    \n         Type type = hotUpdateAss. GetType("Hello");\n         type. GetMethod("Run"). Invoke(null, null);\n     }\n\n')),(0,a.kt)("p",null,"So far, the creation of the entire hot update project has been completed! ! !"),(0,a.kt)("h2",{id:"trial-run-in-editor"},"Trial run in Editor"),(0,a.kt)("p",null,"Run the main scene, 'Hello, HybridCLR' will be displayed on the screen, indicating that the code is working normally."),(0,a.kt)("h2",{id:"package-and-run"},"Package and run"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Run the menu ",(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/All")," to perform the necessary generation operations. ",(0,a.kt)("strong",{parentName:"li"},"This step cannot be missed"),"!!!"),(0,a.kt)("li",{parentName:"ul"},"Copy HotUpdate.dll in ",(0,a.kt)("inlineCode",{parentName:"li"},"{proj}/HybridCLRData/HotUpdateDlls/StandaloneWindows64 (StandaloneMacXxx under MacOS)")," directory to ",(0,a.kt)("inlineCode",{parentName:"li"},"Assets/StreamingAssets/HotUpdate.dll.bytes"),", ",(0,a.kt)("strong",{parentName:"li"},"Note"),", you must add ",(0,a.kt)("inlineCode",{parentName:"li"},".bytes "),"Suffix! ! !"),(0,a.kt)("li",{parentName:"ul"},"Open the ",(0,a.kt)("inlineCode",{parentName:"li"},"Build Settings")," dialog box, click ",(0,a.kt)("inlineCode",{parentName:"li"},"Build And Run"),", package and run the hot update sample project.")),(0,a.kt)("p",null,"If the packaging is successful, and 'Hello, HybridCLR' is displayed on the screen, it means that the hot update code has been successfully executed!"),(0,a.kt)("h2",{id:"test-hot-update"},"Test hot update"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Modify the ",(0,a.kt)("inlineCode",{parentName:"li"},'Debug.Log("Hello, HybridCLR");')," code in the Run function of ",(0,a.kt)("inlineCode",{parentName:"li"},"Assets/HotUpdate/Hello.cs")," to ",(0,a.kt)("inlineCode",{parentName:"li"},'Debug.Log("Hello, World");'),"."),(0,a.kt)("li",{parentName:"ul"},"Run the menu command ",(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/CompileDll/ActiveBulidTarget")," to recompile the hot update code."),(0,a.kt)("li",{parentName:"ul"},"Copy HotUpdate.dll in the ",(0,a.kt)("inlineCode",{parentName:"li"},"{proj}/HybridCLRData/HotUpdateDlls/StandaloneWindows64 (StandaloneMacXxx under MacOS)")," directory to ",(0,a.kt)("inlineCode",{parentName:"li"},"XXX_Data/StreamingAssets/HotUpdate.dll.bytes")," in the package output directory just now."),(0,a.kt)("li",{parentName:"ul"},"Re-run the program, and you will find ",(0,a.kt)("inlineCode",{parentName:"li"},"Hello, World")," displayed on the screen, indicating that the hot update code has taken effect!")),(0,a.kt)("p",null,"This completes the hot update experience! ! !"))}u.isMDXComponent=!0},5283:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/install_hybridclrunity_package-9a53b1ee8f7ffd8a700ed1f977ca74e3.jpg"},5333:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/player-setting-8e2d11f023bda2ec70c4ddd7f3b1b815.png"},8581:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/select_il2cpp_modules-d895c3fb5390e04b53e40ada2b422239.jpg"},2035:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/settings-d70a8f4ec98d703cc588cc110dc5a57c.jpg"}}]);