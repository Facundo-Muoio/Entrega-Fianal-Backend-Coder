import { PORT, HOST } from "./config/config.js";
import { logger } from "./loggers/logger.js";
console.log(PORT, HOST);
logger.log("error", "error al loguear");
