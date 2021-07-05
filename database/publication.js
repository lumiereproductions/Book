const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String],
});

const PublicationModel = mongoose.Model(PublicationSchema);

module.exports = PublicationModel;
