import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Search, MapPin, ChevronDown } from 'lucide-react';
import './Candidates.css';

interface Candidate {
  id: string;
  name: string;
  party: string;
  party_logo: string | null;
  constituency: string;
  state: string;
  education: string;
  status?: string;
  image_url: string | null;
}

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [stateMenuOpen, setStateMenuOpen] = useState(false);

  const fetchCandidates = useCallback(async (pageNum: number, search: string, state: string, isNewSearch: boolean) => {
    if (isNewSearch) setLoading(true);
    else setLoadingMore(true);

    try {
      let url = `/api/v1/candidates?page=${pageNum}&limit=20&search=${encodeURIComponent(search)}`;
      if (state) url += `&state=${encodeURIComponent(state)}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      
      if (isNewSearch) {
        setCandidates(result.data);
      } else {
        setCandidates(prev => [...prev, ...result.data]);
      }
      
      setTotalCount(result.count);
      setHasMore(result.page < result.totalPages);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Handle Search and State filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchCandidates(1, searchTerm, selectedState, true);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedState, fetchCandidates]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCandidates(nextPage, searchTerm, selectedState, false);
    }
  };

  return (
    <div className="candidates-page container">
      <div className="page-header">
        <span className="eyebrow">ELECTION 2024-2026</span>
        <h1>Know Your Candidates</h1>
        <p>Explore the verified list of candidates ({totalCount.toLocaleString()} total) contesting in your state.</p>
      </div>

      <div className="filters-row">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Candidate, Party or Constituency..." 
              className="search-input" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="state-filter-wrapper" onClick={() => setStateMenuOpen(!stateMenuOpen)}>
          <div className="state-selector">
            <MapPin size={18} /> 
            {selectedState || 'All States/UTs'} 
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          {stateMenuOpen && (
            <div className="state-dropdown">
              <button 
                className="state-option" 
                onClick={(e) => { e.stopPropagation(); setSelectedState(''); setStateMenuOpen(false); }}
              >
                All States/UTs
              </button>
              {states.map(state => (
                <button 
                  key={state} 
                  className="state-option" 
                  onClick={(e) => { e.stopPropagation(); setSelectedState(state); setStateMenuOpen(false); }}
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Searching candidates...</div>
      ) : (
        <>
          <div className="candidates-grid">
            {candidates.map((candidate) => (
              <motion.div 
                key={candidate.id}
                className="candidate-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="candidate-header">
                  <div className="candidate-avatar">
                    <Users size={32} color="#000080" />
                  </div>
                  <div className="candidate-info">
                    <h3>{candidate.name}</h3>
                    <div className="party-row">
                      {candidate.party_logo && <img src={candidate.party_logo} alt={candidate.party} className="party-mini-logo" />}
                      <p className="candidate-party">{candidate.party}</p>
                    </div>
                  </div>
                </div>
                
                <div className="candidate-details">
                  <div className="detail-row">
                    <span className="detail-label">State</span>
                    <span className="detail-value">{candidate.state}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Constituency</span>
                    <span className="detail-value">{candidate.constituency}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Education</span>
                    <span className="detail-value">{candidate.education}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status</span>
                    <span className="detail-value status-verified">
                      <CheckCircle size={14} /> Verified
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container">
              <button 
                className="btn-load-more" 
                onClick={loadMore} 
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading more...' : 'Load More Candidates'}
              </button>
            </div>
          )}
          
          {!hasMore && candidates.length > 0 && (
            <div className="end-message">You have reached the end of the list.</div>
          )}

          {candidates.length === 0 && !loading && (
            <div className="no-results">No candidates found for the selected criteria.</div>
          )}
        </>
      )}
    </div>
  );
}
