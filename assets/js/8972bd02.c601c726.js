"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8386],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>y});var i=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},l=Object.keys(e);for(i=0;i<l.length;i++)r=l[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)r=l[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=i.createContext({}),o=function(e){var t=i.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},u=function(e){var t=o(e.components);return i.createElement(c.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),s=o(r),d=n,y=s["".concat(c,".").concat(d)]||s[d]||m[d]||l;return r?i.createElement(y,p(p({ref:t},u),{},{components:r})):i.createElement(y,p({ref:t},u))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,p=new Array(l);p[0]=d;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a[s]="string"==typeof e?e:n,p[1]=a;for(var o=2;o<l;o++)p[o]=r[o];return i.createElement.apply(null,p)}return i.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6566:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>m,frontMatter:()=>l,metadata:()=>a,toc:()=>o});var i=r(7462),n=(r(7294),r(3905));const l={},p="\u4ee3\u7801\u7ed3\u6784\u53ca\u7248\u672c",a={unversionedId:"basic/architecture",id:"version-7.6.0/basic/architecture",title:"\u4ee3\u7801\u7ed3\u6784\u53ca\u7248\u672c",description:"\u5b8c\u6574\u7684HybridCLR\u4ee3\u7801\u7531\u4e09\u4e2a\u4ed3\u5e93\u6784\u6210\uff1a",source:"@site/versioned_docs/version-7.6.0/basic/architecture.md",sourceDirName:"basic",slug:"/basic/architecture",permalink:"/docs/7.6.0/basic/architecture",draft:!1,tags:[],version:"7.6.0",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"HybridCLR+lua/js/python",permalink:"/docs/7.6.0/basic/workwithscriptlanguage"},next:{title:"HybridCLR\u6e90\u7801\u7ed3\u6784\u53ca\u8c03\u8bd5",permalink:"/docs/7.6.0/basic/sourceinspect"}},c={},o=[{value:"il2cpp_plus",id:"il2cpp_plus",level:2},{value:"hybridclr",id:"hybridclr",level:2},{value:"com.code-philosophy.hybridclr",id:"comcode-philosophyhybridclr",level:2}],u={toc:o},s="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(s,(0,i.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"\u4ee3\u7801\u7ed3\u6784\u53ca\u7248\u672c"},"\u4ee3\u7801\u7ed3\u6784\u53ca\u7248\u672c"),(0,n.kt)("p",null,"\u5b8c\u6574\u7684HybridCLR\u4ee3\u7801\u7531\u4e09\u4e2a\u4ed3\u5e93\u6784\u6210\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"il2cpp_plus"),(0,n.kt)("li",{parentName:"ul"},"hybridclr"),(0,n.kt)("li",{parentName:"ul"},"com.code-philosophy.hybridclr")),(0,n.kt)("p",null,"\u8fd9\u4e09\u4e2a\u4ed3\u5e93\u6709\u72ec\u7acb\u7684\u7248\u672c\u53f7\uff0c\u56e0\u6b64\u8c08\u5230HybridCLR\u7248\u672c\u65f6\uff0c\u4e00\u822c\u5305\u542b\u8fd9\u4e09\u4e2a\u7248\u672c\u53f7\u3002"),(0,n.kt)("h2",{id:"il2cpp_plus"},"il2cpp_plus"),(0,n.kt)("p",null,"\u4ed3\u5e93\u5730\u5740 ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/il2cpp_plus"},"github")," ",(0,n.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/il2cpp_plus"},"gitee"),"\u3002"),(0,n.kt)("p",null,"HybridCLR\u6269\u5c55il2cpp\u8fd0\u884c\u65f6\uff0c\u9700\u8981\u5bf9\u539f\u59cbil2cpp\u4ee3\u7801\u4f5c\u5c11\u91cf\u8c03\u6574\uff0c\u4ee5\u652f\u6301\u6df7\u5408\u8fd0\u884c\u6a21\u5f0f\u3002\u8fd9\u90e8\u5206\u4ee3\u7801\u5bf9\u5e94\u4e86 il2cpp_plus \u4ed3\u5e93\u3002\u7531\u4e8eil2cpp\u6bcf\u4e2a\u5e74\u5ea6\u5927\u7248\u672c\u53d8\u5316\u8f83\u5927\uff0c\u9700\u8981\u5bf9\u6bcf\u4e2aUnity\u5927\u7248\u672c\u5355\u72ec\u8fdb\u884c\u9002\u914d\u3002"),(0,n.kt)("p",null,"\u6bcf\u4e2a\u5e74\u5ea6\u7248\u672c\u90fd\u5bf9\u5e94\u4e00\u4e2a ",(0,n.kt)("inlineCode",{parentName:"p"},"{version}-main"),"\u4e3b\u5206\u652f\uff0c\u5982 ",(0,n.kt)("inlineCode",{parentName:"p"},"2021-main"),"\u3002"),(0,n.kt)("p",null,"\u5f53\u524d\u6bcf\u4e2a\u5e74\u5ea6\u7248\u672c\u8fd8\u6709\u4e00\u4e2a\u8001\u76841.0\u5206\u652f ",(0,n.kt)("inlineCode",{parentName:"p"},"{version}-1.0"),"\uff0c\u5982 ",(0,n.kt)("inlineCode",{parentName:"p"},"2019-1.0"),"\u3002"),(0,n.kt)("h2",{id:"hybridclr"},"hybridclr"),(0,n.kt)("p",null,"\u4ed3\u5e93\u5730\u5740 ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr"},"github")," ",(0,n.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/hybridclr"},"gitee")," "),(0,n.kt)("p",null,"hybridclr\u4ed3\u5e93\u4e2d\u5305\u542b\u4e86\u89e3\u91ca\u5668\u7684\u6838\u5fc3\u4ee3\u7801\uff0c\u6240\u6709il2cpp_plus\u5171\u4eab\u540c\u4e00\u5957hybridclr\u4ee3\u7801\uff0c\u4e0d\u533a\u5206Unity\u5927\u7248\u672c\u3002\u5f53\u524d\u6709\u4e24\u4e2a\u5206\u652f\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"main"),(0,n.kt)("li",{parentName:"ul"},"3.x"),(0,n.kt)("li",{parentName:"ul"},"2.x"),(0,n.kt)("li",{parentName:"ul"},"1.0")),(0,n.kt)("h2",{id:"comcode-philosophyhybridclr"},"com.code-philosophy.hybridclr"),(0,n.kt)("p",null,"\u4ed3\u5e93\u5730\u5740 ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr_unity"},"github")," ",(0,n.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/hybridclr_unity"},"gitee")),(0,n.kt)("p",null,"com.code-philosophy.hybridclr\u662fUnity Package\uff0c\u5305\u542b\u4e00\u4e9b\u4f7f\u7528HybridCLR\u6240\u9700\u7684\u8fd0\u884c\u65f6\u4ee3\u7801\u53ca\u7f16\u8f91\u5668\u5de5\u4f5c\u6d41\u5de5\u5177\u3002"),(0,n.kt)("p",null,"com.code-philosophy.hybridclr\u4e5f\u4e0d\u533a\u5206Unity\u5927\u7248\u672c\uff0c\u56e0\u6b64\u50cfhybridclr\u4e00\u6837\uff0c\u5f53\u524d\u6709\u4e24\u4e2a\u5206\u652f\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"main"),(0,n.kt)("li",{parentName:"ul"},"3.x"),(0,n.kt)("li",{parentName:"ul"},"2.x"),(0,n.kt)("li",{parentName:"ul"},"1.0")),(0,n.kt)("p",null,"\u5728\u65e9\u671f\u7248\u672c\u4e2d\uff08\u59821.0\u5206\u652f\uff09,\u9700\u8981\u5728Installer\u4e2d\u6307\u5b9a\u4f60\u8981\u5b89\u88c5\u7684il2cpp_plus\u548chybridclr\u7684\u5206\u652f\u3002\u8fd9\u4e24\u4e2a\u4ed3\u5e93\u7684\u5206\u652f\u5fc5\u987b\u5339\u914d\uff0c\n\u5373 il2cpp_plus \u7684",(0,n.kt)("inlineCode",{parentName:"p"},"{version}-main"),"\u4e0ehybridclr\u7684",(0,n.kt)("inlineCode",{parentName:"p"},"main"),"\u5339\u914d\uff0c ",(0,n.kt)("inlineCode",{parentName:"p"},"{version}-1.0"),"\u4e0e",(0,n.kt)("inlineCode",{parentName:"p"},"1.0"),"\u5339\u914d\u3002"),(0,n.kt)("p",null,"\u81ea ",(0,n.kt)("inlineCode",{parentName:"p"},"v2.0.0-rc"),"\u7248\u672c\uff08\u5c5e\u4e8emain\u5206\u652f\uff09\u8d77\uff0ccom.code-philosophy.hybridclr\u4e2d\u76f4\u63a5\u914d\u7f6e\u4e86\u4e0e\u5b83\u517c\u5bb9\u7684 il2cpp_plus\u53cahybridclr\u4ed3\u5e93\u7684\u7248\u672c\u53f7\u3002\u5bf9\u4e8e\u5f00\u53d1\u8005\u6765\u8bf4\uff0c\n\u53ea\u9700\u8981\u5b89\u88c5\u5408\u9002\u7684com.code-philosophy.hybridclr\u7248\u672c\u5373\u53ef\u3002"))}m.isMDXComponent=!0}}]);