// STAR RENDERING

// Renders star SVGs based on the data-rating attribute of a container element
function renderStars(container) {
  const rating = parseFloat(container.dataset.rating) || 0; // Get rating from data attribute
  container.innerHTML = ""; // Clear any existing stars
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

// -------------------------------------------------------------------------

// MESSAGE SHUFFLING

const tripMessage = document.getElementById('tripMessage');
const refreshMessage = document.getElementById('refreshMessage');

// Create an array consisting of motivational trip messages
const messages = [
  "🔥 Let the journey guide you — not just the destination.",
  "🧳 Every trip begins with a single plan.",
  "📍 Your adventure starts here.",
  "🌍 Explore more, worry less.",
  "🔎 There’s always something new to discover.",
  "🥘 Good food. Great places. Better memories.",
  "🍜 Taste the culture, one stop at a time.",
  "🌮 From bites to sights, we’ve got your day.",
  "🍴 Planning your day around flavors.",
  "🤹‍♂️ Plans made easy — even for the spontaneous.",
  "🔄 Got ideas? Let’s turn them into a journey.",
  "💡 Don't just go places. Make memories.",
  "✏️ Fill your day with stories worth sharing.",
  "🤝 Trust the plan... or at least the food.",
  "📆 Ready when you are."
];

// Picks a random message and displays it in the tripMessage element
function shuffleMessage() {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  tripMessage.textContent = randomMessage;
}

// Shuffle message on refreshMessage click or keyboard activation
refreshMessage.addEventListener('click', shuffleMessage);
refreshMessage.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') shuffleMessage();
});
shuffleMessage(); // Show a message on page load

// -------------------------------------------------------------------------

// TRAVEL INFO UPDATING

const travelInfo = document.getElementById("travelInfo");
const currentInput = document.getElementById('currentInput');
const destinationInput = document.getElementById('destinationInput');
const viewMapsButton = document.getElementById('viewMapsButton'); // Use correct ID

let typingTimeout = null;

// Updates travel info and handles loading animation and Google Maps link
function updateTravelInfo() {
  clearTimeout(typingTimeout);

  const from = currentInput.value.trim();
  const to = destinationInput.value.trim();

  if (from && to) {
    typingTimeout = setTimeout(() => {
      // Show loading dots animation
      travelInfo.innerHTML = `
        <span class="loading-dots">
          ⏳<span id="dotCycle"></span>
        </span>
      `;

      const dots = ["", " ·", " · ·", " · · ·"];
      let index = 0;

      clearInterval(window.loadingInterval);
      window.loadingInterval = setInterval(() => {
        const dotSpan = document.getElementById("dotCycle");
        if (dotSpan) {
          dotSpan.textContent = dots[index];
          index = (index + 1) % dots.length;
        }
      }, 400);

      // After loading, show routing info and enable Maps button
      setTimeout(() => {
        clearInterval(window.loadingInterval);
        const mapUrl = `https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(to)}`;
        travelInfo.innerHTML = `🗺️ Routing you from <strong>${from}</strong> to <strong>${to}</strong>...`;

        viewMapsButton.classList.remove("disabled");
        viewMapsButton.href = mapUrl;
        viewMapsButton.target = "_blank";
      }, 2000);
    }, 1000);
  } else {
    // Reset UI if inputs are empty
    clearInterval(window.loadingInterval);
    travelInfo.innerHTML = "✨ Ready to Localinary-fy your trip? Let’s gooo!◝(ᵔᗜᵔ)◜";
    viewMapsButton.classList.add("disabled");
    viewMapsButton.removeAttribute("href");
    viewMapsButton.removeAttribute("target");
  }
}

// Update travel info on input changes
currentInput.addEventListener('input', updateTravelInfo);
destinationInput.addEventListener('input', updateTravelInfo);

// Swap the values of the two input fields and update travel info
swapButton.addEventListener('click', () => {
  const temp = currentInput.value;
  currentInput.value = destinationInput.value;
  destinationInput.value = temp;
  updateTravelInfo();
});

updateTravelInfo(); // Initialize travel info on page load