const CACHE_NAME = 'praymate-v1';
const urlsToCache = [
  './',
  './index.html',
  './jadwal.html',
  './quran.html',
  './settings.html',
  './doa.html',
  './css/style.css',
  './js/app.js',
  './js/theme.js',
  './js/prayerApi.js',
  './js/quranApi.js',
  './js/doaData.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
