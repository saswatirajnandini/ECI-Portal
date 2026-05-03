import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Bot,
  BookOpen,
  Brain,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Menu,
} from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/assistant', label: 'AI Assistant', icon: Bot },
  { path: '/candidates', label: 'Candidates', icon: UserCheck },
  { path: '/verify', label: 'Verify Voter', icon: ShieldCheck },
  { path: '/modules', label: 'Modules', icon: BookOpen },
  { path: '/quiz', label: 'Quiz Hub', icon: Brain },
  
  { path: '/factcheck', label: 'Fact Checker', icon: ShieldCheck },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUserStore();

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      <motion.aside
        className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Logo" style={{ height: '40px', width: 'auto', marginRight: '10px' }} />
          {!sidebarCollapsed && (
            <motion.div
              className="logo-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="logo-title">Elect<span className="logo-iq">IQ</span></span>
              <span className="logo-sub">Civic Education Platform</span>
            </motion.div>
          )}
          <button className="collapse-btn" onClick={toggleSidebar}>
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              title={item.label}
            >
              <item.icon size={20} className="nav-icon" />
              {!sidebarCollapsed && (
                <motion.span
                  className="nav-label"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Trust */}
        {!sidebarCollapsed && (
          <motion.div
            className="sidebar-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="trust-seal">
              <ShieldCheck size={14} />
              <span>Non-partisan Information</span>
            </div>
          </motion.div>
        )}
      </motion.aside>
    </>
  );
}
