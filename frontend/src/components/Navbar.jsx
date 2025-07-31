import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, BookOpen, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ user, userType, onLogout }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <BookOpen className="brand-icon" />
            <span>CourseHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/courses" className="nav-link">Courses</Link>
            
            {user ? (
              <div className="user-menu">
                <div className="user-info">
                  <User className="user-icon" />
                  <span>{user.name}</span>
                </div>
                <div className="dropdown">
                  <div className="dropdown-content">
                    {userType === 'admin' && (
                      <Link to="/admin-dashboard" className="dropdown-item">
                        <Settings size={16} />
                        Admin Dashboard
                      </Link>
                    )}
                    {userType === 'user' && (
                      <Link to="/user-dashboard" className="dropdown-item">
                        <User size={16} />
                        My Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/courses" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Courses
            </Link>
            
            {user ? (
              <>
                <div className="mobile-user-info">
                  <User className="user-icon" />
                  <span>{user.name}</span>
                </div>
                {userType === 'admin' && (
                  <Link to="/admin-dashboard" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                    <Settings size={16} />
                    Admin Dashboard
                  </Link>
                )}
                {userType === 'user' && (
                  <Link to="/user-dashboard" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                    <User size={16} />
                    My Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="mobile-nav-link logout-btn">
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="btn btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;