// js/main.js
import { loadState, saveState, resetState } from "./state.js";
import { updateDisplay, renderJobs, initializeTooltips, showNotification } from "./ui.js";
import { decayNeeds } from "./needs.js";
import "./needs.js";

// Initial setup function
function initGame() {
  loadState();            // Load state from localStorage if present
  updateDisplay();        // Reflect current state in UI
  renderJobs();           // Dynamically render job buttons
  initializeTooltips();   // Set up hover tooltips (must be after buttons render)
  startGameLoop();        // Start recurring updates
}

// Periodic update logic
function startGameLoop() {
  setInterval(() => {
    decayNeeds();         // Apply passive needs decay and health effects
    saveState();          // Persist current state
  }, 5000);               // Runs every 5 seconds
}

// Run setup on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initGame();
  
  // Add reset button functionality
  document.getElementById("reset-btn").addEventListener("click", () => {
    resetState();
    updateDisplay();
    showNotification("Game reset!");
  });
});
