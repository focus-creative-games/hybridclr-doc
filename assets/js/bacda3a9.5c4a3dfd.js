"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4475],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>y});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,y=d["".concat(c,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(y,a(a({ref:t},s),{},{components:n})):r.createElement(y,a({ref:t},s))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:i,a[1]=l;for(var p=2;p<o;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3466:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=n(7462),i=(n(7294),n(3905));const o={},a="\u4ee3\u7801\u88c1\u526a",l={unversionedId:"basic/codestriping",id:"basic/codestriping",title:"\u4ee3\u7801\u88c1\u526a",description:"Unity\u4f7f\u7528\u4e86\u4ee3\u7801\u88c1\u526a\u6280\u672f\u6765\u5e2e\u52a9\u51cf\u5c11il2cpp backend\u7684\u5305\u4f53\u5927\u5c0f\u3002\u5982\u679c\u672a\u505a\u9632\u88c1\u526a\u5904\u7406\uff0c\u7531\u4e8eAOT\u4e3b\u5de5\u7a0b\u91cc\u7684\u4ee3\u7801\u4e00\u822c\u4e0d\u591a\uff0c\u5927\u91cf\u7684C#\u7c7b\u578b\u548c\u51fd\u6570\u88ab",source:"@site/docs/basic/codestriping.md",sourceDirName:"basic",slug:"/basic/codestriping",permalink:"/docs/basic/codestriping",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u53d1\u5e03WebGL\u5e73\u53f0",permalink:"/docs/basic/buildwebgl"},next:{title:"\u70ed\u66f4\u65b0MonoBehaviour",permalink:"/docs/basic/monobehaviour"}},c={},p=[{value:"\u89e3\u51b3\u529e\u6cd5",id:"\u89e3\u51b3\u529e\u6cd5",level:2},{value:"AOT\u7c7b\u578b\u53ca\u51fd\u6570\u9884\u7559",id:"aot\u7c7b\u578b\u53ca\u51fd\u6570\u9884\u7559",level:2}],s={toc:p},d="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u4ee3\u7801\u88c1\u526a"},"\u4ee3\u7801\u88c1\u526a"),(0,i.kt)("p",null,"Unity\u4f7f\u7528\u4e86",(0,i.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/ManagedCodeStripping.html"},"\u4ee3\u7801\u88c1\u526a"),"\u6280\u672f\u6765\u5e2e\u52a9\u51cf\u5c11il2cpp backend\u7684\u5305\u4f53\u5927\u5c0f\u3002\u5982\u679c\u672a\u505a\u9632\u88c1\u526a\u5904\u7406\uff0c\u7531\u4e8eAOT\u4e3b\u5de5\u7a0b\u91cc\u7684\u4ee3\u7801\u4e00\u822c\u4e0d\u591a\uff0c\u5927\u91cf\u7684C#\u7c7b\u578b\u548c\u51fd\u6570\u88ab\n\u88c1\u526a\uff0c\u5bfc\u81f4\u70ed\u66f4\u65b0\u4e2d\u8c03\u7528\u8fd9\u4e9b\u88ab\u88c1\u526a\u7c7b\u6216\u51fd\u6570\u51fa\u73b0\u5982\u4e0b\u5f02\u5e38\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-txt"},"    // \u7c7b\u578b\u7f3a\u5931\u9519\u8bef\n    Unity: TypeLoadException: Could not load type 'Xxx' from assembly 'yyy'\n\n    // \u51fd\u6570\u7f3a\u5931\u9519\u8bef\n    MissingMethodException: xxxx\n")),(0,i.kt)("h2",{id:"\u89e3\u51b3\u529e\u6cd5"},"\u89e3\u51b3\u529e\u6cd5"),(0,i.kt)("p",null,"\u6839\u636e\u65e5\u5fd7\u9519\u8bef\u65e5\u5fd7\u786e\u5b9a\u54ea\u4e2a\u7c7b\u578b\u6216\u51fd\u6570\u88ab\u88c1\u51cf\uff0c\u5728link.xml\u91cc\u4fdd\u7559\u8fd9\u4e2a\u7c7b\u578b\u6216\u51fd\u6570\uff0c\u6216\u8005\u5728\u4e3b\u5de5\u7a0b\u91cc\u663e\u5f0f\u5730\u52a0\u4e0a\u5bf9\u8fd9\u4e9b\u7c7b\u6216\u51fd\u6570\u7684\u8c03\u7528\u3002\n\u5982\u679c\u4e0d\u719f\u6089\u5982\u4f55\u5728link.xml\u4fdd\u7559\u8fd9\u4e2a\u7c7b\u578b\u6216\u51fd\u6570\uff0c\u8bf7\u53c2\u9605",(0,i.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/ManagedCodeStripping.html"},"\u4ee3\u7801\u88c1\u526a"),"\u3002"),(0,i.kt)("p",null,'\u4f46\u8fd9\u79cd\u529e\u6cd5\u7ec8\u7a76\u5f88\u9ebb\u70e6\uff0c\u5b9e\u9645\u9879\u76ee\u4e2d\u6709\u5927\u91cf\u88ab\u88c1\u526a\u7684\u7c7b\u578b\uff0c\u4f60\u4e00\u904d\u904d\u5730\u8fdb\u884c"\u6253\u5305-\u7c7b\u578b\u7f3a\u5931-\u8865\u5145-\u6253\u5305"\u7684\u64cd\u4f5c\uff0c\n\u6d6a\u8d39\u4e86\u592a\u591a\u65f6\u95f4\u3002 ',(0,i.kt)("inlineCode",{parentName:"p"},"com.code-philosophy.hybridclr")," \u5305\u63d0\u4f9b\u4e86\u4e00\u4e2a\u4fbf\u6377\u7684\u83dc\u5355\u547d\u4ee4",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/LinkXml"),"\uff0c\n\u80fd\u4e00\u952e\u751f\u6210\u70ed\u66f4\u65b0\u5de5\u7a0b\u91cc\u7684\u6240\u6709AOT\u7c7b\u578b\u53ca\u51fd\u6570\u5f15\u7528\u3002"),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"\u6ce8\u610f\uff0c\u5982\u679c\u4f60\u4e3b\u5de5\u7a0b\u4e2d\u6ca1\u6709\u5f15\u7528\u8fc7\u67d0\u4e2a\u7a0b\u5e8f\u96c6\u7684\u4efb\u4f55\u4ee3\u7801\uff0c\u5373\u4f7f\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"link.xml"),"\u4e2d\u4fdd\u7559\uff0c\u8be5\u7a0b\u5e8f\u96c6\u4e5f\u4f1a\u88ab\u5b8c\u5168\u88c1\u526a\u3002\u56e0\u6b64\u5bf9\u4e8e\u6bcf\u4e2a\u8981\u4fdd\u7559\u7684AOT\u7a0b\u5e8f\u96c6\uff0c\n\u8bf7\u786e\u4fdd\u5728\u4e3b\u5de5\u7a0b\u4ee3\u7801\u4e2d\u663e\u5f0f\u5f15\u7528\u8fc7\u5b83\u7684\u67d0\u4e2a\u7c7b\u6216\u51fd\u6570\u3002")),(0,i.kt)("h2",{id:"aot\u7c7b\u578b\u53ca\u51fd\u6570\u9884\u7559"},"AOT\u7c7b\u578b\u53ca\u51fd\u6570\u9884\u7559"),(0,i.kt)("p",null,"com.code-philosophy.hybridclrophy.hybridclr\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/LinkXml"),"\u547d\u4ee4\u867d\u7136\u53ef\u4ee5\u667a\u80fd\u5730\u626b\u63cf\u51fa\u4f60\u5f53\u524d\u5f15\u7528\u7684AOT\u7c7b\u578b\uff0c\u5374\u4e0d\u80fd\u9884\u77e5\u4f60\u672a\u6765\u5c06\u6765\u4f7f\u7528\u7684\n\u7c7b\u578b\u3002\u56e0\u6b64\u4f60\u4ecd\u7136\u9700\u8981\u6709\u89c4\u5212\u5730\u63d0\u524d\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"Assets/link.xml"),"(\u6ce8\u610f\uff01\u4e0d\u662f\u81ea\u52a8\u751f\u6210\u7684\u90a3\u4e2alink.xml)\u9884\u7559\u4f60\u5c06\u6765\n\u53ef\u80fd\u7528\u5230\u7684\u7c7b\u578b\u3002\u5207\u8bb0\u4e0d\u8981\u758f\u6f0f\uff0c\u514d\u5f97\u51fa\u73b0\u4e0a\u7ebf\u540e\u67d0\u6b21\u66f4\u65b0\u4f7f\u7528\u7684\u7c7b\u578b\u88ab\u88c1\u526a\u7684\u5c34\u5c2c\u72b6\u51b5\uff01"))}u.isMDXComponent=!0}}]);