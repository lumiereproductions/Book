const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String],
});

const PublicationModel = mongoose.Model("publications", PublicationSchema);

module.exports = PublicationModel;
