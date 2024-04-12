"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6690],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>b});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=o,b=u["".concat(s,".").concat(m)]||u[m]||p[m]||r;return n?a.createElement(b,l(l({ref:t},d),{},{components:n})):a.createElement(b,l({ref:t},d))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,l=new Array(r);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var c=2;c<r;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5702:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const r={},l="Hot Reload Technology",i={unversionedId:"business/reload/hotreloadassembly",id:"business/reload/hotreloadassembly",title:"Hot Reload Technology",description:"Hot reload technology is used to completely unload or reload an assembly, suitable for small game collections. This solution is only available in the commercial version.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/reload/hotreloadassembly.md",sourceDirName:"business/reload",slug:"/business/reload/hotreloadassembly",permalink:"/en/docs/business/reload/hotreloadassembly",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Quick Start",permalink:"/en/docs/business/reload/quickstart"},next:{title:"Free Trial",permalink:"/en/docs/business/reload/freetrial"}},s={},c=[{value:"Supported Features",id:"supported-features",level:2},{value:"Unsupported Features and Special Requirements",id:"unsupported-features-and-special-requirements",level:2},{value:"Incompatible Libraries",id:"incompatible-libraries",level:2},{value:"Resolving References to Unloaded Objects",id:"resolving-references-to-unloaded-objects",level:2}],d={toc:c},u="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"hot-reload-technology"},"Hot Reload Technology"),(0,o.kt)("p",null,"Hot reload technology is used to completely unload or reload an assembly, suitable for small game collections. This solution is only available in the ",(0,o.kt)("strong",{parentName:"p"},"commercial version"),"."),(0,o.kt)("h2",{id:"supported-features"},"Supported Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Supports unloading assemblies, freeing up 100% of the memory occupied by the assembly."),(0,o.kt)("li",{parentName:"ul"},"Supports reloading assemblies, allowing code to change arbitrarily or even be completely different (with certain limitations on MonoBehaviour and Scriptable)."),(0,o.kt)("li",{parentName:"ul"},"Supports ",(0,o.kt)("strong",{parentName:"li"},"restricting the set of functions that can be accessed in hot-updated assemblies"),", suitable for creating sandbox environments in UGC games to prevent malicious player code from causing damage.")),(0,o.kt)("h2",{id:"unsupported-features-and-special-requirements"},"Unsupported Features and Special Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Business code must stop using objects or functions from the unloaded assembly and exit all old logic being executed."),(0,o.kt)("li",{parentName:"ul"},"Cannot directly unload dependent assemblies; dependencies must be unloaded first in reverse dependency order before unloading the dependent assemblies. For example, if A.dll depends on B.dll, then A.dll must be unloaded first before unloading B.dll."),(0,o.kt)("li",{parentName:"ul"},"MonoBehaviour and ScriptableObject related:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Events or message functions in reloaded MonoBehaviours such as Awake, OnEnable, etc., should not be added or removed (but the function body can change)."),(0,o.kt)("li",{parentName:"ul"},"After reloading, the serialized field names of the same-named script classes in the old assembly must not change (but the types can change)."),(0,o.kt)("li",{parentName:"ul"},"Cannot inherit generic types, such as ",(0,o.kt)("inlineCode",{parentName:"li"},"class MyScript: CommonScript<int>"),"."))),(0,o.kt)("li",{parentName:"ul"},"Some libraries that cache reflection information (this behavior is most common in serialization-related libraries like LitJson) need to clear the cached reflection information after hot reload."),(0,o.kt)("li",{parentName:"ul"},"Does not support destructors, ~XXX(). Also, does not allow instantiating generic classes with destructor functions that belong to the generic parameters of this assembly."),(0,o.kt)("li",{parentName:"ul"},"Not compatible with DOTS. Due to DOTS caching a large amount of type information and its complex implementation, it is difficult to clean up cached information separately.")),(0,o.kt)("h2",{id:"incompatible-libraries"},"Incompatible Libraries"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Jobs in 2022 cache type-related information and require minor ",(0,o.kt)("a",{parentName:"li",href:"/en/docs/business/reload/modifydll"},"modifications to UnityEngine.CoreModule.dll")," code. Versions earlier than 2022 do not require modifications."),(0,o.kt)("li",{parentName:"ul"},"Deserialization libraries like LitJson cache reflection information and need to clear the cached reflection information in the library after hot reload. The specific operation depends on the implementation of the library.")),(0,o.kt)("h2",{id:"resolving-references-to-unloaded-objects"},"Resolving References to Unloaded Objects"),(0,o.kt)("p",null,"Hot reload technology requires that metadata of unloaded assembly U cannot be held in the assembly or global memory that has not been unloaded. This includes, but is not limited to:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Instances of types in the unloaded assembly"),(0,o.kt)("li",{parentName:"ul"},"Generic parameters of generic classes or functions that include types from the unloaded assembly"),(0,o.kt)("li",{parentName:"ul"},"Reflection information related to the unloaded assembly, such as Assembly, Type, MethodInfo, PropertyInfo, etc."),(0,o.kt)("li",{parentName:"ul"},"Delegates pointing to functions in the unloaded assembly"),(0,o.kt)("li",{parentName:"ul"},"Tasks defined in the unloaded assembly"),(0,o.kt)("li",{parentName:"ul"},"Others")),(0,o.kt)("p",null,"Real-world projects can be complex, and it is difficult and impractical for developers to find all illegal references. We have implemented illegal reference checks, and when calling ",(0,o.kt)("inlineCode",{parentName:"p"},"RuntimeApi.UnloadAssembly"),", logs of all illegal references will be printed. Developers can clear all illegal references based on the printed logs."),(0,o.kt)("p",null,"Since illegal reference checks traverse all live objects, they are time-consuming. Therefore, this check is only enabled when the Il2Cpp compilation option is Debug, and it is disabled in Release mode. You can use ",(0,o.kt)("inlineCode",{parentName:"p"},"RuntimeApi.EnableLiveObjectValidation(true)")," to forcibly enable this check in Release compilation mode."))}p.isMDXComponent=!0}}]);