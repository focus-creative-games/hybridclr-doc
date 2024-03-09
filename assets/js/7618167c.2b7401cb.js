"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3764],{3905:(t,e,n)=>{n.d(e,{Zo:()=>m,kt:()=>N});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},l=Object.keys(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var o=r.createContext({}),d=function(t){var e=r.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},m=function(t){var e=d(t.components);return r.createElement(o.Provider,{value:e},t.children)},u="mdxType",k={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},c=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,l=t.originalType,o=t.parentName,m=p(t,["components","mdxType","originalType","parentName"]),u=d(n),c=a,N=u["".concat(o,".").concat(c)]||u[c]||k[c]||l;return n?r.createElement(N,i(i({ref:e},m),{},{components:n})):r.createElement(N,i({ref:e},m))}));function N(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var l=n.length,i=new Array(l);i[0]=c;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p[u]="string"==typeof t?t:a,i[1]=p;for(var d=2;d<l;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3060:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>i,default:()=>k,frontMatter:()=>l,metadata:()=>p,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const l={},i="\u6865\u63a5\u51fd\u6570",p={unversionedId:"basic/methodbridge",id:"basic/methodbridge",title:"\u6865\u63a5\u51fd\u6570",description:"HybridCLR\u7684interpreter\u4e0eAOT\u4e4b\u95f4\u9700\u8981\u53cc\u5411\u51fd\u6570\u8c03\u7528\u3002\u6bd4\u5982interpreter\u8c03\u7528AOT\u51fd\u6570\uff0c\u6216\u8005AOT\u901a\u8fc7interface\u63a5\u53e3\u6216\u8005delegate\u56de\u8c03interpreter\u3002",source:"@site/docs/basic/methodbridge.md",sourceDirName:"basic",slug:"/basic/methodbridge",permalink:"/docs/basic/methodbridge",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"AOT\u6cdb\u578b",permalink:"/docs/basic/aotgeneric"},next:{title:"DOTS\u652f\u6301",permalink:"/docs/basic/dots"}},o={},d=[{value:"\u6865\u63a5\u51fd\u6570\u7b7e\u540d",id:"\u6865\u63a5\u51fd\u6570\u7b7e\u540d",level:2},{value:"\u751f\u6210\u6865\u63a5\u51fd\u6570",id:"\u751f\u6210\u6865\u63a5\u51fd\u6570",level:2},{value:"\u5e73\u53f0\u76f8\u5173",id:"\u5e73\u53f0\u76f8\u5173",level:2}],m={toc:d},u="wrapper";function k(t){let{components:e,...n}=t;return(0,a.kt)(u,(0,r.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u6865\u63a5\u51fd\u6570"},"\u6865\u63a5\u51fd\u6570"),(0,a.kt)("p",null,"HybridCLR\u7684interpreter\u4e0eAOT\u4e4b\u95f4\u9700\u8981\u53cc\u5411\u51fd\u6570\u8c03\u7528\u3002\u6bd4\u5982interpreter\u8c03\u7528AOT\u51fd\u6570\uff0c\u6216\u8005AOT\u901a\u8fc7interface\u63a5\u53e3\u6216\u8005delegate\u56de\u8c03interpreter\u3002"),(0,a.kt)("p",null,"AOT\u90e8\u5206\u4e0e\u89e3\u91ca\u5668\u90e8\u5206\u7684\u53c2\u6570\u4f20\u9012\u548c\u5b58\u50a8\u65b9\u5f0f\u662f\u4e0d\u540c\u7684\u3002\u89e3\u91ca\u5668\u90e8\u5206\u8c03\u7528AOT\u51fd\u6570\uff0c\u89e3\u91ca\u5668\u7684\u53c2\u6570\u5168\u5728\u89e3\u91ca\u5668\u6808\u4e0a\uff0c\u5fc5\u987b\u501f\u52a9\u5408\u9002\u7684\u529e\u6cd5\u624d\u80fd\u5c06\u89e3\u91ca\u5668\u7684\u51fd\u6570\u53c2\u6570\u4f20\u9012\u7ed9AOT\u51fd\u6570\u3002\u540c\u6837\u7684\uff0c\u89e3\u91ca\u5668\u65e0\u6cd5\u76f4\u63a5\u83b7\u5f97AOT\u56de\u8c03\u51fd\u6570\u7684\u53c2\u6570\u3002\u5fc5\u987b\u4e3a\u6bcf\u4e00\u79cd\u7b7e\u540d\u7684\u51fd\u6570\u751f\u6210\u5bf9\u5e94\u7684\u6865\u63a5\u51fd\u6570\uff0c\u6765\u5b9e\u73b0\u89e3\u91ca\u5668\u4e0eaot\u90e8\u5206\u7684\u53cc\u5411\u51fd\u6570\u53c2\u6570\u4f20\u9012\u3002",(0,a.kt)("inlineCode",{parentName:"p"},"interpreter -> AOT")," \u65b9\u5411\u7684\u8c03\u7528\uff0c\u867d\u7136\u53ef\u4ee5\u901a\u8fc7ffi\u4e4b\u7c7b\u7684\u5e93\u6765\u5b8c\u6210\uff0c\u4f46\u51fd\u6570\u8c03\u7528\u7684\u6210\u672c\u8fc7\u9ad8\uff0c\u6700\u5408\u7406\u7684\u65b9\u5f0f\u4ecd\u7136\u662f\u63d0\u524d\u751f\u6210\u597d\u8fd9\u79cd\u53cc\u5411\u6865\u63a5\u51fd\u6570\u3002\u89e3\u91ca\u5668\u5185\u90e8\u8c03\u7528\u76f4\u63a5\u8d70\u89e3\u91ca\u5668\u6808\uff0c\u4e0d\u9700\u8981\u6865\u63a5\u51fd\u6570\u3002"),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"\u6839\u636e\u6865\u63a5\u51fd\u6570\u7684\u539f\u7406\uff0c\u5bf9\u4e8e\u56fa\u5b9a\u7684AOT\u90e8\u5206\uff0c\u6865\u63a5\u51fd\u6570\u96c6\u662f\u786e\u5b9a\u7684\uff0c\u540e\u7eed\u65e0\u8bba\u8fdb\u884c\u4efb\u4f55\u70ed\u66f4\u65b0\uff0c\u90fd\u4e0d\u4f1a\u9700\u8981\u65b0\u7684\u989d\u5916\u6865\u63a5\u51fd\u6570\u3002",(0,a.kt)("strong",{parentName:"p"},"\u56e0\u6b64\u4e0d\u7528\u62c5\u5fc3\u70ed\u66f4\u4e0a\u7ebf\u540e\u7a81\u7136\u51fa\u73b0\u6865\u63a5\u51fd\u6570\u7f3a\u5931\u7684\u95ee\u9898\u3002"))),(0,a.kt)("h2",{id:"\u6865\u63a5\u51fd\u6570\u7b7e\u540d"},"\u6865\u63a5\u51fd\u6570\u7b7e\u540d"),(0,a.kt)("p",null,"\u6865\u63a5\u51fd\u6570\u5fc5\u987b\u63d0\u524d\u5728AOT\u90e8\u5206\u751f\u6210\uff0c\u8fd9\u70b9\u8ddflua\u7684wrapper\u51fd\u6570\u539f\u7406\u76f8\u4f3c\u3002"),(0,a.kt)("p",null,"\u4e3a\u4e86\u7ed9\u6bcf\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"AOT <-> interpreter"),"\u4e4b\u95f4\u8c03\u7528\u7684\u51fd\u6570\u627e\u5230\u5bf9\u5e94\u7684\u6865\u63a5\u51fd\u6570\uff0c\u5fc5\u987b\u6709\u4e00\u79cd\u8ba1\u7b97\u51fd\u6570\u7b7e\u540d\u7684\u65b9\u5f0f\u3002\u53e6\u5916\uff0c\u53c2\u6570\u7c7b\u578b\u548c\u8fd4\u56de\u503c\u7c7b\u578b\u5b8c\u5168\u7b49\u6548\u7684\u51fd\u6570\u53ef\u4ee5\u5171\u4eab\u540c\u4e00\u4e2a\u6865\u63a5\u51fd\u6570\uff0c\u8fd9\u6781\u5927\u51cf\u5c11\u4e86\u6865\u63a5\u51fd\u6570\u7684\u4e2a\u6570\u3002\u5982\u4e0b\u793a\u4f8b\uff0cclass\u7c7b\u578b\u5171\u4eab\u76f8\u540c\u7684\u7b7e\u540d\u3002\u56e0\u6b64\u5b83\u4eec\u90fd\u53ef\u4ee5\u5171\u4eab\u4e00\u4e2a ",(0,a.kt)("inlineCode",{parentName:"p"},"object (object, long)")," \u7b7e\u540d\u7684\u6865\u63a5\u51fd\u6570\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"object Fun1(object a, long b);\nstring Fun2(string a, long b);\n")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,a.kt)("th",{parentName:"tr",align:null},"\u7b7e\u540d"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"sbyte"),(0,a.kt)("td",{parentName:"tr",align:null},"i1")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"byte"),(0,a.kt)("td",{parentName:"tr",align:null},"u1")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"bool"),(0,a.kt)("td",{parentName:"tr",align:null},"u1")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"char"),(0,a.kt)("td",{parentName:"tr",align:null},"u2")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"short"),(0,a.kt)("td",{parentName:"tr",align:null},"i2")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"ushort"),(0,a.kt)("td",{parentName:"tr",align:null},"u2")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"int"),(0,a.kt)("td",{parentName:"tr",align:null},"i4")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"uint"),(0,a.kt)("td",{parentName:"tr",align:null},"u4")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"long"),(0,a.kt)("td",{parentName:"tr",align:null},"i8")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"ulong"),(0,a.kt)("td",{parentName:"tr",align:null},"u8")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"IntPtr"),(0,a.kt)("td",{parentName:"tr",align:null},"i")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"UintPtr"),(0,a.kt)("td",{parentName:"tr",align:null},"u")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"float"),(0,a.kt)("td",{parentName:"tr",align:null},"r4")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"double"),(0,a.kt)("td",{parentName:"tr",align:null},"r8")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"class\u7c7b\u578b"),(0,a.kt)("td",{parentName:"tr",align:null},"u")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u6307\u9488\u7c7b\u578b"),(0,a.kt)("td",{parentName:"tr",align:null},"u")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"enum\u7c7b\u578b"),(0,a.kt)("td",{parentName:"tr",align:null},"underlying \u7c7b\u578b\u5bf9\u5e94\u7684\u7b7e\u540d\uff0c\u5982",(0,a.kt)("inlineCode",{parentName:"td"},"enum Color:short {}"),"\u7684\u7b7e\u540d\u4e3ai2")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"TypedReference"),(0,a.kt)("td",{parentName:"tr",align:null},"typedbyref")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"struct"),(0,a.kt)("td",{parentName:"tr",align:null},"\u5168\u5c40\u552f\u4e00struct\u7b7e\u540d, \u7c7b\u4f3c",(0,a.kt)("inlineCode",{parentName:"td"},"s{\u5e8f\u53f7}"),"\u8fd9\u6837")))),(0,a.kt)("h2",{id:"\u751f\u6210\u6865\u63a5\u51fd\u6570"},"\u751f\u6210\u6865\u63a5\u51fd\u6570"),(0,a.kt)("p",null,"com.code-philosophy.hybridclr package\u4e2d\u63d0\u4f9b\u5de5\u5177\u811a\u672c\uff0c\u63a8\u8350\u4f7f\u7528\u83dc\u5355\u547d\u4ee4 ",(0,a.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/All")," \u81ea\u52a8\u751f\u6210\u6240\u6709\u6865\u63a5\u51fd\u6570\u3002\u4f60\u4e5f\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/MethodBridge"),"\n\u751f\u6210\u6865\u63a5\u51fd\u6570\uff0c\u4f46\u8be5\u547d\u4ee4\u4f9d\u8d56",(0,a.kt)("inlineCode",{parentName:"p"},"\u88c1\u526a\u540e\u7684AOT dll"),"\u548c",(0,a.kt)("inlineCode",{parentName:"p"},"\u70ed\u66f4\u65b0dll"),"\uff0c\u800c",(0,a.kt)("inlineCode",{parentName:"p"},"\u88c1\u526a\u540e\u7684AOT dll"),"\u4f9d\u8d56\u4e8e",(0,a.kt)("inlineCode",{parentName:"p"},"\u751f\u6210LinkXml"),"\u548c",(0,a.kt)("inlineCode",{parentName:"p"},"\u751f\u6210Il2CppDef"),"\u3002\u56e0\u6b64\u5982\u679c\u6ca1\u6709\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/All"),"\u547d\u4ee4\uff0c\u5fc5\u987b\u5148\u4f9d\u6b21\u8fd0\u884c\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/Il2CppDef")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/LinkXml")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/CompileDll/ActiveBuildTarget")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/AotDlls")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/MethodBridge"))),(0,a.kt)("h2",{id:"\u5e73\u53f0\u76f8\u5173"},"\u5e73\u53f0\u76f8\u5173"),(0,a.kt)("p",null,"\u6865\u63a5\u51fd\u6570\u672c\u8eab\u662f\u5e73\u53f0\u65e0\u5173\u7684\u3002\u5bf9\u4e8e\u540c\u4e00\u4e2adll\uff0c\u6240\u6709\u5e73\u53f0\u751f\u6210\u7684\u6865\u63a5\u51fd\u6570\u6587\u4ef6\u5b8c\u5168\u76f8\u540c\u3002\u4f46\u7531\u4e8e\u7f16\u8bd1\u5b8f\u5f00\u5173\u53ca\u5404\u5e73\u53f0\u7684\u57fa\u7840\u5e93(mscorlib\u4e4b\u7c7b)\u4e0d\u540c\uff0c\u5bfc\u81f4\u4e0d\u540c\u5e73\u53f0\u751f\u6210\u7684\u6865\u63a5\u51fd\u6570\u4e5f\u4e0d\u540c\u3002\u56e0\u6b64",(0,a.kt)("strong",{parentName:"p"},"\u4e0d\u8981\u590d\u7528"),"\u6865\u63a5\u51fd\u6570\uff0c\n\u800c\u662f\u6bcf\u4e2a\u5e73\u53f0\u5355\u72ec\u751f\u6210\u3002"))}k.isMDXComponent=!0}}]);