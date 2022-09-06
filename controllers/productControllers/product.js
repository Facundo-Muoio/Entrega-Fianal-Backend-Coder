import { dtoProducts } from "../../DTOS/productsDTO/products.js"

export const productCtrl = {}

productCtrl.getProduct = async (req, res) => {
    const { id } = req.params
    const product = await dtoProducts.getProduct(id)
    res.render("product", { product })
}