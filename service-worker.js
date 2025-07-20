// Nama cache dan daftar file yang akan disimpan
const CACHE_NAME = 'ankiscroll-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './correct.mp3',
  './incorrect.mp3',
  './manifest.json',
  './play_store_512.png'
];

// Event saat Service Worker di-install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event saat ada request ke jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, kembalikan dari cache. Jika tidak, ambil dari jaringan.
        return response || fetch(event.request);
      }
    )
  );
});
