"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4164],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>k});var a=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var p=a.createContext({}),u=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=u(e.components);return a.createElement(p.Provider,{value:t},e.children)},d="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=u(n),m=l,k=d["".concat(p,".").concat(m)]||d[m]||h[m]||r;return n?a.createElement(k,o(o({ref:t},s),{},{components:n})):a.createElement(k,o({ref:t},s))}));function k(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,o=new Array(r);o[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[d]="string"==typeof e?e:l,o[1]=i;for(var u=2;u<r;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4731:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>u});var a=n(7462),l=(n(7294),n(3905));const r={},o="DHAO\u5de5\u4f5c\u6d41",i={unversionedId:"business/ultimate/dhaoworkflow",id:"version-7.8.1/business/ultimate/dhaoworkflow",title:"DHAO\u5de5\u4f5c\u6d41",description:"\u5982\u679c\u4f60\u4f7f\u7528\u7684hybridclr\u7248\u672c >= v7.7.0\uff0c\u5efa\u8bae\u4f7f\u7528MetaVersion\u5de5\u4f5c\u6d41\u3002",source:"@site/versioned_docs/version-7.8.1/business/ultimate/dhaoworkflow.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/dhaoworkflow",permalink:"/docs/7.8.1/business/ultimate/dhaoworkflow",draft:!1,tags:[],version:"7.8.1",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"MetaVersion\u5de5\u4f5c\u6d41",permalink:"/docs/7.8.1/business/ultimate/metaversionworkflow"},next:{title:"\u4f7f\u7528\u624b\u518c",permalink:"/docs/7.8.1/business/ultimate/manual"}},p={},u=[{value:"\u539f\u7406",id:"\u539f\u7406",level:2},{value:"\u57fa\u7840\u6982\u5ff5",id:"\u57fa\u7840\u6982\u5ff5",level:2},{value:"AOT Snapshot",id:"aot-snapshot",level:3},{value:"Inject Rule\u6587\u4ef6",id:"inject-rule\u6587\u4ef6",level:3},{value:"manifest.json",id:"manifestjson",level:3},{value:"dhao\u6587\u4ef6",id:"dhao\u6587\u4ef6",level:3},{value:"spec\u6587\u4ef6",id:"spec\u6587\u4ef6",level:3},{value:"\u6784\u5efa\u548c\u70ed\u66f4\u65b0\u5de5\u4f5c\u6d41",id:"\u6784\u5efa\u548c\u70ed\u66f4\u65b0\u5de5\u4f5c\u6d41",level:2},{value:"\u521b\u5efaAOT Snapshot",id:"\u521b\u5efaaot-snapshot",level:2},{value:"\u751f\u6210dhao",id:"\u751f\u6210dhao",level:2},{value:"\u591a\u5e73\u53f0\u4e0e\u591a\u4e3b\u5305",id:"\u591a\u5e73\u53f0\u4e0e\u591a\u4e3b\u5305",level:2},{value:"\u5408\u5e76\u591a\u4e2adhao\u6587\u4ef6\uff08\u4e0d\u5efa\u8bae\uff09",id:"\u5408\u5e76\u591a\u4e2adhao\u6587\u4ef6\u4e0d\u5efa\u8bae",level:2}],s={toc:u},d="wrapper";function h(e){let{components:t,...n}=e;return(0,l.kt)(d,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"dhao\u5de5\u4f5c\u6d41"},"DHAO\u5de5\u4f5c\u6d41"),(0,l.kt)("admonition",{type:"warning"},(0,l.kt)("p",{parentName:"admonition"},"\u5982\u679c\u4f60\u4f7f\u7528\u7684hybridclr\u7248\u672c >= v7.7.0\uff0c\u5efa\u8bae\u4f7f\u7528",(0,l.kt)("a",{parentName:"p",href:"./metaversionworkflow"},"MetaVersion\u5de5\u4f5c\u6d41"),"\u3002")),(0,l.kt)("p",null,"DHAO\u5de5\u4f5c\u6d41\u662fDHE\u70ed\u66f4\u65b0\u4f7f\u7528\u6700\u60a0\u4e45\u7684\u5de5\u4f5c\u6d41\uff0c\u5728v7.6.0\u53ca\u66f4\u65e9\u7248\u672c\u4e4b\u524d\uff0c\u53ea\u652f\u6301DHAO\u5de5\u4f5c\u6d41\u3002"),(0,l.kt)("h2",{id:"\u539f\u7406"},"\u539f\u7406"),(0,l.kt)("p",null,"\u52a0\u8f7dDHE\u7a0b\u5e8f\u96c6\u65f6\u9700\u8981\u77e5\u9053\u54ea\u4e9b\u7c7b\u578b\u548c\u51fd\u6570\u53d1\u751f\u4e86\u6539\u53d8\uff0c\u4ee5\u51b3\u7b56\u8fd0\u884c\u65f6\u5e94\u8be5\u8c03\u7528\u539f\u59cb\u7684AOT\u4ee3\u7801\u8fd8\u662f\u89e3\u91ca\u6267\u884c\u6700\u65b0\u7684\u70ed\u66f4\u65b0\u4ee3\u7801\u3002\u8fd9\u4e2a\u5dee\u5f02\u8ba1\u7b97\u4f9d\u8d56\u539f\u59cbDHE\u548c\u6700\u65b0DHE\u7a0b\u5e8f\u96c6\uff0c\n\u8ba1\u7b97\u975e\u5e38\u590d\u6742\u800c\u4e14\u8017\u65f6\uff0c\u4e0d\u53ef\u80fd\u8fd0\u884c\u8fc7\u7a0b\u4e2d\u5b9e\u65f6\u8ba1\u7b97\uff0c\u56e0\u6b64\u4f7f\u7528\u79bb\u7ebf\u8ba1\u7b97\u7684\u65b9\u5f0f\u3002\u8ba1\u7b97\u51fa\u7684\u5dee\u5f02\u4fe1\u606f\u4fdd\u5b58\u5230dhao\u6587\u4ef6\u4e2d\u3002"),(0,l.kt)("p",null,"DHAO\u5de5\u4f5c\u6d41\u539f\u7406\u7b80\u5355\uff0c\u4f46\u7531\u4e8edhao\u6587\u4ef6\u662f\u6839\u636e\u6700\u65b0DHE\u4e0e\u539f\u59cbDHE\u8ba1\u7b97\u800c\u6765\uff0c\u5982\u679c\u6b63\u5f0f\u4e0a\u7ebf\u540e\u5b58\u5728\u591a\u4e2a\u4e3b\u5305\uff0c\u5219\u9700\u8981\u4e3a\u6bcf\u4e2a\u4e3b\u5305\u751f\u6210\u5bf9\u5e94\u7684dhao\u6587\u4ef6\u3002\n\u5f53\u4e3b\u5305\u8f83\u591a\u65f6\u8fd9\u4e2a\u6d41\u7a0b\u6bd4\u8f83\u590d\u6742\uff0c\u4e0d\u597d\u7ba1\u7406\u3002","[MetaVersion\u5de5\u4f5c\u6d41]","\u5f7b\u5e95\u89e3\u51b3\u4e86\u8fd9\u4e2a\u75db\u70b9\u95ee\u9898\u3002"),(0,l.kt)("h2",{id:"\u57fa\u7840\u6982\u5ff5"},"\u57fa\u7840\u6982\u5ff5"),(0,l.kt)("p",null,"\u4e86\u89e3DHAO\u5de5\u4f5c\u6d41\u9700\u8981\u4e86\u89e3\u4ee5\u4e0b\u51e0\u4e2a\u672f\u8bed\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"AOT Snapshot"),(0,l.kt)("li",{parentName:"ul"},"inject rule\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"manifest.json"),(0,l.kt)("li",{parentName:"ul"},"dhao\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"spec\u6587\u4ef6")),(0,l.kt)("h3",{id:"aot-snapshot"},"AOT Snapshot"),(0,l.kt)("p",null,"AOT Snapshot\u662f\u4e00\u7ec4\u8ba1\u7b97dhao\u6587\u4ef6\u6240\u9700\u7684\u6587\u4ef6\u7684\u96c6\u5408\uff0c\u5b83\u5305\u542b\u4ee5\u4e0b\u6587\u4ef6\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"dll\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"inject rule\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"manifest.json")),(0,l.kt)("p",null,"AOT Snapshot\u8bb0\u5f55\u4e86\u4e3b\u5305AOT\u4fe1\u606f\uff0c\u5b83\u7684\u6838\u5fc3\u529f\u80fd\u662f\u7528\u4e8e\u8ba1\u7b97\u70ed\u66f4\u65b0\u65f6\u6240\u9700\u7684dhao\u6587\u4ef6\u3002"),(0,l.kt)("p",null,"AOT Snapshot\u7684\u76ee\u5f55\u7ed3\u6784\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-txt"},"  AotSnapshotDir\n    \u251c\u2500\u2500 *.dll\n    \u251c\u2500\u2500 InjectRules\n    \u2514\u2500\u2500 manifest.json\n")),(0,l.kt)("p",null,"AOT Snapshot\u4fe1\u606f\u5728\u6784\u5efa\u4e3b\u5305\u65f6\u5df2\u7ecf\u5b8c\u5168\u786e\u5b9a\uff0c\u8bf7\u5c06\u5b83\u52a0\u5165\u9879\u76ee\u7684\u7248\u672c\u7ba1\u7406\u7cfb\u7edf\u3002"),(0,l.kt)("h3",{id:"inject-rule\u6587\u4ef6"},"Inject Rule\u6587\u4ef6"),(0,l.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u4f1a\u5728\u51e0\u4e4e\u6240\u6709DHE\u51fd\u6570\u7684\u5934\u90e8\u6ce8\u5165\u4ee3\u7801\u3002\u6ce8\u5165\u4ee3\u7801\u53ef\u4ee5\u6781\u5927\u7f13\u89e3\u810f\u51fd\u6570\u4f20\u67d3\u95ee\u9898\uff0c\u7f3a\u70b9\u662f\u589e\u52a0\u4ee3\u7801\u5927\u5c0f\u4ee5\u53ca\u5e26\u6765\u5c11\u91cf\u7684\u989d\u5916\u5f00\u9500\u3002Inject Rule\u6587\u4ef6\u7528\u4e8e\n\u81ea\u5b9a\u4e49\u4ee3\u7801\u6ce8\u5165\u89c4\u5219\uff0c\u5141\u8bb8\u5bf9\u4e8e\u4e00\u4e9b\u51fd\u6570\u4e0d\u6ce8\u5165\u3002\u8be6\u7ec6\u6587\u6863\u89c1",(0,l.kt)("a",{parentName:"p",href:"./injectrules"},"\u51fd\u6570\u6ce8\u5165\u7b56\u7565"),"\u3002"),(0,l.kt)("h3",{id:"manifestjson"},"manifest.json"),(0,l.kt)("p",null,"\u8bb0\u5f55\u4e86DHE\u7a0b\u5e8f\u96c6\u5217\u8868\u4e4b\u7c7b\u7684\u4fe1\u606f\u3002"),(0,l.kt)("h3",{id:"dhao\u6587\u4ef6"},"dhao\u6587\u4ef6"),(0,l.kt)("p",null,"dhao\u6587\u4ef6\u8bb0\u5f55\u4e86DHE\u7a0b\u5e8f\u96c6\u4e2d\u6539\u53d8\u7684\u7c7b\u578b\u548c\u51fd\u6570\uff0c\u5f53\u6267\u884c\u90a3\u4e9b\u53d8\u5316\u7684\u51fd\u6570\u65f6\uff0c\u4f1a\u81ea\u52a8\u5207\u6362\u5230\u89e3\u91ca\u6267\u884c\u3002"),(0,l.kt)("p",null,"dhao\u6587\u4ef6\u4f7f\u7528",(0,l.kt)("inlineCode",{parentName:"p"},".dhao.bytes"),"\u540e\u7f00\u3002"),(0,l.kt)("h3",{id:"spec\u6587\u4ef6"},"spec\u6587\u4ef6"),(0,l.kt)("p",null,"spec\u6587\u4ef6\u662fdhao\u6587\u4ef6\u7684\u53ef\u9605\u8bfb\u7248\u672c\uff0c\u8fd0\u884c\u8fc7\u7a0b\u4e2d\u7528\u4e0d\u5230\u6b64\u6587\u4ef6\u3002\u5efa\u8bae\u52a0\u5165\u5230\u4ed3\u5e93\uff0c\u4f46\u4e0d\u8981\u52a0\u5165\u5230\u70ed\u66f4\u65b0\u8d44\u6e90\u7cfb\u7edf\uff0c\u56e0\u4e3a\u6ca1\u6709\u4efb\u4f55\u7528\u5904\uff01"),(0,l.kt)("h2",{id:"\u6784\u5efa\u548c\u70ed\u66f4\u65b0\u5de5\u4f5c\u6d41"},"\u6784\u5efa\u548c\u70ed\u66f4\u65b0\u5de5\u4f5c\u6d41"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u6784\u5efa\u4e3b\u5305",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u5bfc\u51fa\u4e3b\u5305\u5de5\u7a0b\u6216\u8005\u76f4\u63a5\u6784\u5efa\u4e3b\u5305"),(0,l.kt)("li",{parentName:"ul"},"\u521b\u5efaAOT Snapshot"))),(0,l.kt)("li",{parentName:"ul"},"\u53d1\u5e03\u70ed\u66f4\u65b0",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u7f16\u8bd1\u70ed\u66f4\u65b0dll"),(0,l.kt)("li",{parentName:"ul"},"\u6839\u636eAOT Snapshot\u548c\u6700\u65b0\u7684\u70ed\u66f4\u65b0dll\uff0c\u8ba1\u7b97dhao\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"\u5c06\u70ed\u66f4\u65b0dll\u548cdhao\u6587\u4ef6\u52a0\u5165\u70ed\u66f4\u65b0\u8d44\u6e90\u7cfb\u7edf")))),(0,l.kt)("h2",{id:"\u521b\u5efaaot-snapshot"},"\u521b\u5efaAOT Snapshot"),(0,l.kt)("admonition",{type:"warning"},(0,l.kt)("p",{parentName:"admonition"},"AOT Snapshot\u4e2d\u7684dll\u5fc5\u987b\u7cbe\u786e\u5730\u4e0e\u6784\u5efa\u51fa\u7684\u4e3b\u5305\u4e2d\u4e8c\u8fdb\u5236\u4ee3\u7801\u4e00\u81f4\uff0c\u8bf7\u52a1\u5fc5\u5728",(0,l.kt)("strong",{parentName:"p"},"\u5bfc\u51fa\u5de5\u7a0b"),"\u6216\u8005",(0,l.kt)("strong",{parentName:"p"},"Build"),"\u540e\u518d\u521b\u5efa\uff01\u4e0d\u80fd\u4f7f\u7528",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/Generate/All"),"\u751f\u6210\u7684AOT dll\uff01")),(0,l.kt)("p",null,"\u8c03\u7528",(0,l.kt)("inlineCode",{parentName:"p"},"DhaoWorkflow.CreateAotSnapshot(BuildTarget target, string outputSnapshotDir)"),"\u521b\u5efaAOT Snapshot\u6587\u4ef6\u3002"),(0,l.kt)("p",null,"\u8bf7\u5c06AOT Snapshot\u52a0\u5165\u7248\u672c\u7ba1\u7406\uff0c\u4ee5\u4fbf\u540e\u7eed\u4f7f\u7528\u3002"),(0,l.kt)("h2",{id:"\u751f\u6210dhao"},"\u751f\u6210dhao"),(0,l.kt)("p",null,"\u751f\u6210\u6d41\u7a0b\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"HybridCLR/CompileDll/ActivedBuildTarget")," \u7f16\u8bd1\u6700\u65b0\u7684\u70ed\u66f4\u65b0dll\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u8c03\u7528",(0,l.kt)("inlineCode",{parentName:"p"},"DhaoWorkflow.GenerateDhaoFiles(string aotSnapshotDir, string hotUpdateSnapshotDir, string dhaoOutputDir)"),"\u751f\u6210dhao\u6587\u4ef6\u3002"),(0,l.kt)("p",{parentName:"li"},"aotSnapshotDir\u4e3a\u6784\u5efa\u4e3b\u5305\u65f6\u521b\u5efa\u7684AOT Snapshot\u76ee\u5f55\u3002hotUpdateSnapshotDir\u4e3a\u6700\u65b0\u7684\u70ed\u66f4\u65b0dll\u76ee\u5f55\u3002dhaoOutputDir\u4e3adhao\u6587\u4ef6\u8f93\u51fa\u76ee\u5f55\u3002"))),(0,l.kt)("h2",{id:"\u591a\u5e73\u53f0\u4e0e\u591a\u4e3b\u5305"},"\u591a\u5e73\u53f0\u4e0e\u591a\u4e3b\u5305"),(0,l.kt)("p",null,"\u7531\u4e8edhao\u7684\u5b9e\u73b0\u539f\u7406\uff0c\u6bcf\u6b21\u53d1\u5e03\u70ed\u66f4\u65b0\uff0c\u6bcf\u4e2a",(0,l.kt)("inlineCode",{parentName:"p"},"{\u4e3b\u5305-\u5e73\u53f0}"),"\u7684\u7ec4\u5408\u90fd\u9700\u8981\u751f\u6210\u5355\u72ec\u7684dhao\u6587\u4ef6\u3002"),(0,l.kt)("h2",{id:"\u5408\u5e76\u591a\u4e2adhao\u6587\u4ef6\u4e0d\u5efa\u8bae"},"\u5408\u5e76\u591a\u4e2adhao\u6587\u4ef6\uff08\u4e0d\u5efa\u8bae\uff09"),(0,l.kt)("admonition",{type:"warning"},(0,l.kt)("p",{parentName:"admonition"},"\u5408\u5e76dhao\u6587\u4ef6\u4f1a\u5bfc\u81f4\u6027\u80fd\u4e0b\u964d\uff0c\u614e\u7528\u6b64\u529f\u80fd\uff01\uff01\uff01")),(0,l.kt)("p",null,"\u5982\u679c\u89c9\u5f97\u6bcf\u4e2a\u4e3b\u5305\u90fd\u63d0\u4f9b\u5355\u72ec\u7684dhao\u6587\u4ef6\u5f88\u9ebb\u70e6\uff0c\u53ef\u4ee5\u8003\u8651\u540c\u4e00\u5e73\u53f0\u4e0b\u7684\u6240\u6709\u4e3b\u5305\u7684dhao\u6587\u4ef6\u5408\u5e76\u4e3a\u4e00\u4e2adhao\u6587\u4ef6\uff0c\u8c03\u7528",(0,l.kt)("inlineCode",{parentName:"p"},"DhaoWorkflow.MergeDhaoFile"),"\u5b8c\u6210\u8fd9\u4e2a\u5de5\u4f5c\u3002"),(0,l.kt)("p",null,"\u6240\u6709\u4e3b\u5305\u7684dhao\u6587\u4ef6\u5408\u5e76\u4e3a\u4e00\u4e2adhao\u6587\u4ef6\u6709\u4e00\u4e2a\u7f3a\u70b9\uff0c\u6700\u7ec8\u8f93\u51fa\u7684dhao\u6587\u4ef6\u4e2d\u8bb0\u5f55\u7684\u7c7b\u578b\u548c\u51fd\u6570\u53d8\u5316\u4e3a\u6240\u6709\u8f93\u5165dhao\u6587\u4ef6\u4e2d\u7c7b\u578b\u548c\u51fd\u6570\u53d8\u5316\u7684\u5e76\u96c6\u3002\u8fd9\u5bfc\u81f4\u5982\u679c\u67d0\u4e2a\u51fd\u6570\u53ea\n\u5728\u65e7\u4e3b\u5305\u4e2d\u53d1\u751f\u6539\u53d8\uff0c\u5728\u6700\u65b0\u7684\u4e3b\u5305\u4e2d\u6ca1\u6709\u53d1\u751f\u6539\u53d8\uff0c\u5408\u5e76\u7684dhao\u6587\u4ef6\u4e2d\u4f1a\u5c06\u8fd9\u4e2a\u51fd\u6570\u6807\u8bb0\u4e3a\u53d8\u5316\uff0c\u5bfc\u81f4\u5728\u6700\u65b0\u7684\u4e3b\u5305\u4e2d\u4e5f\u89e3\u91ca\u65b9\u5f0f\u6267\u884c\u8be5\u51fd\u6570\u3002\u8fd9\u5e26\u6765\u6027\u80fd\u4e0b\u964d\u3002"))}h.isMDXComponent=!0}}]);