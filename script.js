const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const toast = document.getElementById("toast");
const cursorGlow = document.querySelector(".cursor-glow");

document.getElementById("year").textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("kc-theme");
if (savedTheme === "dark") {
    body.classList.add("dark");
    themeIcon.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("kc-theme", isDark ? "dark" : "light");
    themeIcon.textContent = isDark ? "☾" : "☼";
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

const updateActiveNav = () => {
    let current = "home";

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top <= 150) {
            current = section.id;
        }
    });

    navItems.forEach(item => {
        item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
    });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

document.querySelectorAll(".project-demo").forEach(link => {
    link.addEventListener("click", event => {
        if (link.getAttribute("href") === "#") {
            event.preventDefault();
            const projectName = link.dataset.project;
            toast.querySelector("p").textContent =
                `${projectName}: add your actual activity file or project URL to this button.`;
            toast.classList.add("show");

            clearTimeout(window.toastTimer);
            window.toastTimer = setTimeout(() => {
                toast.classList.remove("show");
            }, 3200);
        }
    });
});

document.getElementById("backTop").addEventListener("click", event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("mousemove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        navLinks.classList.remove("open");
    }
});
