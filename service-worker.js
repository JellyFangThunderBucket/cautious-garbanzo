// Minimal service worker for offline caching (cache-first strategy).
const CACHE_NAME = 'example-pwa-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/logo.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/offline.html'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cached) => {
      if (cached) return cached;
      return fetch(evt.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            if (evt.request.method === 'GET' && evt.request.url.startsWith(self.location.origin)) {
              cache.put(evt.request, response.clone());
            }
            return response;
          });
        })
        .catch(() => {
          if (evt.request.mode === 'navigate' || (evt.request.headers.get('accept') || '').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
    })
  );
});
