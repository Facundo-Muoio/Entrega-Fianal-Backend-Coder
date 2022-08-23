import passport from "passport";
import LocalStrategy  from "passport-local";
import crypto from "bcrypt";
import mongoose from "mongoose"
import { User } from "./models/user.js"

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    const user = User.findById(id)
    done(null, user)
})
