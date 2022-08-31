import { daoProducts } from "../../DAO/products.js"
export const dtoProducts = {}


dtoProducts.getProducts = async () => await daoProducts.getProducts()

dtoProducts.getProduct = async (id) => await daoProducts.getProduct(id)

dtoProducts.updateProduct = async (id, cantidad) => await daoProducts.updateProduct(id, cantidad)
