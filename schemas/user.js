// user schema

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  TopicID: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
});

module.exports = mongoose.model("User", UserSchema);
