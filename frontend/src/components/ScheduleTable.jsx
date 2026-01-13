export default function ScheduleTable({
  schedule,
  predictions,
  showML,
  algo
}) {
  // 🔥 Rank jobs by delay severity (highest first)
  const rankedSchedule = [...schedule].sort((a, b) => {
    const aPred = predictions[a.id]?.[algo];
    const bPred = predictions[b.id]?.[algo];

    const aScore = aPred
      ? aPred.predictedWaitingTime - a.burstTime
      : -Infinity;

    const bScore = bPred
      ? bPred.predictedWaitingTime - b.burstTime
      : -Infinity;

    return bScore - aScore;
  });

  return (
    <table border="1">
      <thead>
        <tr>
          {showML && <th>Rank</th>}
          <th>Job</th>
          <th>Start</th>
          <th>Completion</th>
          <th>Waiting</th>
          <th>Turnaround</th>

          {showML && (
            <>
              <th>Predicted Waiting</th>
              <th>Warning</th>
            </>
          )}
        </tr>
      </thead>

      <tbody>
        {rankedSchedule.map((job, index) => {
          const prediction = predictions[job.id]?.[algo];
          const delayScore = prediction
            ? prediction.predictedWaitingTime - job.burstTime
            : 0;

          let severity = "✅ OK";
          if (delayScore > 6) severity = "🔴 High";
          else if (delayScore > 3) severity = "🔶 Medium";
          else if (delayScore > 0) severity = "⚠️ Low";

          return (
            <tr key={job.id}>
              {showML && <td>{index + 1}</td>}
              <td>{job.id}</td>
              <td>{job.startTime}</td>
              <td>{job.completionTime}</td>
              <td>{job.waitingTime}</td>
              <td>{job.turnaroundTime}</td>

              {showML && (
                <>
                  <td>
                    {prediction
                      ? prediction.predictedWaitingTime.toFixed(2)
                      : "—"}
                  </td>
                  <td>{severity}</td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
