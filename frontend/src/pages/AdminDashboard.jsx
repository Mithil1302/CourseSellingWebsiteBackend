import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, BookOpen, Users, DollarSign, Eye } from 'lucide-react';
import { courseAPI, adminAPI, handleAPIError } from '../utils/api';

const AdminDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchAdminCourses();
  }, []);

  const fetchAdminCourses = async () => {
    try {
      const response = await adminAPI.getAdminCourses();
      setCourses(response.courses || []);
    } catch (error) {
      const errorResult = handleAPIError(error);
      setError(errorResult.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (editingCourse) {
        await courseAPI.updateCourse(editingCourse._id, courseData);
        setSuccess('Course updated successfully!');
      } else {
        await courseAPI.createCourse(courseData);
        setSuccess('Course created successfully!');
      }

      setShowModal(false);
      setEditingCourse(null);
      setFormData({ title: '', description: '', price: '', imageUrl: '' });
      fetchAdminCourses();
    } catch (error) {
      const errorResult = handleAPIError(error);
      setError(errorResult.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      imageUrl: course.imageUrl || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      await courseAPI.deleteCourse(courseId);
      setSuccess('Course deleted successfully!');
      fetchAdminCourses();
    } catch (error) {
      const errorResult = handleAPIError(error);
      setError(errorResult.message);
    }
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData({ title: '', description: '', price: '', imageUrl: '' });
    setShowModal(true);
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name}! Manage your courses here.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-icon">
              <BookOpen className="icon" />
            </div>
            <div className="stat-content">
              <h3>{courses.length}</h3>
              <p>Total Courses</p>
            </div>
          </div>
          
          <div className="stat-card card">
            <div className="stat-icon">
              <Users className="icon" />
            </div>
            <div className="stat-content">
              <h3>150</h3>
              <p>Total Students</p>
            </div>
          </div>
          
          <div className="stat-card card">
            <div className="stat-icon">
              <DollarSign className="icon" />
            </div>
            <div className="stat-content">
              <h3>$2,450</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Course Management */}
        <div className="courses-section">
          <div className="section-header">
            <h2 className="section-title">My Courses</h2>
            <button onClick={openCreateModal} className="btn btn-primary">
              <Plus size={16} />
              Add New Course
            </button>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={64} className="empty-icon" />
              <h3>No Courses Yet</h3>
              <p>Create your first course to get started!</p>
              <button onClick={openCreateModal} className="btn btn-primary">
                <Plus size={16} />
                Create Course
              </button>
            </div>
          ) : (
            <div className="courses-table">
              <div className="table-header">
                <div className="table-cell">Course</div>
                <div className="table-cell">Price</div>
                <div className="table-cell">Students</div>
                <div className="table-cell">Actions</div>
              </div>
              
              {courses.map((course) => (
                <div key={course._id} className="table-row">
                  <div className="table-cell course-info">
                    <img 
                      src={course.imageUrl || 'https://via.placeholder.com/60x40/667eea/white?text=Course'} 
                      alt={course.title}
                      className="course-thumbnail"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/60x40/667eea/white?text=Course';
                      }}
                    />
                    <div>
                      <h4>{course.title}</h4>
                      <p>{course.description?.substring(0, 60)}...</p>
                    </div>
                  </div>
                  <div className="table-cell price">${course.price}</div>
                  <div className="table-cell">25</div>
                  <div className="table-cell actions">
                    <button 
                      onClick={() => handleEdit(course)}
                      className="action-btn edit-btn"
                      title="Edit Course"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(course._id)}
                      className="action-btn delete-btn"
                      title="Delete Course"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Create/Edit Course */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="course-form">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Course Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter course title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    placeholder="Enter course description"
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="form-label">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl" className="form-label">Image URL (Optional)</label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="modal-actions">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner"></div>
                    ) : (
                      editingCourse ? 'Update Course' : 'Create Course'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-dashboard {
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

        .courses-section {
          margin-bottom: 40px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
        }

        .courses-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 20px 24px;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          align-items: center;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-row:hover {
          background: #f8fafc;
        }

        .course-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .course-thumbnail {
          width: 60px;
          height: 40px;
          object-fit: cover;
          border-radius: 6px;
        }

        .course-info h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .course-info p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .price {
          font-weight: 600;
          color: #059669;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 8px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background: #dbeafe;
          color: #1e40af;
        }

        .edit-btn:hover {
          background: #bfdbfe;
        }

        .delete-btn {
          background: #fee2e2;
          color: #dc2626;
        }

        .delete-btn:hover {
          background: #fecaca;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 0;
          margin-bottom: 24px;
        }

        .modal-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          color: #6b7280;
          cursor: pointer;
          padding: 4px;
        }

        .modal-close:hover {
          color: #374151;
        }

        .course-form {
          padding: 0 24px 24px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
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
          .section-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .table-header {
            display: none;
          }

          .table-row {
            padding: 16px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 12px;
          }

          .course-info {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }

          .actions {
            justify-content: center;
            margin-top: 12px;
          }

          .modal-content {
            margin: 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;