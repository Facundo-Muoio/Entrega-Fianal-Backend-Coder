import { Message } from "../models/messages.js";

export const daoMessage = {};

daoMessage.postMessage = async (message, date, sender, email) => {
  const newMessage = new Message({ message, date, sender });
  await newMessage.save();
  return newMessage;
};

daoMessage.getMessages = async () => {
  const allMessages = await Message.find({});
  return allMessages;
};
