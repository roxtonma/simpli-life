// js/state.js
export const state = {
  money: 0,
  energy: 100,
  hunger: 100,
  satisfaction: 50,
  health: 100,
  isBusy: false,
  skills: {
    fitness: 0,
    programming: 0
  }
};

export function saveState() {
  try {
    localStorage.setItem("gameState", JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("gameState"));
    if (saved && typeof saved === "object") {
      Object.assign(state, saved);
    }
  } catch (e) {
    console.warn("Failed to load saved game state. Starting fresh.");
  }
}

export function resetState() {
  // Reset to default values
  state.money = 0;
  state.energy = 100;
  state.hunger = 100;
  state.satisfaction = 50;
  state.health = 100;
  state.isBusy = false;
  state.skills = {
    fitness: 0,
    programming: 0
  };
  saveState();
}
