import React, { useState } from 'react';
import {
    Download,
    Filter,
    MessageSquare,
    Calendar,
    Star,
    ArrowRight,
    User
} from 'lucide-react';

const ApplicationsList = ({ onScheduleClick }) => {
    // Dummy Data matching screenshot
    const candidates = [
        {
            id: 1,
            name: "Alexandra Martinez",
            title: "View Profile",
            matchScore: 95,
            filled: 95,
            experience: "8 years, Senior Developer",
            status: "New",
            statusColor: "bg-blue-100 text-blue-700",
            rating: 4.8,
            feedback: "Strong technical skills"
        },
        {
            id: 2,
            name: "David Chan",
            title: "View Profile",
            matchScore: 92,
            filled: 92,
            experience: "7 years, Full Stack Engineer",
            status: "Shortlisted",
            statusColor: "bg-amber-100 text-amber-700",
            rating: 4.5,
            feedback: "Excellent communication"
        },
        {
            id: 3,
            name: "Sarah Johnson",
            title: "View Profile",
            matchScore: 88,
            filled: 88,
            experience: "6 years, Backend Specialist",
            status: "Interview Scheduled",
            statusColor: "bg-purple-100 text-purple-700",
            rating: 4.7,
            feedback: "Great problem-solving"
        },
        {
            id: 4,
            name: "Michael Thompson",
            title: "View Profile",
            matchScore: 85,
            filled: 85,
            experience: "5 years, Software Engineer",
            status: "New",
            statusColor: "bg-blue-100 text-blue-700",
            rating: 4.3,
            feedback: "Good cultural fit"
        },
        {
            id: 5,
            name: "M Basim Irfan",
            title: "View Profile",
            matchScore: 82,
            filled: 82,
            experience: "9 years, Tech Lead",
            status: "Shortlisted",
            statusColor: "bg-amber-100 text-amber-700",
            rating: 4.6,
            feedback: "Leadership Potential"
        },
        {
            id: 6,
            name: "Lisa Anderson",
            title: "View Profile",
            matchScore: 65,
            filled: 65,
            experience: "3 years, Junior Developer",
            status: "New",
            statusColor: "bg-blue-100 text-blue-700",
            rating: 3.9,
            feedback: "Eager to learn",
            scoreColor: "bg-yellow-400" // Custom color for lower score
        },
        {
            id: 7,
            name: "Robert Kim",
            title: "View Profile",
            matchScore: 58,
            filled: 58,
            experience: "6 years, Backend Specialist",
            status: "New",
            statusColor: "bg-blue-100 text-blue-700",
            rating: 3.7,
            feedback: "Growing skillset",
            scoreColor: "bg-gray-500" // Custom color for lowest score
        }
    ];

    const [topK, setTopK] = useState(false);

    return (
        <div className="flex-1 p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Candidate Applications Report</h1>
                <p className="text-gray-500 text-sm mt-1">{candidates.length} candidates found</p>
            </header>

            {/* Filters Bar */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4 items-center flex-1">
                    <div className="w-48">
                        <label className="block text-xs font-bold text-gray-900 mb-1">Status</label>
                        <select className="w-full bg-gray-100 border-none rounded-lg text-sm px-3 py-2 font-medium text-gray-700 focus:ring-2 focus:ring-gray-200">
                            <option>All</option>
                            <option>New</option>
                            <option>Shortlisted</option>
                        </select>
                    </div>
                    <div className="w-48">
                        <label className="block text-xs font-bold text-gray-900 mb-1">Matching Score</label>
                        <select className="w-full bg-gray-100 border-none rounded-lg text-sm px-3 py-2 font-medium text-gray-700 focus:ring-2 focus:ring-gray-200">
                            <option>All</option>
                            <option>&gt; 90%</option>
                            <option>&gt; 80%</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                        <div
                            className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 cursor-pointer ${topK ? 'bg-emerald-500' : ''}`}
                            onClick={() => setTopK(!topK)}
                        >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${topK ? 'translate-x-4' : ''}`}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">Show Top K Candidates Only</span>
                    </div>

                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                        <Download size={16} />
                        Export Data
                    </button>
                </div>
            </div>

            {/* Candidates Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Candidate</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Matching Score</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Experience</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Current Status</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Last Feedback</th>
                            <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {candidates.map((candidate) => (
                            <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <h3 className="text-sm font-bold text-gray-900">{candidate.name}</h3>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5 cursor-pointer hover:text-emerald-600 transition-colors">
                                        {candidate.title} <ArrowRight size={12} />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-sm font-bold ${candidate.scoreColor ? 'text-gray-900' : 'text-emerald-600'}`}>{candidate.matchScore}%</span>
                                        {candidate.matchScore > 80 && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                                    </div>
                                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${candidate.scoreColor || 'bg-emerald-500'}`}
                                            style={{ width: `${candidate.filled}%` }}
                                        ></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-700 font-medium">{candidate.experience}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${candidate.statusColor}`}>
                                        {candidate.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-bold text-gray-900">{candidate.rating}/5</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{candidate.feedback}</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                                            <MessageSquare size={14} />
                                            View Feedback
                                        </button>
                                        <button
                                            className="flex items-center gap-1.5 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
                                            onClick={onScheduleClick}
                                        >
                                            <Calendar size={14} />
                                            Schedule Interview
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsList;
