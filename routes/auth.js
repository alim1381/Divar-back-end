const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginUser.bind(authController));
router.post("/register", authController.createUser.bind(authController));

module.exports = router;
