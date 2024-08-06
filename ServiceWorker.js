const cacheName = "DefaultCompany-Plank Pushers-0.4";
const contentToCache = [
    "Build/build.loader.js",
    "Build/30fad2ef5e2678905ddebba07fd2f999.js",
    "Build/dfe9bff2c690e865b3a0aef47bba01b7.data",
    "Build/95d12a16127a965330b096d66bdfafe8.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    

e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name !== cacheName;
          })
          .map((name) => {
            console.log("[Service Worker] Deleting old cache:", name);
            return caches.delete(name);
          })
      );
    })
  );
  
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
