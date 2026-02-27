// Select all slides
const slides = document.querySelectorAll(".slide");

let currentIndex = 0;

// Function to update active slide
function updateSlides() {

    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove("active"));

    // Add active class to current slide
    slides[currentIndex].classList.add("active");
}

// Function to auto move slider
function autoSlide() {

    // Move index forward
    currentIndex++;

    // If last image reached, reset to first
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    updateSlides();
}

// Initialize first slide
updateSlides();

// Auto slide every 3 seconds
setInterval(autoSlide, 3000);