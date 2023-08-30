"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4191],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var o=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,i=function(e,t){if(null==e)return{};var r,o,i={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=o.createContext({}),p=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},d=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var r=e.components,i=e.mdxType,n=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(r),h=i,m=u["".concat(l,".").concat(h)]||u[h]||c[h]||n;return r?o.createElement(m,a(a({ref:t},d),{},{components:r})):o.createElement(m,a({ref:t},d))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=r.length,a=new Array(n);a[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:i,a[1]=s;for(var p=2;p<n;p++)a[p]=r[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}h.displayName="MDXCreateElement"},1128:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>n,metadata:()=>s,toc:()=>p});var o=r(7462),i=(r(7294),r(3905));const n={},a="FAQ",s={unversionedId:"help/faq",id:"help/faq",title:"FAQ",description:"What platforms does HybridCLR support?",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/help/faq.md",sourceDirName:"help",slug:"/help/faq",permalink:"/en/docs/help/faq",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5e2e\u52a9",permalink:"/en/docs/help"},next:{title:"Common Errors",permalink:"/en/docs/help/commonerrors"}},l={},p=[{value:"What platforms does HybridCLR support?",id:"what-platforms-does-hybridclr-support",level:2},{value:"How much will HybridCLR increase the package body",id:"how-much-will-hybridclr-increase-the-package-body",level:2},{value:"Why does the package size printed by HybridCLR increase a lot?",id:"why-does-the-package-size-printed-by-hybridclr-increase-a-lot",level:2},{value:"Is HybridCLR embedded with mono?",id:"is-hybridclr-embedded-with-mono",level:2},{value:"Are there any restrictions on writing code in HybridCLR?",id:"are-there-any-restrictions-on-writing-code-in-hybridclr",level:2},{value:"Does it support generic classes and generic functions?",id:"does-it-support-generic-classes-and-generic-functions",level:2},{value:"Support hot update MonoBehaviour?",id:"support-hot-update-monobehaviour",level:2},{value:"Does it support reflection?",id:"does-it-support-reflection",level:2},{value:"How about multithreading support?",id:"how-about-multithreading-support",level:2},{value:"Does it support multiple assemblies?",id:"does-it-support-multiple-assemblies",level:2},{value:"Does it support .net standard 2.0?",id:"does-it-support-net-standard-20",level:2},{value:"Does it support Unity&#39;s DOTS framework?",id:"does-it-support-unitys-dots-framework",level:2}],d={toc:p},u="wrapper";function c(e){let{components:t,...r}=e;return(0,i.kt)(u,(0,o.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"faq"},"FAQ"),(0,i.kt)("h2",{id:"what-platforms-does-hybridclr-support"},"What platforms does HybridCLR support?"),(0,i.kt)("p",null,"All platforms supported by il2cpp support"),(0,i.kt)("h2",{id:"how-much-will-hybridclr-increase-the-package-body"},"How much will HybridCLR increase the package body"),(0,i.kt)("p",null,"Taking the 2019 version as an example, the libil2cpp.a file of the Android project is exported in release mode, the original version is 12.69M, and the HybridCLR version is 13.97M, which means an increase of about 1.3M."),(0,i.kt)("h2",{id:"why-does-the-package-size-printed-by-hybridclr-increase-a-lot"},"Why does the package size printed by HybridCLR increase a lot?"),(0,i.kt)("p",null,"HybridCLR itself will only add a few inclusions (1-2M). The package body has increased a lot because you mistakenly reserved too many classes in link.xml, resulting in a sharp increase in the package body. Please refer to Unity's clipping rules for optimization."),(0,i.kt)("h2",{id:"is-hybridclr-embedded-with-mono"},"Is HybridCLR embedded with mono?"),(0,i.kt)("p",null,"no. HybridCLR supplements il2cpp with a complete register interpreter implemented completely independently."),(0,i.kt)("h2",{id:"are-there-any-restrictions-on-writing-code-in-hybridclr"},"Are there any restrictions on writing code in HybridCLR?"),(0,i.kt)("p",null,"Few restrictions, see ",(0,i.kt)("a",{parentName:"p",href:"/en/docs/basic/notsupportedfeatures"},"Unsupported Features")),(0,i.kt)("h2",{id:"does-it-support-generic-classes-and-generic-functions"},"Does it support generic classes and generic functions?"),(0,i.kt)("p",null,"Thorough and complete support without any limitations."),(0,i.kt)("h2",{id:"support-hot-update-monobehaviour"},"Support hot update MonoBehaviour?"),(0,i.kt)("p",null,"fully support. Not only can it be added in the code, but it can also be directly linked to hot update resources. For details, see ",(0,i.kt)("a",{parentName:"p",href:"/en/docs/basic/monobehaviour"},"Using Hot Update MonoBehaviour")),(0,i.kt)("h2",{id:"does-it-support-reflection"},"Does it support reflection?"),(0,i.kt)("p",null,"Supported, without any restrictions."),(0,i.kt)("h2",{id:"how-about-multithreading-support"},"How about multithreading support?"),(0,i.kt)("p",null,"Full support. Support Thread, Task, volatile, ThreadStatic, async."),(0,i.kt)("h2",{id:"does-it-support-multiple-assemblies"},"Does it support multiple assemblies?"),(0,i.kt)("p",null,"Support, up to 255. But the dependent dll will not be loaded automatically. You need to manually load hot-updated dlls in the order of dependencies."),(0,i.kt)("h2",{id:"does-it-support-net-standard-20"},"Does it support .net standard 2.0?"),(0,i.kt)("p",null,"support. But please note that the main project is packaged with .net standard, while the hot update dll must be packaged with .net 4.x**. For detailed explanation, please refer to ",(0,i.kt)("a",{parentName:"p",href:"/en/docs/help/commonerrors"},"Common Errors Documentation")),(0,i.kt)("h2",{id:"does-it-support-unitys-dots-framework"},"Does it support Unity's DOTS framework?"),(0,i.kt)("p",null,"support. The burst code in the AOT part works fine, but the burst code in the hot update part is executed interpretively. This is obvious."))}c.isMDXComponent=!0}}]);