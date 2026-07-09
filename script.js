/* ===========================
   DEVIN GRUBER PORTFOLIO
   Main JavaScript
   =========================== */

// ── Nav: scroll state ──────────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ── Mobile nav toggle ─────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80; // nav height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Fade-in on scroll ─────────────────────────────────────────
const fadeElements = document.querySelectorAll('.section-title, .section-subtitle, .about-image, .about-text, .photo-item, .video-item, .skill-card, .contact-content');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach((el, index) => {
    el.classList.add('fade-in');
    // Stagger delay for grid items
    const parent = el.closest('.photo-grid, .skills-grid, .video-grid');
    if (parent) {
        const siblings = Array.from(parent.children);
        const i = siblings.indexOf(el);
        el.style.transitionDelay = `${i * 0.07}s`;
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

// ── Photo grid: lightbox on click ───────────────────────────
// (Placeholder note: uncomment and wire up real images when added)
/*
const photoItems = document.querySelectorAll('.photo-item');
photoItems.forEach(item => {
    item.addEventListener('click', () => {
        // Lightbox logic goes here
    });
});
*/
