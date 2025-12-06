import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import HRDashboard from './pages/HRDashboard';
import Navbar from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Dashboard has its own layout, so we might not want the main Navbar there?
  // Screenshot shows "HireX" in sidebar, and specific top nav.
  // The global <Navbar> at line 14 should probably be hidden for dashboard pages if we strictly follow the design.
  // However, for simplicity let's just render the page. The user didn't ask to remove the global navbar explicitly, 
  // but the dashed lines in design imply a standalone layout. 
  // I will conditionally render Navbar only if NOT on dashboard.

  return (
    <div>
      {currentPage !== 'hr-dashboard' && <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />}

      {currentPage === 'home' && <LandingPage onNavigate={setCurrentPage} />}
      {currentPage === 'about' && <AboutUs />}
      {currentPage === 'contact' && <ContactUs />}
      {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
      {currentPage === 'signup' && <Signup onNavigate={setCurrentPage} />}
      {currentPage === 'get-started' && <GetStarted onNavigate={setCurrentPage} />}
      {currentPage === 'forgot-password' && <ForgotPassword onNavigate={setCurrentPage} />}
      {currentPage === 'hr-dashboard' && <HRDashboard onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;