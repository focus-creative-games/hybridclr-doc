"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5491],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>y});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,y=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(y,i(i({ref:t},l),{},{components:n})):r.createElement(y,i({ref:t},l))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[d]="string"==typeof e?e:a,i[1]=c;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7206:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const o={},i="Advanced code hardening",c={unversionedId:"business/advancedencryption",id:"version-7.8.1/business/advancedencryption",title:"Advanced code hardening",description:"Advanced code hardening uses custom assembly structures and custom instructions to greatly improve App security.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-7.8.1/business/advancedencryption.md",sourceDirName:"business",slug:"/business/advancedencryption",permalink:"/en/docs/7.8.1/business/advancedencryption",draft:!1,tags:[],version:"7.8.1",frontMatter:{}},s={},u=[{value:"Principle",id:"principle",level:2},{value:"Other advantages",id:"other-advantages",level:2}],l={toc:u},d="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"advanced-code-hardening"},"Advanced code hardening"),(0,a.kt)("p",null,"Advanced code hardening uses custom assembly structures and custom instructions to greatly improve App security."),(0,a.kt)("h2",{id:"principle"},"Principle"),(0,a.kt)("p",null,"Advanced code hardening technology improves code security in the following aspects:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Use custom randomizable assembly structures. The assembly structure definition itself can be randomized by generating corresponding proprietary code\nTo analyze the corresponding structure, greatly improving the difficulty of cracking"),(0,a.kt)("li",{parentName:"ul"},"Custom transformation of all metadata structures so that they can no longer be read by regular IL decompilation tools (such as ILSpy)"),(0,a.kt)("li",{parentName:"ul"},"Irreversibly convert IL instructions into custom register instruction sets in advance, and the instruction set itself can also be randomized")),(0,a.kt)("h2",{id:"other-advantages"},"Other advantages"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Since it has been converted offline to a custom register instruction set in advance, instruction translation is faster"),(0,a.kt)("li",{parentName:"ul"},"Cooperate with advanced instruction optimization technology to maximize execution efficiency")))}p.isMDXComponent=!0}}]);