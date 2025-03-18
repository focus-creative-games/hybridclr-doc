"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7747],{3905:(t,a,n)=>{n.d(a,{Zo:()=>o,kt:()=>g});var e=n(7294);function r(t,a,n){return a in t?Object.defineProperty(t,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[a]=n,t}function l(t,a){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);a&&(e=e.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),n.push.apply(n,e)}return n}function p(t){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?l(Object(n),!0).forEach((function(a){r(t,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))}))}return t}function i(t,a){if(null==t)return{};var n,e,r=function(t,a){if(null==t)return{};var n,e,r={},l=Object.keys(t);for(e=0;e<l.length;e++)n=l[e],a.indexOf(n)>=0||(r[n]=t[n]);return r}(t,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(e=0;e<l.length;e++)n=l[e],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var m=e.createContext({}),d=function(t){var a=e.useContext(m),n=a;return t&&(n="function"==typeof t?t(a):p(p({},a),t)),n},o=function(t){var a=d(t.components);return e.createElement(m.Provider,{value:a},t.children)},k="mdxType",u={inlineCode:"code",wrapper:function(t){var a=t.children;return e.createElement(e.Fragment,{},a)}},c=e.forwardRef((function(t,a){var n=t.components,r=t.mdxType,l=t.originalType,m=t.parentName,o=i(t,["components","mdxType","originalType","parentName"]),k=d(n),c=r,g=k["".concat(m,".").concat(c)]||k[c]||u[c]||l;return n?e.createElement(g,p(p({ref:a},o),{},{components:n})):e.createElement(g,p({ref:a},o))}));function g(t,a){var n=arguments,r=a&&a.mdxType;if("string"==typeof t||r){var l=n.length,p=new Array(l);p[0]=c;var i={};for(var m in a)hasOwnProperty.call(a,m)&&(i[m]=a[m]);i.originalType=t,i[k]="string"==typeof t?t:r,p[1]=i;for(var d=2;d<l;d++)p[d]=n[d];return e.createElement.apply(null,p)}return e.createElement.apply(null,n)}c.displayName="MDXCreateElement"},795:(t,a,n)=>{n.r(a),n.d(a,{assets:()=>m,contentTitle:()=>p,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var e=n(7462),r=(n(7294),n(3905));const l={},p="Business Project Cases",i={unversionedId:"other/businesscase",id:"version-7.6.0/other/businesscase",title:"Business Project Cases",description:"There are currently more than a thousand domestic and foreign commercial games using HybridCLR, among which hundreds of commercial projects have been launched online (AppStore or Google Play).",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-7.6.0/other/businesscase.md",sourceDirName:"other",slug:"/other/businesscase",permalink:"/en/docs/7.6.0/other/businesscase",draft:!1,tags:[],version:"7.6.0",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/en/docs/7.6.0/intro"},next:{title:"\u65b0\u624b\u6559\u7a0b",permalink:"/en/docs/7.6.0/beginner"}},m={},d=[{value:"Proportion of HybridCLR used in recently launched commercial projects",id:"proportion-of-hybridclr-used-in-recently-launched-commercial-projects",level:2},{value:"Top 200 best-selling projects using HybridCLR",id:"top-200-best-selling-projects-using-hybridclr",level:2},{value:"top 500 free projects using HybridCLR",id:"top-500-free-projects-using-hybridclr",level:2},{value:"Projects using HybridCLR according to statistics from leading companies",id:"projects-using-hybridclr-according-to-statistics-from-leading-companies",level:2}],o={toc:d},k="wrapper";function u(t){let{components:a,...n}=t;return(0,r.kt)(k,(0,e.Z)({},o,n,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"business-project-cases"},"Business Project Cases"),(0,r.kt)("p",null,"There are currently more than a thousand domestic and foreign commercial games using HybridCLR, among which hundreds of commercial projects have been launched online (AppStore or Google Play).\nWe only count the commercial projects using the HybridCLR solution among the top 200 best-sellers and the top 500 free in China."),(0,r.kt)("h2",{id:"proportion-of-hybridclr-used-in-recently-launched-commercial-projects"},"Proportion of HybridCLR used in recently launched commercial projects"),(0,r.kt)("p",null,"We have collected data on 129 game apps in the top 200 best-selling lists of App Store on February 2, 2024. There are 65 models developed using Unity and 64 models developed using non-Unity.\nAmong the games using the Unity engine, 6 use HybridCLR technology, 40 use Lua, and 19 do not use hot updates."),(0,r.kt)("p",null,"Considering that the vast majority of the best-selling list is old games, we roughly estimate that new games account for 1/3, or about 60 games. Among them, Unity games accounted for nearly half, with 30 games.\nCalculated at 25% for apps that do not use hot update technology, among Unity games that use hot update technology, the proportion of using HybridCLR is approximately 26.7%."),(0,r.kt)("p",null,"Similarly, we counted the data of 326 game apps in the top 500 free list of App Store on February 2, 2024, except for the 326 game apps that are not on the best-selling list. Among them, there are 140 Unity games and 186 non-Unity games.\nAmong Unity games, 13 use HybridCLR hot update, 27 use Lua hot update, and 100 do not use hot update.\nAmong Unity games using hot update technology, the proportion of using HybridCLR is approximately 32.5%."),(0,r.kt)("p",null,"We can roughly conclude that among the latest and best-performing Unity game apps that use hot update technology, the proportion of using HybridCLR is between 25% and 35%."),(0,r.kt)("h2",{id:"top-200-best-selling-projects-using-hybridclr"},"Top 200 best-selling projects using HybridCLR"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"15 games use HybridCLR technology. ")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"appID"),(0,r.kt)("th",{parentName:"tr",align:null},"bundleID"),(0,r.kt)("th",{parentName:"tr",align:null},"game name"),(0,r.kt)("th",{parentName:"tr",align:null},"ranking"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"996509117"),(0,r.kt)("td",{parentName:"tr",align:null},"com.juzi.balls"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/996509117/country/cn"},"\u7403\u7403\u5927\u4f5c\u6218")),(0,r.kt)("td",{parentName:"tr",align:null},"64")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1278845241"),(0,r.kt)("td",{parentName:"tr",align:null},"com.yomob.yyzy"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1278845241/country/cn"},"\u6708\u5706\u4e4b\u591c")),(0,r.kt)("td",{parentName:"tr",align:null},"196")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6469103697"),(0,r.kt)("td",{parentName:"tr",align:null},"com.cyou.xxygb"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6469103697/country/cn"},"\u897f\u6e38\uff1a\u7b14\u7ed8\u897f\u884c")),(0,r.kt)("td",{parentName:"tr",align:null},"24")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"891616303"),(0,r.kt)("td",{parentName:"tr",align:null},"com.zengame.xzdd"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/891616303/country/cn"},"\u6307\u5c16\u56db\u5ddd\u9ebb\u5c06-\u4e3b\u64ad\u6700\u7231\u9ebb\u5c06")),(0,r.kt)("td",{parentName:"tr",align:null},"26")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6451241596"),(0,r.kt)("td",{parentName:"tr",align:null},"com.cmge.dpcq.ios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6451241596/country/cn"},"\u6597\u7834\u82cd\u7a79\uff1a\u5dc5\u5cf0\u5bf9\u51b3")),(0,r.kt)("td",{parentName:"tr",align:null},"34")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1037198513"),(0,r.kt)("td",{parentName:"tr",align:null},"com.sanguosha.sgsol"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1037198513/country/cn"},"\u4e09\u56fd\u6740OL")),(0,r.kt)("td",{parentName:"tr",align:null},"39")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6470348464"),(0,r.kt)("td",{parentName:"tr",align:null},"com.caohua.hymc"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6470348464/country/cn"},"\u8352\u91ce\u8ff7\u57ce-\u5e9f\u571f\u6c42\u751f")),(0,r.kt)("td",{parentName:"tr",align:null},"52")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6444853360"),(0,r.kt)("td",{parentName:"tr",align:null},"com.xxzyios.xh"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6444853360/country/cn"},"\u884c\u4fa0\u4ed7\u4e49\u4e94\u5343\u5e74-\u56fd\u98ce\u5272\u8349\u624b\u6e38")),(0,r.kt)("td",{parentName:"tr",align:null},"73")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1508509620"),(0,r.kt)("td",{parentName:"tr",align:null},"com.minigame.skyforce.os"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1508509620/country/cn"},"\u5b64\u72ec\u6218\u673a")),(0,r.kt)("td",{parentName:"tr",align:null},"88")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1562260653"),(0,r.kt)("td",{parentName:"tr",align:null},"com.zy.wqmt.cn"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1562260653/country/cn"},"\u65e0\u671f\u8ff7\u9014")),(0,r.kt)("td",{parentName:"tr",align:null},"106")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6448353442"),(0,r.kt)("td",{parentName:"tr",align:null},"com.ddsw.zombiewaves.zw"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6448353442/country/cn"},"\u624b\u673a\u53cd\u6050\u7279\u522b\u884c\u52a8")),(0,r.kt)("td",{parentName:"tr",align:null},"137")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6475003560"),(0,r.kt)("td",{parentName:"tr",align:null},"com.hero.rpg.xj52q"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6475003560/country/cn"},"\u661f\u964552\u533a")),(0,r.kt)("td",{parentName:"tr",align:null},"142")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6446756603"),(0,r.kt)("td",{parentName:"tr",align:null},"com.leiting.dragonraider"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6446756603/country/cn"},"\u98de\u5427\u9f99\u9a91\u58eb-\u4e1c\u65b9\u706b\u9f99")),(0,r.kt)("td",{parentName:"tr",align:null},"145")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1561085506"),(0,r.kt)("td",{parentName:"tr",align:null},"com.chillyroom.soulknightprequel"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1561085506/country/cn"},"\u5143\u6c14\u9a91\u58eb\u524d\u4f20")),(0,r.kt)("td",{parentName:"tr",align:null},"154")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6476655022"),(0,r.kt)("td",{parentName:"tr",align:null},"com.csbyios.game"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6476655022/country/cn"},"\u4f20\u4e16\u9738\u4e1a-\u6b63\u7248\u6388\u6743 \u590d\u53e4\u9ad8\u7206\u7aef\u6e38\u79fb\u690d")),(0,r.kt)("td",{parentName:"tr",align:null},"192")))),(0,r.kt)("h2",{id:"top-500-free-projects-using-hybridclr"},"top 500 free projects using HybridCLR"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"51 games use HybridCLR technology. ")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"appID"),(0,r.kt)("th",{parentName:"tr",align:null},"bundleID"),(0,r.kt)("th",{parentName:"tr",align:null},"game name"),(0,r.kt)("th",{parentName:"tr",align:null},"ranking"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1561085506"),(0,r.kt)("td",{parentName:"tr",align:null},"com.chillyroom.soulknightprequel"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1561085506/country/cn"},"\u5143\u6c14\u9a91\u58eb\u524d\u4f20")),(0,r.kt)("td",{parentName:"tr",align:null},"4")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1669193324"),(0,r.kt)("td",{parentName:"tr",align:null},"ioa.chenz.leisure.gn"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1669193324/country/cn"},"\u6211\u7684\u4f11\u95f2\u65f6\u5149")),(0,r.kt)("td",{parentName:"tr",align:null},"5")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6451466022"),(0,r.kt)("td",{parentName:"tr",align:null},"com.m76cf.kumqffwjv"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6451466022/country/cn"},"\u4e09\u56fd\u5427\u5144\u5f1f-\u4f11\u95f2\u5272\u8349\u89e3\u538b\u624b\u6e38")),(0,r.kt)("td",{parentName:"tr",align:null},"9")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1619727250"),(0,r.kt)("td",{parentName:"tr",align:null},"com.shengtiangames.clwg"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1619727250/country/cn"},"\u6f6e\u7075\u738b\u56fd\uff1a\u8d77\u6e90")),(0,r.kt)("td",{parentName:"tr",align:null},"13")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6451241596"),(0,r.kt)("td",{parentName:"tr",align:null},"com.cmge.dpcq.ios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6451241596/country/cn"},"\u6597\u7834\u82cd\u7a79\uff1a\u5dc5\u5cf0\u5bf9\u51b3")),(0,r.kt)("td",{parentName:"tr",align:null},"13")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6470348464"),(0,r.kt)("td",{parentName:"tr",align:null},"com.caohua.hymc"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6470348464/country/cn"},"\u8352\u91ce\u8ff7\u57ce-\u5e9f\u571f\u6c42\u751f")),(0,r.kt)("td",{parentName:"tr",align:null},"19")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6446756603"),(0,r.kt)("td",{parentName:"tr",align:null},"com.leiting.dragonraider"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6446756603/country/cn"},"\u98de\u5427\u9f99\u9a91\u58eb-\u4e1c\u65b9\u706b\u9f99")),(0,r.kt)("td",{parentName:"tr",align:null},"27")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6444853360"),(0,r.kt)("td",{parentName:"tr",align:null},"com.xxzyios.xh"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6444853360/country/cn"},"\u884c\u4fa0\u4ed7\u4e49\u4e94\u5343\u5e74-\u56fd\u98ce\u5272\u8349\u624b\u6e38")),(0,r.kt)("td",{parentName:"tr",align:null},"30")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6469103697"),(0,r.kt)("td",{parentName:"tr",align:null},"com.cyou.xxygb"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6469103697/country/cn"},"\u897f\u6e38\uff1a\u7b14\u7ed8\u897f\u884c")),(0,r.kt)("td",{parentName:"tr",align:null},"43")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1508509620"),(0,r.kt)("td",{parentName:"tr",align:null},"com.minigame.skyforce.os"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1508509620/country/cn"},"\u5b64\u72ec\u6218\u673a")),(0,r.kt)("td",{parentName:"tr",align:null},"45")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1576661186"),(0,r.kt)("td",{parentName:"tr",align:null},"com.xd.t3game"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1576661186/country/cn"},"\u706b\u529b\u82cf\u6253\uff08T3\uff09")),(0,r.kt)("td",{parentName:"tr",align:null},"72")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6448353442"),(0,r.kt)("td",{parentName:"tr",align:null},"com.ddsw.zombiewaves.zw"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6448353442/country/cn"},"\u624b\u673a\u53cd\u6050\u7279\u522b\u884c\u52a8")),(0,r.kt)("td",{parentName:"tr",align:null},"83")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1590274853"),(0,r.kt)("td",{parentName:"tr",align:null},"com.Sunborn.SnqxExilium"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1590274853/country/cn"},"\u5c11\u5973\u524d\u7ebf2\uff1a\u8ffd\u653e")),(0,r.kt)("td",{parentName:"tr",align:null},"93")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"891616303"),(0,r.kt)("td",{parentName:"tr",align:null},"com.zengame.xzdd"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/891616303/country/cn"},"\u6307\u5c16\u56db\u5ddd\u9ebb\u5c06-\u4e3b\u64ad\u6700\u7231\u9ebb\u5c06")),(0,r.kt)("td",{parentName:"tr",align:null},"112")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6449481979"),(0,r.kt)("td",{parentName:"tr",align:null},"com.honggame.yzmj.txzr"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6449481979/country/cn"},"\u5929\u9009\u4e4b\u4eba")),(0,r.kt)("td",{parentName:"tr",align:null},"112")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6450107254"),(0,r.kt)("td",{parentName:"tr",align:null},"com.qmjh.qmjhios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6450107254/country/cn"},"\u5168\u6c11\u6c5f\u6e56-\u70ed\u8840\u6c5f\u6e56\u6b63\u7248\u624b\u6e38")),(0,r.kt)("td",{parentName:"tr",align:null},"115")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1544895560"),(0,r.kt)("td",{parentName:"tr",align:null},"com.dgames.g15002002.apple"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1544895560/country/cn"},"\u5bbf\u547d\u56de\u54cd\uff1a\u5f26\u4e0a\u7684\u53f9\u606f")),(0,r.kt)("td",{parentName:"tr",align:null},"122")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6476655022"),(0,r.kt)("td",{parentName:"tr",align:null},"com.csbyios.game"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6476655022/country/cn"},"\u4f20\u4e16\u9738\u4e1a-\u6b63\u7248\u6388\u6743 \u590d\u53e4\u9ad8\u7206\u7aef\u6e38\u79fb\u690d")),(0,r.kt)("td",{parentName:"tr",align:null},"144")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6449188289"),(0,r.kt)("td",{parentName:"tr",align:null},"com.zhaimiao.ygl"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6449188289/country/cn"},"\u6447\u5149\u5f55\uff1a\u4e71\u4e16\u516c\u4e3b")),(0,r.kt)("td",{parentName:"tr",align:null},"148")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1546338773"),(0,r.kt)("td",{parentName:"tr",align:null},"badminton.blitz.sports.free.game.cn.ios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1546338773/country/cn"},"\u51b3\u6218\u7fbd\u6bdb\u7403 - \u8054\u673a\u5bf9\u6218")),(0,r.kt)("td",{parentName:"tr",align:null},"149")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6475003560"),(0,r.kt)("td",{parentName:"tr",align:null},"com.hero.rpg.xj52q"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6475003560/country/cn"},"\u661f\u964552\u533a")),(0,r.kt)("td",{parentName:"tr",align:null},"160")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1434798394"),(0,r.kt)("td",{parentName:"tr",align:null},"com.jys.qipa"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1434798394/country/cn"},"\u5947\u8469\u6218\u6597\u5bb6")),(0,r.kt)("td",{parentName:"tr",align:null},"164")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1102002812"),(0,r.kt)("td",{parentName:"tr",align:null},"com.zongyi.ndoudizhu"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1102002812/country/cn"},"\u6597\u5730\u4e3b\u7ecf\u5178\u7248-\u5355\u673a\u6e38\u620f\u6b22\u4e50\u7248\u68cb\u724c\u6b8b\u5c40")),(0,r.kt)("td",{parentName:"tr",align:null},"173")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1663156162"),(0,r.kt)("td",{parentName:"tr",align:null},"com.youzu.shjh.ios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1663156162/country/cn"},"\u5c71\u6d77\u955c\u82b1-\u5f52\u6765")),(0,r.kt)("td",{parentName:"tr",align:null},"173")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1594550177"),(0,r.kt)("td",{parentName:"tr",align:null},"com.sfgame.zq"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1594550177/country/cn"},"\u53f0\u7403\u738b\u8005-3D\u771f\u4eba\u7248")),(0,r.kt)("td",{parentName:"tr",align:null},"175")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6452948314"),(0,r.kt)("td",{parentName:"tr",align:null},"com.qulu.yongzhemijing.yzkdk"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6452948314/country/cn"},"\u52c7\u8005\u65e0\u654c-\u5272\u8349\u4f11\u95f2\u52a8\u4f5c\u6e38\u620f")),(0,r.kt)("td",{parentName:"tr",align:null},"186")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1583935305"),(0,r.kt)("td",{parentName:"tr",align:null},"com.bkkj.js1"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1583935305/country/cn"},"\u6715\u7684\u6c5f\u5c712\uff1a\u4e09\u56fd\u7b56\u7565\u56fd\u6218")),(0,r.kt)("td",{parentName:"tr",align:null},"192")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1585105852"),(0,r.kt)("td",{parentName:"tr",align:null},"com.feelingtouch.zfsniper.cn"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1585105852/country/cn"},"\u50f5\u5c38\u524d\u7ebf3D-\u672b\u65e5\u72d9\u51fb\u6218\u4e89\u624b\u6e38")),(0,r.kt)("td",{parentName:"tr",align:null},"196")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1507863649"),(0,r.kt)("td",{parentName:"tr",align:null},"com.yongshi.tenojo.ios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1507863649/country/cn"},"\u6df1\u7a7a\u4e4b\u773c")),(0,r.kt)("td",{parentName:"tr",align:null},"203")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1634133454"),(0,r.kt)("td",{parentName:"tr",align:null},"com.da.china"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1634133454/country/cn"},"\u98de\u9f99\u5c9b\u5386\u9669\u8bb0")),(0,r.kt)("td",{parentName:"tr",align:null},"209")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1523017982"),(0,r.kt)("td",{parentName:"tr",align:null},"com.leiting.mole"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1523017982/country/cn"},"\u6469\u5c14\u5e84\u56ed")),(0,r.kt)("td",{parentName:"tr",align:null},"212")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6447148068"),(0,r.kt)("td",{parentName:"tr",align:null},"com.yofijoy.fcdjios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6447148068/country/cn"},"\u65b9\u5bf8\u5bf9\u51b3")),(0,r.kt)("td",{parentName:"tr",align:null},"212")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1629567830"),(0,r.kt)("td",{parentName:"tr",align:null},"com.gwstudio.pixelpeerless.cn"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1629567830/country/cn"},"\u52c7\u8005\u79d8\u5883")),(0,r.kt)("td",{parentName:"tr",align:null},"218")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1562260653"),(0,r.kt)("td",{parentName:"tr",align:null},"com.zy.wqmt.cn"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1562260653/country/cn"},"\u65e0\u671f\u8ff7\u9014")),(0,r.kt)("td",{parentName:"tr",align:null},"241")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6446361475"),(0,r.kt)("td",{parentName:"tr",align:null},"com.zhsm.sjxh.cn.ios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6446361475/country/cn"},"\u6218\u706b\u4f7f\u547d")),(0,r.kt)("td",{parentName:"tr",align:null},"246")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1517370204"),(0,r.kt)("td",{parentName:"tr",align:null},"com.rsg.wdwtApp"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1517370204/country/cn"},"\u95ea\u4eae\u7684\u4f60-\u5a31\u4e50\u5708\u517b\u6210\u6e38\u620f")),(0,r.kt)("td",{parentName:"tr",align:null},"247")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1641223717"),(0,r.kt)("td",{parentName:"tr",align:null},"com.saiyun.wshty"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1641223717/country/cn"},"\u6211\u662f\u822a\u5929\u5458")),(0,r.kt)("td",{parentName:"tr",align:null},"257")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1562937112"),(0,r.kt)("td",{parentName:"tr",align:null},"com.mzzcnew.0414"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1562937112/country/cn"},"\u672b\u65e5\u4e4b\u57ce-\u7b56\u7565\u5854\u9632 \u5361\u724c\u653e\u7f6e")),(0,r.kt)("td",{parentName:"tr",align:null},"258")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6443768967"),(0,r.kt)("td",{parentName:"tr",align:null},"com.racoondigi.jqys"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6443768967/country/cn"},"\u8857\u7403\u827a\u672f-\u91cd\u65b0\u5b9a\u4e49\u8857\u7403\u624b\u6e38")),(0,r.kt)("td",{parentName:"tr",align:null},"259")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1636463825"),(0,r.kt)("td",{parentName:"tr",align:null},"com.leiting.picatown"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1636463825/country/cn"},"\u76ae\u5361\u5802\u4e4b\u68a6\u60f3\u8d77\u6e90")),(0,r.kt)("td",{parentName:"tr",align:null},"268")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1037198513"),(0,r.kt)("td",{parentName:"tr",align:null},"com.sanguosha.sgsol"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1037198513/country/cn"},"\u4e09\u56fd\u6740OL")),(0,r.kt)("td",{parentName:"tr",align:null},"269")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1326740391"),(0,r.kt)("td",{parentName:"tr",align:null},"com.setagame.survivordangerzone"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1326740391/country/cn"},"\u5e78\u5b58\u8005\u5371\u57ce-\u672b\u65e5\u751f\u5b58\u50f5\u5c38\u6e38\u620f")),(0,r.kt)("td",{parentName:"tr",align:null},"285")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6447829907"),(0,r.kt)("td",{parentName:"tr",align:null},"com.hoolai.qsmy.ios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6447829907/country/cn"},"\u79e6\u65f6\u660e\u6708\uff1a\u6ca7\u6d77")),(0,r.kt)("td",{parentName:"tr",align:null},"311")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6443928984"),(0,r.kt)("td",{parentName:"tr",align:null},"com.hiplay.mergeland.cn"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6443928984/country/cn"},"\u7cd6\u679c\u7cbe\u7075\u4f20\u5947-\u7231\u4e3d\u4e1d\u5408\u5408\u4ed9\u5883")),(0,r.kt)("td",{parentName:"tr",align:null},"320")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6450256080"),(0,r.kt)("td",{parentName:"tr",align:null},"com.altgsqj.yhsj"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6450256080/country/cn"},"MU\u53d8\u6001\u7248\uff1a\u6c38\u6052\u4e16\u7eaa")),(0,r.kt)("td",{parentName:"tr",align:null},"358")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1673645173"),(0,r.kt)("td",{parentName:"tr",align:null},"com.ra.xkzhanz.ios"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1673645173/country/cn"},"\u865a\u7a7a\u6218\u4e89")),(0,r.kt)("td",{parentName:"tr",align:null},"390")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1448486874"),(0,r.kt)("td",{parentName:"tr",align:null},"com.bilibili.queji"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1448486874/country/cn"},"\u96c0\u59ec\u9ebb\u5c06")),(0,r.kt)("td",{parentName:"tr",align:null},"417")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1667162072"),(0,r.kt)("td",{parentName:"tr",align:null},"com.wingjoy.coderustle2"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1667162072/country/cn"},"\u4e0d\u4e00\u6837\u4f20\u8bf4 2")),(0,r.kt)("td",{parentName:"tr",align:null},"418")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6471483492"),(0,r.kt)("td",{parentName:"tr",align:null},"com.saiyun3.wjmc"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6471483492/country/cn"},"\u8d85\u71c3\u4e4b\u6218-3D\u5272\u8349")),(0,r.kt)("td",{parentName:"tr",align:null},"428")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1641048780"),(0,r.kt)("td",{parentName:"tr",align:null},"com.yoozoo.ik.cn"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1641048780/country/cn"},"\u6218\u706b\u4e0e\u6c38\u6052")),(0,r.kt)("td",{parentName:"tr",align:null},"451")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6469281520"),(0,r.kt)("td",{parentName:"tr",align:null},"com.man4fun.lsz"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/6469281520/country/cn"},"\u7409\u751f\u4f20")),(0,r.kt)("td",{parentName:"tr",align:null},"490")))),(0,r.kt)("h2",{id:"projects-using-hybridclr-according-to-statistics-from-leading-companies"},"Projects using HybridCLR according to statistics from leading companies"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Company"),(0,r.kt)("th",{parentName:"tr",align:null},"Online Project"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"funplus"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://play.google.com/store/apps/details?id=com.gm11.bingocraze&hl=en_US"},"Bingo Aloha"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Gibbit"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.qimai.cn/app/rank/appid/1434798394/country/cn"},"Strange Combatant"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Sunborn"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://gf2.sunborngame.com/index"},"Girls\u2019 Frontline 2"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Explosion"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.taptap.cn/app/275896/topic"},"Wandering Earth"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\u7545\u6e38"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.haikyu-flyhigh.jp/"},"\u30cf\u30a4\u30ad\u30e5-!!FLY HIGH"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\u7545\u6e38"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://www.jumpmoba.com/en"},"JUMP:\u7fa4\u661f\u96c6\u7ed3 "))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"NetEase"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://yaotai.163.com/"},"Yaotai"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Baidu"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://vr.baidu.com/product/xirang"},"Xirang"))))))}u.isMDXComponent=!0}}]);