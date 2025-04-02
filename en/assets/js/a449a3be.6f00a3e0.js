"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2752],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),l=u(r),m=a,f=l["".concat(p,".").concat(m)]||l[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[l]="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3656:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const o={},i="Unsupported Features",s={unversionedId:"basic/notsupportedfeatures",id:"version-7.8.1/basic/notsupportedfeatures",title:"Unsupported Features",description:"Features that are not in the restrictions are supported by HybridCLR, please don't ask if HybridCLR supports a certain feature.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-7.8.1/basic/notsupportedfeatures.md",sourceDirName:"basic",slug:"/basic/notsupportedfeatures",permalink:"/en/docs/7.8.1/basic/notsupportedfeatures",draft:!1,tags:[],version:"7.8.1",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Impact on App Memory",permalink:"/en/docs/7.8.1/basic/impactonappmemory"},next:{title:"Hybridclr Package",permalink:"/en/docs/7.8.1/basic/com.code-philosophy.hybridclr"}},p={},u=[],c={toc:u},l="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(l,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"unsupported-features"},"Unsupported Features"),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Features that are not in the restrictions are supported by HybridCLR, please don't ask if HybridCLR supports a certain feature.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Temporarily does not support defining extern functions in hot update scripts, but you can call extern functions in AOT."),(0,a.kt)("li",{parentName:"ul"},"Fully supports the dots technology of 2022, but cannot take advantage of burst acceleration. If the burst part is in the AOT, it is still executed natively; if the burst part is in the hot update part, although the jobs are executed concurrently, they are executed in an interpreted manner."),(0,a.kt)("li",{parentName:"ul"},"Functions that serialize structures such as ",(0,a.kt)("inlineCode",{parentName:"li"},"Marshal.StructureToPtr")," in ",(0,a.kt)("inlineCode",{parentName:"li"},"System.Runtime.InteropServices.Marshal")," are not supported, but ordinary Marshal functions such as ",(0,a.kt)("inlineCode",{parentName:"li"},"Marshal.PtrToStringAnsi")," can work normally."),(0,a.kt)("li",{parentName:"ul"},"[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.xxx)]"," is not supported. It's purely a matter of timing. Unity collects these functions very early, before the hot update dll is loaded. A recommended way is that you use reflection to collect these functions and call them actively at the right time."),(0,a.kt)("li",{parentName:"ul"},"Does not support C# level debugging of the interpreted code part, because there is no time to write a debugger"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"RequireComponent(typeof(AAA))")," requires that AAA must have been instantiated or AddComponent in other resources, otherwise Unity will not recognize AAA as a script and ignore the processing.")))}d.isMDXComponent=!0}}]);