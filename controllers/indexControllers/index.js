import { dtoProducts } from "../../DTOS/productsDTO/products.js"
export const indexCtrl = {};

indexCtrl.getIndex = async (req, res) => {
  res.render("index")
} 

indexCtrl.getIndexProducts = async (req, res) => {
  const products = await dtoProducts.getProducts()
  req.user ? req.session.products = products : ""
  res.render("products", { products });
};
