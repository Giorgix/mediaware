var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  local: {
    email: { 
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    }
  }, 
  /*email: {
    type: String,
    required: true,
    unique: true
  }*/

});


userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
