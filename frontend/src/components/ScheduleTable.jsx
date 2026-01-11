export default function ScheduleTable({ schedule, predictions, showML}) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Job</th>
          <th>Start</th>
          <th>Completion</th>
          <th>Waiting</th>
          <th>Turnaround</th>
          {showML && <th>Warning</th>}
        </tr>
      </thead>
      <tbody>
        {schedule.map((job) => (
          <tr key={job.id}>
            <td>{job.id}</td>
            <td>{job.startTime}</td>
            <td>{job.completionTime}</td>
            <td>{job.waitingTime}</td>
            <td>{job.turnaroundTime}</td>
            {showML && (
              <td>
                {predictions[job.id]?.delayed
                  ? "⚠️ Likely Delayed"
                  : "✅ OK"}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
