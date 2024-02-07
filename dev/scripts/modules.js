// Scroll to Top Button
var scrollToTopBtn = document.getElementById("scrollToTopBtn")
var rootElement = document.documentElement

scrollToTopBtn.addEventListener("click", scrollToTop)

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
  })
}

// Feature Carousel

// Site Settings Lightbox