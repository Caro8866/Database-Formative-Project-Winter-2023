const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  topicID: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
});

module.exports = mongoose.model("User", userSchema);
