import store from "./store.js"
import ui from "./ui.js"

const nameInput = document.querySelector(".name_input");
nameInput.addEventListener("keyup", (event) => {
  store.setUsername(event.target.value);
});

const enterChat = document.getElementById("enter_chat_button");

enterChat.addEventListener("click", (e) => {
  ui.foodiesChatPage()
});
