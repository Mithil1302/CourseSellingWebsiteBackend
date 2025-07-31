import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="feature-icon" />,
      title: "Quality Courses",
      description: "Learn from industry experts with hands-on projects and real-world applications."
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Expert Instructors",
      description: "Our instructors are professionals with years of experience in their fields."
    },
    {
      icon: <Award className="feature-icon" />,
      title: "Certificates",
      description: "Earn recognized certificates upon completion of your courses."
    },
    {
      icon: <Star className="feature-icon" />,
      title: "Top Rated",
      description: "Join thousands of satisfied students with excellent course ratings."
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Learn Skills That Matter</h1>
          <p>
            Discover a world of knowledge with our comprehensive online courses. 
            From programming to design, we have everything you need to advance your career.
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
              <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose CourseHub?</h2>
            <p className="section-subtitle">
              We provide the best learning experience with modern tools and expert guidance
            </p>
          </div>

          <div className="grid grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                {feature.icon}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Instructors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of students and advance your career with our expert-led courses.</p>
            <Link to="/register" className="btn btn-primary">
              Start Learning Today
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .feature-card {
          text-align: center;
          padding: 32px 24px;
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          color: #667eea;
          margin: 0 auto 20px;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 12px;
        }

        .feature-description {
          color: #6b7280;
          line-height: 1.6;
        }

        .stats-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          text-align: center;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 1.125rem;
          opacity: 0.9;
        }

        .cta-section {
          background: #f8fafc;
          padding: 80px 0;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 32px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .cta-content h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;