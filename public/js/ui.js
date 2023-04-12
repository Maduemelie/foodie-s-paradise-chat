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
  // console.log(foodList);
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
  // console.log(optionData, "option");

  const selectedFoods = optionData.map(
    (food) => `</br>${food.name}:  ${food.price}`
  );
  const foodList = `<h4>You selected the following food items:</h4> ${selectedFoods}.`;

  const data = {
    author: "Foodie's-Bot",
    messageContent: foodList,
    messageClassName: "Foodies-Bot",
  };
  const messageContainer = document.getElementById("message_container_id");
  const newMessage = element.createNewMessageContainer(data);
  socketHandler.selectedFoodItems(optionData);
  messageContainer.appendChild(newMessage);
};

const appendOrderData = (orderData) => {
  // console.log(orderData);
  const { selectedFoods, totalPrice } = orderData;
  const foods = selectedFoods.map(
    (food) => `</br>${food.name}:  ${food.price}`
  );
  const order = `<h4>Your Order:</h4> ${foods}.</br></br> Total: $${totalPrice}</br></br>Thanks for your patronage`;

  const data = {
    author: "Foodie's-Bot",
    messageContent: order,
    messageClassName: "Foodies-Bot",
  };
  const messageContainer = document.getElementById("message_container_id");
  const newMessage = element.createNewMessageContainer(data);
  // socketHandler.selectedFoodItems(optionData);
  messageContainer.appendChild(newMessage);
};

const appendOrderHistoryData = (orderHistory) => {
  // console.log(orderHistory);
  const { formattedOrders } = orderHistory;
  // console.log(customerName);

  const orders = formattedOrders.map((order) => {
    return order;
  });
  // console.log(orders)
  const formattedOrderHistory = orders.map((order) => {
    const foods = order.items
      .map((food) => {
        return `${food.name}: ($${food.price.toFixed(2)})`;
      })
      .join(`<br>`);
    const date = new Date(order.timestamp).toLocaleString();
    return `Order placed on ${date} <br>Food ordered: <br><br> ${foods}.<br><br> Total: $${order.total.toFixed(
      2
    )}.<br><br> Status: ${order.status}.<br><br>`;
  });
  const data = {
    author: "Foodie's-Bot",
    messageContent: formattedOrderHistory,
    messageClassName: "Foodies-Bot",
  };
  const messageContainer = document.getElementById("message_container_id");
  const newMessage = element.createNewMessageContainer(data);
  // socketHandler.selectedFoodItems(optionData);
  messageContainer.appendChild(newMessage);

  // console.log(formattedOrderHistory);
};
const appendCurrentOrder = (currentOrderData) => {
  const { items, total } = currentOrderData;

  const foods = items.map((food) => `</br>${food.name}:  $${food.price}`);
  const currentOrder = `<h4>Your last Order:</h4> ${foods}.</br></br> Total: $${total}</br></br>`;
  const data = {
    author: "Foodie's-Bot",
    messageContent: currentOrder,
    messageClassName: "Foodies-Bot",
  };
  const messageContainer = document.getElementById("message_container_id");
  const newMessage = element.createNewMessageContainer(data);
  // socketHandler.selectedFoodItems(optionData);
  messageContainer.appendChild(newMessage);
};
const appendOrderCancel = (cancelData) => {
  const { message } = cancelData;
  const data = {
    author: "Foodie's-Bot",
    messageContent: message,
    messageClassName: "Foodies-Bot",
  };
  const messageContainer = document.getElementById("message_container_id");
  const newMessage = element.createNewMessageContainer(data);
  // socketHandler.selectedFoodItems(optionData);
  messageContainer.appendChild(newMessage);
};

export default {
  foodiesChatPage,
  appendMessages,
  appendServerData,
  appendOptionsData,
  appendOrderData,
  appendOrderHistoryData,
  appendCurrentOrder,
  appendOrderCancel,
};
