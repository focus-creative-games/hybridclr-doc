"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[447],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var i=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=i.createContext({}),m=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=m(e.components);return i.createElement(s.Provider,{value:t},e.children)},l="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),l=m(n),d=o,f=l["".concat(s,".").concat(d)]||l[d]||u[d]||r;return n?i.createElement(f,a(a({ref:t},p),{},{components:n})):i.createElement(f,a({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[l]="string"==typeof e?e:o,a[1]=c;for(var m=2;m<r;m++)a[m]=n[m];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7061:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>c,toc:()=>m});var i=n(7462),o=(n(7294),n(3905));const r={},a="Standard Code Optimization",c={unversionedId:"business/basiccodeoptimization",id:"business/basiccodeoptimization",title:"Standard Code Optimization",description:"Careful and reliable optimization of common code paradigms has greatly improved the performance of common instructions such as variable access (50%-100%), numerical calculations (100-300%), object access (50-200%), etc., like some special The performance of codes such as typeof instructions has been improved by more than 1000%.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/basiccodeoptimization.md",sourceDirName:"business",slug:"/business/basiccodeoptimization",permalink:"/en/docs/business/basiccodeoptimization",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Fully generic sharing",permalink:"/en/docs/business/fullgenericsharing"},next:{title:"Advanced instruction optimization",permalink:"/en/docs/business/advancedcodeoptimization"}},s={},m=[{value:"Implementation",id:"implementation",level:2},{value:"Performance data",id:"performance-data",level:2}],p={toc:m},l="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(l,(0,i.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"standard-code-optimization"},"Standard Code Optimization"),(0,o.kt)("p",null,"Careful and reliable optimization of common code paradigms has greatly improved the performance of common instructions such as variable access (50%-100%), numerical calculations (100-300%), object access (50-200%), etc., like some special The performance of codes such as typeof instructions has been improved by more than 1000%."),(0,o.kt)("h2",{id:"implementation"},"Implementation"),(0,o.kt)("p",null,"Due to runtime time and memory constraints, standard instruction optimization only does some simple but reliable optimizations such as useless stack elimination and peephole optimization, and cannot perform some complex optimizations. However, since the IL instruction is a stack instruction, even if only some common and uncomplicated optimizations are made, the performance is greatly improved compared to the community's unoptimized version."),(0,o.kt)("p",null,"[Advanced instruction optimization]"," (./advancedcodeoptimization) compared with standard instruction optimization, using complex offline optimization technology, the performance is much better than standard instruction optimization technology."),(0,o.kt)("h2",{id:"performance-data"},"Performance data"),(0,o.kt)("p",null,"The following is the performance improvement data of standard instruction optimization compared to the community version (0 means the performance is the same, n means n times improvement)."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"interpreter_optimization",src:n(5980).Z,width:"1296",height:"722"})),(0,o.kt)("p",null,"The following is a performance comparison between native and standard instruction optimization in terms of numerical calculations. The ordinate is time consumption. The standard instruction optimized addition is about 7-16 times that of the native one, the multiplication is 4 times, and the division is 2 times."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"benchmark_numeric",src:n(8412).Z,width:"1332",height:"691"})))}u.isMDXComponent=!0},8412:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/benchmark_numeric-6fe2ab2c56b6ca10cfe84d60a963ab9c.jpg"},5980:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/interpreter_optimization-51c5e75c04b0c78b050283ce56e9e708.jpg"}}]);