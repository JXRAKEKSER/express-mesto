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
    match: /https?:\/\/(www)?[\w\-]+\.\w+[\w\-\._~:\/\?#\[\]@!$&\'()\*+,;=]+/, // eslint-disable-line no-useless-escape
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
