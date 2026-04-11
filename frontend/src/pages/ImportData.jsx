import { useState, useRef } from 'react';

const ImportData = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [importType, setImportType] = useState('resources');
  const [isDragging, setIsDragging] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const fileInputRef = useRef(null);

  const importTypes = [
    { value: 'resources', label: 'Resource Data', icon: 'fas fa-server', description: 'Import hospital resources, equipment, and capacity data' },
    { value: 'metrics', label: 'Performance Metrics', icon: 'fas fa-chart-line', description: 'Import system performance and utilization metrics' },
    { value: 'tasks', label: 'Task Data', icon: 'fas fa-tasks', description: 'Import optimization tasks and scheduling data' },
    { value: 'historical', label: 'Historical Data', icon: 'fas fa-history', description: 'Import historical performance and optimization data' },
  ];

  const handleFileSelect = (file) => {
    if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
      setSelectedFile(file);
      setValidationErrors([]);
      setImportStatus('');

      // Preview JSON data
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setPreviewData(data);
        } catch (error) {
          setValidationErrors(['Invalid JSON format']);
        }
      };
      reader.readAsText(file);
    } else {
      setValidationErrors(['Please select a valid JSON file']);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setImportProgress(0);
    setImportStatus('Validating data...');

    // Simulate validation progress
    const validationInterval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 30) {
          clearInterval(validationInterval);
          setImportStatus('Processing data...');
          return 30;
        }
        return prev + 5;
      });
    }, 200);

    // Simulate processing
    setTimeout(() => {
      setImportProgress(60);
      setImportStatus('Importing to database...');

      setTimeout(() => {
        setImportProgress(100);
        setImportStatus('Import completed successfully!');
        setTimeout(() => {
          setImportStatus('');
          setImportProgress(0);
          setSelectedFile(null);
          setPreviewData(null);
        }, 2000);
      }, 1000);
    }, 1000);
  };

  const downloadSampleData = (type) => {
    const sampleData = {
      resources: {
        resources: [
          {
            id: "res_001",
            name: "Emergency Room Bed",
            type: "bed",
            capacity: 50,
            currentUsage: 32,
            location: "Emergency Department",
            status: "active",
            priority: "high",
            tags: ["emergency", "critical"]
          }
        ]
      },
      metrics: {
        metrics: [
          {
            timestamp: "2024-01-15T10:00:00Z",
            resourceId: "res_001",
            utilization: 85.5,
            responseTime: 245,
            throughput: 1250,
            efficiency: 92.3
          }
        ]
      },
      tasks: {
        tasks: [
          {
            id: "task_001",
            title: "Optimize ER Resource Allocation",
            description: "Balance emergency room bed utilization across peak hours",
            priority: "high",
            status: "pending",
            estimatedDuration: 120,
            dependencies: []
          }
        ]
      },
      historical: {
        historicalData: [
          {
            date: "2024-01-01",
            totalResources: 150,
            averageUtilization: 78.5,
            peakUtilization: 95.2,
            optimizationSavings: 45000
          }
        ]
      }
    };

    const dataStr = JSON.stringify(sampleData[type], null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `optimaq_${type}_sample.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1><i className="fas fa-upload"></i> Data Import Center</h1>
        <div className="header-info">
          <p>Import and manage your optimization data with ease</p>
        </div>
      </div>

      {/* Import Type Selection */}
      <div className="chart-card" style={{ marginBottom: '30px' }}>
        <h3><i className="fas fa-list"></i> Select Import Type</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {importTypes.map((type) => (
            <div
              key={type.value}
              onClick={() => setImportType(type.value)}
              style={{
                padding: '20px',
                border: `2px solid ${importType === type.value ? '#6366f1' : '#e5e7eb'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                background: importType === type.value ? 'rgba(99, 102, 241, 0.05)' : 'white',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
            >
              <i className={type.icon} style={{ fontSize: '2rem', color: importType === type.value ? '#6366f1' : '#6b7280', marginBottom: '10px' }}></i>
              <h4 style={{ margin: '10px 0', color: importType === type.value ? '#6366f1' : '#374151' }}>{type.label}</h4>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* File Upload Area */}
      <div className="chart-card" style={{ marginBottom: '30px' }}>
        <h3><i className="fas fa-file-upload"></i> Upload Data File</h3>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? '#6b7280' : '#d1d5db'}`,
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragging ? 'rgba(107, 114, 128, 0.05)' : '#f9fafb',
            transition: 'all 0.3s ease',
            marginTop: '20px'
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            style={{ display: 'none' }}
          />

          {selectedFile ? (
            <div>
              <i className="fas fa-file-alt" style={{ fontSize: '3rem', color: '#10b981', marginBottom: '15px' }}></i>
              <h4 style={{ color: '#10b981', margin: '10px 0' }}>File Selected</h4>
              <p style={{ color: '#374151', fontWeight: '500' }}>{selectedFile.name}</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div>
              <i className="fas fa-cloud-upload-alt" style={{ fontSize: '3rem', color: '#6b7280', marginBottom: '15px' }}></i>
              <h4 style={{ color: '#374151', margin: '10px 0' }}>Drop JSON file here or click to browse</h4>
              <p style={{ color: '#6b7280' }}>
                Supports JSON format files containing {importTypes.find(t => t.value === importType)?.label.toLowerCase()}
              </p>
            </div>
          )}
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
            <h4 style={{ color: '#dc2626', margin: '0 0 10px 0' }}>
              <i className="fas fa-exclamation-triangle"></i> Validation Errors
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#dc2626' }}>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Data Preview */}
      {previewData && (
        <div className="chart-card" style={{ marginBottom: '30px' }}>
          <h3><i className="fas fa-eye"></i> Data Preview</h3>
          <div style={{ marginTop: '20px', maxHeight: '300px', overflow: 'auto', background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <pre style={{ margin: 0, fontSize: '0.85rem', color: '#374151' }}>
              {JSON.stringify(previewData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Import Progress */}
      {importProgress > 0 && (
        <div className="chart-card" style={{ marginBottom: '30px' }}>
          <h3><i className="fas fa-spinner fa-spin"></i> Import Progress</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{importStatus}</span>
              <span>{importProgress}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${importProgress}%`,
                  height: '100%',
                  background: 'var(--primary-gradient)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px' }}>
        <button
          className="btn-primary"
          onClick={handleImport}
          disabled={!selectedFile || validationErrors.length > 0}
          style={{ opacity: (!selectedFile || validationErrors.length > 0) ? 0.5 : 1 }}
        >
          <i className="fas fa-upload"></i> Start Import
        </button>
        <button
          className="btn-secondary"
          onClick={() => downloadSampleData(importType)}
        >
          <i className="fas fa-download"></i> Download Sample
        </button>
      </div>

      {/* Import Guidelines */}
      <div className="chart-card">
        <h3><i className="fas fa-info-circle"></i> Import Guidelines</h3>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', color: '#6366f1' }}>
                <i className="fas fa-file-code"></i> File Format
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '5px 0' }}>✓ JSON format only</li>
                <li style={{ padding: '5px 0' }}>✓ Valid JSON structure</li>
                <li style={{ padding: '5px 0' }}>✓ Maximum 10MB file size</li>
                <li style={{ padding: '5px 0' }}>✓ UTF-8 encoding</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', color: '#10b981' }}>
                <i className="fas fa-check-circle"></i> Data Requirements
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '5px 0' }}>✓ Required fields present</li>
                <li style={{ padding: '5px 0' }}>✓ Data type validation</li>
                <li style={{ padding: '5px 0' }}>✓ Unique identifiers</li>
                <li style={{ padding: '5px 0' }}>✓ Consistent formatting</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', color: '#f59e0b' }}>
                <i className="fas fa-exclamation-triangle"></i> Best Practices
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '5px 0' }}>✓ Backup existing data</li>
                <li style={{ padding: '5px 0' }}>✓ Test with sample data first</li>
                <li style={{ padding: '5px 0' }}>✓ Validate data before import</li>
                <li style={{ padding: '5px 0' }}>✓ Check import logs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportData;