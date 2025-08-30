import mongoose from "mongoose";

const DATABASE_NAME = "job-portal";

const connectDB = async () => {
    try {
        // We pass the URI directly, and specify the database name in the options object.
        // This is the professional and error-proof way to do it.
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI,
            {
                dbName: DATABASE_NAME,
            }
        );
        console.log(
            `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("MONGODB connection FAILED: ", error);
        process.exit(1);
    }
};

export default connectDB;

