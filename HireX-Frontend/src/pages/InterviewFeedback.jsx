import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import InterviewerNavbar from '../components/InterviewerNavbar';
import { CheckCircle } from 'lucide-react';

const InterviewFeedback = ({ onNavigate }) => {
    const [interviews, setInterviews] = useState([]);
    const [selected, setSelected] = useState(null);
    const [technicalScore, setTechnicalScore] = useState(4);
    const [communicationScore, setCommunicationScore] = useState(4);
    const [problemSolvingScore, setProblemSolvingScore] = useState(4);
    const [comments, setComments] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const token = localStorage.getItem('hirex_access');
                const res = await fetch('http://127.0.0.1:8000/jobs/interviews/', { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
                if (!res.ok) throw new Error('Failed to load interviews');
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
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col relative">
            <InterviewerNavbar onNavigate={onNavigate} activePage="feedback" />

            {/* Success Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-sm w-full transform scale-100 transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="text-[#5a9c42] w-20 h-20" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-900">
                            Feedback Submitted
                        </h2>
                        <p className="text-gray-500 mb-8 text-sm">
                            Your feedback has been successfully recorded.
                        </p>

                        <button
                            className="w-full bg-[#5a9c42] text-white font-bold py-3 rounded-xl hover:bg-[#4a8535] transition-colors text-sm"
                            onClick={() => onNavigate('interviewer-dashboard')}
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row flex-grow w-full max-w-7xl mx-auto">

                {/* Left Sidebar: Candidates */}
                <aside className="w-full md:w-80 bg-white p-6 border-r border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Interviews</h2>
                    <div className="space-y-4">
                        {interviews.map((iv) => (
                            <div key={iv.id} onClick={() => setSelected(iv)} className={`p-4 rounded-xl cursor-pointer transition-colors ${selected && selected.id === iv.id ? 'bg-green-100 border border-green-200' : 'bg-green-50 border border-green-100 hover:bg-green-100'}`}>
                                <h3 className="font-bold text-gray-900 text-sm">{iv.application?.applied_by || 'Candidate'}</h3>
                                <p className="text-xs font-bold text-gray-700">Position: {iv.application?.applied_for?.title || ''}</p>
                                <p className="text-xs text-gray-500 mt-1">Interview Date: {iv.date}</p>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content: Right Side Form */}
                <main className="flex-1 p-8 bg-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Provide Feedback</h2>

                    <div className="bg-white rounded-xl p-8 shadow-sm">

                        {/* Sliders */}
                        <div className="space-y-8 mb-10">
                            {/* Technical Skills */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="font-bold text-gray-900 text-sm">Technical Skills</label>
                                </div>
                                <input type="range" min="0" max="5" value={technicalScore} onChange={(e) => setTechnicalScore(Number(e.target.value))} className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-[#5a9c42]" />
                            </div>

                            {/* Communication Skills */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="font-bold text-gray-900 text-sm">Communication Skills</label>
                                </div>
                                <input type="range" min="0" max="5" value={communicationScore} onChange={(e) => setCommunicationScore(Number(e.target.value))} className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-[#5a9c42]" />
                            </div>

                            {/* Problem Solving */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="font-bold text-gray-900 text-sm">Problem Solving</label>
                                </div>
                                <input type="range" min="0" max="5" value={problemSolvingScore} onChange={(e) => setProblemSolvingScore(Number(e.target.value))} className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-[#5a9c42]" />
                            </div>
                        </div>
                        {/* Comments */}
                        <div className="mb-8">
                            <label className="block font-bold text-gray-900 mb-2 text-sm">Comments</label>
                            <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="w-full bg-gray-100 border-none rounded-xl p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#5a9c42] text-sm"></textarea>
                        </div>

                        {/* Submit Button */}
                        <button className="bg-[#5a9c42] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#4a8535] transition-colors text-sm" onClick={async () => {
                            if (!selected) return alert('Select an interview from the left');
                            try {
                                const token = localStorage.getItem('hirex_access');
                                const rating = Math.round((technicalScore + communicationScore + problemSolvingScore) / 3);
                                const res = await fetch(`http://127.0.0.1:8000/jobs/interviews/${selected.id}/feedback/`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
                                    body: JSON.stringify({ feedback: comments, rating })
                                });
                                const data = await res.json();
                                if (!res.ok) throw data;
                                setShowModal(true);
                            } catch (e) {
                                console.error('Failed to submit feedback', e);
                                alert('Failed to submit feedback');
                            }
                        }}>Submit Feedback</button>

                    </div>
                </main>

            </div>

            <Footer />
        </div>
    );
};

export default InterviewFeedback;
