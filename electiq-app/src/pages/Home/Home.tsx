import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Users, MapPin, FileCheck, PlayCircle, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import './Home.css';

const services = [
  {
    title: 'Verify Voter ID',
    desc: 'Verify if your name is present in the electoral roll.',
    path: '/verify',
    icon: <Users size={32} />
  },
  {
    title: 'Candidate List',
    desc: 'View verified candidates contesting from your area.',
    path: '/candidates',
    icon: <Users size={32} />
  },
  {
    title: 'Fact Check & Info',
    desc: 'Get authentic information and debunk election myths.',
    path: '/factcheck',
    icon: <FileCheck size={32} />
  }
];

export default function Home() {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="home-page" style={{ zoom: zoomLevel } as React.CSSProperties}>
      {/* Floating Zoom Controls */}
      <div className="zoom-widget">
        <button onClick={handleZoomOut} title="Zoom Out"><ZoomOut size={18} /></button>
        <span className="zoom-value">{Math.round(zoomLevel * 100)}%</span>
        <button onClick={handleZoomIn} title="Zoom In"><ZoomIn size={18} /></button>
        <button onClick={handleResetZoom} title="Reset"><RotateCcw size={16} /></button>
      </div>

      {/* Alert Banner */}
      <div className="alert-banner">
        <div className="container alert-container">
          <AlertTriangle size={20} className="alert-icon" />
          <div className="alert-content">
            <strong>IMPORTANT: Verification deadline approaching</strong>
            <span>Last date to verify and link Aadhaar is June 2026.</span>
          </div>
          <Link to="/verify" className="alert-link">Verify Now →</Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <motion.div 
            className="hero-text-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="emblem-wrapper">
              <img src="/logo.png" alt="ECI Logo" className="national-emblem" />
              <span className="hero-eci-title">ELECTION COMMISSION OF INDIA</span>
            </div>
            <h1 className="hero-title">Empowering Democracy</h1>
            
            <div className="hero-actions">
              <Link to="/verify" className="btn-primary large">Verify Voter ID</Link>
              
            </div>
            

          </motion.div>
        </div>
      </section>

      {/* Quick Stats Dashboard */}
      <section className="stats-dashboard">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-value">96.8 Cr</h3>
              <p className="stat-label">Registered Voters</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">10.5 Lakh</h3>
              <p className="stat-label">Polling Stations</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">28 & 8</h3>
              <p className="stat-label">States & UTs</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">99.9%</h3>
              <p className="stat-label">Aadhaar Seeded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Voter Services Quick Links */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Voter Services</h2>
          <div className="services-grid">
            {services.map((service, idx) => (
              <motion.div 
                className="service-card" 
                key={service.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to={service.path} className="service-link">
                  Access Service <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Education Section: Why Your Vote Matters */}
      <section className="education-home-section">
        <div className="container">
          <div className="edu-header">
            <h2 className="section-title">Why Your Vote Matters</h2>
            <p className="section-subtitle">Every single vote builds the foundation of our great nation.</p>
          </div>
          
          <div className="edu-visual-grid">
            <motion.div 
              className="edu-visual-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="edu-icon-circle saffron">
                <Users size={32} />
              </div>
              <h3>Your Voice</h3>
              <p>Voting is the most powerful way to tell the government what you need for your family and community.</p>
            </motion.div>

            <motion.div 
              className="edu-visual-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="edu-icon-circle navy">
                <FileCheck size={32} />
              </div>
              <h3>Your Future</h3>
              <p>The leaders you choose today will make decisions about schools, hospitals, and roads for the next 5 years.</p>
            </motion.div>

            <motion.div 
              className="edu-visual-card"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="edu-icon-circle green">
                <MapPin size={32} />
              </div>
              <h3>Your Country</h3>
              <p>A strong democracy needs everyone to participate. When you vote, you make India stronger and better.</p>
            </motion.div>
          </div>

          <div className="edu-cta-box">
            <div className="edu-cta-text">
              <h4>New to voting?</h4>
              <p>We have simple, easy-to-understand guides to help you through the entire process.</p>
            </div>
            <Link to="/modules" className="btn-primary">Start Learning Today</Link>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="media-section" style={{ padding: '60px 0', background: '#f8fafc' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Latest Updates & Media</h2>
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <img src="/news-1.png" alt="Campaign Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                  <PlayCircle size={48} color="#FF9933" />
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Campaign: "Chunav Ka Parv, Desh Garv"</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Watch the latest awareness campaign promoting maximum voter turnout for 2026.</p>
              </div>
            </div>
            <div className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <img src="/news-2.png" alt="EVM Demonstration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                  <PlayCircle size={48} color="#FF9933" />
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>How to use EVM & VVPAT</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>A simple step-by-step guide to casting your vote securely at the polling booth.</p>
              </div>
            </div>
            <div className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <img src="/news-3.png" alt="Youth Voters" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                  <PlayCircle size={48} color="#FF9933" />
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Youth Voters Initiative</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Highlights from the nationwide drive enrolling over 1.5 crore first-time voters.</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/news" className="btn-secondary">View All News & Updates <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
