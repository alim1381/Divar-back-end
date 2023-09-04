const Controller = require("./controler");
const User = require("../models/users");
const Posts = require('../models/posts')
module.exports = new (class UsersController extends Controller {
  async getAllUsers(req, res, next) {
    try {
      let users = await User.find({}).select('-password');
      res.status(200).json({
        users,
      });
    } catch (err) {
      next(err);
    }
  }

  async getOneUser(req, res, next) {
    try {
      let user = await User.findOne({_id : req.params.id}).select('-password');
      let posts = await Posts.find({userId : req.params.id})
      res.status(200).json({
        user,
        posts : posts
      });
    } catch (err) {
      next(err);
    }
  }
})();
