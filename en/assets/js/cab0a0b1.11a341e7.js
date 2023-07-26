"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2857],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>b});var n=r(7294);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}var o=n.createContext({}),d=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=d(e.components);return n.createElement(o.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,l=e.mdxType,a=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=d(r),s=l,b=u["".concat(o,".").concat(s)]||u[s]||m[s]||a;return r?n.createElement(b,i(i({ref:t},p),{},{components:r})):n.createElement(b,i({ref:t},p))}));function b(e,t){var r=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=r.length,i=new Array(a);i[0]=s;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c[u]="string"==typeof e?e:l,i[1]=c;for(var d=2;d<a;d++)i[d]=r[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},4872:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var n=r(7462),l=(r(7294),r(3905));const a={slug:"mindexperiment",authors:{name:"walon"}},i="\u5173\u4e8ehybridclr\u53ef\u884c\u6027\u7684\u601d\u7ef4\u5b9e\u9a8c",c={permalink:"/en/blog/mindexperiment",source:"@site/blog/2022-07-08-mindexperiment.md",title:"\u5173\u4e8ehybridclr\u53ef\u884c\u6027\u7684\u601d\u7ef4\u5b9e\u9a8c",description:"\u5728\u786e\u5b9a\u76ee\u6807\uff0c\u52a8\u624b\u5b9e\u73b0hybridclr\u524d\uff0c\u6709\u4e00\u4e2a\u5fc5\u987b\u8003\u8651\u7684\u95ee\u9898\u2014\u2014\u6211\u4eec\u5982\u4f55\u786e\u5b9ahybridclr\u7684\u53ef\u884c\u6027\uff1f",date:"2022-07-08T00:00:00.000Z",formattedDate:"July 8, 2022",tags:[],readingTime:9.035,hasTruncateMarker:!1,authors:[{name:"walon"}],frontMatter:{slug:"mindexperiment",authors:{name:"walon"}},prevItem:{title:"hybridclr\u6280\u672f\u539f\u7406\u5256\u6790",permalink:"/en/blog/principle"},nextItem:{title:"\u6df1\u5165\u63a2\u7a76hybridclr \u76ee\u5f55",permalink:"/en/blog/catelog"}},o={authorsImageUrls:[void 0]},d=[{value:"\u52a8\u6001\u6ce8\u518c\u5143\u6570\u636e",id:"\u52a8\u6001\u6ce8\u518c\u5143\u6570\u636e",level:2},{value:"\u6240\u6709\u8c03\u7528\u52a8\u6001\u52a0\u8f7d\u7684assembly\u4e2d\u51fd\u6570\u7684\u8def\u5f84\uff0c\u90fd\u80fd\u5b9a\u5411\u5230\u6b63\u786e\u7684\u89e3\u91ca\u5668\u5b9e\u73b0",id:"\u6240\u6709\u8c03\u7528\u52a8\u6001\u52a0\u8f7d\u7684assembly\u4e2d\u51fd\u6570\u7684\u8def\u5f84\u90fd\u80fd\u5b9a\u5411\u5230\u6b63\u786e\u7684\u89e3\u91ca\u5668\u5b9e\u73b0",level:2},{value:"\u89e3\u91ca\u5668\u4e2d\u7684gc\uff0c\u5fc5\u987b\u80fd\u591f\u4e0eAOT\u90e8\u5206\u7684gc\u7edf\u4e00\u5904\u7406",id:"\u89e3\u91ca\u5668\u4e2d\u7684gc\u5fc5\u987b\u80fd\u591f\u4e0eaot\u90e8\u5206\u7684gc\u7edf\u4e00\u5904\u7406",level:2},{value:"\u591a\u7ebf\u7a0b\u76f8\u5173\u4ee3\u7801\u80fd\u6b63\u5e38\u5de5\u4f5c",id:"\u591a\u7ebf\u7a0b\u76f8\u5173\u4ee3\u7801\u80fd\u6b63\u5e38\u5de5\u4f5c",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}],p={toc:d},u="wrapper";function m(e){let{components:t,...r}=e;return(0,l.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"\u5728\u786e\u5b9a\u76ee\u6807\uff0c\u52a8\u624b\u5b9e\u73b0hybridclr\u524d\uff0c\u6709\u4e00\u4e2a\u5fc5\u987b\u8003\u8651\u7684\u95ee\u9898\u2014\u2014\u6211\u4eec\u5982\u4f55\u786e\u5b9ahybridclr\u7684\u53ef\u884c\u6027\uff1f"),(0,l.kt)("p",null,"il2cpp\u867d\u7136\u4e0d\u662f\u4e00\u4e2a\u6781\u5176\u5b8c\u6574\u7684\u8fd0\u884c\u65f6\uff0c\u4f46\u4ee3\u7801\u4ecd\u9ad8\u8fbe12w\u884c\uff0c\u590d\u6742\u5ea6\u76f8\u5f53\u9ad8\uff0c\u60f3\u8981\u77ed\u671f\u5185\u6df1\u5165\u4e86\u89e3\u5b83\u7684\u5b9e\u73b0\u662f\u975e\u5e38\u56f0\u96be\u7684\u3002\u9664\u4e86\u5b98\u65b9\u51e0\u4e2a\u4ecb\u7ecdil2cpp\u7684\u535a\u5ba2\u5916\uff0c\u51e0\u4e4e\u627e\u4e0d\u5230\u5176\u4ed6\u6587\u6863\uff0c\n\u800c\u4e14",(0,l.kt)("inlineCode",{parentName:"p"},"Hybrid mode execution")," \u7684\u5b9e\u73b0\u590d\u6742\u5ea6\u4e5f\u5f88\u9ad8\u3002\u78e8\u5200\u4e0d\u8bef\u780d\u67f4\u5de5\uff0c\u5728\u52a8\u624b\u524d\u4ece\u7406\u8bba\u4e0a\u786e\u4fe1\u8fd9\u5957\u65b9\u6848\u6709\u6781\u9ad8\u53ef\u884c\u6027\uff0c\u662f\u5b8c\u5168\u5fc5\u8981\u7684\u3002"),(0,l.kt)("p",null,"\u4ee5\u6211\u4eec\u5bf9CLR\u8fd0\u884c\u65f6\u7684\u8ba4\u8bc6\uff0c\u8981\u5b9e\u73b0 ",(0,l.kt)("inlineCode",{parentName:"p"},"hybrid mode execution")," \u673a\u5236\uff0c\u81f3\u5c11\u8981\u89e3\u51b3\u4ee5\u4e0b\u51e0\u4e2a\u95ee\u9898"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u80fd\u591f\u52a8\u6001\u6ce8\u518c\u5143\u6570\u636e\uff0c\u8fd9\u4e9b\u52a8\u6001\u6ce8\u518c\u7684\u5143\u6570\u636e\u5fc5\u987b\u5728\u8fd0\u884c\u65f6\u4e2d\u8ddfAOT\u5143\u6570\u636e\u5b8c\u5168\u7b49\u4ef7\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u6240\u6709\u8c03\u7528\u52a8\u6001\u52a0\u8f7d\u7684assembly\u4e2d\u51fd\u6570\u7684\u8def\u5f84\uff0c\u90fd\u80fd\u5b9a\u5411\u5230\u6b63\u786e\u7684\u89e3\u91ca\u5668\u5b9e\u73b0\u3002\u5305\u62ec\u865a\u51fd\u6570override\u3001delegate\u56de\u8c03\u3001\u53cd\u5c04\u8c03\u7528\u7b49\u7b49\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u89e3\u91ca\u5668\u4e2d\u7684gc\uff0c\u5fc5\u987b\u80fd\u591f\u4e0eAOT\u90e8\u5206\u7684gc\u7edf\u4e00\u5904\u7406\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u591a\u7ebf\u7a0b\u76f8\u5173\u80fd\u6b63\u5e38\u5de5\u4f5c\u3002\u5305\u62ec\u4e14\u4e0d\u9650\u4e8e\u521b\u5efaThread\u3001async\u3001volatile\u3001ThreadStatic\u7b49\u7b49\u3002")),(0,l.kt)("p",null,"\u6211\u4eec\u4e0b\u9762\u4e00\u4e00\u5206\u6790\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898\u3002"),(0,l.kt)("h2",{id:"\u52a8\u6001\u6ce8\u518c\u5143\u6570\u636e"},"\u52a8\u6001\u6ce8\u518c\u5143\u6570\u636e"),(0,l.kt)("p",null,"\u6211\u4eec\u5927\u7565\u5730\u5206\u6790\u4e86il2cpp\u5143\u6570\u636e\u521d\u59cb\u5316\u76f8\u5173\u4ee3\u7801\uff0c\u5f97\u51fa\u4ee5\u4e0b\u7ed3\u8bba\u3002"),(0,l.kt)("p",null,"\u9996\u5148\uff0c\u52a8\u6001\u4fee\u6539globalmetadata.dat\u8fd9\u4e2a\u65b9\u5f0f\u4e0d\u53ef\u884c\u3002\u56e0\u4e3aglobalmetadata.dat\u4fdd\u5b58\u4e86\u6301\u4e45\u5316\u7684\u5143\u6570\u636e\uff0c\u5143\u6570\u636e\u4e4b\u95f4\u5173\u7cfb\u5927\u91cf\u4f7f\u7528id\u6765\u76f8\u4e92\u5f15\u7528\uff0c\u6dfb\u52a0\u65b0\u7684\u6570\u636e\u5f88\u5bb9\u6613\u5f15\u5165\u9519\u8bef\uff0c\u53d8\u6210\u6781\u96be\u68c0\u6d4b\u7684bug\u3002\u53e6\u5916\uff0cglobalmetadata\u91cc\u6709\u4e0d\u5c11\u6570\u636e\u9879\u7531\u4e8e\u6ca1\u6709\u6587\u6863\uff0c\u65e0\u6cd5\u5206\u6790\u5b9e\u9645\u7528\u9014\uff0c\u4e5f\u4e0d\u5f97\u800c\u77e5\u5982\u4f55\u8bbe\u7f6e\u6b63\u786e\u7684\u503c\u3002\u53e6\u5916\uff0c\u8fd0\u884c\u65f6\u4f1a\u52a8\u6001\u52a0\u8f7d\u65b0\u7684dll\uff0c\u91cd\u65b0\u8ba1\u7b97globalmetadata.dat\u662f\u6210\u672c\u9ad8\u6602\u7684\u4e8b\u60c5\u3002\u800c\u4e14il2cpp\u4e2d\u5143\u6570\u636e\u7ba1\u7406\u5e76\u4e0d\u652f\u6301\u4e8c\u6b21\u52a0\u8f7d\uff0c\u91cd\u590d\u52a0\u8f7dglobalmetadata.dat\u4f1a\u4ea7\u751f\u76f8\u5f53\u5927\u7684\u4ee3\u7801\u6539\u52a8\u3002"),(0,l.kt)("p",null,"\u4e00\u4e2a\u8f83\u53ef\u884c\u529e\u6cd5\uff0c\u4fee\u6539\u6240\u6709\u5143\u6570\u636e\u8bbf\u95ee\u7684\u5e95\u5c42\u51fd\u6570\uff0c\u68c0\u67e5\u88ab\u8bbf\u95ee\u7684\u5143\u6570\u636e\u7684\u7c7b\u578b\uff0c\u5982\u679c\u662fAOT\u5143\u6570\u636e\uff0c\u5219\u4fdd\u6301\u4e4b\u524d\u7684\u8c03\u7528\uff0c\u5982\u679c\u6765\u81ea\u52a8\u6001\u52a0\u8f7d\uff0c\u5219\u8df3\u8f6c\u5230hybridclr\u7684\u5143\u6570\u636e\u7ba1\u7406\u6a21\u5757\uff0c\u8fd4\u56de\u4e00\u4e2a\u6070\u5f53\u7684\u503c\u3002\u4f46\u8fd9\u513f\u53c8\u9047\u5230\u4e00\u4e2a\u95ee\u9898\uff0c\u5176\u6b21globalmetadata\u4e3a\u4e86\u4f18\u5316\u6027\u80fd\uff0c\u6240\u6709dll\u4e2d\u7684\u5143\u6570\u636e\u5728\u7edf\u4e00\u7684id\u547d\u540d\u7a7a\u95f4\u4e0b\u3002\u5f88\u591a\u5143\u6570\u636e\u67e5\u8be2\u64cd\u4f5c\u4ec5\u4ec5\u4f7f\u7528\u4e00\u4e2aid\u53c2\u6570\uff0c\u5982\u4f55\u6839\u636eid\u533a\u522b\u51fa\u5230\u5e95\u662fAOT\u8fd8\u662finterpreter\u7684\u5143\u6570\u636e\uff1f"),(0,l.kt)("p",null,"\u6211\u4eec\u53d1\u73b0\u5b9e\u9645\u9879\u76ee\u751f\u6210\u7684globalmetadata.dat\u4e2d\u8fd9\u4e9b\u5143\u6570\u636eid\u7684\u503c\u90fd\u8f83\u5c0f\uff0c\u6700\u5927\u4e5f\u4e0d\u8fc7\u51e0\u5341\u4e07\u7ea7\u522b\u3002\u601d\u8003\u540e\u7528\u4e00\u4e2a\u6280\u5de7\uff1a\u6211\u4eec\u5c06id\u5206\u6210\u4e24\u90e8\u5206: \u9ad8\u4f4d\u4e3aimage id\uff0c\u4f4e\u4f4d\u4e3a\u5b9e\u9645\u4e0a\u7684id\uff0c\u5c06image id=0\u4fdd\u7559\u7ed9AOT\u5143\u6570\u636e\u4f7f\u7528\u3002\u6211\u4eec\u4e3a\u6bcf\u4e2a\u52a8\u6001\u52a0\u8f7d\u7684dll\u5206\u914d\u4e00\u4e2aimage id\uff0c\u8fd9\u4e2aimage\u4e2d\u89e3\u6790\u51fa\u7684\u6240\u6709\u5143\u6570\u636eid\u7684\u9ad8\u4f4d\u4e3a\u76f8\u5e94\u7684image id\u3002"),(0,l.kt)("p",null,"\u6211\u4eec\u901a\u8fc7\u8fd9\u4e2a\u6280\u5de7\uff0chook\u4e86\u6240\u6709\u5e95\u5c42\u8bbf\u95ee\u5143\u6570\u636e\u7684\u65b9\u6cd5\u3002\u5927\u7ea6\u4fee\u6539\u4e86\u51e0\u5341\u5904\uff0c\u57fa\u672c\u90fd\u662f\u5982\u4e0b\u8fd9\u6837\u7684\u4ee3\u7801\uff0c\u5c3d\u91cf\u4e0d\u4fee\u6539\u539f\u59cb\u903b\u8f91\uff0c\u5f88\u5bb9\u6613\u4fdd\u8bc1\u6b63\u786e\u6027\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"const char* il2cpp::vm::GlobalMetadata::GetStringFromIndex(StringIndex index)\n{\n    // ==={{ hybridclr\n    if (hybridclr::metadata::IsInterpreterIndex(index))\n    {\n        return hybridclr::metadata::MetadataModule::GetStringFromEncodeIndex(index);\n    }\n    // ===}} hybridclr\n    IL2CPP_ASSERT(index <= s_GlobalMetadataHeader->stringSize);\n    const char* strings = MetadataOffset<const char*>(s_GlobalMetadata, s_GlobalMetadataHeader->stringOffset, index);\n    #if __ENABLE_UNITY_PLUGIN__\n        if (g_get_string != NULL)\n        {\n            g_get_string((char*)strings, index);\n        }\n    #endif // __ENABLE_UNITY_PLUGIN__\n        return strings;\n}\n\n")),(0,l.kt)("p",null,"\u6211\u4eec\u5728\u52a8\u624b\u524d\u68c0\u67e5\u4e86\u591a\u4e2a\u76f8\u5173\u51fd\u6570\uff0c\u57fa\u672c\u6ca1\u6709\u95ee\u9898\u3002\u867d\u7136\u4e0d\u6562\u786e\u5b9a\u8fd9\u4e00\u5b9a\u662f\u53ef\u884c\u7684\uff0c\u4f46\u5143\u6570\u636e\u52a0\u8f7d\u662fhybridclr\u7b2c\u4e00\u9636\u6bb5\u7684\u5f00\u53d1\u4efb\u52a1\uff0c\u4e07\u4e00\u53d1\u73b0\u95ee\u9898\uff0c\u53ca\u65f6\u4e2d\u6b62hybridclr\u5f00\u53d1\u635f\u5931\u4e0d\u5927\u3002\u4e8e\u662f\u6211\u4eec\u8ba4\u4e3a\u7b97\u662f\u89e3\u51b3\u4e86\u7b2c\u4e00\u4e2a\u95ee\u9898\u3002"),(0,l.kt)("h2",{id:"\u6240\u6709\u8c03\u7528\u52a8\u6001\u52a0\u8f7d\u7684assembly\u4e2d\u51fd\u6570\u7684\u8def\u5f84\u90fd\u80fd\u5b9a\u5411\u5230\u6b63\u786e\u7684\u89e3\u91ca\u5668\u5b9e\u73b0"},"\u6240\u6709\u8c03\u7528\u52a8\u6001\u52a0\u8f7d\u7684assembly\u4e2d\u51fd\u6570\u7684\u8def\u5f84\uff0c\u90fd\u80fd\u5b9a\u5411\u5230\u6b63\u786e\u7684\u89e3\u91ca\u5668\u5b9e\u73b0"),(0,l.kt)("p",null,"\u6211\u4eec\u5206\u6790\u4e86il2cpp\u4e2d\u5173\u4e8eMethod\u5143\u6570\u636e\u7684\u7ba1\u7406\u65b9\u5f0f\uff0c\u53d1\u73b0MethodInfo\u7ed3\u6784\u4e2d\u4fdd\u5b58\u4e86\u8fd0\u884c\u65f6\u5b9e\u9645\u6267\u884c\u903b\u8f91\u7684\u51fd\u6570\u6307\u9488\u3002\u5982\u679c\u6211\u4eec\u7b80\u5355\u5730\u8bbe\u7f6e\u52a8\u6001\u52a0\u8f7d\u7684\u51fd\u6570\u5143\u6570\u636e\u7684MethodInfo\u7ed3\u6784\u7684\u6307\u9488\u4e3a\u6b63\u786e\u7684\u89e3\u91ca\u5668\u51fd\u6570\uff0c\u80fd\u5426\u4fdd\u8bc1\u6240\u6709\u6d41\u7a0b\u5bf9\u8be5\u51fd\u6570\u7684\u8c03\u7528\uff0c\u90fd\u80fd\u6b63\u786e\u5b9a\u5411\u5230\u89e3\u91ca\u5668\u51fd\u6570\u5462\uff1f"),(0,l.kt)("p",null,"\u4e25\u8c28\u601d\u8003\u540e\u7684\u7ed3\u8bba\u662f\u80af\u5b9a\u7684\u3002\u9996\u5148AOT\u90e8\u5206\u4e0d\u53ef\u80fd\u76f4\u63a5\u8c03\u7528\u52a8\u6001\u52a0\u8f7d\u7684dll\u4e2d\u7684\u51fd\u6570\u3002\u5176\u6b21\uff0c\u8fd0\u884c\u65f6\u5e76\u6ca1\u6709\u5176\u4ed6\u5730\u65b9\u4fdd\u5b58\u4e86\u51fd\u6570\u6307\u9488\u3002\u610f\u5473\u7740\uff0c\u5982\u679c\u60f3\u8c03\u7528\u52a8\u6001\u52a0\u8f7d\u7684\u51fd\u6570\uff0c\u5fc5\u987b\u83b7\u5f97MethodInfo\u4e2d\u7684\u51fd\u6570\u6307\u9488\uff0c\u624d\u80fd\u6b63\u786e\u6267\u884c\u5230\u76ee\u6807\u51fd\u6570\u3002\u610f\u5473\u7740\u6211\u4eec\u8fd0\u884c\u8fc7\u7a0b\u4e2d\u6240\u6709\u5bf9\u8be5\u51fd\u6570\u7684\u8c03\u7528\u4e00\u5b9a\u4f1a\u8c03\u7528\u5230\u6b63\u786e\u7684\u89e3\u91ca\u5668\u51fd\u6570\u3002"),(0,l.kt)("p",null,"\u81f3\u4e8e\u6211\u4eec\u89e3\u51b3\u4e86\u7b2c\u4e8c\u4e2a\u95ee\u9898\u3002"),(0,l.kt)("h2",{id:"\u89e3\u91ca\u5668\u4e2d\u7684gc\u5fc5\u987b\u80fd\u591f\u4e0eaot\u90e8\u5206\u7684gc\u7edf\u4e00\u5904\u7406"},"\u89e3\u91ca\u5668\u4e2d\u7684gc\uff0c\u5fc5\u987b\u80fd\u591f\u4e0eAOT\u90e8\u5206\u7684gc\u7edf\u4e00\u5904\u7406"),(0,l.kt)("p",null,"\u5f88\u5bb9\u6613\u89c2\u5bdf\u5230\uff0c\u901a\u8fc7il2cpp::vm::Object::New\u53ef\u4ee5\u5206\u914d\u6258\u7ba1\u5bf9\u8c61\uff0c\u901a\u8fc7gc\u6a21\u5757\u7684\u51fd\u6570\u53ef\u4ee5\u5206\u914d\u4e00\u4e9b\u80fd\u591f\u88abgc\u81ea\u52a8\u7ba1\u7406\u7684\u5185\u5b58\u3002\u4f46\u6211\u4eec\u5982\u4f55\u4fdd\u8bc1\uff0c\u4f7f\u7528\u8fd9\u79cd\u65b9\u5f0f\u5c31\u4e00\u5b9a\u80fd\u4fdd\u5b58\u6b63\u786e\u6027\u5462\uff0c\u4f1a\u4e0d\u4f1a\u6709\u7279\u6b8a\u7684\u4f7f\u7528\u89c4\u5219 \uff0chybridclr\u7684\u89e3\u91ca\u5668\u4ee3\u7801\u65e0\u6cd5\u4e0e\u4e4b\u914d\u5408\u5de5\u4f5c\u5462\uff1f"),(0,l.kt)("p",null,"\u8003\u8651\u5230AOT\u4ee3\u7801\u4e2d\u4e5f\u6709\u5f88\u591agc\u76f8\u5173\u7684\u64cd\u4f5c\uff0c\u6211\u4eec\u68c0\u67e5\u4e86\u4e00\u4e9bil2cpp\u4e3a\u8fd9\u4e9b\u64cd\u4f5c\u751f\u6210\u7684c++\u4ee3\u7801\uff0c\u90fd\u662f\u7b80\u7b80\u5355\u5355\u76f4\u63a5\u8c03\u7528 il2cpp::vm::Object::New \u4e4b\u7c7b\u7684\u51fd\u6570\uff0c\u5e76\u65e0\u7279\u6b8a\u4e4b\u5904\u3002 \u53ef\u4ee5\u8fd9\u4e48\u5206\u6790\uff1ail2cpp\u751f\u6210\u7684\u4ee3\u7801\u662f\u666e\u901a\u7684c++\u4ee3\u7801\uff0chybridclr\u89e3\u91ca\u5668\u4ee3\u7801\u4e5f\u662fc++\u4ee3\u7801\uff0c\u65e2\u7136\u751f\u6210\u7684\u4ee3\u7801\u7684\u5185\u5b58\u4f7f\u7528\u65b9\u5f0f\u80fd\u591f\u6b63\u786e\u5de5\u4f5c\uff0c\u90a3\u4e48hybridclr\u89e3\u91ca\u5668\u4e2dgc\u76f8\u5173\u4ee3\u7801\uff0c\u80af\u5b9a\u4e5f\u80fd\u6b63\u786e\u5de5\u4f5c\u3002"),(0,l.kt)("p",null,"\u81f3\u6b64\uff0c\u6211\u4eec\u89e3\u51b3\u4e86\u7b2c\u4e09\u4e2a\u95ee\u9898\u3002"),(0,l.kt)("h2",{id:"\u591a\u7ebf\u7a0b\u76f8\u5173\u4ee3\u7801\u80fd\u6b63\u5e38\u5de5\u4f5c"},"\u591a\u7ebf\u7a0b\u76f8\u5173\u4ee3\u7801\u80fd\u6b63\u5e38\u5de5\u4f5c"),(0,l.kt)("p",null,"\u4e0e\u4e0a\u4e00\u4e2a\u95ee\u9898\u76f8\u4f3c\u3002\u6211\u4eec\u68c0\u67e5\u4e86il2cpp\u751f\u6210\u7684c++\u4ee3\u7801\uff0c\u53d1\u73b0\u5e76\u65e0\u7279\u6b8a\u4e4b\u5904\u4e5f\u80fd\u5728\u591a\u7ebf\u7a0b\u73af\u5883\u4e0b\u6b63\u5e38\u8fd0\u884c\uff0c\u90a3\u6211\u4eec\u4e5f\u53ef\u4ee5\u975e\u5e38\u786e\u4fe1\uff0chybridclr\u89e3\u91ca\u5668\u7684\u4ee3\u7801\u53ea\u8981\u7b26\u5408\u5e38\u89c4\u7684\u591a\u7ebf\u7a0b\u7684\u8981\u6c42\uff0c\u4e5f\u80fd\u5728\u591a\u7ebf\u7a0b\u73af\u5883\u4e0b\u6b63\u5e38\u8fd0\u884c\u3002"),(0,l.kt)("p",null,"\u81f3\u6b64\uff0c\u6211\u4eec\u89e3\u51b3\u4e86\u7b2c\u56db\u4e2a\u95ee\u9898\u3002"),(0,l.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,l.kt)("p",null,"\u6211\u4eec\u901a\u8fc7\u5c11\u91cf\u7684\u5bf9\u5b9e\u9645il2cpp\u4ee3\u7801\u7684\u89c2\u5bdf\uff0c\u4ee5\u53ca\u5bf9CLR\u8fd0\u884c\u65f6\u539f\u7406\u7684\u4e86\u89e3\uff0c\u518d\u914d\u5408\u601d\u7ef4\u5b9e\u9a8c\uff0c\u53ef\u4ee599.9%\u4ee5\u4e0a\u786e\u5b9a\uff0c\u65e2\u7136il2cpp\u751f\u6210\u7684\u4ee3\u7801\u90fd\u80fd\u5728\u8fd0\u884c\u65f6\u6b63\u786e\u8fd0\u884c\uff0c\u90a3hybridclr\u89e3\u91ca\u6a21\u5f0f\u4e0b\u6267\u884c\u7684\u4ee3\u7801\uff0c\u4e5f\u80fd\u6b63\u786e\u8fd0\u884c\u3002"),(0,l.kt)("p",null,"\u6211\u4eec\u5728\u5b8c\u6210\u601d\u7ef4\u5b9e\u9a8c\u7684\u90a3\u4e00\u523b\uff0c\u96be\u63a9\u5185\u5fc3\u6fc0\u52a8\u7684\u5fc3\u60c5\u3002\u4f5c\u4e3a\u4e00\u540d\u7269\u7406\u4e13\u4e1a\u7684IT\u4eba\uff0c\u8111\u6d77\u91cc\u7b2c\u4e00\u65f6\u95f4\u6d6e\u73b0\u51fa\u7231\u56e0\u65af\u5766\u5728\u601d\u8003\u5e7f\u4e49\u76f8\u5bf9\u8bba\u65f6\u7684\uff0c\u4f7f\u7528\u7535\u68af\u601d\u7ef4\u5b9e\u9a8c\u5f97\u51fa\u5f15\u529b\u4f7f\u65f6\u7a7a\u5f2f\u66f2\u8fd9\u4e00\u60ca\u4eba\u7ed3\u8bba\u3002\u6211\u4eec\u4e0d\u6562\u6bd4\u80a9\u8fd9\u79cd\u4f1f\u5927\u7684\u79d1\u5b66\u5bb6\uff0c\u4f46\u6211\u4eec\u786e\u5b9e\u5728\u4f7f\u7528\u7c7b\u4f3c\u7684\u601d\u7ef4\u6280\u5de7\u3002\u53ef\u4ee5\u8bf4\uff0chybridclr\u4e0d\u662f\u7b80\u5355\u7684\u7ecf\u9a8c\u603b\u7ed3\uff0c\u662f\u6df1\u523b\u6d1e\u5bdf\u529b\u4e0e\u5206\u6790\u80fd\u529b\u5b55\u80b2\u7684\u7ed3\u679c\u3002"))}m.isMDXComponent=!0}}]);