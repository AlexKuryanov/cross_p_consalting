// Wait for the entire window to load to ensure all images are ready
window.addEventListener("load", () => {
  const track = document.querySelector(".desktop-slider__wrapper");
  const slides = document.querySelectorAll(".slider-slide");
  const btnPrev = document.querySelector(".desktop-slider__button_prev");
  const btnNext = document.querySelector(".desktop-slider__button_next");

  let currentIndex = 0;
  let slideWidth = 0;

  function initializeSlider() {
    // Use getBoundingClientRect().width for precise measurement
    slideWidth = slides[0].getBoundingClientRect().width;
    updateSliderPosition();
  }

  function updateSliderPosition() {
    // Calculate the offset and apply it using transform for smooth animation
    const offset = (-slideWidth - 28) * currentIndex;

    track.style.transform = `translateX(${offset}px)`;
    updateButtons();
  }

  function updateButtons() {
    // Disable buttons at the start and end of the slider
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === slides.length - 1;
  }

  // Event Listeners for buttons
  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  // Debounce function to limit how often a function can run.
  // This is useful for performance on resize events.
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Re-initialize the slider on window resize to make it responsive
  window.addEventListener("resize", debounce(initializeSlider, 250));

  // Initial setup
  initializeSlider();
});
