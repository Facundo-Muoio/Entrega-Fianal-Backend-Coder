import { io } from "../index.js";
import logger from "../loggers/logger.js";
import { dtoMessage } from "../DTOS/messageDTO/messages.js";

export async function chat(req, res) {
  return io.on("connection", async (socket) => {
    logger.info(`socket connected with id: ${socket.id}`);
    socket.emit("saved messages", await dtoMessage.getMessages());
    socket.on("chat message", async (message, date) => {
      await dtoMessage.postMessage(message, date);
      socket.emit(
        "bot message",
        "Hola bienvenido a nuestra tienda Online. En la brevedad uno de nuestros empleados atendera su consulta, gracias!"
      );
    });
    socket.on("save bot message", async (message, date) => {
      const sender = "Admin";
      await dtoMessage.postMessage(message, date, sender);
    });
    socket.on("forced disconnect", () => {
      socket.disconnect(true);
      io.disconnectSockets(true);
      logger.info(`Socket ${socket.id} has left the server`);
    });
  });
}
