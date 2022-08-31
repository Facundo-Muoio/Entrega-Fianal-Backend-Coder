let socket = io();

let form = document.getElementById("form");
let input = document.getElementById("inputDefault");
let chatBox = document.querySelector(".chat-box");
let anchorLogOut = document.querySelector("#logout");
let chatIcon = document.querySelector(".bi-chat-left-fill")
let btnCloseChat = document.querySelector(".bi-x")
let card = document.querySelector(".card")

function getMessageDate() {
  const date = new Date();
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Vierens",
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
  const time = date.getHours() + ":" + date.getMinutes();
  return `${days[date.getDay()]} ${date.getDate()} de ${
    months[date.getMonth()]
  } de ${date.getFullYear()}, ${time}`;
}

if (chatBox) {
  socket.on("saved messages", (messages) => {
    chatBox.innerHTML = "";
    if (messages) {
      messages.forEach((e) => {
        if (e.sender !== "Admin") {
          chatBox.innerHTML += `
          <div class="container-userMessage">
            <p class="userMessage">${e.message}
              <span class="userMessage-span">${e.date}<span>
            </p>
          </div>
          `;
        } else {
          chatBox.innerHTML += `        
        <div class="container-botMessage">
          <p class="botMessage">${e.message}
            <span class="botMessage-span">${e.date}<span>
          </p>
        </div>  
          `;
        }
      });
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
      console.log(input.value)
      socket.emit("chat message", input.value, getMessageDate());
      chatBox.innerHTML += `
      <div class="container-userMessage">
        <p class="userMessage">
          ${input.value}
          <span class="userMessage-span">${getMessageDate()}<span>
        </p>
      </div>
      `;
      input.value = "";
    }
  });

  socket.once("bot message", (botMsg) => {
    chatBox.innerHTML += `   
    <div class="container-botMessage">
      <p class="botMessage">${botMsg}
        <span class="botMessage-span">${getMessageDate()}<span>
      </p>
    </div>
    `;
    socket.emit("save bot message", botMsg, getMessageDate());
  });
}

anchorLogOut.addEventListener("click", () => {
  socket.emit("forced disconnect");
});

chatIcon.addEventListener("click", () => {
  card.classList.remove("hidden")
  chatIcon.classList.add("hidden")
})

btnCloseChat.addEventListener("click", () => {
  card.classList.add("hidden")
  chatIcon.classList.remove("hidden")
})