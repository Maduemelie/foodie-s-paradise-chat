import store from "./store.js";
import socketHandler from "./socketHandler.js";
import element from "./element.js";

const foodiesChatPage = () => {
  // Get references to the welcome and chat pages
  const FoodiesWelcomePage = document.querySelector(".Welcome_page");
  const foodiesChatPage = document.querySelector(".foodies_chat_page");

  // Hide the welcome page and show the chat page
  FoodiesWelcomePage.classList.add("display_none");
  foodiesChatPage.classList.remove("display_none");
  foodiesChatPage.classList.add("display_flex");

  // Get the username from the store and update the UI
  const username = store.getUsername();
  const usernameLabel = document.getElementById("username");

  usernameLabel.innerHTML = username;
  socketHandler.connectToSocketIoServer();
  appendMessages();
};

const appendMessages = () => {
  const newMessageInput = document.getElementById("new_message_input_id");
  newMessageInput.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Enter") {
      const data = {
        author: store.getUsername(),
        messageContent: event.target.value,
        messageClassName: "user_messages",
      };
      const messageContainer = document.getElementById("message_container_id");
      const newMessage = element.createNewMessageContainer(data);
      socketHandler.sendMessages(data);
      store.setInputValue(data.messageContent);

      messageContainer.appendChild(newMessage);
      newMessageInput.value = "";
    }
  });
};
const appendServerData = (serverData) => {
  const foodItems = Object.values(serverData.meals).flat();
  const foodList =
    `<h4>Select meals with comma separated number. e.g 1,3,5</h4>` +
    foodItems.map((item, index) => `${index + 1}. ${item}`).join(`</br>`);

  const data = {
    author: "Foodie's-Bot",
    messageContent: foodList,
    messageClassName: "Foodies-Bot",
  };

  const messageContainer = document.getElementById("message_container_id");
  const newMessage = element.createNewMessageContainer(data);
  messageContainer.appendChild(newMessage);
  return foodItems;
};

const appendOptionsData = (optionData) => {
  const selectedFoods = optionData.map((food) =>  food).join("</br>");
  
  
  const foodList = `<h4>You placed the following orders:</h4> ${selectedFoods}`;

  const data = {
    author: "Foodie's-Bot",
    messageContent: foodList,
    messageClassName: "Foodies-Bot",
  };
  const messageContainer = document.getElementById("message_container_id");
  const newMessage = element.createNewMessageContainer(data);
  messageContainer.appendChild(newMessage);
};

export default {
  foodiesChatPage,
  appendMessages,
  appendServerData,
  appendOptionsData,
};
