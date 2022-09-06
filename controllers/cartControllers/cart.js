import { dtoProducts } from "../../DTOS/productsDTO/products.js"
import { dtoCart } from "../../DTOS/cartDTO/cart.js"
import { order, purchaseEmail, transporter } from "../../nodemailer/nodemail.js"
import { dtoOrder } from "../../DTOS/orderDTO/order.js"

export const cartCtrl = {}


cartCtrl.postCart =  async (req, res) => {
    const { provincia, calle, numero, piso = null, departamento = null, codigoPostal, productos  } = req.body
    const email = req.user.email
    const address = { provincia, calle, numero, piso, departamento, codigoPostal }
    const products = JSON.parse(productos)
    const dataTime = new Date().toLocaleString()
    await dtoCart.postCart(email, dataTime, products, address)
    await dtoOrder.postOrder(email, dataTime, products, address)
    const stock = JSON.parse(productos)
    stock.forEach(async e => {
        await dtoProducts.updateProduct(e.nombre, e.cantidad)
    })
    transporter.sendMail(order(email, dataTime, products, address))
    transporter.sendMail(purchaseEmail(email, products, address))
    res.redirect("/purchase")
}