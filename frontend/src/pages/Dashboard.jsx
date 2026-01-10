import { useEffect, useState } from "react";
import { getSchedule } from "../api/scheduler.api";
import JobForm from "../components/JobForm";
import ScheduleTable from "../components/ScheduleTable";
import MetricsChart from "../components/MetricsChart";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSchedule().then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Smart Job Scheduler</h2>
      <JobForm />

      <h3>FCFS</h3>
      <ScheduleTable schedule={data.fcfs.schedule} />
      <MetricsChart metrics={data.fcfs.metrics} />

      <h3>SJF</h3>
      <ScheduleTable schedule={data.sjf.schedule} />
      <MetricsChart metrics={data.sjf.metrics} />

      <h3>Priority</h3>
      <ScheduleTable schedule={data.priority.schedule} />
      <MetricsChart metrics={data.priority.metrics} />
    </div>
  );
}
