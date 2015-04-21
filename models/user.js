var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
  
  /*email: {
    type: String,
    required: true,
    unique: true
  }*/

});

module.exports = mongoose.model('User', userSchema);
