let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot');
let slideInterval = setInterval(nextSlide, 4000); // Automatic transition every 4 seconds

// Function to go to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlidePosition();
}

// Function to go to the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
}

// Update slide position based on the current index
function updateSlidePosition() {
  const slider = document.querySelector('.slider');
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

// Function to update the dots
function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Function to navigate to a specific slide
function currentSlide(index) {
  currentIndex = index;
  updateSlidePosition();
}

// Pause the slider when hovered
const sliderContainer = document.getElementById('slider');
sliderContainer.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

// Resume the slider when mouse leaves
sliderContainer.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 4000);
});

// Swipe functionality for touch devices
let startX = 0;
let endX = 0;

sliderContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

sliderContainer.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Minimum distance to consider a swipe
  if (startX - endX > swipeThreshold) {
    nextSlide(); // Swipe left
  } else if (endX - startX > swipeThreshold) {
    prevSlide(); // Swipe right
  }
}