// STAR RENDERING

// Renders star SVGs based on the data-rating attribute of a container element
function renderStars(container) {
  const rating = parseFloat(container.dataset.rating) || 0; // Get rating from data attribute
  container.innerHTML = ""; // Clear any existing stars

  // Create 5 stars (SVGs)
  for (let i = 1; i <= 5; i++) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.style.marginRight = "2px";

    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    // Decide which star icon to use: full or empty
    if (i <= Math.floor(rating)) {
      use.setAttribute("href", "#star-full");
    } else {
      use.setAttribute("href", "#star-empty");
    }
    svg.appendChild(use);
    container.appendChild(svg);
  }
}

// Wait for DOM to load, then render stars for all elements with .stars[data-rating]
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stars[data-rating]").forEach(renderStars);
});