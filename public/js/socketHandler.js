import store from "./store.js"
import ui from "./ui.js"

let socket = null;

const connectToSocketIoServer = () => {
  socket = io("/");
  socket.on("connect", () => {
    // Listening for the "connect" event
    console.log("connected", socket.id); // Logging the socket ID to the console
    store.setSocketId(socket.id);

      socket.on("input-value", (data) => {
        console.log(data.meals)
      ui.appendServerData(data)
    });
  });
};

const sendMessages = (data) => {
  socket.emit("input-value", data);
};

export default {
  connectToSocketIoServer,
  sendMessages,
};
