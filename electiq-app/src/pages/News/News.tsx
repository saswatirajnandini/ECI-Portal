import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Bell } from 'lucide-react';
import './News.css';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  published_at: string;
}

export default function News() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [breakingNews, setBreakingNews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(async (pageNum: number, isInitial: boolean) => {
    if (isInitial) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await fetch(`/api/v1/news?page=${pageNum}&limit=12`);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      
      if (isInitial) {
        setNewsItems(result.data);
        // Set first 5 as breaking news for the ticker
        setBreakingNews(result.data.slice(0, 5).map((item: NewsItem) => item.title));
      } else {
        setNewsItems(prev => [...prev, ...result.data]);
      }
      
      setHasMore(result.page < result.totalPages);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(1, true);
  }, [fetchNews]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(nextPage, false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="news-page container">
      {/* Breaking News Ticker */}
      <div className="breaking-news-ticker">
        <div className="ticker-label">
          <Bell size={16} /> <span>BREAKING NEWS</span>
        </div>
        <div className="ticker-content">
          <div className="ticker-track">
            {breakingNews.map((news, i) => (
              <span key={i} className="ticker-item">{news} • </span>
            ))}
            {/* Duplicate for seamless scroll */}
            {breakingNews.map((news, i) => (
              <span key={`dup-${i}`} className="ticker-item">{news} • </span>
            ))}
          </div>
        </div>
      </div>

      <div className="page-header">
        <span className="eyebrow">LATEST UPDATES</span>
        <h1>Election News & Announcements</h1>
        <p>Stay informed with the latest official news from the Election Commission of India.</p>
      </div>

      {loading ? (
        <div className="loading-state">Loading news articles...</div>
      ) : (
        <>
          <div className="news-grid">
            {newsItems.map((item) => (
              <motion.article 
                key={item.id}
                className="news-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="news-category">{item.category}</div>
                <h2 className="news-title">{item.title}</h2>
                <div className="news-meta">
                  <Calendar size={16} />
                  <span>{formatDate(item.published_at)}</span>
                </div>
                <p className="news-summary">{item.summary}</p>
                <a href="#" className="read-more">
                  Read Full Update <ArrowRight size={16} />
                </a>
              </motion.article>
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container">
              <button 
                className="btn-load-more" 
                onClick={loadMore} 
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading more...' : 'Load More News'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
