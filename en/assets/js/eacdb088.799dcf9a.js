"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5672],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(r),m=o,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return r?n.createElement(f,i(i({ref:t},l),{},{components:r})):n.createElement(f,i({ref:t},l))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[u]="string"==typeof e?e:o,i[1]=c;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6418:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={},i="DOTS support",c={unversionedId:"basic/dots",id:"basic/dots",title:"DOTS support",description:"DOTS does not support dynamic registration of core types such as Component, System, and Aspect. As a result, DOTS-related types in hot updates cannot be recognized by the DOTS runtime and cannot operate normally.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/basic/dots.md",sourceDirName:"basic",slug:"/basic/dots",permalink:"/en/docs/basic/dots",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Method Bridge",permalink:"/en/docs/basic/methodbridge"},next:{title:"Memory and GC",permalink:"/en/docs/basic/memory"}},s={},p=[],l={toc:p},u="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"dots-support"},"DOTS support"),(0,o.kt)("p",null,"DOTS does not support dynamic registration of core types such as Component, System, and Aspect. As a result, DOTS-related types in hot updates cannot be recognized by the DOTS runtime and cannot operate normally."),(0,o.kt)("p",null,"The commercial version made some modifications to DOTS and adjusted the runtime code accordingly, ultimately supporting most of the features of DOTS. Especially for the flagship version, if the function marked ",(0,o.kt)("inlineCode",{parentName:"p"},"[BurstCompile]")," is not modified,\nIt can be implemented by directly calling the burst function, which can greatly improve performance."),(0,o.kt)("p",null,"For details, please refer to the ","[Commercial version of DOTS support]"," (../business/dots) document."))}d.isMDXComponent=!0}}]);