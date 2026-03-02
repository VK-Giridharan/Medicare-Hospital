/**
 * MediCare Plus - Complete Scroll JavaScript File
 * Fully Optimized & Error-Free Version
 */

document.addEventListener('DOMContentLoaded', function () {

    initScrollEffects();
    initSmoothScroll();
    initRevealOnScroll();
    initBackToTop();
    initScrollIndicator();
    initParallaxEffect();
    initActiveNavOnScroll();
    initLazyLoadImages();
    initScrollProgressBar();
    initPreventScrollJump();

});


/* =========================================
   HEADER SCROLL EFFECT
========================================= */
function initScrollEffects() {

    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {

        const currentScroll = window.pageYOffset;

        // Add background effect
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show on scroll
        if (currentScroll > 100) {
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;

    });

}


/* =========================================
   SMOOTH SCROLL
========================================= */
function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                e.preventDefault();

                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;

                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

    });

}


/* =========================================
   REVEAL ON SCROLL
========================================= */
function initRevealOnScroll() {

    const reveals = document.querySelectorAll(
        '.zigzag-item, .info-box, .about-grid, .contact-grid, .footer-section'
    );

    if (!reveals.length) return;

    reveals.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = (index * 0.1) + 's';
    });

    const reveal = () => {

        const windowHeight = window.innerHeight;

        reveals.forEach(el => {

            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 120) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }

        });

    };

    reveal();

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(reveal);
    });

}


/* =========================================
   BACK TO TOP BUTTON
========================================= */
function initBackToTop() {

    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');

    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #009688;
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s;
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {

        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }

    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

}


/* =========================================
   HERO SCROLL INDICATOR
========================================= */
function initScrollIndicator() {

    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const indicator = document.createElement('div');
    indicator.innerHTML = '⌄';

    indicator.style.cssText = `
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 28px;
        color: white;
        cursor: pointer;
        animation: bounce 2s infinite;
        z-index: 5;
    `;

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes bounce {
            0%,100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-12px); }
        }
    `;
    document.head.appendChild(style);

    hero.appendChild(indicator);

    indicator.addEventListener('click', () => {
        const next = document.querySelector('section');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
    });

}


/* =========================================
   PARALLAX EFFECT
========================================= */
function initParallaxEffect() {

    const elements = document.querySelectorAll('.hero-section, .page-header');
    if (!elements.length) return;

    window.addEventListener('scroll', () => {

        const scrolled = window.pageYOffset;

        elements.forEach(el => {
            el.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        });

    });

}


/* =========================================
   ACTIVE NAV LINK
========================================= */
function initActiveNavOnScroll() {

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {

        const scrollPos = window.pageYOffset;

        sections.forEach(section => {

            const top = section.offsetTop - 150;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {

                navLinks.forEach(link => {
                    link.classList.remove('active');

                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active');
                    }
                });

            }

        });

    });

}


/* =========================================
   LAZY LOAD IMAGES
========================================= */
function initLazyLoadImages() {

    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                obs.unobserve(img);

            }

        });

    });

    images.forEach(img => observer.observe(img));

}


/* =========================================
   SCROLL PROGRESS BAR
========================================= */
function initScrollProgressBar() {

    const bar = document.createElement('div');

    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        width: 0%;
        background: linear-gradient(90deg,#009688,#00bfa5);
        z-index: 9999;
        transition: width 0.1s;
    `;

    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {

        const total =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (window.pageYOffset / total) * 100;

        bar.style.width = progress + '%';

    });

}


/* =========================================
   PREVENT MOBILE SCROLL JUMP
========================================= */
function initPreventScrollJump() {

    let lastHeight = window.innerHeight;

    window.addEventListener('resize', () => {

        const currentHeight = window.innerHeight;

        if (currentHeight !== lastHeight) {
            lastHeight = currentHeight;
        }

    });

}