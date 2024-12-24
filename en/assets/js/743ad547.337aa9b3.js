"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2990],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),y=i,m=p["".concat(s,".").concat(y)]||p[y]||d[y]||o;return n?r.createElement(m,a(a({ref:t},u),{},{components:n})):r.createElement(m,a({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},1144:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const o={},a="Frequently Asked Questions",l={unversionedId:"business/ultimate/commonerrors",id:"business/ultimate/commonerrors",title:"Frequently Asked Questions",description:"ExecutionEngineException: Could not run the type initializer for origin DHE type 'xxx'",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/ultimate/commonerrors.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/commonerrors",permalink:"/en/docs/business/ultimate/commonerrors",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Function Injection Rules",permalink:"/en/docs/business/ultimate/injectrules"},next:{title:"\u70ed\u91cd\u8f7d\u7248",permalink:"/en/docs/reload"}},s={},c=[{value:"ExecutionEngineException: Could not run the type initializer for origin DHE type &#39;xxx&#39;",id:"executionengineexception-could-not-run-the-type-initializer-for-origin-dhe-type-xxx",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"frequently-asked-questions"},"Frequently Asked Questions"),(0,i.kt)("h2",{id:"executionengineexception-could-not-run-the-type-initializer-for-origin-dhe-type-xxx"},"ExecutionEngineException: Could not run the type initializer for origin DHE type 'xxx'"),(0,i.kt)("p",null,"The reason is that the original AOT type replaced by DHE was accidentally created. After using DHE, you cannot create the original types corresponding to the types in the DHE assembly. There are several reasons for this error:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"DHE code is executed before loading the DHE assembly."),(0,i.kt)("li",{parentName:"ul"},"Hot-reloaded dhe dll does not match the dhao file, resulting in incorrectly executing original AOT code that should not be executed, creating original AOT types. Only versions 4.5.7 and earlier that do not strictly verify the version of the dll will have this error."),(0,i.kt)("li",{parentName:"ul"},"When throwing an exception or printing logs, accessing the original functions of the DHE assembly accidentally during the process of obtaining the function call stack frame. This bug exists in version 4.5.8 and earlier."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"script debugging")," build option is enabled.")))}d.isMDXComponent=!0}}]);