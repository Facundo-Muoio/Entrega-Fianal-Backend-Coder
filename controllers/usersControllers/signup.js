import { setEmail, transporter } from "../../nodemailer/nodemail.js";

export const signUpCtrl = {};

signUpCtrl.getSignUp = (req, res) => {
  res.render("register");
};

signUpCtrl.postSignUp = async (req, res) => {
  const { email } = req.body
  await transporter.sendMail(setEmail(email))
  res.redirect("/login")
}



