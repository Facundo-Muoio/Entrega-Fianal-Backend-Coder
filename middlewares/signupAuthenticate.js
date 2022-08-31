import passport from "passport";

export const signupAuthenticate = passport.authenticate("signup", {
  failureRedirect: "/signup",
});
