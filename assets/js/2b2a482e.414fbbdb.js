"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9705],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>y});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=r.createContext({}),d=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=d(e.components);return r.createElement(o.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=d(n),c=i,y=m["".concat(o,".").concat(c)]||m[c]||p[c]||a;return n?r.createElement(y,l(l({ref:t},u),{},{components:n})):r.createElement(y,l({ref:t},u))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=c;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[m]="string"==typeof e?e:i,l[1]=s;for(var d=2;d<a;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3786:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var r=n(7462),i=(n(7294),n(3905));const a={},l="\u4ee3\u7801\u4e2d\u4f7f\u7528",s={unversionedId:"business/ultimate/useIncodes",id:"version-7.6.0/business/ultimate/useIncodes",title:"\u4ee3\u7801\u4e2d\u4f7f\u7528",description:"RuntimeApi::LoadOriginalDifferentialHybridAssembly",source:"@site/versioned_docs/version-7.6.0/business/ultimate/useIncodes.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/useIncodes",permalink:"/docs/7.6.0/business/ultimate/useIncodes",draft:!1,tags:[],version:"7.6.0",frontMatter:{}},o={},d=[{value:"RuntimeApi::LoadOriginalDifferentialHybridAssembly",id:"runtimeapiloadoriginaldifferentialhybridassembly",level:2},{value:"RuntimeApi::LoadDifferentialHybridAssemblyUnchecked",id:"runtimeapiloaddifferentialhybridassemblyunchecked",level:2},{value:"\u6ce8\u610f\u4e8b\u9879\uff1a",id:"\u6ce8\u610f\u4e8b\u9879",level:2}],u={toc:d},m="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u4ee3\u7801\u4e2d\u4f7f\u7528"},"\u4ee3\u7801\u4e2d\u4f7f\u7528"),(0,i.kt)("h2",{id:"runtimeapiloadoriginaldifferentialhybridassembly"},"RuntimeApi::LoadOriginalDifferentialHybridAssembly"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"\u81eav6.6.0\u7248\u672c\u652f\u6301\u63a5\u53e3\u3002")),(0,i.kt)("p",null,"\u5728\u521d\u6b21\u6784\u5efaApp\u672a\u53d1\u751f\u4efb\u4f55\u4ee3\u7801\u66f4\u65b0\uff0c\u6216\u8005\u8bf4\u867d\u7136\u6709\u4ee3\u7801\u66f4\u65b0\uff0c\u4f46\u8be5DHE\u7a0b\u5e8f\u96c6\u7684\u4ee3\u7801\u6ca1\u6709\u66f4\u65b0\u65f6\uff0c\u53ef\u4ee5\u8c03\u7528\u6b64\u63a5\u53e3\uff0c\u8868\u793a\u5b8c\u5168\u4f7f\u7528\u539f\u59cbAOT\u5b9e\u73b0\u3002"),(0,i.kt)("p",null,"\u793a\u4f8b\u4ee3\u7801\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'    string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";\n    // \u5982\u679c\u4e0d\u5b58\u5728\uff0c\u5219\u4f7f\u7528\u539f\u59cbAOT\u7a0b\u5e8f\u96c6\n    if (!File.Exists(assFile))\n    {\n        LoadImageErrorCode err = RuntimeApi.LoadOriginalDifferentialHybridAssembly(assName);\n        if (err == LoadImageErrorCode.OK)\n        {\n            Debug.Log($"LoadOriginalDifferentialHybridAssembly {assName} OK");\n        }\n        else\n        {\n            Debug.LogError($"LoadOriginalDifferentialHybridAssembly {assName} failed, err={err}");\n        }\n    }\n')),(0,i.kt)("h2",{id:"runtimeapiloaddifferentialhybridassemblyunchecked"},"RuntimeApi::LoadDifferentialHybridAssemblyUnchecked"),(0,i.kt)("p",null,"\u5f53\u67d0\u4e2aDHE\u7a0b\u5e8f\u96c6\u4ee3\u7801\u53d1\u751f\u53d8\u5316\u65f6\uff0c\u9700\u8981\u7528\u6b64\u63a5\u53e3\u52a0\u8f7dDHE\u7a0b\u5e8f\u96c6\u3002\u6ce8\u610f\uff0c\u4e0d\u80fd\u4f7f\u7528Assembly.Load\u52a0\u8f7dDHE\u7a0b\u5e8f\u96c6\uff0c\u4f1a\u51fa\u9519\u3002"),(0,i.kt)("p",null,"\u8be5\u63a5\u53e3\u6709\u4e24\u4e2a\u53c2\u6570: currentDllBytes\u548coptionBytes\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"currentDllBytes\u4e3a\u6700\u65b0\u7684DHE\u7a0b\u5e8f\u96c6\u6587\u4ef6\u7684\u5b57\u8282"),(0,i.kt)("li",{parentName:"ul"},"optionBytes \u4e3adhao\u6587\u4ef6\u7684\u5b57\u8282\u3002",(0,i.kt)("a",{parentName:"li",href:"./dhao"},"dhao\u6587\u4ef6"),"\u5305\u542b\u4e86DHE\u7684\u53d8\u5316\u4fe1\u606f\uff0c\u7528\u4e8e\u6307\u793a\u54ea\u4e9b\u51fd\u6570\u4ee5aot\u6a21\u5f0f\u8fd0\u884c\uff0c\u54ea\u4e9b\u4ee5\u89e3\u91ca\u65b9\u5f0f\u6267\u884c\u3002")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'\n        string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";\n        // \u5982\u679c\u4e0d\u5b58\u5728\uff0c\u5219\u4f7f\u7528\u539f\u59cbAOT\u7a0b\u5e8f\u96c6\n        if (File.Exists(assFile))\n        {\n            byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes");\n            byte[] dhaoBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dhao.bytes");\n            LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssemblyUnchecked(dllBytes, dhaoBytes);\n            if (err == LoadImageErrorCode.OK)\n            {\n                Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");\n            }\n            else\n            {\n                Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");\n            }\n        }\n\n')),(0,i.kt)("h2",{id:"\u6ce8\u610f\u4e8b\u9879"},"\u6ce8\u610f\u4e8b\u9879\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u5373\u4f7fDHE\u7a0b\u5e8f\u96c6\u6ca1\u6709\u53d1\u751f\u6539\u53d8\uff0c\u5728\u8fd0\u884cDHE\u7a0b\u5e8f\u96c6\u4e2d\u4efb\u4f55\u4ee3\u7801\u524d\uff0c\u4ecd\u7136\u8981\u663e\u5f0f\u6267\u884cRuntimeApi::LoadOriginalDifferentialHybridAssembly"),(0,i.kt)("li",{parentName:"ul"},"\u8981\u6309\u7167assembly\u7684\u4f9d\u8d56\u987a\u5e8fLoadOriginalDifferentialHybridAssembly\u6216LoadDifferentialHybridAssemblyUnchecked\u52a0\u8f7d DHE\u7a0b\u5e8f\u96c6"),(0,i.kt)("li",{parentName:"ul"},"RuntimeApi::LoadOriginalDifferentialHybridAssembly \u52a0\u8f7d\u7684DHE\u7a0b\u5e8f\u96c6\u4e3a\u666e\u901aAOT\u7a0b\u5e8f\u96c6\uff0c\u5982\u679c\u5176\u4ed6\u70ed\u66f4\u65b0\u7a0b\u5e8f\u96c6\u4e2d\u5f15\u7528\u4e86\u8be5DHE\u7a0b\u5e8f\u96c6\u4e2d\u7684\u6cdb\u578b\uff0c\u5e76\u4e14\u6ca1\u6709\u5f00\u542f\u5b8c\u5168\u6cdb\u578b\u5171\u4eab\uff0c\u5219\u4f1a\u4e0e\u666e\u901aAOT\u7a0b\u5e8f\u96c6\u4e00\u6837\u51fa\u73b0AOT\u6cdb\u578b\u95ee\u9898\uff0c\u53ef\u4ee5\u4f7f\u7528\u5b8c\u5168\u6cdb\u578b\u5171\u4eab\u6216\u8005\u8865\u5145\u5143\u6570\u636e\u673a\u5236\u89e3\u51b3"),(0,i.kt)("li",{parentName:"ul"},"RuntimeApi::LoadDifferentialHybridAssemblyUnchecked \u52a0\u8f7d\u7684DHE\u7a0b\u5e8f\u96c6\u672c\u8eab\u5df2\u7ecf\u5305\u542b\u4e86\u5143\u6570\u636e\uff0c\u5373\u4f7f\u672a\u5f00\u542f\u5b8c\u5168\u6cdb\u578b\u5171\u4eab\u65f6\u4e5f",(0,i.kt)("strong",{parentName:"li"},"\u4e0d\u8981\u5bf9DHE\u7a0b\u5e8f\u96c6\u8fdb\u884c\u8865\u5145\u5143\u6570\u636e"),"\uff0c\u8865\u5145\u4e86\u4e5f\u4f1a\u5931\u8d25\uff0c\u5176\u4ed6\u975eDHE\u7684AOT\u7a0b\u5e8f\u96c6\u53ef\u4ee5\u7167\u5e38\u8865\u5145\u5143\u6570\u636e\u3002")))}p.isMDXComponent=!0}}]);