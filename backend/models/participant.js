const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  participation: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Participant', participantSchema);
