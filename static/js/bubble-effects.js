// Bubble Effects JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize bubble effects
  initBubbleEffects();

  // Add interactive hover effect
  addBubbleInteractivity();

  // Start auto text change with slower intervals
  startAutoTextChange();
});

function initBubbleEffects() {
  const bubbles = document.querySelectorAll(".tsun-bubble");
  bubbles.forEach((bubble) => {
    // Add blush elements to each bubble
    const blushRight = document.createElement("div");
    blushRight.className = "blush-right";
    bubble.appendChild(blushRight);
  });

  console.log("✨ Tsun bubble effects initialized!");
}

function addBubbleInteractivity() {
  const bubbles = document.querySelectorAll(".tsun-bubble");

  bubbles.forEach((bubble) => {
    // Add hover effect for desktop
    bubble.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-2px)";
      this.style.boxShadow = "0 20px 50px rgba(236, 72, 153, 0.5)";
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      this.style.cursor = "pointer";
    });

    bubble.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "0 8px 32px rgba(236, 72, 153, 0.3)";
    });

    // Add click effect for both desktop and mobile
    const handleBubbleClick = function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // Get position for heart explosion
      let clientX, clientY;
      if (e.type === "click") {
        // Mouse click
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.type === "touchend") {
        // Touch event
        const touch = e.changedTouches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      }

      // Create heart explosion
      if (clientX && clientY) {
        createHeartExplosion(clientX, clientY);
      }

      // Change text with attention effect
      changeBubbleTextWithEffect();
    };

    // Add both click and touch events
    bubble.addEventListener("click", handleBubbleClick);
    bubble.addEventListener("touchend", handleBubbleClick);

    // Prevent default touch behavior
    bubble.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        this.style.transform = "scale(0.98)";
      },
      { passive: false }
    );

    bubble.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  });
}

function createHeartExplosion(x, y) {
  const hearts = ["💖", "❤️", "💕", "💗", "💓", "🌸", "✨"];
  const container = document.body;

  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.className = "explosion-heart";
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = "fixed";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = Math.random() * 10 + 16 + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";
    heart.style.userSelect = "none";

    // Random animation
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    const duration = 0.8 + Math.random() * 0.4;
    const size = 0.3 + Math.random() * 0.4;

    // Create keyframes for this specific heart
    const styleId = `heart-style-${Date.now()}-${i}`;
    const keyframes = `
            @keyframes ${styleId} {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1) rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: 
                        translate(${Math.cos(angle) * distance}px, ${
      Math.sin(angle) * distance
    }px) 
                        scale(${size}) 
                        rotate(${Math.random() * 360}deg);
                }
            }
        `;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = keyframes;
    document.head.appendChild(style);

    heart.style.animation = `${styleId} ${duration}s ease-out forwards`;
    container.appendChild(heart);

    // Remove heart and style after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
      const styleElem = document.getElementById(styleId);
      if (styleElem) {
        styleElem.remove();
      }
    }, duration * 1000);
  }
}

function changeBubbleTextWithEffect() {
  const textVariations = [
    "I-It's not like I want you to buy me or anything... B-BAKA!",
    "Hmph! I don't care if you invest or not... idiot!",
    "You better not think I'm doing this for you! Baka!",
    "I'm only saying this once... it's not like I like you or anything!",
    "Don't get the wrong idea! I'm not being nice to you!",
    "It's not like I'm happy you're here or anything...",
    "Why are you still looking at me? Go away!",
    "I don't need your support... but you can stay if you want.",
    "This project would be fine without you... probably.",
    "Stop staring! It's not like I'm cute or anything!",
    "I'm not doing this for your attention, you know!",
    "You're really going to click that button? How predictable...",
  ];

  const bubbleTexts = document.querySelectorAll(".bubble-text");
  const bubbles = document.querySelectorAll(".tsun-bubble");

  if (!bubbleTexts.length || !bubbles.length) return;

  // Get current text from first bubble
  const currentText = bubbleTexts[0].textContent || bubbleTexts[0].innerText;

  // Get random variation that's different from current
  let newText;
  let attempts = 0;
  do {
    newText = textVariations[Math.floor(Math.random() * textVariations.length)];
    attempts++;
    // Prevent infinite loop
    if (attempts > 20) break;
  } while (currentText.includes(newText.replace(/<[^>]*>/g, "")));

  // Keep the BAKA span styling
  if (
    newText.includes("BAKA") ||
    newText.includes("Baka") ||
    newText.includes("idiot")
  ) {
    const bakaMatch = newText.match(/(B-BAKA|Baka|idiot)/);
    if (bakaMatch) {
      newText = newText.replace(
        bakaMatch[0],
        `<span class="baka-text">${bakaMatch[0]}</span>`
      );
    }
  }

  // Apply effects to all bubbles
  bubbles.forEach((bubble) => {
    bubble.classList.add("attention-grab");
    bubble.style.animation = "bubble-shake 0.5s ease-in-out";
    bubble.style.boxShadow = "0 0 30px rgba(236, 72, 153, 0.8)";
  });

  // Update text in all bubbles with transition
  bubbleTexts.forEach((bubbleText) => {
    bubbleText.style.opacity = "0";
    bubbleText.style.transition = "opacity 0.3s ease"; // Немного медленнее исчезновение
  });

  setTimeout(() => {
    bubbleTexts.forEach((bubbleText) => {
      bubbleText.innerHTML = newText;
      bubbleText.style.opacity = "1";
    });

    // Remove effects after animation - увеличенное время
    setTimeout(() => {
      bubbles.forEach((bubble) => {
        bubble.style.animation = "";
        bubble.style.boxShadow = "0 8px 32px rgba(236, 72, 153, 0.3)";
        bubble.classList.remove("attention-grab");
      });
    }, 1500); // Увеличено с 500 до 1500 мс
  }, 300); // Увеличено с 200 до 300 мс
}

function startAutoTextChange() {
  function changeWithRandomInterval() {
    // Увеличены интервалы: 15-45 секунд вместо 5-30
    const randomDelay = Math.random() * 30000 + 15000; // 15-45 seconds
    setTimeout(() => {
      changeBubbleTextWithEffect();
      changeWithRandomInterval();
    }, randomDelay);
  }

  // Start the cycle
  changeWithRandomInterval();
}

// Add CSS for explosion hearts
if (!document.querySelector("#bubble-effects-styles")) {
  const explosionStyles = `
        .explosion-heart {
            position: fixed;
            pointer-events: none;
            z-index: 1000;
            user-select: none;
            animation-timing-function: ease-out;
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.id = "bubble-effects-styles";
  styleSheet.textContent = explosionStyles;
  document.head.appendChild(styleSheet);
}

// Export functions for global access if needed
window.tsunBubbleEffects = {
  init: initBubbleEffects,
  createExplosion: createHeartExplosion,
  changeText: changeBubbleTextWithEffect,
};
