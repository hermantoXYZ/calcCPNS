const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// Dark mode styles
document.body.classList.add('dark-mode');
