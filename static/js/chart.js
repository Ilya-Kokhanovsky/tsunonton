/* --- 1. Accurate Tokenomics Chart --- */
export function initChart() {
  const ctx = document.getElementById("tokenomicsChart");
  if (!ctx) return;

  const isDark = document.documentElement.classList.contains("dark");
  const labelColor = isDark ? "#cbd5e1" : "#475569";
  const tooltipBg = isDark
    ? "rgba(15, 23, 42, 0.9)"
    : "rgba(255, 255, 255, 0.95)";
  const tooltipTitle = isDark ? "#ffffff" : "#1f2937";
  const tooltipBody = isDark ? "#f1f5f9" : "#475569";
  const tooltipBorder = isDark ? "#334155" : "#fce7f3";

  new Chart(ctx.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: [
        "Game Rewards",
        "Community",
        "Liquidity Locked",
        "Dev/Marketing",
      ],
      datasets: [
        {
          data: [50, 20, 15, 15],
          backgroundColor: ["#ff69b4", "#0EA5E9", "#22c55e", "#a855f7"],
          borderWidth: 2,
          borderColor: isDark ? "#1f2937" : "#ffffff",
          hoverOffset: 10,
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
            font: {
              family: "'Nunito', sans-serif",
              size: window.innerWidth < 640 ? 12 : 14,
              weight: "bold",
            },
            padding: window.innerWidth < 640 ? 10 : 15,
            usePointStyle: true,
            color: labelColor,
          },
        },
        tooltip: {
          backgroundColor: tooltipBg,
          titleColor: tooltipTitle,
          bodyColor: tooltipBody,
          borderColor: tooltipBorder,
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function (context) {
              return ` ${context.label}: ${context.raw}%`;
            },
          },
        },
      },
      cutout: "65%",
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  });
}
