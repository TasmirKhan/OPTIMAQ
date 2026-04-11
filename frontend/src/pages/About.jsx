const About = () => {
  const features = [
    {
      icon: 'fas fa-brain',
      title: 'AI-Powered Optimization',
      description: 'Advanced machine learning algorithms analyze resource utilization patterns and predict optimal allocation strategies.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboards provide instant insights into system performance, resource usage, and optimization metrics.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Enterprise Security',
      description: 'Bank-grade security with encrypted data transmission, secure authentication, and compliance with healthcare standards.'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Automated Optimization',
      description: 'Intelligent automation reduces manual intervention while maximizing resource efficiency and cost savings.'
    },
    {
      icon: 'fas fa-plug',
      title: 'Seamless Integration',
      description: 'RESTful APIs and modern integration capabilities connect with existing hospital management systems.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Responsive',
      description: 'Access critical optimization data and insights from any device with our responsive web interface.'
    }
  ];

  const technologies = [
    { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
    { name: 'MongoDB', icon: 'fas fa-database', color: '#47a248' },
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed' },
    { name: 'Chart.js', icon: 'fas fa-chart-bar', color: '#ff6384' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Officer',
      bio: 'PhD in Machine Learning, 10+ years in healthcare optimization',
      image: '👩‍⚕️'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Lead Developer',
      bio: 'Full-stack architect with expertise in scalable healthcare systems',
      image: '👨‍💻'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Medical Director',
      bio: 'MD with specialization in hospital administration and resource management',
      image: '👩‍🔬'
    },
    {
      name: 'David Kim',
      role: 'Data Scientist',
      bio: 'Expert in predictive analytics and healthcare data modeling',
      image: '👨‍🔬'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1><i className="fas fa-info-circle"></i> About OPTIMAQ</h1>
        <div className="header-info">
          <p>Revolutionizing healthcare resource optimization through AI and data-driven insights</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="chart-card" style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '20px', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Our Mission
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#4b5563', maxWidth: '800px', margin: '0 auto' }}>
          To transform healthcare resource management by leveraging artificial intelligence and advanced analytics,
          ensuring optimal resource utilization, reducing operational costs, and improving patient care outcomes
          across healthcare facilities worldwide.
        </p>
      </div>

      {/* Key Features */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#1f2937' }}>
          <i className="fas fa-star"></i> Key Features
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {features.map((feature, index) => (
            <div key={index} className="chart-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', color: '#6366f1', marginBottom: '20px' }}>
                <i className={feature.icon}></i>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="chart-card" style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', textAlign: 'center', marginBottom: '30px', color: '#1f2937' }}>
          <i className="fas fa-code"></i> Technology Stack
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', textAlign: 'center' }}>
          {technologies.map((tech, index) => (
            <div key={index} style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e5e7eb' }}>
              <i className={tech.icon} style={{ fontSize: '2.5rem', color: tech.color, marginBottom: '10px' }}></i>
              <h4 style={{ fontWeight: '600', color: '#374151', margin: '10px 0' }}>{tech.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Statistics */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#1f2937' }}>
          <i className="fas fa-chart-pie"></i> Our Impact
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div className="stat-card stat-primary" style={{ textAlign: 'center' }}>
            <div className="stat-icon">
              <i className="fas fa-hospital"></i>
            </div>
            <div className="stat-content">
              <h3>500+</h3>
              <p>Healthcare Facilities</p>
              <small>Partnered with leading hospitals worldwide</small>
            </div>
          </div>

          <div className="stat-card stat-success" style={{ textAlign: 'center' }}>
            <div className="stat-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-content">
              <h3>$2.5M</h3>
              <p>Cost Savings</p>
              <small>Average annual savings per facility</small>
            </div>
          </div>

          <div className="stat-card stat-warning" style={{ textAlign: 'center' }}>
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <h3>35%</h3>
              <p>Efficiency Increase</p>
              <small>Resource utilization improvement</small>
            </div>
          </div>

          <div className="stat-card stat-danger" style={{ textAlign: 'center' }}>
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3>10K+</h3>
              <p>Patients Benefited</p>
              <small>Improved care through optimization</small>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="chart-card" style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', textAlign: 'center', marginBottom: '30px', color: '#1f2937' }}>
          <i className="fas fa-users"></i> Our Team
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {team.map((member, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{member.image}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '5px', color: '#1f2937' }}>
                {member.name}
              </h3>
              <p style={{ color: '#6366f1', fontWeight: '500', marginBottom: '10px' }}>{member.role}</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="chart-card">
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', textAlign: 'center', marginBottom: '30px', color: '#1f2937' }}>
          <i className="fas fa-envelope"></i> Get In Touch
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-map-marker-alt" style={{ fontSize: '2rem', color: '#6366f1', marginBottom: '15px' }}></i>
            <h4 style={{ fontWeight: '600', marginBottom: '10px' }}>Address</h4>
            <p style={{ color: '#6b7280' }}>
              123 Innovation Drive<br />
              Healthcare Valley, CA 94043<br />
              United States
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-phone" style={{ fontSize: '2rem', color: '#10b981', marginBottom: '15px' }}></i>
            <h4 style={{ fontWeight: '600', marginBottom: '10px' }}>Phone</h4>
            <p style={{ color: '#6b7280' }}>
              +1 (555) 123-4567<br />
              Mon-Fri 9AM-6PM PST
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-envelope" style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '15px' }}></i>
            <h4 style={{ fontWeight: '600', marginBottom: '10px' }}>Email</h4>
            <p style={{ color: '#6b7280' }}>
              info@optimaq.ai<br />
              support@optimaq.ai
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>
            Ready to Optimize Your Healthcare Resources?
          </h3>
          <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
            <i className="fas fa-rocket"></i> Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;