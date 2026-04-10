import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { Bell, User } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-sm text-gray-700 dark:text-gray-200">{user?.name || 'User'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;