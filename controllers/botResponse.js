const mealPlanController = require("./mealPlanController.js");
const day = require("../utils/day");

const checkMessageContent = async (messageContent, socket) => {
  let mealPlan, selectedFoods;
  switch (messageContent) {
    case "1":
      mealPlan = await mealPlanController.getmealplan(day);
      return { type: "input-value", data: mealPlan };
    case "99":
      // Do something for messageContent 99...
      break;
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
        //   console.log(selectedFoods)
      return { type: "optionsData", data: selectedFoods };
  }
};

const turnToArray = async (messageContent, socket) => {
  const numArray = messageContent.split(",").map(Number);
  mealPlan = await mealPlanController.getmealplan(day);
  const flattenedFoodItems = Object.values(mealPlan.meals).flat();
  const selectedFoods = numArray.map((index) => {
    return flattenedFoodItems[index - 1].split(" - ")[0];
  });
  return selectedFoods;
};

module.exports = { checkMessageContent, turnToArray };
