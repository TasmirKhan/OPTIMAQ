import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const SystemAnalysis = () => {
  const [systemData, setSystemData] = useState(null);
  const [cpuData, setCpuData] = useState(null);
  const [memoryData, setMemoryData] = useState(null);
  const [diskData, setDiskData] = useState(null);
  const [networkData, setNetworkData] = useState(null);
  const [processData, setProcessData] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchSystemData = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoints = [
        'overview', 'cpu', 'memory', 'disk', 'network', 'processes', 'health'
      ];

      const responses = await Promise.all(
        endpoints.map(endpoint =>
          fetch(`/api/system/${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then(res => res.json())
        )
      );

      setSystemData(responses[0]);
      setCpuData(responses[1]);
      setMemoryData(responses[2]);
      setDiskData(responses[3]);
      setNetworkData(responses[4]);
      setProcessData(responses[5]);
      setHealthData(responses[6]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching system data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchSystemData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getHealthColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getHealthStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: '#6b7280', marginBottom: '20px' }}></i>
          <h3>Analyzing Your System...</h3>
          <p>Collecting comprehensive system information</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-tachometer-alt' },
    { id: 'cpu', label: 'CPU', icon: 'fas fa-microchip' },
    { id: 'memory', label: 'Memory', icon: 'fas fa-memory' },
    { id: 'disk', label: 'Storage', icon: 'fas fa-hdd' },
    { id: 'network', label: 'Network', icon: 'fas fa-network-wired' },
    { id: 'processes', label: 'Processes', icon: 'fas fa-tasks' },
    { id: 'health', label: 'Health', icon: 'fas fa-heartbeat' }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1><i className="fas fa-cogs"></i> System Analysis</h1>
        <div className="header-info">
          <p>Comprehensive analysis of your device and system performance</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                background: activeTab === tab.id ? 'var(--primary-gradient)' : '#f3f4f6',
                color: activeTab === tab.id ? 'white' : '#374151',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && systemData && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            {/* System Info Card */}
            <div className="chart-card">
              <h3><i className="fas fa-info-circle"></i> System Information</h3>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div><strong>OS:</strong> {systemData.os.distro} {systemData.os.release}</div>
                  <div><strong>Platform:</strong> {systemData.os.platform}</div>
                  <div><strong>Architecture:</strong> {systemData.os.arch}</div>
                  <div><strong>Hostname:</strong> {systemData.os.hostname}</div>
                  <div><strong>CPU:</strong> {systemData.cpu.brand} ({systemData.cpu.cores} cores)</div>
                  <div><strong>Memory:</strong> {formatBytes(systemData.memory.total)}</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="chart-card">
              <h3><i className="fas fa-chart-bar"></i> Current Usage</h3>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>CPU Usage:</span>
                    <span style={{ fontWeight: 'bold', color: '#6366f1' }}>
                      {cpuData?.currentLoad?.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Memory Usage:</span>
                    <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                      {memoryData?.usage}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Disk Usage:</span>
                    <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>
                      {diskData?.filesystems?.[0]?.use?.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Network Interfaces */}
          <div className="chart-card">
            <h3><i className="fas fa-network-wired"></i> Network Interfaces</h3>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gap: '10px' }}>
                {networkData?.interfaces?.map((iface, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: '#f9fafb'
                  }}>
                    <div style={{ fontWeight: 'bold' }}>{iface.ifaceName} ({iface.iface})</div>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                      IP: {iface.ip4 || 'N/A'} | MAC: {iface.mac} | Status: {iface.operstate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CPU Tab */}
      {activeTab === 'cpu' && cpuData && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="chart-card">
              <h3><i className="fas fa-microchip"></i> CPU Information</h3>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div><strong>Manufacturer:</strong> {cpuData.manufacturer}</div>
                  <div><strong>Brand:</strong> {cpuData.brand}</div>
                  <div><strong>Cores:</strong> {cpuData.cores} ({cpuData.physicalCores} physical)</div>
                  <div><strong>Base Speed:</strong> {cpuData.speed} GHz</div>
                  <div><strong>Min/Max Speed:</strong> {cpuData.speedMin} - {cpuData.speedMax} GHz</div>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <h3><i className="fas fa-chart-pie"></i> CPU Load Distribution</h3>
              <Doughnut
                data={{
                  labels: ['User', 'System', 'Idle'],
                  datasets: [{
                    data: [
                      cpuData.loadUser || 0,
                      cpuData.loadSystem || 0,
                      cpuData.loadIdle || 0
                    ],
                    backgroundColor: ['#374151', '#6b7280', '#d1d5db']
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3><i className="fas fa-chart-line"></i> Current CPU Load</h3>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '10px'
              }}>
                {cpuData.currentLoad?.toFixed(1)}%
              </div>
              <div style={{ color: '#6b7280' }}>Current CPU Usage</div>
            </div>
          </div>
        </div>
      )}

      {/* Memory Tab */}
      {activeTab === 'memory' && memoryData && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="chart-card">
              <h3><i className="fas fa-memory"></i> Memory Usage</h3>
              <Bar
                data={{
                  labels: ['Total', 'Used', 'Free', 'Available'],
                  datasets: [{
                    label: 'Memory (GB)',
                    data: [
                      (memoryData.total / (1024**3)).toFixed(2),
                      (memoryData.used / (1024**3)).toFixed(2),
                      (memoryData.free / (1024**3)).toFixed(2),
                      (memoryData.available / (1024**3)).toFixed(2)
                    ],
                    backgroundColor: ['#374151', '#6b7280', '#9ca3af', '#d1d5db']
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' }
                  },
                  scales: {
                    y: { beginAtZero: true }
                  }
                }}
              />
            </div>

            <div className="chart-card">
              <h3><i className="fas fa-chart-pie"></i> Memory Distribution</h3>
              <Doughnut
                data={{
                  labels: ['Used', 'Free'],
                  datasets: [{
                    data: [memoryData.used, memoryData.free],
                    backgroundColor: ['#6b7280', '#9ca3af']
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3><i className="fas fa-info-circle"></i> Memory Details</h3>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#374151' }}>
                    {formatBytes(memoryData.total)}
                  </div>
                  <div style={{ color: '#6b7280' }}>Total Memory</div>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                    {formatBytes(memoryData.used)}
                  </div>
                  <div style={{ color: '#6b7280' }}>Used Memory</div>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                    {formatBytes(memoryData.free)}
                  </div>
                  <div style={{ color: '#6b7280' }}>Free Memory</div>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                    {memoryData.usage}%
                  </div>
                  <div style={{ color: '#6b7280' }}>Usage %</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disk Tab */}
      {activeTab === 'disk' && diskData && (
        <div>
          <div className="chart-card">
            <h3><i className="fas fa-hdd"></i> Disk Usage</h3>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gap: '20px' }}>
                {diskData.filesystems.map((fs, index) => (
                  <div key={index} style={{
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: '#f9fafb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>{fs.mount} ({fs.fs})</strong>
                      <span style={{ color: fs.use > 90 ? '#ef4444' : fs.use > 70 ? '#f59e0b' : '#10b981' }}>
                        {fs.use.toFixed(1)}% used
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '10px' }}>
                      <div style={{
                        width: `${fs.use}%`,
                        height: '100%',
                        background: fs.use > 90 ? '#ef4444' : fs.use > 70 ? '#f59e0b' : '#10b981',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.9rem', color: '#6b7280' }}>
                      <div>Total: {formatBytes(fs.size)}</div>
                      <div>Used: {formatBytes(fs.used)}</div>
                      <div>Free: {formatBytes(fs.available)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Network Tab */}
      {activeTab === 'network' && networkData && (
        <div>
          <div className="chart-card">
            <h3><i className="fas fa-network-wired"></i> Network Interfaces</h3>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gap: '15px' }}>
                {networkData.interfaces.map((iface, index) => (
                  <div key={index} style={{
                    padding: '15px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: '#f9fafb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <strong>{iface.ifaceName}</strong>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        background: iface.operstate === 'up' ? '#d1fae5' : '#fee2e2',
                        color: iface.operstate === 'up' ? '#065f46' : '#991b1b'
                      }}>
                        {iface.operstate}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.9rem' }}>
                      <div><strong>Interface:</strong> {iface.iface}</div>
                      <div><strong>IP Address:</strong> {iface.ip4 || 'N/A'}</div>
                      <div><strong>MAC Address:</strong> {iface.mac}</div>
                      <div><strong>Type:</strong> {iface.type}</div>
                      {iface.speed && <div><strong>Speed:</strong> {iface.speed} Mbps</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processes Tab */}
      {activeTab === 'processes' && processData && (
        <div className="chart-card">
          <h3><i className="fas fa-tasks"></i> Top Processes by CPU Usage</h3>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gap: '10px' }}>
              {processData.list.map((process, index) => (
                <div key={index} style={{
                  display: 'grid',
                  gridTemplateColumns: '50px 1fr 100px 100px 100px',
                  gap: '15px',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  background: '#f9fafb',
                  alignItems: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#374151' }}>#{index + 1}</div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{process.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>PID: {process.pid}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#6366f1' }}>{process.cpu.toFixed(1)}%</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>CPU</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#10b981' }}>{process.memory.toFixed(1)}%</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Memory</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{process.state}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Health Tab */}
      {activeTab === 'health' && healthData && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="chart-card">
              <h3><i className="fas fa-heartbeat"></i> System Health Score</h3>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  color: getHealthColor(healthData.overall),
                  marginBottom: '10px'
                }}>
                  {healthData.overall}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: getHealthColor(healthData.overall),
                  marginBottom: '10px'
                }}>
                  {getHealthStatus(healthData.overall)}
                </div>
                <div style={{ color: '#6b7280' }}>Overall System Health</div>
              </div>
            </div>

            <div className="chart-card">
              <h3><i className="fas fa-chart-radar"></i> Component Health</h3>
              <Radar
                data={{
                  labels: ['CPU', 'Memory', 'Disk'],
                  datasets: [{
                    label: 'Health Score',
                    data: [
                      healthData.components.cpu.score,
                      healthData.components.memory.score,
                      healthData.components.disk.score
                    ],
                    backgroundColor: 'rgba(55, 65, 81, 0.2)',
                    borderColor: '#374151',
                    borderWidth: 2
                  }]
                }}
                options={{
                  responsive: true,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3><i className="fas fa-clipboard-list"></i> Health Breakdown</h3>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div>
                    <strong>CPU Health</strong>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Current load: {healthData.components.cpu.load.toFixed(1)}%</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getHealthColor(healthData.components.cpu.score) }}>
                      {healthData.components.cpu.score}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Score</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div>
                    <strong>Memory Health</strong>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Usage: {healthData.components.memory.usage}%</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getHealthColor(healthData.components.memory.score) }}>
                      {healthData.components.memory.score}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Score</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div>
                    <strong>Disk Health</strong>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Average usage: {healthData.components.disk.usage}%</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getHealthColor(healthData.components.disk.score) }}>
                      {healthData.components.disk.score}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={fetchSystemData}
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <i className="fas fa-sync-alt"></i>
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SystemAnalysis;