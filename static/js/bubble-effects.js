if (window.tsunBubbleScriptLoaded) {
  console.warn("⚠️ Bubble script prevented double loading");
} else {
  window.tsunBubbleScriptLoaded = true;

  document.addEventListener("DOMContentLoaded", function () {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (window.tsunBubbleTimer) clearTimeout(window.tsunBubbleTimer);

    initBubbleEffects();

    if (!isMobile) {
      addBubbleInteractivity();
    }

    if (!document.hidden) {
      startAutoTextChange();
    }
  });
}

function initBubbleEffects() {
  const bubbles = document.querySelectorAll(".tsun-bubble");
  bubbles.forEach((bubble) => {
    if (!bubble.querySelector(".blush-right")) {
      const blushRight = document.createElement("div");
      blushRight.className = "blush-right";
      bubble.appendChild(blushRight);
    }

    const textEl = bubble.querySelector(".bubble-text");
    if (textEl) {
      textEl.style.transition = "opacity 0.5s ease-in-out";
    }
  });

  if (!document.querySelector("#bubble-effects-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "bubble-effects-styles";
    styleSheet.textContent = `
            .tsun-bubble {
                will-change: transform; 
                transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            .explosion-heart {
                position: fixed;
                pointer-events: none;
                z-index: 1000;
                user-select: none;
                will-change: transform, opacity;
            }
            .attention-grab {
                animation: popScale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes popScale {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
    document.head.appendChild(styleSheet);
  }
}

function addBubbleInteractivity() {
  const bubbles = document.querySelectorAll(".tsun-bubble");
  bubbles.forEach((bubble) => {
    if (bubble.dataset.init === "true") return;
    bubble.dataset.init = "true";

    bubble.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-2px)";
      this.style.boxShadow = "0 15px 35px rgba(236, 72, 153, 0.4)";
      this.style.cursor = "pointer";
    });

    bubble.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "";
    });

    bubble.addEventListener("click", function (e) {
      createHeartExplosion(e.clientX, e.clientY);
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1.05) translateY(-2px)";
      }, 150);
    });
  });
}

const tsunderePhrases = [
  // --- Classic Tsundere Phrases ---
  "I-It's not like I want you to buy me or anything... <span class='baka-text text-red-400'>B-BAKA!</span>",
  "Don't get the wrong idea! I'm only here because I want to be! 😤",
  "W-why are you staring at me? Look at the chart instead! 👀",

  // --- About game ---
  "H-hey! Stop clicking so fast! You're making me dizzy! 🌀",
  "Did you really just click me 1000 times? <span class='text-pink-500'>Get a life!</span> (But thanks...)",
  "Ow! Be gentle with your cursor, you brute! 💢",
  "You think clicking makes you a trader? ...Well, maybe a little. 🤏",
  "Fine! Take your tokens! Just stop poking me! 🍅",

  // --- About Trading / TON ---
  "Are you holding or just happy to see me? ...Don't answer that! 😳",
  "You better not be looking at other coins on TON! <span class='text-red-500 font-bold'>I'm the only one!</span> 🔪",
  "Gas fees are low, so you have NO excuse not to buy more! ⛽",
  "Selling? Hmph. Go ahead. See if I care! ... <span class='text-xs text-gray-400'>(Please don't go)</span>",
  "Don't look at my Market Cap! It's rude to ask a girl her size! 😡",
  "We... we might go to the moon. But don't get ahead of yourself! 🚀",
  "Is your wallet connected properly? <span class='text-blue-500'>Check it again, dummy!</span>",

  // --- Hidden Affection ---
  "I guess... holding $TSUN isn't the worst decision you've made. 💕",
  "You're still here? ...I suppose I don't mind your company. ☕",
  "Make sure you DYOR... I don't want you to be broke, okay? 📚",
  "Fine, you can brag about your bag. But just this once! ✨",
  "If we hit 10M cap, maybe... just maybe... I'll be nice to you. 🤫",

  // --- Aggressive/Funny ---
  "<span class='baka-text text-red-400'>B-BAKA!</span> Don't just stare, BUY something! 💸",
  "Ugh, you're such a noob. Do I have to explain slippage too? 📉",
  "Only 1B supply... take it or leave it! (Please take it) 💎",
];

function changeBubbleTextWithEffect() {
  if (document.hidden) return;

  const bubbles = document.querySelectorAll(".tsun-bubble");
  bubbles.forEach((bubble) => {
    const textElement = bubble.querySelector(".bubble-text");
    if (!textElement) return;

    bubble.classList.add("attention-grab");
    textElement.style.opacity = "0";

    setTimeout(() => {
      const randomPhrase =
        tsunderePhrases[Math.floor(Math.random() * tsunderePhrases.length)];
      textElement.innerHTML = randomPhrase;
      textElement.style.opacity = "1";
    }, 400);

    setTimeout(() => {
      bubble.classList.remove("attention-grab");
    }, 1000);
  });
}

function startAutoTextChange() {
  if (window.tsunBubbleTimer) clearTimeout(window.tsunBubbleTimer);

  function scheduleNextChange() {
    const minTime = 5000;
    const variableTime = 7000;
    const randomDelay = Math.random() * variableTime + minTime;

    window.tsunBubbleTimer = setTimeout(() => {
      changeBubbleTextWithEffect();
      scheduleNextChange();
    }, randomDelay);
  }

  scheduleNextChange();
}

function createHeartExplosion(x, y) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const particleCount = isMobile ? 5 : 12;
  const hearts = ["💖", "❤️", "💕", "💗", "✨"];

  for (let i = 0; i < particleCount; i++) {
    const heart = document.createElement("div");
    heart.className = "explosion-heart";
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

    const spreadX = (Math.random() - 0.5) * 150;
    const spreadY = (Math.random() - 0.5) * 150 - 50;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${Math.random() * 15 + 10}px`;

    document.body.appendChild(heart);

    const animation = heart.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        {
          transform: `translate(${spreadX}px, ${spreadY}px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 800 + Math.random() * 400,
        easing: "cubic-bezier(0, .9, .57, 1)",
      }
    );
    animation.onfinish = () => heart.remove();
  }
}
