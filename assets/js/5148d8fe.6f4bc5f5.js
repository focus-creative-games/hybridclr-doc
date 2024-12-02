"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5650],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=c(r),m=a,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},s),{},{components:r})):n.createElement(f,i({ref:t},s))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[u]="string"==typeof e?e:a,i[1]=p;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},4978:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const o={},i="\u4e0d\u652f\u6301\u7684\u7279\u6027",p={unversionedId:"basic/notsupportedfeatures",id:"basic/notsupportedfeatures",title:"\u4e0d\u652f\u6301\u7684\u7279\u6027",description:"\u4e0d\u5728\u9650\u5236\u4e8b\u9879\u4e2d\u7684\u7279\u6027HybridCLR\u90fd\u652f\u6301\uff0c\u8bf7\u4e0d\u8981\u518d\u95eeHybridCLR\u662f\u5426\u652f\u6301\u67d0\u4e2a\u529f\u80fd\u3002",source:"@site/docs/basic/notsupportedfeatures.md",sourceDirName:"basic",slug:"/basic/notsupportedfeatures",permalink:"/docs/basic/notsupportedfeatures",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5bf9App\u5305\u4f53\u5f71\u54cd",permalink:"/docs/basic/impactonappsize"},next:{title:"hybridclr Package\u624b\u518c",permalink:"/docs/basic/com.code-philosophy.hybridclr"}},l={},c=[],s={toc:c},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u4e0d\u652f\u6301\u7684\u7279\u6027"},"\u4e0d\u652f\u6301\u7684\u7279\u6027"),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"\u4e0d\u5728\u9650\u5236\u4e8b\u9879\u4e2d\u7684\u7279\u6027HybridCLR\u90fd\u652f\u6301\uff0c\u8bf7\u4e0d\u8981\u518d\u95eeHybridCLR\u662f\u5426\u652f\u6301\u67d0\u4e2a\u529f\u80fd\u3002")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6682\u65f6\u4e0d\u652f\u6301\u5728\u70ed\u66f4\u65b0\u811a\u672c\u4e2d\u5b9a\u4e49extern\u51fd\u6570\uff0c\u4f46\u53ef\u4ee5\u8c03\u7528AOT\u4e2dextern\u51fd\u6570\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u4e0d\u652f\u6301",(0,a.kt)("inlineCode",{parentName:"li"},"System.Runtime.InteropServices.Marshal"),"\u4e2d ",(0,a.kt)("inlineCode",{parentName:"li"},"Marshal.StructureToPtr"),"\u4e4b\u7c7b\u5e8f\u5217\u5316\u7ed3\u6784\u7684\u51fd\u6570\uff0c\u4f46\u666e\u901aMarshal\u51fd\u6570\u5982",(0,a.kt)("inlineCode",{parentName:"li"},"Marshal.PtrToStringAnsi"),"\u90fd\u662f\u80fd\u6b63\u5e38\u5de5\u4f5c\u7684\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u4e0d\u652f\u6301","[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.xxx)]","\u3002\u7eaf\u7cb9\u662f\u65f6\u673a\u95ee\u9898\uff0cUnity\u6536\u96c6\u8fd9\u4e9b\u51fd\u6570\u7684\u65f6\u673a\u5f88\u65e9\uff0c\u6b64\u65f6\u70ed\u66f4\u65b0dll\u8fd8\u6ca1\u52a0\u8f7d\u3002\u4e00\u4e2a\u63a8\u8350\u7684\u529e\u6cd5\u662f\u4f60\u4f7f\u7528\u53cd\u5c04\u6536\u96c6\u8fd9\u4e9b\u51fd\u6570\uff0c\u5728\u5408\u9002\u7684\u65f6\u673a\u4e3b\u52a8\u8c03\u7528\u5b83\u4eec\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u4e0d\u652f\u6301\u5bf9\u89e3\u91ca\u4ee3\u7801\u90e8\u5206\u8fdb\u884cC#\u7ea7\u522b\u8c03\u8bd5\uff0c\u56e0\u4e3a\u6ca1\u6682\u65f6\u6ca1\u65f6\u95f4\u5199\u8c03\u8bd5\u5668"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"RequireComponent(typeof(AAA))")," \u8981\u6c42AAA\u5fc5\u987b\u5df2\u7ecf\u5728\u522b\u5904\u8d44\u6e90\u4e2d\u5b9e\u4f8b\u5316\u6216\u8005AddComponent\u8fc7\uff0c\u5426\u5219Unity\u65e0\u6cd5\u8bc6\u522bAAA\u4e3a\u811a\u672c\u800c\u5ffd\u7565\u5904\u7406\u3002")))}d.isMDXComponent=!0}}]);