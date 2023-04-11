import store from "./store.js";
import ui from "./ui.js";

let socket = null;

const connectToSocketIoServer = () => {
  socket = io("/");
  socket.on("connect", () => {
    // Listening for the "connect" event
    console.log("connected", socket.id); // Logging the socket ID to the console
    store.setSocketId(socket.id);

    socket.on("input-value", (data) => {
      // console.log(data);
      ui.appendServerData(data);
    });
    socket.on("optionsData", data => {
      // console.log(data ,"option")
      ui.appendOptionsData(data)
      
    })
    socket.on("orderData", data => {
     ui.appendOrderData(data)
    })

    socket.on("orderHistory", data => {
      // console.log(data)
     ui.appendOrderHistoryData(data)
    })
    socket.on("currentOrder", data => {
      console.log(data)
      ui.appendCurrentOrder(data)
    })
    socket.on("orderCancelled", data => {
      ui.appendOrderCancel(data)
      // console.log(data.message)
    })
  });
};

const sendMessages = (data) => {
  socket.emit("input-value", data);
};
const selectedFoodItems = (data) => {
  socket.emit('selection', data)
};

export default {
  connectToSocketIoServer,
  sendMessages,
  selectedFoodItems
};
