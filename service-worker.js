// service-worker.js
const CACHE_NAME = 'resep-tanean-cache-v2'; // Versi cache dinaikkan
const urlsToCache = [
  // Core files
  '/',
  '/index.html',
  '/favorit.html',
  '/manifest.json',

  // Halaman Detail (Lengkap)
  '/detail/ayam-hitam.html',
  '/detail/burjo-madura.html',
  '/detail/sate-madura.html',
  '/detail/wedang-pokak.html',
  '/detail/bebek-hitam.html', // Tambahkan jika ada
  '/detail/soto-madura.html',  // Tambahkan jika ada

  // CSS
  '/src/output.css', // Seharusnya ini path ke file CSS hasil compile
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap',

  // JS files (Lengkap)
  '/js/data.js',
  '/js/main.js',
  '/js/favorites.js',
  '/js/tab.js',

  // Images (Lengkap)
  '/images/logo.png',
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/ayam-hitam.jpg',
  '/images/bebek-hitam.jpg',
  '/images/burjo-madura.jpg',
  '/images/sate-madura.jpg',
  '/images/soto-madura.jpg',
  '/images/wedang-pokak.jpg',

  // Icons
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});