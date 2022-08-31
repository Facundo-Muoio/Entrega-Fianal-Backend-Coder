import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import logger from "../loggers/logger.js";

import { User } from "../models/user.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(
          null,
          false,
          req.flash("userError", "El usuario no se encuentra registrado")
        );
      } else if (await user.checkPassword(password)) {
        return done(null, user);
      } else {
        return done(
          null,
          false,
          req.flash("pswError", "La contraseña ingresada es incorrecta")
        );
      }
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });
      if (user) {
        return done(
          null,
          false,
          req.flash(
            "loginError",
            "El email ingresado ya se encuentra en uso. Intente con otro."
          )
        );
      } else {
        const { email, password, phone, name, surname } = req.body;
        const newUser = new User({ email, phone, name, surname });
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save();
        return done(null, newUser);
      }
    }
  )
);
