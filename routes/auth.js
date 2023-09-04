const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const uploadUserImages = require('../upload/uploadUserImage')

router.post("/login", authController.loginUser.bind(authController));
router.post("/register", uploadUserImages.single('image') , authController.createUser.bind(authController));

module.exports = router;
