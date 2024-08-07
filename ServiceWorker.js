const cacheName = "DefaultCompany-Plank Pushers-0.8";
const contentToCache = [
    "Build/build.loader.js",
    "Build/ef16dc947541906a9e05874f3f38ef8c.js",
    "Build/33dcaa1b46dac61063fb704af07d30bd.data",
    "Build/2a8d47682661cdeec822b21cc3e7a8c5.wasm",
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
