const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  image: String,
  descricao: String,
  date: {
    type: Date,
    default: new Date
  },
  userID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('Post', postSchema)