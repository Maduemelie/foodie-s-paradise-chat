const express = require("express");
const connectToDb = require("./config/mongoDb");
const session = require("express-session");
const cors = require("cors");

const mongoDbStore = require("connect-mongodb-session")(session);
const mealRouter = require("./routes/mealPlanRoutes");
const foodRouter = require("./routes/foodRoutes");
const orderRouter = require("./routes/orderRouter");
const { generateUserId } = require("./utils/userId");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 4000;

const store = new mongoDbStore({
  uri: "mongodb://localhost:27017/FoodiesParadise",
  collection: "sessions",
});

const options = {
  secret: process.env.MY_SESSION_SECERT,
  store,
  name: "Foodies Paradise",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 86400000,
    sameSite: true,
  },
};

app.use(cors());
app.use(session(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/api/v1/mealplan", mealRouter);
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/order", orderRouter);

app.get("/Foodie's_Paradise", (req, res) => {
  let userId = generateUserId(); // function to generate a unique user ID
  req.session.userId = userId
  res.sendFile(__dirname + "/public/index.html");
});

connectToDb();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
