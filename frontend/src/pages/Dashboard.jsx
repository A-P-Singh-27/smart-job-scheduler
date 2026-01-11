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

      // 🔮 ML prediction (run once per job)
      const predictionMap = {};

      for (const job of res.data.fcfs.schedule) {
        const response = await predictDelay({
          burstTime: job.burstTime,
          priority: job.priority
        });

        predictionMap[job.id] = response.data;
      }

      setPredictions(predictionMap);
    }

    loadData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Smart Job Scheduler</h2>
      <JobForm />
      <label htmlFor="toggle"></label>
      <button name="toggle" onClick={() => setShowML(!showML)}>
  {showML ? "Hide ML Warnings" : "Show ML Warnings"}
</button>


      <h3>FCFS</h3>
      <ScheduleTable
        schedule={data.fcfs.schedule}
        predictions={predictions}
        showML={showML}
      />
      <MetricsChart metrics={data.fcfs.metrics} />

      <h3>SJF</h3>
      <ScheduleTable
        schedule={data.sjf.schedule}
        predictions={predictions}
        showML={showML}
      />
      <MetricsChart metrics={data.sjf.metrics} />

      <h3>Priority</h3>
      <ScheduleTable
        schedule={data.priority.schedule}
        predictions={predictions}
        showML={showML}
      />
      <MetricsChart metrics={data.priority.metrics} />
    </div>
  );
}
