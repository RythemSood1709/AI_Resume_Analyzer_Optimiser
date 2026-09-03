const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const env = require("./config/env");
const { connectDB } = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const healthRouter = require("./routes/health");
const authRouter = require("./routes/auth");
const resumeRouter = require("./routes/resumes");
const historyRouter = require("./routes/history");
const dashboardRouter = require("./routes/dashboard");
const insightsRouter = require("./routes/insights");
const versionsRouter = require("./routes/versions");

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

if (!env.isProd) app.use(morgan("dev"));

app.use("/api/health", healthRouter);

//auth route
app.use("/api/auth", authRouter);

//resume route
app.use("/api/resumes", resumeRouter);

//dashboard route
app.use("/api/dashboard", dashboardRouter);

//insights route
app.use("/api/insights", insightsRouter);

//history route
app.use("/api/history", historyRouter);

//versions route
app.use("/api/versions", versionsRouter);



app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(
        `Server listening on http://localhost:${env.port} in ${env.nodeEnv} mode`,
      );
    });
  } catch (err) {
    console.error("Failed to start server", err.message);
    process.exit(1);
  }
}

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection", err);
});

start();

module.exports = app;
