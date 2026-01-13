const path = require("path");
const { execSync } = require("child_process");

exports.predictDelay = (req, res) => {
  try {
    const { burstTime, priority } = req.body;

    const scriptPath = path.join(__dirname, "../../../ml/predict.py");

    const algoMap = {
      fcfs: 0,
      sjf: 1,
      priority: 2
    };

    const result = {};

    for (const [algo, code] of Object.entries(algoMap)) {
      const output = execSync(
        `python "${scriptPath}" ${burstTime} ${priority} ${code}`,
        { encoding: "utf-8" }
      );

      const predictedWaitingTime = Number(output.trim());

      const delayScore = predictedWaitingTime - burstTime;

let severity = "OK";
if (delayScore > 6) severity = "HIGH";
else if (delayScore > 3) severity = "MEDIUM";
else if (delayScore > 0) severity = "LOW";

result[algo] = {
  predictedWaitingTime,
  delayed: delayScore > 0,
  delayScore,
  severity
};

    }

    res.json(result);
  } catch (err) {
    console.error("❌ ML ERROR:", err.message);
    res.status(500).json({ error: "ML prediction failed" });
  }
};
