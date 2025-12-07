import React, { useState } from 'react';
import { Menu, X, Users } from 'lucide-react';

const CandidateNavbar = ({ onNavigate, activePage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getLinkClass = (pageName) => {
        const baseClass = "font-medium transition-colors";
        const activeClass = "text-[#8cc63f] font-bold";
        const inactiveClass = "text-gray-900 hover:text-[#8cc63f]";

        // Special mapping for main dashboard since it might be accessed via 'candidate-dashboard' or other keys if we had them
        const isDashboard = pageName === 'dashboard' && activePage === 'candidate-dashboard';
        const isProfile = pageName === 'profile' && activePage === 'candidate-profile';

        return activePage === pageName || isDashboard || isProfile ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
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
                            onClick={() => onNavigate('candidate-dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={getLinkClass('profile')}
                            onClick={() => onNavigate('candidate-profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={getLinkClass('about')}
                            onClick={() => onNavigate('about')}
                        >
                            About Us
                        </button>
                        <button
                            className={getLinkClass('contact')}
                            onClick={() => onNavigate('contact')}
                        >
                            Contact Us
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
                    <button onClick={() => { onNavigate('candidate-dashboard'); setIsOpen(false); }} className={getLinkClass('dashboard') + " text-left"}>Dashboard</button>
                    <button onClick={() => { onNavigate('candidate-profile'); setIsOpen(false); }} className={getLinkClass('profile') + " text-left"}>Profile</button>
                    <button onClick={() => { onNavigate('about'); setIsOpen(false); }} className={getLinkClass('about') + " text-left"}>About Us</button>
                    <button onClick={() => { onNavigate('contact'); setIsOpen(false); }} className={getLinkClass('contact') + " text-left"}>Contact Us</button>
                </div>
            )}
        </nav>
    );
};

export default CandidateNavbar;
