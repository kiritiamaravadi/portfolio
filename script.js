// ============================================
// Particles.js Initialization
// ============================================
particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 900,
      },
    },
    color: { value: "#30363d" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
    },
    opacity: { value: 0.35, random: true },
    size: { value: 2.5, random: true },
    line_linked: {
      enable: true,
      distance: 140,
      color: "#30363d",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      grab: {
        distance: 150,
        line_linked: { opacity: 0.4 },
      },
      push: { particles_nb: 3 },
    },
  },
  retina_detect: true,
});

// ============================================
// Scroll Reveal Animation (Intersection Observer)
// ============================================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ============================================
// Active Nav Link Highlight
// ============================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "-80px 0px 0px 0px",
  }
);

sections.forEach((section) => navObserver.observe(section));

// ============================================
// Email Form Handler
// ============================================
document.getElementById("emailForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/submit-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    alert("An error occurred. Please try again later.");
    console.error(error);
  }
});
