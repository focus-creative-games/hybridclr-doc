"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3384],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),b=a,d=m["".concat(s,".").concat(b)]||m[b]||u[b]||o;return n?r.createElement(d,i(i({ref:t},c),{},{components:n})):r.createElement(d,i({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}b.displayName="MDXCreateElement"},1918:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const o={},i="MonoBehaviour\u652f\u6301",l={unversionedId:"basic/monobehaviour",id:"version-7.8.1/basic/monobehaviour",title:"MonoBehaviour\u652f\u6301",description:"HybridCLR\u5b8c\u5168\u652f\u6301\u70ed\u66f4\u65b0MonoBehaviour\u548cScriptableObject\u5de5\u4f5c\u6d41\uff0c\u5373\u53ef\u4ee5\u5728\u4ee3\u7801\u91cc\u5728GameObject\u4e0aAdd\u70ed\u66f4\u65b0\u811a\u672c\u6216\u8005\u5728\u8d44\u6e90\u4e0a\u76f4\u63a5\u6302\u8f7d",source:"@site/versioned_docs/version-7.8.1/basic/monobehaviour.md",sourceDirName:"basic",slug:"/basic/monobehaviour",permalink:"/docs/7.8.1/basic/monobehaviour",draft:!1,tags:[],version:"7.8.1",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u4ee3\u7801\u88c1\u526a",permalink:"/docs/7.8.1/basic/codestriping"},next:{title:"AOT\u6cdb\u578b",permalink:"/docs/7.8.1/basic/aotgeneric"}},s={},p=[{value:"\u901a\u8fc7\u4ee3\u7801\u4f7f\u7528",id:"\u901a\u8fc7\u4ee3\u7801\u4f7f\u7528",level:2},{value:"\u5728\u8d44\u6e90\u4e0a\u6302\u8f7dMonoBehaviour\u6216\u8005\u521b\u5efaScriptableObject\u7c7b\u578b\u8d44\u6e90",id:"\u5728\u8d44\u6e90\u4e0a\u6302\u8f7dmonobehaviour\u6216\u8005\u521b\u5efascriptableobject\u7c7b\u578b\u8d44\u6e90",level:2},{value:"assembly\u5217\u8868\u6587\u4ef6",id:"assembly\u5217\u8868\u6587\u4ef6",level:2},{value:"\u5df2\u77e5\u95ee\u9898",id:"\u5df2\u77e5\u95ee\u9898",level:2},{value:"GameObject.GetComponent(string name) \u63a5\u53e3\u65e0\u6cd5\u83b7\u5f97\u7ec4\u4ef6",id:"gameobjectgetcomponentstring-name-\u63a5\u53e3\u65e0\u6cd5\u83b7\u5f97\u7ec4\u4ef6",level:3},{value:"\u5176\u5b83",id:"\u5176\u5b83",level:2}],c={toc:p},m="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"monobehaviour\u652f\u6301"},"MonoBehaviour\u652f\u6301"),(0,a.kt)("p",null,"HybridCLR\u5b8c\u5168\u652f\u6301\u70ed\u66f4\u65b0MonoBehaviour\u548cScriptableObject\u5de5\u4f5c\u6d41\uff0c\u5373\u53ef\u4ee5\u5728\u4ee3\u7801\u91cc\u5728GameObject\u4e0aAdd\u70ed\u66f4\u65b0\u811a\u672c\u6216\u8005\u5728\u8d44\u6e90\u4e0a\u76f4\u63a5\u6302\u8f7d\n\u70ed\u66f4\u65b0\u811a\u672c\u3002\u4f46\u7531\u4e8eUnity\u8d44\u6e90\u7ba1\u7406\u673a\u5236\u7684\u7279\u6b8a\u6027\uff0c\u5bf9\u4e8e\u8d44\u6e90\u4e0a\u6302\u8f7d\u70ed\u66f4\u65b0\u811a\u672c\uff0c\u9700\u8981\u6253\u5305\u5de5\u4f5c\u6d41\u4e0a\u4f5c\u4e00\u4e9b\u7279\u6b8a\u5904\u7406\u3002"),(0,a.kt)("h2",{id:"\u901a\u8fc7\u4ee3\u7801\u4f7f\u7528"},"\u901a\u8fc7\u4ee3\u7801\u4f7f\u7528"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"AddComponent<T>()"),"\u6216\u8005",(0,a.kt)("inlineCode",{parentName:"p"},"AddComponent(Type type)"),"\u4efb\u4f55\u65f6\u5019\u90fd\u662f\u5b8c\u7f8e\u652f\u6301\u7684\u3002\u53ea\u9700\u8981\u63d0\u524d\u901a\u8fc7Assembly.Load\u5c06\u70ed\u66f4\u65b0dll\u52a0\u8f7d\u5230\u8fd0\u884c\u65f6\n\u5185\u5373\u53ef\u3002"),(0,a.kt)("h2",{id:"\u5728\u8d44\u6e90\u4e0a\u6302\u8f7dmonobehaviour\u6216\u8005\u521b\u5efascriptableobject\u7c7b\u578b\u8d44\u6e90"},"\u5728\u8d44\u6e90\u4e0a\u6302\u8f7dMonoBehaviour\u6216\u8005\u521b\u5efaScriptableObject\u7c7b\u578b\u8d44\u6e90"),(0,a.kt)("p",null,"Unity\u8d44\u6e90\u7ba1\u7406\u7cfb\u7edf\u5728\u53cd\u5e8f\u5217\u5316\u8d44\u6e90\u4e2d\u7684\u70ed\u66f4\u65b0\u811a\u672c\u65f6\uff0c\u9700\u8981\u6ee1\u8db3\u4ee5\u4e0b\u6761\u4ef6\uff1a"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u811a\u672c\u6240\u5728\u7684dll\u5df2\u7ecf\u52a0\u8f7d\u5230\u8fd0\u884c\u65f6\u4e2d"),(0,a.kt)("li",{parentName:"ol"},"\u5fc5\u987b\u662f\u4f7f\u7528AssetBundle\u6253\u5305\u7684\u8d44\u6e90\uff08",(0,a.kt)("strong",{parentName:"li"},"addressable\u4e4b\u7c7b\u95f4\u63a5\u4f7f\u7528\u4e86ab\u7684\u6846\u67b6\u4e5f\u53ef\u4ee5"),"\uff09"),(0,a.kt)("li",{parentName:"ol"},"\u811a\u672c\u6240\u5728\u7684dll\u5fc5\u987b\u6dfb\u52a0\u5230\u6253\u5305\u65f6\u751f\u6210\u7684assembly\u5217\u8868\u6587\u4ef6\u3002\u8fd9\u4e2a\u5217\u8868\u6587\u4ef6\u662funity\u542f\u52a8\u65f6\u5373\u52a0\u8f7d\u7684\uff0c\u4e0d\u53ef\u53d8\u6570\u636e\u3002\u4e0d\u540c\u7248\u672c\u7684Unity\u7684\u5217\u8868\u6587\u4ef6\u540d\u548c\u683c\u5f0f\u4e0d\u76f8\u540c\u3002")),(0,a.kt)("p",null,"\u5982\u679c\u672a\u5bf9\u6253\u5305\u6d41\u7a0b\u4f5c\u4efb\u4f55\u5904\u7406\uff0c\u7531\u4e8e\u70ed\u66f4\u65b0dll\u5df2\u7ecf\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"IFilterBuildAssemblies"),"\u56de\u8c03\u4e2d\u88ab\u79fb\u9664\uff0c\u80af\u5b9a\u4e0d\u4f1a\u51fa\u73b0\u5728assembly\u5217\u8868\u6587\u4ef6\u4e2d\u3002\n\u7531\u4e8e\u4e0d\u6ee1\u8db3\u6761\u4ef63\uff0c\u6302\u8f7d\u5728\u70ed\u66f4\u65b0\u8d44\u6e90\u4e2d\u7684\u70ed\u66f4\u65b0\u811a\u672c\u65e0\u6cd5\u88ab\u8fd8\u539f\uff0c\u8fd0\u884c\u65f6\u4f1a\u51fa\u73b0 ",(0,a.kt)("inlineCode",{parentName:"p"},"Scripting Missing"),"\u7684\u9519\u8bef\u3002"),(0,a.kt)("p",null,"\u56e0\u6b64\u6211\u4eec\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Editor/BuildProcessors/PatchScriptingAssemblyList.cs")," \u811a\u672c\u4e2d\u4f5c\u4e86\u7279\u6b8a\u5904\u7406\uff0c\u628a\u70ed\u66f4\u65b0dll\u52a0\u5165\u5230assembly\u5217\u8868\u6587\u4ef6\u4e2d\u3002\n\u4f60\u9700\u8981\u628a\u9879\u76ee\u4e2d\u7684\u70ed\u66f4\u65b0assembly\u6dfb\u52a0\u5230",(0,a.kt)("inlineCode",{parentName:"p"},"HybridCLRSettings\u914d\u7f6e\u7684HotUpdateAssemblyDefinitions\u6216HotUpdateAssemblies \u5b57\u6bb5"),"\u4e2d\u3002"),(0,a.kt)("p",null,"\u53ea\u9650\u5236\u4e86\u70ed\u66f4\u65b0\u8d44\u6e90\u4ee5ab\u5305\u5f62\u5f0f\u6253\u5305\uff0c\u70ed\u66f4\u65b0dll\u6253\u5305\u65b9\u5f0f\u6ca1\u6709\u9650\u5236\u3002\u4f60\u53ef\u4ee5\u6309\u7167\u9879\u76ee\u9700\u6c42",(0,a.kt)("strong",{parentName:"p"},"\u81ea\u7531\u9009\u62e9\u70ed\u66f4\u65b0\u65b9\u5f0f"),"\uff0c\u53ef\u4ee5\u5c06dll\u6253\u5305\u5230ab\u4e2d\uff0c\u6216\u8005\u88f8\u6570\u636e\n\u6587\u4ef6\uff0c\u6216\u8005\u52a0\u5bc6\u538b\u7f29\u7b49\u7b49\u3002\u53ea\u8981\u80fd\u4fdd\u8bc1\u5728\u52a0\u8f7d\u70ed\u66f4\u65b0\u8d44\u6e90\u524d\u4f7f\u7528Assembly.Load\u5c06\u5176\u52a0\u8f7d\u5373\u53ef\u3002"),(0,a.kt)("admonition",{type:"warning"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("strong",{parentName:"p"},"\u5982\u679c\u5c06\u70ed\u66f4\u65b0\u811a\u672c\u6302\u8f7d\u5230Resources\u7b49\u968f\u4e3b\u5305\u7684\u8d44\u6e90\u4e0a\uff0c\u4f1a\u53d1\u751fscripting missing\u7684\u9519\u8bef\uff01"),"\u4f46\u5982\u679c\u5148\u6253\u6210assetbundle\u5305\uff0c\u518d\u653e\u5230Resources\u4e0b\uff0c\u8fd0\u884c\u65f6\u52a0\u8f7d\u8be5\u968f\u5305assetbundle\u5219\u6ca1\u6709\u95ee\u9898\u3002")),(0,a.kt)("h2",{id:"assembly\u5217\u8868\u6587\u4ef6"},"assembly\u5217\u8868\u6587\u4ef6"),(0,a.kt)("p",null,"\u4e0d\u540cUnity\u7248\u672c\u4e0bassembly\u5217\u8868\u6587\u4ef6\u7684\u540d\u79f0\u548c\u683c\u5f0f\u90fd\u4e0d\u4e00\u6837\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"2019\u7248\u672c\u3002 \u975e\u538b\u7f29\u6253\u5305\u65f6\u4e3aglobalgamemanagers\u6587\u4ef6\uff0c\u538b\u7f29\u6253\u5305\u65f6\u5148\u4fdd\u5b58\u5230globalgamemanagers\u6587\u4ef6\uff0c\u518d\u4ee5BundleFile\u683c\u5f0f\u548c\u5176\u4ed6\u6587\u4ef6\u6253\u5305\u5230data.unity3d\u6587\u4ef6\u3002"),(0,a.kt)("li",{parentName:"ul"},"2020-2021\u7248\u672c\u3002 \u4fdd\u5b58\u5728ScriptingAssembles.json\u6587\u4ef6\u4e2d\u3002")),(0,a.kt)("h2",{id:"\u5df2\u77e5\u95ee\u9898"},"\u5df2\u77e5\u95ee\u9898"),(0,a.kt)("h3",{id:"gameobjectgetcomponentstring-name-\u63a5\u53e3\u65e0\u6cd5\u83b7\u5f97\u7ec4\u4ef6"},"GameObject.GetComponent(string name) \u63a5\u53e3\u65e0\u6cd5\u83b7\u5f97\u7ec4\u4ef6"),(0,a.kt)("p",null,"\u8fd9\u662f\u5df2\u77e5bug,\u8ddfunity\u7684\u4ee3\u7801\u5b9e\u73b0\u6709\u5173\uff0c\u53ea\u6709\u6302\u8f7d\u5728\u70ed\u66f4\u65b0\u8d44\u6e90\u4e0a\u70ed\u66f4\u65b0\u811a\u672c\u624d\u4f1a\u6709\u8fd9\u4e2a\u95ee\u9898\uff0c\u901a\u8fc7\u4ee3\u7801\u4e2dAddComponent\u6dfb\u52a0\u7684\u70ed\u66f4\u65b0\u811a\u672c\u662f\u53ef\u4ee5\u7528\u8fd9\u4e2a\u65b9\u6cd5\u67e5\u627e\u5230\u3002\u5982\u679c\u9047\u5230\u8fd9\u4e2a\u95ee\u9898\u8bf7\u6539\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"GameObject.GetComponent<T>()")," \u6216 ",(0,a.kt)("inlineCode",{parentName:"p"},"GameObject.GetComponent(typeof(T))")),(0,a.kt)("h2",{id:"\u5176\u5b83"},"\u5176\u5b83"),(0,a.kt)("p",null,"\u9700\u8981\u88ab\u6302\u5230\u8d44\u6e90\u4e0a\u7684\u811a\u672c\u6240\u5728dll\u540d\u79f0\u4e0a\u7ebf\u540e\u52ff\u4fee\u6539\uff0c\u56e0\u4e3aassembly\u5217\u8868\u6587\u4ef6\u6253\u5305\u540e\u65e0\u6cd5\u4fee\u6539\u3002"),(0,a.kt)("p",null,"\u5efa\u8bae\u6253AB\u65f6\u4e0d\u8981\u7981\u7528TypeTree\uff0c\u5426\u5219\u666e\u901a\u7684AB\u52a0\u8f7d\u65b9\u5f0f\u4f1a\u5931\u8d25\u3002\uff08\u539f\u56e0\u662f\u5bf9\u4e8e\u7981\u7528TypeTree\u7684\u811a\u672c\uff0cUnity\u4e3a\u4e86\u9632\u6b62\u4e8c\u8fdb\u5236\u4e0d\u5339\u914d\u5bfc\u81f4\u53cd\u5e8f\u5217\u5316MonoBehaviour\u8fc7\u7a0b\u4e2d\u8fdb\u7a0bCrash\uff0c\u4f1a\u5bf9\u811a\u672c\u7684\u7b7e\u540d\u8fdb\u884c\u6821\u9a8c\uff0c\u7b7e\u540d\u7684\u5185\u5bb9\u662f\u811a\u672cFullName\u53caTypeTree\u6570\u636e\u751f\u6210\u7684Hash, \u4f46\u7531\u4e8e\u6211\u4eec\u7684\u70ed\u66f4\u811a\u672c\u4fe1\u606f\u4e0d\u5b58\u5728\u4e8e\u6253\u5305\u540e\u7684\u5b89\u88c5\u5305\u4e2d\uff0c\u56e0\u6b64\u6821\u9a8c\u5fc5\u5b9a\u4f1a\u5931\u8d25\uff09"),(0,a.kt)("p",null,"\u5982\u679c\u5fc5\u987b\u8981\u7981\u7528TypeTree\uff0c\u4e00\u4e2a\u53d8\u901a\u7684\u65b9\u6cd5\u662f\u7981\u6b62\u811a\u672c\u7684Hash\u6821\u9a8c, \u6b64\u79cd\u60c5\u51b5\u4e0b\u7528\u6237\u5fc5\u987b\u4fdd\u8bc1\u6253\u5305\u65f6\u4ee3\u7801\u4e0e\u8d44\u6e90\u7248\u672c\u4e00\u81f4\uff0c\u5426\u5219\u53ef\u80fd\u4f1a\u5bfc\u81f4Crash\uff0c\u793a\u4f8b\u4ee3\u7801"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"    AssetBundleCreateRequest req = AssetBundle.LoadFromFileAsync(path);\n    req.SetEnableCompatibilityChecks(false); // \u975epublic\uff0c\u9700\u8981\u901a\u8fc7\u53cd\u5c04\u8c03\u7528\n")))}u.isMDXComponent=!0}}]);