document.addEventListener("DOMContentLoaded", () => {
  // Menu (inchangé)
  const toggle = document.querySelector(".menu-btn");
  const nav = document.querySelector(".menu");
   const setMenuState = (shouldOpen) => {
    if (!toggle || !nav) return;
    nav.setAttribute("aria-hidden", String(!shouldOpen));
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    document.body.classList.toggle("noscroll", shouldOpen);
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });
  }

  // --- CAROUSEL ---
  const carousel = document.querySelector(".carousel__container");
  const prevButton = document.querySelector(".carousel__button--prev");
  const nextButton = document.querySelector(".carousel__button--next");

  if (!carousel || !prevButton || !nextButton) {
    console.warn("[carousel] éléments introuvables");
    return;
  }

   const computeScrollAmount = () => {
    const reference = carousel.querySelector(".carousel__item") || carousel.firstElementChild;
    if (!reference) return 0;

    const itemWidth = reference.getBoundingClientRect().width;
    const styles = window.getComputedStyle(carousel);
    const gap = parseInt(styles.columnGap || styles.gap || "0", 10);

    return itemWidth + gap;
  };

  let scrollAmount = computeScrollAmount();

  const updateButtons = () => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    prevButton.disabled = carousel.scrollLeft <= 0;
    nextButton.disabled = carousel.scrollLeft >= maxScroll - 1;
  };

  // recalcule au resize (responsif)
  window.addEventListener("resize", () => {
    scrollAmount = computeScrollAmount();
    updateButtons();
  });

  // clics
  prevButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({ left: +scrollAmount, behavior: "smooth" });
  });
  carousel.addEventListener("scroll", updateButtons, { passive: true });
  updateButtons();
});
