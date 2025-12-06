import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import HRDashboard from './pages/HRDashboard';
import HRJobListings from './pages/HRJobListings';
import Navbar from './components/Navbar';
import CandidateDashboard from './pages/CandidateDashboard';
import ApplicationDetails from './pages/ApplicationDetails';
import CandidateProfile from './pages/CandidateProfile';

import InterviewerDashboard from './pages/InterviewerDashboard';
import InterviewFeedback from './pages/InterviewFeedback';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Pages that have their own specific layout/navbar or don't need the main global navbar
  const hideGlobalNavbarPages = [
    'hr-dashboard',
    'hr-job-listings',
    'hr-interviews',
    'hr-reports',
    'candidate-dashboard',
    'application-details',
    'candidate-profile',
    'interviewer-dashboard',
    'interview-feedback'
  ];

  return (
    <div>
      {!hideGlobalNavbarPages.includes(currentPage) && <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />}

      {currentPage === 'home' && <LandingPage onNavigate={setCurrentPage} />}
      {currentPage === 'about' && <AboutUs />}
      {currentPage === 'contact' && <ContactUs />}
      {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
      {currentPage === 'signup' && <Signup onNavigate={setCurrentPage} />}
      {currentPage === 'get-started' && <GetStarted onNavigate={setCurrentPage} />}
      {currentPage === 'forgot-password' && <ForgotPassword onNavigate={setCurrentPage} />}

      {/* HR Routes */}
      {currentPage === 'hr-dashboard' && <HRDashboard onNavigate={setCurrentPage} />}
      {currentPage === 'hr-interviews' && <HRDashboard onNavigate={setCurrentPage} initialView="interviews" />}
      {currentPage === 'hr-reports' && <HRDashboard onNavigate={setCurrentPage} initialView="applications" />}
      {currentPage === 'hr-job-listings' && <HRJobListings onNavigate={setCurrentPage} />}

      {/* Candidate Routes */}
      {currentPage === 'candidate-dashboard' && <CandidateDashboard onNavigate={setCurrentPage} />}
      {currentPage === 'application-details' && <ApplicationDetails onNavigate={setCurrentPage} />}
      {currentPage === 'candidate-profile' && <CandidateProfile onNavigate={setCurrentPage} />}

      {/* Interviewer Routes */}
      {currentPage === 'interviewer-dashboard' && <InterviewerDashboard onNavigate={setCurrentPage} />}
      {currentPage === 'interview-feedback' && <InterviewFeedback onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;