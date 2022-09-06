import { daoProducts } from "../../DAO/products.js"
export const dtoProducts = {}


dtoProducts.getProducts = async () => await daoProducts.getProducts()

dtoProducts.getProduct = async (id) => await daoProducts.getProduct(id)

dtoProducts.updateProduct = async (nombre, cantidad) => await daoProducts.updateProduct(nombre, cantidad)
