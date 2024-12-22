const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  linkId: String,
  questions: Array,
});

module.exports = mongoose.model("Question", QuestionSchema);
