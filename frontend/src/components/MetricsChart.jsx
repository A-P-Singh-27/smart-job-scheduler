export default function MetricsChart({ metrics }) {
  return (
    <div>
      <h4>Performance Metrics</h4>
      <p>Avg Waiting Time: {metrics.averageWaitingTime.toFixed(2)}</p>
      <p>Avg Turnaround Time: {metrics.averageTurnaroundTime.toFixed(2)}</p>
      <p>Throughput: {metrics.throughput.toFixed(3)}</p>
    </div>
  );
}
