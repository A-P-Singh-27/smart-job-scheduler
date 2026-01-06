const priorityScheduler = require("./priority");

const jobs = [
  { id: "J1", arrivalTime: 0, burstTime: 5, priority: 2 },
  { id: "J2", arrivalTime: 1, burstTime: 3, priority: 1 },
  { id: "J3", arrivalTime: 2, burstTime: 8, priority: 3 }
];

console.table(priorityScheduler(jobs));
