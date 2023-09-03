"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6243],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),s=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(c.Provider,{value:n},e.children)},d="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=s(t),u=i,m=d["".concat(c,".").concat(u)]||d[u]||y[u]||o;return t?r.createElement(m,l(l({ref:n},p),{},{components:t})):r.createElement(m,l({ref:n},p))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,l=new Array(o);l[0]=u;var a={};for(var c in n)hasOwnProperty.call(n,c)&&(a[c]=n[c]);a.originalType=e,a[d]="string"==typeof e?e:i,l[1]=a;for(var s=2;s<o;s++)l[s]=t[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3618:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>y,frontMatter:()=>o,metadata:()=>a,toc:()=>s});var r=t(7462),i=(t(7294),t(3905));const o={},l="Basic code encryption",a={unversionedId:"business/encryption",id:"business/encryption",title:"Basic code encryption",description:"All commercial versions support basic code encryption.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/encryption.md",sourceDirName:"business",slug:"/business/encryption",permalink:"/en/docs/business/encryption",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"performance data",permalink:"/en/docs/business/performance"},next:{title:"Commercial Project Cases",permalink:"/en/docs/business/businesscase"}},c={},s=[{value:"implementation",id:"implementation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Packaging process",id:"packaging-process",level:2},{value:"Encryption dll",id:"encryption-dll",level:2},{value:"Load at runtime",id:"load-at-runtime",level:2}],p={toc:s},d="wrapper";function y(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"basic-code-encryption"},"Basic code encryption"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"All commercial versions support basic code encryption.")),(0,i.kt)("p",null,"The community version directly loads the original dll, making developers have to carry and download the original dll, and these original dll can be decompiled by tools such as ILSpy\n, causing serious security problems. Even if the developer has done encryption, it is easy to be intercepted in the memory and obtain the decrypted dll content."),(0,i.kt)("p",null,"Basic code encryption provides a certain degree of obfuscation and encryption functions to ensure code security."),(0,i.kt)("h2",{id:"implementation"},"implementation"),(0,i.kt)("p",null,"After the basic code encryption is enabled, the hybridclr code will be refactored and disrupted, and the dll parsing method will be changed so that only the encrypted dll can be loaded.\nBasic code encryption not only encrypts the dll itself, but also randomly transforms the IL alone. Even if the dll itself is decrypted, it cannot be detected by programs such as ILSpy\nTool analysis can effectively prevent the code from being easily cracked."),(0,i.kt)("p",null,"Basic code encryption does not perform irreversible instruction set conversion like deep code encryption, so the degree of protection is not as good as deep code encryption."),(0,i.kt)("h2",{id:"configuration"},"Configuration"),(0,i.kt)("p",null,"Enabling the ",(0,i.kt)("inlineCode",{parentName:"p"},"enableEncryption")," option in HybridCLRSettings enables basic code encryption. After command encryption is enabled, the ",(0,i.kt)("inlineCode",{parentName:"p"},"encryptionSeed")," field needs to be configured at the same time.\nThis field is an int type value, which provides a default value, and developers are strongly recommended to modify this value."),(0,i.kt)("p",null,"Each different ",(0,i.kt)("inlineCode",{parentName:"p"},"ecryptionSeed")," will cause ",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR/Genrate/EncryptXXX")," instructions to generate completely different hybridclr code."),(0,i.kt)("h2",{id:"packaging-process"},"Packaging process"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"HybridCLR/Generate/All")),(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"HybridCLR.Editor.Encryption.DllEncrypter")," class to encrypt supplementary metadata dll and hot update dll (even supplementary metadata dll needs to be encrypted!)"),(0,i.kt)("li",{parentName:"ul"},"Add the encrypted dll to the resource management system of your project"),(0,i.kt)("li",{parentName:"ul"},"Other operations are exactly the same as the community version")),(0,i.kt)("h2",{id:"encryption-dll"},"Encryption dll"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR.Editor.Encryption.DllEncrypter")," class to encrypt supplementary metadata dlls and hot update dlls. EncryptDll demonstrates in the following code\nHow to encrypt a dll, EncryptDllsInDirectory demonstrates how to encrypt multiple dlls."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'\n     public static class EncryptDllCommand\n     {\n         public static void EncryptDll(string originalDllFile, string encryptedDllFile)\n         {\n             int seed = SettingsUtil.EncryptionSeedOrZeroWhileDisable;\n             if (seed == 0)\n             {\n                 Debug.LogWarning($"enableEncryption is false or encryptionSeed == 0, encryption is skipped");\n                 return;\n             }\n             var encryptor = new DllEncryptor(seed);\n             byte[] originBytes = File.ReadAllBytes(originalDllFile);\n             byte[] encryptedBytes = encryptor.EncryptDll(originBytes);\n             File.WriteAllBytes(encryptedDllFile, encryptedBytes);\n         }\n\n         public static void EncryptDllsInDirectory(string dllDir)\n         {\n             int seed = SettingsUtil.EncryptionSeedOrZeroWhileDisable;\n             if (seed == 0)\n             {\n                 Debug.LogWarning($"enableEncryption is false or encryptionSeed == 0, encryption is skipped");\n                 return;\n             }\n             var encryptor = new DllEncryptor(seed);\n             foreach (var dllFile in Directory.GetFiles(dllDir, "*.dll.bytes"))\n             {\n                 byte[] originBytes = File. ReadAllBytes(dllFile);\n                 byte[] encryptedBytes = encryptor.EncryptDll(originBytes);\n                 File.WriteAllBytes(dllFile, encryptedBytes);\n                 Debug.Log($"EncryptDllsInDirectory {dllFile} length:{encryptedBytes.Length}");\n             }\n         }\n     }\n')),(0,i.kt)("h2",{id:"load-at-runtime"},"Load at runtime"),(0,i.kt)("p",null,"Exactly the same as the community version, directly call Assembly.Load or RuntimeApi.LoadMetadataForAOTAssembly to load the encrypted dll file content.\nhybridclr will decrypt it internally and does not require the developer to perform additional decryption operations."))}y.isMDXComponent=!0}}]);