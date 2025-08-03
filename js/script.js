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
