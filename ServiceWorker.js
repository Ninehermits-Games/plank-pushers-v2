const cacheName = "DefaultCompany-Plank Pushers-0.9";
const contentToCache = [
    "Build/build.loader.js",
    "Build/ef16dc947541906a9e05874f3f38ef8c.js",
    "Build/11b3a584a066ff45fbd664d7980d6610.data",
    "Build/b07ce829252ec2d96c86ec3483aabc74.wasm",
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
