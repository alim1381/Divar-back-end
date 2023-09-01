const Controller = require("./controler");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");

module.exports = new (class authController extends Controller {
  async createUser(req, res, next) {
    try {
      let userValid = await User.findOne({ username: req.body.username });
      if (userValid) {
        res.status(400).json({
          message: "حساب دیگری با این نام کاربری موجود میباشد",
          success: false,
        });
      } else {
        let newUser = new User({
          username: req.body.username,
          name: req.body.name ? req.body.name : "",
          password: bcrypt.hashSync(req.body.password, salt),
        });
        await newUser.save();

        jwt.sign({newUser} , "ali" , {  expiresIn : '1h'  } ,(err , token)=> {
          res.status(200).json({
            message: "کاربر با موفقیت ثبت شد",
            success: true,
            token : token
          });
        } )
      }
    } catch (err) {
      next(err);
    }
  }
  async loginUser(req, res, next) {
    try {
      let user = await User.findOne({ username: req.body.username });
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          jwt.sign({ user }, "ali", {  expiresIn : '1h'  } ,(err, token) => {
            res.json({
              id : user.id,
              name: user.name,
              username: user.username,
              token: token,
            });
          });
        } else {
          res.status(400).json({
            message: "پسورد وارد شده صحیح نمی باشد",
            success: false,
          });
        }
      } else {
        res.status(400).json({
          message: "حسابی با این نام کاربری پیدا نشد",
          success: false,
        });
      }
    } catch (err) {
      next(err);
    }
  }
})();
