import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import InterviewerNavbar from '../components/InterviewerNavbar';
import { Calendar, Clock, Video, User, CheckCircle, AlertCircle } from 'lucide-react';

const InterviewCard = ({ interview }) => {
    const app = interview.application || {};
    const candidate = app.applied_by || {};
    return (
        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm">{candidate.full_name || candidate.email}</h3>
                        <p className="text-gray-500 text-xs">{app.applied_for ? app.applied_for.title : 'Application'}</p>
                    </div>
                </div>
                <span className="bg-cyan-400 text-white text-[10px] font-bold px-3 py-1 rounded-full">{interview.date}</span>
            </div>

            <div className="space-y-2 mb-6 text-xs text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-500" />
                    <span>{new Date(interview.date).toLocaleDateString()}</span>
                    <Clock size={16} className="text-blue-500 ml-2" />
                    <span>{new Date(interview.start_time).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Video size={16} className="text-gray-900" />
                    <span>{interview.duration} mins</span>
                </div>
            </div>

            <button className="w-full bg-[#10b981] text-white font-bold py-3 rounded-lg hover:bg-[#059669] transition-colors text-sm">Join Meeting / Prep</button>
        </div>
    );
};

const InterviewerDashboard = ({ onNavigate }) => {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const token = localStorage.getItem('hirex_access');
                const res = await fetch('http://127.0.0.1:8000/jobs/interviews/', { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
                if (!res.ok) throw await res.json();
                const data = await res.json();
                if (mounted) setInterviews(data || []);
            } catch (e) {
                console.error('Failed to load interviews', e);
            }
        };
        load();
        return () => { mounted = false };
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
            <InterviewerNavbar onNavigate={onNavigate} activePage="dashboard" />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                <h1 className="text-xl font-bold text-gray-900 mb-2">My Interview Schedule</h1>
                <p className="text-gray-600 mb-8 text-sm">Manage your upcoming interviews and submit feedback</p>

                {/* Stats Grid */}
                {/* Stats Grid */}
                {(() => {
                    const today = new Date();
                    const weekFromNow = new Date();
                    weekFromNow.setDate(today.getDate() + 7);

                    const upcoming = interviews.filter(i => new Date(i.date) >= today);
                    const past = interviews.filter(i => new Date(i.date) < today);

                    const pendingFeedback = past.filter(i => !i.feedback).length;
                    const completed = past.length; // Or past.filter(i => i.feedback).length if strictly completed = has feedback

                    const thisWeek = interviews.filter(i => {
                        const d = new Date(i.date);
                        return d >= today && d <= weekFromNow;
                    }).length;

                    return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white border boundary-gray-200 rounded-xl p-6 flex justify-between items-start shadow-sm hover:shadow-md transition-shadow">
                                <div>
                                    <p className="font-bold text-gray-900 mb-2 text-sm">Interviews This Week</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{thisWeek}</h3>
                                </div>
                                <Calendar className="text-blue-500" size={28} />
                            </div>

                            <div
                                className="bg-white border-2 border-red-400 rounded-xl p-6 flex justify-between items-start cursor-pointer hover:bg-red-50 transition-colors"
                                onClick={() => onNavigate('interview-feedback')}
                            >
                                <div>
                                    <p className="font-bold text-gray-900 mb-2 text-sm">Pending Feedback</p>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl font-bold text-gray-900">{pendingFeedback}</h3>
                                        <span className="text-red-500 text-xs font-bold bg-white px-2 py-0.5 rounded-full border border-red-200">(Action Required)</span>
                                    </div>
                                </div>
                                <AlertCircle className="text-red-500" size={28} />
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-start shadow-sm hover:shadow-md transition-shadow">
                                <div>
                                    <p className="font-bold text-gray-900 mb-2 text-sm">Total Interviews Completed</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{completed}</h3>
                                </div>
                                <CheckCircle className="text-[#8cc63f]" size={28} />
                            </div>
                        </div>
                    );
                })()}

                {/* Schedule List */}
                {(() => {
                    const today = new Date();
                    const upcoming = interviews.filter(i => new Date(i.date) >= today);
                    const past = interviews.filter(i => new Date(i.date) < today);

                    const [activeTab, setActiveTab] = useState('upcoming');

                    const displayed = activeTab === 'upcoming' ? upcoming : past;

                    return (
                        <div className="border border-gray-200 rounded-2xl p-8 mb-8">
                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={() => setActiveTab('upcoming')}
                                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${activeTab === 'upcoming' ? 'bg-gray-200 text-gray-900' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
                                >
                                    Upcoming ({upcoming.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('past')}
                                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${activeTab === 'past' ? 'bg-gray-200 text-gray-900' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
                                >
                                    Past Interviews ({past.length})
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {displayed.length === 0 ? (
                                    <p className="text-sm text-gray-500">No interviews found</p>
                                ) : (
                                    displayed.map(i => (
                                        <InterviewCard interview={i} key={i.id} />
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })()}
            </main>

            <Footer />
        </div>
    );
};

export default InterviewerDashboard;
