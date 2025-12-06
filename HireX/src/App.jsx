import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import ForgotPassword from './pages/ForgotPassword';
import SignupHR from './pages/SignupHR';
import SignupCandidate from './pages/SignupCandidate';
import SignupInterviewer from './pages/SignupInterviewer';
import HRDashboard from './pages/HRDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      {currentPage !== 'hr-dashboard' && currentPage !== 'admin-dashboard' && <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />}

      {currentPage === 'home' && <LandingPage onNavigate={setCurrentPage} />}
      {currentPage === 'about' && <AboutUs onNavigate={setCurrentPage} />}
      {currentPage === 'contact' && <ContactUs />}
      {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
      {currentPage === 'signup' && <SignupHR onNavigate={setCurrentPage} />}
      {currentPage === 'signup-hr' && <SignupHR onNavigate={setCurrentPage} />}
      {currentPage === 'signup-candidate' && <SignupCandidate onNavigate={setCurrentPage} />}
      {currentPage === 'signup-interviewer' && <SignupInterviewer onNavigate={setCurrentPage} />}
      {currentPage === 'get-started' && <GetStarted onNavigate={setCurrentPage} />}
      {currentPage === 'forgot-password' && <ForgotPassword onNavigate={setCurrentPage} />}
      {currentPage === 'hr-dashboard' && <HRDashboard onNavigate={setCurrentPage} />}
      {currentPage === 'admin-dashboard' && <AdminDashboard onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;