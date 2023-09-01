const Controller = require("./controler");
const User = require("../models/users");
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
})();
