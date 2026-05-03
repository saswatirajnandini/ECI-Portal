import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import Home from './pages/Home/Home';
import Assistant from './pages/Assistant/Assistant';
import Verify from './pages/Verify/Verify';
import Modules from './pages/Modules/Modules';
import Quiz from './pages/Quiz/Quiz';
import FactCheck from './pages/FactCheck/FactCheck';
import Candidates from './pages/Candidates/Candidates';
import News from './pages/News/News';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/factcheck" element={<FactCheck />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/news" element={<News />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
