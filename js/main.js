const slides = [
    { 
        image: "images/slide1.jpg", 
        detailPage: "detail/sate-madura.html" 
    },
    { 
        image: "images/slide2.jpg", 
        detailPage: "detail/ayam-hitam.html"
    },
    { 
        image: "images/slide3.jpg",
        detailPage: "detail/wedang-pokak.html"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('slideshow')) {
        renderSlideshow();
    }
    if (document.getElementById('recipe-grid')) {
        renderRecipes();
    }
    if (document.getElementById('search-input')) {
        initSearch();
    }
    initNavigation();
});

function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const homeBtn = document.querySelector('.nav-btn a[href="index.html"]')?.parentElement;
    const favoritesBtn = document.querySelector('.nav-btn a[href="favorit.html"]')?.parentElement;

    if (currentPage === 'index.html' || currentPage === '') {
        homeBtn?.classList.add('active');
        favoritesBtn?.classList.remove('active');
    } else if (currentPage === 'favorit.html') {
        favoritesBtn?.classList.add('active');
        homeBtn?.classList.remove('active');
    }
}

function renderSlideshow() {
    // Mengambil elemen HTML untuk slideshow dan titik navigasi
    const slideshow = document.getElementById('slideshow');
    const dotsContainer = document.getElementById('slideshow-dots');
    
    // Jika salah satu elemen tidak ditemukan, hentikan fungsi
    if (!slideshow || !dotsContainer) return;
    
    // Kosongkan konten slideshow dan dots sebelum diisi ulang
    slideshow.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Looping untuk setiap item di dalam data 'slides'
    slides.forEach((slide, index) => {
        // =======================================================
        // BAGIAN INI YANG DIPERBARUI
        // =======================================================

        // 1. Membuat elemen <a> (link) sebagai pembungkus utama slide.
        //    Sebelumnya, ini adalah elemen <div>.
        const linkWrapper = document.createElement('a');

        // 2. Mengatur tujuan link (URL) dari data 'slide.detailPage'.
        linkWrapper.href = slide.detailPage;

        // 3. Memberi kelas yang diperlukan agar tampilannya benar.
        //    Kelas ini sama seperti yang dimiliki <div> sebelumnya.
        linkWrapper.className = 'slide w-full flex-shrink-0 h-full swipe-area block';

        // 4. Mengisi bagian dalam link dengan div yang berisi gambar background.
        linkWrapper.innerHTML = `<div class="slide-image" style="background-image: url('${slide.image}')"></div>`;
        
        // 5. Menambahkan link yang sudah lengkap ini ke dalam container slideshow.
        slideshow.appendChild(linkWrapper);

        // =======================================================
        // Bagian untuk membuat titik navigasi (tidak ada perubahan)
        // =======================================================
        const dot = document.createElement('button');
        dot.className = 'w-2 h-2 rounded-full bg-white/50 dot';
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    // Memanggil fungsi untuk mengaktifkan logika slideshow (geser, auto-play, dll)
    initSlideshowLogic();
}

function initSlideshowLogic() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    let slideshowInterval;

    if (totalSlides === 0) return;

    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        document.getElementById('slideshow').style.transform = `translateX(-${currentSlide * 100}%)`;
        
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
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(parseInt(dot.dataset.index));
            startAutoSlide();
        });
    });
}

function renderRecipes() {
    const recipeGrid = document.getElementById('recipe-grid');
    if (!recipeGrid || typeof allRecipes === 'undefined') return;
    
    recipeGrid.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    allRecipes.forEach(recipe => {
        const isFavorite = favorites.includes(recipe.name);
        
        const recipeCard = document.createElement('a');
        recipeCard.href = recipe.detailPage;
        recipeCard.className = 'recipe-card bg-white rounded-xl shadow-md overflow-hidden block';
        
        recipeCard.innerHTML = `
            <div class="h-32 bg-cover bg-center" style="background-image: url('${recipe.image}')"></div>
            <div class="p-3">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-medium text-sm">${recipe.name}</h4>
                        <p class="text-xs ${recipe.difficultyClass}">${recipe.difficulty}</p>
                    </div>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-resep="${recipe.name}">
                        <i class="fas fa-bookmark ${isFavorite ? 'text-primary' : 'text-gray-400'}"></i>
                    </button>
                </div>
            </div>
        `;
        recipeGrid.appendChild(recipeCard);
    });
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        const recipeCards = document.querySelectorAll('#recipe-grid .recipe-card');
        
        recipeCards.forEach(card => {
            const recipeName = card.querySelector('h4').textContent.toLowerCase();
            card.style.display = recipeName.includes(searchTerm) ? 'block' : 'none';
        });
    });
}