import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Planner from './pages/Planner';
import LiquidBackground from './components/LiquidBackground';
import PujaSelector from './components/PujaSelector';
import { PujaProvider } from './context/PujaContext';

import Temples from './pages/Temples';

const AppContent = () => {
  return (
    <Router>
      <LiquidBackground>
        <div className="flex flex-col min-h-screen animate-fade-in-up">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/select-puja" element={<PujaSelector />} />
              <Route path="/temples" element={<Temples />} />
              <Route path="/planner" element={<Planner />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LiquidBackground>
    </Router>
  );
};

function App() {
  return (
    <PujaProvider>
      <AppContent />
    </PujaProvider>
  );
}

export default App;
