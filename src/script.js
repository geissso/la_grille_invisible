document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-btn");
  const nav = document.querySelector(".menu");

  const setMenuState = (shouldOpen) => {
    if (!toggle || !nav) return;
    nav.setAttribute("aria-hidden", String(!shouldOpen));
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    toggle.setAttribute("aria-label", shouldOpen ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("noscroll", shouldOpen);
  };

  if (toggle && nav) {
    // Ouverture/fermeture au clic sur le bouton
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    // Fermer quand on clique un lien du menu
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setMenuState(false);
      }
    });

    // Fermer avec Echap
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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter__form");
  const input = document.querySelector(".newsletter__input");
  const btn = document.querySelector(".newsletter__btn");
  const msg = document.querySelector(".newsletter__msg");

  // (Optionnel) désactive le bouton si vide
  const toggleButton = () => {
    btn.disabled = input.value.trim().length === 0;
  };
  toggleButton();
  input.addEventListener("input", () => {
    msg.textContent = "";
    msg.className = "newsletter__msg";
    toggleButton();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.textContent = "Oups, l’adresse e-mail semble invalide.";
      msg.className = "newsletter__msg is-error";
      input.focus();
      return;
    }

    // Succès (simulation sans backend)
    msg.textContent = "Merci ! Vous êtes bien abonné·e à la newsletter.";
    msg.className = "newsletter__msg is-success";

    // Réinitialise le champ
    form.reset();
    toggleButton();
  });
});
// === Carousel Effet Matilda ===
document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".effet_matilda-carousel__viewport");
  if (!viewport) return;

  const track = viewport.querySelector(".effet_matilda-carousel__track");
  const prev = viewport.querySelector(".effet_matilda-carousel__arrow--prev");
  const next = viewport.querySelector(".effet_matilda-carousel__arrow--next");

  const cardWidth = () => viewport.getBoundingClientRect().width;

  const go = (dir = 1) => {
    track.scrollBy({ left: dir * cardWidth(), behavior: "smooth" });
  };

  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));

  // Drag / Swipe
  let isDown = false, startX = 0, scrollLeft = 0;

  track.addEventListener("pointerdown", (e) => {
    isDown = true;
    track.setPointerCapture(e.pointerId);
    startX = e.clientX;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    track.scrollLeft = scrollLeft - dx;
  });

  const endDrag = () => (isDown = false);
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("pointerleave", endDrag);
});
