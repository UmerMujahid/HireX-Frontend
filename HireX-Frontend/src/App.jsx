import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
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
import HRJobListings from './pages/HRJobListings';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import CandidateDashboard from './pages/CandidateDashboard';
import ApplicationDetails from './pages/ApplicationDetails';
import CandidateProfile from './pages/CandidateProfile';
import InterviewerDashboard from './pages/InterviewerDashboard';
import InterviewFeedback from './pages/InterviewFeedback';

import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './context/AuthContext';

const RequireRole = ({ role, children }) => {
  const auth = useAuth();
  if (!auth?.user) return <Navigate to="/login" replace />;
  if (auth.user.role !== role) return <Navigate to="/" replace />;
  return children || <Outlet />;
};

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavbarPrefixes = ['/hr', '/candidate', '/interviewer', '/admin'];
  const shouldShowNavbar = !hideNavbarPrefixes.some(prefix => location.pathname.startsWith(prefix));

  return (
    <div>
      {shouldShowNavbar && <Navbar onNavigate={(p, params) => {
        // map named pages to routes
        const map = {
          home: '/',
          about: '/about',
          contact: '/contact',
          login: '/login',
          'get-started': '/get-started',
          'hr-dashboard': '/hr',
          'hr-job-listings': '/hr/jobs',
          'admin-dashboard': '/admin',
          'candidate-dashboard': '/candidate',
          'candidate-profile': '/candidate/profile',
          'application-details': '/candidate/application',
          'interviewer-dashboard': '/interviewer',
          'signup-hr': '/signup-hr',
          'signup-candidate': '/signup-candidate',
          'signup-interviewer': '/signup-interviewer',
          'forgot-password': '/forgot-password',
          'interview-feedback': '/interviewer/feedback',
          'hr-interviews': '/hr/interviews',
          'hr-reports': '/hr/reports'
        };
        let route = map[p] || '/';
        if (params && params.jobId && p === 'application-details') {
          route += `?jobId=${params.jobId}`;
        }
        navigate(route);
      }} currentPage={null} />}
      <Outlet />
    </div>
  );
};

const ComponentWithNav = ({ Component, extraProps }) => {
  const navigate = useNavigate();
  const onNavigate = (page, params) => {
    const map = {
      home: '/',
      about: '/about',
      contact: '/contact',
      login: '/login',
      'get-started': '/get-started',
      'hr-dashboard': '/hr',
      'hr-job-listings': '/hr/jobs',
      'admin-dashboard': '/admin',
      'candidate-dashboard': '/candidate',
      'candidate-profile': '/candidate/profile',
      'application-details': '/candidate/application',
      'interviewer-dashboard': '/interviewer',
      'signup-hr': '/signup-hr',
      'signup-candidate': '/signup-candidate',
      'signup-interviewer': '/signup-interviewer',
      'forgot-password': '/forgot-password',
      'interview-feedback': '/interviewer/feedback',
      'hr-interviews': '/hr/interviews',
      'hr-reports': '/hr/reports'
    };
    let route = map[page] || '/';
    if (params && params.jobId && page === 'application-details') {
      route += `?jobId=${params.jobId}`;
    }
    navigate(route);
  };
  return <Component onNavigate={onNavigate} {...(extraProps || {})} />;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ComponentWithNav Component={LandingPage} />} />
          <Route path="/about" element={<ComponentWithNav Component={AboutUs} />} />
          <Route path="/contact" element={<ComponentWithNav Component={ContactUs} />} />
          <Route path="/login" element={<ComponentWithNav Component={Login} />} />
          <Route path="/get-started" element={<ComponentWithNav Component={GetStarted} />} />
          <Route path="/forgot-password" element={<ComponentWithNav Component={ForgotPassword} />} />
          <Route path="/signup-hr" element={<ComponentWithNav Component={SignupHR} />} />
          <Route path="/signup-candidate" element={<ComponentWithNav Component={SignupCandidate} />} />
          <Route path="/signup-interviewer" element={<ComponentWithNav Component={SignupInterviewer} />} />

          <Route path="/hr" element={<RequireRole role="hr"><ComponentWithNav Component={HRDashboard} extraProps={{ initialView: 'dashboard' }} /></RequireRole>} />
          <Route path="/hr/jobs" element={<RequireRole role="hr"><ComponentWithNav Component={HRJobListings} /></RequireRole>} />
          <Route path="/hr/interviews" element={<RequireRole role="hr"><ComponentWithNav Component={HRDashboard} extraProps={{ initialView: 'interviews' }} /></RequireRole>} />
          <Route path="/hr/reports" element={<RequireRole role="hr"><ComponentWithNav Component={HRDashboard} extraProps={{ initialView: 'applications' }} /></RequireRole>} />

          <Route path="/admin" element={<RequireRole role="admin"><ComponentWithNav Component={AdminDashboard} /></RequireRole>} />

          <Route path="/candidate" element={<RequireRole role="candidate"><ComponentWithNav Component={CandidateDashboard} /></RequireRole>} />
          <Route path="/candidate/application/:jobId?" element={<RequireRole role="candidate"><ComponentWithNav Component={ApplicationDetails} /></RequireRole>} />
          <Route path="/candidate/profile" element={<RequireRole role="candidate"><ComponentWithNav Component={CandidateProfile} /></RequireRole>} />

          <Route path="/interviewer" element={<RequireRole role="interviewer"><ComponentWithNav Component={InterviewerDashboard} /></RequireRole>} />
          <Route path="/interviewer/feedback" element={<RequireRole role="interviewer"><ComponentWithNav Component={InterviewFeedback} /></RequireRole>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;