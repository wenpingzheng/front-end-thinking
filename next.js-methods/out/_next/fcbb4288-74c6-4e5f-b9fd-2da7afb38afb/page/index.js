
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports=webpackJsonp([4],{106:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof fetch?fetch.bind():function(e,t){return t=t||{},new Promise(function(n,r){function u(){var e,t=[],n=[],r={};return o.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm,function(u,o,s){t.push(o=o.toLowerCase()),n.push([o,s]),e=r[o],r[o]=e?e+","+s:s}),{ok:1==(o.status/200|0),status:o.status,statusText:o.statusText,url:o.responseURL,clone:u,text:function(){return Promise.resolve(o.responseText)},json:function(){return Promise.resolve(o.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([o.response]))},headers:{keys:function(){return t},entries:function(){return n},get:function(e){return r[e.toLowerCase()]},has:function(e){return e.toLowerCase()in r}}}}var o=new XMLHttpRequest;o.open(t.method||"get",e);for(var s in t.headers)o.setRequestHeader(s,t.headers[s]);o.withCredentials="include"==t.credentials,o.onload=function(){n(u())},o.onerror=r,o.send(t.body)})};t.default=r},203:function(e,t,n){e.exports=n(204)},204:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(32),o=r(u),s=n(38),a=r(s),l=n(2),c=r(l),f=n(101),i=r(f),d=n(100),p=r(d),h=n(205),m=r(h),w=function(e){return c.default.createElement("div",null,c.default.createElement(p.default,null),c.default.createElement(i.default,{href:"/about"},c.default.createElement("button",null,"Go to About Page")),c.default.createElement("p",null,"Hello Next.js"),c.default.createElement("ul",null,e.shows.map(function(e){var t=e.show;return c.default.createElement("li",{key:t.id},c.default.createElement(i.default,{as:"/p/"+t.id,href:"/post?id="+t.id},c.default.createElement("a",null,t.name)))})))};w.getInitialProps=(0,a.default)(o.default.mark(function e(){var t,n;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,m.default)("https://api.tvmaze.com/search/shows?q=batman");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,console.log("Show length:"+n.length),e.abrupt("return",{shows:n});case 8:case"end":return e.stop()}},e,void 0)})),t.default=w},205:function(e,t,n){e.exports=window.fetch||(window.fetch=n(106).default||n(106))}},[203]);
            return { page: comp.default }
          })
        