const express = require("express");
const { checkMessageContent } = require("./controllers/botResponse");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const connectToDb = require("./config/mongoDb");

require("dotenv").config();
const PORT = process.env.PORT || 4000;
require("dotenv").config();
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);

const store = new mongoDbStore({
  uri: process.env.MONGOBD_URI,
  collection: "sessions",
});

const sessionMiddleWare = session({
  secret: process.env.MY_SESSION_SECERT,
  store,
  name: "Foodies Paradise",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 86400000,
    sameSite: "none",
    httpOnly: false,
  },
});
app.use(cors());
app.use(sessionMiddleWare);
io.engine.use(sessionMiddleWare);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.use("/api/v1/mealplan", mealRouter);
// app.use("/api/v1/food", foodRouter);
// app.use("/api/v1/order", orderRouter);

app.get("/Foodie's_Paradise", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("input-value", async (data) => {
    const { messageContent, author } = data;
    const sessionData = socket.request.session;
    sessionData.username = author;

    const clientSideData = await checkMessageContent(messageContent, socket);

    if (clientSideData.type === "input-value") {
      socket.emit("input-value", clientSideData.data);
    } else if (clientSideData.type === "optionsData") {
      socket.emit("optionsData", clientSideData.data);
    }
  });
});

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});
connectToDb();

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
