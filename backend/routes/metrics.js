const express = require('express');
const Metric = require('../models/Metric');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all metrics
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { type, limit = 100 } = req.query;

    let query = {};
    if (type) {
      query.type = type;
    }

    const metrics = await Metric.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    // Group by type for frontend
    const groupedMetrics = metrics.reduce((acc, metric) => {
      if (!acc[metric.type]) {
        acc[metric.type] = [];
      }
      acc[metric.type].push({
        time: metric.timestamp.toISOString(),
        usage: metric.value
      });
      return acc;
    }, {});

    res.json(groupedMetrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create metric (for simulation or data ingestion)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, value, metadata } = req.body;

    const metric = new Metric({
      type,
      value,
      metadata
    });

    await metric.save();
    res.status(201).json(metric);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Simulate real-time metrics
router.post('/simulate', authenticateToken, async (req, res) => {
  try {
    const metrics = [
      { type: 'cpu', value: Math.random() * 100 },
      { type: 'memory', value: Math.random() * 100 },
      { type: 'network', value: Math.random() * 10 },
      { type: 'users', value: Math.floor(Math.random() * 2000) + 1000 }
    ];

    const savedMetrics = await Metric.insertMany(metrics);
    res.json(savedMetrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;