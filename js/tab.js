// js/tab.js
document.addEventListener('DOMContentLoaded', () => {
    const tabContainer = document.getElementById('tabContainer');
    if (!tabContainer) return;

    const slider = tabContainer.querySelector('.tab-slider');
    const buttons = tabContainer.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content-section');

    if (buttons.length > 0) {
      updateSlider(buttons[0]);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            updateSlider(button);
            
            const tabId = button.dataset.tab;
            tabContents.forEach(content => {
                content.classList.toggle('active', content.id.includes(tabId));
            });
        });
    });

    function updateSlider(activeButton) {
        if (!slider) return;
        const containerRect = tabContainer.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        slider.style.width = `${activeButton.offsetWidth}px`;
        slider.style.transform = `translateX(${buttonRect.left - containerRect.left}px)`;
    }
});