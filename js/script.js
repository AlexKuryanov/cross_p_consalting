import "./mobile_menu.js";
import "./swiper-mob.js";
import "./desktop-slider.js";

// Initialize feedback initials with different colors
const feedbackInitials = document.querySelectorAll(".feedback__initials");
const colors = ["#4199A1", "#A1418B", "#48A141"];

feedbackInitials.forEach((initial, index) => {
  initial.style.backgroundColor = colors[index % colors.length];
});

// Accordion functionality
const details = document.querySelectorAll(".accordion__item");
const summaries = document.querySelectorAll(".accordion__button");

summaries.forEach((summary) => {
  summary.addEventListener("click", (e) => {
    details.forEach((detail) => {
      if (detail !== e.target.closest(".accordion__item")) {
        detail.removeAttribute("open");
      }
    });
  });
});

// Получаем все необходимые элементы
const form = document.querySelector(".order");
const submitBtn = form.querySelector("button[type='submit']");
const messageInput = form.querySelector("#message");
const maxChars = 1500;
const charsAmount = form.querySelector(".chars-amount");

// Основная функция для проверки валидности всей формы
function checkFormValidity() {
  // Проверяем все поля на валидность с помощью встроенного метода checkValidity()
  // Если форма валидна, включаем кнопку, иначе — выключаем
  submitBtn.disabled = !form.checkValidity();
}

// Обновляем количество оставшихся символов и проверяем валидность поля
function updateCharsAmount() {
  const remainingChars = maxChars - messageInput.value.length;
  charsAmount.textContent = remainingChars;

  // Если символов осталось меньше 0, выводим ошибку
  if (remainingChars < 0) {
    charsAmount.classList.add("error");
    // Устанавливаем кастомное сообщение об ошибке
    messageInput.setCustomValidity(
      "Достигнут лимит символов. Пожалуйста, сократите сообщение."
    );
  } else {
    // Если всё в порядке, сбрасываем кастомное сообщение
    charsAmount.classList.remove("error");
    messageInput.setCustomValidity("");
  }
}

// Отслеживаем ввод в поле сообщения, чтобы обновлять счётчик
messageInput.addEventListener("input", updateCharsAmount);

// Отслеживаем изменения во всех полях формы, чтобы обновлять состояние кнопки
form.addEventListener("input", () => {
  // Вызываем обе функции, чтобы обновить счётчик и проверить общую валидность формы
  updateCharsAmount();
  checkFormValidity();
});

// Инициализируем состояние при загрузке страницы
updateCharsAmount();
checkFormValidity();

// Обработчик отправки формы
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Самая важная часть: проверяем валидность всей формы
  if (!form.checkValidity()) {
    // Если форма невалидна, выводим стандартные сообщения об ошибках
    // (это произойдет автоматически, когда браузер увидит попытку отправки)
    // И прекращаем выполнение функции
    return;
  }

  const formData = {
    name: document.getElementById("name").value.trim(),
    socials: document.getElementById("socials").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbwL6BtB1FmalHEzl6CaNTZ8xjseC0m79b2gG737JUHXasvO9BYuvDhlD9BMtYtcw4JFwQ/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  )
    .then(() => {
      alert("Дані надіслані!");
      form.reset();
      // После сброса формы нужно снова проверить её валидность
      checkFormValidity();
    })
    .catch(() => {
      alert("Помилка під час відправлення.");
    });
});
