const CACHE_VERSION = 'v1.0.1';
const CACHE_NAME = `btq-cache-${CACHE_VERSION}`;

const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/btq-icon-192.png',
  '/icons/btq-icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_RESOURCES);
    })
  );
  // Activate new service worker immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Delete old version caches
            return cacheName.startsWith('btq-cache-') && cacheName !== CACHE_NAME;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
  // Claim all clients immediately
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();

        // Update cache
        if (event.request.method === 'GET') {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request);
      })
  );
});