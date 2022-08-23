import mongoose from "mongoose";
import { URLMONGO } from "../config/config.js";
import logger from "../loggers/logger.js";

const URL = URLMONGO

export async function connectMongoDB() {
  try {
    await mongoose.connect(URL);
    logger.info("Connected to Mongo DB");
  } catch (err) {
    logger.error(err);
  }
}
