export default function ScheduleTable({ schedule }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Job</th>
          <th>Start</th>
          <th>Completion</th>
          <th>Waiting</th>
          <th>Turnaround</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
