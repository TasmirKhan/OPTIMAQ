import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Database, FileText, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/resources', icon: Database, label: 'Resources' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">OPTIMAQ</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;