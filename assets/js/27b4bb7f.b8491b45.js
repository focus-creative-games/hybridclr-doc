"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5659],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>b});var n=a(7294);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var s=n.createContext({}),d=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=d(a),u=l,b=c["".concat(s,".").concat(u)]||c[u]||m[u]||r;return a?n.createElement(b,i(i({ref:t},p),{},{components:a})):n.createElement(b,i({ref:t},p))}));function b(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=a.length,i=new Array(r);i[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[c]="string"==typeof e?e:l,i[1]=o;for(var d=2;d<r;d++)i[d]=a[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},4157:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var n=a(7462),l=(a(7294),a(3905));const r={},i="\u6700\u4f73\u5b9e\u8df5",o={unversionedId:"basic/bestpractice",id:"basic/bestpractice",title:"\u6700\u4f73\u5b9e\u8df5",description:"unity\u7248\u672c\u63a8\u8350",source:"@site/docs/basic/bestpractice.md",sourceDirName:"basic",slug:"/basic/bestpractice",permalink:"/docs/basic/bestpractice",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"hybridclr Package\u624b\u518c",permalink:"/docs/basic/com.code-philosophy.hybridclr"},next:{title:"HybridCLR+lua/js/python",permalink:"/docs/basic/workwithscriptlanguage"}},s={},d=[{value:"unity\u7248\u672c\u63a8\u8350",id:"unity\u7248\u672c\u63a8\u8350",level:2},{value:"Assembly.Load\u4e4b\u540e\u4e0d\u8981\u4fdd\u5b58 assemblyBytes",id:"assemblyload\u4e4b\u540e\u4e0d\u8981\u4fdd\u5b58-assemblybytes",level:2},{value:"\u63a8\u8350\u542f\u52a8\u811a\u672c\u6302\u8f7d\u5230\u70ed\u66f4\u65b0\u5b8c\u6210\u540e\u9996\u4e2a\u52a0\u8f7d\u7684\u70ed\u66f4\u65b0\u573a\u666f",id:"\u63a8\u8350\u542f\u52a8\u811a\u672c\u6302\u8f7d\u5230\u70ed\u66f4\u65b0\u5b8c\u6210\u540e\u9996\u4e2a\u52a0\u8f7d\u7684\u70ed\u66f4\u65b0\u573a\u666f",level:2},{value:"<code>RuntimeApi.LoadMetadataForAOTAssembly</code> \u8c03\u7528\u7684\u65f6\u673a",id:"runtimeapiloadmetadataforaotassembly-\u8c03\u7528\u7684\u65f6\u673a",level:2},{value:"<code>Assembly.Load</code>\u6216\u8005<code>RuntimeApi.LoadMetadataForAOTAssembly</code>\u6267\u884c\u65f6\u95f4\u8fc7\u957f\uff0c\u5bfc\u81f4\u6e38\u620f\u5361\u987f\u3002",id:"assemblyload\u6216\u8005runtimeapiloadmetadataforaotassembly\u6267\u884c\u65f6\u95f4\u8fc7\u957f\u5bfc\u81f4\u6e38\u620f\u5361\u987f",level:2},{value:"\u539f\u751f\u4e0e\u89e3\u91ca\u5668\u90e8\u5206\u6027\u80fd\u654f\u611f\u7684\u573a\u5408\u4e0d\u8981\u7528\u53cd\u5c04\u6765\u4ea4\u4e92\uff0c\u5e94\u8be5\u901a\u8fc7Delegate\u6216\u865a\u51fd\u6570",id:"\u539f\u751f\u4e0e\u89e3\u91ca\u5668\u90e8\u5206\u6027\u80fd\u654f\u611f\u7684\u573a\u5408\u4e0d\u8981\u7528\u53cd\u5c04\u6765\u4ea4\u4e92\u5e94\u8be5\u901a\u8fc7delegate\u6216\u865a\u51fd\u6570",level:2},{value:"\u70ed\u66f4\u65b0\u5c42\u8fd4\u56de\u4e00\u4e2a Delegate",id:"\u70ed\u66f4\u65b0\u5c42\u8fd4\u56de\u4e00\u4e2a-delegate",level:3},{value:"\u901a\u8fc7 Delegate.Create\uff0c\u6839\u636eMethodInfo\u521b\u5efa\u76f8\u5e94\u7684Delegate",id:"\u901a\u8fc7-delegatecreate\u6839\u636emethodinfo\u521b\u5efa\u76f8\u5e94\u7684delegate",level:3},{value:"2021 \u7248\u672c\u4e0d\u8981\u4f7f\u7528 <code>faster(smaller) builds</code> \u9009\u9879",id:"2021-\u7248\u672c\u4e0d\u8981\u4f7f\u7528-fastersmaller-builds-\u9009\u9879",level:2}],p={toc:d},c="wrapper";function m(e){let{components:t,...a}=e;return(0,l.kt)(c,(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"\u6700\u4f73\u5b9e\u8df5"},"\u6700\u4f73\u5b9e\u8df5"),(0,l.kt)("h2",{id:"unity\u7248\u672c\u63a8\u8350"},"unity\u7248\u672c\u63a8\u8350"),(0,l.kt)("p",null,"\u63a8\u8350\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"2020.3.x(x >= 21)")," \u7cfb\u5217\u53ca ",(0,l.kt)("inlineCode",{parentName:"p"},"2021.3.x")," \u7cfb\u5217\uff0c\u6700\u7a33\u5b9a\u3002"),(0,l.kt)("h2",{id:"assemblyload\u4e4b\u540e\u4e0d\u8981\u4fdd\u5b58-assemblybytes"},"Assembly.Load\u4e4b\u540e\u4e0d\u8981\u4fdd\u5b58 assemblyBytes"),(0,l.kt)("p",null,"assembly\u7684byte[]\u6570\u636e\u5728\u8c03\u7528\u5b8cAssembly.Load\u540e\u4e0d\u8981\u4fdd\u5b58\u8d77\u6765\uff0c\u56e0\u4e3a\u5728Assembly.Load\u4e2d\u4f1a\u81ea\u52a8\u590d\u5236\u4e00\u4efd\u3002"),(0,l.kt)("h2",{id:"\u63a8\u8350\u542f\u52a8\u811a\u672c\u6302\u8f7d\u5230\u70ed\u66f4\u65b0\u5b8c\u6210\u540e\u9996\u4e2a\u52a0\u8f7d\u7684\u70ed\u66f4\u65b0\u573a\u666f"},"\u63a8\u8350\u542f\u52a8\u811a\u672c\u6302\u8f7d\u5230\u70ed\u66f4\u65b0\u5b8c\u6210\u540e\u9996\u4e2a\u52a0\u8f7d\u7684\u70ed\u66f4\u65b0\u573a\u666f"),(0,l.kt)("p",null,"\u63a8\u8350\u5c06\u542f\u52a8\u811a\u672c\u6302\u8f7d\u5230\u542f\u52a8\u70ed\u66f4\u65b0\u573a\u666f\uff0c\u8fd9\u6837\u53ef\u4ee5\u96f6\u6539\u52a8\u5c06\u975e\u70ed\u66f4\u65b0\u5de5\u7a0b\u6539\u9020\u6210\u70ed\u66f4\u65b0\u5de5\u7a0b\uff0c\u8fd8\u4e0d\u9700\u8981\u4efb\u4f55\u53cd\u5c04\u64cd\u4f5c\u3002"),(0,l.kt)("h2",{id:"runtimeapiloadmetadataforaotassembly-\u8c03\u7528\u7684\u65f6\u673a"},(0,l.kt)("inlineCode",{parentName:"h2"},"RuntimeApi.LoadMetadataForAOTAssembly")," \u8c03\u7528\u7684\u65f6\u673a"),(0,l.kt)("p",null,"\u4f60\u53ea\u8981\u5728\u4f7f\u7528AOT\u6cdb\u578b\u524d\u8c03\u7528\u5373\u53ef\uff08\u53ea\u9700\u8981\u8c03\u7528\u4e00\u6b21\uff09\uff0c\u7406\u8bba\u4e0a\u8d8a\u65e9\u52a0\u8f7d\u8d8a\u597d\u3002\u5b9e\u8df5\u4e2d\u6bd4\u8f83\u5408\u7406\u7684\u65f6\u673a\u662f\u70ed\u66f4\u65b0\u5b8c\u6210\u540e\uff0c\u6216\u8005\u70ed\u66f4\u65b0dll\u52a0\u8f7d\u540e\u4f46\u8fd8\u672a\u6267\u884c\u4efb\u4f55\u4f55\u4ee3\u7801\u524d\u3002\u5982\u679c\u8865\u5145\u5143\u6570\u636e\u7684dll\u4f5c\u4e3a\u989d\u5916\u6570\u636e\u6587\u4ef6\u4e5f\u6253\u5165\u4e86\u4e3b\u5305\uff0c\u5219\u4e3b\u5de5\u7a0b\u542f\u52a8\u65f6\u52a0\u8f7d\u66f4\u4f18\u3002\u53ef\u53c2\u8003",(0,l.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr_trial"},"HybridCLR_trial"),"\u9879\u76ee"),(0,l.kt)("h2",{id:"assemblyload\u6216\u8005runtimeapiloadmetadataforaotassembly\u6267\u884c\u65f6\u95f4\u8fc7\u957f\u5bfc\u81f4\u6e38\u620f\u5361\u987f"},(0,l.kt)("inlineCode",{parentName:"h2"},"Assembly.Load"),"\u6216\u8005",(0,l.kt)("inlineCode",{parentName:"h2"},"RuntimeApi.LoadMetadataForAOTAssembly"),"\u6267\u884c\u65f6\u95f4\u8fc7\u957f\uff0c\u5bfc\u81f4\u6e38\u620f\u5361\u987f\u3002"),(0,l.kt)("p",null,"\u53ef\u4ee5\u628a\u5b83\u4eec\u653e\u5230\u5176\u4ed6\u7ebf\u7a0b\u5f02\u6b65\u52a0\u8f7d\u3002"),(0,l.kt)("h2",{id:"\u539f\u751f\u4e0e\u89e3\u91ca\u5668\u90e8\u5206\u6027\u80fd\u654f\u611f\u7684\u573a\u5408\u4e0d\u8981\u7528\u53cd\u5c04\u6765\u4ea4\u4e92\u5e94\u8be5\u901a\u8fc7delegate\u6216\u865a\u51fd\u6570"},"\u539f\u751f\u4e0e\u89e3\u91ca\u5668\u90e8\u5206\u6027\u80fd\u654f\u611f\u7684\u573a\u5408\u4e0d\u8981\u7528\u53cd\u5c04\u6765\u4ea4\u4e92\uff0c\u5e94\u8be5\u901a\u8fc7Delegate\u6216\u865a\u51fd\u6570"),(0,l.kt)("p",null,"\u4ee5Update\u51fd\u6570\u4e3a\u4f8b\uff0c\u5927\u591a\u6570\u4eba\u4f1a\u60f3\u5230\u4e3b\u5de5\u7a0b\u8ddf\u70ed\u66f4\u90e8\u5206\u7684\u4ea4\u4e92\u50cf\u8fd9\u6837\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},'var klass = ass.GetType("App");\nvar method = klass.GetMethod("Update");\nmethod.Invoke(null, new object[] {deltaTime});\n')),(0,l.kt)("p",null,"\u8fd9\u79cd\u65b9\u5f0f\u7684\u7f3a\u70b9\u662f\u53cd\u5c04\u6210\u672c\u9ad8\uff0c\u4e07\u4e00\u5e26\u53c2\u6570\uff0c\u8fd8\u6709\u989d\u5916gc\uff0c\u5176\u5b9e\u5b8c\u5168\u6709\u66f4\u9ad8\u6548\u7684\u529e\u6cd5\u3002\u4e3b\u8981\u6709\u4e24\u79cd\u65b9\u5f0f\uff1a"),(0,l.kt)("h3",{id:"\u70ed\u66f4\u65b0\u5c42\u8fd4\u56de\u4e00\u4e2a-delegate"},"\u70ed\u66f4\u65b0\u5c42\u8fd4\u56de\u4e00\u4e2a Delegate"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},'// Hotfix.asmdf \u70ed\u66f4\u65b0\u90e8\u5206 \nclass App\n{\n    public static Action<float> GetUpdateDelegate()\n    {\n        return Update;\n    }\n\n    public static void Update(float deltaTime)\n    {\n    }\n}\n\n// Main.asmdf \u4e3b\u5de5\u7a0b\nvar klass = ass.GetType("App");\nvar method = klass.GetMethod("GetUpdateDelegate");\nvar updateDel = (Action<float>)method.Invoke(null, null);\n\nupdateDel(deltaTime);\n')),(0,l.kt)("h3",{id:"\u901a\u8fc7-delegatecreate\u6839\u636emethodinfo\u521b\u5efa\u76f8\u5e94\u7684delegate"},"\u901a\u8fc7 Delegate.Create\uff0c\u6839\u636eMethodInfo\u521b\u5efa\u76f8\u5e94\u7684Delegate"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},'var klass = ass.GetType("App");\nvar method = klass.GetMethod("Update");\nupdateDel = (Action<float>)System.Delegate.CreateDelegate(typeof(Action<float>), null, method);\nupdateDel(deltaTime);\n')),(0,l.kt)("h2",{id:"2021-\u7248\u672c\u4e0d\u8981\u4f7f\u7528-fastersmaller-builds-\u9009\u9879"},"2021 \u7248\u672c\u4e0d\u8981\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"h2"},"faster(smaller) builds")," \u9009\u9879"),(0,l.kt)("p",null,"\u81ea2021.3.x LTS\u7248\u672c\u8d77\uff0cil2cpp\u5df2\u7ecf\u5b8c\u5168\u652f\u6301",(0,l.kt)("inlineCode",{parentName:"p"},"full generic sharing"),"\u6280\u672f\uff0c\u5f53 Build Settings\u4e2d ",(0,l.kt)("inlineCode",{parentName:"p"},"Il2Cpp Code Generation")," \u9009\u9879\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"faster runtime"),"\u65f6\u4e3a\u6807\u51c6\u6cdb\u578b\u5171\u4eab\u673a\u5236\uff0c\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"faster(smaller) builds")," \u65f6\u5f00\u542f\n",(0,l.kt)("inlineCode",{parentName:"p"},"full generic sharing")," \u673a\u5236\u3002"),(0,l.kt)("p",null,"\u5f53\u5f00\u542f",(0,l.kt)("inlineCode",{parentName:"p"},"full generic sharing"),"\u540e\u6bcf\u4e2a\u6cdb\u578b\u51fd\u6570\uff08\u65e0\u8bba\u6cdb\u578b\u53c2\u6570\u662f\u503c\u7c7b\u578b\u8fd8\u662fclass\u7c7b\u578b\uff09\u90fd\u4f1a\u5b8c\u5168\u5171\u4eab\u4e00\u4efd\u4ee3\u7801\uff0c\u4f18\u70b9\u662f\u8282\u7ea6\u5305\u4f53\u5927\u5c0f\uff0c\u7f3a\u70b9\u662f\u6781\u5927\u5730\u4f24\u5bb3\u4e86\u6cdb\u578b\u51fd\u6570\u7684\u6027\u80fd\u3002\u5b8c\u5168\u6cdb\u578b\u5171\u4eab\u7684\u4ee3\u7801\u76f8\u6bd4\u4e8e\u6807\u51c6\u6cdb\u578b\u5171\u4eab\u4ee3\u7801\u6709\u65f6\u5019\u4f1a\u6162\u51e0\u500d\u5230\u5341\u51e0\u500d\uff0c\u751a\u81f3\u6bd4\u4e0d\u4e0a\u7eaf\u89e3\u91ca\u7248\u672c\u3002\u56e0\u6b64\u5f3a\u70c8\u63a8\u8350",(0,l.kt)("strong",{parentName:"p"},"\u4e0d\u8981\u5f00\u542f")," ",(0,l.kt)("inlineCode",{parentName:"p"},"faster(smaller) builds")," \u9009\u9879\u3002"))}m.isMDXComponent=!0}}]);