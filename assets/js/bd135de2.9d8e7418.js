"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1215],{3905:(e,t,i)=>{i.d(t,{Zo:()=>d,kt:()=>m});var l=i(7294);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,l)}return i}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function p(e,t){if(null==e)return{};var i,l,n=function(e,t){if(null==e)return{};var i,l,n={},r=Object.keys(e);for(l=0;l<r.length;l++)i=r[l],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)i=r[l],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var o=l.createContext({}),c=function(e){var t=l.useContext(o),i=t;return e&&(i="function"==typeof e?e(t):a(a({},t),e)),i},d=function(e){var t=c(e.components);return l.createElement(o.Provider,{value:t},e.children)},u="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},s=l.forwardRef((function(e,t){var i=e.components,n=e.mdxType,r=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=c(i),s=n,m=u["".concat(o,".").concat(s)]||u[s]||b[s]||r;return i?l.createElement(m,a(a({ref:t},d),{},{components:i})):l.createElement(m,a({ref:t},d))}));function m(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=i.length,a=new Array(r);a[0]=s;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[u]="string"==typeof e?e:n,a[1]=p;for(var c=2;c<r;c++)a[c]=i[c];return l.createElement.apply(null,a)}return l.createElement.apply(null,i)}s.displayName="MDXCreateElement"},6267:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>a,default:()=>b,frontMatter:()=>r,metadata:()=>p,toc:()=>c});var l=i(7462),n=(i(7294),i(3905));const r={},a="\u53d1\u5e03WebGL\u5e73\u53f0",p={unversionedId:"basic/buildwebgl",id:"version-7.6.0/basic/buildwebgl",title:"\u53d1\u5e03WebGL\u5e73\u53f0",description:"\u7531\u4e8eWebGL\u5e73\u53f0\u6709\u8f83\u591a\u7279\u6b8a\u6027\uff0c\u6545\u7279\u5730\u5355\u72ec\u6587\u6863\u4ecb\u7ecd\u5982\u4f55\u53d1\u5e03WebGL\u5e73\u53f0\u3002\u672c\u6587\u6863\u5728 hybridclrtrial\u9879\u76ee\uff08github gitee \uff09\u4e0a\u6f14\u793a\u53d1\u5e03\u8fc7\u7a0b\u3002",source:"@site/versioned_docs/version-7.6.0/basic/buildwebgl.md",sourceDirName:"basic",slug:"/basic/buildwebgl",permalink:"/docs/7.6.0/basic/buildwebgl",draft:!1,tags:[],version:"7.6.0",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6253\u5305\u5de5\u4f5c\u6d41",permalink:"/docs/7.6.0/basic/buildpipeline"},next:{title:"\u4ee3\u7801\u88c1\u526a",permalink:"/docs/7.6.0/basic/codestriping"}},o={},c=[{value:"\u4f7f\u7528\u7684\u7248\u672c",id:"\u4f7f\u7528\u7684\u7248\u672c",level:2},{value:"\u51c6\u5907\u5de5\u4f5c",id:"\u51c6\u5907\u5de5\u4f5c",level:2},{value:"\u5efa\u7acb Editor\u76ee\u5f55\u7684libil2cpp\u5230\u672c\u5730libil2cpp\u76ee\u5f55\u7684\u8f6f\uff08\u786c\uff09\u5f15\u7528",id:"\u5efa\u7acb-editor\u76ee\u5f55\u7684libil2cpp\u5230\u672c\u5730libil2cpp\u76ee\u5f55\u7684\u8f6f\u786c\u5f15\u7528",level:2},{value:"Win\u5e73\u53f0",id:"win\u5e73\u53f0",level:3},{value:"MacOS\u6216\u8005Linux\u5e73\u53f0",id:"macos\u6216\u8005linux\u5e73\u53f0",level:3},{value:"\u6253\u5305",id:"\u6253\u5305",level:2}],d={toc:c},u="wrapper";function b(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,l.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"\u53d1\u5e03webgl\u5e73\u53f0"},"\u53d1\u5e03WebGL\u5e73\u53f0"),(0,n.kt)("p",null,"\u7531\u4e8eWebGL\u5e73\u53f0\u6709\u8f83\u591a\u7279\u6b8a\u6027\uff0c\u6545\u7279\u5730\u5355\u72ec\u6587\u6863\u4ecb\u7ecd\u5982\u4f55\u53d1\u5e03WebGL\u5e73\u53f0\u3002\u672c\u6587\u6863\u5728 hybridclr_trial\u9879\u76ee\uff08",(0,n.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr_trial"},"github")," ",(0,n.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/hybridclr_trial"},"gitee")," \uff09\u4e0a\u6f14\u793a\u53d1\u5e03\u8fc7\u7a0b\u3002"),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"\u4eceUnity 2021.3.4+\u30012022.3.0+\u7248\u672c\u8d77\uff0c\u4e0d\u518d\u9700\u8981\u5168\u5c40\u5b89\u88c5\uff0c\u4e5f\u5c31\u662fwebgl\u5e73\u53f0\u7684\u6784\u5efa\u8fc7\u7a0b\u4e0e\u5176\u4ed6\u5e73\u53f0\u5b8c\u5168\u76f8\u540c\u3002")),(0,n.kt)("h2",{id:"\u4f7f\u7528\u7684\u7248\u672c"},"\u4f7f\u7528\u7684\u7248\u672c"),(0,n.kt)("p",null,"\u4e0d\u540cUnity\u7248\u672c\u53cahybridclr package\u7684\u53d1\u5e03\u6d41\u7a0b\u90fd\u662f\u76f8\u4f3c\u7684\uff0c\u4e0d\u518d\u8d58\u8ff0\u3002"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Unity 2021.3.1f1"),(0,n.kt)("li",{parentName:"ul"},"com.code-philosophy.hybridclr v3.4.0")),(0,n.kt)("h2",{id:"\u51c6\u5907\u5de5\u4f5c"},"\u51c6\u5907\u5de5\u4f5c"),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"\u65b0\u624b\u8bf7\u81f3\u5c11\u9605\u8bfb\u8fc7",(0,n.kt)("a",{parentName:"p",href:"/docs/7.6.0/beginner/quickstart"},"\u5feb\u901f\u4e0a\u624b"),"\u6587\u6863\uff0c\u5df2\u7ecf\u638c\u63e1Win\u6216Android\u4e4b\u7c7b\u5e73\u53f0\u7684\u53d1\u5e03\u6d41\u7a0b\u3002")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u786e\u4fddUnity Editor \u5b89\u88c5\u4e86WebGL\u6a21\u5757\uff0c\u5982\u4e0b\u56fe"),(0,n.kt)("li",{parentName:"ul"},"\u6839\u636e ",(0,n.kt)("a",{parentName:"li",href:"/docs/7.6.0/basic/install"},"install")," \u6587\u6863\u5b8c\u6210HybridCLR\u5b89\u88c5\u53ca\u8bbe\u7f6e"),(0,n.kt)("li",{parentName:"ul"},"\u5728HybridCLRSettings\u4e2d\uff0c\u5f00\u542f",(0,n.kt)("inlineCode",{parentName:"li"},"Use Global Il2cpp")," \u9009\u9879\uff0c\u56e0\u4e3awebgl\u5e73\u53f0\u53ea\u652f\u6301\u5168\u5c40\u5b89\u88c5\u3002\u4ece2021.3.4+\u30012022.3.0+\u8d77\uff0c",(0,n.kt)("strong",{parentName:"li"},"\u4e0d\u518d\u9700\u8981"),"\u5f00\u542f\u6b64\u9009\u9879")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"select_il2cpp_module_webgl",src:i(4036).Z,width:"1026",height:"627"})),(0,n.kt)("h2",{id:"\u5efa\u7acb-editor\u76ee\u5f55\u7684libil2cpp\u5230\u672c\u5730libil2cpp\u76ee\u5f55\u7684\u8f6f\u786c\u5f15\u7528"},"\u5efa\u7acb Editor\u76ee\u5f55\u7684libil2cpp\u5230\u672c\u5730libil2cpp\u76ee\u5f55\u7684\u8f6f\uff08\u786c\uff09\u5f15\u7528"),(0,n.kt)("admonition",{type:"warning"},(0,n.kt)("p",{parentName:"admonition"},"\u6ce8\u610f\uff1a\u4eceUnity 2021.3.4+\u30012022.3.0+\u7248\u672c\u8d77\uff0c\u7531\u4e8e\u652f\u6301\u672c\u5730\u5b89\u88c5\uff0c\u4e0d\u518d\u9700\u8981\u5efa\u7acb\u6b64\u5f15\u7528\u3002")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"\u5347\u7ea7hybridclr\u7b49\u60c5\u5f62\u9700\u8981\u91cd\u65b0install\u65f6\uff0c\u5148\u6062\u590dEditor\u5b89\u88c5\u76ee\u5f55\u7684\u539f\u59cblibil2cpp\u76ee\u5f55\uff0c\u518d\u91cd\u65b0\u6309\u7167\u5982\u4e0b\u8bf4\u660e\u5efa\u7acb\u94fe\u63a5\u3002")),(0,n.kt)("h3",{id:"win\u5e73\u53f0"},"Win\u5e73\u53f0"),(0,n.kt)("p",null,"\u4e0d\u719f\u6089\u547d\u4ee4\u884c\u7684\u5f00\u53d1\u8005\u8bf7\u5148\u638c\u63e1\u547d\u4ee4\u884c\u7684\u57fa\u7840\u7528\u6cd5\u3002"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u4ee5\u7ba1\u7406\u5458\u6743\u9650\u6253\u5f00\u547d\u4ee4\u884c\u7a97\u53e3\uff0c\u8fd9\u4e2a\u64cd\u4f5c\u4e0d\u540c\u64cd\u4f5c\u7cfb\u7edf\u7248\u672c\u4e0d\u4e00\u6837\uff0c\u8bf7\u914c\u60c5\u5904\u7406\u3002\u5728Win11\u4e0b\u4e3a",(0,n.kt)("inlineCode",{parentName:"li"},"\u5728\u5f00\u59cb\u83dc\u5355\u4e0a\u53f3\u952e\uff0c\u9009\u4e2d\u7ec8\u7aef\u7ba1\u7406\u5458\u83dc\u5355\u9879"),"\u3002"),(0,n.kt)("li",{parentName:"ul"},"\u8fd0\u884c ",(0,n.kt)("inlineCode",{parentName:"li"},"cd /d {editor_install_dir}/Editor/Data/il2cpp"),"\uff0c \u5207\u6362\u76ee\u5f55\u5230\u5b89\u88c5\u76ee\u5f55\u7684il2cpp\u76ee\u5f55"),(0,n.kt)("li",{parentName:"ul"},"\u8fd0\u884c",(0,n.kt)("inlineCode",{parentName:"li"},"ren libil2cpp libil2cpp-origin")," \u5c06\u539f\u59cblibil2cpp\u6539\u540d\u4e3alibil2cpp-origin"),(0,n.kt)("li",{parentName:"ul"},"\u8fd0\u884c ",(0,n.kt)("inlineCode",{parentName:"li"},'mklink /D  libil2cpp "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp"')," \u5efa\u7acbEditor\u76ee\u5f55\u7684libil2cpp\u5230\u672c\u5730libil2cpp\u76ee\u5f55\u7684\u7b26\u53f7\u5f15\u7528")),(0,n.kt)("h3",{id:"macos\u6216\u8005linux\u5e73\u53f0"},"MacOS\u6216\u8005Linux\u5e73\u53f0"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u6253\u5f00\u547d\u4ee4\u884c\u7a97\u53e3"),(0,n.kt)("li",{parentName:"ul"},"\u8fd0\u884c ",(0,n.kt)("inlineCode",{parentName:"li"},"cd /d {editor_install_dir}/Editor/Data/il2cpp")," \u5207\u6362\u76ee\u5f55\u5230\u5b89\u88c5\u76ee\u5f55\u7684il2cpp\u76ee\u5f55\u3002\u5177\u4f53\u76ee\u5f55\u53ef\u80fd\u56e0\u4e3a\u64cd\u4f5c\u7cfb\u7edf\u800c\u6709\u6240\u4e0d\u540c\uff0c\u8bf7\u914c\u60c5\u5904\u7406"),(0,n.kt)("li",{parentName:"ul"},"\u8fd0\u884c",(0,n.kt)("inlineCode",{parentName:"li"},"mv libil2cpp libil2cpp-origin")," \u5c06\u539f\u59cblibil2cpp\u6539\u540d\u4e3alibil2cpp-origin"),(0,n.kt)("li",{parentName:"ul"},"\u8fd0\u884c ",(0,n.kt)("inlineCode",{parentName:"li"},'ln -s "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" libil2cpp')," \u5efa\u7acbEditor\u76ee\u5f55\u7684libil2cpp\u5230\u672c\u5730libil2cpp\u76ee\u5f55\u7684\u7b26\u53f7\u5f15\u7528")),(0,n.kt)("h2",{id:"\u6253\u5305"},"\u6253\u5305"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8fd0\u884c ",(0,n.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/All")),(0,n.kt)("li",{parentName:"ul"},"\u8fd0\u884c ",(0,n.kt)("inlineCode",{parentName:"li"},"HybridCLR/Build/BuildAssetsAndCopyToStreamingAssets"),"\u3002\u6ce8\u610f\uff01\u8fd9\u4e2a\u83dc\u5355\u662f",(0,n.kt)("inlineCode",{parentName:"li"},"hybridclr_trial"),"\u9879\u76ee\u6dfb\u52a0\u7684\uff0c\u5e76\u4e0d\u662fhybridclr package\u81ea\u5e26\u7684\u547d\u4ee4\u3002"),(0,n.kt)("li",{parentName:"ul"},"\u5728",(0,n.kt)("inlineCode",{parentName:"li"},"Build Player"),"\u4e2d\u8fd0\u884c",(0,n.kt)("inlineCode",{parentName:"li"},"Build And Run"),"\u5373\u53ef")))}b.isMDXComponent=!0},4036:(e,t,i)=>{i.d(t,{Z:()=>l});const l=i.p+"assets/images/select_il2cpp_modules_webgl-ffcd6f4a82ba1e3ea85605fb1d6d1254.jpg"}}]);