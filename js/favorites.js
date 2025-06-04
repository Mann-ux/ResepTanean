function initFavorites() {
    // Fungsi untuk favorit
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const resep = button.getAttribute('data-resep');
            const icon = button.querySelector('i');
            
            // Toggle kelas untuk mengubah ikon
            if (icon.classList.contains('text-gray-400')) {
                icon.classList.remove('text-gray-400');
                icon.classList.add('text-primary');
                
                // Simpan ke localStorage
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if (!favorites.includes(resep)) {
                    favorites.push(resep);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                }
            } else {
                icon.classList.remove('text-primary');
                icon.classList.add('text-gray-400');
                
                // Hapus dari localStorage
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                favorites = favorites.filter(item => item !== resep);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        });
    });
    
    // Inisialisasi favorit dari localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelectorAll('.favorite-btn').forEach(button => {
        const resep = button.getAttribute('data-resep');
        const icon = button.querySelector('i');
        
        if (favorites.includes(resep)) {
            icon.classList.remove('text-gray-400');
            icon.classList.add('text-primary');
        }
    });
}