import { useState, useEffect } from 'react';
import { BookOpen, DollarSign, User, ShoppingCart, CheckCircle } from 'lucide-react';
import { courseAPI, handleAPIError } from '../utils/api';

const Courses = ({ user, userType }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchaseLoading, setPurchaseLoading] = useState({});
  const [purchaseSuccess, setPurchaseSuccess] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses();
      setCourses(response.courses || []);
    } catch (error) {
      const errorResult = handleAPIError(error);
      setError(errorResult.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (courseId) => {
    if (!user) {
      setError('Please login to purchase courses');
      return;
    }

    if (userType !== 'user') {
      setError('Only students can purchase courses');
      return;
    }

    setPurchaseLoading(prev => ({ ...prev, [courseId]: true }));
    
    try {
      await courseAPI.purchaseCourse(courseId);
      setPurchaseSuccess(prev => ({ ...prev, [courseId]: true }));
      setTimeout(() => {
        setPurchaseSuccess(prev => ({ ...prev, [courseId]: false }));
      }, 3000);
    } catch (error) {
      const errorResult = handleAPIError(error);
      setError(errorResult.message);
    } finally {
      setPurchaseLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Explore Our Courses</h1>
          <p className="page-subtitle">
            Discover a wide range of courses designed to help you advance your career and skills
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {courses.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={64} className="empty-icon" />
            <h3>No Courses Available</h3>
            <p>Check back later for new courses!</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="course-card card">
                <div className="course-image">
                  <img 
                    src={course.imageUrl || '/api/placeholder/300/200'} 
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200/667eea/white?text=Course+Image';
                    }}
                  />
                </div>
                
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  
                  <div className="course-meta">
                    <div className="course-price">
                      <DollarSign size={16} />
                      <span>${course.price}</span>
                    </div>
                    <div className="course-instructor">
                      <User size={16} />
                      <span>Instructor</span>
                    </div>
                  </div>

                  {user && userType === 'user' && (
                    <div className="course-actions">
                      {purchaseSuccess[course._id] ? (
                        <button className="btn btn-success" disabled>
                          <CheckCircle size={16} />
                          Purchased!
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchase(course._id)}
                          className="btn btn-primary"
                          disabled={purchaseLoading[course._id]}
                        >
                          {purchaseLoading[course._id] ? (
                            <div className="spinner"></div>
                          ) : (
                            <>
                              <ShoppingCart size={16} />
                              Enroll Now
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {!user && (
                    <div className="course-actions">
                      <p className="login-prompt">
                        <a href="/login">Login</a> to enroll in this course
                      </p>
                    </div>
                  )}

                  {userType === 'admin' && (
                    <div className="course-actions">
                      <span className="admin-badge">Instructor View</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .courses-page {
          padding: 40px 0;
          min-height: 100vh;
        }

        .page-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .page-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }

        .course-card {
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .course-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .course-card:hover .course-image img {
          transform: scale(1.05);
        }

        .course-content {
          padding: 24px;
        }

        .course-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .course-description {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 12px 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .course-price,
        .course-instructor {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #374151;
        }

        .course-price {
          font-weight: 600;
          color: #059669;
        }

        .course-actions {
          margin-top: 16px;
        }

        .course-actions .btn {
          width: 100%;
          justify-content: center;
        }

        .login-prompt {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }

        .login-prompt a {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }

        .login-prompt a:hover {
          text-decoration: underline;
        }

        .admin-badge {
          display: inline-block;
          background: #fbbf24;
          color: #92400e;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          width: 100%;
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

        @media (max-width: 768px) {
          .courses-grid {
            grid-template-columns: 1fr;
          }
          
          .page-title {
            font-size: 2rem;
          }
          
          .course-meta {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Courses;