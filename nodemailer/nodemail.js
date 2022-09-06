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

export function order(userEmail, dataTime, products, address){
  let html = htmlOrder(userEmail, dataTime, products, address)
  const message = {
    from: "Last Pages",
    to: APP_EMAIL,
    subject: "Orden de compra",
    html: `${html}`
  }
  return message
}

export const purchaseEmail = (userEmail, products, address) => {
  let html = htmlClient(products, address)
  const message = {
    from: APP_EMAIL, 
    to: `${userEmail}`,
    subject: "Tu pedido", 
    html: html
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

  function htmlOrder(userEmail, dataTime, products, address){
    let html = `
    <h3>Se registro una nueva orden de compra con los siguientes datos: </h3>
    <h4>Datos de la orden: </h4>
    <ul>
      <li>Email de usuario: ${userEmail}</li>
      <li>Fecha y hora: ${dataTime}</li>
      <li>Provincia: ${address.provincia}</li>
      <li>Calle: ${address.calle}, Número: ${address.numero}</li>
      ${address.piso && address.departamento ? `<li> Piso: ${address.piso},  Departamento: ${address.departamento}</li>` : ""}
    </ul>
    <h4>Productos: </h4>
    `
    products.forEach(e => {
      html += `
        <ul>
          <li>Nombre: ${e.nombre}</li>
          <li>Precio: ${e.precio}</li>
          <li>Cantidad: ${e.cantidad}</li>
        </ul>
      `
    })

    return html
  
  }

  function  htmlClient(products, address){
    let total = 0
    let html = `
      <h2>Gracias por comprar en Last Pages</h2>
      <h3>Tu pedido fue el siguiente: </h3>
    `
    products.forEach(e => {
      const regex = /\$/g
      let precio = e.precio.replace(regex, "")
      total += (Number(precio) * Number(e.cantidad))
      html += `
        <ul>
          <li>Nombre: ${e.nombre}</li>
          <li>Precio: ${e.precio}</li>
          <li>Cantidad: ${e.cantidad}</li>
        </ul>
      `
    })
    html += `
    <h3>TOTAL: $ ${total}</h3>
    <h3>Datos del envío: </h3>
    <ul>
      <li>Dirección: ${address.calle} ${address.numero}</li>
      ${address.piso && address.departamento ? `<li> Piso: ${address.piso},  Departamento: ${address.departamento}</li>` : ""}
      <li>Provincia: ${address.provincia}</li>
      <li>Código Postal: ${address.codigoPostal}</li>
    </ul>
    `
    return html
  }