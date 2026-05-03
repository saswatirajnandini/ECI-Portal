import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import './Finder.css';

export default function Finder() {
  const [pin, setPin] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      setSearched(true);
    }
  };

  return (
    <div className="finder-page container">
      <div className="page-header">
        <span className="eyebrow">POLLING BOOTH FINDER</span>
        <h1>Find Your Polling Location</h1>
        <p>Discover your designated polling station and assembly constituency by your 6-digit PIN code.</p>
      </div>

      <div className="finder-card">
        <form onSubmit={handleSearch} className="finder-form">
          <div className="input-wrap">
            <MapPin size={20} className="input-icon" />
            <input 
              type="text" 
              placeholder="Enter 6-digit PIN code (e.g. 400001)"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={pin.length !== 6}>
            Find My Booth
          </button>
        </form>
      </div>

      {searched && (
        <motion.div 
          className="finder-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="result-section">
            <div className="section-title">
              <Calendar size={20} color="#000080" />
              <h3>Upcoming Local Elections</h3>
            </div>
            
            <div className="election-list">
              <div className="election-item">
                <div className="elec-date">
                  <span className="month">JUN</span>
                  <span className="day">15</span>
                </div>
                <div className="elec-details">
                  <h4>General Assembly Election 2026</h4>
                  <p>Lok Sabha & State Representatives</p>
                </div>
                <a href="/timeline" className="elec-link">Timeline <ArrowRight size={14}/></a>
              </div>
            </div>
          </div>

          <div className="result-section">
            <div className="section-title">
              <Building size={20} color="#FF9933" />
              <h3>Your Designated Polling Location</h3>
            </div>
            
            <div className="polling-card">
              <h4>Government Senior Secondary School</h4>
              <p>Room No. 4, Main Block, Near Market Square, {pin}</p>
              <div className="polling-hours">
                <strong>Polling Hours:</strong> 7:00 AM - 6:00 PM
              </div>
              <div className="polling-officer">
                <strong>Booth Level Officer (BLO):</strong> Mr. Amit Kumar (9876543210)
              </div>
              
              <a 
                href={`https://maps.google.com/?q=Government+School+${pin}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary small"
                style={{ marginTop: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                View on Google Maps <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
