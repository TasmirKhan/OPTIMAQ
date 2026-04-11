import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const navItems = [
    { path: '/', icon: 'fas fa-home', label: 'Home' },
    { path: '/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/resources', icon: 'fas fa-server', label: 'Resources' },
    { path: '/analytics', icon: 'fas fa-chart-line', label: 'Analytics' },
    { path: '/system-analysis', icon: 'fas fa-cogs', label: 'System' },
    { path: '/import-data', icon: 'fas fa-upload', label: 'Import' },
    { path: '/about', icon: 'fas fa-info-circle', label: 'About' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <i className="fas fa-cogs"></i>
          <span>OPTIMAQ</span>
        </div>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <i className={item.icon}></i> {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {token ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>
                Welcome, {user?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="nav-auth"
                style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-auth">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          )}
          <button className="darkBtn" onClick={toggleDarkMode}>
            <i className="fas fa-moon"></i> Dark Mode
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;