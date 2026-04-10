import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources, createResource } from '../features/resourcesSlice';

const Resources = () => {
  const dispatch = useDispatch();
  const { data: resources, loading } = useSelector((state) => state.resources);
  const [showForm, setShowForm] = useState(false);
  const [newResource, setNewResource] = useState({
    name: '',
    type: 'API',
    description: '',
    tags: ''
  });

  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resourceData = {
      ...newResource,
      tags: newResource.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    await dispatch(createResource(resourceData));
    setNewResource({ name: '', type: 'API', description: '', tags: '' });
    setShowForm(false);
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'API': return 'fas fa-globe';
      case 'Database': return 'fas fa-database';
      case 'Service': return 'fas fa-server';
      default: return 'fas fa-cube';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'maintenance': return 'status-maintenance';
      default: return 'status-active';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1><i className="fas fa-server"></i> Resource Management</h1>
        <div className="header-info">
          <p>Manage your system resources and monitor their performance</p>
        </div>
      </div>

      {/* Action Bar */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '5px' }}>
            Total Resources: {resources.length}
          </h3>
          <p style={{ color: '#6b7280' }}>Active: {resources.filter(r => r.status === 'active').length}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <i className="fas fa-plus"></i> Add Resource
        </button>
      </div>

      {/* Add Resource Form */}
      {showForm && (
        <div className="form-container" style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>
            <i className="fas fa-plus-circle"></i> Add New Resource
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Resource Name *</label>
              <input
                type="text"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                placeholder="e.g., API Gateway, Database Server"
                required
              />
            </div>

            <div className="form-group">
              <label>Resource Type *</label>
              <select
                value={newResource.type}
                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                required
              >
                <option value="API">API</option>
                <option value="Database">Database</option>
                <option value="Service">Service</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                placeholder="Describe the resource and its purpose..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                value={newResource.tags}
                onChange={(e) => setNewResource({ ...newResource, tags: e.target.value })}
                placeholder="e.g., production, critical, api"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn-primary">
                <i className="fas fa-save"></i> Create Resource
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
                style={{ background: '#6b7280' }}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resources Grid */}
      <div className="resources-section">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
            <p>Loading resources...</p>
          </div>
        ) : resources.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--light-card)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)' }}>
            <i className="fas fa-server" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '20px' }}></i>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No Resources Found</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>Get started by adding your first resource to the system.</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              <i className="fas fa-plus"></i> Add Your First Resource
            </button>
          </div>
        ) : (
          <div className="resources-grid">
            {resources.map((resource) => (
              <div key={resource._id} className="resource-card">
                <div className="resource-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className={getResourceIcon(resource.type)} style={{ fontSize: '1.5rem', color: '#6366f1' }}></i>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '0' }}>{resource.name}</h4>
                      <span className={`resource-type ${resource.type.toLowerCase()}`}>
                        {resource.type}
                      </span>
                    </div>
                  </div>
                  <span className={`resource-status ${getStatusColor(resource.status)}`}>
                    {resource.status}
                  </span>
                </div>

                <p style={{ color: '#6b7280', marginBottom: '15px', lineHeight: '1.5' }}>
                  {resource.description || 'No description provided'}
                </p>

                {resource.tags && resource.tags.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {resource.tags.map((tag, index) => (
                        <span key={index} style={{
                          padding: '2px 8px',
                          background: 'rgba(99, 102, 241, 0.1)',
                          color: '#6366f1',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <small style={{ color: '#9ca3af' }}>
                    Created {new Date(resource.createdAt).toLocaleDateString()}
                  </small>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      background: '#f3f4f6',
                      color: '#374151',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      background: '#fee2e2',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;