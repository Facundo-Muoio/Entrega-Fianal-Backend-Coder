import passport from "passport";

export const loginAuthenticate = passport.authenticate("login", {
  failureRedirect: "/login",
});
