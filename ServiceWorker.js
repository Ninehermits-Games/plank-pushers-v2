const cacheName = "DefaultCompany-Plank Pushers-0.7";
const contentToCache = [
  "Build/build.loader.js",
  "Build/8cb808cf1d5d11a6e827a997e4b5729b.js",
  "Build/485def4b013e061c871b1bc47d8434a4.data",
  "Build/61f0ecb6371871edcb7d2ce2dc77f24d.wasm",
  "TemplateData/style.css",
];

// self.addEventListener('install', function (e) {
//     console.log('[Service Worker] Install');

// 	e.waitUntil(
// 		caches.keys().then((cacheNames) => {
// 		  return Promise.all(
// 			cacheNames
// 			  .filter((name) => {
// 				return name !== cacheName;
// 			  })
// 			  .map((name) => {
// 				console.log("[Service Worker] Deleting old cache:", name);
// 				return caches.delete(name);
// 			  })
// 		  );
// 		})
// 	);

//     e.waitUntil((async function () {
//       const cache = await caches.open(cacheName);
//       console.log('[Service Worker] Caching all: app shell and content');
//       await cache.addAll(contentToCache);
//     })());
// });

// self.addEventListener('fetch', function (e) {
//     e.respondWith((async function () {
//       let response = await caches.match(e.request);
//       console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
//       if (response) { return response; }

//       response = await fetch(e.request);
//       const cache = await caches.open(cacheName);
//       console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
//       cache.put(e.request, response.clone());
//       return response;
//     })());
// });

self.addEventListener("install", (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
