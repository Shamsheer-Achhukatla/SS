// ============= CONFIG =============
const SITE_PASSWORD = "shamme14";

const BDAY_MONTH = 1;
const BDAY_DAY = 25;

// ============= THEME LOGIC =============
function determineTheme(today) {
  const month = today.getMonth() + 1;
  const day = today.getDate();

  if (month === BDAY_MONTH && day === BDAY_DAY) return "birthday";
  if (month === 2 || month === 3) return "spring";
  if (month >= 4 && month <= 6) return "summer";
  if (month >= 7 && month <= 9) return "rainy";
  return "winter";
}

function applySeasonalTheme() {
  document.body.classList.add(`theme-${determineTheme(new Date())}`);
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

  if (sessionStorage.getItem("portfolioUnlocked") === "yes") {
    overlay.style.display = "none";
    return;
  }

  const check = () => {
    if (input.value.trim() === SITE_PASSWORD) {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        sessionStorage.setItem("portfolioUnlocked", "yes");
      }, 250);
    } else {
      error.style.display = "block";
      input.value = "";
      input.focus();
    }
  };

  button.addEventListener("click", check);
  input.addEventListener("keydown", (e) => e.key === "Enter" && check());
  setTimeout(() => input.focus(), 200);
}

// ============= EXIT INTENT POPUP =============
function setupExitIntentPopup() {
  const overlay = document.getElementById("visitor-overlay");
  if (!overlay) return;

  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0 && localStorage.getItem("visitorFormDone") !== "yes") {
      overlay.style.display = "flex";
    }
  });

  const closeBtn = document.getElementById("visitor-close-btn");
  const form = document.getElementById("visitor-form");

  closeBtn?.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  form?.addEventListener("submit", () => {
    localStorage.setItem("visitorFormDone", "yes");
  });
}

// ============= PARALLAX FX =============
function setupParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
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
  setupExitIntentPopup();
  setupParallax();
});
