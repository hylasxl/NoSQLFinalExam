import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

const MONGOOSE_URI = String(process.env.MONGODB_DATABASE_CONNECTION_STRING)

export const connectDatabase = async () => {
    
    await mongoose.connect(MONGOOSE_URI)
        .then(() => {
            console.log("Database connect successfully")
        })
        .catch((err) => {
            console.error('Database connection error:', err);
        })
}   