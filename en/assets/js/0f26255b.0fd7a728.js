"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[639],{3905:(e,t,i)=>{i.d(t,{Zo:()=>c,kt:()=>b});var n=i(7294);function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function a(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?a(Object(i),!0).forEach((function(t){r(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function s(e,t){if(null==e)return{};var i,n,r=function(e,t){if(null==e)return{};var i,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)i=a[n],t.indexOf(i)>=0||(r[i]=e[i]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)i=a[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}var m=n.createContext({}),l=function(e){var t=n.useContext(m),i=t;return e&&(i="function"==typeof e?e(t):o(o({},t),e)),i},c=function(e){var t=l(e.components);return n.createElement(m.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var i=e.components,r=e.mdxType,a=e.originalType,m=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=l(i),d=r,b=p["".concat(m,".").concat(d)]||p[d]||u[d]||a;return i?n.createElement(b,o(o({ref:t},c),{},{components:i})):n.createElement(b,o({ref:t},c))}));function b(e,t){var i=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=i.length,o=new Array(a);o[0]=d;var s={};for(var m in t)hasOwnProperty.call(t,m)&&(s[m]=t[m]);s.originalType=e,s[p]="string"==typeof e?e:r,o[1]=s;for(var l=2;l<a;l++)o[l]=i[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,i)}d.displayName="MDXCreateElement"},8409:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>m,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var n=i(7462),r=(i(7294),i(3905));const a={},o="Standard Interpretation Optimization",s={unversionedId:"business/basicoptimization",id:"business/basicoptimization",title:"Standard Interpretation Optimization",description:"Standard interpretation optimization technology is only available in the commercial version.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/basicoptimization.md",sourceDirName:"business",slug:"/business/basicoptimization",permalink:"/en/docs/business/basicoptimization",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Crash Report With Interpreter Strace Trace",permalink:"/en/docs/business/crashreport"},next:{title:"Offline Instruction Optimization",permalink:"/en/docs/business/advancedoptimization"}},m={},l=[{value:"Implementation",id:"implementation",level:2},{value:"Performance Report",id:"performance-report",level:2},{value:"AOT Time vs. Commercial Version Time vs. Community Version Time (Lower is better)",id:"aot-time-vs-commercial-version-time-vs-community-version-time-lower-is-better",level:3},{value:"Commercial Version Time/AOT Time vs. Community Version Time/AOT Time (Lower is better)",id:"commercial-version-timeaot-time-vs-community-version-timeaot-time-lower-is-better",level:3},{value:"Commercial Version Performance/Community Version Performance (Higher is better)",id:"commercial-version-performancecommunity-version-performance-higher-is-better",level:3},{value:"Commercial Version Time/AOT Time (Lower is better)",id:"commercial-version-timeaot-time-lower-is-better",level:3},{value:"Enabling and Disabling Standard Instruction Optimization",id:"enabling-and-disabling-standard-instruction-optimization",level:2}],c={toc:l},p="wrapper";function u(e){let{components:t,...a}=e;return(0,r.kt)(p,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"standard-interpretation-optimization"},"Standard Interpretation Optimization"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Standard interpretation optimization technology is only available in the commercial version.")),(0,r.kt)("p",null,"The standard interpretation optimization greatly improves the performance of interpreted execution using a variety of techniques, benefiting basic instructions (such as variable access and numerical calculations) immensely."),(0,r.kt)("p",null,"For example, in numerical calculation instructions, the performance has seen a qualitative leap after using standard interpretation optimization technology, with an increase of ",(0,r.kt)("strong",{parentName:"p"},"280%-735%"),"! Special codes like typeof instructions have seen an increase of over 1000%."),(0,r.kt)("h2",{id:"implementation"},"Implementation"),(0,r.kt)("p",null,"The standard interpretation optimization uses the following techniques to enhance interpretation performance."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Instruction dispatch optimization"),(0,r.kt)("li",{parentName:"ul"},"Instruction merging"),(0,r.kt)("li",{parentName:"ul"},"Useless instruction elimination"),(0,r.kt)("li",{parentName:"ul"},"Special instinct instructions")),(0,r.kt)("h2",{id:"performance-report"},"Performance Report"),(0,r.kt)("p",null,"The following is the performance report of OnePlus 9R ArmV8 real machine testing, with the test code attached at the end."),(0,r.kt)("h3",{id:"aot-time-vs-commercial-version-time-vs-community-version-time-lower-is-better"},"AOT Time vs. Commercial Version Time vs. Community Version Time (Lower is better)"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"data",src:i(5108).Z,width:"1361",height:"628"})),(0,r.kt)("h3",{id:"commercial-version-timeaot-time-vs-community-version-timeaot-time-lower-is-better"},"Commercial Version Time/AOT Time vs. Community Version Time/AOT Time (Lower is better)"),(0,r.kt)("p",null,"The performance of the AOT version is ",(0,r.kt)("inlineCode",{parentName:"p"},"4.1 - 90")," times that of the community version, and ",(0,r.kt)("inlineCode",{parentName:"p"},"1.30 - 12.9")," times that of the commercial version."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"data",src:i(9446).Z,width:"1283",height:"647"})),(0,r.kt)("h3",{id:"commercial-version-performancecommunity-version-performance-higher-is-better"},"Commercial Version Performance/Community Version Performance (Higher is better)"),(0,r.kt)("p",null,"The performance of the commercial version is ",(0,r.kt)("inlineCode",{parentName:"p"},"2.87-7.35")," times that of the community version."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"data",src:i(9672).Z,width:"1280",height:"527"})),(0,r.kt)("h3",{id:"commercial-version-timeaot-time-lower-is-better"},"Commercial Version Time/AOT Time (Lower is better)"),(0,r.kt)("p",null,"The performance of the AOT version is ",(0,r.kt)("inlineCode",{parentName:"p"},"1.30 - 12.9")," times that of the commercial version."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"data",src:i(9999).Z,width:"1280",height:"640"})),(0,r.kt)("h2",{id:"enabling-and-disabling-standard-instruction-optimization"},"Enabling and Disabling Standard Instruction Optimization"),(0,r.kt)("p",null,"Standard optimization is ",(0,r.kt)("strong",{parentName:"p"},"enabled")," by default. This setting is global and applies to all assemblies, including supplementary metadata assemblies."),(0,r.kt)("p",null,"You can manually enable or disable this feature using the ",(0,r.kt)("inlineCode",{parentName:"p"},"RuntimeApi.EnableTransformOptimization")," function."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"\n    /// Disable standard instruction optimization\n    void DisableCodeOptimization()\n    {\n        RuntimeApi.EnableTransformOptimization(false);\n    }\n")))}u.isMDXComponent=!0},9446:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/numeric_business_vs_aot_div_aot-5f9d5d52b2dd791d61ef588be2f6e1e4.jpg"},5108:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/numeric_datas-c7e623fb0136033a877678da6376da41.jpg"},9999:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/numeric_dialog_business_div_aot-44e9b55446d50bceb8b332085d55387f.jpg"},9672:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/numeric_dialog_business_div_community-e02edc41129f5859b800a362c8b91bc8.jpg"}}]);