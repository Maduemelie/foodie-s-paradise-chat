
import store from "./store.js"

const foodiesChatPage = () => {
    // Get references to the introduction and chat pages
    const FoodiesWelcomePage = document.querySelector(".Welcome_page");
    const foodiesChatPage = document.querySelector(".foodies_chat_page");
  
    // Hide the introduction page and show the chat page
    FoodiesWelcomePage.classList.add("display_none");
    foodiesChatPage.classList.remove("display_none");
    foodiesChatPage.classList.add("display_flex");
  
    // Get the username from the store and update the UI
    const username = store.getUsername();
    const usernameLabel = document.getElementById('username')
    console.log(usernameLabel)
    usernameLabel.innerHTML = username
    // updateUsername(username);
  
    // Create the group chat box
    // createGroupChatBox();
};
  



export default {
    foodiesChatPage
}