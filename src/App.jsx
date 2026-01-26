import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Planner from './pages/Planner';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
