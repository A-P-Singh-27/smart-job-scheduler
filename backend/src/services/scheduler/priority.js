function priorityScheduler(jobs) {
  const remainingJobs = [...jobs];
  const scheduledJobs = [];

  let currentTime = 0;

  while (remainingJobs.length > 0) {
    const availableJobs = remainingJobs.filter(
      job => job.arrivalTime <= currentTime
    );

    if (availableJobs.length === 0) {
      currentTime++;
      continue;
    }

    // Pick highest priority job
    availableJobs.sort((a, b) => a.priority - b.priority);
    const job = availableJobs[0];

    const startTime = currentTime;
    const completionTime = startTime + job.burstTime;

    const waitingTime = startTime - job.arrivalTime;
    const turnaroundTime = completionTime - job.arrivalTime;

    scheduledJobs.push({
      ...job,
      startTime,
      completionTime,
      waitingTime,
      turnaroundTime
    });

    currentTime = completionTime;

    const index = remainingJobs.findIndex(j => j.id === job.id);
    remainingJobs.splice(index, 1);
  }

  return scheduledJobs;
}

module.exports = priorityScheduler;
