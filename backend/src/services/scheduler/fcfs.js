function fcfsScheduler(jobs) {
    const sortedJobs = [...jobs].sort(
        (a, b) => a.arrivalTime - b.arrivalTime
    );

    let currentTime = 0;
    const scheduledJobs = [];

    for (const job of sortedJobs) {
        const startTime = Math.max(currentTime, job.arrivalTime);
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
    }

    return scheduledJobs;
}

module.exports = fcfsScheduler;
