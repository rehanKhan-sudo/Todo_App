const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true

});



module.exports = mongoose.model("Task",taskSchema);