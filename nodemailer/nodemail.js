import nodemailer from "nodemailer"
import { APP_EMAIL, APP_EMAIL_PSW } from "../config/config.js"
import logger from "../loggers/logger.js"
 
export const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: APP_EMAIL,
      pass: APP_EMAIL_PSW,
    },
  });

export const setEmail = (recipient) => {
    const message = {
        from: APP_EMAIL,
        to: `${recipient}`,
        subject: "Registro de usuario exitoso",
        text: "Te has registrado con éxito a nuestra tienda online, ya puedes comenzar a adquirir todos nuestros productos."
    };
    return message
}

export const purchaseEmail = (recipient, data) => {
  const message = {
    from: APP_EMAIL, 
    to: `${recipient}`,
    subject: "Orden de compra", 
    html: `${html(data)}`
  };
  return message
}


  transporter.verify(function (error, success) {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Server is ready to take our messages");
    }
  });

  function html(data){
    let html
    data.forEach(e => {
      html += `
        <ul>
          <li>Nombre: ${e.nombre}</li>
          <li>Autor: ${e.autor}</li>
          <li>Precio: ${e.precio}</li>
          <li>Cantidad: ${e.cantidad}</li>
          <li>Id: ${e.id}</li>
        </ul>


      `
    })
    return html
  }