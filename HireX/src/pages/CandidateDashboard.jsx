import React from 'react';
import { Lightbulb, Search } from 'lucide-react';
import Footer from '../components/Footer';
import CandidateNavbar from '../components/CandidateNavbar';

const CandidateDashboard = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
            <CandidateNavbar onNavigate={onNavigate} activePage="candidate-dashboard" />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                {/* Header is implicitly handled by Navbar, but we might want a page title if needed, 
                    though the design shows just the content. I'll add the faded text if it's part of the design 
                    or just stick to the main content. The design shows "Candidate Dashboard (Umer Karamat)" 
                    faded at the top in my previous attempt, but let's stick closer to the clean white look 
                    of the provided screenshot which has the navbar and then content. 
                */}

                {/* New Opportunities Banner */}
                <div className="bg-gray-50 rounded-xl p-8 mb-10 flex flex-col md:flex-row items-start gap-6 mt-4">
                    <div className="mt-1">
                        <Lightbulb size={40} className="text-gray-900" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">New Opportunities</h2>
                        <p className="text-gray-700 leading-relaxed max-w-4xl">
                            Welcome ! Explore new job listings tailored for you , and streamline your application process with our AI-driven features.
                            Get ready to elevate your career.
                        </p>
                    </div>
                </div>

                {/* Current Section */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Current</h2>
                    <div className="relative max-w-sm mb-8">
                        <input
                            type="text"
                            placeholder="Search Applications"
                            className="w-full bg-gray-50 border-none rounded-lg py-3 pl-4 pr-10 text-gray-700 focus:ring-2 focus:ring-[#8cc63f] focus:outline-none"
                        />
                        <Search className="absolute right-3 top-3 text-gray-500" size={20} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Card 1: Job Application */}
                    <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center text-center pb-6">
                        <div className="w-full text-left mb-4">
                            <h3 className="text-xl font-bold text-gray-900">UX Designer Position</h3>
                            <p className="text-gray-700 text-base">Full time,3 days left</p>
                            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                                Join our team to shape user experience that matters.
                            </p>
                        </div>
                        <div className="w-full border-t border-gray-300 my-4"></div>
                        <button
                            onClick={() => onNavigate('application-details')}
                            className="bg-[#8cc63f] text-white font-bold py-2 px-8 rounded-lg hover:bg-[#7ab332] transition-colors mt-2"
                        >
                            View More
                        </button>
                    </div>

                    {/* Card 2: Interview */}
                    <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center text-center pb-6">
                        <div className="w-full text-left mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Interview with Umer Karamat</h3>
                            <p className="text-gray-700 text-base">Virtual Meeting , 45 mins</p>
                            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                                Weekly sync-up
                            </p>
                        </div>
                        <div className="w-full border-t border-gray-300 my-4"></div>
                        <button className="bg-[#8cc63f] text-white font-bold py-2 px-8 rounded-lg hover:bg-[#7ab332] transition-colors mt-2">
                            View Details
                        </button>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default CandidateDashboard;
