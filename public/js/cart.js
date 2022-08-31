const tbody = document.querySelector(".tbody")
const cartCount = document.querySelector(".bi-cart-fill")
const inputData = document.querySelector("#cart-data")
const inputHTML = document.querySelector("#inputHTML")
const table = document.querySelector(".table")
const btnPurchase = document.querySelector("#btn-purchase")
let total = 0

let numbersProducts
let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []
JSON.parse(localStorage.getItem("numbersProducts")) ? numbersProducts = JSON.parse(localStorage.getItem("numbersProducts")) : numbersProducts = ""


emptyCart()
if(numbersProducts){
    cartCount.textContent = numbersProducts[0].count
}

function renderCart(){
    if(cart.length > 0) {
        cart.forEach(e => {
            const regEx = /\$/g
            let parcial = e.precio.replace(regEx, "")
            parcial = parcial * Number(e.cantidad)
            total = Number(total) + Number(parcial)
            tbody.innerHTML += `
            <tr class="table-primary">
                <td>${e.nombre}</td>
                <td>${e.autor}</td>
                <td>${e.precio}</td>
                <td>${e.cantidad}</td>
                <td><img class="img-cart" src="${e.imagen}" alt="${e.nombre}"></td>
                <td><button class="btn-trash"><i class="bi bi-trash3-fill"></i></button></td>
                <td hidden>${e.id}</td>
            </tr>
            `
        })
        const btnsTrash = document.querySelectorAll(".btn-trash") 
        for (let btn of btnsTrash){
            btn.addEventListener("click", (e) => {
                let cantidad = btn.parentElement.previousElementSibling.previousElementSibling.textContent
                const id = btn.parentElement.nextElementSibling.textContent
                const elemento = cart.find(e => e.id === id && e.cantidad === cantidad)
                const index = cart.indexOf(elemento)
                cart.splice(index, 1)
                localStorage.setItem("cart",JSON.stringify(cart))
                numbersProducts[0].count = numbersProducts[0].count - elemento.cantidad
                localStorage.setItem("numbersProducts", JSON.stringify(numbersProducts))
                numbersProducts[0].count ? cartCount.textContent = numbersProducts[0].count : cartCount.textContent = ""
                emptyCart()
                const stocks = JSON.parse(localStorage.getItem("stocks"))
                const elementStock = stocks.find(e => e.id === id)
                elementStock.stock = Number(elementStock.stock) + Number(cantidad)
                localStorage.setItem("stocks", JSON.stringify(stocks))
                location.reload()
            })
        }
    } else {
        tbody.innerHTML = `
            <h3 class="mt-3">EL CARRITO ESTA VACIO </H3>
        `
    }
}

function emptyCart(){
    cart.length < 1 ? btnPurchase.setAttribute("disabled", "disabled") : ""
    btnPurchase.addEventListener("click", (e) => {
        inputData.value = JSON.stringify(cart)
        inputHTML.value = table.innerHTML
        localStorage.setItem("cart", JSON.stringify([]))
        localStorage.setItem("numbersProducts", JSON.stringify([]))
    })    
}



renderCart()


const tr = document.createElement("tr")
tr.innerHTML = `
    <tr>
    <th>TOTAL<th>
    <td>
        ${total}
    </td>
    <tr>
`
tbody.appendChild(tr)