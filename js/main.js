// js/main.js - LENGKAP DENGAN FITUR FILTER

// Data untuk slideshow
const slides = [
    { 
        image: "images/slide1.jpg", 
        detailPage: "detail/soto-madura.html" 
    },
    { 
        image: "images/slide2.jpg", 
        detailPage: "detail/sate-sapi.html"
    },
    { 
        image: "images/slide3.jpg",
        detailPage: "detail/sate-madura.html"
    }
];

// --- FUNGSI UTAMA SAAT HALAMAN DIMUAT ---
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan fungsi-fungsi yang sudah ada
    if (document.getElementById('slideshow')) {
        renderSlideshow();
    }
    initSearch();
    initNavigation();
    
    // Jalankan fungsi BARU untuk filter kategori
    initCategoryFilter();

    // Tampilkan SEMUA 20 resep saat halaman pertama kali dibuka
    // Pastikan file js/data.js sudah dipanggil sebelum main.js di HTML
    if (typeof allRecipes !== 'undefined') {
        renderRecipes(allRecipes);
    }
});


// --- FUNGSI BARU: Logika untuk Filter Kategori ---
function initCategoryFilter() {
    const filterContainer = document.getElementById('category-filter');
    // Jika elemen filter tidak ada di halaman ini, hentikan fungsi
    if (!filterContainer) return;

    const btn = document.getElementById('category-btn');
    const menu = document.getElementById('category-menu');
    const menuItems = menu.querySelectorAll('.dropdown-item');
    // BARIS BARU: Ambil elemen judul yang akan diubah
    const heading = document.getElementById('rekomendasi-heading');

    // Tampilkan atau sembunyikan menu dropdown saat tombol ikon diklik
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah event klik menyebar ke dokumen
        menu.classList.toggle('hidden');
    });

    // Logika untuk filter saat salah satu item menu diklik
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Tandai item menu yang aktif
            menuItems.forEach(i => i.classList.remove('active'));
            e.target.classList.add('active');

            // Ambil nama kategori dari data-attribute
            const category = e.target.dataset.category;
            
            // ===============================================
            // KODE BARU UNTUK MENGUBAH JUDUL
            if (heading) {
                heading.textContent = category;
            }
            // ===============================================
            
            let filteredRecipes;
            if (category === 'Semua') {
                // Jika "Semua", gunakan semua resep
                filteredRecipes = allRecipes;
            } else {
                // Jika kategori lain, filter array resep
                filteredRecipes = allRecipes.filter(recipe => recipe.category === category);
            }
            
            // Render ulang grid resep dengan data yang sudah difilter
            renderRecipes(filteredRecipes);
            // Sembunyikan menu lagi setelah memilih
            menu.classList.add('hidden');
        });
    });

    // Sembunyikan menu jika pengguna mengklik di area lain di luar menu
    document.addEventListener('click', () => {
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    });
}


// --- FUNGSI YANG DIMODIFIKASI ---
function renderRecipes(recipesToRender) {
    const recipeGrid = document.getElementById('recipe-grid');
    if (!recipeGrid) return;
    
    recipeGrid.innerHTML = ''; // Selalu kosongkan grid sebelum mengisi ulang
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Jika hasil filter kosong, tampilkan pesan
    if (!recipesToRender || recipesToRender.length === 0) {
        recipeGrid.innerHTML = `<p class="col-span-2 text-center text-gray-500">Tidak ada resep dalam kategori ini.</p>`;
        return;
    }

    // Loop melalui resep yang sudah difilter dan buat kartunya
    recipesToRender.forEach(recipe => {
        const isFavorite = favorites.includes(recipe.name);
        
        const recipeCard = document.createElement('a');
        recipeCard.href = recipe.detailPage;
        recipeCard.className = 'recipe-card bg-white rounded-xl shadow-md overflow-hidden block';
        
        // Perubahan terjadi di baris di bawah ini
        recipeCard.innerHTML = `
            <div class="h-32 bg-cover bg-center" style="background-image: url('${recipe.image}')"></div>
            <div class="p-3">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-medium text-sm mb-1">${recipe.name}</h4>
                        <span class="${recipe.badgeClass}">${recipe.difficulty}</span>
                    </div>
                    <button class="favorite-btn" data-resep="${recipe.name}">
                        <i class="fas fa-bookmark ${isFavorite ? 'text-primary' : 'text-gray-400'}"></i>
                    </button>
                </div>
            </div>
        `;
        recipeGrid.appendChild(recipeCard);
    });
}


