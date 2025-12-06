import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {currentPage === 'home' && <LandingPage />}
      {currentPage === 'about' && <AboutUs />}
      {currentPage === 'contact' && <ContactUs />}
      {currentPage === 'login' && <Login />}
    </div>
  );
}

export default App;