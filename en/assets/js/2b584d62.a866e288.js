"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9340],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>p});var i=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=i.createContext({}),d=function(e){var t=i.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},m=function(e){var t=d(e.components);return i.createElement(o.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},y=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,o=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=d(a),y=n,p=c["".concat(o,".").concat(y)]||c[y]||u[y]||r;return a?i.createElement(p,s(s({ref:t},m),{},{components:a})):i.createElement(p,s({ref:t},m))}));function p(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,s=new Array(r);s[0]=y;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[c]="string"==typeof e?e:n,s[1]=l;for(var d=2;d<r;d++)s[d]=a[d];return i.createElement.apply(null,s)}return i.createElement.apply(null,a)}y.displayName="MDXCreateElement"},6565:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var i=a(7462),n=(a(7294),a(3905));const r={},s="Use in code",l={unversionedId:"business/ultimate/useIncodes",id:"business/ultimate/useIncodes",title:"Use in code",description:"RuntimeApi::LoadOriginalDifferentialHybridAssembly",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/ultimate/useIncodes.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/useIncodes",permalink:"/en/docs/business/ultimate/useIncodes",draft:!1,tags:[],version:"current",frontMatter:{}},o={},d=[{value:"RuntimeApi::LoadOriginalDifferentialHybridAssembly",id:"runtimeapiloadoriginaldifferentialhybridassembly",level:2},{value:"RuntimeApi::LoadDifferentialHybridAssemblyUnchecked",id:"runtimeapiloaddifferentialhybridassemblyunchecked",level:2},{value:"Notes:",id:"notes",level:2}],m={toc:d},c="wrapper";function u(e){let{components:t,...a}=e;return(0,n.kt)(c,(0,i.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"use-in-code"},"Use in code"),(0,n.kt)("h2",{id:"runtimeapiloadoriginaldifferentialhybridassembly"},"RuntimeApi::LoadOriginalDifferentialHybridAssembly"),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"The interface is supported since v6.6.0.")),(0,n.kt)("p",null,"When no code update occurs during the initial build of the App, or when there is a code update but the code of the DHE assembly is not updated, this interface can be called to indicate that the original AOT implementation is used completely."),(0,n.kt)("p",null,"Sample code:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp"},'string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";\n// If it does not exist, use the original AOT assembly\nif (!File.Exists(assFile))\n{\nLoadImageErrorCode err = RuntimeApi.LoadOriginalDifferentialHybridAssembly(assName);\nif (err == LoadImageErrorCode.OK)\n{\nDebug.Log($"LoadOriginalDifferentialHybridAssembly {assName} OK");\n}\nelse\n{\nDebug.LogError($"LoadOriginalDifferentialHybridAssembly {assName} failed, err={err}");\n}\n}\n')),(0,n.kt)("h2",{id:"runtimeapiloaddifferentialhybridassemblyunchecked"},"RuntimeApi::LoadDifferentialHybridAssemblyUnchecked"),(0,n.kt)("p",null,"When a DHE assembly code changes, this interface is needed to load the DHE assembly. Note that you cannot use Assembly.Load to load the DHE assembly, which will result in an error."),(0,n.kt)("p",null,"This interface has two parameters: currentDllBytes and optionBytes."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"currentDllBytes is the bytes of the latest DHE assembly file")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"optionBytes is the bytes of the dhao file. ",(0,n.kt)("a",{parentName:"p",href:"./dhao"},"dhao file")," contains DHE change information, which is used to indicate which functions run in aot mode and which are executed in interpreted mode."))),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes"; // If it does not exist, use the original AOT assembly if (File.Exists(assFile)) { byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes"); byte[] dhaoBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dhao.bytes"); LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssemblyUnchecked(dllBytes, dhaoBytes); if (err == LoadImageErrorCode.OK) { Debug.Log($"LoadDifferentialHybridAssembly {assName} OK" ); } else { Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");',string:!0,assFile:!0,"":"",'$"{Application.streamingAssetsPath}/{assName}.dll.bytes";':!0,"//":!0,If:!0,it:!0,does:!0,not:!0,"exist,":!0,use:!0,the:!0,original:!0,AOT:!0,assembly:!0,if:!0,"(File.Exists(assFile))":!0,"{":!0,"byte[]":!0,dllBytes:!0,'File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes");':!0,dhaoBytes:!0,'File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dhao.bytes");':!0,LoadImageErrorCode:!0,err:'{err}");',"RuntimeApi.LoadDifferentialHybridAssemblyUnchecked(dllBytes,":!0,"dhaoBytes);":!0,"(err":!0,"LoadImageErrorCode.OK)":!0,'Debug.Log($"LoadDifferentialHybridAssembly':!0,"{assName}":!0,'OK"':!0,");":!0,"}":!0,else:!0,'Debug.LogError($"LoadDifferentialHybridAssembly':!0,"failed,":!0},"}\n}\n\n")),(0,n.kt)("h2",{id:"notes"},"Notes:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Even if the DHE assembly has not changed, RuntimeApi::LoadOriginalDifferentialHybridAssembly must be explicitly executed before running any code in the DHE assembly"),(0,n.kt)("li",{parentName:"ul"},"LoadOriginalDifferentialHybridAssembly or LoadDifferentialHybridAssemblyUnchecked to load the DHE assembly in the order of assembly dependencies"),(0,n.kt)("li",{parentName:"ul"},"The DHE assembly loaded by RuntimeApi::LoadOriginalDifferentialHybridAssembly is a normal AOT assembly. If the generics in the DHE assembly are referenced in other hot update assemblies and full generic sharing is not enabled, the AOT generic problem will occur like a normal AOT assembly. This can be solved by using full generic sharing or supplementary metadata mechanism"),(0,n.kt)("li",{parentName:"ul"},"The DHE assembly loaded by RuntimeApi::LoadDifferentialHybridAssemblyUnchecked already contains metadata. Even if full generic sharing is not enabled, do not add metadata to the DHE assembly. It will fail if added. Other non-DHE AOT assemblies can add metadata as usual.")))}u.isMDXComponent=!0}}]);