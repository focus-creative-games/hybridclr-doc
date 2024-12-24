"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[60],{3905:(t,e,n)=>{n.d(e,{Zo:()=>d,kt:()=>k});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),u=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},d=function(t){var e=u(t.components);return a.createElement(p.Provider,{value:e},t.children)},s="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},c=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),s=u(n),c=r,k=s["".concat(p,".").concat(c)]||s[c]||m[c]||l;return n?a.createElement(k,i(i({ref:e},d),{},{components:n})):a.createElement(k,i({ref:e},d))}));function k(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=c;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o[s]="string"==typeof t?t:r,i[1]=o;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2841:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var a=n(7462),r=(n(7294),n(3905));const l={},i="Introduction",o={unversionedId:"business/intro",id:"business/intro",title:"Introduction",description:"We offer various high-end commercial versions and customizable technical services to meet the needs of game projects in various scenarios.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/intro.md",sourceDirName:"business",slug:"/business/intro",permalink:"/en/docs/business/intro",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5546\u4e1a\u5316\u7248\u672c",permalink:"/en/docs/business"},next:{title:"Differential Hybrid Execution (DHE)",permalink:"/en/docs/business/differentialhybridexecution"}},p={},u=[{value:"Commercial Versions",id:"commercial-versions",level:2},{value:"Pricing",id:"pricing",level:3},{value:"Enterprise Technical Support",id:"enterprise-technical-support",level:2},{value:"Technical Support Contents",id:"technical-support-contents",level:3},{value:"Pricing",id:"pricing-1",level:3},{value:"Contact Us",id:"contact-us",level:2}],d={toc:u},s="wrapper";function m(t){let{components:e,...n}=t;return(0,r.kt)(s,(0,a.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"We offer various high-end commercial versions and customizable technical services to meet the needs of game projects in various scenarios."),(0,r.kt)("h2",{id:"commercial-versions"},"Commercial Versions"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"All commercial versions will be long-term supported for ",(0,r.kt)("strong",{parentName:"p"},"Unity 2019-2022 LTS")," versions, ensuring long-term stable technical support for projects.")),(0,r.kt)("p",null,"Currently, there are three commercial versions, with specific feature comparisons as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/en/docs/business/pro/intro"},"Professional Edition"),". Significant improvements in ",(0,r.kt)("a",{parentName:"li",href:"./basicoptimization"},"interpreted execution performance")," (numeric instruction performance is ",(0,r.kt)("strong",{parentName:"li"},"280%-735%")," of the community version), optimized metadata memory, support for code encryption, effectively ensuring code security."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/en/docs/business/ultimate/intro"},(0,r.kt)("strong",{parentName:"a"},"Ultimate Edition")),". Includes all features of the Professional Edition, additionally featuring our core ",(0,r.kt)("a",{parentName:"li",href:"./differentialhybridexecution"},"DHE technology"),", greatly improving performance, almost (",(0,r.kt)("strong",{parentName:"li"},"100% when unchanged"),") reaching the same level as native AOT."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/en/docs/business/reload/intro"},"Hot Reload Edition"),". Includes all features of the Professional Edition, and supports unloading and reloading individual assemblies. Currently, it can unload ",(0,r.kt)("strong",{parentName:"li"},"100%")," of the metadata memory of the assembly.")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Feature"),(0,r.kt)("th",{parentName:"tr",align:null},"Community Edition"),(0,r.kt)("th",{parentName:"tr",align:null},"Professional Edition"),(0,r.kt)("th",{parentName:"tr",align:null},"Ultimate Edition"),(0,r.kt)("th",{parentName:"tr",align:null},"Hot Reload Edition"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Interpreted Execution"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MonoBehaviour"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Supplementary Metadata"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Incremental GC"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Unity 2019-2022 LTS"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"../basic/dots"},"DOTS")),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./fullgenericsharing"},"Full Generic Sharing")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/en/docs/business/metadataoptimization"},"Metadata Optimization")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./hotfix"},"Hotfix")),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./assemblyloadoptimization"},"Assembly::Load Loading Time Optimization")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./crashreport"},"Crash Report With Interpreter Stack Trace")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./basicoptimization"},"Standard Interpretation Performance Optimization")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./advancedoptimization"},"Offline Instruction Optimization")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./basicencryption"},"Code Encryption")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"global-metadata.dat encryption"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./reload/hotreloadassembly"},"Hot Reload")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./accesspolicy"},"Access Control Mechanism")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./differentialhybridexecution"},(0,r.kt)("strong",{parentName:"a"},"DHE Technology"))),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2714"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Technical Support"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"1 year"),(0,r.kt)("td",{parentName:"tr",align:null},"2 years"),(0,r.kt)("td",{parentName:"tr",align:null},"2 years")))),(0,r.kt)("h3",{id:"pricing"},"Pricing"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Version"),(0,r.kt)("th",{parentName:"tr",align:null},"Price (RMB)"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Community Edition"),(0,r.kt)("td",{parentName:"tr",align:null},"0"),(0,r.kt)("td",{parentName:"tr",align:null},"Unlimited usage period")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Professional Edition"),(0,r.kt)("td",{parentName:"tr",align:null},"Contact us via email for business inquiry"),(0,r.kt)("td",{parentName:"tr",align:null},"Buy the right to use for one project permanently, includes 1 year of technical support and 1 year of code updates")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Hot Reload Edition"),(0,r.kt)("td",{parentName:"tr",align:null},"Contact us via email for business inquiry"),(0,r.kt)("td",{parentName:"tr",align:null},"Buy the right to use for one project permanently, includes 2 years of technical support and 2 years of code updates")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Ultimate Edition"),(0,r.kt)("td",{parentName:"tr",align:null},"Contact us via email for business inquiry"),(0,r.kt)("td",{parentName:"tr",align:null},"Buy the right to use for one project permanently, includes 2 years of technical support and 2 years of code updates")))),(0,r.kt)("h2",{id:"enterprise-technical-support"},"Enterprise Technical Support"),(0,r.kt)("p",null,"You can flexibly choose the technical service items needed by the enterprise. If subscribed annually, billing will be based on the service items, otherwise, it will be based on the service duration."),(0,r.kt)("h3",{id:"technical-support-contents"},"Technical Support Contents"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Standard response and resolution of bugs, including one-on-one remote assistance and guidance. Most reproducible bugs will be fixed or provided with workarounds within 2-7 days."),(0,r.kt)("li",{parentName:"ul"},"Solve some special platform compatibility issues."),(0,r.kt)("li",{parentName:"ul"},"Support for some currently unsupported versions (excluding versions before 2018)."),(0,r.kt)("li",{parentName:"ul"},"Optimization guidance."),(0,r.kt)("li",{parentName:"ul"},"Other services.")),(0,r.kt)("h3",{id:"pricing-1"},"Pricing"),(0,r.kt)("p",null,"Since HybridCLR is easy to use and stable, most companies do not need long-term technical support. Therefore, only timed technical support services are provided.\nUnused time in a single service can be retained for subsequent use. To save business costs, time-based billing under 2000 RMB ",(0,r.kt)("strong",{parentName:"p"},"does not provide")," contracts and invoices, please understand."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Service Level"),(0,r.kt)("th",{parentName:"tr",align:null},"Scope of Problem Solving"),(0,r.kt)("th",{parentName:"tr",align:null},"Price"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Standard"),(0,r.kt)("td",{parentName:"tr",align:null},"Provides technical support for basic usage questions, excluding bug fixes and implementation of unreleased features"),(0,r.kt)("td",{parentName:"tr",align:null},"100 RMB per hour, billed in 15-minute increments (e.g., 15 minutes, 2 hours)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Expert"),(0,r.kt)("td",{parentName:"tr",align:null},"Solves complex problems, including bug fixes"),(0,r.kt)("td",{parentName:"tr",align:null},"1500 RMB per hour, billed in 30-minute increments (e.g., 30 minutes, 2 hours)")))),(0,r.kt)("h2",{id:"contact-us"},"Contact Us"),(0,r.kt)("p",null,"Please use your company's ",(0,r.kt)("strong",{parentName:"p"},"corporate email")," to email ",(0,r.kt)("inlineCode",{parentName:"p"},"business@code-philosophy.com")," for inquiries. Emails initiated by personal email accounts such as QQ or 126 will be ignored, please understand."))}m.isMDXComponent=!0}}]);