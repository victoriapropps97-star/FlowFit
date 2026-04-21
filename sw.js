// FlowFit Service Worker — Offline-first caching strategy
const CACHE_NAME = 'flowfit-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/assets/buddy1.png',
  '/assets/buddy2.png',
  '/assets/buddy3.png',
  '/data/workouts.json',
  '/data/nutrition.json',
  '/data/ingredients.json',
  '/data/cycle.json',
  '/data/symptoms.json'
];

// Install: pre-cache all critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching critical assets');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve from cache first, fall back to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // For Google Fonts: network-first (they change rarely but need initial fetch)
  if (event.request.url.includes('fonts.googleapis.com') || event.request.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        }).catch(() => {
          return cache.match(event.request);
        });
      })
    );
    return;
  }

  // For everything else: cache-first (offline-first)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cache hit, but also update cache in background
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        }).catch(() => {});
        return cachedResponse;
      }

      // Not in cache — try network, then cache it
      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    })
  );
});
