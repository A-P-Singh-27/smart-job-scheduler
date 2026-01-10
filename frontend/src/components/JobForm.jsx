import { useState } from "react";
import { createJob } from "../api/scheduler.api";

export default function JobForm() {
  const [job, setJob] = useState({
    id: "",
    arrivalTime: "",
    burstTime: "",
    priority: ""
  });

  const submit = async () => {
    await createJob({
      ...job,
      arrivalTime: Number(job.arrivalTime),
      burstTime: Number(job.burstTime),
      priority: Number(job.priority)
    });
    alert("Job added");
  };

  return (
    <div>
      <h3>Add Job</h3>
      {Object.keys(job).map((key) => (
        <input
          key={key}
          placeholder={key}
          value={job[key]}
          onChange={(e) => setJob({ ...job, [key]: e.target.value })}
        />
      ))}
      <button onClick={submit}>Submit</button>
    </div>
  );
}
