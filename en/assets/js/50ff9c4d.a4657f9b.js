"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7906],{3905:(e,t,i)=>{i.d(t,{Zo:()=>c,kt:()=>m});var n=i(7294);function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function a(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?a(Object(i),!0).forEach((function(t){l(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function r(e,t){if(null==e)return{};var i,n,l=function(e,t){if(null==e)return{};var i,n,l={},a=Object.keys(e);for(n=0;n<a.length;n++)i=a[n],t.indexOf(i)>=0||(l[i]=e[i]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)i=a[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(l[i]=e[i])}return l}var s=n.createContext({}),p=function(e){var t=n.useContext(s),i=t;return e&&(i="function"==typeof e?e(t):o(o({},t),e)),i},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var i=e.components,l=e.mdxType,a=e.originalType,s=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),d=p(i),u=l,m=d["".concat(s,".").concat(u)]||d[u]||h[u]||a;return i?n.createElement(m,o(o({ref:t},c),{},{components:i})):n.createElement(m,o({ref:t},c))}));function m(e,t){var i=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=i.length,o=new Array(a);o[0]=u;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[d]="string"==typeof e?e:l,o[1]=r;for(var p=2;p<a;p++)o[p]=i[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,i)}u.displayName="MDXCreateElement"},7976:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>p});var n=i(7462),l=(i(7294),i(3905));const a={},o="Install HybridCLR",r={unversionedId:"basic/install",id:"basic/install",title:"Install HybridCLR",description:"Install a compatible Unity version",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/basic/install.md",sourceDirName:"basic",slug:"/basic/install",permalink:"/en/docs/basic/install",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"HybridCLR code structure and version",permalink:"/en/docs/basic/architecture"},next:{title:"Configure HybridCLR",permalink:"/en/docs/basic/projectsettings"}},s={},p=[{value:"Install a compatible Unity version",id:"install-a-compatible-unity-version",level:2},{value:"Install IDE and related tools",id:"install-ide-and-related-tools",level:2},{value:"Select <code>com.code-philosophy.hybridclr</code> version",id:"select-comcode-philosophyhybridclr-version",level:3},{value:"Install the <code>com.code-philosophy.hybridclr</code> package",id:"install-the-comcode-philosophyhybridclr-package",level:2},{value:"Install from git url",id:"install-from-git-url",level:3},{value:"Install from openupm",id:"install-from-openupm",level:3},{value:"Install from local files",id:"install-from-local-files",level:3},{value:"Initialize HybridCLR",id:"initialize-hybridclr",level:2},{value:"If your version &gt;= v2.0.5",id:"if-your-version--v205",level:3},{value:"If your version &gt;= 1.1.20",id:"if-your-version--1120",level:3},{value:"If your package version &lt;= 1.1.19",id:"if-your-package-version--1119",level:3},{value:"Special handling after installation",id:"special-handling-after-installation",level:2},{value:"WebGL Platform",id:"webgl-platform",level:3},{value:"Unity 2019",id:"unity-2019",level:3},{value:"Using HybridCLR in non-compatible versions of Unity",id:"using-hybridclr-in-non-compatible-versions-of-unity",level:2},{value:"How <code>HybridCLR/Installer</code> works",id:"how-hybridclrinstaller-works",level:2},{value:"Replace libil2cpp code",id:"replace-libil2cpp-code",level:3},{value:"Local installation",id:"local-installation",level:3},{value:"Global installation",id:"global-installation",level:3},{value:"Precautions",id:"precautions",level:2}],c={toc:p},d="wrapper";function h(e){let{components:t,...a}=e;return(0,l.kt)(d,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"install-hybridclr"},"Install HybridCLR"),(0,l.kt)("h2",{id:"install-a-compatible-unity-version"},"Install a compatible Unity version"),(0,l.kt)("p",null,"Any version of 2019.4.x, 2020.3.x, 2021.3.x, or 2022.3.x is supported. It is recommended to install versions 2019.4.40, 2020.3.26+, 2021.3.x, and 2022.3.x."),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"If your version is 2019.4.0-2019.4.39, ",(0,l.kt)("strong",{parentName:"p"},"Need to switch to 2019.4.40 to complete HybridCLR installation, and then switch back to the current version"),"."),(0,l.kt)("p",{parentName:"admonition"},"If your version is 2020.3.0-2020.3.25, after completing the installation in Installer, copy ",(0,l.kt)("inlineCode",{parentName:"p"},"2020.3.x/Editor/Data/il2cpp/external")," from the installation directory of any version 2020.3.26+ to replace\n",(0,l.kt)("inlineCode",{parentName:"p"},"{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/external"),".")),(0,l.kt)("admonition",{type:"caution"},(0,l.kt)("p",{parentName:"admonition"},"If you are not an experienced Unity developer, it is recommended to use version 2021.3.1 to experience HybridCLR first.")),(0,l.kt)("p",null,"According to the target platform you packaged, select the necessary modules during the installation process. If you package Android or iOS, just select the corresponding module directly. If you want to package Standalone, you must additionally select ",(0,l.kt)("inlineCode",{parentName:"p"},"Windows Build Support(IL2CPP)")," or ",(0,l.kt)("inlineCode",{parentName:"p"},"Mac Build Support(IL2CPP)"),"."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"select il2cpp modules",src:i(8581).Z,width:"721",height:"507"})),(0,l.kt)("h2",{id:"install-ide-and-related-tools"},"Install IDE and related tools"),(0,l.kt)("p",null,"-Windows"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Under Win, you need to install ",(0,l.kt)("inlineCode",{parentName:"li"},"visual studio 2019")," or later. The installation must include at least the ",(0,l.kt)("inlineCode",{parentName:"li"},"Game Development with Unity")," and ",(0,l.kt)("inlineCode",{parentName:"li"},"Game Development with C++")," components."),(0,l.kt)("li",{parentName:"ul"},"install git\n-Mac"),(0,l.kt)("li",{parentName:"ul"},"Requires MacOS version >= 12, xcode version >= 13, for example ",(0,l.kt)("inlineCode",{parentName:"li"},"xcode 13.4.1, macos 12.4"),"."),(0,l.kt)("li",{parentName:"ul"},"install git"),(0,l.kt)("li",{parentName:"ul"},"install cmake")),(0,l.kt)("h3",{id:"select-comcode-philosophyhybridclr-version"},"Select ",(0,l.kt)("inlineCode",{parentName:"h3"},"com.code-philosophy.hybridclr")," version"),(0,l.kt)("admonition",{type:"caution"},(0,l.kt)("p",{parentName:"admonition"},"Before v3.0.0 the package name was ",(0,l.kt)("inlineCode",{parentName:"p"},"com.focus-creative-games.hybridclr_unity"),".")),(0,l.kt)("p",null,"Currently there are three series of versions: ",(0,l.kt)("inlineCode",{parentName:"p"},"1.0")," branch, ",(0,l.kt)("inlineCode",{parentName:"p"},"v2.x.y")," series, ",(0,l.kt)("inlineCode",{parentName:"p"},"v3.x.y")," (also the current main branch) series."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"The ",(0,l.kt)("inlineCode",{parentName:"li"},"1.0")," branch is too old. Although the work is stable, the Package-related workflow is relatively old, not as convenient as the subsequent versions, and maintenance has been stopped. It is strongly recommended not to use it again."),(0,l.kt)("li",{parentName:"ul"},"The tag version of ",(0,l.kt)("inlineCode",{parentName:"li"},"v2.x.y")," series has a reasonable workflow optimization and has been verified by a large number of projects. It is recommended to use the Unity 2019 version or the project that will be launched soon."),(0,l.kt)("li",{parentName:"ul"},"The ",(0,l.kt)("inlineCode",{parentName:"li"},"v3.x.y")," series tag versions ",(0,l.kt)("strong",{parentName:"li"},"removed support for Unity 2019"),", and added ",(0,l.kt)("inlineCode",{parentName:"li"},"2022")," version support. It is recommended to use Unity 2020+ versions, and it is used by projects in early phase.")),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"The versions of these three series are very stable, so there is no need to worry about which one is better. Generally speaking, the newer the version, the more optimizations and the better the user experience.")),(0,l.kt)("h2",{id:"install-the-comcode-philosophyhybridclr-package"},"Install the ",(0,l.kt)("inlineCode",{parentName:"h2"},"com.code-philosophy.hybridclr")," package"),(0,l.kt)("p",null,"The warehouse address is ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr_unity"},"github"),", and the domestic fast mirror warehouse is ",(0,l.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/hybridclr_unity"},"gitee")," ."),(0,l.kt)("p",null,"There are three installation methods:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Install from git url using Package Manager"),(0,l.kt)("li",{parentName:"ul"},"Install from openupm using Package Manager"),(0,l.kt)("li",{parentName:"ul"},"local installation")),(0,l.kt)("h3",{id:"install-from-git-url"},"Install from git url"),(0,l.kt)("p",null,"Click ",(0,l.kt)("inlineCode",{parentName:"p"},"Windows/Package Manager")," in the main menu to open the package manager. Click ",(0,l.kt)("inlineCode",{parentName:"p"},"Add package from git URL...")," as shown below, fill in ",(0,l.kt)("inlineCode",{parentName:"p"},"https://gitee.com/focus-creative-games/hybridclr_unity.git")," or ",(0,l.kt)("inlineCode",{parentName:"p"},"https://github.com/focus-creative -games/hybridclr_unity.git"),"."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"The main branch address is ",(0,l.kt)("inlineCode",{parentName:"li"},"https://gitee.com/focus-creative-games/hybridclr_unity.git")),(0,l.kt)("li",{parentName:"ul"},"Other tag version addresses are ",(0,l.kt)("inlineCode",{parentName:"li"},"https://gitee.com/focus-creative-games/hybridclr_unity.git#{tag}"))),(0,l.kt)("p",null,"If you want to install a certain branch or tag version, please add ",(0,l.kt)("inlineCode",{parentName:"p"},"#{tag}")," after the address, such as ",(0,l.kt)("inlineCode",{parentName:"p"},"https://gitee.com/focus-creative-games/hybridclr_unity.git#v3.0.1"),"."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"add package",src:i(5283).Z,width:"808",height:"223"})),(0,l.kt)("p",null,"If you are not familiar with installing packages from url, please see ",(0,l.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/upm-ui-giturl.html"},"install from giturl"),"."),(0,l.kt)("h3",{id:"install-from-openupm"},"Install from openupm"),(0,l.kt)("p",null,"openump address ",(0,l.kt)("a",{parentName:"p",href:"https://openupm.com/packages/com.focus-creative-games.hybridclr_unity/"},"com.focus-creative-games.hybridclr_unity"),"."),(0,l.kt)("p",null,"For the specific installation method, please open this link and view the detailed installation instructions on the page."),(0,l.kt)("h3",{id:"install-from-local-files"},"Install from local files"),(0,l.kt)("p",null,"After cloning the warehouse locally, rename the directory to ",(0,l.kt)("inlineCode",{parentName:"p"},"com.code-philosophy.hybridclr")," (for versions before v3.0.0, please use ",(0,l.kt)("inlineCode",{parentName:"p"},"com.focus-creative-games.hybridclr_unity"),"), and then directly move to the Packages directory of the project. Can."),(0,l.kt)("h2",{id:"initialize-hybridclr"},"Initialize HybridCLR"),(0,l.kt)("p",null,"In order to reduce the size of the package itself, some files need to be copied from the Unity Editor installation directory. Therefore, after installing the plug-in, an additional initialization process is required."),(0,l.kt)("p",null,"Click the menu ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/Installer...")," to pop up the installation interface. Some setup may be required before clicking install. Since the Installer has been adjusted as the version changes, please read the corresponding instructions below according to your current version."),(0,l.kt)("h3",{id:"if-your-version--v205"},"If your version >= v2.0.5"),(0,l.kt)("p",null,"The branch or tag compatible with hybridclr and il2cpp_plus corresponding to the current package version has been configured in the ",(0,l.kt)("inlineCode",{parentName:"p"},"Data~/hybridclr_version.json")," file in com.code-philosophy.hybridclr.\nThe Installer will install the version specified in the configuration, and no longer supports customizing the version to be installed."),(0,l.kt)("p",null,"The configuration looks like this:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n     "versions": [\n     {\n         "unity_version": "2019",\n         "hybridclr" : { "branch": "v2.0.1"},\n         "il2cpp_plus": { "branch": "v2019-2.0.1"}\n     },\n     {\n         "unity_version": "2020",\n         "hybridclr" : { "branch": "v2.0.1"},\n         "il2cpp_plus": { "branch": "v2020-2.0.1"}\n     },\n     {\n         "unity_version": "2021",\n         "hybridclr" : { "branch": "v2.0.1"},\n         "il2cpp_plus": { "branch": "v2021-2.0.1"}\n     }\n     ]\n}\n')),(0,l.kt)("p",null,"If you must install other versions of hybridclr or il2cpp_plus, modify the branch in the configuration file to be the target branch or tag."),(0,l.kt)("p",null,"In most cases, just click ",(0,l.kt)("inlineCode",{parentName:"p"},"Install")," to download and install from the remote repository by default. After the installation is successful, the console will print the ",(0,l.kt)("inlineCode",{parentName:"p"},"installation successful")," log. As shown below."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"install_default",src:i(8648).Z,width:"802",height:"196"})),(0,l.kt)("p",null,"From version 2.3.1 onwards, it supports copying and installing directly from the libil2cpp directory that contains hybridclr made locally. If your network is not good, or git is not installed and you cannot download and install remotely from the warehouse, you can first ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/il2cpp_plus"},"il2cpp_plus")," and ","[hybridclr]","(https:/ /github.com/focus-creative-games/hybridclr) is downloaded to the local, and then according to the document in the ",(0,l.kt)("strong",{parentName:"p"},"Installation Principle")," section below, the libil2cpp directory containing hybridclr is merged from these two warehouses, and then installed in ",(0,l.kt)("inlineCode",{parentName:"p"},"Installer")," Enable ",(0,l.kt)("inlineCode",{parentName:"p"},"Copy libil2cpp from local")," option in the interface, select the libil2cpp directory you made, and click ",(0,l.kt)("inlineCode",{parentName:"p"},"Install")," to execute the installation. As shown below."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"install",src:i(5568).Z,width:"814",height:"216"})),(0,l.kt)("h3",{id:"if-your-version--1120"},"If your version >= 1.1.20"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"Data~/hybridclr_version.json")," file in com.code-philosophy.hybridclr has been configured with the version compatible with hybridclr and il2cpp_plus corresponding to the current package version.\nThe Installer will install the version specified in the configuration, and no longer supports customizing the version to be installed."),(0,l.kt)("p",null,"The configuration looks like this:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n     "versions": [\n     {\n         "unity_version": "2019",\n         "hybridclr" : { "branch": "main", "hash": "531f98365eebce5d1390175be2b41c41e217d918"},\n         "il2cpp_plus": { "branch": "2019-main", "hash": "ebe5190b0404d1857832bd1d52ebec7c3730a01d"}\n     },\n     {\n         "unity_version": "2020",\n         "hybridclr" : { "branch": "main", "hash": "531f98365eebce5d1390175be2b41c41e217d918"},\n         "il2cpp_plus": { "branch": "2020-main", "hash": "c6cf54285381d0b03a58126e0d39b6e4d11937b7"}\n     },\n     {\n         "unity_version": "2021",\n         "hybridclr" : { "branch": "main", "hash": "531f98365eebce5d1390175be2b41c41e217d918"},\n         "il2cpp_plus": { "branch": "2021-main", "hash": "99cd1cbbfc1f637460379e81c9a7776cd3e662ad"}\n     }\n     ]\n}\n\n')),(0,l.kt)("p",null,"If you want to install other versions of hybridclr or il2cpp_plus, just modify the branch and hash in the configuration file."),(0,l.kt)("p",null,"Just click ",(0,l.kt)("inlineCode",{parentName:"p"},"Install")," to complete the installation. After the installation is successful, the console will print the ",(0,l.kt)("inlineCode",{parentName:"p"},"installation successful")," log."),(0,l.kt)("h3",{id:"if-your-package-version--1119"},"If your package version <= 1.1.19"),(0,l.kt)("p",null,"Fill in the commit id or branch or tag of the hybridclr and il2cpp_plus warehouses you want to install. If the version number of hybridclr is left blank, install the latest version from the main branch of the hybridclr repository.\nIf the version number of il2cpp_plus is left blank, install the latest version of the main branch of the corresponding annual release (such as 2020-main)."),(0,l.kt)("p",null,"**hybridclr_uniyt branch"),(0,l.kt)("p",null,", The branch of the hybridclr warehouse and the branch of the il2cpp_plus warehouse must match**. If you use the main branch of com.code-philosophy.hybridclr, hybridclr must use the main branch, il2cpp_plus must use ",(0,l.kt)("inlineCode",{parentName:"p"},"{version}-main"),", if your hybridclr_unity uses the 1.0 branch, then hybridclr must use the ",(0,l.kt)("inlineCode",{parentName:"p"},"1.0")," branch, il2cpp_plus The ",(0,l.kt)("inlineCode",{parentName:"p"},"{version}-1.0")," branch must be used. If you use a version of a tag, make sure the branch the tag belongs to matches."),(0,l.kt)("p",null,"The hybridclr warehouse recommends filling in ",(0,l.kt)("inlineCode",{parentName:"p"},"1.0"),", that is, the latest version of the 1.0 branch is installed each time; the il2cpp_plus warehouse recommends filling in ",(0,l.kt)("inlineCode",{parentName:"p"},"{annual version}-1.0")," (such as 2020-1.0), that is, each installation of the ",(0,l.kt)("inlineCode",{parentName:"p"},"{annual version}-1.0")," branch latest version of . As shown in the picture:"),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"image",src:i(1093).Z,width:"1047",height:"320"})),(0,l.kt)("p",null,"At present, the stable official version 1.0.1 has been released, and it is also recommended for projects that pursue stability. Com.code-philosophy.hybridclr takes ",(0,l.kt)("inlineCode",{parentName:"p"},"1.0.1-release"),", the hybridclr version takes ",(0,l.kt)("inlineCode",{parentName:"p"},"1.0.1-release"),", and the il2cpp_plus version takes ",(0,l.kt)("inlineCode",{parentName:"p"},"{version}-1.0.1-relase"),"."),(0,l.kt)("p",null,"After completing the above settings, click the ",(0,l.kt)("inlineCode",{parentName:"p"},"install")," button to complete the installation. After the installation is successful, the console will print the ",(0,l.kt)("inlineCode",{parentName:"p"},"installation successful")," log."),(0,l.kt)("p",null,"Since the installation process needs to pull the hybridclr and il2cpp_plus warehouses, it may fail due to network failures. If\n",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLRData/hybridclr_repo")," or ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLRData/il2cpp_plus_repo")," is empty when finding failed, please try again."),(0,l.kt)("p",null,"The most common cause of failure is that git is not installed, or UnityEditor and UnityHub have not been restarted after installing git. If you are sure that git is installed and git can indeed be run in cmd, try restarting the computer."),(0,l.kt)("p",null,"If the automated installation cannot be completed due to various special reasons, please refer to the following ",(0,l.kt)("strong",{parentName:"p"},"Installation Principle")," to manually simulate the entire installation process."),(0,l.kt)("h2",{id:"special-handling-after-installation"},"Special handling after installation"),(0,l.kt)("h3",{id:"webgl-platform"},"WebGL Platform"),(0,l.kt)("p",null,"Due to Unity's own reasons, the WebGL platform must be installed globally. See the ",(0,l.kt)("inlineCode",{parentName:"p"},"Global Installation")," documentation in the following sections."),(0,l.kt)("p",null,"###Unity 2021"),(0,l.kt)("admonition",{type:"caution"},(0,l.kt)("p",{parentName:"admonition"},(0,l.kt)("strong",{parentName:"p"},"If your com.code-philosophy.hybridclr version >= v2.0.1"),", since the MonoHook technology has been used, the cropped AOT dll can be copied without modifying UnityEditor.CoreModule.dll,* *Not required** to do the following.")),(0,l.kt)("p",null,"Supplementary metadata and some commands under ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/*")," depend on the reduced AOT dll. However, when Unity 2021 version (not required for 2019 and 2020) packages the ",(0,l.kt)("inlineCode",{parentName:"p"},"iOS platform")," (not required for other platforms), since the Unity Editor does not provide a public interface to copy the tailored AOT dll when the target is iOS, the modified version must be used The UnityEditor.CoreModule.dll overrides the corresponding file that comes with Unity."),(0,l.kt)("p",null,"The specific operation is to cover ",(0,l.kt)("inlineCode",{parentName:"p"},"{package directory}/Data~/ModifiedUnityAssemblies/2021.3.x/UnityEditor.CoreModule-{Win,Mac}.dll")," with ",(0,l.kt)("inlineCode",{parentName:"p"},"{Editor installation directory}/Editor/Data/Managed/UnityEngine/UnityEditor.CoreModule .dll"),", the specific related directory may vary depending on the operating system or Unity version."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Due to permission issues, this operation cannot be completed automatically, and you need to perform the copy operation manually. ")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"UnityEditor.CoreModule.dll")," Each small version of Unity is different. We currently only provide version 2021.3.1. If you need other versions, please make them manually. For details, please refer to ",(0,l.kt)("a",{parentName:"p",href:"/en/docs/basic/modifyunitydll"},"Modify Unity Editor-related dll"),"."),(0,l.kt)("h3",{id:"unity-2019"},"Unity 2019"),(0,l.kt)("p",null,"In order to support 2019, the source code generated by il2cpp needs to be modified, so we modified the 2019 version of the il2cpp tool. Therefore, there is an additional step in the Installer installation process: copy ",(0,l.kt)("inlineCode",{parentName:"p"},"{package}/Data~/ModifiedUnityAssemblies/2019.4.40/Unity.IL2CPP.dll")," to ",(0,l.kt)("inlineCode",{parentName:"p"},"{project}/HybridCLRData/LocalIl2CppData/il2cpp/build/deploy/net471 /Unity.IL2CPP.dll")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Note that this operation is automatically completed when the Installer is installed, no manual operation is required. ")),(0,l.kt)("p",null,"For developers using the 2019.4.0-2019.4.39 version, please switch to the 2019.4.40 version to complete the installation, and then switch back to your current version."),(0,l.kt)("h2",{id:"using-hybridclr-in-non-compatible-versions-of-unity"},"Using HybridCLR in non-compatible versions of Unity"),(0,l.kt)("p",null,"Since we haven't fully tested all Unity versions, in fact, some Unity versions that are not in the supported list may also be able to use HybridCLR normally. The installation method is as follows:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Find a version in the support list that is closest to your version, for example, if your version number is 2021.2.20, then the latest version from you is 2021.3.0."),(0,l.kt)("li",{parentName:"ul"},"First switch your Unity project to this latest supported version, install HybridCLR."),(0,l.kt)("li",{parentName:"ul"},"Switch back to your Unity version."),(0,l.kt)("li",{parentName:"ul"},"Try to package, if it can run smoothly, it means that HybridCLR supports your version, if there is a problem, then upgrade the version.")),(0,l.kt)("p",null,"If you must use this version, you can contact us for ",(0,l.kt)("a",{parentName:"p",href:"/en/docs/business/intro"},"Business Technical Support"),"."),(0,l.kt)("h2",{id:"how-hybridclrinstaller-works"},"How ",(0,l.kt)("inlineCode",{parentName:"h2"},"HybridCLR/Installer")," works"),(0,l.kt)("p",null,"This section is just an introduction to the principle. ",(0,l.kt)("strong",{parentName:"p"},"The operation of installing libil2cpp has been completed by the installer, and you do not need to do it manually"),"."),(0,l.kt)("p",null,"The HybridCLR installation process mainly includes these parts:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Make libil2cpp that supports hot update"),(0,l.kt)("li",{parentName:"ul"},"Install locally or globally to make the new version of libil2cpp take effect"),(0,l.kt)("li",{parentName:"ul"},"Minor improvements to the Unity Editor")),(0,l.kt)("h3",{id:"replace-libil2cpp-code"},"Replace libil2cpp code"),(0,l.kt)("p",null,"The original libil2cpp code is AOT runtime and needs to be replaced with the modified libil2cpp to support hot updates. The modified libil2cpp consists of two parts"),(0,l.kt)("p",null,"-il2cpp_plus"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"hybridclr")),(0,l.kt)("p",null,"The il2cpp_plus repository is a slightly modified version of the original libil2cpp to support dynamic ",(0,l.kt)("strong",{parentName:"p"},"register")," metadata (changed hundreds of lines of code). This repository is highly comparable to the original libil2cpp code\nresemblance. hybridclr is the core code of the interpreter, including metadata loading, code transform (compilation), and code interpretation and execution."),(0,l.kt)("p",null,"As shown in the figure below, merge the ",(0,l.kt)("inlineCode",{parentName:"p"},"il2cpp_plus/libil2cpp")," directory with the ",(0,l.kt)("inlineCode",{parentName:"p"},"hybridclr/hybridclr")," directory to create the final libil2cpp that supports hot updates."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"merge_hybridclr_dir",src:i(7441).Z,width:"811",height:"626"})),(0,l.kt)("h3",{id:"local-installation"},"Local installation"),(0,l.kt)("p",null,"Unity allows you to use the environment variable ",(0,l.kt)("inlineCode",{parentName:"p"},"UNITY_IL2CPP_PATH")," to customize the location of ",(0,l.kt)("inlineCode",{parentName:"p"},"il2cpp"),", so you can create an il2cpp directory locally in the project, replace the libil2cpp directory under the il2cpp directory with the modified libil2cpp,\nThen point the ",(0,l.kt)("inlineCode",{parentName:"p"},"UNITY_IL2CPP_PATH")," environment variable to this directory. The general process is as follows:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Copy the il2cpp directory from the Editor installation directory to ",(0,l.kt)("inlineCode",{parentName:"li"},"{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp")),(0,l.kt)("li",{parentName:"ul"},"Create the final libil2cpp directory from the clone il2cpp_plus and hybridclr repositories"),(0,l.kt)("li",{parentName:"ul"},"Replace ",(0,l.kt)("inlineCode",{parentName:"li"},"{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp")," with the final libil2cpp directory"),(0,l.kt)("li",{parentName:"ul"},"Copy the ",(0,l.kt)("inlineCode",{parentName:"li"},"MonoBleedingEdge")," directory from the Editor installation directory to ",(0,l.kt)("inlineCode",{parentName:"li"},"{project}/HyridCLRData/LocalIl2CppData-{platform}/MonoBleedingEdge")),(0,l.kt)("li",{parentName:"ul"},"Other processing. For the 2019 version, copy ",(0,l.kt)("inlineCode",{parentName:"li"},"{package}/Data~/ModifiedUnityAssemblies/2019.4.40/Unity.IL2CPP.dll")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"{project}/HybridCLRData/LocalIl2CppData/il2cpp/build/deploy/net471/Unity.IL2CPP.dll"))),(0,l.kt)("p",null,"Create the upper-level ",(0,l.kt)("inlineCode",{parentName:"p"},"LocalIl2CppData-{platform}")," directory instead of only creating il2cpp because it is found that only specifying the location of the il2cpp directory is not enough. When packaging, Unity implicitly assumes that il2cpp has a ",(0,l.kt)("inlineCode",{parentName:"p"},"MonoBleedingEdge")," directory at the same level, so the upper level is created directory, copy both the il2cpp and MonoBleedingEdge directories."),(0,l.kt)("p",null,"Because the il2cpp directory that comes with Editor on different platforms is slightly different, LocalIl2CppData needs to distinguish the platform."),(0,l.kt)("h3",{id:"global-installation"},"Global installation"),(0,l.kt)("p",null,"Global installation needs to replace (or link) the libil2cpp directory of the Editor installation directory ({editor}/Data/il2cpp/libil2cpp under Win, similar to Mac) with the modified libil2cpp, and additionally replace some modified files (for example, 2019 also needs to be modified Unity.IL2CPP.dll). There are several flaws:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Due to directory permissions, auto-completion may not be possible"),(0,l.kt)("li",{parentName:"ul"},"Will affect other projects that don't use hybridclr"),(0,l.kt)("li",{parentName:"ul"},"The ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/xxxx")," operation needs to modify the files in the libil2cpp directory, which may fail due to directory permissions.")),(0,l.kt)("p",null,"After completing the installation using ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/Installer"),", enable the ",(0,l.kt)("inlineCode",{parentName:"p"},"useGlobalIl2Cpp")," option in ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/Settings")," to start the global installation, and the environment variable ",(0,l.kt)("inlineCode",{parentName:"p"},"UNITY_IL2CPP_PATH")," will be cleared."),(0,l.kt)("p",null,"If you use the replacement directory for global installation, and your com.code-philosophy.hybridclr version >= 2.1.0, please run ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/Il2cppDef")," before overriding libil2cpp ",(0,l.kt)("strong",{parentName:"p"},"for the first time")," (Only this time, it is no longer needed later, unless you switch the project Unity version) to generate the correct version macro, and then overwrite the original libil2cpp directory. ",(0,l.kt)("strong",{parentName:"p"},"Symbolic link installation method or com.code-philosophy.hybridclr version lower than 2.1.0 does not need to perform this operation, just overwrite the original libil2cpp directory"),"."),(0,l.kt)("p",null,"Due to permissions, even if it is installed globally, the ",(0,l.kt)("inlineCode",{parentName:"p"},"Generate/xxx")," command modifies the files under the local ",(0,l.kt)("inlineCode",{parentName:"p"},"{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp"),". ",(0,l.kt)("strong",{parentName:"p"},"Please overwrite the local libil2cpp directory with the global installation directory after each generate"),"."),(0,l.kt)("p",null,"It is very troublesome to replace the libil2cpp directory every time. It is recommended to link the libil2cpp directory of the installation directory to the local libil2cpp directory. Methods as below:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Windows platform. Open the command line window with administrator privileges, delete or rename the original libil2cpp, and then run ",(0,l.kt)("inlineCode",{parentName:"li"},'mklink /D "<libil2cpp directory path of Editor installation directory>" "{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" '),"."),(0,l.kt)("li",{parentName:"ul"},"Linux or Mac platform. Open the command line window with administrator privileges, delete or rename the original libil2cpp, and then run ",(0,l.kt)("inlineCode",{parentName:"li"},'ln -s "{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" "<libil2cpp directory path of Editor installation directory>" '),".")),(0,l.kt)("p",null,"For the 2019 version replace Unity.IL2CPP.dll, also use a method similar to the above replacement or soft link."),(0,l.kt)("h2",{id:"precautions"},"Precautions"),(0,l.kt)("p",null,"Due to Unity's caching mechanism, after updating HybridCLR, be sure to clear the Library\\Il2cppBuildCache directory, otherwise the latest code will not be used when packaging. If you use Installer to automatically install or update HybridCLR, it will automatically clear these directories without any additional action on your part."))}h.isMDXComponent=!0},5568:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/install-c1f84913c18dfa0406fc90db65085a56.jpg"},8648:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/install_default-c61d323cdd4133368bc575f35dd7a9ec.jpg"},5283:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/install_hybridclrunity_package-9a53b1ee8f7ffd8a700ed1f977ca74e3.jpg"},1093:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/install_version-bafc326c19c3b969342179d820ead842.jpg"},7441:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/merge_hybridclr_dir-04680fdb60dccd43bfd2593b4affd10e.jpg"},8581:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/select_il2cpp_modules-d895c3fb5390e04b53e40ada2b422239.jpg"}}]);