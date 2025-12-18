// ===== PASSWORD CONFIG =====
const SITE_PASSWORD = "shamme14";

// ===== SCROLL REVEAL =====
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

// ===== PASSWORD GATE =====
function setupPasswordGate() {
  const overlay = document.getElementById("password-overlay");
  const input = document.getElementById("password-input");
  const button = document.getElementById("password-submit");
  const error = document.getElementById("password-error");

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
      }, 200);
    } else {
      error.style.display = "block";
      input.value = "";
      input.focus();
    }
  };

  button.onclick = check;
  input.addEventListener("keydown", (e) => e.key === "Enter" && check());
}

// ===== EXIT POPUP =====
function setupExitPopup() {
  const overlay = document.getElementById("visitor-overlay");
  const closeBtn = document.getElementById("visitor-close-btn");
  const form = document.getElementById("visitor-form");

  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0 && localStorage.getItem("visitorFormDone") !== "yes") {
      overlay.style.display = "flex";
    }
  });

  closeBtn.onclick = () => overlay.style.display = "none";

  form.addEventListener("submit", () => {
    localStorage.setItem("visitorFormDone", "yes");
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  setupScrollReveal();
  setupPasswordGate();
  setupExitPopup();
});
