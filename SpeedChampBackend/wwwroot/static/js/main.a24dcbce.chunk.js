(this["webpackJsonpspeedchamp-frontend"]=this["webpackJsonpspeedchamp-frontend"]||[]).push([[0],{18:function(e,t,n){"use strict";(function(e){var c=n(6),a=n.n(c),r=n(2),s=n(19),o=n(8),i=n(3),d=n(7),l=n.n(d),u=n(4),j=n(0),f=[{value:2e7,label:"20 MB"}],x="https://speedchamp.org";t.a=function(){var t=Object(i.useState)({size:f[0].value}),n=Object(o.a)(t,2),c=n[0],d=n[1],b=Object(i.useState)({duration:void 0,upload:void 0,download:void 0}),p=Object(o.a)(b,2),h=p[0],O=p[1],v=function(){for(var e=new ArrayBuffer(c.size),t=new Uint8Array(e),n=0;n<t.length;n++)t[n]=n%256;return t},m=function(){var t=Object(s.a)(a.a.mark((function t(){var n,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=v(),c=new Date,t.next=4,l.a.get("".concat(x,"/down"),{onDownloadProgress:function(e){O((function(t){return Object(r.a)(Object(r.a)({},t),{},{download:w(e,c)})}))}});case 4:l.a.post("".concat(x,"/up"),e.from(n),{headers:{"Content-Type":"text/octet-stream"},onUploadProgress:function(e){O((function(t){return Object(r.a)(Object(r.a)({},t),{},{upload:w(e,c)})}))}}).then((function(e){}));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w=function(e,t){var n=new Date;return console.log(e,t),e.loaded/((n-t)/1e3)/1024/1024*8};return Object(j.jsxs)("div",{className:"mx-auto w-3/5 space-y-12",children:[Object(j.jsx)("h1",{className:"text-4xl font-bold text-center mt-6",children:"SpeedChamp"}),Object(j.jsxs)("div",{className:"text-center space-y-3",children:[Object(j.jsx)("button",{className:"px-6 py-3 text-center bg-blue-600 font-bold text-white rounded",onClick:function(){return m()},children:"Speedtest starten"}),Object(j.jsx)("select",{value:c.size,onChange:function(e){return d(Object(r.a)(Object(r.a)({},c),{},{size:e.target.value}))},className:"block mx-auto",children:f.map((function(e){return Object(j.jsx)("option",{value:e.value,children:e.label},e.value)}))})]}),Object(j.jsxs)("div",{className:"grid grid-cols-3 gap-6 text-center",children:[Object(j.jsx)(u.a,{prefix:"Ping",suffix:"ms",children:"-"}),Object(j.jsx)(u.a,{prefix:"Download",suffix:"Mbit/s",children:h.download?Object(j.jsx)("span",{children:h.download.toFixed(2)}):"-"}),Object(j.jsx)(u.a,{prefix:"Upload",suffix:"Mbit/s",children:h.upload?Object(j.jsx)("span",{children:h.upload.toFixed(2)}):"-"})]}),!!h.duration&&Object(j.jsxs)("div",{className:"text-center",children:["Dauer",Object(j.jsxs)("div",{className:"text-3xl font-bold",children:[h.duration/1e3,"s"]})]})]})}}).call(this,n(26).Buffer)},20:function(e,t,n){"use strict";n.r(t);n(3);var c=n(17),a=n.n(c),r=(n(25),n(18)),s=n(0);a.a.render(Object(s.jsx)(r.a,{}),document.getElementById("root"))},25:function(e,t,n){},4:function(e,t,n){"use strict";var c=n(0);t.a=function(e){var t=e.prefix,n=e.children,a=e.suffix;return Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{className:"font-bold",children:t}),Object(c.jsx)("p",{className:"font-bold text-3xl my-3",children:n}),Object(c.jsx)("p",{children:a})]})}}},[[20,1,2]]]);
//# sourceMappingURL=main.a24dcbce.chunk.js.map