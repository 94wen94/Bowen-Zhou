const navLinks = [...document.querySelectorAll('.topnav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

const observer = new IntersectionObserver(
  (entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${active.target.id}`);
    });
  },
  { rootMargin: '-18% 0px -68%', threshold: [0, 0.2, 0.5] },
);

sections.forEach((section) => observer.observe(section));
