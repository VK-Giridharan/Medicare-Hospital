/**
 * Care Plus - Advanced Hero Slider
 * Fully Optimized & Production Ready
 */

document.addEventListener("DOMContentLoaded", function () {
    initSlider();
});

function initSlider() {

    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const sliderContainer = document.querySelector(".slider-container");
    const indicatorsContainer = document.querySelector(".slider-indicators");
    const progressBar = document.querySelector(".slider-progress");

    if (!slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval = null;
    let isAnimating = false;
    const slideDuration = 3000;
    const animationDuration = 800;

    /* =========================================
       CREATE DOT INDICATORS
    ========================================= */
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = "";
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("slider-indicator");
            if (index === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                if (!isAnimating && index !== currentSlide) {
                    goToSlide(index);
                }
            });

            indicatorsContainer.appendChild(dot);
        });
    }

    function updateIndicators() {
        if (!indicatorsContainer) return;
        const dots = indicatorsContainer.querySelectorAll(".slider-indicator");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    /* =========================================
       UPDATE SLIDE POSITIONS
    ========================================= */
    function updateSlidePositions() {
        slides.forEach((slide, index) => {
            slide.classList.remove("active", "left", "right");

            if (index === currentSlide) {
                slide.classList.add("active");
            } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
                slide.classList.add("left");
            } else if (index === (currentSlide + 1) % totalSlides) {
                slide.classList.add("right");
            }
        });

        updateIndicators();
        restartProgressBar();
    }

    /* =========================================
       NAVIGATION FUNCTIONS
    ========================================= */
    function moveSlide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        if (direction === "next") {
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }

        updateSlidePositions();
        resetAutoSlide();

        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }

    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        currentSlide = index;
        updateSlidePositions();
        resetAutoSlide();

        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }

    window.moveSlide = moveSlide;

    /* =========================================
       BUTTON EVENTS
    ========================================= */
    if (prevBtn) {
        prevBtn.addEventListener("click", () => moveSlide("prev"));
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => moveSlide("next"));
    }

    /* =========================================
       AUTO PLAY
    ========================================= */
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            moveSlide("next");
        }, slideDuration);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    /* =========================================
       PROGRESS BAR
    ========================================= */
    function restartProgressBar() {
        if (!progressBar) return;

        progressBar.classList.remove("active");
        void progressBar.offsetWidth; // force reflow
        progressBar.classList.add("active");
    }

    /* =========================================
       PAUSE ON HOVER
    ========================================= */
    if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", () => {
            clearInterval(autoSlideInterval);
        });

        sliderContainer.addEventListener("mouseleave", () => {
            startAutoSlide();
        });
    }

    /* =========================================
       TOUCH SWIPE SUPPORT
    ========================================= */
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        sliderContainer.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const threshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                moveSlide("next");
            } else {
                moveSlide("prev");
            }
        }
    }

    /* =========================================
       KEYBOARD SUPPORT
    ========================================= */
    document.addEventListener("keydown", (e) => {
        if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

        if (e.key === "ArrowLeft") moveSlide("prev");
        if (e.key === "ArrowRight") moveSlide("next");
    });

    /* =========================================
       VISIBILITY CHANGE (TAB SWITCH)
    ========================================= */
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            clearInterval(autoSlideInterval);
        } else {
            startAutoSlide();
        }
    });

    /* =========================================
       CLICK SLIDE TO NAVIGATE
    ========================================= */
    slides.forEach(slide => {
        slide.addEventListener("click", function (e) {
            if (e.target.classList.contains("slide-btn")) return;

            const link = this.getAttribute("data-link");
            if (link && link !== "#" && link !== "") {
                window.location.href = link;
            }
        });
    });

    /* INITIAL SETUP */
    updateSlidePositions();
}


/* =========================================
   OPTIONAL MODULE EXPORT
========================================= */
if (typeof module !== "undefined" && module.exports) {
    module.exports = { initSlider };
}