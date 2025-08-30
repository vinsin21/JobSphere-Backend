/**
 * A utility function that wraps async route handlers to catch errors.
 * This avoids writing try-catch blocks in every controller function.
 * @param {Function} requestHandler - The asynchronous controller function to execute.
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };


