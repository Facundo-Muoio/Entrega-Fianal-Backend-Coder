const password = document.querySelector("#password")
const passwordCheck = document.querySelector("#passwordCheck")
const btnRegistro = document.querySelector("#btnRegister")
const formRegistro = document.querySelector("#form-registro")
console.log(formRegistro, typeof formRegistro)
let pass1 = null
let pass2 = undefined

function addEvent(element){
   element.addEventListener("change", (e) => {
    e.target.name === "password" ? pass1 = e.target.value : e.target.name === "passwordCheck" ? pass2 = e.target.value : ""
   })
}

addEvent(password)
addEvent(passwordCheck)

function verifyPasswordsEquatity(psw1, psw2) {
    console.log(psw1, psw2)
    if(psw1 !== psw2){
        return console.log("las contraseñas son distintas")
    } return console.log("las contraseñas son iguales")
}

// for(let element of formRegistro){
//     addEvent(element)
// }

btnRegistro.addEventListener("click", (e) => {
    e.preventDefault()
    verifyPasswordsEquatity(pass1, pass2)
})