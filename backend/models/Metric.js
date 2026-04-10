const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['cpu', 'memory', 'network', 'users']
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
});

// Index for efficient querying
metricSchema.index({ type: 1, timestamp: -1 });

module.exports = mongoose.model('Metric', metricSchema);