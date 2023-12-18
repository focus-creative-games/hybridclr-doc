"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7661],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>y});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},l="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,p=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),l=c(n),m=o,y=l["".concat(p,".").concat(m)]||l[m]||f[m]||s;return n?r.createElement(y,i(i({ref:t},u),{},{components:n})):r.createElement(y,i({ref:t},u))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,i=new Array(s);i[0]=m;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a[l]="string"==typeof e?e:o,i[1]=a;for(var c=2;c<s;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6604:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>f,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const s={},i="\u652f\u6301Unity DOTS\u6280\u672f",a={unversionedId:"business/supportdots",id:"business/supportdots",title:"\u652f\u6301Unity DOTS\u6280\u672f",description:"\u5f53\u524dDOTS\u5728\u7cfb\u7edf\u542f\u52a8\u65f6\u5373\u5df2\u521d\u59cb\u5316\u6240\u6709Component\u3001System\u7b49\u6838\u5fc3\u7c7b\u578b\uff0c\u5bfc\u81f4\u89e3\u91ca\u7a0b\u5e8f\u96c6\u4e2d\u4f7f\u7528\u81ea\u5b9a\u4e49\u7684Component\u7b49\u7c7b\u578b\u4f1a\u51fa\u73b0\u9519\u8bef\u3002",source:"@site/docs/business/supportdots.md",sourceDirName:"business",slug:"/business/supportdots",permalink:"/docs/business/supportdots",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5b8c\u5168\u6cdb\u578b\u5171\u4eab",permalink:"/docs/business/fullgenericsharing"},next:{title:"\u5143\u6570\u636e\u5185\u5b58\u4f18\u5316",permalink:"/docs/business/metadataoptimization"}},p={},c=[],u={toc:c},l="wrapper";function f(e){let{components:t,...n}=e;return(0,o.kt)(l,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u652f\u6301unity-dots\u6280\u672f"},"\u652f\u6301Unity DOTS\u6280\u672f"),(0,o.kt)("p",null,"\u5f53\u524dDOTS\u5728\u7cfb\u7edf\u542f\u52a8\u65f6\u5373\u5df2\u521d\u59cb\u5316\u6240\u6709Component\u3001System\u7b49\u6838\u5fc3\u7c7b\u578b\uff0c\u5bfc\u81f4\u89e3\u91ca\u7a0b\u5e8f\u96c6\u4e2d\u4f7f\u7528\u81ea\u5b9a\u4e49\u7684Component\u7b49\u7c7b\u578b\u4f1a\u51fa\u73b0\u9519\u8bef\u3002\n\u9700\u8981\u5bf9DOTS\u6e90\u7801\u8fdb\u884c\u4fee\u6539\u624d\u80fd\u652f\u6301\u70ed\u66f4\u65b0\u7c7b\u578b\u3002"),(0,o.kt)("p",null,"\u5546\u4e1a\u5316\u7248\u672c\u63d0\u4f9b\u4e86\u89e3\u51b3\u65b9\u6848\uff0c\u53ef\u4ee5\u5728\u70ed\u66f4\u65b0\u6a21\u5757\u4e2d\u6b63\u5e38\u4f7f\u7528DOTS\u6280\u672f\u3002\u4e0d\u8fc7\u8981\u6ce8\u610f\uff0c\u7531\u4e8e\u5bf9Component\u7684\u64cd\u4f5c\u53d8\u6210\u4e86\u89e3\u91ca\u6267\u884c\u800c\u65e0\u6cd5\u4f7f\u7528burst\u6280\u672f\uff0c\u5bfc\u81f4\u6027\u80fd\u5927\u5e45\u4e0b\u964d\uff0c\n\u6700\u7ec8\u6548\u679c\u76f8\u5f53\u4e8e\u53ea\u5229\u7528\u4e86jobs\u7684\u591a\u7ebf\u7a0b\u6765\u52a0\u901f\u6267\u884c\u3002"))}f.isMDXComponent=!0}}]);