// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
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

  // Add click handler for Buy Now button
  const buyNowButton = document.querySelector("nav button.bg-pink-500");
  if (buyNowButton) {
    buyNowButton.addEventListener("click", function () {
      // Add your buy now logic here
      // alert("Redirecting to purchase page...");
      // window.location.href = 'your-purchase-link-here';
    });
  }

  // Copy-to-clipboard handler for contract address (moved from inline script)
  (function(){
    const addrEl = document.getElementById('contractAddress');
    const statusEl = document.getElementById('copyStatus');
    if (!addrEl) return;
    const originalText = addrEl.textContent.trim();
    addrEl.addEventListener('click', async function(){
      const textToCopy = originalText;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const ta = document.createElement('textarea');
          ta.value = textToCopy;
          ta.style.position = 'fixed'; ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        // show temporary feedback (short English word 'Copied')
        addrEl.textContent = 'Copied';
        addrEl.classList.add('text-green-600','font-semibold');
        if (statusEl) statusEl.textContent = 'Copied to clipboard';

        // revert after 2 seconds
        setTimeout(() => {
          addrEl.textContent = originalText;
          addrEl.classList.remove('text-green-600','font-semibold');
          if (statusEl) statusEl.textContent = '';
        }, 2000);

      } catch (err) {
        console.error('Copy failed', err);
      }
    });
  })();

  console.log("App initialized!");
});