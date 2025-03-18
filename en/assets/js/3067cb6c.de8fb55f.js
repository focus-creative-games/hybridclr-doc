"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9511],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>c});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var o=n.createContext({}),d=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=d(e.components);return n.createElement(o.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=d(a),h=i,c=p["".concat(o,".").concat(h)]||p[h]||u[h]||r;return a?n.createElement(c,l(l({ref:t},m),{},{components:a})):n.createElement(c,l({ref:t},m))}));function c(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,l=new Array(r);l[0]=h;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[p]="string"==typeof e?e:i,l[1]=s;for(var d=2;d<r;d++)l[d]=a[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},8801:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var n=a(7462),i=(a(7294),a(3905));const r={},l="Loading Hot-Update Assemblies",s={unversionedId:"business/ultimate/loadassembly",id:"business/ultimate/loadassembly",title:"Loading Hot-Update Assemblies",description:"The flagship version, compared to the community and professional versions, includes DHE assemblies. Since DHE assemblies require additional parameters to indicate how the runtime should dynamically select to execute the original AOT code or the hot-update code, they cannot be loaded using the Assembly.Load interface. Therefore, special loading rules are required.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/ultimate/loadassembly.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/loadassembly",permalink:"/en/docs/business/ultimate/loadassembly",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Building and Hot Updating",permalink:"/en/docs/business/ultimate/build"},next:{title:"MetaVersion Workflow",permalink:"/en/docs/business/ultimate/metaversionworkflow"}},o={},d=[{value:"Supported Assembly Types",id:"supported-assembly-types",level:2},{value:"Loading Order",id:"loading-order",level:2},{value:"Loading DHE Assemblies",id:"loading-dhe-assemblies",level:2},{value:"<code>LoadDifferentialHybridAssemblyWithDHAO</code>",id:"loaddifferentialhybridassemblywithdhao",level:2},{value:"<code>LoadDifferentialHybridAssemblyWithMetaVersion</code>",id:"loaddifferentialhybridassemblywithmetaversion",level:2}],m={toc:d},p="wrapper";function u(e){let{components:t,...a}=e;return(0,i.kt)(p,(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"loading-hot-update-assemblies"},"Loading Hot-Update Assemblies"),(0,i.kt)("p",null,"The flagship version, compared to the community and professional versions, includes DHE assemblies. Since DHE assemblies require additional parameters to indicate how the runtime should dynamically select to execute the original AOT code or the hot-update code, they cannot be loaded using the ",(0,i.kt)("inlineCode",{parentName:"p"},"Assembly.Load")," interface. Therefore, special loading rules are required."),(0,i.kt)("h2",{id:"supported-assembly-types"},"Supported Assembly Types"),(0,i.kt)("p",null,"The flagship version is a superset of the community and professional versions. It supports loading both regular interpreted hot-update assemblies and DHE assemblies. If no DHE assemblies are configured, the flagship version degrades to the professional version (or can be considered a faster-running community version)."),(0,i.kt)("h2",{id:"loading-order"},"Loading Order"),(0,i.kt)("p",null,"The flagship version uses the same dependency loading rules as the community version. That is, if Assembly B depends on Assembly A, Assembly A must be loaded before Assembly B."),(0,i.kt)("p",null,"Since DHE assemblies are compiled into AOT, they cannot depend on hot-update assemblies; otherwise, errors will occur during packaging. We have added dependency checks in ",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR.Editor.BuildProcessors.CheckSettings")," to detect errors in advance."),(0,i.kt)("p",null,"Given this characteristic, a relatively simple approach is to load all DHE assemblies in order first, followed by loading regular hot-update assemblies in order."),(0,i.kt)("h2",{id:"loading-dhe-assemblies"},"Loading DHE Assemblies"),(0,i.kt)("p",null,"The RuntimeApi provides three interfaces for loading DHE assemblies:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"LoadOriginalDifferentialHybridAssembly")," is used to load DHE assemblies that have not changed at all."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"LoadDifferentialHybridAssemblyWithDHAO")," is used to load DHE assemblies that have not changed or have changed, using a dhao file."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"LoadDifferentialHybridAssemblyWithMetaVersion")," is used to load DHE assemblies that have not changed or have changed, using a meta version file.")),(0,i.kt)("p",null,"When it is clear that there are no changes, the ",(0,i.kt)("inlineCode",{parentName:"p"},"LoadOriginalDifferentialHybridAssembly")," interface can be called to indicate the use of the original DHE assembly directly. Only the assembly name needs to be passed, without the need to pass the original DHE assembly data, as the AOT already contains the complete information of the original DHE assembly."),(0,i.kt)("p",null,"Regardless of whether there are changes or not, the ",(0,i.kt)("inlineCode",{parentName:"p"},"LoadDifferentialHybridAssemblyWithXxx")," interfaces can be used to load DHE assemblies."),(0,i.kt)("p",null,"There are some restrictions when calling ",(0,i.kt)("inlineCode",{parentName:"p"},"LoadOriginalDifferentialHybridAssembly"),":"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"The DHE assemblies it depends on must also be loaded using ",(0,i.kt)("inlineCode",{parentName:"p"},"LoadOriginalDifferentialHybridAssembly"),", i.e., Original loading dependency.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"AOT generic instantiation issues"),(0,i.kt)("p",{parentName:"li"},"DHE assemblies loaded with this interface are equivalent to regular AOT assemblies. If other hot-update assemblies use generics from this DHE assembly, and the Unity version is less than 2021 or equal to 2021 but with the ",(0,i.kt)("inlineCode",{parentName:"p"},"Il2Cpp Code Generation")," option enabled, there will be AOT generic instantiation issues.\nAlthough this issue can be resolved by supplementing metadata, a better approach is to switch to loading with ",(0,i.kt)("inlineCode",{parentName:"p"},"LoadOriginalDifferentialHybridAssembly"),"."))),(0,i.kt)("p",null,"In actual projects, there may be many DHE assemblies, and it is difficult to determine which interface should be used to load each DHE assembly. Even determining whether an assembly has changed is not an easy task. We recommend using the following simple rules:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"After the main package is released and no hot-update has occurred, use ",(0,i.kt)("inlineCode",{parentName:"li"},"LoadOriginalDifferentialHybridAssembly")," to load all DHE assemblies."),(0,i.kt)("li",{parentName:"ul"},"After a hot-update is released, regardless of whether there are changes or not, use ",(0,i.kt)("inlineCode",{parentName:"li"},"LoadDifferentialHybridAssemblyWithXxx")," to load DHE assemblies.")),(0,i.kt)("h2",{id:"loaddifferentialhybridassemblywithdhao"},(0,i.kt)("inlineCode",{parentName:"h2"},"LoadDifferentialHybridAssemblyWithDHAO")),(0,i.kt)("p",null,"The function has the following parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"currentDllBytes")),(0,i.kt)("td",{parentName:"tr",align:null},"The file content of the latest DHE assembly")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"currentDllSymbolBytes")),(0,i.kt)("td",{parentName:"tr",align:null},"The pdb file content of the latest DHE assembly. This parameter can be ",(0,i.kt)("inlineCode",{parentName:"td"},"null"),".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"dhaoBytes")),(0,i.kt)("td",{parentName:"tr",align:null},"The content of the dhao file generated using the latest DHE assembly")))),(0,i.kt)("h2",{id:"loaddifferentialhybridassemblywithmetaversion"},(0,i.kt)("inlineCode",{parentName:"h2"},"LoadDifferentialHybridAssemblyWithMetaVersion")),(0,i.kt)("p",null,"The function has the following parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"currentDllBytes")),(0,i.kt)("td",{parentName:"tr",align:null},"The file content of the latest DHE assembly")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"currentDllSymbolBytes")),(0,i.kt)("td",{parentName:"tr",align:null},"The pdb file content of the latest DHE assembly. This parameter can be ",(0,i.kt)("inlineCode",{parentName:"td"},"null"),".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"originalMetaVersionFileBytes")),(0,i.kt)("td",{parentName:"tr",align:null},"The content of the original DHE assembly's meta version file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"currentMetaVersionFileBytes")),(0,i.kt)("td",{parentName:"tr",align:null},"The content of the latest DHE assembly's meta version file")))),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"originalMetaVersionFileBytes")," is fully determined at the time of main package build and corresponds one-to-one with that package. We strongly recommend including it in the StreamingAssets directory and shipping it with the package."))}u.isMDXComponent=!0}}]);