(function(t){function e(e){for(var o,r,c=e[0],u=e[1],s=e[2],l=0,f=[];l<c.length;l++)r=c[l],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&f.push(a[r][0]),a[r]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);h&&h(e);while(f.length)f.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(o=!1)}o&&(i.splice(e--,1),t=u(u.s=n[0]))}return t}var o={},r={app:0},a={app:0},i=[];function c(t){return u.p+"js/"+({about:"about"}[t]||t)+"."+{about:"001f365f"}[t]+".js"}function u(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n={about:1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise((function(e,n){for(var o="css/"+({about:"about"}[t]||t)+"."+{about:"c515e420"}[t]+".css",a=u.p+o,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===o||l===a))return e()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){s=f[c],l=s.getAttribute("data-href");if(l===o||l===a)return e()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=e,h.onerror=function(e){var o=e&&e.target&&e.target.src||a,i=new Error("Loading CSS chunk "+t+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete r[t],h.parentNode.removeChild(h),n(i)},h.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(h)})).then((function(){r[t]=0})));var o=a[t];if(0!==o)if(o)e.push(o[2]);else{var i=new Promise((function(e,n){o=a[t]=[e,n]}));e.push(o[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(t);var f=new Error;s=function(e){l.onerror=l.onload=null,clearTimeout(h);var n=a[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+o+": "+r+")",f.name="ChunkLoadError",f.type=o,f.request=r,n[1](f)}a[t]=void 0}};var h=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},u.m=t,u.c=o,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)u.d(n,o,function(e){return t[e]}.bind(null,o));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/",u.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var f=0;f<s.length;f++)e(s[f]);var h=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Header")],1)},a=[],i=n("5530"),c=(n("d3b7"),n("2f62")),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"nav"}},[n("b-navbar",{attrs:{type:"dark",variant:"dark"}},[n("b-navbar-nav",[n("b-nav-item",[n("router-link",{attrs:{to:"/"}},[t._v("Vesti")])],1),!1===t.logedin?n("b-nav-item",[n("router-link",{attrs:{to:"/login"}},[t._v("Login")])],1):t._e(),t.logedin&&"ADMIN"===t.tip?n("b-nav-item",[n("router-link",{attrs:{to:"/admin"}},[t._v("Users")])],1):t._e()],1),n("b-navbar-nav",{staticClass:"ml-auto"},[t.logedin?n("b-button",{on:{click:t.clear}},[t._v("log out")]):t._e(),t.logedin?n("h1",[t._v("Hi: "+t._s(t.user.email))]):t._e()],1)],1),n("router-view")],1)},s=[],l=(n("ac1f"),n("1276"),{name:"Header",data:function(){return{logedin:!1,user:null,tip:""}},beforeUpdate:function(){if(""!==localStorage.getItem("jwt")&&null!==localStorage.getItem("jwt")){this.logedin=!0;var t=localStorage.getItem("jwt"),e=JSON.parse(atob(t.split(".")[1]));this.user=e.user,this.tip=this.user.tip}},methods:{clear:function(){localStorage.setItem("jwt",""),this.logedin=!1,this.$router.push({name:"Login"})}}}),f=l,h=n("2877"),d=Object(h["a"])(f,u,s,!1,null,"7199f35b",null),p=d.exports,m={name:"App",components:{Header:p},methods:Object(i["a"])({},Object(c["b"])(["load_news"])),mounted:function(){this.load_news(),fetch("http://localhost:8080/cookie",{method:"get"}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){""!==localStorage.getItem("cookie")&&null!==localStorage.getItem("cookie")||localStorage.setItem("cookie",t.cookie)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))}},w=m,g=(n("034f"),Object(h["a"])(w,r,a,!1,null,null,null)),b=g.exports,v=(n("3ca3"),n("ddb0"),n("8c4f")),_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home container"},[t.loged?n("b-button",{attrs:{variant:"primary"},on:{click:t.add}},[t._v("AddNews")]):t._e(),t._l(t.news,(function(e){return n("div",{key:e.id,staticClass:"border"},[n("h1",[t._v(t._s(e.title))]),n("p",[t._v(t._s(e.content.substring(0,24)+"..."))]),n("b-button",{attrs:{variant:"dark",id:e.id},on:{click:function(e){return t.preview(e)}}},[t._v("Opsirnije")]),t.loged?n("b-button",{attrs:{variant:"primary",id:e.id},on:{click:function(e){return t.edit_news(e)}}},[t._v("Edit")]):t._e(),t.loged?n("b-button",{attrs:{variant:"danger",id:e.id},on:{click:function(e){return t.del_news(e)}}},[t._v("Delete")]):t._e(),n("p",[t._v("by:"+t._s(e.author))])],1)}))],2)},y=[],j={name:"Home",data:function(){return{fields:["author","title","content","actions"],news:[],loged:!1}},methods:Object(i["a"])(Object(i["a"])(Object(i["a"])({},Object(c["b"])(["change_news"])),{},{add:function(){this.$router.push({name:"AddNews"})}},Object(c["b"])(["delete_news"])),{},{preview:function(t){var e=this,n=t.currentTarget.id,o=localStorage.getItem("cookie"),r=JSON.stringify({value:o,news:n});fetch("http://localhost:8080/api/check-cookie",{method:"post",headers:{"Content-Type":"application/json"},body:r}).then((function(t){if(!t.ok)throw t;return t})).then((function(t){console.log(t);for(var o=0;o<e.news.length;o++)if(e.news[o].id===parseInt(n)){e.news[o].count++;break}e.$router.push("/preview-news/".concat(n))})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t+" error msg")})):alert(t+" error")}))},edit_news:function(t){var e=t.currentTarget.id;this.$router.push("/edit-news/".concat(e))},del_news:function(t){var e=t.currentTarget.id;this.delete_news(e).then((function(){fetch("http://localhost:8080/api/comments/".concat(e),{method:"delete"}).then((function(t){if(!t.ok)throw t;return t})).then((function(t){console.log(t)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))}))}}),mounted:function(){this.news=this.$store.state.news,""!==localStorage.getItem("jwt")&&null!=localStorage.getItem("jwt")&&(this.loged=!0)}},k=j,x=Object(h["a"])(k,_,y,!1,null,null,null),S=x.exports;o["default"].use(v["a"]);var O=[{path:"/",name:"Home",component:S},{path:"/login",name:"Login",component:function(){return n.e("about").then(n.bind(null,"a55b"))}},{path:"/admin",name:"Admin",component:function(){return n.e("about").then(n.bind(null,"3530"))}},{path:"/add-news",name:"AddNews",component:function(){return n.e("about").then(n.bind(null,"8628"))}},{path:"/preview-news/:id",name:"PreviewNews",component:function(){return n.e("about").then(n.bind(null,"5237"))}},{path:"/new-user",name:"NewUser",component:function(){return n.e("about").then(n.bind(null,"5e8a"))}},{path:"/edit-user/:id",name:"EditUser",component:function(){return n.e("about").then(n.bind(null,"fe57"))}},{path:"/edit-news/:id",name:"EditNews",component:function(){return n.e("about").then(n.bind(null,"ff03"))}},{path:"/add-comment/:id",name:"AddComment",component:function(){return n.e("about").then(n.bind(null,"e312"))}},{path:"*",name:"PageNotFound",component:function(){return n.e("about").then(n.bind(null,"a5b5"))}}],A=new v["a"]({mode:"history",base:"/",routes:O}),I=A;n("a434"),n("b0c0");o["default"].use(c["a"]);var C=new c["a"].Store({state:{users:[],news:[],comments:[]},mutations:{set_comments:function(t,e){t.comments=e},add_comment:function(t,e){t.comments.push(e)},set_users:function(t,e){t.users=e},add_user:function(t,e){t.users.push(e)},remove_user:function(t,e){for(var n=0;n<t.users.length;n++)if(t.users[n].id===e){t.users.splice(n,1);break}},update_user:function(t,e){for(var n=0;n<t.users.length;n++)if(t.users[n].id===JSON.parse(e.id)){t.users[n].email=e.user.email,t.users[n].password=e.user.password,t.users[n].tip=e.user.tip,t.users[n].name=e.user.name,t.users[n].surname=e.user.surname;break}},set_news:function(t,e){t.news=e},add_news:function(t,e){t.news.push(e)},remove_news:function(t,e){for(var n=0;n<t.news.length;n++)if(t.news[n].id===e){t.news.splice(n,1);break}},update_news:function(t,e){for(var n=0;n<t.news.length;n++)if(t.news[n].id===JSON.parse(e.id)){t.news[n].author=e.news.author,t.news[n].title=e.news.title,t.news[n].content=e.news.content,t.news[n].category=e.news.category;break}}},actions:{load_comments:function(t,e){var n=t.commit;fetch("http://localhost:8080/api/comment/".concat(e),{method:"get"}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){n("set_comments",t)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))},new_comment:function(t,e){var n=t.commit;fetch("http://localhost:8080/api/comments",{method:"post",headers:{"Content-Type":"application/json"},body:e}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){n("add_comment",t)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t+" error msg")})):alert(t+" error")}))},load_users:function(t){var e=t.commit;fetch("http://localhost:8080/api/users",{method:"get",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){e("set_users",t)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t+" xd")})):alert(t)}))},delete_user:function(t,e){var n=t.commit;fetch("http://localhost:8080/api/user/".concat(e),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){n("remove_user",t.id)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))},new_user:function(t,e){var n=t.commit;fetch("http://localhost:8080/api/users",{method:"post",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:e}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){n("add_user",t)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))},change_user:function(t,e){var n=t.commit;fetch("http://localhost:8080/api/user/".concat(e.id),{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:e.user}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){n("update_user",{id:e.id,user:t})})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))},load_news:function(t){var e=t.commit;fetch("http://localhost:8080/api/news",{method:"get"}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){e("set_news",t)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))},delete_news:function(t,e){var n=t.commit;fetch("http://localhost:8080/api/new/".concat(e),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){n("remove_news",t.id)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))},new_news:function(t,e){var n=t.commit;fetch("http://localhost:8080/api/news",{method:"post",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:e}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){n("add_news",t)})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))},change_news:function(t,e){var n=t.commit;fetch("http://localhost:8080/api/new/".concat(e.id),{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:e.news}).then((function(t){if(!t.ok)throw t;return t.json()})).then((function(t){n("update_news",{id:e.id,news:t})})).catch((function(t){"function"===typeof t.text?t.text().then((function(t){alert(t)})):alert(t)}))}}}),N=n("5f5b");n("f9e3"),n("2dd8");o["default"].use(N["a"]),o["default"].config.productionTip=!1,new o["default"]({router:I,store:C,render:function(t){return t(b)}}).$mount("#app")},"85ec":function(t,e,n){}});
//# sourceMappingURL=app.6b7aba1e.js.map