function preemptivePriorityScheduler(jobs) {
  const remainingJobs = jobs.map(job => ({
    ...job,
    remainingTime: job.burstTime
  }));

  const scheduledJobs = [];
  let currentTime = 0;
  let lastJobId = null;

  while (remainingJobs.some(job => job.remainingTime > 0)) {
    const availableJobs = remainingJobs.filter(
      job => job.arrivalTime <= currentTime && job.remainingTime > 0
    );

    if (availableJobs.length === 0) {
      currentTime++;
      continue;
    }

    availableJobs.sort((a, b) => a.priority - b.priority);
    const job = availableJobs[0];

    if (job.id !== lastJobId) {
      scheduledJobs.push({
        id: job.id,
        startTime: currentTime
      });
      lastJobId = job.id;
    }

    job.remainingTime--;
    currentTime++;

    if (job.remainingTime === 0) {
      job.completionTime = currentTime;
      job.turnaroundTime = currentTime - job.arrivalTime;
      job.waitingTime = job.turnaroundTime - job.burstTime;
    }
  }

  return remainingJobs;
}

module.exports = preemptivePriorityScheduler;
