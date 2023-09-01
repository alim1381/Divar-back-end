const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUser = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
});

module.exports = mongoose.model("user", newUser, "user");
