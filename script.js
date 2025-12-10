// ============= CONFIG =============
// Change this to your password
const SITE_PASSWORD = "shamme14";

// Set your birthday here (1–12 for month, 1–31 for day)
const BDAY_MONTH = 1;  // Example: 7 = July
const BDAY_DAY = 25;   // Example: 12th

// ============= THEME LOGIC =============
function determineTheme(today) {
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // Birthday theme = highest priority
  if (month === BDAY_MONTH && day === BDAY_DAY) {
    return "birthday";
  }

  // Simple season mapping (tuned for India style)
  if (month === 2 || month === 3) return "spring";       // Feb–Mar
  if (month >= 4 && month <= 6) return "summer";         // Apr–Jun
  if (month >= 7 && month <= 9) return "rainy";          // Jul–Sep
  return "winter";                                      // Oct–Jan
}

function applySeasonalTheme() {
  const today = new Date();
  const theme = determineTheme(today);
  document.body.classList.add(`theme-${theme}`);
}

// ============= SCROLL REVEAL =============
function setupScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  const onScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
}

// ============= PASSWORD GATE =============
function setupPasswordGate() {
  const overlay = document.getElementById("password-overlay");
  const input = document.getElementById("password-input");
  const button = document.getElementById("password-submit");
  const error = document.getElementById("password-error");

  if (!overlay || !input || !button) return;

  const alreadyUnlocked = sessionStorage.getItem("portfolioUnlocked");
  if (alreadyUnlocked === "yes") {
    overlay.style.display = "none";
    // Also show visitor popup if needed
    showVisitorPopupOnce();
    return;
  }

  const checkPassword = () => {
    const value = input.value.trim();
    if (value === SITE_PASSWORD) {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        sessionStorage.setItem("portfolioUnlocked", "yes");
        showVisitorPopupOnce();
      }, 250);
    } else {
      error.style.display = "block";
      input.value = "";
      input.focus();
    }
  };

  button.addEventListener("click", checkPassword);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkPassword();
    }
  });

  setTimeout(() => input.focus(), 200);
}

// ============= VISITOR POPUP =============
function showVisitorPopupOnce() {
  const overlay = document.getElementById("visitor-overlay");
  const closeBtn = document.getElementById("visitor-close-btn");
  const form = document.getElementById("visitor-form");

  if (!overlay) return;

  const alreadySent = localStorage.getItem("visitorFormDone");
  if (alreadySent === "yes") return;

  overlay.style.display = "flex";

  const closePopup = () => {
    overlay.style.display = "none";
    // Optional: remember user closed popup even without sending
    // localStorage.setItem("visitorFormDone", "yes");
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  if (form) {
    form.addEventListener("submit", () => {
      // Mark as done so we don't show again on next visit
      localStorage.setItem("visitorFormDone", "yes");
    });
  }
}

// ============= PARALLAX FX (SMALL) =============
function setupParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    hero.style.transform = `translateY(${y * 6}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.transform = "translateY(0)";
  });
}

// ============= INIT =============
document.addEventListener("DOMContentLoaded", () => {
  applySeasonalTheme();
  setupScrollReveal();
  setupPasswordGate();
  setupParallax();
});
