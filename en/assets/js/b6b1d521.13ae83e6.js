"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5025],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var i=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=i.createContext({}),s=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=s(e.components);return i.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),d=o,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||r;return n?i.createElement(f,a(a({ref:t},p),{},{components:n})):i.createElement(f,a({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var s=2;s<r;s++)a[s]=n[s];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2094:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var i=n(7462),o=(n(7294),n(3905));const r={},a="Offline Instruction Optimization",l={unversionedId:"business/advancedoptimization",id:"version-7.6.0/business/advancedoptimization",title:"Offline Instruction Optimization",description:"Offline instruction optimization technology is under development, and currently only standard instruction optimization technology can be used.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-7.6.0/business/advancedoptimization.md",sourceDirName:"business",slug:"/business/advancedoptimization",permalink:"/en/docs/7.6.0/business/advancedoptimization",draft:!1,tags:[],version:"7.6.0",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Standard Interpretation Optimization",permalink:"/en/docs/7.6.0/business/basicoptimization"},next:{title:"Code Encryption",permalink:"/en/docs/7.6.0/business/basicencryption"}},c={},s=[{value:"Techonology Detail",id:"techonology-detail",level:2},{value:"Performance",id:"performance",level:2}],p={toc:s},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"offline-instruction-optimization"},"Offline Instruction Optimization"),(0,o.kt)("admonition",{type:"warning"},(0,o.kt)("p",{parentName:"admonition"},"Offline instruction optimization technology is under development, and currently only standard instruction optimization technology can be used.")),(0,o.kt)("p",null,"Offline Instruction Optimization (OIO) converts original IL instructions into customized register instructions offline.\nSince there is no compilation performance limit offline, richer compilation optimization technologies can be used, which greatly improves the performance of the interpretation module."),(0,o.kt)("p",null,"After optimization, the overall instruction execution performance is improved by 100%-1000% (yes, more than 10 times) or even higher, especially the overall improvement of numerical instructions by nearly 300%.\nAnd because it has been converted in advance, the loading and instruction translation process is faster and the lag is smaller."),(0,o.kt)("p",null,"Offline instruction optimization technology supports virtualization technology in code reinforcement solutions, greatly improving code security."),(0,o.kt)("h2",{id:"techonology-detail"},"Techonology Detail"),(0,o.kt)("p",null,"Offline instruction optimization technology includes the following optimization technologies:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Complete elimination of useless stack instructions. Eliminate all unnecessary stack operations"),(0,o.kt)("li",{parentName:"ul"},"Peephole optimization"),(0,o.kt)("li",{parentName:"ul"},"Constant copy optimization"),(0,o.kt)("li",{parentName:"ul"},"Optimization of local copy propagation"),(0,o.kt)("li",{parentName:"ul"},"Global copy propagation optimization"),(0,o.kt)("li",{parentName:"ul"},"Explain function inline"),(0,o.kt)("li",{parentName:"ul"},"AOT function inline (patented technology)"),(0,o.kt)("li",{parentName:"ul"},"Provide more instinct instructions to greatly improve the performance of common instruction combinations"),(0,o.kt)("li",{parentName:"ul"},"Conditional check elimination technology. Eliminate unnecessary null pointer checks, type cast checks, and array out-of-bounds checks"),(0,o.kt)("li",{parentName:"ul"},"CheckOnce runtime checks dynamically eliminate optimizations. For example, an instruction that accesses a static member variable will no longer check whether the type has been initialized during the second execution."),(0,o.kt)("li",{parentName:"ul"},"Other optimizations")),(0,o.kt)("h2",{id:"performance"},"Performance"),(0,o.kt)("p",null,"TODO."))}m.isMDXComponent=!0}}]);