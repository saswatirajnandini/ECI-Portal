import { motion } from 'framer-motion';
import { Search, PlayCircle, FileText, ChevronRight } from 'lucide-react';
import './Modules.css';

const modules = [
  {
    id: 1,
    title: 'Lok Sabha vs Rajya Sabha',
    desc: 'Understand the two houses of the Indian Parliament and their roles.',
    duration: '5 min read',
    type: 'article',
    icon: FileText,
    color: 'var(--navy)',
  },
  {
    id: 2,
    title: 'EVMs and VVPAT',
    desc: 'How Electronic Voting Machines work and how VVPAT ensures transparency.',
    duration: '3 min video',
    type: 'video',
    icon: PlayCircle,
    color: 'var(--saffron)',
  },
  {
    id: 3,
    title: 'Model Code of Conduct (MCC)',
    desc: 'The guidelines political parties and candidates must follow during elections.',
    duration: '7 min read',
    type: 'article',
    icon: FileText,
    color: 'var(--green)',
  },
  {
    id: 4,
    title: 'Role of the ECI',
    desc: 'A look at the Election Commission of India and how it conducts free and fair elections.',
    duration: '6 min read',
    type: 'article',
    icon: FileText,
    color: 'var(--navy)',
  },
];

export default function Modules() {
  return (
    <div className="modules-page container">
      <div className="page-header">
        <span className="eyebrow">CIVIC EDUCATION</span>
        <h1>Learning Modules</h1>
        <p>Bite-sized, unbiased lessons on how the Indian election system works.</p>
      </div>

      <div className="modules-search">
        <Search size={20} className="search-icon" />
        <input type="text" placeholder="Search for topics (e.g., 'Swing States')" />
      </div>

      <div className="modules-grid">
        {modules.map((mod, idx) => (
          <motion.div
            key={mod.id}
            className="module-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="module-top">
              <div className="mod-icon-wrap" style={{ background: `${mod.color}15`, color: mod.color }}>
                <mod.icon size={24} />
              </div>
              <span className="mod-duration">{mod.duration}</span>
            </div>
            
            <h3>{mod.title}</h3>
            <p>{mod.desc}</p>
            
            <button className="mod-btn" style={{ color: mod.color }}>
              Start Learning <ChevronRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
