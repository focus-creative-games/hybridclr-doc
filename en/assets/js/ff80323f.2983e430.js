"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3814],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=a.createContext({}),d=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(u.Provider,{value:t},e.children)},p="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=d(n),m=i,h=p["".concat(u,".").concat(m)]||p[m]||s[m]||l;return n?a.createElement(h,r(r({ref:t},c),{},{components:n})):a.createElement(h,r({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,r=new Array(l);r[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o[p]="string"==typeof e?e:i,r[1]=o;for(var d=2;d<l;d++)r[d]=n[d];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8432:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>r,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const l={},r="Function Injection Rules",o={unversionedId:"business/ultimate/injectrules",id:"business/ultimate/injectrules",title:"Function Injection Rules",description:"In order to avoid dirty function contagion, a small piece of check jump code is injected into the header of all functions by default. This injected code has a significant impact on the performance of short functions and the length of the final generated code (increased code by about 30%).",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/business/ultimate/injectrules.md",sourceDirName:"business/ultimate",slug:"/business/ultimate/injectrules",permalink:"/en/docs/business/ultimate/injectrules",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"manual",permalink:"/en/docs/business/ultimate/manual"},next:{title:"Common Errors",permalink:"/en/docs/business/ultimate/commonerrors"}},u={},d=[{value:"Dirty function contagion",id:"dirty-function-contagion",level:2},{value:"Indirect function optimization technology",id:"indirect-function-optimization-technology",level:2},{value:"Inject policy file",id:"inject-policy-file",level:2},{value:"HybridCLR Settings settings",id:"hybridclr-settings-settings",level:3},{value:"Configuration rules",id:"configuration-rules",level:3},{value:"rules",id:"rules",level:4},{value:"assembly",id:"assembly",level:4},{value:"type",id:"type",level:4},{value:"method",id:"method",level:4},{value:"property",id:"property",level:4},{value:"event",id:"event",level:4},{value:"Building workflow related",id:"building-workflow-related",level:3}],c={toc:d},p="wrapper";function s(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"function-injection-rules"},"Function Injection Rules"),(0,i.kt)("p",null,"  In order to avoid dirty function contagion, a small piece of check jump code is injected into the header of all functions by default. This injected code has a significant impact on the performance of short functions and the length of the final generated code (increased code by about 30%).\nAlthough in most cases the impact of injected code on overall performance is negligible, on rare special occasions this performance degradation will be observed.\nSince version v4.5.9, custom configuration of this injection behavior is allowed."),(0,i.kt)("h2",{id:"dirty-function-contagion"},"Dirty function contagion"),(0,i.kt)("p",null,"  We call changing functions dirty functions. If no modifications are made to the original code generated by il2cpp, there will be a problem of dirty function chain infection for non-virtual function calls. For example: function A calls function B,\nFunction B calls function C. If function C changes, A, B, and C will all be marked as dirty functions. In practice, changes in some commonly used basic functions may lead to a huge amount of code being marked as dirty functions.\nThis is obviously not what we expected."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"classFoo\n{\n\n   public static void A()\n   {\n       B();\n   }\n\n   public static void B()\n   {\n       C();\n   }\n\n   public static void C()\n   {\n       //The old code is new object();\n       // After modification, A, B, and C are all marked as dirty functions.\n       new List<int>();\n   }\n}\n\n")),(0,i.kt)("h2",{id:"indirect-function-optimization-technology"},"Indirect function optimization technology"),(0,i.kt)("p",null,"  We use the technique of indirect function optimization to overcome this problem. When il2cpp generates code, it inserts a check code at the head of the DHE function. If the function does not change, execution continues, otherwise it jumps to the interpretation function for execution."),(0,i.kt)("p",null,"Take the following csharp code as an example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"     public class IndirectChangedNotInjectMethod\n     {\n         public static int ChangeMethod10(int x)\n         {\n             return ChangeMethod0(x);\n         }\n\n         public static int ChangeMethod100(int x)\n         {\n             return ChangeMethod10(x);\n         }\n     }\n\n")),(0,i.kt)("p",null,"The original il2cpp code generated by the ",(0,i.kt)("inlineCode",{parentName:"p"},"ChangeMethod100")," function is as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-cpp"},"  IL2CPP_EXTERN_C IL2CPP_METHOD_ATTR int32_t IndirectChangedNotInjectMethod_ChangeMethod100_mFE65234D8ACE343677581C1D96E05E9DFC7C2D1A (int32_t ___0_x, const RuntimeMethod* method)\n{\n    {\n        // return ChangeMethod10(x);\n        int32_t L_0 = ___0_x;\n        int32_t L_1;\n        L_1 = IndirectChangedNotInjectMethod_ChangeMethod10_m1CFE86C6F8D9E11116BA0F8CACB72A31D4F8401E(L_0, NULL);\n        return L_1;\n    }\n}\n")),(0,i.kt)("p",null,"After inserting the check and redirect invoking code, it becomes:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-cpp"},"\nIL2CPP_EXTERN_C IL2CPP_METHOD_ATTR int32_t IndirectChangedNotInjectMethod_ChangeMethod100_mFE65234D8ACE343677581C1D96E05E9DFC7C2D1A (int32_t ___0_x, const RuntimeMethod* method)\n{\n    static bool s_Il2CppMethodInitialized;\n    if (!s_Il2CppMethodInitialized)\n    {\n        il2cpp_codegen_initialize_runtime_metadata((uintptr_t*)&IndirectChangedNotInjectMethod_ChangeMethod100_mFE65234D8ACE343677581C1D96E05E9DFC7C2D1A_RuntimeMethod_var);\n        s_Il2CppMethodInitialized = true;\n    }\n    method = IndirectChangedNotInjectMethod_ChangeMethod100_mFE65234D8ACE343677581C1D96E05E9DFC7C2D1A_RuntimeMethod_var;\n    if (method->isInterpterImpl)\n    {\n        typedef int32_t (*RedirectFunc)(int32_t, const RuntimeMethod*);\n        return ((RedirectFunc)method->methodPointerCallByInterp)(___0_x, method);\n    }\n    {\n        // return ChangeMethod10(x);\n        int32_t L_0 = ___0_x;\n        int32_t L_1;\n        L_1 = IndirectChangedNotInjectMethod_ChangeMethod10_m1CFE86C6F8D9E11116BA0F8CACB72A31D4F8401E(L_0, NULL);\n        return L_1;\n    }\n}\n\n")),(0,i.kt)("p",null,"The injected code contains the following:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The metadata initialization block in the header adds the initialization code of the metadata corresponding to the current function. If the function originally does not have any metadata that needs to be initialized, add the entire metadata initialization code block."),(0,i.kt)("li",{parentName:"ul"},"Added a new branch to check the code. If the current function is replaced by interpreted execution, jump to interpreted execution")),(0,i.kt)("p",null,"For most cases, the injected code only has one additional check ",(0,i.kt)("inlineCode",{parentName:"p"},"if (method->isInterpterImpl)"),", and the impact on overall performance is negligible. But for short functions (such as ",(0,i.kt)("inlineCode",{parentName:"p"},"int GetValue() { return value; }"),"),\nSince the code of the short function itself is short, there is often no metadata that needs to be initialized, which leads to the introduction of two additional checks and may prevent the function from being inline, resulting in observable performance degradation (10% or more) and significant code bloat. (Added two blocks of code)."),(0,i.kt)("p",null,"Even if it is not a short function, the injected code causes the overall size of the code file generated by the DHE assembly to increase by 30%. This impact on the package body cannot be ignored."),(0,i.kt)("p",null,"In fact, many short functions will not change. Injecting code is unnecessary. Avoiding injection can significantly improve their performance and reduce the size of the final generated cpp code to a certain extent. For this purpose we introduced an injection policy file to configure this behavior."),(0,i.kt)("h2",{id:"inject-policy-file"},"Inject policy file"),(0,i.kt)("p",null,"We optimize the performance degradation and code bloat caused by indirect function optimization by configuring some or all functions (use with caution, not recommended!) not to inject. Function injection rules (InjectRules) file is used to\nachieve this purpose."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Even if a function is marked not to be injected, modifying this function in subsequent hot updates will not cause running errors or execute old logic. It will only cause dirty function infection problems, that is, all functions that directly call this function will be infected. Mark function as dirty.")),(0,i.kt)("h3",{id:"hybridclr-settings-settings"},"HybridCLR Settings settings"),(0,i.kt)("p",null,"Fill in the injection policy file path in the ",(0,i.kt)("inlineCode",{parentName:"p"},"InjectRuleFiles")," field in ",(0,i.kt)("inlineCode",{parentName:"p"},"HybridCLR Settings"),". The relative path of the file is the project root directory (e.g ",(0,i.kt)("inlineCode",{parentName:"p"},"Assets/InjectRules/DefaultInjectRules.xml"),")."),(0,i.kt)("p",null,"Allows 0-N configuration policy files to be provided. If there is no configuration policy file, function injection for all DHE assemblies is performed by default."),(0,i.kt)("h3",{id:"configuration-rules"},"Configuration rules"),(0,i.kt)("p",null,"The configuration syntax is very similar to link.xml. For a function, if multiple rules match, the last rule takes precedence."),(0,i.kt)("p",null,"A typical injection policy file is as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'<rules>\n     <assembly fullname="*">\n         <type fullname="*">\n             <property name="*"/> All properties are not injected\n         </type>\n     </assembly>\n<assembly fullname="AssemblyA">\n<type fullname="Type1">\n<method name="*"/>\n</type>\n<type fullname="Type2">\n<property name="Age*"/>\n<property name="Age_3" mode="proxy"/>\n<property name="Count" mode="none"/>\n<property signature="System.String Name"/>\n<method name="Run*"/>\n<method name="Run_3" mode="proxy"/>\n<method name="Foo"/>\n<method signature="System.Int32 Sum(System.Int32,System.Int32)"/>\n<method signature="System.Int32 Sum2(System.Int32,System.Int32)"/>\n<event name="OnEvent*"/>\n<event name="OnEvent_3" mode="proxy"/>\n<event name="OnHello"/>\n</type>\n</assembly>\n<assembly fullname="AssemblyB">\n<type fullname="*">\n<method name="*"/>\n</type>\n     </assembly>\n</rules>\n')),(0,i.kt)("h4",{id:"rules"},"rules"),(0,i.kt)("p",null,"The top-level tag is rules, and rules can contain 0-n assembly rules."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Nullable"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"assembly"),(0,i.kt)("td",{parentName:"tr",align:null},"child element"),(0,i.kt)("td",{parentName:"tr",align:null},"no"),(0,i.kt)("td",{parentName:"tr",align:null},"assembly rules")))),(0,i.kt)("h4",{id:"assembly"},"assembly"),(0,i.kt)("p",null,"Configure rules for a certain assembly or type of assembly."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Nullable"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"fullname"),(0,i.kt)("td",{parentName:"tr",align:null},"property"),(0,i.kt)("td",{parentName:"tr",align:null},"no"),(0,i.kt)("td",{parentName:"tr",align:null},"The assembly name without the '.dll' suffix. Support wildcard characters, such as '",(0,i.kt)("em",{parentName:"td"},"', 'Unity."),"', 'MyCustom*' and so on")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"type"),(0,i.kt)("td",{parentName:"tr",align:null},"child elements"),(0,i.kt)("td",{parentName:"tr",align:null},"are"),(0,i.kt)("td",{parentName:"tr",align:null},"type rules. Can contain 0-N")))),(0,i.kt)("h4",{id:"type"},"type"),(0,i.kt)("p",null,"Configure injection rules for a certain type or type. Note that injection rules for generic primitive types are supported, but injection rules for configuring generic instance classes are not supported. For example, you can configure the injection rules of ",(0,i.kt)("strong",{parentName:"p"},"List","`","1"),",\nBut the injection rules of ",(0,i.kt)("strong",{parentName:"p"},"List","<","int",">")," cannot be configured."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"If a function satisfies multiple rules, the last rule will prevail"),(0,i.kt)("li",{parentName:"ul"},"Property is regarded as two functions: ",(0,i.kt)("inlineCode",{parentName:"li"},"get_{name}")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"set_{name}"),", so ",(0,i.kt)("inlineCode",{parentName:"li"},"int Count")," can also be matched by ",(0,i.kt)("inlineCode",{parentName:"li"},'&lt;method name="get_Count"&gt;'))),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Nullable"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"fullname"),(0,i.kt)("td",{parentName:"tr",align:null},"Property"),(0,i.kt)("td",{parentName:"tr",align:null},"No"),(0,i.kt)("td",{parentName:"tr",align:null},"The full name of the type. Support wildcard characters, such as '",(0,i.kt)("em",{parentName:"td"},"', 'Unity."),"', 'MyCustom.*.TestType' and so on")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"method"),(0,i.kt)("td",{parentName:"tr",align:null},"child element"),(0,i.kt)("td",{parentName:"tr",align:null},"is"),(0,i.kt)("td",{parentName:"tr",align:null},"function rule")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"property"),(0,i.kt)("td",{parentName:"tr",align:null},"child element"),(0,i.kt)("td",{parentName:"tr",align:null},"is"),(0,i.kt)("td",{parentName:"tr",align:null},"property rule")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"event"),(0,i.kt)("td",{parentName:"tr",align:null},"child element"),(0,i.kt)("td",{parentName:"tr",align:null},"is"),(0,i.kt)("td",{parentName:"tr",align:null},"event rule")))),(0,i.kt)("h4",{id:"method"},"method"),(0,i.kt)("p",null,"Configure function injection rules."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Nullable"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"name"),(0,i.kt)("td",{parentName:"tr",align:null},"property"),(0,i.kt)("td",{parentName:"tr",align:null},"no"),(0,i.kt)("td",{parentName:"tr",align:null},"function name. Support wildcard characters, such as '",(0,i.kt)("em",{parentName:"td"},"', 'Run"),"' and so on")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"signature"),(0,i.kt)("td",{parentName:"tr",align:null},"property"),(0,i.kt)("td",{parentName:"tr",align:null},"is"),(0,i.kt)("td",{parentName:"tr",align:null},"a function signature. Supports wildcard characters, such as '",(0,i.kt)("em",{parentName:"td"},"', 'System.Int32 "),"(System.Int32)'")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"mode"),(0,i.kt)("td",{parentName:"tr",align:null},"child elements"),(0,i.kt)("td",{parentName:"tr",align:null},"are"),(0,i.kt)("td",{parentName:"tr",align:null},"injection types, valid values \u200b\u200bare 'none' or 'proxy'. If not filled in or empty, take 'none'")))),(0,i.kt)("h4",{id:"property"},"property"),(0,i.kt)("p",null,"Configuration property injection rulesbut. Note that the attribute is treated as two functions: ",(0,i.kt)("inlineCode",{parentName:"p"},"get_{name}")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"set_{name}"),", so the getter function ",(0,i.kt)("inlineCode",{parentName:"p"},"get_Count")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"int Count")," can also be matched by ",(0,i.kt)("inlineCode",{parentName:"p"},'&lt;method name="get_Count"&gt;'),"."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Nullable"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"name"),(0,i.kt)("td",{parentName:"tr",align:null},"property"),(0,i.kt)("td",{parentName:"tr",align:null},"no"),(0,i.kt)("td",{parentName:"tr",align:null},"function name. Support wildcard characters, such as '",(0,i.kt)("em",{parentName:"td"},"', 'Run"),"' and so on")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"signature"),(0,i.kt)("td",{parentName:"tr",align:null},"property"),(0,i.kt)("td",{parentName:"tr",align:null},"is"),(0,i.kt)("td",{parentName:"tr",align:null},"a function signature. Supports wildcard characters, such as '*', 'System.Int32 ","*","'")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"mode"),(0,i.kt)("td",{parentName:"tr",align:null},"child elements"),(0,i.kt)("td",{parentName:"tr",align:null},"are"),(0,i.kt)("td",{parentName:"tr",align:null},"injection types, valid values are 'none' or 'proxy'. If not filled in or empty, take 'none'")))),(0,i.kt)("h4",{id:"event"},"event"),(0,i.kt)("p",null,"Configure event injection rules. Note that the event is treated as two functions: ",(0,i.kt)("inlineCode",{parentName:"p"},"add_{name}")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"remove_{name}"),", so the add function ",(0,i.kt)("inlineCode",{parentName:"p"},"add_OnDone")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"Action OnDone")," can also be matched by ",(0,i.kt)("inlineCode",{parentName:"p"},'&lt;method name="add_OnDone"&gt;'),"."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Nullable"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"name"),(0,i.kt)("td",{parentName:"tr",align:null},"property"),(0,i.kt)("td",{parentName:"tr",align:null},"no"),(0,i.kt)("td",{parentName:"tr",align:null},"function name. Support wildcard characters, such as '",(0,i.kt)("em",{parentName:"td"},"', 'Run"),"' and so on")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"signature"),(0,i.kt)("td",{parentName:"tr",align:null},"property"),(0,i.kt)("td",{parentName:"tr",align:null},"is"),(0,i.kt)("td",{parentName:"tr",align:null},"a function signature. Supports wildcard characters, such as '*', 'Action","<","System.Int32",">"," On","*","'")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"mode"),(0,i.kt)("td",{parentName:"tr",align:null},"child elements"),(0,i.kt)("td",{parentName:"tr",align:null},"are"),(0,i.kt)("td",{parentName:"tr",align:null},"injection types, valid values are 'none' or 'proxy'. If not filled in or empty, take 'none'")))),(0,i.kt)("h3",{id:"building-workflow-related"},"Building workflow related"),(0,i.kt)("p",null,"The injection strategy file needs to be consistent with the App, that is, each independently released App must back up the injection strategy file used at that time. Just like every time you generate a dhao file, you need to use the AOT dll generated when building the App.\nWhen generating the dhao file, you must use the injection policy file backed up when building the App. If an error injection strategy file is used, an incorrect dhao file will be generated, which may cause the wrong logic to run or even crash!"))}s.isMDXComponent=!0}}]);