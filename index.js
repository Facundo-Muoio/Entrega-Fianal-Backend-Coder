import { PORT, HOST, APP_EMAIL_PSW } from "./config/config.js";
import logger from "./loggers/logger.js";
import express from "express";
import router from "./routes/router.js";
import session from "express-session";
import passport from "passport";
import { connectMongoDB } from "./db/mongo.js";
import flash from "connect-flash"
import "./passport/passport.js"
import http from "http"
import { Server } from "socket.io";
import { chat } from "./services/chat.js";
import cors from "cors"


//variables
const app = express();
const server = http.createServer(app)
export const io = new Server(server)

//setting server
app.set("json spaces", 2);
app.set("views", "./views");
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors())
app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//variables globales
app.use((req, res, next) => {
  app.locals.userError = req.flash("userError")
  app.locals.pswError = req.flash("pswError")
  app.locals.loginError = req.flash("loginError")
  app.locals.user = req.user
  next();
});

//socket.io
chat()

//routes
app.use(router);

//connect to Mongo DB
connectMongoDB();

//server initialized
server.listen(
  PORT,
  logger.info(`Server hosted in ${HOST} and listen on port ${PORT}`)
);
