const Controller = require("./controler");
const Posts = require("../models/posts");
module.exports = new (class postsController extends Controller {
  async getAllPosts(req, res, next) {
    try {
      let posts = await Posts.find({}).populate('userId', '-password' ,);
      res.status(200).json({
        data: posts,
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async getOnePost(req, res, next) {
    try {
      let post = await Posts.find({ _id: req.params.id }).populate('userId', '-password');
      res.status(200).json({
        data: post,
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async createNewPost(req, res, next) {
    try {
      let newPost = new Posts({
        title: req.body.title,
        body: req.body.body,
        userId : req.body.userId
      });
      await newPost.save();
      res.status(200).json({
        data: "پست جدید با موفقیت ساخته شد",
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
})();
