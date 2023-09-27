const mongoose = require("mongoose");

const UserActivitySchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ActivityID: { type: mongoose.Schema.Types.ObjectId, ref: "Activity", required: true },
  status: { type: Boolean, required: true },
  score: { type: Number },
  completedTime: { type: Date },
});

UserActivitySchema.index({ UserID: 1, ActivityID: 1 }, { unique: true });

module.exports = mongoose.model("UserActivity", UserActivitySchema);
