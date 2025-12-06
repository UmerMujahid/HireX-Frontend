import React from 'react';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';
import { Users, Briefcase, TrendingUp, Cpu, ClipboardCheck, BarChart3, Clock } from 'lucide-react';

import landingCollaboration from '../assets/landing-collaboration.png';

const LandingPage = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to HireX
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                    Your trusted platform for effecient and successful recruitment services
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                    {/* HR Manager Card */}
                    <div className="bg-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center text-center h-full">
                        <h3 className="text-xl font-bold mb-3">For HR Managers</h3>
                        <p className="text-sm text-gray-600 mb-6 flex-grow">
                            Access tools and analytics to streamline your hiring process
                        </p>
                        <Button variant="dark">Learn More</Button>
                    </div>

                    {/* Central Illustration Area */}
                    <div className="flex justify-center py-8 md:py-0">
                        <img
                            src={landingCollaboration}
                            alt="Collaboration"
                            className="w-40 md:w-56 object-contain"
                        />
                    </div>

                    {/* Candidates Card */}
                    <div className="bg-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center text-center h-full">
                        <h3 className="text-xl font-bold mb-3">For Candidates</h3>
                        <p className="text-sm text-gray-600 mb-6 flex-grow">
                            Find Job oppurtunities that match your skills and aspirations
                        </p>
                        <Button variant="dark">Learn More</Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold mb-2">Intelligent Automation For Modern Hiring</h2>
                    <p className="text-gray-600">
                        HireX combines cutting edge AI with intuitive desgin to transform your recruiting process
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="border border-gray-400 rounded-xl p-6">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                            <Cpu className="text-gray-900" size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">AI Powered Candidate Matching</h3>
                        <p className="text-gray-600 text-sm">
                            Stop manual screening. Get Intelligent algorithms to rank the candidates instantly
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="border border-gray-400 rounded-xl p-6">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                            <ClipboardCheck className="text-gray-900" size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Streamlined Application Managment</h3>
                        <p className="text-gray-600 text-sm">
                            Manage Job postings, schedule interviews, and track application status- all in one place
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="border border-gray-400 rounded-xl p-6">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                            <TrendingUp className="text-gray-900" size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Data Driven Decisions</h3>
                        <p className="text-gray-600 text-sm">
                            Access data driven interviewer and candidate feedback analysis for hiring
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-200 py-20 text-center mb-16">
                <h2 className="text-2xl font-bold mb-12">Start Your Next Career Move</h2>

                <div className="flex flex-col md:flex-row justify-center gap-12 mb-12">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                            <Briefcase size={24} />
                        </div>
                        <span className="text-xs font-medium">Smart Job Matching</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                            <Clock size={24} />
                        </div>
                        <span className="text-xs font-medium">One-Click Applications</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                            <BarChart3 size={24} />
                        </div>
                        <span className="text-xs font-medium">Application Insights</span>
                    </div>
                </div>

                <Button variant="primary" size="lg" className="px-12 font-bold" onClick={() => onNavigate('get-started')}>
                    Browse More
                </Button>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
