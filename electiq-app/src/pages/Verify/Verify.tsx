import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import './Verify.css';

export default function Verify() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    voterId: '',
    aadhaarId: '',
    captchaInput: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  // Simple Mock Captcha
  const [captchaMath] = useState({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 });
  const captchaAnswer = (captchaMath.num1 + captchaMath.num2).toString();

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 12) value = value.slice(0, 12);
    // Format as XXXX XXXX XXXX
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormData(prev => ({ ...prev, aadhaarId: formatted }));
  };

  const handleVoterIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Alphanumeric
    if (value.length > 10) value = value.slice(0, 10);
    setFormData(prev => ({ ...prev, voterId: value }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.voterId.length !== 10) {
      alert("Voter ID must be exactly 10 alphanumeric characters.");
      return;
    }
    if (formData.aadhaarId.replace(/\s/g, '').length !== 12) {
      alert("Aadhaar ID must be exactly 12 digits.");
      return;
    }
    if (formData.captchaInput !== captchaAnswer) {
      alert("Incorrect Captcha Answer.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/v1/registration/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          voterId: formData.voterId,
          aadhaarId: formData.aadhaarId.replace(/\s/g, '')
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed on server');
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="registration-page container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 size={80} color="#138808" style={{ margin: '0 auto 20px' }} />
          <h2>Identity Verified Successfully!</h2>
          <p style={{ marginTop: '10px', color: '#555', fontSize: '1.1rem' }}>
            Your Aadhaar has been securely linked and your Voter ID is verified. <br/>
            You will receive a confirmation SMS on <strong>{formData.mobile}</strong> shortly.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="registration-page container">
      <div className="page-header">
        <span className="eyebrow">FORM 6B / VERIFICATION</span>
        <h1>Verify Voter ID & Link Aadhaar</h1>
        <p>Securely verify your Electoral ID and link it with your Aadhaar for upcoming elections.</p>
      </div>

      <div className="registration-form-card">
        <div className="form-header">
          <ShieldCheck size={28} color="#FF9933" />
          <h2 className="dark-bg-label">Provide Your Details</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="voter-form">
          <div className="form-group">
            <label>Full Name (As per records) *</label>
            <input 
              type="text" 
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <div className="input-prefix">
              <span className="prefix">+91</span>
              <input 
                type="tel" 
                placeholder="9876543210"
                maxLength={10}
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Voter ID (EPIC Number) *</label>
            <input 
              type="text" 
              placeholder="e.g. ABC1234567 (10 Chars Max)"
              value={formData.voterId}
              onChange={handleVoterIdChange}
              required
            />
            <small className="help-text">Must be exactly 10 characters.</small>
          </div>

          <div className="form-group">
            <label>Aadhaar ID Number *</label>
            <input 
              type="text" 
              placeholder="XXXX XXXX XXXX"
              value={formData.aadhaarId}
              onChange={handleAadhaarChange}
              required
            />
            <small className="help-text">Your 12-digit unique Aadhaar number.</small>
          </div>

          <div className="captcha-section">
            <div className="captcha-box">
              <ShieldCheck size={20} color="#000080" />
              <span>Security Check: What is <strong>{captchaMath.num1} + {captchaMath.num2}</strong>?</span>
            </div>
            <input 
              type="text" 
              placeholder="Enter answer"
              value={formData.captchaInput}
              onChange={(e) => setFormData({...formData, captchaInput: e.target.value})}
              required
              className="captcha-input"
            />
          </div>

          <button type="submit" className="btn-primary form-submit-btn" disabled={loading}>
            {loading ? (
              <span>Verifying...</span>
            ) : (
              <><ShieldCheck size={18} /> Verify Identity</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
