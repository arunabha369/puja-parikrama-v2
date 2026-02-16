import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Planner from './pages/Planner';
import LiquidBackground from './components/LiquidBackground';

function App() {
  return (
    <Router>
      <LiquidBackground>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planner" element={<Planner />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LiquidBackground>
    </Router>
  );
}

export default App;
