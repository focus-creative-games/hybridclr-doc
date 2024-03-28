"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5638],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>y});var i=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function m(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},o=Object.keys(e);for(i=0;i<o.length;i++)a=o[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)a=o[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=i.createContext({}),l=function(e){var t=i.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},d=function(e){var t=l(e.components);return i.createElement(s.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,d=m(e,["components","mdxType","originalType","parentName"]),p=l(a),u=n,y=p["".concat(s,".").concat(u)]||p[u]||c[u]||o;return a?i.createElement(y,r(r({ref:t},d),{},{components:a})):i.createElement(y,r({ref:t},d))}));function y(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,r=new Array(o);r[0]=u;var m={};for(var s in t)hasOwnProperty.call(t,s)&&(m[s]=t[s]);m.originalType=e,m[p]="string"==typeof e?e:n,r[1]=m;for(var l=2;l<o;l++)r[l]=a[l];return i.createElement.apply(null,r)}return i.createElement.apply(null,a)}u.displayName="MDXCreateElement"},7265:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>m,toc:()=>l});var i=a(7462),n=(a(7294),a(3905));const o={},r="Metadata Optimization",m={unversionedId:"business/metadataoptimization",id:"business/metadataoptimization",title:"Metadata Optimization",description:"HybridCLR does not occupy additional memory when executing code, but loading assembly metadata occupies a large amount of memory. This may be a problem for some situations where there is a lot of memory pressure (such as WeChat mini-games).",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/metadataoptimization.md",sourceDirName:"business",slug:"/business/metadataoptimization",permalink:"/en/docs/business/metadataoptimization",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DOTS Support",permalink:"/en/docs/business/dots"},next:{title:"Execution Optimization",permalink:"/en/docs/business/basicoptimization"}},s={},l=[{value:"Fully generic sharing",id:"fully-generic-sharing",level:2},{value:"Optimize supplementary metadata memory",id:"optimize-supplementary-metadata-memory",level:2},{value:"Optimize hot update assembly memory",id:"optimize-hot-update-assembly-memory",level:2}],d={toc:l},p="wrapper";function c(e){let{components:t,...o}=e;return(0,n.kt)(p,(0,i.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"metadata-optimization"},"Metadata Optimization"),(0,n.kt)("p",null,"HybridCLR does not occupy additional memory when executing code, but loading assembly metadata occupies a large amount of memory. This may be a problem for some situations where there is a lot of memory pressure (such as WeChat mini-games).\nFor this situation, all commercial editions have significantly optimized metadata memory."),(0,n.kt)("p",null,"Optimize memory usage from several aspects:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Use fully generic sharing technology"),(0,n.kt)("li",{parentName:"ul"},"Optimize loading of supplementary metadata assembly memory"),(0,n.kt)("li",{parentName:"ul"},"Optimize hot update assembly metadata memory")),(0,n.kt)("p",null,"In addition, the time for Assembly.Load to load hot-updated assemblies has been significantly optimized. ",(0,n.kt)("strong",{parentName:"p"},"The loading time of the commercial edition is 30% of that of the community edition"),"."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"According to the current test results, on the 64-bit platform, the commercial edition saves approximately ",(0,n.kt)("inlineCode",{parentName:"strong"},"{Total size of supplementary metadata} * 4 + {Total size of hot update assembly} * 1.8")," compared to the community edition. ")),(0,n.kt)("p",null,"For the WebGL platform (including WeChat mini games), since the faster (smaller) build option can be turned on, the package body will be further reduced (about 1-2 times the size of all aot dlls), resulting in a significant reduction in memory usage.\nFor most projects, the commercial edition can ultimately reduce the memory of the WebGL platform by nearly 50-100M or more."),(0,n.kt)("h2",{id:"fully-generic-sharing"},"Fully generic sharing"),(0,n.kt)("p",null,"Completely omitting supplementary metadata memory, it is about 4 times the size of the dll. The disadvantage is that full generic sharing is only supported from 2021 onwards. After turning on full generic sharing, the package body can be significantly reduced (reducing the compiled size of managed code by about 30-40%)."),(0,n.kt)("h2",{id:"optimize-supplementary-metadata-memory"},"Optimize supplementary metadata memory"),(0,n.kt)("p",null,"We tested the memory consumption after supplementing metadata for common aot assemblies. The memory consumed by the community edition is about 4 times the size of the dll; the commercial edition consumes about 1.3 times when full generic sharing is not enabled;\nAfter the commercial edition turns on full generic sharing, this item does not need to be supplemented with metadata, so this item is 0. Compared with the community edition, the commercial edition reduces memory by ",(0,n.kt)("strong",{parentName:"p"},"67%")," (100% when full generic sharing is enabled)."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"detailed data"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-data",src:a(573).Z,width:"1152",height:"589"})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Memory consumption"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-memory",src:a(9696).Z,width:"946",height:"481"})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Memory consumption/dll size"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-dll-rate",src:a(8744).Z,width:"921",height:"351"})),(0,n.kt)("h2",{id:"optimize-hot-update-assembly-memory"},"Optimize hot update assembly memory"),(0,n.kt)("p",null,"We tested the memory consumed by common plugins after loading in interpreted mode. The memory consumed by the community edition is about 4.7 times the size of the dll, and the commercial edition is 2.9 times. The commercial edition uses ",(0,n.kt)("strong",{parentName:"p"},"39%")," less memory than the community edition."),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"This data does not include runtime latency data\nThe memory occupied by Il2CppClass, MethodInfo and translated instructions, the delayed initialization memory of this part is about 2.9-3.5 times the size of the dll. The final metadata memory consumed is 7.6-8.2 times for the community edition and 5.8-6.4 times for the commercial edition.\nThe commercial edition reduces memory by approximately ",(0,n.kt)("strong",{parentName:"p"},"25%")," compared to the community edition.")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"detailed data"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-data",src:a(6165).Z,width:"961",height:"437"})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Memory consumption"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-memory",src:a(4298).Z,width:"701",height:"367"})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Memory consumption/dll size"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"aot-metadata-dll-rate",src:a(4245).Z,width:"701",height:"464"})))}c.isMDXComponent=!0},573:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/aot-metadata-data-f950d25c4b5db38206a09b6efee0deca.jpg"},8744:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/aot-metadata-dll-rate-a45a6c8df7a58257ba4ecc5e256039f7.jpg"},9696:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/aot-metadata-memory-864c0a495fcc16076c79cc0055c99fe2.jpg"},6165:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/assembly-load-data-75401da72e0ef99c5edd902f4aa514f5.jpg"},4298:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/assembly-load-memory-0ae6d56efdaa542135024b39460b772c.jpg"},4245:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/assembly-load-rate-75c8a914ce8810c60203ec7154522545.jpg"}}]);