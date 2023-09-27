// topic schema

const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Topic", TopicSchema);
