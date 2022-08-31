import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";
import logger from "../loggers/logger.js";

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
});

userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("user", userSchema);
