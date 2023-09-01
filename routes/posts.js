const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const jwt = require("jsonwebtoken");
const verifyToken = require("../helper/verifyToken");

// get all
router.get("/", postsController.getAllPosts.bind(postsController));
router.get("/:id", postsController.getOnePost.bind(postsController));

router.use(verifyToken, (req, res, next) => {
  jwt.verify(req.token, "ali", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      next();
    }
  });
});

// create
router.post("/create", postsController.createNewPost.bind(postsController));

module.exports = router;
