// js/favorites.js - VERSI FINAL YANG SUDAH LENGKAP DAN DIPERBAIKI

document.addEventListener('DOMContentLoaded', () => {
    // Memeriksa status favorit di semua halaman saat dimuat
    updateAllFavoriteIcons();

    // Jika kita berada di halaman favorit.html, jalankan fungsi untuk merender isinya
    if (window.location.pathname.includes('favorit.html')) {
        renderFavoritePage();
    }
});

// Event listener terpusat untuk semua tombol favorit di seluruh aplikasi
document.addEventListener('click', (e) => {
    const favoriteButton = e.target.closest('.favorite-btn, #favorite-btn');
    if (!favoriteButton) return;

    e.preventDefault();
    e.stopPropagation();

    // Dapatkan nama resep dari tombol yang diklik
    let recipeName;
    const isDetailPage = document.body.contains(document.querySelector('.recipe-title'));
    if (isDetailPage) {
        recipeName = document.querySelector('.recipe-title').textContent.trim();
    } else {
        recipeName = favoriteButton.dataset.resep;
    }
    
    if (!recipeName) return;

    toggleFavoriteStatus(recipeName); // Ubah status di localStorage
    updateAllFavoriteIcons(); // Perbarui tampilan semua ikon
    
    // Animasi tombol
    favoriteButton.classList.add('favorite-pulse');
    setTimeout(() => favoriteButton.classList.remove('favorite-pulse'), 500);

    // LOGIKA SPESIFIK JIKA DI HALAMAN FAVORIT
    if (window.location.pathname.includes('favorit.html')) {
        const favorites = getFavorites();
        // Jika resep baru saja dihapus dari favorit
        if (!favorites.includes(recipeName)) {
            const cardToRemove = favoriteButton.closest('.recipe-card');
            if (cardToRemove) {
                cardToRemove.remove(); // Hapus kartu dari tampilan
                checkEmptyState(); // Periksa kembali apakah kontainer jadi kosong
            }
        }
    }
});


// --- FUNGSI-FUNGSI BANTUAN ---

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavoriteStatus(recipeName) {
    let favorites = getFavorites();
    const index = favorites.indexOf(recipeName);

    if (index === -1) {
        favorites.push(recipeName);
    } else {
        favorites.splice(index, 1);
    }
    saveFavorites(favorites);
}

function updateAllFavoriteIcons() {
    const favorites = getFavorites();
    
    const detailButton = document.getElementById('favorite-btn');
    if (detailButton) {
        const recipeName = document.querySelector('.recipe-title').textContent.trim();
        const icon = detailButton.querySelector('i');
        if (favorites.includes(recipeName)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    }

    const cardButtons = document.querySelectorAll('.favorite-btn[data-resep]');
    cardButtons.forEach(button => {
        const recipeName = button.dataset.resep;
        const icon = button.querySelector('i');
        if (favorites.includes(recipeName)) {
            button.classList.add('active');
            icon.classList.remove('text-gray-400');
            icon.classList.add('text-primary');
        } else {
            button.classList.remove('active');
            icon.classList.add('text-gray-400');
            icon.classList.remove('text-primary');
        }
    });
}

// FUNGSI UNTUK MERENDER KONTEN DI favorit.html
function renderFavoritePage() {
    const container = document.getElementById('favorite-container');
    if (!container || typeof allRecipes === 'undefined') return;

    const favorites = getFavorites();
    // DIPERBAIKI: Menambahkan .trim() untuk mencegah bug spasi
    const favoriteRecipes = allRecipes.filter(recipe => favorites.includes(recipe.name.trim()));
    
    container.innerHTML = '';

    favoriteRecipes.forEach(recipe => {
        const card = document.createElement('a');
        card.href = recipe.detailPage;
        card.className = 'recipe-card bg-white rounded-xl shadow-md overflow-hidden block';
        
        card.innerHTML = `
            <div class="h-32 bg-cover bg-center" style="background-image: url('${recipe.image}')"></div>
            <div class="p-3">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-medium text-sm mb-1">${recipe.name}</h4>
                        <span class="${recipe.badgeClass}">${recipe.difficulty}</span>
                    </div>
                    <button class="favorite-btn active" data-resep="${recipe.name}">
                        <i class="fas fa-bookmark text-primary"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    checkEmptyState(); // Panggil pengecekan setelah selesai render
}

// DITAMBAHKAN: Fungsi yang hilang untuk menampilkan/menyembunyikan pesan kosong
function checkEmptyState() {
    const container = document.getElementById('favorite-container');
    const emptyState = document.getElementById('empty-state');
    if (container && emptyState) {
        if (container.children.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }
}