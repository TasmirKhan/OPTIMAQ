import { useState } from 'react';
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

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Sample analytics data
  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [65, 72, 68, 85, 78, 62, 58],
        borderColor: '#374151',
        backgroundColor: 'rgba(55, 65, 81, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Memory Usage (%)',
        data: [45, 52, 48, 61, 55, 43, 38],
        borderColor: '#4b5563',
        backgroundColor: 'rgba(75, 85, 99, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const resourceUtilizationData = {
    labels: ['API Gateway', 'Database', 'Cache', 'Load Balancer', 'CDN'],
    datasets: [{
      label: 'Utilization (%)',
      data: [85, 72, 45, 68, 92],
      backgroundColor: [
        '#374151',
        '#4b5563',
        '#6b7280',
        '#9ca3af',
        '#d1d5db',
      ],
    }],
  };

  const optimizationImpactData = {
    labels: ['Before Optimization', 'After Optimization'],
    datasets: [
      {
        label: 'Response Time (ms)',
        data: [245, 156],
        backgroundColor: '#6b7280',
      },
      {
        label: 'Throughput (req/s)',
        data: [1250, 1850],
        backgroundColor: '#374151',
      },
    ],
  };

  const aiConfidenceData = {
    labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'Efficiency'],
    datasets: [{
      label: 'AI Model Performance',
      data: [92, 88, 85, 86, 94],
      backgroundColor: 'rgba(55, 65, 81, 0.2)',
      borderColor: '#374151',
      borderWidth: 2,
      pointBackgroundColor: '#374151',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#374151',
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

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1><i className="fas fa-chart-line"></i> Advanced Analytics</h1>
        <div className="header-info">
          <p>Deep insights into system performance and optimization metrics</p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '5px' }}>
            Performance Analytics
          </h3>
          <p style={{ color: '#6b7280' }}>Real-time system monitoring and optimization insights</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['1d', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: timeRange === range ? 'var(--primary-gradient)' : '#f3f4f6',
                color: timeRange === range ? 'white' : '#374151',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        {/* Performance Trends */}
        <div className="chart-card">
          <h3><i className="fas fa-chart-area"></i> Performance Trends</h3>
          <Line data={performanceData} options={chartOptions} />
        </div>

        {/* Resource Utilization */}
        <div className="chart-card">
          <h3><i className="fas fa-pie-chart"></i> Resource Utilization</h3>
          <Doughnut data={resourceUtilizationData} options={doughnutOptions} />
        </div>

        {/* Optimization Impact */}
        <div className="chart-card">
          <h3><i className="fas fa-chart-bar"></i> Optimization Impact</h3>
          <Bar data={optimizationImpactData} options={chartOptions} />
        </div>

        {/* AI Model Performance */}
        <div className="chart-card">
          <h3><i className="fas fa-brain"></i> AI Model Performance</h3>
          <Radar data={aiConfidenceData} options={radarOptions} />
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          <div className="stat-content">
            <h3>94.2%</h3>
            <p>System Efficiency</p>
            <small style={{ color: '#10b981' }}>↑ 5.3% from last week</small>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>156ms</h3>
            <p>Avg Response Time</p>
            <small style={{ color: '#10b981' }}>↓ 36% optimization</small>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Active Alerts</p>
            <small style={{ color: '#f59e0b' }}>Requires attention</small>
          </div>
        </div>

        <div className="stat-card stat-danger">
          <div className="stat-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="stat-content">
            <h3>99.9%</h3>
            <p>Uptime</p>
            <small style={{ color: '#10b981' }}>Excellent reliability</small>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="chart-card">
        <h3><i className="fas fa-analytics"></i> Detailed Performance Analysis</h3>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', color: '#6366f1' }}>
                <i className="fas fa-server"></i> Resource Optimization
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>CPU Allocation:</strong> Optimized by 23% through intelligent load balancing
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>Memory Usage:</strong> Reduced by 18% with efficient caching strategies
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>Network I/O:</strong> Improved by 31% through request optimization
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', color: '#10b981' }}>
                <i className="fas fa-brain"></i> AI Insights
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>Prediction Accuracy:</strong> 94.2% for resource utilization forecasting
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>Anomaly Detection:</strong> Identified 12 potential issues before impact
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>Cost Savings:</strong> Projected $45K annual savings from optimizations
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', color: '#f59e0b' }}>
                <i className="fas fa-chart-pie"></i> Usage Patterns
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>Peak Hours:</strong> 14:00-16:00 (32% higher utilization)
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>Weekly Pattern:</strong> Monday-Wednesday shows 25% more activity
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <strong>Resource Demand:</strong> API calls peak during business hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>
          <i className="fas fa-download"></i> Export Analytics Report
        </h3>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-file-pdf"></i> PDF Report
          </button>
          <button className="btn-primary" style={{ background: 'var(--success-gradient)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-file-excel"></i> Excel Export
          </button>
          <button className="btn-primary" style={{ background: 'var(--warning-gradient)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-file-csv"></i> CSV Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;