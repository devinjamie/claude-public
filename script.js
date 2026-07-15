/* ===========================
   DEVIN GRUBER PORTFOLIO V4
   =========================== */

// ── Nav: scroll state & hero visibility ──────────────────────
const nav = document.getElementById('nav');
const hero = document.querySelector('.hero');

function updateNav() {
    if (!hero) return; // gallery pages don't have hero
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY < heroBottom - 80) {
        nav.classList.add('hero-visible');
        nav.classList.remove('scrolled');
    } else {
        nav.classList.remove('hero-visible');
        if (scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
}

if (hero) {
    window.addEventListener('scroll', updateNav);
    window.addEventListener('load', updateNav);
}

// ── Mobile nav toggle ─────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ── Smooth scroll for anchor links (only same-page) ──────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Fade-in on scroll ─────────────────────────────────────────
const fadeElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-image, .about-text, ' +
    '.photo-item, .video-clip, .skill-card, .contact-content, .iphone-frame-wrap, .gallery-cta'
);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach((el) => {
    el.classList.add('fade-in');
    const parent = el.closest('.photo-preview-grid, .photo-grid-full, .skills-grid, .video-preview-grid, .video-grid-full');
    if (parent) {
        const siblings = Array.from(parent.children);
        const i = siblings.indexOf(el);
        el.style.transitionDelay = `${i * 0.05}s`;
    }
    observer.observe(el);
});

// ── Active nav link highlight ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});
