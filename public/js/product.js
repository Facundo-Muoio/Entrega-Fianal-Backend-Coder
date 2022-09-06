//div contenedor de la fecha de envio del libro
const boxSend = document.querySelector(".box-send");
//btn para agregar cantidad de producto
const btnAdd = document.querySelector(".btn-add-qty");
//btn para disminuir cantidad de producto
const btnLess = document.querySelector(".btn-less-qty");
//array donde se guardan los productos que añadimos al carrito
let arrCart = getCartNotParse() ? getCartStorage() : [];
//variable con el elemento boton para agragar al carrito
const btnAddCart = document.querySelector(".add-cart");
// constante que contiene los articulos del carrito
const containerCart = document.querySelector(".offcanvas-body");
// boton para finalizar compra
const btnPurchase = document.querySelector(".btn-purchase")


//funcion que trae el carrito del local storage sin parsear
function getCartNotParse() {
  return localStorage.getItem("cart");
}

//funcion que trae el carrito del local storage
function getCartStorage() {
  return JSON.parse(localStorage.getItem("cart"));
}

//funcion que guarda el carrito en el local storage
function setCartStorage(array) {
  localStorage.setItem("cart", JSON.stringify(array));
}

//funcion que obtiene y devuelve: el día, el número y el mes. Todo apartir de la instancia del objeto date y los métodos getDay, getDate, getMonth
function dateOfSend() {
  const date = new Date();
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const envio = `${days[Number(date.getDay(days)) + 1]} ${
    Number(date.getDate()) + 1
  } de ${months[date.getMonth()]}`;
  return envio;
}

//agregamos al contenedor de la fecha del envio el html con la función que retorna la fecha.
if(boxSend){
    boxSend.innerHTML += `
    <span><b>Recibelo gratis mañana</b> ${dateOfSend()}</span>
`;
}

if(btnAdd && btnLess){
    addEventsBtnsQuantitys(btnAdd);
    addEventsBtnsQuantitys(btnLess);
}

function addEventsBtnsQuantitys(btn) {
  //obtenemos el input donde se visualiza las unidades del producto a comprar
  let quantity = document.querySelector(".quantity-box input");
  //max almacena el máximo de unidades disponibles para comprar según el stock
  const max = quantity.getAttribute("max");
  //si nuestro argumento es el boton de sumar le agregamos el listener con su respectiva función
  //En caso de ser el boton de restar hacemos lo mismo pero con su función correspondiente
  if (btn === btnAdd) {
    btn.addEventListener("click", () => addQuantity(quantity, max));
  }
  if (btn === btnLess) {
    btn.addEventListener("click", () => subtractQuantity(quantity));
  }
}

//si el valor del input es inferior a max (stock del product) entonces aumentamos
//en 1 la cantidad del producto y lo rederizamos en el input
function addQuantity(quantity, max) {
  if (Number(quantity.value) < max) {
    let newQuantity = Number(quantity.value) + 1;
    quantity.value = newQuantity;
  }
}

//si el valor del input es superior a min (1) entonces disminuimos
//en 1 la cantidad del producto y lo rederizamos en el input
function subtractQuantity(quantity) {
  if (Number(quantity.value) > 1) {
    let newQuantity = Number(quantity.value) - 1;
    quantity.value = newQuantity;
  }
}

//funcion para agregar eventlistener al boton de agregar del carrito
if(btnAddCart){
    btnAddCart.addEventListener("click", (e) => {
        addProductToCart();
    });
}

//funcion para agregar evenlistener al boton de finalizar compra
if(btnPurchase){
  btnPurchase.addEventListener("click", (e) => {
    purchase()
  })
}


//funcion para cargar los productos al carrito, utilizamos un objeto que contine las propiedades con la info
//que recuperamos de los elementos que forman parte del detalle del producto. Luego los guardamos dentro del array
//del carrito y aplicamos la función para guardar el mismo en el local storage.
function addProductToCart() {
  let quantity = document.querySelector(".quantity-box input")
  const max = quantity.getAttribute("max")
  if(max <= 0 ){
    btnAddCart.setAttribute("disabled", "")
  } else {
    const infoProduct = {
      imagen: document.querySelector(".product-img-box img").src,
      nombre: document.querySelector(".product-name h2").textContent,
      precio: document.querySelector(".product-price").textContent,
      cantidad: document.querySelector(".quantity-box input").value,
    };
    arrCart.push(infoProduct);
    setCartStorage(arrCart);
    renderProduct();
  }
}

// funcion que renderiza los articulos dentro del contenedor en el carrito y agrega numero de items al icon carrito
function renderProduct() {
  addNumberToCartIcon()
  let total = 0;
  containerCart.innerHTML = "";
  const products = getCartStorage();
  products.forEach((product) => {
    let { imagen, nombre, precio, cantidad } = product;
    containerCart.innerHTML += `
        <div class="container-aticle">
          <img src="${imagen}" alt="${nombre}">
          <div class="article-content-info">
              <h5>${nombre}</h5>
              <h5><b>${precio}</b></h5>
              <h5>cantidad: ${cantidad}</h5>
          </div>
          <button class="delete-product" id="${nombre}"><i class="bi bi-x-circle-fill"></i></button>
        </div>
    `;
    precio = formatedPrice(precio)
    total += (Number(precio) * Number(cantidad))
  });
  if(products.length > 0){
    containerCart.innerHTML += `
    <div class="text-center mt-3"><h5>TOTAL: $ ${total}</h5><div>
    <button type="button" class="btn btn-success mt-3 w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Finalizar compra
    </button>
  `
  }
  loadAddEventListenners();
}

//carga listenner a elementos
function loadAddEventListenners() {
  let deleteIcon = document.querySelectorAll(".delete-product");
  deleteIcon.forEach((element, index) => {
    element.addEventListener("click", () => deleteProduct(index));
  });
}

//funcion que elimina productos según el index
function deleteProduct(index) {
  const products = getCartStorage();
  products.splice(index, 1);
  arrCart.splice(index, 1)
  setCartStorage(products);
  renderProduct();
}

function formatedPrice(str){
    const regex = /\$/g
    return str.replace(regex, "")
}

if(getCartStorage()){
    if (getCartStorage().length > 0) {
        renderProduct();
    }
}

addNumberToCartIcon()
function addNumberToCartIcon(){
    if(getCartStorage()){
        const icon = document.querySelector(".bi-cart-fill")
        if(getCartStorage().length > 0){
            icon.textContent = getCartStorage().length
        } else {
            icon.textContent = ""
        }
    }
} 
    
function purchase(){
  const products = getCartNotParse()
  const inputProducts = document.querySelector(".input-products")
  inputProducts.value = products
  setCartStorage([])
}

console.log("hola el product.js esta corriendo")