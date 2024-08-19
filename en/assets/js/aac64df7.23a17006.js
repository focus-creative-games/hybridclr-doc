"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7566],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var i=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,l=function(e,t){if(null==e)return{};var n,i,l={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var r=i.createContext({}),z=function(e){var t=i.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):A(A({},t),e)),n},p=function(e){var t=z(e.components);return i.createElement(r.Provider,{value:t},e.children)},c="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,r=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=z(n),u=l,y=c["".concat(r,".").concat(u)]||c[u]||s[u]||a;return n?i.createElement(y,A(A({ref:t},p),{},{components:n})):i.createElement(y,A({ref:t},p))}));function y(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,A=new Array(a);A[0]=u;var o={};for(var r in t)hasOwnProperty.call(t,r)&&(o[r]=t[r]);o.originalType=e,o[c]="string"==typeof e?e:l,A[1]=o;for(var z=2;z<a;z++)A[z]=n[z];return i.createElement.apply(null,A)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},650:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>A,default:()=>s,frontMatter:()=>a,metadata:()=>o,toc:()=>z});var i=n(7462),l=(n(7294),n(3905));const a={},A="User Manual",o={unversionedId:"business/ultimate/manual",id:"business/ultimate/manual",title:"User Manual",description:"Installation",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/ultimate/manual.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/manual",permalink:"/en/docs/business/ultimate/manual",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DHAO file",permalink:"/en/docs/business/ultimate/dhao"},next:{title:"Free Trial",permalink:"/en/docs/business/ultimate/freetrial"}},r={},z=[{value:"Installation",id:"installation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Configure PlayerSettings",id:"configure-playersettings",level:3},{value:"Enable incremental GC",id:"enable-incremental-gc",level:3},{value:"Enable full generic sharing",id:"enable-full-generic-sharing",level:3},{value:"Enable and disable standard instruction optimization",id:"enable-and-disable-standard-instruction-optimization",level:2},{value:"Configure HybridCLR",id:"configure-hybridclr",level:3},{value:"Reserve all DHE assemblies in link.xml",id:"reserve-all-dhe-assemblies-in-linkxml",level:3},{value:"Configure function injection strategy",id:"configure-function-injection-strategy",level:2},{value:"Unsupported features",id:"unsupported-features",level:2}],p={toc:z},c="wrapper";function s(e){let{components:t,...a}=e;return(0,l.kt)(c,(0,i.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"user-manual"},"User Manual"),(0,l.kt)("h2",{id:"installation"},"Installation"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Unzip hybridclr_unity.zip and put it in the project Packages directory, rename it to com.code-philosophy.hybridclr"),(0,l.kt)("li",{parentName:"ul"},"Unzip the corresponding ",(0,l.kt)("inlineCode",{parentName:"li"},"il2cpp_plus-{version}.zip")," according to your Unity version"),(0,l.kt)("li",{parentName:"ul"},"Unzip ",(0,l.kt)("inlineCode",{parentName:"li"},"hybridclr.zip")),(0,l.kt)("li",{parentName:"ul"},"Put the hybridclr directory after unzipping ",(0,l.kt)("inlineCode",{parentName:"li"},"hybridclr.zip")," into the libil2cpp directory after unzipping ",(0,l.kt)("inlineCode",{parentName:"li"},"il2cpp-{version}.zip")),(0,l.kt)("li",{parentName:"ul"},"Open ",(0,l.kt)("inlineCode",{parentName:"li"},"HybridCLR/Installer"),", enable the ",(0,l.kt)("inlineCode",{parentName:"li"},"Copy libil2cpp from local")," option, select the libil2cpp directory just unzipped, and install it"),(0,l.kt)("li",{parentName:"ul"},"According to your Unity version:"),(0,l.kt)("li",{parentName:"ul"},"If the version is >= 2020, replace the ",(0,l.kt)("inlineCode",{parentName:"li"},"ModifiedDlls\\{verions}\\Unity.IL2CPP.dll")," file ",(0,l.kt)("inlineCode",{parentName:"li"},"{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy\\netcoreapp3.1\\Unity.IL2CPP.dll"),"(Unity 2020) or ",(0,l.kt)("inlineCode",{parentName:"li"},"{proj}\\HybridCLRData\\LocalIl2CppData-WindowsEditor\\il2cpp\\build\\deploy\\Unity.IL2CPP.dll"),"(Unity 202 1+). If there is no file corresponding to your version, please contact us to make one"),(0,l.kt)("li",{parentName:"ul"},"If the version is 2019, no operation is required, because it has been automatically copied during the installation process")),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"installer",src:n(9456).Z,width:"805",height:"263"})),(0,l.kt)("h2",{id:"configuration"},"Configuration"),(0,l.kt)("h3",{id:"configure-playersettings"},"Configure PlayerSettings"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Switch ",(0,l.kt)("inlineCode",{parentName:"li"},"Scripting Backend")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"IL2CPP")),(0,l.kt)("li",{parentName:"ul"},"Switch ",(0,l.kt)("inlineCode",{parentName:"li"},"Api Compatibility Level")," to ",(0,l.kt)("inlineCode",{parentName:"li"},".Net 4.x"),"(Unity 2019-2020) or ",(0,l.kt)("inlineCode",{parentName:"li"},".Net Framework")," (Unity 2021+)")),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"player settings",src:n(4468).Z,width:"812",height:"129"})),(0,l.kt)("h3",{id:"enable-incremental-gc"},"Enable incremental GC"),(0,l.kt)("p",null,"Enable the ",(0,l.kt)("inlineCode",{parentName:"p"},"use incremental GC")," option in ",(0,l.kt)("inlineCode",{parentName:"p"},"Player Settings"),", no settings are required for HybridCLR."),(0,l.kt)("h3",{id:"enable-full-generic-sharing"},"Enable full generic sharing"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"2020 version does not support full generic sharing"),(0,l.kt)("li",{parentName:"ul"},"2021 version needs to set IL2CPP Code Generation option to ",(0,l.kt)("inlineCode",{parentName:"li"},"faster(smaller)")),(0,l.kt)("li",{parentName:"ul"},"2022 version enables full generic sharing by default and cannot be turned off. If you set IL2CPP Code Generation option to ",(0,l.kt)("inlineCode",{parentName:"li"},"faster(smaller)"),", you can further reduce the package size.")),(0,l.kt)("h2",{id:"enable-and-disable-standard-instruction-optimization"},"Enable and disable standard instruction optimization"),(0,l.kt)("p",null,"Standard optimization is enabled by default. You can actively control to enable or disable this feature through the ",(0,l.kt)("inlineCode",{parentName:"p"},"RuntimeApi.EnableTransformOptimization")," function."),(0,l.kt)("p",null,"Standard instruction optimization and advanced instruction optimization are two completely independent and mutually exclusive features. For each interpreted function, you can only choose to use one of them or not use them at all."),(0,l.kt)("h3",{id:"configure-hybridclr"},"Configure HybridCLR"),(0,l.kt)("p",null,"As with the community version, click the ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/Settings")," menu to open the configuration dialog box."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Field"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"),(0,l.kt)("th",{parentName:"tr",align:null}))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"differentialHybridAssemblies"),(0,l.kt)("td",{parentName:"tr",align:null},"DHE assembly list. Add the assembly names that need differential hybrid execution to this list, such as HotUpdate. The same assembly cannot be added to both the differentialHybridAssemblies and hotUpdateAssemblies lists."),(0,l.kt)("td",{parentName:"tr",align:null})))),(0,l.kt)("h3",{id:"reserve-all-dhe-assemblies-in-linkxml"},"Reserve all DHE assemblies in link.xml"),(0,l.kt)("p",null,"For user-owned code such as Assembly-CSharp, il2cpp generally does not trim. However, for third-party assemblies that are directly added to Unity in the form of dll, if all are not reserved, these dlls will be trimmed during packaging, and there will be huge changes when generating dhao files, which is obviously not what we expect."),(0,l.kt)("p",null,"Add similar configurations ",(0,l.kt)("inlineCode",{parentName:"p"},'<assembly fullname="YourExternDll" preserve="all"/>')," to all your dhe assemblies in ",(0,l.kt)("inlineCode",{parentName:"p"},"Assets/link.xml")," (or other custom link.xml)."),(0,l.kt)("h2",{id:"configure-function-injection-strategy"},"Configure function injection strategy"),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"In most projects, the default full injection strategy has little impact on performance. As long as there is no performance problem, you don't need to care about this configuration.")),(0,l.kt)("p",null,"In order to avoid indirect dirty function contagion (i.e. function A calls function B, if B changes, A will also be marked as changed), a small check jump code is injected into all function headers by default. Although it is a very simple ",(0,l.kt)("inlineCode",{parentName:"p"},"if (method->isInterpterImpl)")," statement, for short functions such as ",(0,l.kt)("inlineCode",{parentName:"p"},"int Age {get; set;}"),", this insertion may cause observable performance degradation (even up to 10%)."),(0,l.kt)("p",null,"Function injection strategy is used to optimize this situation. For short functions that do not change, configuring it to not inject can improve performance. For details, please see the ",(0,l.kt)("a",{parentName:"p",href:"./injectrules"},"InjectRules")," document."),(0,l.kt)("p",null,"In ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR Settings"),", fill in the injection policy file path in the ",(0,l.kt)("inlineCode",{parentName:"p"},"InjectRuleFiles")," field. The relative path of the file is the project root directory (such as ",(0,l.kt)("inlineCode",{parentName:"p"},"Assets/InjectRules/DefaultInjectRules.xml"),")."),(0,l.kt)("h2",{id:"unsupported-features"},"Unsupported features"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Unsupported ",(0,l.kt)("inlineCode",{parentName:"li"},"script debugging")," build option")))}s.isMDXComponent=!0},9456:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/ultimate-installer-8a4fc30b6b8adf2de3a8b75efd16894c.jpg"},4468:(e,t,n)=>{n.d(t,{Z:()=>i});const i="data:image/jpeg;base64,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"}}]);