import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const createJob = (job) => 
  API.post("/jobs", job);
export const getSchedule = () => 
  API.get("/schedule");
export const predictDelay = (job) =>
  API.post("/predict", job);
