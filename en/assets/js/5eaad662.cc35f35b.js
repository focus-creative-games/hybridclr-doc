"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1175],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(r),d=o,m=u["".concat(l,".").concat(d)]||u[d]||h[d]||i;return r?n.createElement(m,a(a({ref:t},p),{},{components:r})):n.createElement(m,a({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:o,a[1]=c;for(var s=2;s<i;s++)a[s]=r[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5856:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var n=r(7462),o=(r(7294),r(3905));const i={},a="HybridCLR code structure and version",c={unversionedId:"basic/architecture",id:"basic/architecture",title:"HybridCLR code structure and version",description:"The complete HybridCLR code consists of three repositories:",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/basic/architecture.md",sourceDirName:"basic",slug:"/basic/architecture",permalink:"/en/docs/basic/architecture",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Supported Unity versions and platforms",permalink:"/en/docs/basic/supportedplatformanduniyversion"},next:{title:"Install HybridCLR",permalink:"/en/docs/basic/install"}},l={},s=[{value:"com.code-philosophy.hybridclr",id:"comcode-philosophyhybridclr",level:2}],p={toc:s},u="wrapper";function h(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"hybridclr-code-structure-and-version"},"HybridCLR code structure and version"),(0,o.kt)("p",null,"The complete HybridCLR code consists of three repositories:"),(0,o.kt)("p",null,"-il2cpp_plus"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"hybridclr"),(0,o.kt)("li",{parentName:"ul"},"com.code-philosophy.hybridclr")),(0,o.kt)("p",null,"These three warehouses have independent version numbers, so when talking about the HybridCLR version, these three version numbers are generally included."),(0,o.kt)("p",null,"##il2cpp_plus"),(0,o.kt)("p",null,"Warehouse address ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/il2cpp_plus"},"github")," ",(0,o.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/il2cpp_plus"},"gitee"),"."),(0,o.kt)("p",null,"When HybridCLR extends il2cpp to run, it needs to make some adjustments to the original il2cpp code to support the hybrid running mode. This part of the code corresponds to the il2cpp_plus repository. Since each major version of il2cpp changes greatly, each major version of Unity needs to be individually adapted."),(0,o.kt)("p",null,"Each annual release corresponds to a ",(0,o.kt)("inlineCode",{parentName:"p"},"{version}-main")," master branch, such as ",(0,o.kt)("inlineCode",{parentName:"p"},"2021-main"),"."),(0,o.kt)("p",null,"Each current annual version also has an old 1.0 branch ",(0,o.kt)("inlineCode",{parentName:"p"},"{version}-1.0"),", such as ",(0,o.kt)("inlineCode",{parentName:"p"},"2019-1.0"),"."),(0,o.kt)("p",null,"##hybridclr"),(0,o.kt)("p",null,"Warehouse address ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr"},"github")," ",(0,o.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/hybridclr"},"gitee")),(0,o.kt)("p",null,"The hybridclr warehouse contains the core code of the interpreter. All il2cpp_plus sharing the same set of hybridclr codes, regardless of the major version of Unity. There are currently two branches:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"main"),(0,o.kt)("li",{parentName:"ul"},"1.0")),(0,o.kt)("h2",{id:"comcode-philosophyhybridclr"},"com.code-philosophy.hybridclr"),(0,o.kt)("p",null,"Warehouse address ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/hybridclr_unity"},"github")," ",(0,o.kt)("a",{parentName:"p",href:"https://gitee.com/focus-creative-games/hybridclr_unity"},"gitee")),(0,o.kt)("p",null,"com.code-philosophy.hybridclr is a Unity Package that contains some runtime code and editor workflow tools needed to use HybridCLR."),(0,o.kt)("p",null,"com.code-philosophy.hybridclr does not distinguish between major versions of Unity, so like hybridclr, there are currently two branches:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"main"),(0,o.kt)("li",{parentName:"ul"},"1.0")),(0,o.kt)("p",null,"In earlier versions (such as the 1.0 branch), you need to specify the branch of il2cpp_plus and hybridclr you want to install in the Installer. The branches of the two repositories must match,\nThat is, ",(0,o.kt)("inlineCode",{parentName:"p"},"{version}-main")," of il2cpp_plus matches ",(0,o.kt)("inlineCode",{parentName:"p"},"main")," of hybridclr, and ",(0,o.kt)("inlineCode",{parentName:"p"},"{version}-1.0")," matches ",(0,o.kt)("inlineCode",{parentName:"p"},"1.0"),"."),(0,o.kt)("p",null,"Since the ",(0,o.kt)("inlineCode",{parentName:"p"},"v2.0.0-rc")," version (belonging to the main branch), com.code-philosophy.hybridclr is directly configured with the version numbers of the compatible il2cpp_plus and hybridclr warehouses. For developers,\nJust install the appropriate version of com.code-philosophy.hybridclr."))}h.isMDXComponent=!0}}]);