// Add shadow effect when scrolling
window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("shadow-lg");
    } else {
        navbar.classList.remove("shadow-lg");
    }
});