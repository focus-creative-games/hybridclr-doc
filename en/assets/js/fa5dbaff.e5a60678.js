"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2241],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),h=r,m=p["".concat(l,".").concat(h)]||p[h]||d[h]||o;return n?a.createElement(m,i(i({ref:t},u),{},{components:n})):a.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1056:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const o={},i="Load and use hot update code",s={unversionedId:"basic/runhotupdatecodes",id:"basic/runhotupdatecodes",title:"Load and use hot update code",description:"Load assembly",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/basic/runhotupdatecodes.md",sourceDirName:"basic",slug:"/basic/runhotupdatecodes",permalink:"/en/docs/basic/runhotupdatecodes",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Create and configure hot update assembly",permalink:"/en/docs/basic/hotupdateassemblysetting"},next:{title:"HybridCLR packaging workflow",permalink:"/en/docs/basic/buildpipeline"}},l={},c=[{value:"Load assembly",id:"load-assembly",level:2},{value:"Run the hot update function directly through reflection",id:"run-the-hot-update-function-directly-through-reflection",level:2},{value:"Run after creating a Delegate through reflection",id:"run-after-creating-a-delegate-through-reflection",level:2},{value:"After creating the object through reflection, call the interface function",id:"after-creating-the-object-through-reflection-call-the-interface-function",level:2},{value:"Run script code through dynamic AddComponent",id:"run-script-code-through-dynamic-addcomponent",level:2},{value:"Restore the mounted hot update script from the prefab or scene packaged into assetbundle by initializing",id:"restore-the-mounted-hot-update-script-from-the-prefab-or-scene-packaged-into-assetbundle-by-initializing",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"load-and-use-hot-update-code"},"Load and use hot update code"),(0,r.kt)("h2",{id:"load-assembly"},"Load assembly"),(0,r.kt)("p",null,"According to your project resource management method, get the bytes data of the hot update dll. Then call Assembly.Load(byte[] assemblyData) directly. code like\nas follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"     byte[] assemblyData = xxxx; // Get hot update dll data from your resource management system\n     Assembly ass = Assembly. Load(assemblyData);\n")),(0,r.kt)("p",null,"If there are multiple hot update dlls, please be sure to ",(0,r.kt)("strong",{parentName:"p"},"load them in the order of dependencies"),", and load the dependent assembly first."),(0,r.kt)("p",null,"After loading the hot update dll, there are many ways to run the hot update code, and these techniques are exactly the same as when hot update is not considered."),(0,r.kt)("h2",{id:"run-the-hot-update-function-directly-through-reflection"},"Run the hot update function directly through reflection"),(0,r.kt)("p",null,"Suppose there is a HotUpdateEntry class in the hot update set, the main entry is a static Main function, and the code is similar:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'class HotUpdateEntry\n{\n     public static void Main()\n     {\n         UnityEngine.Debug.Log("hello, HybridCLR");\n     }\n}\n')),(0,r.kt)("p",null,"You run it like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'     // ass is the hot update assembly returned by Assembly.Load.\n     // You can also find it through code similar to the following after Assembly.Load.\n     // Assembly ass = AppDomain.CurrentDomain.GetAssemblies().First(assembly => assembly.GetName().Name == "Your-HotUpdate-Assembly");\n     Type entryType = ass. GetType("HotUpdateEntry");\n     MethodInfo method = entryType. GetMethod("Main");\n     method.Invoke(null, null);\n')),(0,r.kt)("h2",{id:"run-after-creating-a-delegate-through-reflection"},"Run after creating a Delegate through reflection"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'     Type entryType = ass. GetType("HotUpdateEntry");\n     MethodInfo method = entryType. GetMethod("Main");\n     Action mainFunc = (Action)Delegate.CreateDelegate(typeof(Action), method);\n     mainFunc();\n')),(0,r.kt)("h2",{id:"after-creating-the-object-through-reflection-call-the-interface-function"},"After creating the object through reflection, call the interface function"),(0,r.kt)("p",null,"Suppose there is such an interface in AOT"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public interface IEntry\n{\n     void Start();\n}\n")),(0,r.kt)("p",null,"Such a class is implemented in hot update"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'class HotUpdateEntry : IEntry\n{\n     public void Start()\n     {\n         UnityEngine.Debug.Log("hello, HybridCLR");\n     }\n}\n')),(0,r.kt)("p",null,"You run it like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'     Type entryType = ass. GetType("HotUpdateEntry");\n     IEntry entry = (IEntry) Activator. CreateInstance(entryType);\n     entry. Start();\n')),(0,r.kt)("h2",{id:"run-script-code-through-dynamic-addcomponent"},"Run script code through dynamic AddComponent"),(0,r.kt)("p",null,"Suppose there is such code in hot update:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"class Rotate : MonoBehaviour\n{\n     void Update()\n     {\n\n     }\n}\n")),(0,r.kt)("p",null,"You run code like this in AOT:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'     Type type = ass. GetType("Rotate");\n     GameObject go = new GameObject("Test");\n     go. AddComponent(type);\n')),(0,r.kt)("h2",{id:"restore-the-mounted-hot-update-script-from-the-prefab-or-scene-packaged-into-assetbundle-by-initializing"},"Restore the mounted hot update script from the prefab or scene packaged into assetbundle by initializing"),(0,r.kt)("p",null,"Assuming that there is such an entry script in the hot update, this script is hung on ",(0,r.kt)("inlineCode",{parentName:"p"},"HotUpdatePrefab.prefab"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'\npublic class HotUpdateMain : MonoBehaviour\n{\n     void Start()\n     {\n         Debug. Log("hello, HybridCLR");\n     }\n}\n\n')),(0,r.kt)("p",null,"You can run hot update logic by instantiating this prefab."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'         AssetBundle prefabAb = xxxxx; // Get the AssetBundle where HotUpdatePrefab.prefab is located\n         GameObject testPrefab = Instantiate(prefabAb.LoadAsset<GameObject>("HotUpdatePrefab.prefab"));\n')),(0,r.kt)("p",null,"This method does not require any reflection, and is the same as the original startup process. It is recommended to use this method to initialize the hot update entry code!"))}d.isMDXComponent=!0}}]);