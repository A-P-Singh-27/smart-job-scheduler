const express = require('express');
const cors =  require('cors');

const jobRoutes = require('./routes/job.routes');
const schedulerRoutes = require("./routes/scheduler.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/schedule', schedulerRoutes);

module.exports = app;