const skills = [
  ["Java", "backend"],
  ["Spring Boot", "backend"],
  ["Spring Security", "backend"],
  ["Hibernate", "backend"],
  ["REST APIs", "backend"],
  ["Microservices", "backend"],
  ["API Gateway", "backend"],
  ["Event-Driven Architecture", "backend"],
  ["Apache Kafka", "backend"],
  ["JWT Authentication", "backend"],
  ["JavaScript", "frontend"],
  ["Angular", "frontend"],
  ["React", "frontend"],
  ["UI Integration", "frontend"],
  ["Python", "ai"],
  ["OpenAI", "ai"],
  ["GitHub Copilot", "ai"],
  ["Microsoft Copilot", "ai"],
  ["Prompt Engineering", "ai"],
  ["GenAI-assisted Development", "ai"],
  ["AWS EC2", "cloud"],
  ["AWS S3", "cloud"],
  ["Azure CI/CD", "cloud"],
  ["Jenkins", "cloud"],
  ["YAML", "cloud"],
  ["MySQL", "backend"],
  ["PostgreSQL", "backend"],
  ["Kibana", "tools"],
  ["AWS CloudWatch", "tools"],
  ["JUnit", "tools"],
  ["Mockito", "tools"],
  ["GitHub", "tools"],
  ["GitLab", "tools"],
  ["Postman", "tools"],
  ["Swagger UI", "tools"],
  ["SonarQube", "tools"]
];

const grid = document.querySelector("#skillGrid");
const filters = document.querySelectorAll(".filter");
const progress = document.querySelector(".progress");
const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");
const focusButtons = document.querySelectorAll(".impact-item");
const mapNodes = document.querySelectorAll(".map-node");
const mapPopover = document.querySelector("#mapPopover");
const mapClose = document.querySelector(".map-close");
const mapPopoverKicker = document.querySelector("#mapPopoverKicker");
const mapPopoverTitle = document.querySelector("#mapPopoverTitle");
const mapPopoverText = document.querySelector("#mapPopoverText");

const mapDetails = {
  ui: {
    kicker: "Frontend integration",
    title: "React / Angular UI",
    text: "I support Angular and React UI integrations by shaping API contracts, debugging consumption issues, and making backend responses easier for frontend teams to use."
  },
  api: {
    kicker: "Secure API layer",
    title: "REST APIs + JWT",
    text: "I design REST APIs with JWT authentication, role-based authorization, validation, pagination, filtering, sorting, and consistent exception handling."
  },
  services: {
    kicker: "Core backend",
    title: "Spring Boot Services",
    text: "I build Spring Boot microservices with clear service-layer logic, optimized database calls, robust request handling, and production-focused maintainability."
  },
  kafka: {
    kicker: "Event-driven communication",
    title: "Kafka Consumers",
    text: "I implement Kafka consumer services for asynchronous processing and inter-service communication across distributed enterprise systems."
  },
  database: {
    kicker: "Data persistence",
    title: "PostgreSQL / MySQL",
    text: "I work with relational databases for enterprise data flows, tuning service logic to reduce redundant calls and improve API response time."
  },
  cloud: {
    kicker: "Delivery pipeline",
    title: "AWS + Azure CI/CD",
    text: "I deploy services across DEV, TEST, UAT, and PROD, using AWS EC2, S3, Azure YAML pipelines, Jenkins, and environment-based release patterns."
  },
  observability: {
    kicker: "Production support",
    title: "Kibana / CloudWatch",
    text: "I monitor logs, diagnose timeout failures, runtime exceptions, and data inconsistencies, then convert production learnings into stronger service behavior."
  }
};

function renderSkills(active = "all") {
  grid.innerHTML = skills
    .map(([name, group]) => {
      const hidden = active !== "all" && group !== active ? " hidden" : "";
      return `<span class="skill-chip${hidden}" data-group="${group}">${name}</span>`;
    })
    .join("");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderSkills(button.dataset.filter);
  });
});

focusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    focusButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("#expertise").scrollIntoView({ behavior: "smooth", block: "start" });
    const target = button.dataset.focus;
    const filter = document.querySelector(`.filter[data-filter="${target}"]`);
    if (filter) {
      filter.click();
    }
  });
});

function openMapPopover(key) {
  const detail = mapDetails[key];
  if (!detail) {
    return;
  }

  mapPopoverKicker.textContent = detail.kicker;
  mapPopoverTitle.textContent = detail.title;
  mapPopoverText.textContent = detail.text;
  mapPopover.hidden = false;
  mapClose.focus();
}

function closeMapPopover() {
  mapPopover.hidden = true;
}

mapNodes.forEach((node) => {
  node.addEventListener("click", () => openMapPopover(node.dataset.map));
});

mapClose.addEventListener("click", closeMapPopover);

mapPopover.addEventListener("click", (event) => {
  if (event.target === mapPopover) {
    closeMapPopover();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mapPopover.hidden) {
    closeMapPopover();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max <= 0 ? 0 : (window.scrollY / max) * 100;
  progress.style.width = `${value}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  const isLight = document.documentElement.classList.contains("light");
  themeToggle.innerHTML = `<i data-lucide="${isLight ? "sun" : "moon"}"></i>`;
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function setMenuOpen(isOpen) {
  primaryNav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720) {
    setMenuOpen(false);
  }
});

renderSkills();
updateProgress();

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
