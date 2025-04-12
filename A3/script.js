// script.js
// This script handles the toggle functionality for the menu button
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

