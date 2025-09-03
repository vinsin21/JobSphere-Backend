import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { mapIndeedDataToJobSchema, mapLinkedinDataToJobSchema } from "../utils/mappers.js";

const getAllJobs = asyncHandler(async (req, res) => {
    // 1. Destructure the new 'sourcePlatform' query parameter
    const { search, location, experienceLevel, jobType, sourcePlatform } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
        const searchRegex = { $regex: search, $options: 'i' };
        filter.$or = [
            { title: searchRegex },
            { skills: searchRegex }
        ];
    }
    if (location) {
        filter.location = { $regex: location, $options: 'i' };
    }
    if (experienceLevel) {
        filter.experienceLevel = experienceLevel;
    }
    if (jobType) {
        filter.jobType = { $regex: jobType, $options: 'i' };
    }

    // 2. Add the new filter logic for the source platform
    // We do an exact match, which is very efficient.
    // If 'sourcePlatform' is empty or not provided, this block is skipped.
    if (sourcePlatform) {
        filter.sourcePlatform = sourcePlatform;
    }

    const jobs = await Job.find(filter)
        .sort({ postedOn: -1 })
        .skip(skip)
        .limit(limit);

    const totalJobs = await Job.countDocuments(filter);

    const responseData = {
        jobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs,
    };

    return res
        .status(200)
        .json(new ApiResponse(200, responseData, "Jobs fetched successfully"));
});

// --- addJobs and getJobById functions remain unchanged ---

const addJobs = asyncHandler(async (req, res) => {
    const { platform, rawJobs } = req.body;
    if (!platform || !Array.isArray(rawJobs) || rawJobs.length === 0) {
        throw new ApiError(400, "Invalid request body. 'platform' and a non-empty 'rawJobs' array are required.");
    }
    let mapper;
    switch (platform.toLowerCase()) {
        case "linkedin": mapper = mapLinkedinDataToJobSchema; break;
        case "indeed": mapper = mapIndeedDataToJobSchema; break;
        default:
            throw new ApiError(400, `Unsupported platform: ${platform}`);
    }
    const processedJobs = rawJobs.map(mapper).filter(job => job.sourceUrl);
    if (processedJobs.length === 0) {
        throw new ApiError(400, "No valid jobs to process after mapping.");
    }
    try {
        const result = await Job.insertMany(processedJobs, { ordered: false });
        return res
            .status(201)
            .json(new ApiResponse(201, result, `Successfully added ${result.length} new jobs from ${platform}.`));
    } catch (error) {
        if (error.code === 11000) {
            const successfulInserts = error.result?.nInserted || 0;
            return res
                .status(200)
                .json(new ApiResponse(200, { successfulInserts }, `Operation completed. Added ${successfulInserts} new jobs. Duplicates were ignored.`));
        }
        throw error;
    }
});

const getJobById = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        throw new ApiError(400, "Invalid Job ID format");
    }
    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, job, "Job fetched successfully"));
});

export { getAllJobs, addJobs, getJobById };