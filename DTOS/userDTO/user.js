import { daoUser } from "../../DAO/user.js";
export const dtoUser = {};

dtoUser.getUserName = async (email) => {
  const user = await daoUser.getUser(email);
  const name = user.name
  return name;
};
