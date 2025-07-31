# CourseHub - Full Stack Course Selling Platform

A modern, full-stack web application for selling and managing online courses. Built with React (frontend) and Node.js/Express (backend), featuring user authentication, course management, and a beautiful responsive UI.

## 🚀 Features

### For Students (Users)
- **User Registration & Login** - Secure authentication system
- **Browse Courses** - View all available courses with detailed information
- **Purchase Courses** - Secure course enrollment system
- **User Dashboard** - Track enrolled courses and progress
- **Responsive Design** - Works seamlessly on all devices

### For Instructors (Admins)
- **Admin Dashboard** - Comprehensive course management interface
- **Create Courses** - Add new courses with title, description, price, and images
- **Edit Courses** - Update existing course information
- **Delete Courses** - Remove courses from the platform
- **Course Analytics** - View course performance and student enrollment

### Technical Features
- **Modern UI/UX** - Beautiful gradient designs and smooth animations
- **JWT Authentication** - Secure token-based authentication
- **RESTful API** - Well-structured backend API endpoints
- **MongoDB Integration** - Robust database with Mongoose ODM
- **CORS Enabled** - Frontend-backend communication
- **Password Hashing** - Secure password storage with bcrypt
- **Input Validation** - Data validation with Zod
- **Error Handling** - Comprehensive error management

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **CSS3** - Custom responsive styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Clone and navigate to the project**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Update the `.env` file with your MongoDB connection string:
   ```env
   MONGO_URL=mongodb://localhost:27017/coursesellingapp
   JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your connection string in `.env`

5. **Start the backend server**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```
   
   The backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173`

## 🎯 Usage

### Getting Started

1. **Access the Application**
   - Open your browser and go to `http://localhost:5173`
   - You'll see the beautiful homepage with navigation

2. **Create an Account**
   - Click "Sign Up" in the navigation
   - Choose between "Student" or "Instructor" account
   - Fill in your details and create an account

3. **Login**
   - Use the "Login" button to access your account
   - Choose the correct account type (Student/Instructor)

### For Students

1. **Browse Courses**
   - Visit the "Courses" page to see all available courses
   - View course details, prices, and descriptions

2. **Enroll in Courses**
   - Click "Enroll Now" on any course to purchase it
   - View your enrolled courses in your dashboard

3. **Access Dashboard**
   - View your learning progress
   - See all your enrolled courses
   - Track your achievements

### For Instructors

1. **Access Admin Dashboard**
   - Login with an instructor account
   - Navigate to the Admin Dashboard

2. **Create Courses**
   - Click "Add New Course" button
   - Fill in course details (title, description, price, image URL)
   - Save to publish the course

3. **Manage Courses**
   - Edit existing courses with the edit button
   - Delete courses you no longer want to offer
   - View course statistics and enrollment

## 🗂️ API Endpoints

### Authentication
- `POST /user/signup` - User registration
- `POST /user/signin` - User login
- `POST /admin/signup` - Admin registration
- `POST /admin/signin` - Admin login

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get specific course
- `POST /admin/courses` - Create new course (admin only)
- `PUT /admin/courses/:id` - Update course (admin only)
- `DELETE /admin/courses/:id` - Delete course (admin only)

### User Actions
- `POST /user/purchase` - Purchase a course
- `GET /user/purchases` - Get user's purchased courses
- `GET /admin/courses` - Get admin's courses

## 🎨 Design Features

- **Modern Gradient Theme** - Beautiful purple-blue gradient design
- **Responsive Layout** - Mobile-first responsive design
- **Smooth Animations** - Hover effects and transitions
- **Card-based UI** - Clean card layouts for courses and content
- **Professional Typography** - Carefully selected fonts and spacing
- **Accessible Design** - Proper contrast and accessibility features

## 🔧 Development

### Project Structure
```
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   └── App.jsx         # Main app component
├── routes/                  # Express route handlers
├── middlewares/            # Custom middleware
├── db.js                   # Database models
├── index.js               # Server entry point
└── package.json           # Backend dependencies
```

### Adding New Features

1. **Backend**: Add new routes in the `routes/` directory
2. **Frontend**: Create new components in `src/components/` or `src/pages/`
3. **Database**: Update models in `db.js`
4. **API**: Add new API functions in `src/utils/api.js`

## 🔒 Security Features

- **Password Hashing** - All passwords are hashed using bcrypt
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - All inputs are validated using Zod
- **CORS Protection** - Proper CORS configuration
- **Environment Variables** - Sensitive data stored in environment variables

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**
   - Update `JWT_SECRET` with a strong secret key
   - Use a production MongoDB database (MongoDB Atlas recommended)

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy Backend**
   - Deploy to platforms like Heroku, Vercel, or AWS
   - Ensure MongoDB connection is configured for production

4. **Deploy Frontend**
   - Deploy the built frontend to platforms like Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify environment variables are set correctly
4. Check that both frontend and backend servers are running

## 🎉 Demo

### Screenshots

The application features:
- Beautiful landing page with hero section
- User-friendly authentication pages
- Comprehensive course browsing interface
- Rich admin dashboard for course management
- Responsive design that works on all devices

### Live Demo

1. Start both servers (backend on :3000, frontend on :5173)
2. Create a student account and browse courses
3. Create an instructor account and manage courses
4. Experience the full course selling platform functionality

---

**Built with ❤️ using modern web technologies**
