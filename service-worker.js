// service-worker.js
const CACHE_NAME = 'resep-tanean-cache-v3'; // NAIKKAN VERSI CACHE!
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
  // Kita asumsikan ada detail untuk bebek dan soto juga
  // '/detail/bebek-hitam.html', 
  // '/detail/soto-madura.html',

  // CSS
  '/src/output.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap',

  // JS files (Lengkap sesuai screenshot)
  '/js/data.js',
  '/js/main.js',
  '/js/favorites.js',
  '/js/tab.js',
  '/js/search.js',      // <-- DITAMBAHKAN
  '/js/slideshow.js',  // <-- DITAMBAHKAN

  // Images (Lengkap sesuai screenshot)
  '/images/logo.png',
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/ayam-hitam.jpg',
  '/images/bebek-madura.jpg', // <-- DIPERBAIKI
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
      .catch(err => {
        console.error('Failed to cache', err); // Tambahkan log error untuk debugging
        throw err;
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName); // Log saat hapus cache lama
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});