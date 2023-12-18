"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5657],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=i,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(f,a(a({ref:t},p),{},{components:n})):r.createElement(f,a({ref:t},p))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4234:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const o={},a="Getting Started",l={unversionedId:"business/pro/quickstart",id:"business/pro/quickstart",title:"Getting Started",description:"Almost the same as the community version Quickstart, this document only introduces the differences.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/pro/quickstart.md",sourceDirName:"business/pro",slug:"/business/pro/quickstart",permalink:"/en/docs/business/pro/quickstart",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/en/docs/business/pro/intro"},next:{title:"\u70ed\u91cd\u8f7d\u7248",permalink:"/en/docs/reload"}},s={},c=[{value:"Install",id:"install",level:2},{value:"Enable full generic sharing",id:"enable-full-generic-sharing",level:2}],p={toc:c},u="wrapper";function d(e){let{components:t,...o}=e;return(0,i.kt)(u,(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"getting-started"},"Getting Started"),(0,i.kt)("p",null,"Almost the same as the community version ",(0,i.kt)("a",{parentName:"p",href:"/en/docs/beginner/quickstart"},"Quickstart"),", this document only introduces the differences."),(0,i.kt)("h2",{id:"install"},"Install"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"After decompressing hybridclr_unity, put it in the project Packages directory and rename it to com.code-philosophy.hybridclr"),(0,i.kt)("li",{parentName:"ul"},"Unzip the corresponding ",(0,i.kt)("inlineCode",{parentName:"li"},"il2cpp_plus-{version}.zip")," according to your unity version"),(0,i.kt)("li",{parentName:"ul"},"Unzip ",(0,i.kt)("inlineCode",{parentName:"li"},"hybridclr.zip")),(0,i.kt)("li",{parentName:"ul"},"Place the hybridclr directory after decompression of ",(0,i.kt)("inlineCode",{parentName:"li"},"hybridclr.zip")," into the libil2cpp directory after decompression of ",(0,i.kt)("inlineCode",{parentName:"li"},"il2cpp-{version}.zip")),(0,i.kt)("li",{parentName:"ul"},"Open ",(0,i.kt)("inlineCode",{parentName:"li"},"HybridCLR/Installer"),", turn on the ",(0,i.kt)("inlineCode",{parentName:"li"},"Copy libil2cpp from Local")," option, select the libil2cpp directory you just decompressed, and install it")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"installer",src:n(9456).Z,width:"805",height:"263"})),(0,i.kt)("h2",{id:"enable-full-generic-sharing"},"Enable full generic sharing"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The 2020 version does not support fully generic sharing"),(0,i.kt)("li",{parentName:"ul"},"The 2021 version needs to set the IL2CPP Code Generation option to ",(0,i.kt)("inlineCode",{parentName:"li"},"faster(smaller)")),(0,i.kt)("li",{parentName:"ul"},"Full generic sharing is enabled by default in the 2022 version and cannot be turned off. If you set the IL2CPP Code Generation option to ",(0,i.kt)("inlineCode",{parentName:"li"},"faster(smaller)"),", you can further reduce the package body.")))}d.isMDXComponent=!0},9456:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/ultimate-installer-8a4fc30b6b8adf2de3a8b75efd16894c.jpg"}}]);