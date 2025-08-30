/**
 * This file contains mapper functions.
 * Each function is responsible for taking raw data from a specific source (e.g., LinkedIn)
 * and transforming it into the unified Job schema format that we use in our database.
 */

/**
 * Maps a raw job object from a LinkedIn scrape to our standard Job schema.
 * @param {object} linkedinJob - The raw job object from the LinkedIn scraper.
 * @returns {object} A job object formatted according to our Job schema.
 */
export function mapLinkedinDataToJobSchema(linkedinJob) {
    const job = {
        // Direct mapping for core fields
        title: linkedinJob.title,
        companyName: linkedinJob.companyName,
        location: linkedinJob.location,
        description: linkedinJob.description,
        descriptionHtml: linkedinJob.descriptionHtml,
        sourceUrl: linkedinJob.jobUrl,
        applyUrl: linkedinJob.applyUrl,
        platformId: linkedinJob.id,

        // Set the platform manually
        sourcePlatform: "LinkedIn",

        // Handle fields that might be named differently or need transformation
        jobType: linkedinJob.contractType,
        experienceLevel: linkedinJob.experienceLevel,

        // Use default values or null for optional fields that might be missing
        salary: linkedinJob.salary || null,
        companyLogoUrl: null, // LinkedIn data doesn't provide this directly

        // Convert the string date into a proper JavaScript Date object
        postedOn: linkedinJob.publishedAt ? new Date(linkedinJob.publishedAt) : null,

        // Skills would ideally be extracted from the description later
        skills: [],
    };
    return job;
}

/**
 * Maps a raw job object from an Indeed scrape to our standard Job schema.
 * @param {object} indeedJob - The raw job object from the Indeed scraper.
 * @returns {object} A job object formatted according to our Job schema.
 */
export function mapIndeedDataToJobSchema(indeedJob) {
    const job = {
        // Map fields with different names
        title: indeedJob.positionName,
        companyName: indeedJob.company,
        description: indeedJob.description,
        descriptionHtml: indeedJob.descriptionHTML,
        sourceUrl: indeedJob.url,
        applyUrl: indeedJob.externalApplyLink,
        platformId: indeedJob.id,
        location: indeedJob.location,

        // Set the platform manually
        sourcePlatform: "Indeed",

        // Handle transformations and safely access nested or optional data
        // The ?. is 'optional chaining' - it prevents errors if jobType or companyInfo is missing.
        jobType: indeedJob.jobType?.join(", "), // The data is an array, so we join it into a string
        companyLogoUrl: indeedJob.companyInfo?.companyLogo || null,
        postedOn: indeedJob.postingDateParsed ? new Date(indeedJob.postingDateParsed) : null,

        // Set to null for fields not provided by this source
        experienceLevel: null,
        salary: indeedJob.salary || null,
        skills: [],
    };
    return job;
}
