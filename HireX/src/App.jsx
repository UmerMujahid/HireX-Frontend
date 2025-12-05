import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import Navbar from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
        <Navbar onNavigate={setCurrentPage} />
        {currentPage === 'home' ? <LandingPage /> : <AboutUs />}
    </div>
  );
}

export default App;