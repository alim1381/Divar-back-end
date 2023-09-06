const Controller = require("./controler");
const User = require('../models/users')

module.exports = new class UpdateUser extends Controller {
    async updateUserImage (req , res , next) {
        try {
            if (req.file) {
                let newInfo = await User.updateOne({_id : req.body.id} , {$set : {image :  req.file.path.replace(/\\/g , '/').substring(6)}})
            
                res.json({
                    message : "تصویر یا موفقیت تغییر کرد",
                    success : true,
                })
            } else {
                res.json({
                    message : "فیلد image نباید خالی باشد",
                    success : false
                })
            }
        } catch (err) {
            next(err)
        }
    }
}