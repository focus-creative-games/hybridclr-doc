"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[313],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>y});var i=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},l=Object.keys(e);for(i=0;i<l.length;i++)t=l[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)t=l[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=i.createContext({}),c=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=c(e.components);return i.createElement(s.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(t),m=r,y=d["".concat(s,".").concat(m)]||d[m]||p[m]||l;return t?i.createElement(y,a(a({ref:n},u),{},{components:t})):i.createElement(y,a({ref:n},u))}));function y(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,a=new Array(l);a[0]=m;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[d]="string"==typeof e?e:r,a[1]=o;for(var c=2;c<l;c++)a[c]=t[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3453:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var i=t(7462),r=(t(7294),t(3905));const l={},a="Quick Start",o={unversionedId:"business/reload/quickstart",id:"version-7.8.1/business/reload/quickstart",title:"Quick Start",description:"This is almost identical to the community version of the Quick Start, and this document only describes the differences.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-7.8.1/business/reload/quickstart.md",sourceDirName:"business/reload",slug:"/business/reload/quickstart",permalink:"/en/docs/7.8.1/business/reload/quickstart",draft:!1,tags:[],version:"7.8.1",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/en/docs/7.8.1/business/reload/intro"},next:{title:"Manual",permalink:"/en/docs/7.8.1/business/reload/manual"}},s={},c=[{value:"Installation",id:"installation",level:2},{value:"Use in code",id:"use-in-code",level:2},{value:"TryUnloadAssembly",id:"tryunloadassembly",level:3},{value:"ForceUnloadAssembly",id:"forceunloadassembly",level:3},{value:"Notes",id:"notes",level:2}],u={toc:c},d="wrapper";function p(e){let{components:n,...l}=e;return(0,r.kt)(d,(0,i.Z)({},u,l,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"quick-start"},"Quick Start"),(0,r.kt)("p",null,"This is almost identical to the community version of the ",(0,r.kt)("a",{parentName:"p",href:"/en/docs/7.8.1/beginner/quickstart"},"Quick Start"),", and this document only describes the differences."),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Unzip hybridclr_unity and put it in the project Packages directory, rename it to com.code-philosophy.hybridclr"),(0,r.kt)("li",{parentName:"ul"},"Unzip the corresponding ",(0,r.kt)("inlineCode",{parentName:"li"},"il2cpp_plus-{version}.zip")," according to your unity version"),(0,r.kt)("li",{parentName:"ul"},"Unzip ",(0,r.kt)("inlineCode",{parentName:"li"},"hybridclr.zip")),(0,r.kt)("li",{parentName:"ul"},"Put the hybridclr directory after unzipping ",(0,r.kt)("inlineCode",{parentName:"li"},"hybridclr.zip")," into the libil2cpp directory after unzipping ",(0,r.kt)("inlineCode",{parentName:"li"},"il2cpp-{version}.zip")),(0,r.kt)("li",{parentName:"ul"},"Open ",(0,r.kt)("inlineCode",{parentName:"li"},"HybridCLR/Installer"),", turn on the ",(0,r.kt)("inlineCode",{parentName:"li"},"Copy libil2cpp from local")," option, select the libil2cpp directory just unzipped, and install it")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"installer",src:t(9456).Z,width:"802",height:"563"})),(0,r.kt)("h2",{id:"use-in-code"},"Use in code"),(0,r.kt)("p",null,"Call ",(0,r.kt)("inlineCode",{parentName:"p"},"RuntimeApi.TryUnloadAssembly or RuntimeApi.ForceUnloadAssembly")," Unload the assembly and reload it using ",(0,r.kt)("inlineCode",{parentName:"p"},"Assembly.Load"),". The assembly must be successfully unloaded before it can be loaded again."),(0,r.kt)("p",null,"There are currently two unloading workflows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"TryUnloadAssembly"),(0,r.kt)("li",{parentName:"ul"},"ForceUnloadAssembly")),(0,r.kt)("h3",{id:"tryunloadassembly"},"TryUnloadAssembly"),(0,r.kt)("p",null,"Try to unload. If there is a reference to the object in the unloaded assembly in the AppDomain, keep the status quo and return failure, otherwise return success."),(0,r.kt)("p",null,"The sample code is as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'\n// First load\nAssembly ass = Assembly.Load(yyy);\n\n// Execute some code\nType mainType = ass.GetType("Entry");\nmainType.GetMethod("Main").Invoke(null, null);\n\n// First unload\n// The printObjectReferenceLink parameter is true, which means that when the unloading fails, a detailed reference chain log of illegal objects will be printed, which is convenient for developers to locate where illegal references are maintained.\n// It is recommended to set it to true only during the development period and change it to false after the official launch\nif (!RuntimeApi.TryUnloadAssembly(ass, true))\n{\n    throw new Exception("unload fail");\n}\n\n// Second load\nAssembly newAss = Assembly.Load(yyy);\n\n// Execute some code\nType mainType = ass.GetType("Entry");\nmainType.GetMethod("Main").Invoke(null, null);\n\n// Second uninstall\nif (!RuntimeApi.TryUnloadAssembly(ass, true))\n{\n    throw new Exception("unload fail");\n}\n')),(0,r.kt)("h3",{id:"forceunloadassembly"},"ForceUnloadAssembly"),(0,r.kt)("p",null,"Force uninstallation, even if there are references to objects in the uninstalled assembly in the AppDomain. Returning true means there is no problem, and returning false means that an illegal reference was detected during the uninstallation process. If false is returned, it may crash after running for a period of time. Use this operation with caution, and it is recommended to communicate with official technical support in detail."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'\n// Load for the first time\nAssembly ass = Assembly.Load(yyy);\n\n// Execute some code\nType mainType = ass.GetType("Entry");\nmainType.GetMethod("Main").Invoke(null, null);\n\n// Uninstall for the first time\n// The ignoreObjectReferenceValidation parameter is true, which means that illegal object references are not checked during the uninstall process, which can shorten the uninstall time. However, it is recommended to use false regardless of the development period or the official release\n// The printObjectReferenceLink parameter is true, which means that when the uninstall fails, a detailed illegal object reference chain log will be printed, which is convenient for developers to locate where the illegal reference is maintained. It is recommended to set it to true only during the development period and change it to false after the official launch\nif (!RuntimeApi.ForceUnloadAssembly(ass, false, true))\n{\n    throw new Exception("unload fail");\n}\n\n// Second load\nAssembly newAss = Assembly.Load(yyy);\n\n// Execute some code\nType mainType = ass.GetType("Entry");\nmainType.GetMethod("Main").Invoke(null, null);\n\n// Second uninstall\nif (!RuntimeApi.ForceUnloadAssembly(ass, false, true))\n{\n    throw new Exception("unload fail");\n}\n')),(0,r.kt)("h2",{id:"notes"},"Notes"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Async or coroutines can easily implicitly keep references to the uninstalled assembly code in other threads. Please be sure to clean up all asynchronous or coroutine functions before uninstalling"),(0,r.kt)("li",{parentName:"ul"},"UI OnClick or various callback events can easily keep references to the uninstalled assembly, so be sure to clean them up"),(0,r.kt)("li",{parentName:"ul"},"Registering to global events or other heightening can easily accidentally keep references to uninstalled assemblies, so be sure to clean them up."),(0,r.kt)("li",{parentName:"ul"},"Clean up illegal references in the code according to the illegal reference logs printed during the uninstall process")))}p.isMDXComponent=!0},9456:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/ultimate-installer-2ca1e4616b01f9e02b2de3384a53f585.jpg"}}]);