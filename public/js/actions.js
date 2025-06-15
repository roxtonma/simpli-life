// js/actions.js
import { state } from "./state.js";
import { updateDisplay, showNotification, startJobProgress, setBusyUI } from "./ui.js";
import { jobs } from "./jobs.js";

export function performJob(jobId) {
  if (state.isBusy) {
    showNotification("You're already doing something!");
    return;
  }

  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  const skillLevel = state.skills[job.skill] || 0;

  if (state.energy < job.energyCost) {
    showNotification("Not enough energy!");
    return;
  }

  if (state.hunger < job.hungerCost) {
    showNotification("You're too hungry to work!");
    return;
  }

  if (skillLevel < job.skillRequired) {
    showNotification("Skill too low for this job.");
    return;
  }

  // Lock UI and mark as busy
  state.isBusy = true;
  setBusyUI(true);

  startJobProgress(job, () => {
    state.money += job.reward;
    state.energy -= job.energyCost;
    state.hunger -= job.hungerCost;
    state.satisfaction += job.satisfactionGain;

    if (job.skill !== "none") {
      state.skills[job.skill] = (state.skills[job.skill] || 0) + 1;
    }

    updateDisplay();

    // Unlock UI and mark as not busy
    state.isBusy = false;
    setBusyUI(false);
  });
}
