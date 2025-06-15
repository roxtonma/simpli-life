// js/needs.js
import { state } from "./state.js";
import { updateDisplay, showNotification } from "./ui.js";

export function decayNeeds() {
  state.hunger -= 1;
  state.energy += 1; // Passive energy recovery
  state.satisfaction -= 0.2;

  // Health penalty when hunger or energy hits 0
  if (state.hunger <= 0 || state.energy <= 0) {
    if (state.hunger <= 0) {
      state.hunger = 0;
      showNotification("You're starving!");
    }
    if (state.energy <= 0) {
      state.energy = 0;
      showNotification("You're completely exhausted!");
    }

    state.health -= 1;
    if (state.health <= 0) {
      state.health = 0;
      showNotification("⚠️ You've collapsed from poor health!");
    }
  }

  // Passive health recovery if well-fed and rested
  if (state.hunger > 70 && state.energy > 70 && state.health < 100) {
    state.health += 0.5;
  }

  // Clamp values
  state.energy = Math.min(state.energy, 100);
  state.hunger = Math.min(state.hunger, 100);
  state.satisfaction = Math.max(state.satisfaction, 0);
  state.health = Math.min(state.health, 100);

  updateDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  const restBtn = document.getElementById("rest-btn");
  const eatBtn = document.getElementById("eat-btn");

  if (restBtn) {
    restBtn.onclick = () => {
      if (state.isBusy) return showNotification("You're already doing something!");
      if (state.energy >= 100) return showNotification("You're fully rested!");

      state.isBusy = true;
      showNotification("You start resting...");

      setTimeout(() => {
        const prevEnergy = state.energy;
        const prevSatisfaction = state.satisfaction;
        const prevHealth = state.health;

        state.energy = Math.min(state.energy + 30, 100);
        state.satisfaction += 5;
        state.health = Math.min(state.health + 10, 100);

        const energyGain = state.energy - prevEnergy;
        const satisfactionGain = state.satisfaction - prevSatisfaction;
        const healthGain = state.health - prevHealth;

        showNotification(`Rested: ⚡+${energyGain}, 😀+${satisfactionGain}, ❤️+${healthGain}`);
        updateDisplay();
        state.isBusy = false;
      }, 2000);
    };
  }

  if (eatBtn) {
    eatBtn.onclick = () => {
      if (state.isBusy) return showNotification("You're already doing something!");
      if (state.money < 20) return showNotification("You don't have enough money to eat!");
      if (state.hunger >= 100) return showNotification("You're not hungry right now.");

      state.isBusy = true;
      showNotification("You start eating...");

      setTimeout(() => {
        const prevHunger = state.hunger;
        const prevSatisfaction = state.satisfaction;

        state.money -= 20;
        state.hunger = Math.min(state.hunger + 40, 100);
        state.satisfaction += 3;

        const hungerGain = state.hunger - prevHunger;
        const satisfactionGain = state.satisfaction - prevSatisfaction;

        showNotification(`Ate: 🍚+${hungerGain}, 😀+${satisfactionGain}, 💸-20`);
        updateDisplay();
        state.isBusy = false;
      }, 2000);
    };
  }
});
