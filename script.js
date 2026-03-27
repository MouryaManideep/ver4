
// Initialize particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 10 + 15 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particlesContainer.appendChild(particle);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createParticles();

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  typeWriter();
});

// Typewriter effect
const roles = [
  "Python Web Developer",
  "Machine Learning",
  "Power BI Developer",
];
let roleIndex = 0;
let charIndex = 0;

function typeWriter() {
  const typewriterElement = document.getElementById("roles");
  if (!typewriterElement) return;

  const currentRole = roles[roleIndex];
  if (charIndex < currentRole.length) {
    typewriterElement.textContent += currentRole.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  } else {
    setTimeout(() => {
      typewriterElement.textContent = "";
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      typeWriter();
    }, 2000);
  }
}

// Form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalBtnText = submitBtn.textContent;
    
    // Feedback: Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        alert("Success! Your message has been sent to Mourya.");
        contactForm.reset();
      } else {
        // Error handling
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
      }
    } catch {
      alert("Oops! There was a problem submitting your form. Please check your connection.");
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// Configuration
const defaultConfig = {
  hero_name: "Mourya Manideep Kandregula",
  hero_subtitle: "B.Tech CSE | Data Science | AI ML",
  about_who:
    "A passionate B.Tech CSE student at Lovely Professional University with a strong foundation in data science and machine learning. I specialize in transforming raw data into meaningful insights and building intelligent solutions.",
  about_mission:
    "To leverage data science and AI to solve real-world business problems and create impactful solutions. I'm committed to continuous learning and excelling in analytics and machine learning.",
  contact_email: "mouryamanideepkandregula@gmail.com",
  contact_phone: "+91-7207434389",
  contact_location: "Phagwara, Punjab, India",
};

async function onConfigChange(config) {
  const heroName = config.hero_name || defaultConfig.hero_name;
  const aboutWho = config.about_who || defaultConfig.about_who;
  const aboutMission = config.about_mission || defaultConfig.about_mission;
  const email = config.contact_email || defaultConfig.contact_email;
  const phone = config.contact_phone || defaultConfig.contact_phone;
  const location = config.contact_location || defaultConfig.contact_location;

  const heroNameEl = document.getElementById("heroName");
  const heroName2El = document.getElementById("heroName2");
  const aboutWhoEl = document.getElementById("aboutWho");
  const aboutMissionEl = document.getElementById("aboutMission");
  const contactEmailDisplayEl = document.getElementById("contactEmailDisplay");
  const contactEmailLinkEl = document.getElementById("contactEmailLink");
  const contactPhoneDisplayEl = document.getElementById("contactPhoneDisplay");
  const contactPhoneLinkEl = document.getElementById("contactPhoneLink");
  const contactLocationDisplayEl = document.getElementById(
    "contactLocationDisplay",
  );
  const contactLocationLinkEl = document.getElementById("contactLocationLink");

  if (heroNameEl) heroNameEl.textContent = heroName;
  if (heroName2El) {
    const parts = heroName.split(" ");
    heroName2El.textContent = (parts[0] || "") + " " + (parts[1] || "");
  }
  if (aboutWhoEl) aboutWhoEl.textContent = aboutWho;
  if (aboutMissionEl) aboutMissionEl.textContent = aboutMission;

  if (contactEmailDisplayEl) contactEmailDisplayEl.textContent = email;
  if (contactEmailLinkEl) contactEmailLinkEl.textContent = email;
  if (contactPhoneDisplayEl) contactPhoneDisplayEl.textContent = phone;
  if (contactPhoneLinkEl) contactPhoneLinkEl.textContent = phone;
  if (contactLocationDisplayEl) contactLocationDisplayEl.textContent = location;
  if (contactLocationLinkEl) contactLocationLinkEl.textContent = location;
}

function mapToCapabilities() {
  return {
    recolorables: [],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined,
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ["hero_name", config.hero_name || defaultConfig.hero_name],
    ["about_who", config.about_who || defaultConfig.about_who],
    ["about_mission", config.about_mission || defaultConfig.about_mission],
    ["contact_email", config.contact_email || defaultConfig.contact_email],
    ["contact_phone", config.contact_phone || defaultConfig.contact_phone],
    [
      "contact_location",
      config.contact_location || defaultConfig.contact_location,
    ],
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
  });
}

// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

function updateThemeIcon() {
  if (body.classList.contains("light-mode")) {
    themeIcon.setAttribute("data-lucide", "sun");
  } else {
    themeIcon.setAttribute("data-lucide", "moon");
  }
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Check for saved user preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
  updateThemeIcon();
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateThemeIcon();
  });
}
