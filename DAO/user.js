import logger from "../loggers/logger.js";
import { User } from "../models/user.js";

export const daoUser = {};

daoUser.getUser = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

daoUser.postUser = async (user) => {  
  const newUser = new User({ ...user });
  await newUser.save();
  return user;
};

daoUser.putUser = async (name, surname, email, password, phone, id) => {
  logger.info(name, surname, email, password, phone, id);
  const objUser = {};
  name ? objUser.name : "";
  surname ? objUser.surname : "";
  email ? objUser.email : "";
  password ? objUser.password : "";
  phone ? objUser.phone : "";
  const user = await User.findByIdAndUpdate(id, { ...objUser });
  return user;
};
