// Универсальная функция для инициализации свайперов с учетом адаптивности
function initCustomSwiper(swiperElement) {
  const wrapper = swiperElement.querySelector(".swiper-wrapper");
  const slides = swiperElement.querySelectorAll(".swiper-slide");

  if (!wrapper || slides.length === 0) return;

  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let wrapperWidth = wrapper.offsetWidth;
  let slideWidth = slides[0] ? slides[0].offsetWidth + 20 : 0; // 20px - gap между слайдами

  // Обновляем позицию слайдера
  function updateSlide() {
    wrapperWidth = wrapper.offsetWidth;
    const maxScroll = wrapper.scrollWidth - wrapperWidth;
    let newTransformValue = -currentIndex * slideWidth;

    // Ограничиваем скролл
    if (newTransformValue < -maxScroll) {
      newTransformValue = -maxScroll;
      currentIndex = Math.floor(maxScroll / slideWidth);
    }
    if (newTransformValue > 0) {
      newTransformValue = 0;
      currentIndex = 0;
    }

    wrapper.style.transform = `translateX(${newTransformValue}px)`;
  }

  // Переключение на следующий слайд
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlide();
    }
  }

  // Переключение на предыдущий слайд
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide();
    }
  }

  // Обработчики событий
  function handleStart(x) {
    startX = x;
    isDragging = true;
    wrapper.style.cursor = "grabbing";
  }

  function handleMove(x) {
    if (!isDragging) return;
    currentX = x;
    const deltaX = currentX - startX;
    const currentTransform = -currentIndex * slideWidth;
    const newTransformValue = currentTransform + deltaX;

    const maxScroll = wrapper.scrollWidth - wrapperWidth;

    // Эффект сопротивления на краях
    if (currentIndex === 0 && deltaX > 0) {
      const resistance = 3;
      wrapper.style.transform = `translateX(${deltaX / resistance}px)`;
    } else if (currentIndex === slides.length - 1 && deltaX < 0) {
      const resistance = 3;
      const lastSlideTransform = -maxScroll;
      wrapper.style.transform = `translateX(${
        lastSlideTransform + deltaX / resistance
      }px)`;
    } else {
      wrapper.style.transform = `translateX(${newTransformValue}px)`;
    }
  }

  function handleEnd() {
    if (!isDragging) return;
    const deltaX = currentX - startX;

    if (deltaX < -50) {
      nextSlide();
    } else if (deltaX > 50) {
      prevSlide();
    } else {
      updateSlide();
    }

    isDragging = false;
    wrapper.style.cursor = "grab";
  }

  // Touch Events
  wrapper.addEventListener("touchstart", (e) =>
    handleStart(e.touches[0].clientX)
  );
  wrapper.addEventListener("touchmove", (e) =>
    handleMove(e.touches[0].clientX)
  );
  wrapper.addEventListener("touchend", handleEnd);

  // Mouse Events
  wrapper.addEventListener("mousedown", (e) => handleStart(e.clientX));
  wrapper.addEventListener("mousemove", (e) => handleMove(e.clientX));
  wrapper.addEventListener("mouseup", handleEnd);
  wrapper.addEventListener("mouseleave", () => {
    if (isDragging) handleEnd();
  });

  // Инициализация
  updateSlide();
  wrapper.style.cursor = "grab";
}

// Адаптивная инициализация слайдеров
function initAdaptiveSliders() {
  const isDesktop = window.innerWidth >= 1200;

  // Очищаем предыдущие стили
  document.querySelectorAll(".swiper-wrapper").forEach((wrapper) => {
    wrapper.style.transform = "";
  });

  if (isDesktop) {
    // На десктопе:
    // 1. Свайпер book-slider отключается (заменяется на десктопную карусель)
    // 2. Свайпер review отключается (анимация через CSS)
    // 3. Свайпер feedback остается активным

    const feedbackSwiper = document.querySelector("#feedback .swiper");
    if (feedbackSwiper) {
      initCustomSwiper(feedbackSwiper);
    }
  } else {
    // На мобильных:
    // Все три свайпера активны
    const swiperElements = document.querySelectorAll(".swiper");
    swiperElements.forEach((el) => initCustomSwiper(el));
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", initAdaptiveSliders);

// Обновление при изменении размера окна
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initAdaptiveSliders, 100);
});
