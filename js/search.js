function initSearch() {
    const searchInput = document.getElementById('search-input');
    const recipeGrid = document.getElementById('recipe-grid');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        const recipeCards = Array.from(recipeGrid.querySelectorAll('.recipe-card'));
        
        recipeCards.forEach(card => {
            const recipeName = card.querySelector('h4').textContent.toLowerCase();
            
            if (recipeName.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}