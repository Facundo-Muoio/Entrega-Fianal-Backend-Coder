const password = document.getElementById("password")
const passwordCheck = document.getElementById("passwordCheck")
const btnRegister = document.getElementById("btnRegister")
const form = document.getElementById("form-registro")

function differentPassword(passwordCheckValue) {
    const passwordValue = password.value
    if(passwordValue !== passwordCheckValue){
        password.classList.add("is-invalid", "invalid")
        password.parentNode.classList.add("has-danger")
        passwordCheck.classList.add("is-invalid", "invalid")
        passwordCheck.parentNode.classList.add("has-danger")
        if(passwordCheck.parentNode.lastChild.nodeName === "#text"){
            const div = document.createElement("div")
            div.textContent = "Las contraseñas deben coincidir"
            div.classList.add("invalid-feedback")
            passwordCheck.parentNode.appendChild(div)
        }
        btnRegister.setAttribute("disabled", "true")
    }
    if(passwordValue === passwordCheckValue){
        password.classList.remove("is-invalid", "invalid")
        password.parentNode.classList.remove("has-danger") 
        passwordCheck.classList.remove("is-invalid", "invalid")
        passwordCheck.parentNode.classList.remove("has-danger")
        if(passwordCheck.parentNode.lastChild.nodeName === "DIV"){
           passwordCheck.parentNode.removeChild(passwordCheck.parentNode.lastChild)
        }
        btnRegister.removeAttribute("disabled")
    }
}

passwordCheck.addEventListener("change", (e) => {
    const passwordCheckValue = e.target.value
    differentPassword(passwordCheckValue)
})



