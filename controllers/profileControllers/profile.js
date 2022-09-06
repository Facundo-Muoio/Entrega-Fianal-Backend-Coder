export const profileCtrl = {};
import { dtoUser } from "../../DTOS/userDTO/user.js";

profileCtrl.getProfile = async (req, res) => {
  const user = await dtoUser.getUser(req.user.email);
  res.render("profile", { user });
};
