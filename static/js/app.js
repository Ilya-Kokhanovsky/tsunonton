/**
 * Tsun On TON - Main Application Logic
 * Handles Chart.js, Mascot Interactions, and UI Events
 */

document.addEventListener("DOMContentLoaded", function () {
  initChart();
  initMascot();
  initClipboard();
  initMobileMenu();
});

/* --- 1. Tokenomics Chart (Chart.js) --- */
function initChart() {
  const ctx = document.getElementById("tokenomicsChart");
  if (!ctx) return;

  new Chart(ctx.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: ["Game Rewards", "Community", "Dev/Team", "Liquidity (Locked)"],
      datasets: [
        {
          label: "Token Distribution",
          data: [50, 20, 15, 15],
          backgroundColor: [
            "#ff69b4", // Hot Pink (Game)
            "#0088cc", // TON Blue (Community)
            "#a855f7", // Purple (Dev)
            "#22c55e", // Green (Liquidity)
          ],
          borderWidth: 0,
          hoverOffset: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { family: "'Nunito', sans-serif", size: 14 },
            padding: 20,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          titleColor: "#333",
          bodyColor: "#666",
          borderColor: "#ff69b4",
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function (context) {
              return ` ${context.label}: ${context.raw}%`;
            },
          },
        },
      },
      cutout: "60%",
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  });
}

/* --- 2. Mascot "Game" Interaction --- */
function initMascot() {
  const mascotZone = document.getElementById("mascot-click-zone");
  const bubbleText = document.getElementById("bubble-text");
  const bubble = document.getElementById("mascot-bubble");

  if (!mascotZone || !bubbleText) return;

  // Tsundere phrases
  const phrases = [
    // --- Classic Tsundere (Classic) ---
    "Don't touch me!",
    "Idiot! Not there!",
    "It's not like I like you...",
    "Hmph! Baka!",
    "Why are you still here?",
    "Don't get the wrong idea!",
    "Ugh, you're so annoying!",
    "Stop staring at me!",

    // --- Interaction (Reaction to clicks) ---
    "Stop clicking so fast!",
    "H-hey! That tickles!",
    "You have nothing better to do?",
    "My eyes are up here!",
    "Do you think this is a game?!",

    // --- Crypto / TON Specific (Crypto Theme) ---
    "Buy $TSUN already!",
    "Ugh, fine. Take my tokens.",
    "Don't you dare sell me!",
    "You better have Diamond Hands!",
    "Are we mooning yet?",
    "Liquidity is locked, unlike your brain!",
    "Don't look at other coins! 😠",
    "Gas fees are low, so buy more!",

    // --- Dere / Soft side (Rare Cuteness) ---
    "Fine, you can stay.",
    "I guess... you're not the worst.",
    "Thanks for holding... dummy.",
    "M-maybe we can go to the moon together...",
    "Make sure to connect your wallet, okay?",
  ];

  mascotZone.addEventListener("click", (e) => {

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    bubbleText.innerText = randomPhrase;

    // Bubble animation
    bubble.style.transform = "scale(1.1)";
    setTimeout(() => (bubble.style.transform = "scale(1)"), 150);

    // Heart effect (Particles)
    createHeart(e.clientX, e.clientY);
  });
}

// Creating floating heart
function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "fixed";
  heart.style.left = x - 10 + "px";
  heart.style.top = y - 10 + "px";
  heart.style.fontSize = "24px";
  heart.style.pointerEvents = "none";
  heart.style.transition = "all 0.8s ease-out";
  heart.style.zIndex = "100";
  heart.style.opacity = "1";

  document.body.appendChild(heart);

  // Animation of floating up and fading out
  requestAnimationFrame(() => {
    const randomX = (Math.random() - 0.5) * 50;
    heart.style.transform = `translate(${randomX}px, -100px) scale(1.5)`;
    heart.style.opacity = "0";
  });

  setTimeout(() => {
    if (document.body.contains(heart)) {
      document.body.removeChild(heart);
    }
  }, 800);
}

/* --- 3. Clipboard Functionality --- */
function initClipboard() {
  const copyBtn = document.getElementById("copy-contract-btn");
  const contractText = document.getElementById("contract-address");
  const toast = document.getElementById("copy-toast");
  const realAddress = "EQB1oXiTnD34HwdH0L1fiWtKg0XWMD-47t8i933VhUeNDsd_";

  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(realAddress)
      .then(() => {
        // UI Feedback
        contractText.classList.add("text-green-600");
        contractText.innerText = "Copied!";
        toast.classList.remove("opacity-0");

        setTimeout(() => {
          contractText.innerText = realAddress;
          contractText.classList.remove("text-green-600");
          toast.classList.add("opacity-0");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        // Fallback for older browsers (optional)
      });
  });
}

/* --- 4. Mobile Navigation --- */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    // Change icon (hamburger <-> cross)
    const icon = btn.querySelector("i");
    if (menu.classList.contains("hidden")) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    } else {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
  });

  // Close menu on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      const icon = btn.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });
}