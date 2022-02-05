const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String, required: true, minlength: 2, maxlength: 30,
  },
  about: {
    type: String, required: true, minlength: 2, maxlength: 30,
  },
  avatar: {
    type: String, required: true,
  },
});

module.exports = model('user', UserSchema);
