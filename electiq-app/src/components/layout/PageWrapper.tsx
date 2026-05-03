import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import './PageWrapper.css';

export default function PageWrapper() {
  return (
    <div className="page-wrapper">
      <TopNav />
      <main className="page-content" id="main-content">
        <Outlet />
      </main>
    </div>
  );
}
