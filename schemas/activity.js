const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const activitySchema = new mongoose.Schema({
  topicID: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true }, // Type of the activity (e.g., Quiz, Reading)
  content: { type: String }, // The content of the activity (e.g., quiz questions, reading text)
  resources: [resourceSchema], // Resources for the activity (e.g., links to websites)
});

module.exports = mongoose.model("Activity", activitySchema);
