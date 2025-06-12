// Fungsi slideshow (diambil dari slideshow.js Anda)
function initSlideshow() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    let slideshowInterval;

    // Pastikan ada slides untuk diolah
    if (totalSlides === 0) return;

    function showSlide(index) {
        // Validasi index
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        // Update slide position
        document.getElementById('slideshow').style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
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

    // Inisialisasi
    showSlide(0); // Tampilkan slide pertama
    startAutoSlide();

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
}