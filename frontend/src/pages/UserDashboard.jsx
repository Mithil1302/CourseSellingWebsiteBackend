import { useState, useEffect } from 'react';
import { BookOpen, User, Award, Calendar } from 'lucide-react';
import { courseAPI, handleAPIError } from '../utils/api';

const UserDashboard = ({ user }) => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserCourses();
  }, []);

  const fetchUserCourses = async () => {
    try {
      const response = await courseAPI.getUserCourses();
      setPurchasedCourses(response.courses || []);
    } catch (error) {
      const errorResult = handleAPIError(error);
      setError(errorResult.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-icon">
              <BookOpen className="icon" />
            </div>
            <div className="stat-content">
              <h3>{purchasedCourses.length}</h3>
              <p>Enrolled Courses</p>
            </div>
          </div>
          
          <div className="stat-card card">
            <div className="stat-icon">
              <Award className="icon" />
            </div>
            <div className="stat-content">
              <h3>{purchasedCourses.length}</h3>
              <p>Certificates</p>
            </div>
          </div>
          
          <div className="stat-card card">
            <div className="stat-icon">
              <Calendar className="icon" />
            </div>
            <div className="stat-content">
              <h3>30</h3>
              <p>Days Streak</p>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {/* User Profile */}
        <div className="profile-section">
          <div className="profile-card card">
            <div className="profile-header">
              <User className="profile-avatar" />
              <div className="profile-info">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
                {user?.age && <p>Age: {user.age}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Courses */}
        <div className="courses-section">
          <h2 className="section-title">My Courses</h2>
          
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : purchasedCourses.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={64} className="empty-icon" />
              <h3>No Courses Yet</h3>
              <p>You haven't enrolled in any courses yet.</p>
              <a href="/courses" className="btn btn-primary">
                Browse Courses
              </a>
            </div>
          ) : (
            <div className="courses-grid">
              {purchasedCourses.map((course, index) => (
                <div key={course._id || index} className="course-card card">
                  <div className="course-image">
                    <img 
                      src={course.imageUrl || 'https://via.placeholder.com/300x200/667eea/white?text=Course+Image'} 
                      alt={course.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/667eea/white?text=Course+Image';
                      }}
                    />
                  </div>
                  
                  <div className="course-content">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '75%' }}></div>
                      </div>
                      <span className="progress-text">75% Complete</span>
                    </div>
                    
                    <button className="btn btn-primary">
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .dashboard-page {
          padding: 40px 0;
          min-height: 100vh;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .dashboard-header p {
          font-size: 1.125rem;
          color: #6b7280;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
        }

        .stat-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 12px;
          color: white;
        }

        .stat-icon .icon {
          width: 24px;
          height: 24px;
        }

        .stat-content h3 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .stat-content p {
          color: #6b7280;
          margin: 0;
        }

        .profile-section {
          margin-bottom: 40px;
        }

        .profile-card {
          padding: 24px;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .profile-avatar {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          padding: 16px;
          color: white;
        }

        .profile-info h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .profile-info p {
          color: #6b7280;
          margin: 2px 0;
        }

        .courses-section {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 24px;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .course-card {
          overflow: hidden;
        }

        .course-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .course-content {
          padding: 20px;
        }

        .course-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .course-description {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-progress {
          margin-bottom: 16px;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 14px;
          color: #6b7280;
        }

        .course-content .btn {
          width: 100%;
          justify-content: center;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #6b7280;
        }

        .empty-icon {
          color: #d1d5db;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .empty-state p {
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .dashboard-header h1 {
            font-size: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .profile-header {
            flex-direction: column;
            text-align: center;
          }
          
          .courses-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;