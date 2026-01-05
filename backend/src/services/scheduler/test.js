const fcfsScheduler = require("./fcfs");

const jobs = [
  { id: "J1", arrivalTime: 0, burstTime: 5 },
  { id: "J2", arrivalTime: 1, burstTime: 3 },
  { id: "J3", arrivalTime: 2, burstTime: 8 }
];

const result = fcfsScheduler(jobs);
console.table(result);
