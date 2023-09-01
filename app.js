const express = require("express");
const app = express();
const config = require("./config");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require('cors');

mongoose
  .connect("mongodb://127.0.0.1:27017/divar")
  .then(() => console.log("Connected!"));

app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(cookieParser("aaaa"));
// app.use(
//   session({
//     secret: "fdgsdfgsdfgdfsh",
//     resave: true,
//     saveUninitialized: true,
//     // cookie: { expires: new Date(Date.now() + 1000 * 24 * 100) },
//   })
// );

app.use("/api", require("./routes/api"));

app.listen(config.port, () => {
  console.log("Im Online");
});
