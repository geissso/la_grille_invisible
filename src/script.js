
const toggle = document.querySelector(".menu-btn");
const nav = document.querySelector(".menu");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    const isClosed = !isOpen;

    // inverse les états ARIA
    nav.setAttribute("aria-hidden", String(isOpen));
    toggle.setAttribute("aria-expanded", String(isClosed));

    // bloque / débloque le scroll
    document.body.classList.toggle("noscroll");

    console.log("isOpen : ", isOpen, "isClosed : ", isClosed);
  });
} else {
  console.warn("Menu : impossible de trouver .menu-btn ou .menu");
}

// CAROUSEL QUI SONT-ELLES ? //

function changeDriver(name) {
  const cards = document.querySelectorAll(".driver-card");
  const details = document.querySelectorAll(".driver-detail");

  // activer la bonne carte
  cards.forEach(card => {
    if (card.dataset.driver === name) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  // activer le bon texte
  details.forEach(detail => {
    if (detail.dataset.driver === name) {
      detail.classList.add("active");
    } else {
      detail.classList.remove("active");
    }
  });
}




