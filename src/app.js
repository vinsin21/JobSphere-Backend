import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js"; // 1. Import the error handler
import jobRouter from "./routes/job.routes.js"; // 2. Import the job router

const app = express();

// --- Core Middlewares ---
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));


// --- API Routes Declaration ---
// This tells Express that any URL starting with "/api/v1/jobs"
// should be handled by the jobRouter.
app.use("/api/v1/jobs", jobRouter);


// --- Central Error Handling Middleware ---
// This is the "best practice" part from apihub. Any error that occurs
// in any of our async controllers will be caught and sent here for a
// clean, standardized response.
// It MUST be the last `app.use()` call.
app.use(errorHandler);

export { app };