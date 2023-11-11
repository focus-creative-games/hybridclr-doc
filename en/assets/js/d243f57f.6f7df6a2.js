"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5638],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>y});var i=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=i.createContext({}),m=function(e){var t=i.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=m(e.components);return i.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=m(a),d=n,y=u["".concat(l,".").concat(d)]||u[d]||c[d]||r;return a?i.createElement(y,o(o({ref:t},p),{},{components:a})):i.createElement(y,o({ref:t},p))}));function y(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,o=new Array(r);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:n,o[1]=s;for(var m=2;m<r;m++)o[m]=a[m];return i.createElement.apply(null,o)}return i.createElement.apply(null,a)}d.displayName="MDXCreateElement"},3746:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>m});var i=a(7462),n=(a(7294),a(3905));const r={},o="Metadata optimization",s={unversionedId:"business/metadataoptimization",id:"business/metadataoptimization",title:"Metadata optimization",description:"HybridCLR does not occupy additional memory when executing code, but loading assembly metadata occupies a large amount of memory. This may be a problem for some situations where there is a lot of memory pressure (such as WeChat mini-games).",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/metadataoptimization.md",sourceDirName:"business",slug:"/business/metadataoptimization",permalink:"/en/docs/business/metadataoptimization",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Fully generic sharing",permalink:"/en/docs/business/fullgenericsharing"},next:{title:"Standard Code Optimization",permalink:"/en/docs/business/basiccodeoptimization"}},l={},m=[{value:"Fully generic sharing",id:"fully-generic-sharing",level:2},{value:"Optimize the memory occupied by loading supplementary metadata assemblies",id:"optimize-the-memory-occupied-by-loading-supplementary-metadata-assemblies",level:2},{value:"Hot update assembly metadata optimization",id:"hot-update-assembly-metadata-optimization",level:2},{value:"Interpreter based on raw IL instructions",id:"interpreter-based-on-raw-il-instructions",level:2}],p={toc:m},u="wrapper";function c(e){let{components:t,...a}=e;return(0,n.kt)(u,(0,i.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"metadata-optimization"},"Metadata optimization"),(0,n.kt)("p",null,"HybridCLR does not occupy additional memory when executing code, but loading assembly metadata occupies a large amount of memory. This may be a problem for some situations where there is a lot of memory pressure (such as WeChat mini-games).\nFor this situation, all commercial versions have significantly optimized metadata memory."),(0,n.kt)("p",null,"Optimize memory usage from several aspects:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Use fully generic sharing technology."),(0,n.kt)("li",{parentName:"ul"},"Optimize the memory occupied by loading supplementary metadata assemblies"),(0,n.kt)("li",{parentName:"ul"},"Hot update assembly metadata optimization"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"TODO")," provides an interpreter based on raw IL instructions")),(0,n.kt)("h2",{id:"fully-generic-sharing"},"Fully generic sharing"),(0,n.kt)("p",null,"Completely eliminating supplementary metadata memory (about 3-4 times the size of the dll). The disadvantage is that full generic sharing is only supported from 2021 onwards"),(0,n.kt)("h2",{id:"optimize-the-memory-occupied-by-loading-supplementary-metadata-assemblies"},"Optimize the memory occupied by loading supplementary metadata assemblies"),(0,n.kt)("p",null,"The memory occupied during the loading process is optimized from 3-4 times the size of the supplementary metadata dll to about 1.2 times. This optimization takes effect on all Unity versions."),(0,n.kt)("h2",{id:"hot-update-assembly-metadata-optimization"},"Hot update assembly metadata optimization"),(0,n.kt)("p",null,"Reuse metadata to the greatest extent possible. Compared with the community version, it solves the problem of multiple allocation and leakage of Il2CppType memory."),(0,n.kt)("h2",{id:"interpreter-based-on-raw-il-instructions"},"Interpreter based on raw IL instructions"),(0,n.kt)("p",null,"Runtime conversion to a register instruction set is no longer required, saving a large amount of instruction memory. The disadvantage is that it significantly reduces the interpretation performance."))}c.isMDXComponent=!0}}]);