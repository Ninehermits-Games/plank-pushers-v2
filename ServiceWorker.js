const cacheName = "DefaultCompany-Plank Pushers-0.1";
const contentToCache = [
    "Build/build.loader.js",
    "Build/5ce7dca27d95d0c76f01b4cd7ca45024.js.unityweb",
    "Build/d437793e340e61a9076ca1eb48cd9a3d.data.unityweb",
    "Build/561624f9d8cb9d606d3a0fc9f960144b.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
