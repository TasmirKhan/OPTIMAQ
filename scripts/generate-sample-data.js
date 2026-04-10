#!/usr/bin/env node

// Sample Data Generator for OPTIMAQ
// Run with: node scripts/generate-sample-data.js

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../backend/models/User');
const Resource = require('../backend/models/Resource');
const Metric = require('../backend/models/Metric');

async function generateSampleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/optimaq');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Resource.deleteMany({});
    await Metric.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@optimaq.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'john@optimaq.com',
        password: 'password123',
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@optimaq.com',
        password: 'password123',
        role: 'user'
      }
    ]);
    console.log('Created sample users');

    // Create sample resources
    const resources = await Resource.create([
      {
        name: 'API Gateway',
        type: 'API',
        description: 'Main API gateway for the platform',
        status: 'active',
        tags: ['production', 'critical'],
        createdBy: users[0]._id
      },
      {
        name: 'PostgreSQL Database',
        type: 'Database',
        description: 'Primary database server',
        status: 'active',
        tags: ['production', 'database'],
        createdBy: users[0]._id
      },
      {
        name: 'Redis Cache',
        type: 'Service',
        description: 'Caching service for improved performance',
        status: 'active',
        tags: ['cache', 'performance'],
        createdBy: users[1]._id
      },
      {
        name: 'Load Balancer',
        type: 'Service',
        description: 'Distributes traffic across servers',
        status: 'maintenance',
        tags: ['networking', 'load-balancer'],
        createdBy: users[1]._id
      }
    ]);
    console.log('Created sample resources');

    // Generate sample metrics for the last 24 hours
    const metrics = [];
    const now = new Date();

    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);

      metrics.push(
        {
          type: 'cpu',
          value: Math.random() * 100,
          timestamp
        },
        {
          type: 'memory',
          value: Math.random() * 100,
          timestamp
        },
        {
          type: 'network',
          value: Math.random() * 10,
          timestamp
        },
        {
          type: 'users',
          value: Math.floor(Math.random() * 2000) + 1000,
          timestamp
        }
      );
    }

    await Metric.insertMany(metrics);
    console.log('Generated sample metrics');

    console.log('\n🎉 Sample data generated successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@optimaq.com / admin123');
    console.log('User: john@optimaq.com / password123');

  } catch (error) {
    console.error('Error generating sample data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

generateSampleData();