const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const PrayerSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  style: {
    type: String,
  },
});
PrayerSchema.plugin(timestamps);

module.exports = mongoose.model('Prayer', PrayerSchema);
