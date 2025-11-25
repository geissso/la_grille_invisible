document.addEventListener("DOMContentLoaded", () => {
  // Menu (inchangé)
  const toggle = document.querySelector(".menu-btn");
  const nav = document.querySelector(".menu");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      nav.setAttribute("aria-hidden", String(isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("noscroll");
    });
  }

  // --- CAROUSEL ---
  const carousel   = document.querySelector(".carousel__container");
  const prevButton = document.querySelector(".carousel__button--prev");
  const nextButton = document.querySelector(".carousel__button--next");

  if (!carousel || !prevButton || !nextButton) {
    console.warn("[carousel] éléments introuvables");
    return;
  }

  // largeur dynamique d’un item
  const firstItem = carousel.querySelector(".carousel__item") || carousel.firstElementChild;
  let scrollAmount = firstItem ? firstItem.clientWidth : 260;

  // recalcule au resize (responsif)
  window.addEventListener("resize", () => {
    const ref = carousel.querySelector(".carousel__item") || carousel.firstElementChild;
    if (ref) scrollAmount = ref.clientWidth;
  });

  // clics
  prevButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({ left: +scrollAmount, behavior: "smooth" });
  });
});
