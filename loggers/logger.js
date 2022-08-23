import { createLogger, format, transports } from "winston";
const {
  combine,
  timestamp,
  printf,
  label,
  colorize,
  errors,
  prettyPrint,
  json,
} = format;
const env = process.env.NODE_ENV

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

function logger(env) {
  if (env === "production") {
    const logger = createLogger({
      format: combine(
        label({ label: "FACUNDO MUOIO" }),
        timestamp(),
        prettyPrint(),
        json(),
        errors({ stack: true })
      ),
      transports: [
        new transports.File({
          filename: "./loggers/logs/error.log",
          level: "error",
        }),
        new transports.File({
          filename: "./loggers/logs/combined.log",
          level: "info",
        }),
      ],
    });
    return logger;
  } else if (env === "development") {
    const logger = createLogger({
      format: combine(
        colorize(),
        label({ label: "FACUNDO MUOIO" }),
        timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        myFormat
      ),
      transports: [new transports.Console()],
    });
    return logger;
  }
}

export default logger(env)
