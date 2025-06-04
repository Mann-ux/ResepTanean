// Tab functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active', 'border-primary', 'text-primary');
      b.classList.add('text-gray-400');
    });
    
    btn.classList.add('active', 'border-primary', 'text-primary');
    btn.classList.remove('text-gray-400');
    
    // Show corresponding content
    const tabId = btn.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden');
    });
    document.getElementById(`${tabId}-content`).classList.remove('hidden');
  });
});