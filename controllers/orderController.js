const Order = require("../models/orderModel");
const Food = require("../models/foodModel");
// const session = require("express-session");

exports.createOrder = async (selectedFoods, totalPrice, socket) => {
  try {
    if (selectedFoods.length === 0) return;
    selectedFoods = await Promise.all(
      selectedFoods.map(async (foodName) => {
        // console.log(foodName)
        let food = await Food.findOne({ name: foodName });
        console.log(food.name);
        return food._id;
      })
    );
    const customerName = socket.request.session.username;
    console.log(customerName);
    const order = await Order.create({
      customerName,
      orderItems: selectedFoods,
      totalPrice,
    });
    return order;
  } catch (error) {
    return error.message;
  }
};

// get the order history of a user
exports.userOrderHistory = async (customerName) => {
  try {
    

    // Find all orders for the current user
    const orders = await Order.find({ customerName }).populate("orderItems");
    // console.log(orders);
    // Map the orders to a more readable format
    const formattedOrders = orders.map((order) => ({
      // id: order._id,
      items: order.orderItems.map((item) => ({
        name: item.name,
        price: item.price,
      })),
      total: order.totalPrice,
      status: order.status,
      timestamp: order.createdAt,
    }));
    // console.log(formattedOrders)
    const orderHistory = {
      customerName,
      formattedOrders,
    };
    return orderHistory;
  } catch (error) {
    return error.message;
  }
};

exports.getCurrentOrder = async (customerName) => {
  try {
    // Find the most recent order for the current user
    const order = await Order.findOne({ customerName })
      .sort({ createdAt: -1 })
      .populate("orderItems");

    if (!order) {
      // If there is no order, send a message to the use
      return { message: "No order found" };
    }

    // Format the order items as an array of objects with name, price
    const formattedItems = order.orderItems.map((item) => ({
      name: item.name,
      price: item.price,
    }));

    // Send the most recent order to the user as a JSON response
    return { id: order._id, items: formattedItems, total: order.totalPrice };
  } catch (error) {
   return error.message
  }
};

exports.cancelOrder = async (customerName) => {
  try {
    

    // Find the most recent order for the current user
    const order = await Order.findOne({ customerName }).sort({ createdAt: -1 });

    if (!order) {
      // If there is no current order, send a message to the user
      return { message: "No current order to cancel" };
     
    }
    order.status = "Cancelled";
    await order.save();
    return{ message: "Order canceled successfully" };
  } catch (error) {
   return error.message
  }
};
