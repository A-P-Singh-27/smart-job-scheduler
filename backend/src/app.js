const express = require('express');
const cors =  require('cors');

const jobRoutes = require('./routes/job.routes');
const schedulerRoutes = require("./routes/scheduler.routes");
const mlRoutes = require("./routes/ml.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/schedule', schedulerRoutes);
app.use('/api/predict', mlRoutes);

module.exports = app;