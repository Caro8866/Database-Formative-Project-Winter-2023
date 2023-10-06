const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  topicID: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true }, // Type of the activity (e.g., Quiz, Reading)
  content: { type: String }, // The content of the activity (e.g., quiz questions, reading text)
});

module.exports = mongoose.model("Activity", activitySchema);
