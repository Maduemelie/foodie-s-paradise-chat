const mealPlanController = require("./mealPlanController.js");
const day = require("../utils/day");
const orderController = require("../controllers/orderController.js");

const checkMessageContent = async (messageContent, socket) => {
  let mealPlan, selectedFoods;
  switch (messageContent) {
    case "1":
      mealPlan = await mealPlanController.getmealplan(day);
      return mealPlan;
    case "99":
      selectedFoods = socket.request.session.selectedFoods;
      if (selectedFoods) {
        const foodNames = selectedFoods.map((food) => food.name);
        const totalPrice = selectedFoods
          .reduce((total, food) => {
            const priceNumber = parseFloat(food.price.slice(1));
            return total + priceNumber;
          }, 0)
          .toFixed(2);
        await orderController.createOrder(foodNames, totalPrice);

        const orderData = {
          selectedFoods,
          totalPrice,
        };

        socket.emit("orderData", orderData);
        return;
      } else {
        return { message: "No selected foods found." };
      }
    case "98":
      // Do something for messageContent 98...
      break;
    case "97":
      // Do something for messageContent 97...
      break;
    case "0":
      // Do something for messageContent 0...
      break;
    default:
      selectedFoods = await turnToArray(messageContent, socket);
      socket.request.session.selectedFoods = selectedFoods;
      socket.emit("optionsData", selectedFoods);
      return;
  }
};

// const checkMessageContent = async (messageContent, socket) => {
//   let mealPlan, selectedFoods, orderData;
//   switch (messageContent) {
//     case "1":
//       mealPlan = await mealPlanController.getmealplan(day);
//       return { type: "input-value", data: mealPlan };
//     case "99":

//       break;
//     case "98":
//       // Do something for messageContent 98...
//       break;
//     case "97":
//       // Do something for messageContent 97...
//       break;
//     case "0":
//       // Do something for messageContent 0...
//       break;
//     default:
//       selectedFoods = await turnToArray(messageContent, socket);
//       return { type: "optionsData", data: selectedFoods };
//   }
// };

const turnToArray = async (messageContent, socket) => {
  const numArray = messageContent.split(",").map(Number);
  mealPlan = await mealPlanController.getmealplan(day);
  const flattenedFoodItems = Object.values(mealPlan.meals).flat();
  const selectedFoods = numArray.map((index) => {
    const foodItem = flattenedFoodItems[index - 1].split(" - ");
    return { name: foodItem[0], price: foodItem[1] };
  });
  return selectedFoods;
};

module.exports = { checkMessageContent, turnToArray };

// const mealPlanController = require("./mealPlanController.js");
// const day = require("../utils/day");

// const checkMessageContent = async (messageContent, socket) => {
//   let mealPlan, selectedFoods, orderData;
//   switch (messageContent) {
//     case "1":
//       mealPlan = await mealPlanController.getmealplan(day);
//       return { type: "input-value", data: mealPlan };
//     case "99":
//       socket.on("selection",  (data) => {
//         console.log(data)
//         //  orderData = await createOrder(data);
//         socket.emit("input-value", data);

//       })

//       break;
//     case "98":
//       // Do something for messageContent 98...
//       break;
//     case "97":
//       // Do something for messageContent 97...
//       break;
//     case "0":
//       // Do something for messageContent 0...
//       break;
//     default:
//           selectedFoods = await turnToArray(messageContent, socket);
//         //   console.log(selectedFoods)
//       return { type: "optionsData", data: selectedFoods };
//   }
// };
// const turnToArray = async (messageContent, socket) => {
//   const numArray = messageContent.split(",").map(Number);
//   mealPlan = await mealPlanController.getmealplan(day);
//   const flattenedFoodItems = Object.values(mealPlan.meals).flat();
//   const selectedFoods = numArray.map((index) => {
//     const foodItem = flattenedFoodItems[index - 1].split(" - ");
//     return { name: foodItem[0], price: foodItem[1] };
//   });
//   return selectedFoods;
// };

// module.exports = { checkMessageContent, turnToArray };
