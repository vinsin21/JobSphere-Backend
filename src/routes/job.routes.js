import { Router } from "express";
// Import the new controller function
import { getAllJobs, addJobs, getJobById } from "../controllers/job.controller.js";

const jobRouter = Router();

// Routes for the base path /api/v1/jobs
jobRouter.route("/")
    .get(getAllJobs)
    .post(addJobs);

// This defines a new route that handles a dynamic 'jobId' parameter
// Any GET request to a URL like /api/v1/jobs/some-unique-id will be handled here
jobRouter.route("/:jobId")
    .get(getJobById);

export default jobRouter;