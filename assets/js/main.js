/**
 * MediCare Plus - Complete Main JavaScript File
 * Handles slider, scroll effects, mobile menu, modals, and all interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    initScrollEffects();
    initMobileMenu();
    initDetailModals();
    initSmoothScroll();
    initRevealOnScroll();
    initBackToTop();
    initScrollIndicator();
});


/* =========================================
   SLIDER FUNCTIONALITY
========================================= */
function initSlider() {

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderContainer = document.querySelector('.slider-container');

    if (!slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isAnimating = false;

    updateSlidePositions();
    startAutoSlide();

    window.moveSlide = function (direction) {

        if (isAnimating) return;
        isAnimating = true;

        if (direction === 'next') {
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }

        updateSlidePositions();
        resetAutoSlide();

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    };

    function updateSlidePositions() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'left', 'right');

            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
                slide.classList.add('left');
            } else if (index === (currentSlide + 1) % totalSlides) {
                slide.classList.add('right');
            }
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isAnimating) moveSlide('next');
        }, 3000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => moveSlide('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => moveSlide('next'));

    if (sliderContainer) {

        sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderContainer.addEventListener('mouseleave', startAutoSlide);

        let touchStartX = 0;

        sliderContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? moveSlide('next') : moveSlide('prev');
            }
        }, { passive: true });
    }

    document.addEventListener('keydown', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft') moveSlide('prev');
        if (e.key === 'ArrowRight') moveSlide('next');
    });
}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */
function initScrollEffects() {

    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function () {

        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

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
   MOBILE MENU
========================================= */
function initMobileMenu() {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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
            if (!targetElement) return;

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
   BACK TO TOP
========================================= */
function initBackToTop() {

    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';

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
        z-index: 9999;
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
   SCROLL INDICATOR
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
   DETAIL MODALS
========================================= */
function initDetailModals() {

    const detailData = {

        cardiology: {
            title: 'Cardiology',
            content: `
                <p>Comprehensive cardiac care with modern technology.</p>
                <ul>
                    <li>Angiography & Angioplasty</li>
                    <li>ECG & Echo</li>
                    <li>Pacemaker Implantation</li>
                </ul>
            `
        },

        orthopedics: {
            title: 'Orthopedics',
            content: `
                <p>Advanced bone and joint treatments.</p>
                <ul>
                    <li>Joint Replacement</li>
                    <li>Sports Injury Care</li>
                </ul>
            `
        },

        neurology: {
            title: 'Neurology',
            content: `
                <p>Brain and nervous system care.</p>
                <ul>
                    <li>Stroke Treatment</li>
                    <li>Epilepsy Management</li>
                </ul>
            `
        },

        pcod: {
            title: 'PCOD Clinic',
            content: `
                <p>Specialized hormonal and fertility care.</p>
                <ul>
                    <li>Hormone Evaluation</li>
                    <li>Diet & Lifestyle Plan</li>
                    <li>Medical Treatment</li>
                </ul>
            `
        }

    };

    document.querySelectorAll('[data-detail]').forEach(item => {

        item.addEventListener('click', function () {

            const key = this.getAttribute('data-detail');
            const data = detailData[key];
            if (!data) return;

            const modal = document.createElement('div');
            modal.className = 'detail-modal';

            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>${data.title}</h2>
                    ${data.content}
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('.close-modal').onclick = () => modal.remove();

            modal.onclick = e => {
                if (e.target === modal) modal.remove();
            };
        });
    });
}