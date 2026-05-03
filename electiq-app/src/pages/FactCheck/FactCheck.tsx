import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, AlertTriangle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { sendChatMessage } from '../../services/gemini';
import './FactCheck.css';

export default function FactCheck() {
  const [claim, setClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: 'true' | 'false' | 'mixed' | 'unverified';
    analysis: string;
  } | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await sendChatMessage([], `
        Act as an impartial, professional political fact-checker for the Indian Elections.
        Analyze this claim: "${claim}"
        Respond ONLY with a JSON object in this format:
        {
          "status": "true" or "false" or "mixed" or "unverified",
          "analysis": "2-3 sentences of clear explanation citing official Indian or reputable sources"
        }
      `);
      
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setResult(parsed);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setResult({
        status: 'unverified',
        analysis: "Unable to verify this claim at the moment. Please consult official sources like eci.gov.in."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="factcheck-page">
      <div className="page-header">
        <h1>Fact Checker</h1>
        <p>Verify political claims and election news instantly using AI-powered analysis.</p>
      </div>

      <div className="fact-container">
        <div className="fact-header">
          <ShieldCheck size={32} className="navy" />
          <h2>Verify a Claim</h2>
        </div>
        
        <form onSubmit={handleCheck} className="fact-form">
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="e.g., 'Is voter registration possible through the Voter Helpline App?'"
            rows={4}
          />
          <button type="submit" disabled={!claim.trim() || loading} className="btn-primary large">
            {loading ? (
              <><RefreshCw size={18} className="spin" /> Analyzing...</>
            ) : (
              <><Search size={18} /> Verify Claim</>
            )}
          </button>
        </form>

        {result && (
          <motion.div 
            className={`fact-result ${result.status}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="result-header">
              {result.status === 'true' && <CheckCircle size={28} />}
              {result.status === 'false' && <AlertTriangle size={28} />}
              {result.status === 'mixed' && <AlertTriangle size={28} />}
              {result.status === 'unverified' && <Search size={28} />}
              
              <h3>
                {result.status === 'true' && 'Mostly True'}
                {result.status === 'false' && 'Mostly False'}
                {result.status === 'mixed' && 'Mixed Context'}
                {result.status === 'unverified' && 'Unverified'}
              </h3>
            </div>
            
            <p className="result-analysis">{result.analysis}</p>
            
            <div className="result-footer">
              <span className="disclaimer">
                AI analysis. Always cross-reference with official election sources.
              </span>
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="external-link">
                More Resources <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
