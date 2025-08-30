class ApiResponse {
    /**
     * @param {number} statusCode - The HTTP status code of the response.
     * @param {object} data - The data payload of the response.
     * @param {string} message - A descriptive message for the response.
     */
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // Success is true if status code is in the 2xx or 3xx range
    }
}

export { ApiResponse };
