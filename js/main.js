// Data slideshow dengan foto
const slides = [
    {
        title: "",
        image: "images/slide1.jpg"
    },
    {
        title: "",
        image: "images/slide2.png"
    },
    {
        title: "",
        image: "images/slide3.jpg"
    }
];

// Data resep
const recipes = [
    {
        id: 1,
        name: "Ayam Hitam",
        difficulty: "Sedang",
        difficultyClass: "text-difficulty-medium",
        image: "images/ayam-hitam.jpg"
    },
    {
        id: 2,
        name: "Wedang Pokak",
        difficulty: "Sedang",
        difficultyClass: "text-difficulty-medium",
        image: "images/wedang-pokak.jpg"
    },
    {
        id: 3,
        name: "Burjo Madura",
        difficulty: "Mudah",
        difficultyClass: "text-difficulty-easy",
        image: "images/burjo-madura.jpg"
    },
    {
        id: 4,
        name: "Bebek Hitam",
        difficulty: "Sedang",
        difficultyClass: "text-difficulty-medium",
        image: "images/bebek-hitam.jpg"
    },
    {
        id: 5,
        name: "Sate Madura",
        difficulty: "Sulit",
        difficultyClass: "text-difficulty-hard",
        image: "images/sate-madura.jpg"
    },
    {
        id: 6,
        name: "Soto Madura",
        difficulty: "Sedang",
        difficultyClass: "text-difficulty-medium",
        image: "images/soto-madura.jpg"
    }
];

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', () => {
    // Render slideshow dengan foto
    const slideshowContainer = document.getElementById('slideshow');
    const dotsContainer = document.getElementById('slideshow-dots');
    
    slides.forEach((slide, index) => {
        // Tambahkan slide dengan gambar
        const slideElement = document.createElement('div');
        slideElement.className = `slide w-full flex-shrink-0`;
        slideElement.innerHTML = `
            <div class="h-full w-full bg-cover bg-center" style="background-image: url('${slide.image}')">
                <div class="h-full flex items-center justify-center">
                    <h3 class="text-white text-xl font-bold px-2 text-center">${slide.title}</h3>
                </div>
            </div>
        `;
        slideshowContainer.appendChild(slideElement);
        
        // Tambahkan dot navigasi
        const dot = document.createElement('button');
        dot.className = 'w-2 h-2 rounded-full bg-white/50 dot';
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    // Render resep
    const recipeGrid = document.getElementById('recipe-grid');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('a');
        recipeCard.href = "#";
        recipeCard.className = 'recipe-card bg-white rounded-xl shadow-md overflow-hidden block';
        recipeCard.innerHTML = `
          <div class="clickable-area">
            <div class="h-32 bg-cover bg-center" style="background-image: url('${recipe.image}')"></div>
            <div class="p-3">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-medium text-sm">${recipe.name}</h4>
                  <p class="text-xs ${recipe.difficultyClass}">${recipe.difficulty}</p>
                </div>
                <button class="favorite-btn" data-resep="${recipe.name}">
                  <i class="fas fa-bookmark text-gray-400"></i>
                </button>
              </div>
            </div>
          </div>
        `;
        recipeGrid.appendChild(recipeCard);
    });
    
    // Inisialisasi modul
    initSlideshow();
    initFavorites();
    initSearch();

    // Event listener untuk membuka detail resep
    recipeGrid.addEventListener('click', (e) => {
        const clickableArea = e.target.closest('.clickable-area');
        const isFavoriteBtn = e.target.closest('.favorite-btn');
        
        if (clickableArea && !isFavoriteBtn) {
            e.preventDefault();
            const recipeName = clickableArea.querySelector('h4').textContent;
            openDetailResep(recipeName);
        }
    });

    // Fungsi untuk membuka detail resep
    function openDetailResep(recipeName) {
        const recipe = recipes.find(r => r.name === recipeName);
        if (!recipe) return;

        // Update UI
        document.getElementById('detail-resep').classList.remove('hidden');
        document.querySelector('#detail-resep h2').textContent = recipe.name;
        
        // Isi konten bahan dan langkah
        document.getElementById('bahan-content').innerHTML = `
            <div class="mb-4">
                <h3 class="font-semibold mb-2">Bahan bahan:</h3>
                <p>300 gr Fillet Ayam, potong dadu</p>
            </div>
            
            <div class="mb-4">
                <h3 class="font-semibold mb-2">Bumbu Marinasi:</h3>
                <p>• 2 sdt Ketumbar tubuh</p>
                <p>• 3 siung bawang putih</p>
                <p>• Secukupnya Kecap Manis</p>
                <p>• Secukupnya Garam</p>
            </div>
            
            <div class="mb-4">
                <h3 class="font-semibold mb-2">Bumbu Kacang:</h3>
                <p>• 250 gr Kacang Tanah, sangrai dan blender</p>
                <p>• 1.5 buah Gula Merah</p>
                <p>• 2 butir Kemiri</p>
                <p>• 5 buah Bawang Merah</p>
                <p>• 2 siung Bawang Putih</p>
                <p>• 2 sdm Kecap Manis</p>
                <p>• 1 sdt Garam</p>
                <p>• 1/2 sdt bumbu penyedap</p>
                <p>• Secukupnya Minyak Goreng untuk menumis</p>
                <p>• Secukupnya Air</p>
            </div>
        `;

        document.getElementById('langkah-content').innerHTML = `
            <div class="space-y-3">
                <p>1. Siapkan semua bahan dan Bumbu. Potong dadu fillet ayam. Ulek/ blender Bumbu Marinasi. Rendam potongan ayam ke dalam Bumbu Marinasi. Jangan lupa tambahkan kecap. Biarkan, minimal 30 menit.</p>
                <p>2. Lanjut, siapkan Bumbu kacang. Blender Bumbu, lanjut tumis dan masukkan bahan lain. Gula merah, kacang dan beri air. Aduk rata.</p>
                <p>3. Tambahkan kecap, garam dan penyedap. Masak hingga meletup-letup tanda matang. Matikan api.</p>
                <p>4. Tusuk-tusuk ayam yang sudah marinasi dengan tusukan sate. Siapkan sedikit Bumbu kacang dan tambahkan kecap. Oles sate dengan Bumbu sebelum dipanggang.</p>
                <p>5. Panggang sate hingga berubah warna di wajan teflon. Sajikan bersama dengan bumbu kacang dan sambal juga acar. Sajikan dengan lontong atau nasi hangat.</p>
            </div>
        `;
    }

    // Tutup detail
    document.getElementById('close-detail').addEventListener('click', () => {
        document.getElementById('detail-resep').classList.add('hidden');
    });
    
    // Inisialisasi tab
    initTabs();
});

// Fungsi untuk inisialisasi tab
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-primary', 'text-primary');
                btn.classList.add('text-gray-400');
            });
            
            // Tambahkan kelas active ke tombol yang diklik
            button.classList.add('active', 'border-primary', 'text-primary');
            button.classList.remove('text-gray-400');
            
            // Sembunyikan semua konten tab
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Tampilkan konten tab yang sesuai
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.remove('hidden');
        });
    });
}