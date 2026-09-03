// Bump this when you change any file in PRECACHE_URLS so clients pick up
// the new version instead of serving the old cache forever.
const CACHE_VERSION = 'hayolas-v2';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './team-comba.png',
  './verdict-go.png',
  './verdict-maybe.png',
  './verdict-skip.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept the weather APIs — always go to the network so the
  // conditions stay live. The app's own localStorage cache (1h TTL)
  // already handles the "don't hammer the API" concern.
  if (url.hostname.endsWith('open-meteo.com')) {
    return;
  }

  // Only handle our own origin's GET requests as an app shell.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached); // offline: fall back to cache

      // Cache-first for instant loads; refresh the cache in the background.
      return cached || network;
    })
  );
});
