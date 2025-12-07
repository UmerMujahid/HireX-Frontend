import React from 'react';
import Footer from '../components/Footer';
import CandidateNavbar from '../components/CandidateNavbar';
import { Upload } from 'lucide-react';

const CandidateProfile = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
            <CandidateNavbar onNavigate={onNavigate} activePage="profile" />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Complete your HireX profile</h1>
                    <p className="text-gray-600">A comprehensive profile increases your AI Matching score and job opportunities</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-2 font-bold text-gray-400 text-sm">
                        <span>Profile Completion</span>
                        <span className="text-blue-500">60% Complete</span>
                    </div>
                    <div className="w-full bg-white h-4 rounded-full overflow-hidden">
                        <div className="bg-black h-full w-[60%] rounded-full"></div>
                    </div>
                </div>

                {/* Resume Upload */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                    <h2 className="text-lg font-bold text-gray-400 mb-4">Upload Your Resume</h2>
                    <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl py-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-200/80 transition-colors mx-auto max-w-3xl">
                        <p className="text-gray-500 mb-1">Drag and drop your resume here , or click to browse</p>
                        <p className="text-gray-500 text-sm mb-6">PDF or DOCX files only</p>
                        <button className="bg-[#8cc63f] text-white font-bold py-2 px-8 rounded-lg hover:bg-[#7ab332] transition-colors">
                            Select file
                        </button>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                    <h2 className="text-lg font-bold text-gray-400 mb-6">Contact and Basic Information</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            className="bg-gray-200 rounded-lg p-4 font-bold text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] w-full"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone no"
                            className="bg-gray-200 rounded-lg p-4 font-bold text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] w-full"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Current Location"
                            className="bg-gray-200 rounded-lg p-4 font-bold text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] w-full"
                        />
                        <input
                            type="url"
                            name="linkedin"
                            placeholder="LinkedIn profile URL"
                            className="bg-gray-200 rounded-lg p-4 font-bold text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] w-full"
                        />
                    </form>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default CandidateProfile;
