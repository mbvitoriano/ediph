const mongoose = require('mongoose');

var resSchema = new mongoose.Schema({
  link: String,
  author: String,
  text: String
})

module.exports = mongoose.model('Response', resSchema)