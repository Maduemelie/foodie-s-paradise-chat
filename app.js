const express = require("express");
const { checkMessageContent } = require("./controllers/botResponse");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
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

  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000,
  },
});
// app.use(cors());
app.use(sessionMiddleWare);
io.engine.use(sessionMiddleWare);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
    if (clientSideData) {
      if (sessionData.selectedFoods) {
        socket.emit("input-value", {
          message: "You already have selected foods.",
        });
      } else {
        socket.emit("input-value", clientSideData);
      }
    }
  });

  socket.on("selection", async (data) => {
    socket.request.session.selectedFoods = data;
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
