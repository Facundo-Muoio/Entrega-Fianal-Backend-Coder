import { PORT, HOST } from "./config/config.js";
import logger from "./loggers/logger.js";
import express from "express";
import router from "./routes/router.js";
import session from "express-session";
import passport from "passport";
import { connectMongoDB } from "./db/mongo.js";

//variables
const app = express();

//setting server
app.set("json spaces", 2);
app.set("views", "./views");
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(router);

connectMongoDB();

app.listen(
  PORT,
  logger.info(`Server hosted in ${HOST} and listen on port ${PORT}`)
);
