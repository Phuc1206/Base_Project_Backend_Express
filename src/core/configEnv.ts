import 'dotenv/config'
import dotenv from 'dotenv'
import logger from "./logger"

logger("INFO", `NODE_ENV="${process.env.NODE_ENV}"`);

if (process.env.NODE_ENV) {
    dotenv.config({
        path: `.env.${process.env.NODE_ENV}`,
    });
}

if (!process.env.NODE_ENV) {
    logger("ERROR", `Cannot find environment!`)
} else {
    logger("SUCCESS", `Load .env.${process.env.NODE_ENV} done`);
}
