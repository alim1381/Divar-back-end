const express = require("express");
const UpdateController = require("../controllers/updateController");
const router = express.Router();
const uploadUserImage = require('../upload/uploadUserImage')

router.put("/user/image", uploadUserImage.single('image') , UpdateController.updateUserImage.bind(UpdateController) );

module.exports = router;
