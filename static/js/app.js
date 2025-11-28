AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  disable: "mobile",
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const buyNowButton = document.querySelector("nav button.bg-pink-500");
  if (buyNowButton) {
    buyNowButton.addEventListener("click", function () {
      
    });
  }

  (function () {
    const addrEl = document.getElementById("contractAddress");
    const statusEl = document.getElementById("copyStatus");
    if (!addrEl) return;

    const originalText = addrEl.textContent.trim();

    addrEl.addEventListener("click", async function () {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(originalText);
        } else {
          const ta = document.createElement("textarea");
          ta.value = originalText;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }

        const oldClasses = addrEl.className;
        addrEl.textContent = "Copied!";
        addrEl.classList.add("text-green-600", "font-bold");
        if (statusEl) statusEl.textContent = "Copied to clipboard";

        setTimeout(() => {
          addrEl.textContent = originalText;
          addrEl.classList.remove("text-green-600", "font-bold");
          if (statusEl) statusEl.textContent = "";
        }, 1500);
      } catch (err) {
        console.error("Copy failed", err);
      }
    });
  })();
});
