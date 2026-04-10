const express = require('express');
const Resource = require('../models/Resource');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all resources
router.get('/', authenticateToken, async (req, res) => {
  try {
    const resources = await Resource.find({ createdBy: req.user.userId })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single resource
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const resource = await Resource.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    }).populate('createdBy', 'name email');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create resource
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, type, description, tags } = req.body;

    const resource = new Resource({
      name,
      type,
      description,
      tags: tags || [],
      createdBy: req.user.userId
    });

    await resource.save();
    await resource.populate('createdBy', 'name email');

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update resource
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, type, description, tags, status } = req.body;

    const resource = await Resource.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      { name, type, description, tags, status, updatedAt: Date.now() },
      { new: true }
    ).populate('createdBy', 'name email');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete resource
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;