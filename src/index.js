import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
// We will create this connectDB file in the next step
// import connectDB from "./db/index.js"; 

// Load environment variables from .env file
dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 8080;

// This is an async IIFE (Immediately Invoked Function Expression)
// It allows us to use await at the top level
(async () => {
    try {
        // We will uncomment this line in the next step after creating the DB connection
        await connectDB();

        app.listen(PORT, () => {
            console.log(`⚙️  Server is running on port: ${PORT}`);
            console.log(`📑 Visit the documentation at: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("ERROR: Failed to start server", error);
        process.exit(1); // Exit the process with an error code
    }
})();

// **What we did here:**
// * **Separated Logic:** Notice this file doesn't know anything about `express` directly. It just imports the configured `app` from `app.js`.
// * **Loaded Environment:** It uses `dotenv` to load your `.env` file so we can access `process.env.PORT`.
// * **Robust Startup:** It attempts to connect to the database *first*. If the database connection fails (which we'll build next), the server won't even try to start. This prevents errors where your app is running but can't talk to its data.



