// STAR RENDERING

// Render stars for each .stars element (both display and input)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.stars').forEach(el => {
    const rating = parseFloat(el.dataset.rating) || 0;
    const isInput = el.classList.contains('rating-input');
    el.innerHTML = ''; // Clear any existing stars

    // Create 5 stars (SVGs)
    for (let i = 1; i <= 5; i++) {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      star.classList.add("svg-star");
      if (isInput) star.setAttribute("data-value", i);

      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

      if (!isInput) {
        // For display, show a full, half, or empty star based on rating
        if (i <= Math.floor(rating)) {
          use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#star-full");
        } else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.25 && rating % 1 < 0.75) {
          use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#star-half");
          use.setAttribute("transform", "scale(-1,1) translate(-38,0)");
        } else {
          use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#star-empty");
        }
      } else {
        // For input, show only full or empty stars
        use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
          i <= rating ? "#star-full" : "#star-empty"
        );
      }

      star.appendChild(use);
      el.appendChild(star);
    }
  });

   // Add interactivity for .stars.rating-input (clickable star ratings)
  document.querySelectorAll('.stars.rating-input').forEach(starContainer => {
    const stars = starContainer.querySelectorAll('.svg-star');
    const inputName = starContainer.dataset.inputName;
    const hiddenInput = document.querySelector(`input[name="${inputName}"]`);

    // Create a helper to update the star fill based on rating
    function updateStars(rating) {
      stars.forEach(star => {
        const val = parseInt(star.dataset.value);
        const use = star.querySelector('use');
        use.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          val <= rating ? "#star-full" : "#star-empty"
        );
      });
    }

    // When a star is clicked, set the rating value and update the stars
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.value);
        hiddenInput.value = rating;
        starContainer.dataset.rating = rating;
        updateStars(rating);
      });

      // When a star is hovered, preview the rating visually
      star.addEventListener('mouseenter', () => {
        const hoverVal = parseInt(star.dataset.value);
        updateStars(hoverVal);
      });

      // When the mouse leaves a star, restore the current rating visually
      star.addEventListener('mouseleave', () => {
        const currentRating = parseInt(starContainer.dataset.rating);
        updateStars(currentRating);
      });
    });

    // Set the initial fill based on current rating
    updateStars(parseInt(starContainer.dataset.rating));
  });
});

// -------------------------------------------------------------------------

// FORM TOGGLING

// Toggles between dish and spot review forms based on dropdown selection
function toggleForm() {
  const type = document.getElementById('review-type').value;
  const dishForm = document.getElementById('dish-form');
  const spotForm = document.getElementById('spot-form');

  // Hide both forms first
  dishForm.classList.add('hidden');
  spotForm.classList.add('hidden');

  // Show the selected one
  if (type === 'dish') {
    dishForm.classList.remove('hidden');
  } else if (type === 'spot') {
    spotForm.classList.remove('hidden');
  }
}