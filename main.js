const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");
const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];

toggle?.addEventListener("click", () => {
  const nextState = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(nextState));
  toggle.textContent = nextState ? "Close" : "Menu";
  menu?.classList.toggle("open", nextState);
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) toggle.textContent = "Menu";
    menu?.classList.remove("open");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!current) return;

    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current.target.id}`);
    });
  },
  { rootMargin: "-18% 0px -66%", threshold: [0, 0.2, 0.5] },
);

sections.forEach((section) => sectionObserver.observe(section));

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
