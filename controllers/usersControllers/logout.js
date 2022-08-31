import {io} from "../../index.js"
export const logoutCtrl = {};

logoutCtrl.logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy()
    res.redirect("/");
  });
};

