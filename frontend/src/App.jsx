import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import store from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Analytics from './pages/Analytics';
import ImportData from './pages/ImportData';
import About from './pages/About';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

function AppContent() {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/resources" element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/import-data" element={
          <ProtectedRoute>
            <ImportData />
          </ProtectedRoute>
        } />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;