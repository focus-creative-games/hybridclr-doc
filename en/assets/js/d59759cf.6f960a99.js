"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8944],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},m=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=c(n),d=i,f=p["".concat(l,".").concat(d)]||p[d]||u[d]||o;return n?r.createElement(f,a(a({ref:t},m),{},{components:n})):r.createElement(f,a({ref:t},m))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:i,a[1]=s;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4243:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const o={},a="Assembly::Load Loading Time Optimization",s={unversionedId:"business/assemblyloadoptimization",id:"version-7.8.1/business/assemblyloadoptimization",title:"Assembly::Load Loading Time Optimization",description:"The commercial version optimizes the Assembly::Load time to ##20%## of the original.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-7.8.1/business/assemblyloadoptimization.md",sourceDirName:"business",slug:"/business/assemblyloadoptimization",permalink:"/en/docs/7.8.1/business/assemblyloadoptimization",draft:!1,tags:[],version:"7.8.1",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Hotfix",permalink:"/en/docs/7.8.1/business/hotfix"},next:{title:"Crash Report With Interpreter Strace Trace",permalink:"/en/docs/7.8.1/business/crashreport"}},l={},c=[],m={toc:c},p="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"assemblyload-loading-time-optimization"},"Assembly::Load Loading Time Optimization"),(0,i.kt)("p",null,"The commercial version optimizes the Assembly::Load loading time from several aspects, and finally reduces the Assembly::Load time to ##20%## of the original."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Optimize the code of InterpreterImage::InitRuntimeMetadatas"),(0,i.kt)("li",{parentName:"ul"},"Delayed initialization of some metadata that takes time and does not need to be initialized immediately")))}u.isMDXComponent=!0}}]);