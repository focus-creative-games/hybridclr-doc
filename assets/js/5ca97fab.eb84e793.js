"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5910],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>u});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,l=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=c(r),y=i,u=m["".concat(p,".").concat(y)]||m[y]||d[y]||l;return r?n.createElement(u,a(a({ref:t},s),{},{components:r})):n.createElement(u,a({ref:t},s))}));function u(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=r.length,a=new Array(l);a[0]=y;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[m]="string"==typeof e?e:i,a[1]=o;for(var c=2;c<l;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},660:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var n=r(7462),i=(r(7294),r(3905));const l={},a="\u7f16\u8bd1 \u70ed\u66f4\u65b0assembly",o={unversionedId:"basic/compileassembly",id:"version-7.6.0/basic/compileassembly",title:"\u7f16\u8bd1 \u70ed\u66f4\u65b0assembly",description:"\u70ed\u66f4\u65b0\u4ee3\u7801\u4e2d\u6709\u53ef\u80fd\u4f1a\u5305\u542b #if UNITYEDITOR \u3001#if UNITYSTANDALONE_WIN \u8fd9\u6837\u7684\u5b8f\u5f00\u5173\uff0c\u56e0\u6b64\u6bcf\u4e2a\u5e73\u53f0\u9700\u8981\u5355\u72ec",source:"@site/versioned_docs/version-7.6.0/basic/compileassembly.md",sourceDirName:"basic",slug:"/basic/compileassembly",permalink:"/docs/7.6.0/basic/compileassembly",draft:!1,tags:[],version:"7.6.0",frontMatter:{}},p={},c=[],s={toc:c},m="wrapper";function d(e){let{components:t,...r}=e;return(0,i.kt)(m,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u7f16\u8bd1-\u70ed\u66f4\u65b0assembly"},"\u7f16\u8bd1 \u70ed\u66f4\u65b0assembly"),(0,i.kt)("p",null,"\u70ed\u66f4\u65b0\u4ee3\u7801\u4e2d\u6709\u53ef\u80fd\u4f1a\u5305\u542b ",(0,i.kt)("inlineCode",{parentName:"p"},"#if UNITY_EDITOR")," \u3001",(0,i.kt)("inlineCode",{parentName:"p"},"#if UNITY_STANDALONE_WIN")," \u8fd9\u6837\u7684\u5b8f\u5f00\u5173\uff0c\u56e0\u6b64\u6bcf\u4e2a\u5e73\u53f0\u9700\u8981\u5355\u72ec\n\u7f16\u8bd1\u70ed\u66f4\u65b0assembly\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Library/ScriptAssemblies"),"\u76ee\u5f55\u4e0b\u7684assembly\u662fBuildTarget\u4e3aEditor\u65f6\u7f16\u8bd1\u7684\u7ed3\u679c\uff0c\u800c\u4e14\u4f1a\u53d7",(0,i.kt)("inlineCode",{parentName:"p"},"Debugger Enable"),"\u9009\u9879\u7684\u5f71\u54cd\uff0c\n\u5e76\u4e0d\u80fd\u4f5c\u4e3a\u70ed\u66f4\u65b0\u7a0b\u5e8f\u96c6\u4f7f\u7528\u3002\u6211\u4eec\u4f7f\u7528Unity\u63d0\u4f9b\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"UnityEditor.Build.Player.PlayerBuildInterface.CompilePlayerScripts")," \u63a5\u53e3\u6765\u7f16\u8bd1\u4e0d\u540cBuildTarget\n\u4e0b\u7684\u70ed\u66f4\u65b0dll\u3002\u7f16\u8bd1\u7ed3\u679c\u8f93\u51fa\u5230",(0,i.kt)("inlineCode",{parentName:"p"},"{proj}/HybridCLRData/HotUpdateDlls/{target}"),"\u76ee\u5f55\u4e0b\u3002"),(0,i.kt)("p",null,"\u8fd0\u884c\u83dc\u5355",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR/Compile/xxx"),"\u547d\u4ee4\u76f4\u63a5\u7f16\u8bd1\u51fa\u70ed\u66f4\u65b0dll\u3002\u8fd0\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/All"),"\u65f6\u4f1a\u4e5f\u9690\u542b\u7f16\u8bd1\u6700\u65b0\u7684\u70ed\u66f4\u65b0\u7a0b\u5e8f\u96c6\u3002\u5728\u8c03\u7528\u8be5\u547d\u4ee4\u540e\u53ef\u4ee5\u76f4\u63a5\u590d\u5236\u70ed\u66f4\u65b0dll\uff0c\u4e0d\u7528\u518d\u6b21\u8fd0\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR/Compile/xxx"),"\u3002\n\u7531\u4e8e\u8be5\u63a5\u53e3\u7f16\u8bd1\u65f6\u5e76\u4e0d\u533a\u5206AOT\u4e0e\u70ed\u66f4\u65b0\uff0c\u5c06\u9879\u76ee\u6574\u4f53\u7f16\u8bd1\u4e86\uff0c\u5f00\u53d1\u8005\u53ea\u9700\u8981\u5c06\u8f93\u51fa\u7684\u70ed\u66f4\u65b0dll\u52a0\u5165\u9879\u76ee\u7684\u8d44\u6e90\u7ba1\u7406\u7cfb\u7edf\u5373\u53ef\u3002"),(0,i.kt)("p",null,"com.code-philosophy.hybridclr\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR.Editor"),"\u7a0b\u5e8f\u96c6\u63d0\u4f9b\u4e86",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR.Editor.Commands.CompileDllCommand.CompileDll(BuildTarget target)"),"\u63a5\u53e3\uff0c\n\u65b9\u4fbf\u5f00\u53d1\u8005\u7075\u6d3b\u5730\u81ea\u884c\u7f16\u8bd1\u70ed\u66f4\u65b0dll\u3002"),(0,i.kt)("p",null,"\u53d1\u5e03\u4e3b\u5305\u540e\uff0c\u6bcf\u6b21\u70ed\u66f4\u65b0\u65f6\u53ea\u9700\u8981\u7b80\u5355\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR/Compile/xxx"),"\u547d\u4ee4\u91cd\u65b0\u7f16\u8bd1\u70ed\u66f4\u65b0dll\uff0c\u518d\u53d1\u5e03\u70ed\u66f4\u65b0dll\u5373\u53ef\uff0c\u4e0d\u7528\u8fd0\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/xxx"),"\u547d\u4ee4\u3002"))}d.isMDXComponent=!0}}]);