const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: { type: String, required: true },
  lastActivityAt: { type: Date, required: true },
});

module.exports = mongoose.model('Activity', schema);
