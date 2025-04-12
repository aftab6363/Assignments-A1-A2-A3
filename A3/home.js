// Smooth scroll to songs section when "Start Listening" button is clicked
document.getElementById('startListeningBtn').addEventListener('click', function() {
  document.getElementById('songsSection').scrollIntoView({
    behavior: 'smooth'
  });
});

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
});

// Slider functionality for featured songs
const sliderContainer = document.getElementById('slider-container');
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');

nextArrow.addEventListener('click', () => {
  sliderContainer.scrollBy({ left: 300, behavior: 'smooth' });
});

prevArrow.addEventListener('click', () => {
  sliderContainer.scrollBy({ left: -300, behavior: 'smooth' });
});

// Slider functionality for trending songs
const trendingSliderContainer = document.getElementById('trending-slider-container');
const prevTrendingArrow = document.getElementById('prev-trending-arrow');
const nextTrendingArrow = document.getElementById('next-trending-arrow');

nextTrendingArrow.addEventListener('click', () => {
  trendingSliderContainer.scrollBy({ left: 300, behavior: 'smooth' });
});

prevTrendingArrow.addEventListener('click', () => {
  trendingSliderContainer.scrollBy({ left: -300, behavior: 'smooth' });
});