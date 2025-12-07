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

const ApplicationsList = ({ onScheduleClick, applications = [] }) => {
    const [topK, setTopK] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localApps, setLocalApps] = useState(applications || []);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
    const [scheduleForm, setScheduleForm] = useState({ application_id: null, interviewer: '', date: '', start_time: '', duration: 60 });
    const [statusEditingId, setStatusEditingId] = useState(null);
    const [statusValue, setStatusValue] = useState('');
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [selectedFeedbackApp, setSelectedFeedbackApp] = useState(null);

    // Keep localApps in sync when prop changes
    React.useEffect(() => {
        setLocalApps(applications || []);
    }, [applications]);

    return (
        <div className="flex-1 p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Candidate Applications Report</h1>
                <p className="text-gray-500 text-sm mt-1">{localApps.length} candidates found</p>
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
                        {localApps.map((candidate) => (
                            <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <h3 className="text-sm font-bold text-gray-900">{candidate.applied_by || candidate.applied_by}</h3>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5 cursor-pointer hover:text-emerald-600 transition-colors">
                                        {candidate.applied_for?.title || 'Job'} <ArrowRight size={12} />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-sm font-bold text-emerald-600`}>{/* placeholder score */}—</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-700 font-medium">{candidate.applied_for?.title || ''}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${candidate.status === 'shortlisted' ? 'bg-amber-100 text-amber-700' : candidate.status === 'interview' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {candidate.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-bold text-gray-900">—/5</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{candidate.description || ''}</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => { setSelectedFeedbackApp(candidate); setFeedbackModalOpen(true); }}
                                            className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
                                        >
                                            <MessageSquare size={14} />
                                            View Feedback
                                        </button>
                                        {candidate.resume ? (
                                            <a href={candidate.resume} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                                                <Download size={14} />
                                                Resume
                                            </a>
                                        ) : null}
                                        <button
                                            className="flex items-center gap-1.5 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
                                            onClick={() => { setScheduleForm({ application_id: candidate.id, interviewer: '', date: '', start_time: '', duration: 60 }); setScheduleModalOpen(true); }}
                                        >
                                            <Calendar size={14} />
                                            Schedule Interview
                                        </button>
                                        <div>
                                            {statusEditingId === candidate.id ? (
                                                <div className="flex items-center gap-2">
                                                    <select value={statusValue} onChange={(e) => setStatusValue(e.target.value)} className="px-2 py-1 border rounded text-xs">
                                                        <option value="pending">pending</option>
                                                        <option value="shortlisted">shortlisted</option>
                                                        <option value="rejected">rejected</option>
                                                        <option value="interview">interview</option>
                                                        <option value="hired">hired</option>
                                                    </select>
                                                    <button onClick={async () => {
                                                        try {
                                                            const token = localStorage.getItem('hirex_access');
                                                            const resp = await fetch(`http://127.0.0.1:8000/jobs/applications/${candidate.id}/status/`, {
                                                                method: 'PUT',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                                                                },
                                                                body: JSON.stringify({ status: statusValue })
                                                            });
                                                            const d = await resp.json();
                                                            if (!resp.ok) throw d;
                                                            setLocalApps(prev => prev.map(p => p.id === d.id ? d : p));
                                                            setStatusEditingId(null);
                                                            alert('Status updated');
                                                        } catch (err) {
                                                            console.error(err);
                                                            alert('Failed to update status: ' + (err?.detail || JSON.stringify(err)));
                                                        }
                                                    }} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs">Save</button>
                                                    <button onClick={() => setStatusEditingId(null)} className="px-2 py-1 border rounded text-xs">Cancel</button>
                                                </div>
                                            ) : (
                                                <button onClick={() => { setStatusEditingId(candidate.id); setStatusValue(candidate.status || 'pending'); }} className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">Update Status</button>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Schedule Modal */}
            {scheduleModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setScheduleModalOpen(false)}>
                    <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-bold mb-4">Schedule Interview</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-bold">Interviewer (email)</label>
                                <input value={scheduleForm.interviewer} onChange={(e) => setScheduleForm({ ...scheduleForm, interviewer: e.target.value })} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="text-sm font-bold">Date</label>
                                <input type="date" value={scheduleForm.date} onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="text-sm font-bold">Start Time</label>
                                <input type="datetime-local" value={scheduleForm.start_time} onChange={(e) => setScheduleForm({ ...scheduleForm, start_time: e.target.value })} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="text-sm font-bold">Duration (minutes)</label>
                                <input type="number" value={scheduleForm.duration} onChange={(e) => setScheduleForm({ ...scheduleForm, duration: Number(e.target.value) })} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button className="px-4 py-2 border rounded" onClick={() => setScheduleModalOpen(false)}>Cancel</button>
                                <button className="px-4 py-2 bg-emerald-600 text-white rounded" onClick={async () => {
                                    try {
                                        const token = localStorage.getItem('hirex_access');
                                        const resp = await fetch('http://127.0.0.1:8000/jobs/schedule-interview/', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                ...(token ? { Authorization: `Bearer ${token}` } : {})
                                            },
                                            body: JSON.stringify(scheduleForm)
                                        });
                                        const d = await resp.json();
                                        if (!resp.ok) throw d;
                                        alert('Interview scheduled');
                                        setScheduleModalOpen(false);
                                    } catch (err) {
                                        console.error(err);
                                        alert('Failed to schedule: ' + (err?.detail || JSON.stringify(err)));
                                    }
                                }}>Schedule</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {feedbackModalOpen && selectedFeedbackApp && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setFeedbackModalOpen(false)}>
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Interview Feedback</h3>
                            <button onClick={() => setFeedbackModalOpen(false)} className="text-gray-500 hover:text-gray-700 font-bold">✕</button>
                        </div>

                        <h4 className="text-md font-bold text-gray-800 mb-2">{selectedFeedbackApp.applied_by}</h4>
                        <p className="text-sm text-gray-500 mb-4">Applied for: {selectedFeedbackApp.applied_for?.title}</p>

                        <div className="space-y-4">
                            {(!selectedFeedbackApp.interviews || selectedFeedbackApp.interviews.length === 0) ? (
                                <div className="text-center py-8 text-gray-400">
                                    <p>No interviews scheduled yet.</p>
                                </div>
                            ) : (
                                selectedFeedbackApp.interviews.map((interview, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase">Interviewer</p>
                                                <p className="font-bold text-sm">{interview.interviewer || 'Unknown'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-gray-500 uppercase">Date</p>
                                                <p className="font-bold text-sm bg-white px-2 py-0.5 rounded border">{interview.date}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 mt-3 pt-3">
                                            {interview.feedback ? (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={16} className={i < interview.feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                                                            ))}
                                                        </div>
                                                        <span className="font-bold text-sm">{interview.feedback.rating}/5</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 italic">"{interview.feedback.feedback}"</p>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-lg">
                                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                                    <span className="text-xs font-bold">Feedback Pending</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-6 text-right">
                            <button className="px-4 py-2 bg-gray-100 font-bold text-gray-700 rounded hover:bg-gray-200" onClick={() => setFeedbackModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationsList;
