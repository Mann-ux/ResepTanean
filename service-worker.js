// service-worker.js - VERSI FINAL UNTUK HOSTING
const PRECACHE_NAME = 'resep-tanean-precache-v1.2.0'; // Versi final
const DYNAMIC_CACHE_NAME = 'resep-tanean-dynamic-v1.2.0';

const urlsToCache = [
  // == Core Files ==
  '/',
  '/index.html', 
  '/favorit.html',
  '/manifest.json',

  // == Halaman Detail ==
  // PASTIKAN SEMUA HALAMAN DETAIL BARU ANDA SUDAH TERCANTUM DI SINI
  '/detail/ayam-hitam.html',
  '/detail/burjo-madura.html',
  '/detail/sate-madura.html',
  '/detail/sate-sapi.html',
  '/detail/soto-madura.html',
  '/detail/wedang-pokak.html',
  // '/detail/bebek-sinjay.html', // <-- Contoh, tambahkan semua di sini
  // '/detail/kaldu-kokot.html', // ...dan seterusnya untuk 20 resep

  // == CSS & JS ==
  '/src/output.css',
  '/js/data.js',
  '/js/main.js',
  '/js/favorites.js',
  '/js/tab.js',
  '/js/search.js',
  '/js/slideshow.js',

  // == Gambar Resep & Aset ==
  // Pastikan semua gambar baru Anda ada di daftar ini
  '/images/logo.png',
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/ayam-hitam.jpg',
  '/images/bebek-sinjay.jpg',
  '/images/bebek-songkem.jpeg',
  '/images/burjo-madura.jpg',
  '/images/campor-lorjuk.jpg',
  '/images/es-kacangmerah.jpeg',
  '/images/kaldu-kokot.jpg',
  '/images/kopi-jahe.jpg',
  '/images/kue-apen.jpg',
  '/images/lorjuk.jpg',
  '/images/nasi-jagung.jpg',
  '/images/nasi-serpang.jpg',
  '/images/rujak-cingur.jpg',
  '/images/sambal-pencit.jpeg',
  '/images/sate-lalat.jpeg',
  '/images/sate-madura.jpg',
  '/images/sate-sapi.jpg',
  '/images/soto-madura.jpg',
  '/images/tajin-sobih.jpeg',
  '/images/topak-ladeh.jpeg',
  '/images/wedang-pokak.jpg',

  // == Ikon Aplikasi ==
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// FASE INSTALASI: Menyimpan semua file di atas ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// FASE AKTIVASI: Menghapus cache lama
self.addEventListener('activate', event => {
  const cacheWhitelist = [PRECACHE_NAME, DYNAMIC_CACHE_NAME];
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

// FASE FETCH: Menanggapi permintaan dengan strategi yang sesuai
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Strategi untuk aset eksternal (Google Fonts & Font Awesome)
  if (url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://fonts.gstatic.com' ||
      url.origin === 'https://cdnjs.cloudflare.com') {
    
    // Gunakan strategi Stale-While-Revalidate
    event.respondWith(
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        return cache.match(request).then(cachedResponse => {
          const fetchPromise = fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else {
    // Strategi untuk aset lokal (Cache First)
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request);
      })
    );
  }
});