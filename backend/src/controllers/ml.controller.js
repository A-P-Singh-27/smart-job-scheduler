const path = require("path");
const { execSync } = require("child_process");

exports.predictDelay = (req, res) => {
  const { burstTime, priority } = req.body;

  const scriptPath = path.join(__dirname, "../../../ml/predict.py");

  const output = execSync(
    `python "${scriptPath}" ${burstTime} ${priority}`,
    { encoding: "utf-8" }
  );

  const predictedExecutionTime = Number(output.trim());

  res.json({
    predictedExecutionTime,
    delayed: predictedExecutionTime > burstTime
  });
};
