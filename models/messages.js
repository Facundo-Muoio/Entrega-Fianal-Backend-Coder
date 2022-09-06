import mongoose from "mongoose";
const { Schema, model } = mongoose;

const messagesSchema = new Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
});

export const Message = model("message", messagesSchema);
