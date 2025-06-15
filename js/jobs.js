// js/jobs.js
export const jobs = [
  {
    id: "basic_labor",
    name: "Basic Labor",
    reward: 10,
    energyCost: 5,
    hungerCost: 3,
    satisfactionGain: -1,
    skill: "none",
    skillRequired: 0,
    duration: 1500, // in milliseconds
  },
  {
    id: "lawn_mowing",
    name: "Lawn Mowing",
    reward: 20,
    energyCost: 10,
    hungerCost: 5,
    satisfactionGain: -2,
    skill: "fitness",
    skillRequired: 0,
    duration: 2000,
  },
  {
    id: "programming",
    name: "Freelance Programming",
    reward: 80,
    energyCost: 25,
    hungerCost: 10,
    satisfactionGain: -5,
    skill: "programming",
    skillRequired: 10,
    duration: 4000,
  },
];
