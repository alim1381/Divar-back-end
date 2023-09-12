const Controller = require("./controler");
const Posts = require("../models/posts");
module.exports = new (class postsController extends Controller {
  async getAllPosts(req, res, next) {
    try {
      let posts = await Posts.find({}).populate("userId", "-password");
      posts.reverse()
      const postArray = [];
      let currentArray = [];
      posts.map((post, index) => {
        if (currentArray.length < 12 && index !== posts.length - 1) {
          currentArray.push(post);
        } else {
          if (index === posts.length - 1) {
            currentArray.push(post);
          }
          postArray.push(currentArray);
          currentArray = [];
        }
      });

      setTimeout(() => {
        res.status(200).json({
          data: req.query.page
            ? postArray[req.query.page - 1] || []
            : postArray[0],
          success: true,
        });
      }, 3000);
    } catch (err) {
      next(err);
    }
  }

  async getOnePost(req, res, next) {
    try {
      let post = await Posts.find({ _id: req.params.id }).populate(
        "userId",
        "-password"
      );
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
        userId: req.body.userId,
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
  async deletePost(req, res, next) {
    try {
      let post = await Posts.findOne({ _id: req.body.requestId }).populate(
        "userId"
      );
      if (req.body.userId === post.userId.id) {
        await Posts.findOneAndRemove({ _id: req.body.requestId });
        res.json({
          success: true,
          message: "پست با موفقیت پاک شد",
        });
      } else {
        res.json({
          success: false,
          message: "فقط نویسنده پست میتواند آن را پاک کند",
        });
      }
    } catch (err) {
      next(err);
    }
  }
})();
