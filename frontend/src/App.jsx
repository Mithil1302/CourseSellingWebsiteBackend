import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'user' or 'admin'

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUserType && storedUser) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType);
    }
  }, []);

  const handleLogin = (userData, type, token) => {
    setUser(userData);
    setUserType(type);
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} userType={userType} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses user={user} userType={userType} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route 
              path="/admin-dashboard" 
              element={userType === 'admin' ? <AdminDashboard user={user} /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/user-dashboard" 
              element={userType === 'user' ? <UserDashboard user={user} /> : <Login onLogin={handleLogin} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
