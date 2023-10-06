const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  _id: { type: String }, // Explicitly define _id as a String

  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  activityID: { type: mongoose.Schema.Types.ObjectId, ref: "Activity", required: true },
  status: { type: String, required: true }, // In Progress, Completed, Not Started
  score: { type: Number },
  completedTimestamp: { type: Date },
});

userActivitySchema.index({ userID: 1, activityID: 1 }, { unique: true });

module.exports = mongoose.model("UserActivity", userActivitySchema);
