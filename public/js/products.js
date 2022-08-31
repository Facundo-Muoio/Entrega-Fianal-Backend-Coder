const btnsLess = document.querySelectorAll(".btn-less")
const btnsAdd = document.querySelectorAll(".btn-add")
const btnsAddToCart = document.querySelectorAll(".btn-add-cart")
const iconCart = document.querySelector(".bi-cart-fill")
let stocks
let numberProducts
let cart
JSON.parse(localStorage.getItem("stocks")) ?  stocks = JSON.parse(localStorage.getItem("stocks")) : stocks = []
JSON.parse(localStorage.getItem("numbersProducts")) ? numberProducts =  JSON.parse(localStorage.getItem("numbersProducts")) : numberProducts = []
JSON.parse(localStorage.getItem("cart")) ? cart = JSON.parse(localStorage.getItem("cart")) : cart = []


function initialStocks () {
    if(stocks.length > 0){
        for(let btn of btnsLess){
            const stockHidden = btn.parentElement.previousElementSibling
            const stock = btn.nextElementSibling
            const id = btn.parentElement.previousElementSibling.previousElementSibling.textContent
            const currentStock = stocks.find(e => e.id === id)
            stockHidden.textContent = currentStock.stock
            stock.textContent = currentStock.stock
        }
    } else {
        for(let btn of btnsLess){
            const stock = btn.parentElement.previousElementSibling.textContent
            const id = btn.parentElement.previousElementSibling.previousElementSibling.textContent
            stocks.push({id: id, stock: stock})
         }
         localStorage.setItem("stocks", JSON.stringify(stocks))
    }
   }

initialStocks()

function addOrLess (element){
    for(let btn of element){
        btn.addEventListener("click", (e) => {
            let currentStock = Number(btn.parentElement.previousElementSibling.textContent)
            let id = btn.parentElement.previousElementSibling.previousElementSibling.textContent
            if(element === btnsLess){
                if(currentStock > 1){
                    currentStock --
                    btn.parentElement.previousElementSibling.textContent = currentStock
                    btn.nextElementSibling.textContent = currentStock 
                }
            } else {
                const stock = stocks.find(e => e.id === id)
                if(currentStock < stock.stock){
                    currentStock ++ 
                    btn.parentElement.previousElementSibling.textContent = currentStock
                    btn.previousElementSibling.textContent = currentStock 
                }
            }
        })
    }
}

addOrLess(btnsLess)
addOrLess(btnsAdd)  

function addToCart() {
   for( let btn of btnsAddToCart){
        let currentStock = btn.parentElement.previousElementSibling.previousElementSibling.textContent
        Number(currentStock) <= 0 ? btn.setAttribute("disabled", "disabled") : ""
    btn.addEventListener("click", e => {
        const id  = btn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent
        let currentStock = btn.parentElement.previousElementSibling.previousElementSibling.textContent
        let imagen = btn.parentElement.parentElement.firstElementChild.getAttribute("src")
        let nombre = btn.parentElement.parentElement.firstElementChild.nextElementSibling.textContent
        let autor = btn.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent
        let precio = btn.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent
        let cantidad = currentStock
        cart.push({imagen, nombre, autor, precio, cantidad, id})
        localStorage.setItem("cart", JSON.stringify(cart))
        let descuentoStock 
        stocks.forEach(e => {
            if(e.id === id){
                descuentoStock = e.stock - currentStock
                e.stock = descuentoStock
                localStorage.setItem("stocks", JSON.stringify(stocks))
                if(numberProducts.length > 0){
                    numberProducts[0].count = Number(numberProducts[0].count) + Number(currentStock)
                    localStorage.setItem("numbersProducts", JSON.stringify(numberProducts))
                    iconCart.textContent = Number(iconCart.textContent) + Number(currentStock)
                    let stockHidden = btn.parentElement.previousElementSibling.previousElementSibling
                    stockHidden.textContent = String(descuentoStock)
                    let renderDescuentoStock = btn.parentElement.previousElementSibling.firstElementChild.nextElementSibling
                    renderDescuentoStock.textContent = descuentoStock
                } else {
                    numberProducts.push({count: currentStock})
                    localStorage.setItem("numbersProducts", JSON.stringify(numberProducts))
                    iconCart.textContent = numberProducts[0].count
                    let stockHidden = btn.parentElement.previousElementSibling.previousElementSibling
                    stockHidden.textContent = String(descuentoStock)
                    let renderDescuentoStock = btn.parentElement.previousElementSibling.firstElementChild.nextElementSibling
                    renderDescuentoStock.textContent = descuentoStock
                }
            }
        })
    })
   }
}

addToCart()

if(numberProducts.length > 0){
    iconCart.textContent = numberProducts[0].count
}