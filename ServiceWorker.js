const cacheName = "DefaultCompany-Plank Pushers-0.9";
const contentToCache = [
    "Build/test.loader.js",
    "Build/aade9736d3af46d0255cb0cbbc98d538.js",
    "Build/ac3634ca99d3f538a9c8d723995c6d80.data",
    "Build/4c01126906000431e0f09bf6354903fd.wasm",
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
