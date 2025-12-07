import React from 'react';
import Footer from '../components/Footer';
import InterviewerNavbar from '../components/InterviewerNavbar';
import { Calendar, Clock, Video, User, CheckCircle, AlertCircle } from 'lucide-react';

const InterviewerDashboard = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
            <InterviewerNavbar onNavigate={onNavigate} activePage="dashboard" />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Interview Schedule</h1>
                <p className="text-gray-600 mb-8">Manage your upcoming interviews and submit feedback</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white border boundary-gray-200 rounded-xl p-6 flex justify-between items-start shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <p className="font-bold text-gray-900 mb-2">Interviews This Week</p>
                            <h3 className="text-3xl font-bold text-gray-900">4</h3>
                        </div>
                        <Calendar className="text-blue-500" size={28} />
                    </div>

                    <div
                        className="bg-white border-2 border-red-400 rounded-xl p-6 flex justify-between items-start cursor-pointer hover:bg-red-50 transition-colors"
                        onClick={() => onNavigate('interview-feedback')}
                    >
                        <div>
                            <p className="font-bold text-gray-900 mb-2">Pending Feedback</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-3xl font-bold text-gray-900">2</h3>
                                <span className="text-red-500 text-sm font-bold bg-white px-2 py-0.5 rounded-full border border-red-200">(Action Required)</span>
                            </div>
                        </div>
                        <AlertCircle className="text-red-500" size={28} />
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-start shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <p className="font-bold text-gray-900 mb-2">Total Interviews Completed</p>
                            <h3 className="text-3xl font-bold text-gray-900">5</h3>
                        </div>
                        <CheckCircle className="text-[#8cc63f]" size={28} />
                    </div>
                </div>

                {/* Schedule List */}
                <div className="border border-gray-200 rounded-2xl p-8 mb-8">
                    <div className="flex gap-4 mb-8">
                        <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Upcoming (4)</button>
                        <button className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 hover:text-gray-900 transition-colors">Past Interviews (5)</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Sarah Martinez</h3>
                                        <p className="text-gray-500 text-sm">Product Designer</p>
                                    </div>
                                </div>
                                <span className="bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full">Upcoming</span>
                            </div>

                            <div className="space-y-2 mb-6 text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-500" />
                                    <span>Nov 14, 2025</span>
                                    <Clock size={16} className="text-blue-500 ml-2" />
                                    <span>10:00 AM</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video size={16} className="text-gray-900" />
                                    <span>Portfolio Review</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#10b981] text-white font-bold py-3 rounded-lg hover:bg-[#059669] transition-colors">
                                Join Meeting / Prep
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Emily Watson</h3>
                                        <p className="text-gray-500 text-sm">Full Stack Engineer</p>
                                    </div>
                                </div>
                                <span className="bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full">Upcoming</span>
                            </div>

                            <div className="space-y-2 mb-6 text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-500" />
                                    <span>Dec 14, 2025</span>
                                    <Clock size={16} className="text-blue-500 ml-2" />
                                    <span>9:00 AM</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video size={16} className="text-gray-900" />
                                    <span>System Design Interview</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#10b981] text-white font-bold py-3 rounded-lg hover:bg-[#059669] transition-colors">
                                Join Meeting / Prep
                            </button>
                        </div>

                        {/* Card 3 */}
                        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">David Kim</h3>
                                        <p className="text-gray-500 text-sm">Data Scientist</p>
                                    </div>
                                </div>
                                <span className="bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full">Upcoming</span>
                            </div>

                            <div className="space-y-2 mb-6 text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-500" />
                                    <span>Nov 4, 2025</span>
                                    <Clock size={16} className="text-blue-500 ml-2" />
                                    <span>11:00 AM</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video size={16} className="text-gray-900" />
                                    <span>Technical Review</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#10b981] text-white font-bold py-3 rounded-lg hover:bg-[#059669] transition-colors">
                                Join Meeting / Prep
                            </button>
                        </div>

                        {/* Card 4 */}
                        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Martines Jessica</h3>
                                        <p className="text-gray-500 text-sm">Marketing Manager</p>
                                    </div>
                                </div>
                                <span className="bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full">Upcoming</span>
                            </div>

                            <div className="space-y-2 mb-6 text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-500" />
                                    <span>Aug 14, 2025</span>
                                    <Clock size={16} className="text-blue-500 ml-2" />
                                    <span>8:00 AM</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video size={16} className="text-gray-900" />
                                    <span>Behavioral Interview</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#10b981] text-white font-bold py-3 rounded-lg hover:bg-[#059669] transition-colors">
                                Join Meeting / Prep
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InterviewerDashboard;
