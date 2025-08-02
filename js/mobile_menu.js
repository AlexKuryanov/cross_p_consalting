document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".button__open");
  const mobileMenu = document.querySelector(".nav__menu");
  const closeButton = document.querySelector(".button__close");
  const menuLinks = document.querySelectorAll(".nav__link");

  // Open menu
  menuButton.addEventListener("click", function () {
    closeButton.style.display = "block";
    menuButton.style.display = "none";
    mobileMenu.classList.add("open");
  });

  // Close menu
  closeButton.addEventListener("click", function () {
    closeButton.style.display = "none";
    menuButton.style.display = "block";
    mobileMenu.classList.remove("open");
  });

  // Close menu on link click
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      closeButton.style.display = "none";
      menuButton.style.display = "block";
      menuLinks.forEach((l) => l.classList.remove("active"));
      e.target.classList.add("active");
      mobileMenu.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
      mobileMenu.classList.remove("open");
      closeButton.style.display = "none";
      menuButton.style.display = "block";
    }
  });
});
