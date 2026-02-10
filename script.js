// ============================================
// Particles.js Initialization
// ============================================
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: { value: "#30363d" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
    },
    opacity: {
      value: 0.6,
      random: true,
      anim: { enable: false },
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#30363d",
      opacity: 0.35,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: { particles_nb: 4 },
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
