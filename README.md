# Smart Job Scheduler & Performance Analyzer

A system-level application that simulates **Operating System CPU scheduling algorithms**, analyzes their performance using standard OS metrics, and applies **explainable Machine Learning** to predict job delay risks.

This project works as a **decision-support system**, helping users understand **which scheduling algorithm performs best for a given workload and why**, without altering core scheduling logic.

---

## 🚀 Features

### 🔁 CPU Scheduling Algorithms
- First Come First Serve (FCFS)
- Shortest Job First (SJF)
- Priority Scheduling (Non-Preemptive)
- Priority Scheduling (Preemptive)

All algorithms respect:
- Arrival Time
- Burst Time
- Priority (where applicable)

---

### 📊 Performance Analysis (OS Metrics)

For each algorithm, the system computes:

- Waiting Time (per job)
- Turnaround Time (per job)
- Average Waiting Time
- Average Turnaround Time
- Throughput

These metrics are used for **comparison, visualization, and recommendation**.

---

### ⚖️ Fairness & Practical Considerations

To avoid misleading conclusions based on a single metric:

- Long-waiting jobs are clearly visible
- Maximum waiting time can be observed
- Starvation-prone behavior can be identified visually
- Preemptive algorithms are evaluated with awareness of their trade-offs

The system does **not blindly favor the lowest average waiting time**.

---

### 🤖 Machine Learning (Explainable & Advisory)

- Uses **Linear Regression** to predict job execution delay
- Input features:
  - Burst Time
  - Priority
  - Scheduling Algorithm
- Output:
  - Predicted execution time
  - Delay flag (delayed / not delayed)

📌 ML is **advisory only**:
- It does **not modify execution order**
- It does **not override scheduling logic**
- Predictions are displayed as warnings/metadata

---

## 🧠 Decision Support System

- Compares all scheduling algorithms on the same workload
- Recommends the best scheduling algorithm
- Recommendation is based on:
  - **Average Waiting Time** (primary indicator)
  - **Observed fairness behavior** (visual support)

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Axios
- Chart-based visualization

### Backend
- Node.js
- Express.js
- MongoDB

### Machine Learning
- Python
- scikit-learn (Linear Regression)
- joblib (model persistence)

### DevOps
- Docker
- Docker Compose

---

## 🧩 System Architecture

```mermaid
flowchart TD
    A["User Interface\n(React Frontend)"] --> B["Backend API\n(Express.js)"]

    B --> C["Scheduler Engine\n(OS Logic)"]

    C --> D["CPU Scheduling Algorithms"]
    D --> D1["FCFS"]
    D --> D2["SJF"]
    D --> D3["Priority"]
    D --> D4["Preemptive Priority"]

    C --> E["Metrics Analyzer"]
    E --> E1["Waiting Time"]
    E --> E2["Turnaround Time"]
    E --> E3["Throughput"]

    E --> F["ML Prediction Layer\n(Python)"]
    F --> F1["Delay Prediction"]
    F --> F2["Delay Warning"]

    F --> G["Decision Support"]
    G --> G1["Best Algorithm Recommendation"]
    G --> G2["Job Delay Insights"]

    G --> A

Each layer is modular and independently testable.

---

## 🧠 Key Design Decisions

- Scheduling algorithms are **pure and deterministic**
- Machine Learning is **explainable and advisory**
- Execution order is **never altered by ML**
- Metrics drive decisions, not assumptions
- Priority is given to clarity and correctness

---

## 🐳 Run with Docker

```bash
docker-compose up --build


Frontend → http://localhost:5173

Backend → http://localhost:5000

🧪 Example Workflow

User adds multiple jobs

System executes all scheduling algorithms

Performance metrics are calculated

ML predicts job-level delay risks

Delayed jobs are highlighted

System recommends the best algorithm

📌 Future Enhancements

Composite scoring using multiple metrics

Visual starvation indicators

Algorithm ranking table

Historical workload analysis

Configurable metric weights

---

## 👤 Author

**Aditya Pratap Singh**  
B.Tech (Information Technology)  
Madan Mohan Malaviya University of Technology, Gorakhpur  

- MERN Stack Developer  
- DevOps & Systems Enthusiast  
- Interested in Operating Systems, Backend Engineering, and Applied ML

---