// --- FUNGSI-FUNGSI LAMA YANG TIDAK BERUBAH ---
// Kode di bawah ini sama persis dengan yang Anda berikan.

function initNavigation() {
    const homeBtn = document.querySelector('a[href="index.html"].nav-btn');
    const favoritesBtn = document.querySelector('a[href="favorit.html"].nav-btn');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        homeBtn?.classList.add('active');
        favoritesBtn?.classList.remove('active');
    } else if (currentPage === 'favorit.html') {
        favoritesBtn?.classList.add('active');
        homeBtn?.classList.remove('active');
    }
}

function renderSlideshow() {
    const slideshow = document.getElementById('slideshow');
    const dotsContainer = document.getElementById('slideshow-dots');
    
    if (!slideshow || !dotsContainer) return;
    
    slideshow.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    slides.forEach((slide, index) => {
        const linkWrapper = document.createElement('a');
        linkWrapper.href = slide.detailPage;
        linkWrapper.className = 'slide w-full flex-shrink-0 h-full swipe-area block';
        linkWrapper.innerHTML = `<div class="slide-image" style="background-image: url('${slide.image}')"></div>`;
        slideshow.appendChild(linkWrapper);

        const dot = document.createElement('button');
        dot.className = 'w-2 h-2 rounded-full bg-white/50 dot';
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    initSlideshowLogic();
}

function initSlideshowLogic() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('#slideshow .slide');
    const dots = document.querySelectorAll('#slideshow-dots .dot');
    const totalSlides = slides.length;
    let slideshowInterval;

    if (totalSlides === 0) return;

    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;
        
        const slideshowEl = document.getElementById('slideshow');
        if (slideshowEl) {
            slideshowEl.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-white', i === currentSlide);
            dot.classList.toggle('w-3', i === currentSlide);
        });
    }

    function startAutoSlide() {
        slideshowInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 3000);
    }

    function stopAutoSlide() {
        clearInterval(slideshowInterval);
    }

    const slideshowContainer = document.getElementById('slideshow');
    let touchStartX = 0;
    
    slideshowContainer.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        stopAutoSlide();
    }, { passive: true });
    
    slideshowContainer.addEventListener('touchend', e => {
        if (!touchStartX) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;
        const minSwipe = 50;
        
        if (diffX > minSwipe) {
            showSlide(currentSlide + 1);
        } else if (diffX < -minSwipe) {
            showSlide(currentSlide - 1);
        }
        
        touchStartX = 0;
        startAutoSlide();
    }, { passive: true });

    showSlide(0);
    startAutoSlide();

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            stopAutoSlide();
            showSlide(parseInt(dot.dataset.index));
            startAutoSlide();
        });
    });
}


function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    // JavaScript akan mencari ikon ini
    const searchIcon = searchInput.parentElement.querySelector('i.fa-search');

    // Saat search bar di-klik (focus)
    searchInput.addEventListener('focus', () => {
        if (searchIcon) {
            searchIcon.classList.remove('text-gray-400');
            searchIcon.classList.add('text-primary');
        }
    });

    // Saat klik di luar search bar (blur)
    searchInput.addEventListener('blur', () => {
        if (searchIcon) {
            searchIcon.classList.remove('text-primary');
            searchIcon.classList.add('text-gray-400');
        }
    });

    // Logika untuk memfilter resep saat mengetik
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        const slideshowSection = document.getElementById('slideshow-section');
        const rekomendasiSection = document.getElementById('rekomendasi-section');

        if (searchTerm !== '') {
            slideshowSection.classList.add('hidden');
            rekomendasiSection.classList.add('hidden');
        } else {
            slideshowSection.classList.remove('hidden');
            rekomendasiSection.classList.remove('hidden');
        }

        const recipeCards = document.querySelectorAll('#recipe-grid .recipe-card');
        recipeCards.forEach(card => {
            const recipeName = card.querySelector('h4').textContent.toLowerCase();
            if (recipeName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}