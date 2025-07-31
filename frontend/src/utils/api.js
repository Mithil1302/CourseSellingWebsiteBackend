import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Authentication APIs
export const authAPI = {
  // User registration
  registerUser: async (userData) => {
    const response = await api.post('/user/signup', userData);
    return response.data;
  },

  // User login
  loginUser: async (credentials) => {
    const response = await api.post('/user/signin', credentials);
    return response.data;
  },

  // Admin registration
  registerAdmin: async (adminData) => {
    const response = await api.post('/admin/signup', adminData);
    return response.data;
  },

  // Admin login
  loginAdmin: async (credentials) => {
    const response = await api.post('/admin/signin', credentials);
    return response.data;
  },
};

// Course APIs
export const courseAPI = {
  // Get all courses
  getAllCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },

  // Get course by ID
  getCourseById: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  // Create new course (admin only)
  createCourse: async (courseData) => {
    const response = await api.post('/admin/courses', courseData);
    return response.data;
  },

  // Update course (admin only)
  updateCourse: async (courseId, courseData) => {
    const response = await api.put(`/admin/courses/${courseId}`, courseData);
    return response.data;
  },

  // Delete course (admin only)
  deleteCourse: async (courseId) => {
    const response = await api.delete(`/admin/courses/${courseId}`);
    return response.data;
  },

  // Purchase course (user only)
  purchaseCourse: async (courseId) => {
    const response = await api.post('/user/purchase', { courseId });
    return response.data;
  },

  // Get user's purchased courses
  getUserCourses: async () => {
    const response = await api.get('/user/purchases');
    return response.data;
  },
};

// Admin APIs
export const adminAPI = {
  // Get admin's courses
  getAdminCourses: async () => {
    const response = await api.get('/admin/courses');
    return response.data;
  },

  // Get course analytics
  getCourseAnalytics: async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
  },
};

// General error handler
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'An error occurred';
    return { success: false, message };
  } else if (error.request) {
    // Request made but no response
    return { success: false, message: 'Network error. Please check your connection.' };
  } else {
    // Something else happened
    return { success: false, message: 'An unexpected error occurred' };
  }
};

export default api;