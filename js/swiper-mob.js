function initMobileSwiper(swiperElement) {
  const wrapper = swiperElement.querySelector(".swiper-wrapper");
  const slides = swiperElement.querySelectorAll(".swiper-slide");
  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let autoScrollInterval;

  function updateSlide() {
    wrapper.style.transform = `translateX(-${currentIndex * 81}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  function handleStart(x) {
    stopAutoScroll();
    startX = x;
    isDragging = true;
  }

  function handleMove(x) {
    if (!isDragging) return;
    currentX = x;
  }

  function handleEnd() {
    if (!isDragging) return;
    const deltaX = currentX - startX;
    if (deltaX < -50) nextSlide();
    else if (deltaX > 50) prevSlide();
    startAutoScroll();
    isDragging = false;
  }

  // Touch
  wrapper.addEventListener("touchstart", (e) =>
    handleStart(e.touches[0].clientX)
  );
  wrapper.addEventListener("touchmove", (e) =>
    handleMove(e.touches[0].clientX)
  );
  wrapper.addEventListener("touchend", handleEnd);

  // Mouse
  wrapper.addEventListener("mousedown", (e) => handleStart(e.clientX));
  wrapper.addEventListener("mousemove", (e) => handleMove(e.clientX));
  wrapper.addEventListener("mouseup", handleEnd);

  updateSlide();
  startAutoScroll();
}

// 💡 Инициализация только при max-width: 1200px
function setupMobileSwipers() {
  const mediaQuery = window.matchMedia("(max-width: 1200px)");
  const swiperElements = document.querySelectorAll(".swiper");
  const initialized = new WeakSet();

  function checkAndInit() {
    swiperElements.forEach((el) => {
      if (mediaQuery.matches && !initialized.has(el)) {
        initMobileSwiper(el);
        initialized.add(el);
      }
    });
  }

  checkAndInit();
  mediaQuery.addEventListener("change", checkAndInit);
}

// 🚀 Старт
window.addEventListener("DOMContentLoaded", setupMobileSwipers);
