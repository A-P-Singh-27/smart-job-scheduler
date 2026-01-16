import { useEffect, useState } from "react";
import { getSchedule, predictDelay } from "../api/scheduler.api";
import JobForm from "../components/JobForm";
import ScheduleTable from "../components/ScheduleTable";
import MetricsChart from "../components/MetricsChart";

export default function Dashboard() {
  const [showML, setShowML] = useState(true);
  const [data, setData] = useState(null);
  const [predictions, setPredictions] = useState({});

  useEffect(() => {
    async function loadData() {
      const res = await getSchedule();
      setData(res.data);

      // ML prediction (run once per job)
      const predictionMap = {};

      for (const job of res.data.fcfs.schedule) {
        const response = await predictDelay({
          burstTime: job.burstTime,
          priority: job.priority,
          algorithm: "fcfs"
        });
        
        predictionMap[job.id] = response.data;
      }

      setPredictions(predictionMap);
    }

    loadData();
  }, []);

  const STARVATION_LIMIT = 10;

const analyzeSchedule = (schedule) => {
  let starvationCount = 0;
  let maxWaitingTime = 0;

  for (const job of schedule) {
    if (job.waitingTime > STARVATION_LIMIT) {
      starvationCount++;
    }
    maxWaitingTime = Math.max(maxWaitingTime, job.waitingTime);
  }

  return { starvationCount, maxWaitingTime };
};


const getBestAlgorithm = (data) => {
  if (!data) return null;

  const algorithms = [
    { name: "FCFS", key: "fcfs" },
    { name: "SJF", key: "sjf" },
    { name: "Priority", key: "priority" },
    { name: "Preemptive Priority", key: "preemptivePriority" }
  ];

  let best = null;

  for (const algo of algorithms) {
    const metrics = data[algo.key].metrics;
    const schedule = data[algo.key].schedule;

    const { starvationCount, maxWaitingTime } =
      analyzeSchedule(schedule);

    const contextSwitches = metrics.contextSwitches ?? 0;

    const score =
      metrics.averageWaitingTime * 1.0 +
      metrics.averageTurnaroundTime * 0.7 +
      maxWaitingTime * 1.5 +
      starvationCount * 5 +
      contextSwitches * 2;

    if (!best || score < best.score) {
      best = {
        name: algo.name,
        score,
        details: {
          avgWaiting: metrics.averageWaitingTime,
          avgTurnaround: metrics.averageTurnaroundTime,
          starvationCount,
          contextSwitches
        }
      };
    }
  }

  return best;
};





if (!data) return <p>Loading...</p>;
const bestAlgorithm = getBestAlgorithm(data);

  return (
    <div>
      <h2>Smart Job Scheduler</h2>
      <JobForm />
      <label htmlFor="toggle"></label>
      <button name="toggle" onClick={() => setShowML(!showML)}>
  {showML ? "Hide ML Warnings" : "Show ML Warnings"}
</button>
    <div style={{
  margin: "16px 0",
  padding: "12px",
  border: "2px solid green",
}}>
  <h3>✅ Recommended Algorithm</h3>
  <p>
  <strong>{bestAlgorithm?.name}</strong> performs best based on
  efficiency, fairness, and system overhead.
</p>
<p>
  Composite Score: <strong>{bestAlgorithm?.score.toFixed(2)}</strong>
</p>
</div>

  <h2>OS Algorithms: </h2>

      <h3>FCFS</h3>
      <ScheduleTable
  schedule={data.fcfs.schedule}
  predictions={predictions}
  showML={showML}
  algo="fcfs"
/>
      <MetricsChart metrics={data.fcfs.metrics} />

      
<ScheduleTable
  schedule={data.sjf.schedule}
  predictions={predictions}
  showML={showML}
  algo="sjf"
/>

      <MetricsChart metrics={data.sjf.metrics} />

      <h3>Priority</h3>
      <ScheduleTable
  schedule={data.priority.schedule}
  predictions={predictions}
  showML={showML}
  algo="priority"
/>

      <MetricsChart metrics={data.priority.metrics} />
      
      <h3>preemptivePriorityResult</h3>
      <ScheduleTable
  schedule={data.preemptivePriority.schedule}
  predictions={predictions}
  showML={showML}
  algo="priority"
/>
      <MetricsChart metrics={data.preemptivePriority.metrics} />
    </div>
  );
}
