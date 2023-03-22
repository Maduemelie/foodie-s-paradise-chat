const express = require("express");
const connectToDb = require("./config/mongoDb");
const cors = require("cors");
const sessionMiddleWare = require('./config/session')
const mealRouter = require("./routes/mealPlanRoutes");
const foodRouter = require("./routes/foodRoutes");
const orderRouter = require("./routes/orderRouter");
const { generateUserId } = require("./utils/userId");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(sessionMiddleWare);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/api/v1/mealplan", mealRouter);
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/order", orderRouter);

app.get("/Foodie's_Paradise", (req, res) => {
  // let userId = generateUserId(); // function to generate a unique user ID
  console.log(req.session.id)
  const userId = (req.sessionID)
  
  res.cookie('userId', userId); // set the userId cookie
  res.sendFile(__dirname + "/public/index.html");
});

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});
connectToDb();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
