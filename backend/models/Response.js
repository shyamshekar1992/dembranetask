const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  linkId: String,
  responses: Object,
});

module.exports = mongoose.model("Response", ResponseSchema);
