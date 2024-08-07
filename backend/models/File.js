const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filePath: { type: String, required: true },
  redactedPath: { type: String },
  ipfsHash: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', FileSchema);
