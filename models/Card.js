const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    match: /https?:\/\/(www.)?([\w\-]+\.{0,1}){1,32}\.[a-z]{2,}(?=\/)[\w\-\._~:\/\?#\[\]@!$&\'()\*+,;=]+#?$/, // eslint-disable-line 
  },
  owner: {
    ref: 'user',
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', CardSchema);
