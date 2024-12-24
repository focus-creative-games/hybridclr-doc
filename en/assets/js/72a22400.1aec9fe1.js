"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6410],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>p});var i=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=i.createContext({}),u=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=u(e.components);return i.createElement(l.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),m=u(n),f=o,p=m["".concat(l,".").concat(f)]||m[f]||d[f]||a;return n?i.createElement(p,s(s({ref:t},c),{},{components:n})):i.createElement(p,s({ref:t},c))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=f;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r[m]="string"==typeof e?e:o,s[1]=r;for(var u=2;u<a;u++)s[u]=n[u];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}f.displayName="MDXCreateElement"},690:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>r,toc:()=>u});var i=n(7462),o=(n(7294),n(3905));const a={},s="Hotfix",r={unversionedId:"business/hotfix",id:"business/hotfix",title:"Hotfix",description:"Some updates merely consist of a few lines of bug code fixes, and some projects may wish to dynamically repair these directly during the game's running process, instead of forcing players to restart the current game App.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/hotfix.md",sourceDirName:"business",slug:"/business/hotfix",permalink:"/en/docs/business/hotfix",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Metadata Optimization",permalink:"/en/docs/business/metadataoptimization"},next:{title:"Assembly::Load Loading Time Optimization",permalink:"/en/docs/business/assemblyloadoptimization"}},l={},u=[{value:"Advantages",id:"advantages",level:2},{value:"Limitations and Defects",id:"limitations-and-defects",level:2},{value:"Usage",id:"usage",level:2}],c={toc:u},m="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"hotfix"},"Hotfix"),(0,o.kt)("p",null,"Some updates merely consist of a few lines of bug code fixes, and some projects may wish to dynamically repair these directly during the game's running process, instead of forcing players to restart the current game App.\nCurrently, versions other than the ",(0,o.kt)("a",{parentName:"p",href:"./reload/intro"},"hot reload version")," do not support reloading hot update assemblies.\nEven the hot loading version, because it supports completely uninstalling an assembly and reloading a completely new assembly, has many ",(0,o.kt)("a",{parentName:"p",href:"./reload/hotreloadassembly#Unsupported_features_and_special_requirements"},"restrictions and requirements"),",\nwhich is highly intrusive to business code."),(0,o.kt)("p",null,"Hotfix technology is specifically designed to solve such occasions for dynamically fixing bugs. It can fix bugs in hot update modules in an unnoticeable way during runtime, and it is non-intrusive to business code."),(0,o.kt)("h2",{id:"advantages"},"Advantages"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Dynamically fix code bugs without needing to restart the game App"),(0,o.kt)("li",{parentName:"ul"},"Can fix any code in hot update assemblies (including flagship version DHE assemblies), including static member functions, generic functions, asynchronous functions, etc."),(0,o.kt)("li",{parentName:"ul"},"Easy to use, non-intrusive to business code, no need to modify any business code"),(0,o.kt)("li",{parentName:"ul"},"No limit on the number of fixes, multiple fixes can be made during app runtime. For example, after publishing version v1 and fixing, if other bugs are found, then publish version v2 for the fix")),(0,o.kt)("h2",{id:"limitations-and-defects"},"Limitations and Defects"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Can only fix the function body, cannot modify type definitions (such as changing class names, adding or deleting fields, adding or deleting functions, modifying function signatures, etc.)"),(0,o.kt)("li",{parentName:"ul"},"Each fix will load a hot update assembly, and the memory of the previously loaded assembly cannot be released, causing some memory leaks")),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"Call the ",(0,o.kt)("inlineCode",{parentName:"p"},"RuntimeApi::HotfixAssembly")," function to complete the hotfix, example code is as follows."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},'\npublic static void ApplyHotfix()\n{\n    byte[] hotfixDllBytes = LoadFromXXX("Hotfix");\n    var hotfixTypes = new List<HotfixType>\n    {\n        // The full name of the class to be fixed, including the namespace (if any)\n        name = "TestHotfixMethods",\n        // The list of methods to be fixed\n        methods = new List<HotfixMethod>\n        {\n            new HotfixMethod\n            {\n                // Fix by function name, if there are multiple functions with the same name, all will be fixed\n                name = "Foo1",\n            },\n            new HotfixMethod\n            {\n                // Fix by function signature. Only one of name and signature should be provided, otherwise an error will occur\n                signature = "Int32 Foo2(Int32, Int32)",\n            },\n        }\n    };\n}\n')),(0,o.kt)("p",null,"When there are many dlls and functions that need to be fixed, this operation is tedious and prone to errors. It is recommended to first create a hotfix.manifest.xml configuration file, then convert it to the HotfixManifest class, and then use RuntimeApi.HotfixAssemblies to fix all at once, the code is similar to the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},'\npublic static void ApplyHotfix()\n{\n    string hotfixXmlStr = @"\n<manifest>\n    <assembly fullname=""Hotfix"">\n        <type fullname=""TestHotfixMethods"">\n            <method name=""Foo1"" />\n            <method signature=""Int32 Foo2(Int32, Int32)"" />\n            <method name=""Bar1"" />\n            <method signature=""Int32 Bar2(Int32, Int32)"" />\n        </type>\n        <type fullname=""TestHotfixCtors"">\n            <method name="".ctor"" />\n            <method signature="".ctor(Int32)"" />\n        </type>\n        <type fullname=""TestHotfixStaticCtors"">\n            <method name="".cctor"" />\n        </type>\n        <type fullname=""TestHotfixGenericClass`1"">\n            <method name=""Foo1"" />\n            <method name=""Foo2"" />\n        </type>\n        <type fullname=""TestHotfixGenericMethods"">\n            <method name=""Foo1"" />\n        </type>\n    </assembly>\n</manifest>\n";\n\n    RuntimeApi.HotfixAssemblies(HotfixManifest.LoadFrom(s_fixXmlStr, assName => LoadDll.GetDllBytes(assName + ".dll")));\n}\n\n')))}d.isMDXComponent=!0}}]);