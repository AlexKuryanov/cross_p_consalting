import "./mobile_menu.js";
import "./swiper-mob.js";

const feedbackInitials = document.querySelectorAll(".feedback__initials");
const colors = ["#4199A1", "#A1418B", "#48A141"];

feedbackInitials.forEach((initial, index) => {
  initial.style.backgroundColor = colors[index % colors.length];
});
