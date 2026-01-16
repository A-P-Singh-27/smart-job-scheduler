function calculateMetrics(scheduledjobs) {
    const n = scheduledjobs.length;

    const totalWaitingTime = scheduledjobs.reduce((sum,job) => sum + job.waitingTime, 0);

    const totalTurnaroundTime = scheduledjobs.reduce((sum,job) => sum + job.turnaroundTime, 0);

   const completionTime = Math.max(
        ...scheduledjobs.map(job => job.completionTime)
    );

    return {
        averageWaitingTime: n === 0 ? 0 : totalWaitingTime / n,
        averageTurnaroundTime: n === 0 ? 0 : totalTurnaroundTime / n,
        throughput: n === 0 ? 0 : n / completionTime
    };
}

module.exports = calculateMetrics;