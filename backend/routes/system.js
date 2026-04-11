const express = require('express');
const si = require('systeminformation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get system overview
router.get('/overview', authenticateToken, async (req, res) => {
  try {
    const [cpu, mem, os, system, network, disk] = await Promise.all([
      si.cpu(),
      si.mem(),
      si.osInfo(),
      si.system(),
      si.networkInterfaces(),
      si.fsSize()
    ]);

    const systemInfo = {
      timestamp: new Date(),
      cpu: {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        cores: cpu.cores,
        physicalCores: cpu.physicalCores,
        speed: cpu.speed,
        usage: await si.currentLoad().then(load => load.currentLoad)
      },
      memory: {
        total: mem.total,
        used: mem.used,
        free: mem.free,
        usage: ((mem.used / mem.total) * 100).toFixed(2)
      },
      os: {
        platform: os.platform,
        distro: os.distro,
        release: os.release,
        arch: os.arch,
        hostname: os.hostname
      },
      system: {
        manufacturer: system.manufacturer,
        model: system.model,
        version: system.version
      },
      network: network.map(nic => ({
        iface: nic.iface,
        ip4: nic.ip4,
        mac: nic.mac,
        internal: nic.internal
      })),
      disk: disk.map(d => ({
        fs: d.fs,
        type: d.type,
        size: d.size,
        used: d.used,
        available: d.available,
        use: d.use,
        mount: d.mount
      }))
    };

    res.json(systemInfo);
  } catch (error) {
    console.error('System overview error:', error);
    res.status(500).json({ message: 'Failed to get system overview', error: error.message });
  }
});

// Get CPU information
router.get('/cpu', authenticateToken, async (req, res) => {
  try {
    const [cpu, load] = await Promise.all([
      si.cpu(),
      si.currentLoad()
    ]);

    const cpuInfo = {
      timestamp: new Date(),
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      cores: cpu.cores,
      physicalCores: cpu.physicalCores,
      speed: cpu.speed,
      speedMin: cpu.speedMin,
      speedMax: cpu.speedMax,
      currentLoad: load.currentLoad,
      loadUser: load.currentLoadUser,
      loadSystem: load.currentLoadSystem,
      loadIdle: load.currentLoadIdle
    };

    res.json(cpuInfo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get CPU info', error: error.message });
  }
});

// Get memory information
router.get('/memory', authenticateToken, async (req, res) => {
  try {
    const mem = await si.mem();

    const memoryInfo = {
      timestamp: new Date(),
      total: mem.total,
      free: mem.free,
      used: mem.used,
      active: mem.active,
      available: mem.available,
      buffers: mem.buffers,
      cached: mem.cached,
      slab: mem.slab,
      usage: ((mem.used / mem.total) * 100).toFixed(2)
    };

    res.json(memoryInfo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get memory info', error: error.message });
  }
});

// Get disk information
router.get('/disk', authenticateToken, async (req, res) => {
  try {
    const [disk, io] = await Promise.all([
      si.fsSize(),
      si.disksIO()
    ]);

    const diskInfo = {
      timestamp: new Date(),
      filesystems: disk.map(d => ({
        fs: d.fs,
        type: d.type,
        size: d.size,
        used: d.used,
        available: d.available,
        use: d.use,
        mount: d.mount
      })),
      io: io
    };

    res.json(diskInfo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get disk info', error: error.message });
  }
});

// Get network information
router.get('/network', authenticateToken, async (req, res) => {
  try {
    const [interfaces, stats, connections] = await Promise.all([
      si.networkInterfaces(),
      si.networkStats(),
      si.networkConnections()
    ]);

    const networkInfo = {
      timestamp: new Date(),
      interfaces: interfaces.map(iface => ({
        iface: iface.iface,
        ifaceName: iface.ifaceName,
        ip4: iface.ip4,
        ip6: iface.ip6,
        mac: iface.mac,
        internal: iface.internal,
        operstate: iface.operstate,
        type: iface.type,
        duplex: iface.duplex,
        mtu: iface.mtu,
        speed: iface.speed
      })),
      stats: stats,
      connections: connections.slice(0, 20) // Limit to first 20 connections
    };

    res.json(networkInfo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get network info', error: error.message });
  }
});

// Get process information
router.get('/processes', authenticateToken, async (req, res) => {
  try {
    const processes = await si.processes();

    const processInfo = {
      timestamp: new Date(),
      all: processes.all,
      running: processes.running,
      blocked: processes.blocked,
      sleeping: processes.sleeping,
      list: processes.list
        .sort((a, b) => b.cpu - a.cpu)
        .slice(0, 20) // Top 20 CPU-consuming processes
        .map(p => ({
          pid: p.pid,
          name: p.name,
          cpu: p.cpu,
          memory: p.mem,
          state: p.state,
          started: p.started,
          user: p.user
        }))
    };

    res.json(processInfo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get process info', error: error.message });
  }
});

// Get system health score
router.get('/health', authenticateToken, async (req, res) => {
  try {
    const [cpu, mem, disk, network] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats()
    ]);

    // Calculate health score based on various metrics
    const cpuHealth = Math.max(0, 100 - cpu.currentLoad);
    const memHealth = Math.max(0, 100 - ((mem.used / mem.total) * 100));
    const diskHealth = disk.reduce((acc, d) => acc + Math.max(0, 100 - d.use), 0) / disk.length;

    const overallHealth = ((cpuHealth + memHealth + diskHealth) / 3).toFixed(1);

    const healthInfo = {
      timestamp: new Date(),
      overall: parseFloat(overallHealth),
      components: {
        cpu: {
          score: parseFloat(cpuHealth.toFixed(1)),
          load: cpu.currentLoad
        },
        memory: {
          score: parseFloat(memHealth.toFixed(1)),
          usage: ((mem.used / mem.total) * 100).toFixed(1)
        },
        disk: {
          score: parseFloat(diskHealth.toFixed(1)),
          usage: (disk.reduce((acc, d) => acc + d.use, 0) / disk.length).toFixed(1)
        }
      },
      status: overallHealth >= 80 ? 'excellent' :
              overallHealth >= 60 ? 'good' :
              overallHealth >= 40 ? 'fair' : 'poor'
    };

    res.json(healthInfo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get health info', error: error.message });
  }
});

module.exports = router;