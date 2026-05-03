import { NavLink } from 'react-router-dom';
import { Phone, ChevronDown } from 'lucide-react';
import './TopNav.css';

const primaryLinks = [
  { path: '/', label: 'Home' },
  { path: '/verify', label: 'Verify Voter', hasMegaMenu: true },

  { path: '/candidates', label: 'Candidates' },
  { path: '/news', label: 'News' },
  { path: '/modules', label: 'Education' },
  { path: '/assistant', label: 'Assistant' },
];

export default function TopNav() {
  return (
    <header className="eci-header">
      {/* Main Brand Area */}
      <div className="brand-area">
        <div className="brand-container">
          <NavLink to="/" className="brand-logo">
            <img src="/logo.png" alt="Election Commission of India" className="eci-logo-img" style={{ height: '60px', width: 'auto' }} />
            <div className="brand-titles">
              <h1>ELECTION COMMISSION OF INDIA</h1>
              <h2>Empowering Democracy</h2>
            </div>
          </NavLink>
          
          <div className="brand-actions">
            <div className="helpline">
              <Phone size={20} className="helpline-icon" />
              <div>
                <span className="helpline-label">Voter Helpline</span>
                <strong className="helpline-number">1950</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-links">
            {primaryLinks.map((link) => (
              <div className="nav-item" key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label} {link.hasMegaMenu && <ChevronDown size={14} />}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
