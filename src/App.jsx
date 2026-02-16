import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Planner from './pages/Planner';
import LiquidBackground from './components/LiquidBackground';
import PujaSelector from './components/PujaSelector';
import { PujaProvider, usePuja } from './context/PujaContext';

const AppContent = () => {
  const { selectedPuja } = usePuja();

  return (
    <Router>
      <LiquidBackground>
        {!selectedPuja ? (
          <PujaSelector />
        ) : (
          <div className="flex flex-col min-h-screen animate-fade-in-up">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planner" element={<Planner />} />
              </Routes>
            </main>
            <Footer />
          </div>
        )}
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
