// Initializes a single desktop slider instance, fully isolated from others
function initDesktopSlider(root) {
  const track = root.querySelector('.desktop-slider__wrapper');
  const slides = root.querySelectorAll('.slider-slide');
  const btnPrev = root.querySelector('.desktop-slider__button_prev');
  const btnNext = root.querySelector('.desktop-slider__button_next');

  if (!track || !slides.length || !btnPrev || !btnNext) return;

  let currentIndex = 0;
  let slideWidth = 0;

  function updateSliderPosition() {
    const offset = (-slideWidth - 28) * currentIndex;
    track.style.transform = `translateX(${offset}px)`;
    updateButtons();
  }

  function updateButtons() {
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === slides.length - 1;
  }

  function initializeSlider() {
    slideWidth = slides[0].getBoundingClientRect().width;
    updateSliderPosition();
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  window.addEventListener('resize', debounce(initializeSlider, 250));

  initializeSlider();
}

// Wait for the entire window to load to ensure all images are ready
window.addEventListener('load', () => {
  document.querySelectorAll('.desktop-slider').forEach(initDesktopSlider);
});
