var serviceWorkerOption = {"assets":["/vendor.bundle.js","/main.bundle.js","/polyfills.bundle.js"]};
        
        !function(e){function n(t){if(s[t])return s[t].exports;var o=s[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var s={};n.m=e,n.c=s,n.d=function(e,s,t){n.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:t})},n.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(s,"a",s),s},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=0)}([function(e,n,s){"use strict";function t(e,n){return n.some(function(n){return e.indexOf(n)>-1})}Object.defineProperty(n,"__esModule",{value:!0});var o=s(1),i=["localhost","localhost:3000","cmuartfab.github.io/social-vr"];self.addEventListener("install",function(e){e.waitUntil(caches.open("svr-sw-001").then(function(e){return e.addAll(o.default)}).catch(function(e){return console.log("error",e)}))}),self.addEventListener("fetch",function(e){var n=e.request;t(n.url,i)&&e.respondWith(caches.match(e.request).then(function(e){return e||fetch(n)}).catch(function(e){return console.log("fetch error",e)}))})},function(e,n,s){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=location.pathname,o=t.substring(0,t.lastIndexOf("sw.js")),i=["assets/icons/audio_filled.png","assets/icons/back_filled.png","assets/icons/door_filled.png","assets/icons/home_filled.png","assets/icons/home.png","assets/icons/icon-home.png","assets/icons/image_filled.png","assets/icons/link_filled.png","assets/icons/room-pink.png","assets/icons/room.png","assets/icons/text_filled.png","assets/icons/view-preview-accent.png","assets/icons/view-preview.png","assets/icons/view-toggle-2d-accent.png","assets/icons/view-toggle-2d.png","assets/icons/view-toggle-3d-accent.png","assets/icons/view-toggle-3d.png","assets/images/default-background.png","assets/images/color_ball.jpg"],c=[o,"index.html","manifest.json","favicon.ico","polyfills.bundle.js","vendor.bundle.js","main.bundle.js"],r=i.concat(c);n.default=r}]);
//# sourceMappingURL=0.map