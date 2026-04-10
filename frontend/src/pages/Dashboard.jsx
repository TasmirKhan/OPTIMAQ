import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetrics } from '../features/metricsSlice';
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: metrics, loading } = useSelector((state) => state.metrics);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchMetrics());
      setTimeout(() => setIsLoading(false), 1000); // Simulate loading
    };
    loadData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div id="loader">
        <div className="spinner"></div>
        <p>Running AI Optimization...</p>
      </div>
    );
  }

  // Sample data for charts
  const cpuData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
      label: 'CPU Usage (%)',
      data: [45, 52, 48, 61, 55, 43],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
    }],
  };

  const memoryData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Memory Usage (GB)',
      data: [12, 15, 13, 18, 16, 14, 11],
      backgroundColor: '#10b981',
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1>OPTIMAQ Resource Optimizer</h1>
        <div className="header-info">
          <p>Version 2.0 | AI Resource Optimization Engine</p>
          <p>Dataset: <span id="currentDataset">Real-time Data</span> | Resources Loaded: <span id="loadedResources">5</span></p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <i className="fas fa-server"></i>
          </div>
          <div className="stat-content">
            <h3>5</h3>
            <p>Total Resources</p>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3>98.5%</h3>
            <p>System Uptime</p>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <i className="fas fa-brain"></i>
          </div>
          <div className="stat-content">
            <h3>85%</h3>
            <p>AI Confidence</p>
          </div>
        </div>

        <div className="stat-card stat-danger">
          <div className="stat-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-content">
            <h3>2</h3>
            <p>Active Alerts</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3><i className="fas fa-chart-line"></i> CPU Usage Trend</h3>
          <Line data={cpuData} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h3><i className="fas fa-memory"></i> Memory Usage</h3>
          <Bar data={memoryData} options={chartOptions} />
        </div>
      </div>

      {/* AI Insights */}
      <div className="ai-insights">
        <h3>
          <i className="fas fa-brain"></i>
          AI Optimization Insights
        </h3>
        <div className="insights-list">
          <div className="insight-item">
            <i className="fas fa-lightbulb"></i>
            <div>
              <strong>Resource Allocation:</strong> Consider redistributing 15% of CPU resources from Resource R3 to R1 for optimal performance.
            </div>
          </div>
          <div className="insight-item">
            <i className="fas fa-clock"></i>
            <div>
              <strong>Peak Hours:</strong> System performance peaks between 14:00-16:00. Schedule maintenance during off-peak hours (02:00-04:00).
            </div>
          </div>
          <div className="insight-item">
            <i className="fas fa-database"></i>
            <div>
              <strong>Memory Optimization:</strong> Database queries can be optimized by 25% with proper indexing on frequently accessed columns.
            </div>
          </div>
          <div className="insight-item">
            <i className="fas fa-network-wired"></i>
            <div>
              <strong>Network Efficiency:</strong> Implement caching for API endpoints to reduce network latency by approximately 30%.
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="chart-card">
        <h3><i className="fas fa-history"></i> Recent Activity</h3>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
              <i className="fas fa-plus-circle" style={{ color: '#10b981' }}></i>
              <div>
                <strong>New resource added:</strong> API Gateway Server
                <br />
                <small style={{ color: '#6b7280' }}>2 minutes ago</small>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
              <i className="fas fa-exclamation-triangle" style={{ color: '#f59e0b' }}></i>
              <div>
                <strong>Performance alert:</strong> CPU usage exceeded 80%
                <br />
                <small style={{ color: '#6b7280' }}>15 minutes ago</small>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
              <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
              <div>
                <strong>Optimization completed:</strong> Memory usage reduced by 12%
                <br />
                <small style={{ color: '#6b7280' }}>1 hour ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;