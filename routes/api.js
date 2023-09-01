const express = require("express");
const router = express.Router();
const config = require("../config");
const jwt = require("jsonwebtoken");
const verifyToken = require("../helper/verifyToken");

router.use("/auth", require("./auth"));

router.use("/posts", require("./posts"));

router.use("/users", require("./users"));

router.use(verifyToken, (req, res, next) => {
  jwt.verify(req.token, "ali", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      next();
    }
  });
});

// errors
router.all("*", (req, res, next) => {
  try {
    let err = new Error("صفحه مورد نظر یافت نشد");
    err.status = 404;
    throw err;
  } catch (err) {
    next(err);
  }
});

// catch
router.use((err, req, res, next) => {
  const status = err.status || 500;
  const message =
    typeof err === "string" ? err : err.message || "اطلاعات یافت نشد";
  const stack = err.stack || "";

  if (config.debug) {
    res.status(status ? status : 500).json({
      message: message,
      stack: stack,
    });
  } else {
    res.status(status ? status : 500).json({
      message: message,
      status: status,
    });
  }
});

module.exports = router;
