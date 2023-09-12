const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const verify = require('./verify/verify')


// get all
router.get("/", postsController.getAllPosts.bind(postsController));
router.get("/:id", postsController.getOnePost.bind(postsController));

router.use(verify);

router.delete('/',postsController.deletePost.bind(postsController))

// create
router.post("/create", postsController.createNewPost.bind(postsController));

module.exports = router;
