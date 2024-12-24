"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6410],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>p});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=i.createContext({}),u=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=u(e.components);return i.createElement(l.Provider,{value:t},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),m=u(n),d=a,p=m["".concat(l,".").concat(d)]||m[d]||f[d]||o;return n?i.createElement(p,s(s({ref:t},c),{},{components:n})):i.createElement(p,s({ref:t},c))}));function p(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r[m]="string"==typeof e?e:a,s[1]=r;for(var u=2;u<o;u++)s[u]=n[u];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},690:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>f,frontMatter:()=>o,metadata:()=>r,toc:()=>u});var i=n(7462),a=(n(7294),n(3905));const o={},s="Hotfix",r={unversionedId:"business/hotfix",id:"business/hotfix",title:"Hotfix",description:"For trivial updates, such as a few lines of bug fixes, some projects may prefer dynamically patching the game during runtime rather than forcing players to restart the current game app.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/hotfix.md",sourceDirName:"business",slug:"/business/hotfix",permalink:"/en/docs/business/hotfix",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Metadata Optimization",permalink:"/en/docs/business/metadataoptimization"},next:{title:"Assembly::Load Loading Time Optimization",permalink:"/en/docs/business/assemblyloadoptimization"}},l={},u=[{value:"Advantages",id:"advantages",level:2},{value:"Limitations and Drawbacks",id:"limitations-and-drawbacks",level:2},{value:"Usage",id:"usage",level:2}],c={toc:u},m="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"hotfix"},"Hotfix"),(0,a.kt)("p",null,"For trivial updates, such as a few lines of bug fixes, some projects may prefer dynamically patching the game during runtime rather than forcing players to restart the current game app. "),(0,a.kt)("p",null,"Currently, apart from the ",(0,a.kt)("a",{parentName:"p",href:"./reload/intro"},"hot reload version"),", other versions do not support reloading hot update assemblies. Even in the hot reload version, due to its ability to completely unload and reload an assembly, it imposes many ",(0,a.kt)("a",{parentName:"p",href:"./reload/hotreloadassembly#unsupported-features-and-special-requirements"},"restrictions and requirements")," on code and significantly intrudes into business logic."),(0,a.kt)("p",null,"Hotfix technology specifically addresses these scenarios for dynamic bug patching. It allows runtime bug fixes for hot update modules in a seamless manner without intruding into business logic."),(0,a.kt)("h2",{id:"advantages"},"Advantages"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Dynamically fix code bugs without restarting the game app."),(0,a.kt)("li",{parentName:"ul"},"Can fix any code in hot update assemblies (including the flagship DHE assemblies), such as static member functions, generic functions, and asynchronous function waits."),(0,a.kt)("li",{parentName:"ul"},"Simple to use, non-intrusive to business logic, and does not require modifying any business code."),(0,a.kt)("li",{parentName:"ul"},"Unlimited fixes during app runtime. For example, after releasing version v1 with fixes, further bugs can be patched with a subsequent v2 release.")),(0,a.kt)("h2",{id:"limitations-and-drawbacks"},"Limitations and Drawbacks"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Can only modify function bodies, not type definitions (e.g., changing class names, adding or removing fields, functions, or modifying function signatures)."),(0,a.kt)("li",{parentName:"ul"},"Each patch loads a new hot update assembly, and memory from previously loaded assemblies cannot be released, leading to a certain degree of memory leakage.")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"RuntimeApi::HotfixAssemblies")," function can be called to apply the hotfix. Example code is as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'            RuntimeApi.HotfixAssemblies(new HotfixManifest\n            {\n                assemblies = new List<HotfixAssembly>\n                {\n                    new HotfixAssembly\n                    {\n                        // Name of the target assembly to fix\n                        name = "Hotfix",\n                        // Content of the latest DLL file\n                        hotfixAssemblyBytes = LoadDll.GetDllBytes("Hotfix.new.dll"),\n                        // List of classes to fix\n                        classes = new List<HotfixClass>\n                        {\n                            new HotfixClass\n                            {\n                                // Fully qualified name of the class, including namespace (if any)\n                                name = "TestHotfixMethods",\n                                // List of methods to fix\n                                methods = new List<HotfixMethod>\n                                {\n                                    new HotfixMethod\n                                    {\n                                        // Fix by method name; if there are multiple methods with the same name, all will be fixed\n                                        name = "Foo1",\n                                    },\n                                    new HotfixMethod\n                                    {\n                                        // Fix by method signature; either `name` or `signature` must be provided, but not both\n                                        signature = "Int32 Foo2(Int32, Int32)",\n                                    },\n                                }\n                            },\n                            new HotfixClass\n                            {\n                                name = "TestHotfixCtors",\n                                methods = new List<HotfixMethod>\n                                {\n                                    new HotfixMethod\n                                    {\n                                        // Constructor; if there are multiple constructors, all will be fixed\n                                        name = ".ctor",\n                                    },\n                                    new HotfixMethod\n                                    {\n                                        // Constructor with a specific signature\n                                        signature = ".ctor(Int32)",\n                                    },\n                                }\n                            },\n                            new HotfixClass\n                            {\n                                name = "TestHotfixStaticCtors",\n                                methods = new List<HotfixMethod>\n                                {\n                                    new HotfixMethod\n                                    {\n                                        // Static constructor of the class\n                                        name = ".cctor",\n                                    },\n                                }\n                            },\n                        }\n                    }\n                }\n            });\n\n\nConstructing the HotfixManifest directly in code is cumbersome and error-prone. It is recommended to first create an XML configuration file like the following example, and then convert it to the HotfixManifest class:\n\n```xml\n<manifest>\n    <assembly fullname="Hotfix">\n        <type fullname="TestHotfixMethods">\n            <method name="Foo1"/>\n            <method signature="Int32 Foo2(Int32, Int32)"/>\n        </type>\n    </assembly>\n</manifest>\n')),(0,a.kt)("p",null,"Currently, there is no provided code for converting XML to HotfixManifest, so developers need to implement this functionality themselves."))}f.isMDXComponent=!0}}]);