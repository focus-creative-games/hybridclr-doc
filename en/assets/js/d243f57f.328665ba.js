"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5638],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>y});var i=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},o=Object.keys(e);for(i=0;i<o.length;i++)a=o[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)a=o[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var m=i.createContext({}),l=function(e){var t=i.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},p=function(e){var t=l(e.components);return i.createElement(m.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,m=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=l(a),d=n,y=c["".concat(m,".").concat(d)]||c[d]||u[d]||o;return a?i.createElement(y,r(r({ref:t},p),{},{components:a})):i.createElement(y,r({ref:t},p))}));function y(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,r=new Array(o);r[0]=d;var s={};for(var m in t)hasOwnProperty.call(t,m)&&(s[m]=t[m]);s.originalType=e,s[c]="string"==typeof e?e:n,r[1]=s;for(var l=2;l<o;l++)r[l]=a[l];return i.createElement.apply(null,r)}return i.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7265:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var i=a(7462),n=(a(7294),a(3905));const o={},r="Metadata Optimization",s={unversionedId:"business/metadataoptimization",id:"business/metadataoptimization",title:"Metadata Optimization",description:"While executing code, HybridCLR does not significantly increase memory usage, but loading the metadata of assemblies consumes a considerable amount of memory. This may be a problem in scenarios with high memory pressure, such as WeChat Mini Games. To address this, all commercial versions have significantly optimized metadata memory.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/metadataoptimization.md",sourceDirName:"business",slug:"/business/metadataoptimization",permalink:"/en/docs/business/metadataoptimization",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DOTS Support",permalink:"/en/docs/business/dots"},next:{title:"Standard Interpretation Optimization",permalink:"/en/docs/business/basicoptimization"}},m={},l=[{value:"Full Generic Sharing",id:"full-generic-sharing",level:2},{value:"Optimizing Memory Usage of Supplementary Metadata",id:"optimizing-memory-usage-of-supplementary-metadata",level:2},{value:"Optimizing Memory Usage of Hot Update Assemblies",id:"optimizing-memory-usage-of-hot-update-assemblies",level:2}],p={toc:l},c="wrapper";function u(e){let{components:t,...o}=e;return(0,n.kt)(c,(0,i.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"metadata-optimization"},"Metadata Optimization"),(0,n.kt)("p",null,"While executing code, HybridCLR does not significantly increase memory usage, but loading the metadata of assemblies consumes a considerable amount of memory. This may be a problem in scenarios with high memory pressure, such as WeChat Mini Games. To address this, all commercial versions have significantly optimized metadata memory."),(0,n.kt)("p",null,"Several aspects have been optimized to reduce memory usage:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Using full generic sharing technology"),(0,n.kt)("li",{parentName:"ul"},"Optimizing memory usage of loading supplementary metadata assemblies"),(0,n.kt)("li",{parentName:"ul"},"Optimizing memory usage of loading hot update assembly metadata")),(0,n.kt)("p",null,"Additionally, the time taken to load hot update assemblies has been significantly optimized, with ",(0,n.kt)("strong",{parentName:"p"},"commercial versions taking only 30% of the time compared to the community version"),"."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Based on current test results, on a 64-bit platform, commercial versions save approximately ",(0,n.kt)("inlineCode",{parentName:"strong"},"{total size of supplementary metadata} * 4 + {total size of hot update assemblies} * 1.8")," memory compared to the community version.")),(0,n.kt)("p",null,"For WebGL platforms (including WeChat Mini Games), enabling the faster (smaller) build option will further reduce package size (approximately 1-2 times the size of all AOT DLLs), leading to a significant reduction in memory usage. For most projects, commercial versions can ultimately reduce memory usage by nearly 50-100MB or even more on the WebGL platform."),(0,n.kt)("h2",{id:"full-generic-sharing"},"Full Generic Sharing"),(0,n.kt)("p",null,"Completely eliminates supplementary metadata memory, approximately 4 times the size of the DLL. The downside is that full generic sharing is only supported from 2021 onwards. Enabling full generic sharing can significantly reduce package size (by approximately 30-40% after compilation of managed code)."),(0,n.kt)("h2",{id:"optimizing-memory-usage-of-supplementary-metadata"},"Optimizing Memory Usage of Supplementary Metadata"),(0,n.kt)("p",null,"We tested the memory consumption of common AOT assemblies after adding supplementary metadata. The memory consumption of the community version is approximately 4 times the size of the DLL; for the commercial version without full generic sharing, it is approximately 1.3 times; with full generic sharing enabled, this becomes 0. The commercial version reduces memory consumption by ",(0,n.kt)("strong",{parentName:"p"},"67%")," compared to the community version (100% when full generic sharing is enabled)."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Detailed Data"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-data",src:a(573).Z,width:"1152",height:"589"})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Memory Consumption"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-memory",src:a(9696).Z,width:"946",height:"481"})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Memory Consumption per DLL Size"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-dll-rate",src:a(8744).Z,width:"921",height:"351"})),(0,n.kt)("h2",{id:"optimizing-memory-usage-of-hot-update-assemblies"},"Optimizing Memory Usage of Hot Update Assemblies"),(0,n.kt)("p",null,"We tested the memory consumption of common plugins after loading them in interpreted mode. The memory consumption of the community version is approximately 4.7 times the size of the DLL, while for the commercial version it is 2.9 times. The commercial version reduces memory consumption by ",(0,n.kt)("strong",{parentName:"p"},"39%")," compared to the community version."),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"This data does not include memory consumed by Il2CppClass, MethodInfo, and translated instructions that are lazily initialized at runtime. This part of the memory consumes approximately 2.9-3.5 times the size of the DLL. The final memory consumption of metadata, for the community version, is 7.6-8.2 times, while for the commercial version it is 5.8-6.4 times the size of the DLL. The commercial version reduces memory consumption by approximately ",(0,n.kt)("strong",{parentName:"p"},"25%")," compared to the community version.")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Detailed Data"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-data",src:a(6165).Z,width:"961",height:"437"})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Memory Consumption"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-memory",src:a(4298).Z,width:"701",height:"367"})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Memory Consumption per DLL Size"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-dll-rate",src:a(4245).Z,width:"701",height:"464"})))}u.isMDXComponent=!0},573:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/aot-metadata-data-f950d25c4b5db38206a09b6efee0deca.jpg"},8744:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/aot-metadata-dll-rate-a45a6c8df7a58257ba4ecc5e256039f7.jpg"},9696:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/aot-metadata-memory-864c0a495fcc16076c79cc0055c99fe2.jpg"},6165:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/assembly-load-data-75401da72e0ef99c5edd902f4aa514f5.jpg"},4298:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/assembly-load-memory-0ae6d56efdaa542135024b39460b772c.jpg"},4245:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/assembly-load-rate-75c8a914ce8810c60203ec7154522545.jpg"}}]);