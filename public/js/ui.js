// js/ui.js
import { state } from "./state.js";
import { jobs } from "./jobs.js";
import { performJob } from "./actions.js";

export function updateDisplay() {
  document.getElementById("health").textContent = state.health.toFixed(0);
  document.getElementById("money").textContent = state.money;
  document.getElementById("energy").textContent = state.energy;
  document.getElementById("hunger").textContent = state.hunger;
  document.getElementById("satisfaction").textContent = state.satisfaction.toFixed(0);
  setBusyUI(state.isBusy);
}

export function renderJobs() {
  const container = document.getElementById("job-buttons");
  container.innerHTML = "";

  jobs.forEach((job) => {
    const btn = document.createElement("button");
    btn.textContent = `${job.name} ($${job.reward})`;
    btn.onclick = () => performJob(job.id);
    btn.setAttribute(
      "data-tooltip",
      `💸 $${job.reward} Money | ⚡ -${job.energyCost} Energy | 🍚 -${job.hungerCost} Hunger | 😀 ${job.satisfactionGain} Satisfaction`
    );
    btn.classList.add("hover-preview");

    container.appendChild(btn);
  });
}

export function showNotification(text) {
  const box = document.getElementById("notif");
  box.textContent = text;
  box.style.opacity = 1;
  setTimeout(() => {
    box.style.opacity = 0;
  }, 2000);
}

export function startJobProgress(job, onComplete) {
  const bar = document.getElementById("progress-bar");
  const container = document.getElementById("progress-container");
  const msg = document.getElementById("job-message");

  bar.style.width = "0%";
  container.classList.remove("hidden");
  msg.textContent = `Working: ${job.name}...`;

  let start = null;
  const duration = job.duration;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    bar.style.width = `${progress * 100}%`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      container.classList.add("hidden");
      msg.textContent = `${job.name} complete!`;
      onComplete();
      setTimeout(() => {
        msg.textContent = "";
      }, 2000);
    }
  }

  requestAnimationFrame(animate);
}

export function initializeTooltips() {
  const tooltip = document.getElementById("tooltip");

  document.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
  });

  // Use event delegation to catch hovers on dynamic buttons
  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest(".hover-preview");
    if (el && el.dataset.tooltip) {
      tooltip.textContent = el.dataset.tooltip;
      tooltip.classList.remove("hidden");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".hover-preview")) {
      tooltip.classList.add("hidden");
    }
  });
}

export function setBusyUI(isBusy) {
  document.getElementById("busy-indicator").classList.toggle("hidden", !isBusy);
  document.querySelectorAll("button:not(#reset-btn)").forEach(btn => {
    btn.disabled = isBusy;
  });
}
