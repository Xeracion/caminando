// Menú móvil
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Aparición al hacer scroll
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}

// Contadores animados
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-count]").forEach((el) => {
  if (reduce || !("IntersectionObserver" in window)) return;
  const target = Number(el.dataset.count);
  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  obs.observe(el);
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
