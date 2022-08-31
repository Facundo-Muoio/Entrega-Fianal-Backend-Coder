import { dtoProducts } from "../../DTOS/productsDTO/products.js"
import { purchaseEmail, transporter } from "../../nodemailer/nodemail.js"

export const cartCtrl = {}

cartCtrl.getCart = (req, res) => {
    res.render("cart")
}

cartCtrl.postCart =  (req, res) => {
    const { data } = req.body
    const stock = JSON.parse(data)
    stock.forEach(async e => {
        await dtoProducts.updateProduct(e.id, e.cantidad)
    })
    transporter.sendMail(purchaseEmail(req.user.email, stock))
    res.redirect("/purchase")
}