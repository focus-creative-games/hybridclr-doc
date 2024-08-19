"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2163],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),d=i,f=p["".concat(s,".").concat(d)]||p[d]||m[d]||a;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:i,o[1]=l;for(var c=2;c<a;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5357:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const a={},o="Introduction",l={unversionedId:"business/ultimate/intro",id:"business/ultimate/intro",title:"Introduction",description:"The Ultimate Edition is primarily aimed at projects with strict performance requirements. Compared to the community edition, the Ultimate Edition has a significant performance improvement, almost reaching native performance levels (100% unchanged), while also offering good optimizations in terms of security and memory.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/ultimate/intro.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/intro",permalink:"/en/docs/business/ultimate/intro",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u65d7\u8230\u7248",permalink:"/en/docs/ultimate"},next:{title:"Get started quickly",permalink:"/en/docs/business/ultimate/quickstartunchecked"}},s={},c=[{value:"Supported Versions",id:"supported-versions",level:2},{value:"Advantages",id:"advantages",level:2},{value:"Predictable Effects",id:"predictable-effects",level:2},{value:"Differences from Solutions like InjectFix",id:"differences-from-solutions-like-injectfix",level:2}],u={toc:c},p="wrapper";function m(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"The Ultimate Edition is primarily aimed at projects with strict performance requirements. Compared to the community edition, the Ultimate Edition has a significant performance improvement, almost reaching native performance levels (",(0,i.kt)("strong",{parentName:"p"},"100% unchanged"),"), while also offering good optimizations in terms of security and memory."),(0,i.kt)("h2",{id:"supported-versions"},"Supported Versions"),(0,i.kt)("p",null,"Supports all Unity 2019-2022 LTS versions."),(0,i.kt)("h2",{id:"advantages"},"Advantages"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Includes all features of the ",(0,i.kt)("a",{parentName:"li",href:"../pro/intro"},"Professional Edition"),"."),(0,i.kt)("li",{parentName:"ul"},"Incorporates the innovative ",(0,i.kt)("a",{parentName:"li",href:"../differentialhybridexecution"},"DHE")," technology, where unchanged code performs identically to native code. Compared to the purely interpreted approach of the community edition, DHE offers an astonishing ",(0,i.kt)("strong",{parentName:"li"},"3-30 times")," or higher performance boost, achieving nearly native performance levels overall."),(0,i.kt)("li",{parentName:"ul"},"Includes two years of technical support.")),(0,i.kt)("h2",{id:"predictable-effects"},"Predictable Effects"),(0,i.kt)("p",null,"The effects of DHE technology are predictable. It's possible to know the final effect without actually running DHE."),(0,i.kt)("p",null,"Before hot updates, the performance is identical to native code. After hot updates, at the function level, the changed functions are executed in an interpreted manner. When generating the dhao file, all changed functions are also printed out. Therefore, developers can estimate in advance which functions' performance has been affected by the hot update behavior."),(0,i.kt)("h2",{id:"differences-from-solutions-like-injectfix"},"Differences from Solutions like InjectFix"),(0,i.kt)("p",null,"Overall, the Ultimate Edition meets the needs of projects that require arbitrary logic hot updates while maintaining native performance, while InjectFix is primarily used for fixing function bugs, with a world of difference between the two. The specific differences are as follows:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Solution"),(0,i.kt)("th",{parentName:"tr",align:null},"Ultimate Edition"),(0,i.kt)("th",{parentName:"tr",align:null},"InjectFix"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Code Change Limitations"),(0,i.kt)("td",{parentName:"tr",align:null},"Can be changed arbitrarily"),(0,i.kt)("td",{parentName:"tr",align:null},"Only supports fixing functions and very small-scale code additions (due to many unsupported features and bugs)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Supported C# Features"),(0,i.kt)("td",{parentName:"tr",align:null},"Inherits the characteristics of the community version, with almost no code limitations"),(0,i.kt)("td",{parentName:"tr",align:null},"Many features missing, significant limitations on type inheritance, delegates, generics, reflection, multithreading, async, or simply cannot work properly (similar defects to ILRuntime)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Performance"),(0,i.kt)("td",{parentName:"tr",align:null},"Unchanged functions are the same as AOT, changed functions are interpreted, but interpretation performance is extremely efficient (average performance is more than ten times that of InjectFix)"),(0,i.kt)("td",{parentName:"tr",align:null},"Even unchanged functions suffer performance degradation due to instrumentation. Additionally, interpreter performance is extremely inefficient")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"GC"),(0,i.kt)("td",{parentName:"tr",align:null},"Completely identical to native"),(0,i.kt)("td",{parentName:"tr",align:null},"Significant additional GC")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Workflow"),(0,i.kt)("td",{parentName:"tr",align:null},"Automatic tagging, one-click completion, no manual involvement required"),(0,i.kt)("td",{parentName:"tr",align:null},"Manual tagging, time-consuming, error-prone, and tedious, disaster in multi-version maintenance")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Stability Level"),(0,i.kt)("td",{parentName:"tr",align:null},"Extensively verified in numerous projects, extremely high stability"),(0,i.kt)("td",{parentName:"tr",align:null},"Many unsupported features and bugs")))))}m.isMDXComponent=!0}}]);