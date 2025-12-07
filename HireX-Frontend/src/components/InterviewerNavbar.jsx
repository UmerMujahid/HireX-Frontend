import React, { useState } from 'react';
import { Menu, X, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const InterviewerNavbar = ({ onNavigate, activePage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const auth = useAuth();

    const getLinkClass = (pageName) => {
        const baseClass = "font-medium transition-colors";
        const activeClass = "text-[#8cc63f] font-bold";
        const inactiveClass = "text-gray-900 hover:text-[#8cc63f]";

        // Special mapping if needed, similar to candidate navbar
        const isDashboard = pageName === 'dashboard' && activePage === 'interviewer-dashboard';
        const isFeedback = pageName === 'feedback' && activePage === 'interview-feedback';

        return activePage === pageName || isDashboard || isFeedback ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
    };

    return (
        <nav className="bg-white py-4 border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                        <Users className="text-gray-900" size={28} strokeWidth={2.5} />
                        <span className="text-xl font-bold text-gray-900">HireX</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            className={getLinkClass('dashboard')}
                            onClick={() => onNavigate('interviewer-dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={getLinkClass('assigned')}
                            onClick={() => onNavigate('interviewer-dashboard')} // Scrolls to list or just stays on dashboard
                        >
                            Assigned Interviews
                        </button>
                        <button
                            className={getLinkClass('feedback')}
                            onClick={() => onNavigate('interview-feedback')}
                        >
                            Feedback
                        </button>
                        <button
                            className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition-colors"
                            onClick={() => { auth.logout(); onNavigate('login'); }}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-900 hover:text-[#8cc63f] focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50 py-4 px-4 flex flex-col space-y-4 border-t border-gray-100">
                    <button onClick={() => { onNavigate('interviewer-dashboard'); setIsOpen(false); }} className={getLinkClass('dashboard') + " text-left"}>Dashboard</button>
                    <button onClick={() => { onNavigate('interviewer-dashboard'); setIsOpen(false); }} className={getLinkClass('assigned') + " text-left"}>Assigned Interviews</button>
                    <button onClick={() => { onNavigate('interview-feedback'); setIsOpen(false); }} className={getLinkClass('feedback') + " text-left"}>Feedback</button>
                    <button onClick={() => { auth.logout(); onNavigate('login'); setIsOpen(false); }} className="text-red-500 font-medium text-left flex items-center gap-2">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default InterviewerNavbar;
