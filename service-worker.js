const CACHE = "sideline-lacrosse-stats-cache-v1";
const FILES = ["./","./index.html","./manifest.json","./assets/logo.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).catch(()=>{}));
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(net => {
      const copy = net.clone();
      caches.open(CACHE).then(cache => cache.put(e.request, copy)).catch(()=>{});
      return net;
    }).catch(() => caches.match("./index.html")))
  );
});
