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
import Login from './pages/Login';
import Profile from './pages/Profile';
import PandalDetails from './pages/PandalDetails';
import ProtectedRoute from './components/ProtectedRoute';

import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  return (
    <Router>
      <ScrollToTop />
      <LiquidBackground>
        <Navbar />
        <div className="flex flex-col min-h-screen animate-fade-in-up">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/select-puja" element={
                <ProtectedRoute>
                  <PujaSelector />
                </ProtectedRoute>
              } />
              <Route path="/temples" element={
                <ProtectedRoute>
                  <Temples />
                </ProtectedRoute>
              } />
              <Route path="/planner" element={
                <ProtectedRoute>
                  <Planner />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/pandal/:slug" element={
                <ProtectedRoute>
                  <PandalDetails />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
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
