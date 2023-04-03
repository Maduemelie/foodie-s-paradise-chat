const mealPlanController = require('./mealPlanController.js')
const day = require('../utils/day')

const checkMessageContent =async (messageContent) => {
    let mealPlan;
    if (messageContent === '1') {
         mealPlan = await mealPlanController.getmealplan(day)
        return mealPlan
    }
    
}
module.exports ={ checkMessageContent}