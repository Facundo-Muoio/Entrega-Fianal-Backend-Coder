import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf((level, message, label, timestamp) => {
  return `${timestamp} [${label}] ${colorize} ${level}: ${message}`;
});

export const logger = createLogger({
  level: "error",
  format: combine(label({ label: "Facundo Muoio" }), timestamp(), myFormat),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log", level: "warn" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}
