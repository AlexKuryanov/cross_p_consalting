// Этот код будет универсален для мобильных и десктопных свайперов

function initCustomSwiper(swiperElement) {
  const wrapper = swiperElement.querySelector(".swiper-wrapper");
  const slides = swiperElement.querySelectorAll(".swiper-slide");

  if (!wrapper || slides.length === 0) return;

  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let wrapperWidth = wrapper.offsetWidth;
  let slideWidth =
    slides[0].offsetWidth +
    (slides[1]
      ? slides[1].offsetLeft - slides[0].offsetWidth - slides[0].offsetLeft
      : 0);

  // Обновляем позицию слайдера
  function updateSlide() {
    wrapperWidth = wrapper.offsetWidth;
    // Определяем максимальное смещение влево, чтобы не прокручивать пустую область
    const maxScroll = wrapper.scrollWidth - wrapperWidth;

    let newTransformValue = -currentIndex * slideWidth;

    // Ограничиваем скролл, чтобы не уходить за пределы
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

  // Обработчики событий (универсальны для touch и mouse)
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

    // 💡 Новая логика ограничения движения
    const maxScroll = wrapper.scrollWidth - wrapperWidth;

    // Если пытаемся перетянуть первый слайд вправо
    if (currentIndex === 0 && deltaX > 0) {
      // Ограничиваем движение, делая его более "вязким"
      const resistance = 3;
      wrapper.style.transform = `translateX(${deltaX / resistance}px)`;
      // Если пытаемся перетянуть последний слайд влево
    } else if (
      wrapper.scrollWidth > wrapperWidth &&
      currentIndex === slides.length - 1 &&
      deltaX < 0
    ) {
      // Ограничиваем движение с "вязким" эффектом
      const resistance = 3;
      const lastSlideTransform = -maxScroll;
      wrapper.style.transform = `translateX(${
        lastSlideTransform + deltaX / resistance
      }px)`;
      // Обычное движение слайдера
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
    if (isDragging) {
      handleEnd();
    }
  });

  // Инициализация
  updateSlide();
  wrapper.style.cursor = "grab";
}

// Инициализация свайпера для всех элементов с классом ".swiper"
function setupAllSwipers() {
  const swiperElements = document.querySelectorAll(".swiper");
  swiperElements.forEach((el) => initCustomSwiper(el));
}

// Вызываем инициализацию при загрузке страницы
document.addEventListener("DOMContentLoaded", setupAllSwipers);

// Обновляем слайдер при изменении размера окна
window.addEventListener("resize", () => {
  const swiperElements = document.querySelectorAll(".swiper");
  swiperElements.forEach((el) => {
    const wrapper = el.querySelector(".swiper-wrapper");
    if (wrapper) {
      wrapper.style.transform = "";
      initCustomSwiper(el);
    }
  });
});
