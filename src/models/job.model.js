import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        // --- Core Information ---
        title: {
            type: String,
            required: true,
            trim: true,
        },
        companyName: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        descriptionHtml: {
            type: String,
        },

        // --- Job Details ---
        jobType: {
            type: String, // e.g., "Full-time", "Contract", "Internship"
            trim: true,
        },
        experienceLevel: {
            type: String, // e.g., "Entry level", "Mid-Senior level"
            trim: true,
        },
        salary: {
            type: String, // Storing as a string to accommodate various formats like "₹50,000 - ₹70,000 a month"
        },
        skills: {
            type: [String], // An array of strings for required skills
        },

        // --- Source & Application ---
        sourceUrl: {
            type: String,
            required: true,
            unique: true, // This is our key for preventing duplicates
        },
        applyUrl: {
            type: String,
            required: true,
        },
        sourcePlatform: {
            type: String,
            required: true, // We'll set this to "LinkedIn", "Indeed", etc.
            enum: ["LinkedIn", "Indeed", "Naukri"], // Optional: Restrict to known values
        },
        platformId: {
            type: String, // The job's unique ID on the original platform
            required: true,
        },

        // --- Metadata ---
        companyLogoUrl: {
            type: String,
        },
        postedOn: {
            type: Date, // A standardized date for sorting and filtering
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Create an index on platformId and sourcePlatform for faster lookups
jobSchema.index({ platformId: 1, sourcePlatform: 1 }, { unique: true });

export const Job = mongoose.model("Job", jobSchema);