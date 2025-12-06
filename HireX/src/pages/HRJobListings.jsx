import React, { useState } from 'react';
import { Users } from 'lucide-react';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';

const HRJobListings = ({ onNavigate }) => {
    // Custom Top Navbar Component
    const TopNavbar = () => (
        <nav className="bg-white py-4 shadow-sm relative z-20">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo - Navigates Home */}
                <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => onNavigate('home')} 
                >
                    <Users className="text-gray-900" size={28} strokeWidth={2.5} />
                    <span className="text-xl font-bold text-gray-900">HireX</span>
                </div>

                {/* Nav Links - Interactivity Added */}
                <div className="flex items-center space-x-8">
                    <button 
                        onClick={() => onNavigate('hr-dashboard')}
                        className="font-bold text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Dashboard
                    </button>
                    <button className="font-bold text-[#a3e635] hover:text-[#84cc16] transition-colors">
                        Job Listings
                    </button>
                    <button 
                        onClick={() => onNavigate('hr-interviews')}
                        className="font-bold text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Interviews
                    </button>
                    <button 
                        onClick={() => onNavigate('hr-reports')}
                        className="font-bold text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Reports
                    </button>
                </div>
            </div>
        </nav>
    );

    // Job Data
    const jobs = [
        {
            title: "Software Engineer",
            description: "Join our team to help build better, smarter, and more reliable software that impacts real users."
        },
        {
            title: "Data Analyst",
            description: "Join our team to help uncover deeper insights through data and drive intelligent decision-making."
        },
        {
            title: "Electrical Engineer",
            description: "Join our team to help engineer efficient, powerful, and dependable electrical systems for the future."
        }
    ];

    // Filter Items
    const filters = [
        "Data science",
        "Finance",
        "HealthCare",
        "Engineering",
        "Remote"
    ];

    // STATE
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    // HANDLERS
    const toggleFilter = (filter) => {
        setSelectedFilters(prev => 
            prev.includes(filter) 
                ? prev.filter(f => f !== filter) 
                : [...prev, filter]
        );
    };

    const handleSaveJob = () => {
        setShowNotification(true);
    };

    const handleViewToDashboard = () => {
        onNavigate('hr-dashboard'); // Moves to main HR dashboard
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900 relative">
            <TopNavbar />

            <div className="flex-1 max-w-7x w-full"> 
                 <div className="flex min-h-[calc(100vh-64px)]">
                    {/* Sidebar */}
                    <aside className="w-64 bg-[#e5e7eb] pt-8 pl-8 pr-4 hidden md:block border-r border-gray-300">
                         <h2 className="text-2xl font-normal text-gray-600 mb-8">Filters</h2>
                         <div className="space-y-6">
                            {filters.map((filter) => (
                                <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 bg-white border border-gray-300 flex items-center justify-center transition-colors ${selectedFilters.includes(filter) ? 'bg-white' : 'bg-white'}`}>
                                        {selectedFilters.includes(filter) && <div className="w-3 h-3 bg-gray-600" />}
                                    </div>
                                    <span className="text-lg text-gray-900 font-normal">{filter}</span>
                                    <input 
                                        type="checkbox" 
                                        className="hidden" 
                                        checked={selectedFilters.includes(filter)}
                                        onChange={() => toggleFilter(filter)}
                                    />
                                </label>
                            ))}
                         </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-12 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {jobs.map((job, index) => (
                                <Card key={index} className="flex flex-col h-full !p-8 !rounded-lg !shadow-sm !border-none !bg-white">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{job.title}</h3>
                                    <p className="text-gray-900 text-lg leading-relaxed flex-grow mb-8">
                                        {job.description}
                                    </p>
                                    <Button 
                                        variant="primary" 
                                        className="w-full !bg-[#9cc960] hover:!bg-[#8bbd50] !text-white !font-medium !rounded-md !h-10"
                                        onClick={handleSaveJob}
                                    >
                                        Save Job
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </main>
                 </div>
            </div>

            {/* Notification Popup Modal - Styled as per Screenshot */}
            {showNotification && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm transition-opacity" onClick={() => setShowNotification(false)}>
                    <div className="bg-white rounded-lg shadow-2xl p-10 max-w-md w-full transform transition-all scale-100 flex flex-col items-center justify-center min-h-[300px]" onClick={e => e.stopPropagation()}>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-sm">Job saved successfully</h3>
                        <button 
                            onClick={handleViewToDashboard}
                            // Button styled green, navigates to dashboard
                            className="w-full max-w-xs py-3 bg-[#a3e635] text-white rounded-md font-bold text-lg hover:bg-[#84cc16] transition-colors shadow-sm"
                        >
                            View In Job Postings
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default HRJobListings;
