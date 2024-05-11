"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1286],{3905:(t,e,n)=>{n.d(e,{Zo:()=>d,kt:()=>g});var a=n(7294);function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,a,l=function(t,e){if(null==t)return{};var n,a,l={},r=Object.keys(t);for(a=0;a<r.length;a++)n=r[a],e.indexOf(n)>=0||(l[n]=t[n]);return l}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(a=0;a<r.length;a++)n=r[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(l[n]=t[n])}return l}var m=a.createContext({}),o=function(t){var e=a.useContext(m),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},d=function(t){var e=o(t.components);return a.createElement(m.Provider,{value:e},t.children)},u="mdxType",s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},k=a.forwardRef((function(t,e){var n=t.components,l=t.mdxType,r=t.originalType,m=t.parentName,d=p(t,["components","mdxType","originalType","parentName"]),u=o(n),k=l,g=u["".concat(m,".").concat(k)]||u[k]||s[k]||r;return n?a.createElement(g,i(i({ref:e},d),{},{components:n})):a.createElement(g,i({ref:e},d))}));function g(t,e){var n=arguments,l=e&&e.mdxType;if("string"==typeof t||l){var r=n.length,i=new Array(r);i[0]=k;var p={};for(var m in e)hasOwnProperty.call(e,m)&&(p[m]=e[m]);p.originalType=t,p[u]="string"==typeof t?t:l,i[1]=p;for(var o=2;o<r;o++)i[o]=n[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},7908:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>m,contentTitle:()=>i,default:()=>s,frontMatter:()=>r,metadata:()=>p,toc:()=>o});var a=n(7462),l=(n(7294),n(3905));const r={},i="DOTS\u652f\u6301",p={unversionedId:"basic/dots",id:"basic/dots",title:"DOTS\u652f\u6301",description:"DOTS\u7684TypeManager\u521d\u59cb\u5316\u65f6\u673a\u8fc7\u65e9\uff0c\u800c\u4e14\u4e0d\u652f\u6301\u52a8\u6001\u6ce8\u518cComponent\u548cSystem\u7b49\u7c7b\u578b\u3002\u4e3a\u4e86\u8ba9\u70ed\u66f4\u65b0\u6a21\u5757\u80fd\u5728DOTS\u7cfb\u7edf\u4e2d\u6b63\u5e38",source:"@site/docs/basic/dots.md",sourceDirName:"basic",slug:"/basic/dots",permalink:"/docs/basic/dots",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6865\u63a5\u51fd\u6570",permalink:"/docs/basic/methodbridge"},next:{title:"\u5185\u5b58\u4e0eGC",permalink:"/docs/basic/memory"}},m={},o=[{value:"\u652f\u6301\u7684\u7248\u672c",id:"\u652f\u6301\u7684\u7248\u672c",level:2},{value:"\u652f\u6301\u7684\u7279\u6027",id:"\u652f\u6301\u7684\u7279\u6027",level:2},{value:"1.0.16\u7248\u672c",id:"1016\u7248\u672c",level:3},{value:"0.51.1-preview.21\u7248\u672c",id:"0511-preview21\u7248\u672c",level:3},{value:"\u5b89\u88c5",id:"\u5b89\u88c5",level:2},{value:"\u5b89\u88c5com.unity.entities",id:"\u5b89\u88c5comunityentities",level:3},{value:"\u4fee\u6539\u9879\u76ee\u8bbe\u7f6e",id:"\u4fee\u6539\u9879\u76ee\u8bbe\u7f6e",level:3},{value:"\u521d\u59cb\u5316",id:"\u521d\u59cb\u5316",level:3},{value:"\u89e3\u51b3ReversePInvokeCallback\u7684\u95ee\u9898",id:"\u89e3\u51b3reversepinvokecallback\u7684\u95ee\u9898",level:3},{value:"Burst\u76f8\u5173",id:"burst\u76f8\u5173",level:3}],d={toc:o},u="wrapper";function s(t){let{components:e,...n}=t;return(0,l.kt)(u,(0,a.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"dots\u652f\u6301"},"DOTS\u652f\u6301"),(0,l.kt)("p",null,"DOTS\u7684TypeManager\u521d\u59cb\u5316\u65f6\u673a\u8fc7\u65e9\uff0c\u800c\u4e14\u4e0d\u652f\u6301\u52a8\u6001\u6ce8\u518cComponent\u548cSystem\u7b49\u7c7b\u578b\u3002\u4e3a\u4e86\u8ba9\u70ed\u66f4\u65b0\u6a21\u5757\u80fd\u5728DOTS\u7cfb\u7edf\u4e2d\u6b63\u5e38\n\u8fd0\u884c\uff0c\u9700\u8981\u5bf9DOTS\u6e90\u7801\u8fdb\u884c\u4fee\u6539\uff0c\u8c03\u6574World\u7684\u7684\u521d\u59cb\u5316\u65f6\u673a\u3002"),(0,l.kt)("h2",{id:"\u652f\u6301\u7684\u7248\u672c"},"\u652f\u6301\u7684\u7248\u672c"),(0,l.kt)("p",null,"\u7531\u4e8eDOTS\u4ecd\u7136\u5728\u5feb\u901f\u8fed\u4ee3\u548c\u4fee\u6539\uff0c\u4e3a\u4e86\u51cf\u5c11\u7ef4\u62a4\u6210\u672c\uff0c\u53ea\u7ef4\u62a4\u4ee5\u4e0b\u51e0\u4e2a\u7248\u672c\u7684com.unity.entities\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"0.51.1-preview.21"),(0,l.kt)("li",{parentName:"ul"},"1.0.16")),(0,l.kt)("p",null,"\u76ee\u524d\u4ec5\u5728Unity 2021+\u7248\u672c\u4e0a\u5b8c\u6210\u6d4b\u8bd5\uff0cUnity 2020\u53ca\u66f4\u4f4e\u7248\u672c\u672a\u6d4b\u8bd5\u517c\u5bb9\u6027\u3002\u4e00\u822c\u6765\u8bf4\uff0c\u53ea\u8981\u5bf9\u5e94\u7248\u672c\u7684com.unity.entities\u80fd\n\u5728\u8be5Unity\u7248\u672c\u4e0a\u6b63\u5e38\u8fd0\u884c\uff0c\u4e5f\u80fd\u652f\u6301hybridclr\u3002"),(0,l.kt)("p",null,"\u6709\u7279\u6b8aDOTS\u7248\u672c\u9700\u6c42\u7684\u5f00\u53d1\u8005\uff0c\u7531\u4e8e\u7ef4\u62a4\u5355\u72ec\u7684DOTS\u7248\u672c\u6210\u672c\u8f83\u9ad8\uff0c\u9700\u8981\u8054\u7cfb\u6211\u4eec\u5355\u72ec\u4ed8\u8d39\u5b9a\u5236\u3002"),(0,l.kt)("h2",{id:"\u652f\u6301\u7684\u7279\u6027"},"\u652f\u6301\u7684\u7279\u6027"),(0,l.kt)("p",null,"\u76ee\u524d\u7edd\u5927\u591a\u6570DOTS\u7279\u6027\u90fd\u53ef\u4ee5\u5728hybridclr\u4e0b\u6b63\u5e38\u8fd0\u884c\uff0c\u53ea\u6709\u8ddfBurstCompile\u53ca\u8d44\u6e90\u5e8f\u5217\u5316\u76f8\u5173\u7684\u7279\u6027\u652f\u6301\u8f83\u5dee\u3002"),(0,l.kt)("h3",{id:"1016\u7248\u672c"},"1.0.16\u7248\u672c"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u7279\u6027"),(0,l.kt)("th",{parentName:"tr",align:null},"\u793e\u533a\u7248\u672c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u4e13\u4e1a\u7248"),(0,l.kt)("th",{parentName:"tr",align:null},"\u65d7\u8230\u7248"),(0,l.kt)("th",{parentName:"tr",align:null},"\u70ed\u91cd\u8f7d\u7248"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Jobs"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Managed Component"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Unmanaged Component"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Managed System"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Unmanaged System"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Aspect"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"IJobEntity"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"BurstCompile"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"SubScene"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})))),(0,l.kt)("h3",{id:"0511-preview21\u7248\u672c"},"0.51.1-preview.21\u7248\u672c"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u7279\u6027"),(0,l.kt)("th",{parentName:"tr",align:null},"\u793e\u533a\u7248\u672c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u4e13\u4e1a\u7248"),(0,l.kt)("th",{parentName:"tr",align:null},"\u65d7\u8230\u7248"),(0,l.kt)("th",{parentName:"tr",align:null},"\u70ed\u91cd\u8f7d\u7248"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Jobs"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Managed Component"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Unmanaged Component"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Managed System"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Unmanaged System"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"IJobEntity"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"BurstCompile"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"SubScene"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})))),(0,l.kt)("h2",{id:"\u5b89\u88c5"},"\u5b89\u88c5"),(0,l.kt)("h3",{id:"\u5b89\u88c5comunityentities"},"\u5b89\u88c5com.unity.entities"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5728\u9879\u76ee\u4e2d\u79fb\u9664 com.unity.entities\u5305\uff0c\u9000\u51faUnity Editor\uff0c\u6e05\u7a7a ",(0,l.kt)("inlineCode",{parentName:"li"},"Library\\PackageCache")," \u76ee\u5f55\u4e0b\u8be5\u5305\u5bf9\u5e94\u7684\u76ee\u5f55"),(0,l.kt)("li",{parentName:"ul"},"\u6839\u636e\u9879\u76ee\u4f7f\u7528\u7684\u7248\u672c\uff0c\u4e0b\u8f7d",(0,l.kt)("a",{parentName:"li",href:"https://code-philosophy.feishu.cn/file/NH0cbaeneozfd8xdbvmcLNvfn2d"},"\u4fee\u6539\u540e\u7684com.unity.entities"),"\uff0c\u5c06\u5bf9\u5e94\u76ee\u5f55\u4e0b\u7684",(0,l.kt)("inlineCode",{parentName:"li"},"com.unity.entities.7z")," \u89e3\u538b\u5230 Packages\u76ee\u5f55\u3002\u8bf7\u786e\u4fdd\u89e3\u538b\u540e\u7684\u76ee\u5f55\u540d\u4e3acom.unity.entities\u3002")),(0,l.kt)("p",null,"\u91cd\u65b0\u6253\u5f00Unity Editor\u65f6\u53ef\u80fd\u4f1a\u63d0\u793a\u662f\u5426\u8981\u8fdb\u884cApi\u5347\u7ea7\uff0c\u6839\u636e\u9879\u76ee\u60c5\u51b5\u81ea\u884c\u51b3\u5b9a\u662f\u5426\u5347\u7ea7\u3002"),(0,l.kt)("h3",{id:"\u4fee\u6539\u9879\u76ee\u8bbe\u7f6e"},"\u4fee\u6539\u9879\u76ee\u8bbe\u7f6e"),(0,l.kt)("p",null,"\u4e3a\u4e86\u907f\u514dDOTS\u8fd0\u884c\u8fc7\u7a0b\u4e2d\u5e26\u52a8\u6001\u6ce8\u518cComponent\u6216System\u53ef\u80fd\u5f15\u53d1\u7684\u95ee\u9898\uff0c\u9700\u8981\u8c03\u6574World\u7684\u521d\u59cb\u5316\u65f6\u673a\u4ee5\u786e\u4fdd\u8fd0\u884c\u6240\u6709World\u4e4b\u524d\u5df2\u7ecf\u6ce8\u518c\u4e86\u6240\u6709\u70ed\u66f4\u65b0\u7c7b\u578b\u3002"),(0,l.kt)("p",null,"\u5728",(0,l.kt)("inlineCode",{parentName:"p"},"Player Settings"),"\u7684",(0,l.kt)("inlineCode",{parentName:"p"},"Scripting Define Symbols"),"\u4e2d\uff0c\u6dfb\u52a0\u7f16\u8bd1\u5b8f ",(0,l.kt)("inlineCode",{parentName:"p"},"UNITY_DISABLE_AUTOMATIC_SYSTEM_BOOTSTRAP_RUNTIME_WORLD"),"\u3002\u8be6\u7ec6\u4ecb\u7ecd\u53ef\u4ee5\u53c2\u89c1World\u7684\n",(0,l.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Packages/com.unity.entities@0.51/manual/world.html"},"\u81ea\u5b9a\u4e49\u521d\u59cb\u5316\u6587\u6863"),"\u3002"),(0,l.kt)("h3",{id:"\u521d\u59cb\u5316"},"\u521d\u59cb\u5316"),(0,l.kt)("p",null,"\u4e3a\u4e86\u907f\u514d\u9047\u5230\u95ee\u9898\uff0c\u8bf7\u5728",(0,l.kt)("strong",{parentName:"p"},"\u52a0\u8f7d\u5b8c\u70ed\u66f4\u65b0\u4ee3\u7801\u540e\uff0c\u8fd0\u884c\u4efb\u4f55dots\u4ee3\u7801\u4e4b\u524d"),"\u8fdb\u884c\u521d\u59cb\u5316\u3002"),(0,l.kt)("p",null,"\u521d\u59cb\u5316\u4e2d\u4e3b\u8981\u5305\u542b\u4e24\u90e8\u5206\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u6ce8\u518c\u70ed\u66f4\u65b0\u7684dots\u7c7b\u578b"),(0,l.kt)("li",{parentName:"ul"},"\u521d\u59cb\u5316World")),(0,l.kt)("p",null,"\u4e0d\u540c\u7684com.unity.entities\u7248\u672c\u7684\u521d\u59cb\u5316\u5b9e\u73b0\u7565\u6709\u5dee\u522b\u3002"),(0,l.kt)("p",null,"0.51.1\u7248\u672c\u521d\u59cb\u5316\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},'    private static void InitializeWorld()\n    {\n#if !UNITY_EDITOR\n        var dotsAssemblies = new Assembly[] { ... };\n        var componentTypes = new HashSet<System.Type>();\n        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);\n        TypeManager.AddNewComponentTypes(componentTypes.ToArray());\n        TypeManager.EarlyInitAssemblies(dotsAssemblies);\n#endif\n\n\n        DefaultWorldInitialization.Initialize("Default World", false);\n\n    }\n')),(0,l.kt)("p",null,"1.0.16\u7248\u672c\u7684\u521d\u59cb\u5316\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},'    private static void InitializeWorld()\n    {\n#if !UNITY_EDITOR\n        var dotsAssemblies = new Assembly[] { ... };\n        var componentTypes = new HashSet<Type>();\n        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);\n        TypeManager.AddComponentTypes(dotsAssemblies, componentTypes);\n        TypeManager.RegisterSystemTypes(dotsAssemblies);\n        TypeManager.InitializeSharedStatics();\n        TypeManager.EarlyInitAssemblies(dotsAssemblies);\n#endif\n\n\n        DefaultWorldInitialization.Initialize("Default World", false);\n    }\n')),(0,l.kt)("h3",{id:"\u89e3\u51b3reversepinvokecallback\u7684\u95ee\u9898"},"\u89e3\u51b3ReversePInvokeCallback\u7684\u95ee\u9898"),(0,l.kt)("p",null,"DOTS\u7cfb\u7edf\u521d\u59cb\u5316Unmanaged System\u65f6\u4f1a\u5c1d\u8bd5\u83b7\u5f97\u5b83\u7684OnStart\u4e4b\u7c7b\u51fd\u6570\u7684Marshal\u6307\u9488\u3002hybridclr\u9700\u8981\u4e3a\u6bcf\u4e2a\u8fd9\u79cd\u51fd\u6570\u7ed1\u5b9a\u4e00\u4e2a\u8fd0\u884c\u65f6\u552f\u4e00\u7684cpp\u51fd\u6570\u6307\u9488\uff0c\n\u5426\u5219\u8fd0\u884c\u8fc7\u7a0b\u4e2d\u4f1a\u51fa\u73b0",(0,l.kt)("inlineCode",{parentName:"p"},"GetReversePInvokeWrapper fail. exceed max wrapper num of method"),"\u9519\u8bef\u3002\u8be6\u7ec6\u4ecb\u7ecd\u53ef\u89c1",(0,l.kt)("a",{parentName:"p",href:"https://hybridclr.doc.code-philosophy.com/docs/basic/workwithscriptlanguage"},"HybridCLR+lua/js/python"),"\u6587\u6863\u3002"),(0,l.kt)("p",null,"\u7b80\u5355\u6765\u8bf4\uff0c\u9700\u8981\u9884\u7559\u8db3\u591f\u591a\u7684 SystemBaseRegistry.ForwardingFunc\u5bf9\u5e94\u7684 wrapper\u51fd\u6570\u3002\u5728\u70ed\u66f4\u65b0\u6a21\u5757\uff08\u4e5f\u53ef\u4ee5\u5728DHE\u7a0b\u5e8f\u96c6\uff0c\u4f46\u4e0d\u80fd\u5728AOT\u7a0b\u5e8f\u96c6\uff09\u4e2d\u6dfb\u52a0\u5982\u4e0b\u4ee3\u7801\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},"public static class PreserveDOTSReversePInvokeWrapper\n{\n    [ReversePInvokeWrapperGeneration(100)]\n    [MonoPInvokeCallback(typeof(SystemBaseRegistry.ForwardingFunc))]\n    public static void ForwordMethod(IntPtr system, IntPtr state)\n    {\n\n    }\n}\n\n\n")),(0,l.kt)("p",null,"\u5c06\u4ee3\u7801\u4e2d\u7684100\u6539\u4e3a\u4e00\u4e2a\u9002\u5f53\u7684\u6570\u5b57\u5373\u53ef\uff0c\u63a8\u8350\u4e3aUnmanaged System\u7c7b\u578b\u4e2a\u6570\u76845-10\u500d\u3002"),(0,l.kt)("h3",{id:"burst\u76f8\u5173"},"Burst\u76f8\u5173"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5305\u542b",(0,l.kt)("inlineCode",{parentName:"li"},"[BurstCompile]"),"\u7684\u70ed\u66f4\u65b0\u51fd\u6570\u53d1\u751f\u53d8\u5316\uff0c\u9700\u8981\u53bb\u6389",(0,l.kt)("inlineCode",{parentName:"li"},"[BurstCompile]"),"\u7279\u6027\uff0c\u5426\u5219\u8fd0\u884c\u4f1a\u62a5\u9519\u3002\u8fd9\u4e2a\u95ee\u9898\u540e\u9762\u53ef\u80fd\u4f1a\u4f18\u5316")))}s.isMDXComponent=!0}}]);