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
    httpOnly: false
  },
});
module.exports = sessionMiddleWare;
