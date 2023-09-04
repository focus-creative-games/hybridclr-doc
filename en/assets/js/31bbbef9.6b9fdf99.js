"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3134],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=c(n),h=r,m=u["".concat(l,".").concat(h)]||u[h]||p[h]||i;return n?o.createElement(m,a(a({ref:t},d),{},{components:n})):o.createElement(m,a({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},8670:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var o=n(7462),r=(n(7294),n(3905));const i={},a="MonoBehaviour Support",s={unversionedId:"basic/monobehaviour",id:"basic/monobehaviour",title:"MonoBehaviour Support",description:"HybridCLR fully supports the hot update MonoBehaviour and ScriptableObject workflow, that is, you can add a hot update script on the GameObject in the code or mount it directly on the resource.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/basic/monobehaviour.md",sourceDirName:"basic",slug:"/basic/monobehaviour",permalink:"/en/docs/basic/monobehaviour",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Code Stripping",permalink:"/en/docs/basic/codestriping"},next:{title:"AOT generic problem",permalink:"/en/docs/basic/aotgeneric"}},l={},c=[{value:"Used through code",id:"used-through-code",level:2},{value:"Mount MonoBehaviour on the resource or create a ScriptableObject type resource",id:"mount-monobehaviour-on-the-resource-or-create-a-scriptableobject-type-resource",level:2},{value:"assembly list file",id:"assembly-list-file",level:2},{value:"Known issues",id:"known-issues",level:2},{value:"GameObject.GetComponent(string name) interface cannot get component",id:"gameobjectgetcomponentstring-name-interface-cannot-get-component",level:3},{value:"Others",id:"others",level:2}],d={toc:c},u="wrapper";function p(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"monobehaviour-support"},"MonoBehaviour Support"),(0,r.kt)("p",null,"HybridCLR fully supports the hot update MonoBehaviour and ScriptableObject workflow, that is, you can add a hot update script on the GameObject in the code or mount it directly on the resource.\nHot update script. However, due to the particularity of Unity's resource management mechanism, mounting hot update scripts on resources requires some special processing in the packaging workflow."),(0,r.kt)("h2",{id:"used-through-code"},"Used through code"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"AddComponent<T>()")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"AddComponent(Type type)")," is fully supported at all times. Just load the hot update dll into the runtime through Assembly.Load in advance\nJust within."),(0,r.kt)("h2",{id:"mount-monobehaviour-on-the-resource-or-create-a-scriptableobject-type-resource"},"Mount MonoBehaviour on the resource or create a ScriptableObject type resource"),(0,r.kt)("p",null,"When the Unity resource management system deserializes hot update scripts in resources, it needs to meet the following conditions:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"The dll where the script is located has been loaded into the runtime"),(0,r.kt)("li",{parentName:"ol"},"It must be a resource packaged using AssetBundle (",(0,r.kt)("strong",{parentName:"li"},"addressable and other frameworks that indirectly use ab can also"),")"),(0,r.kt)("li",{parentName:"ol"},"The dll where the script is located must be added to the assembly list file generated during packaging. This list file is loaded when Unity starts and is immutable data. The list file names and formats of different versions of Unity are different.")),(0,r.kt)("p",null,"If no processing is done on the packaging process, since the hot update dll has been removed in the ",(0,r.kt)("inlineCode",{parentName:"p"},"IFilterBuildAssemblies")," callback, it will definitely not appear in the assembly list file.\nSince condition 3 is not met, the hot update script mounted in the hot update resource cannot be restored, and a ",(0,r.kt)("inlineCode",{parentName:"p"},"Scripting Missing")," error will occur during runtime."),(0,r.kt)("p",null,"Therefore, we have made special processing in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Editor/BuildProcessors/PatchScriptingAssemblyList.cs")," script, adding the hot update dll to the assembly list file.\nYou need to add the hot update assembly in the project to the HotUpdateAssemblyDefinitions or HotUpdateAssemblies field in the HybridCLRSettings configuration."),(0,r.kt)("p",null,"It only restricts hot update resources to be packaged in the form of ab package, and there is no limit to the way hot update dll is packaged. You can freely choose the hot update method according to the project requirements**, you can package the dll into ab, or bare data\nfiles, or encrypted compression, etc. As long as it can be guaranteed to use Assembly.Load to load the hot update resource before loading it."),(0,r.kt)("h2",{id:"assembly-list-file"},"assembly list file"),(0,r.kt)("p",null,"The names and formats of the assembly list files are different in different Unity versions."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"2019 version. It is a globalgamemanagers file when uncompressed and packaged. When compressed and packaged, it is first saved to the globalgamemanagers file, and then packaged into the data.unity3d file in BundleFile format and other files."),(0,r.kt)("li",{parentName:"ul"},"2020-2021 version. Saved in the ScriptingAssembles.json file.")),(0,r.kt)("h2",{id:"known-issues"},"Known issues"),(0,r.kt)("h3",{id:"gameobjectgetcomponentstring-name-interface-cannot-get-component"},"GameObject.GetComponent(string name) interface cannot get component"),(0,r.kt)("p",null,"This is a known bug, which is related to the code implementation of unity. This problem occurs only when the hot update script is mounted on the hot update resource. The hot update script added through AddComponent in the code can be found by this method. If you encounter this problem please use ",(0,r.kt)("inlineCode",{parentName:"p"},"GameObject.GetComponent<T>()")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"GameObject.GetComponent(typeof(T))")," instead"),(0,r.kt)("h2",{id:"others"},"Others"),(0,r.kt)("p",null,"Do not modify the name of the dll where the script that needs to be linked to the resource is online, because the assembly list file cannot be modified after it is packaged."),(0,r.kt)("p",null,"It is recommended not to disable TypeTree when typing AB, otherwise the normal AB loading method will fail. (The reason is that for scripts that disable TypeTree, Unity will verify the signature of the script in order to prevent the binary mismatch from causing process crash during the deserialization of MonoBehaviour. The content of the signature is the Hash generated by the script FullName and TypeTree data, but because we The hot update script information does not exist in the packaged installation package, so the verification will definitely fail)"),(0,r.kt)("p",null,"If TypeTree must be disabled, a workaround is to disable the Hash verification of the script. In this case, the user must ensure that the code is consistent with the resource version when packaging, otherwise it may cause Crash, sample code"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"     AssetBundleCreateRequest req = AssetBundle. LoadFromFileAsync(path);\n     req.SetEnableCompatibilityChecks(false); // Non-public, needs to be called by reflection\n")))}p.isMDXComponent=!0}}]);