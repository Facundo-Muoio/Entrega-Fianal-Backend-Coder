import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const result = dotenv.config({
  path: path.resolve(__dirname, `./enviroments/.env.${process.env.NODE_ENV}`),
});
const PORT = result.parsed.PORT;
const HOST = result.parsed.HOST;
const URLMONGO = result.parsed.URLMONGO

export { PORT, HOST, URLMONGO };
