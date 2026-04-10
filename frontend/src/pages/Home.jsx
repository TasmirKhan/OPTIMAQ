import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">AI-Powered Resource Optimization</span>
          </h1>
          <p className="hero-subtitle">
            Maximize efficiency with intelligent resource allocation and real-time analytics
          </p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn-primary">
              <i className="fas fa-play"></i> Start Optimization
            </Link>
            <a href="#features" className="btn-secondary">
              <i className="fas fa-info"></i> Learn More
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="floating-card" style={{ top: '20%', left: '10%', animationDelay: '0s' }}>
              <i className="fas fa-server"></i>
              <span>Resources</span>
            </div>
            <div className="floating-card" style={{ top: '60%', right: '15%', animationDelay: '1s' }}>
              <i className="fas fa-brain"></i>
              <span>AI Engine</span>
            </div>
            <div className="floating-card" style={{ bottom: '20%', left: '20%', animationDelay: '2s' }}>
              <i className="fas fa-chart-line"></i>
              <span>Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '80px 30px', background: 'var(--light-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
            Powerful Features
          </h2>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#6b7280', marginBottom: '60px' }}>
            Everything you need for intelligent resource optimization
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="feature-card" style={{ textAlign: 'center', padding: '30px', background: 'var(--light-card)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--primary-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '2rem' }}>
                <i className="fas fa-brain"></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px' }}>AI Optimization</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Machine learning algorithms analyze your resource usage patterns and provide intelligent optimization recommendations.
              </p>
            </div>

            <div className="feature-card" style={{ textAlign: 'center', padding: '30px', background: 'var(--light-card)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--success-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '2rem' }}>
                <i className="fas fa-tachometer-alt"></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px' }}>Real-time Monitoring</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Live dashboards with real-time metrics, alerts, and performance monitoring across all your resources.
              </p>
            </div>

            <div className="feature-card" style={{ textAlign: 'center', padding: '30px', background: 'var(--light-card)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--warning-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '2rem' }}>
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px' }}>Advanced Analytics</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Comprehensive analytics with interactive charts, trend analysis, and predictive insights for better decision making.
              </p>
            </div>

            <div className="feature-card" style={{ textAlign: 'center', padding: '30px', background: 'var(--light-card)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--secondary-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '2rem' }}>
                <i className="fas fa-server"></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px' }}>Resource Management</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Complete CRUD operations for managing your resources, with tagging, categorization, and status tracking.
              </p>
            </div>

            <div className="feature-card" style={{ textAlign: 'center', padding: '30px', background: 'var(--light-card)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--danger-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '2rem' }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px' }}>Secure & Scalable</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Enterprise-grade security with JWT authentication, role-based access control, and scalable architecture.
              </p>
            </div>

            <div className="feature-card" style={{ textAlign: 'center', padding: '30px', background: 'var(--light-card)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #8b5cf6, #a855f7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '2rem' }}>
                <i className="fas fa-file-export"></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px' }}>Data Import & Export</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Easy data import from various formats and export capabilities for reports and analytics data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 30px', background: 'var(--primary-gradient)', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
            Ready to Optimize?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: '0.9' }}>
            Join thousands of organizations already using OPTIMAQ for intelligent resource optimization.
          </p>
          <Link to="/dashboard" className="btn-primary" style={{ background: 'white', color: '#6366f1', border: 'none' }}>
            <i className="fas fa-rocket"></i> Get Started Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;