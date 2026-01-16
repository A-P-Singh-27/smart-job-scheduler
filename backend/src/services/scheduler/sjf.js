function sjfScheduler(jobs) {

    const remainingJobs = [...jobs];
    const scheduledJobs = [];

    let currentTime = 0;

    while (remainingJobs.length > 0) {
        // filtering jobs that have arrived by currentTime
        const availableJobs = remainingJobs.filter(job => job.arrivalTime <= currentTime);

        // if no jobs are available, increment time
        if (availableJobs.length === 0) {
            currentTime++;
            continue;
        }

        availableJobs.sort((a, b) => a.burstTime - b.burstTime);
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

module.exports = sjfScheduler;