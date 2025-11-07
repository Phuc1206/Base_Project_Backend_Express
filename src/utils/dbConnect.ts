import ENV from "../core/ENV"
import mongoose from "mongoose";
import logger from "../core/logger"

/**
 * Connection ready state
 * 0 = disconnected
 * 1 = connected
 * 2 = disconnecting
 * 99 = unitialized
 */

async function dbConnect() {
    const startTime = Date.now(); // return milliseconds
    logger("WAITTING", `Connecting to database...`);

    // 1 = connected
    if (mongoose.connection.readyState === 1) {
        logger("INFO", "Connection ready state: connected");
        return;
    }

    try {
        await mongoose.connect(ENV.MONGODB_URI).then(() => console.log('connected'));

        const totalTime = Date.now() - startTime;
        logger("SUCCESS", `Connect to database successfully in ${totalTime}ms`);
    } catch (error) {
        logger("ERROR", "Connect to database failure! -> " + error);
        process.exit();
    }
}

export default dbConnect;