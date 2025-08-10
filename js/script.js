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

// Form submission handling
document.querySelector(".order").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    socials: document.getElementById("socials").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  // https://script.google.com/macros/s/AKfycbwL6BtB1FmalHEzl6CaNTZ8xjseC0m79b2gG737JUHXasvO9BYuvDhlD9BMtYtcw4JFwQ/exec

  fetch(
    "https://script.google.com/macros/s/AKfycbwL6BtB1FmalHEzl6CaNTZ8xjseC0m79b2gG737JUHXasvO9BYuvDhlD9BMtYtcw4JFwQ/exec",
    {
      method: "POST",
      mode: "no-cors", // Google Script без CORS ответа
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  )
    .then(() => {
      alert("Дані надіслані!");
      document.querySelector(".order").reset();
    })
    .catch(() => {
      alert("Помилка під час відправлення.");
    });
});
