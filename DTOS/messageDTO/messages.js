import { daoMessage } from "../../DAO/message.js"
import logger from "../../loggers/logger.js"
export const dtoMessage = {}

dtoMessage.postMessage = async (message, date, sender = "User") => {
    await daoMessage.postMessage(message, date, sender)
    return logger.info("Mensaje guardado con éxito")
}

dtoMessage.getMessages = async () => {
    const messages = await daoMessage.getMessages()
    return messages
}