import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PostJob = ({ onCancel, onPosted }) => {
    const [jobType, setJobType] = useState('Full-Time');
    const [matchScore, setMatchScore] = useState(70);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useAuth() || {};
    const { accessToken } = auth;
    const [skillsList, setSkillsList] = useState([]);
    const [selectedSkillIds, setSelectedSkillIds] = useState([]);
    const [newSkillName, setNewSkillName] = useState('');
    const [deadline, setDeadline] = useState('');

    const publishJob = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/jobs/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
                },
                body: JSON.stringify({ title, description, is_active: true, skill_ids: selectedSkillIds, deadline: deadline || null })
            });
            let data = null;
            try {
                data = await res.json();
            } catch (e) {
                // response had no json
            }
            if (!res.ok) throw data || { detail: 'Failed to post job' };
            if (onPosted) onPosted(data);
            alert('Job posted successfully');
            if (onCancel) onCancel();
        } catch (err) {
            console.error(err);
            alert('Failed to post job: ' + (err?.detail || JSON.stringify(err)));
        } finally {
            setLoading(false);
        }
    };

    // load existing skills
    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/jobs/skill/');
                if (!res.ok) return;
                const data = await res.json();
                if (mounted) setSkillsList(data || []);
            } catch (e) {
                console.error('Failed to load skills', e);
            }
        };
        load();
        return () => { mounted = false };
    }, []);

    const handleToggleSkill = (id) => {
        setSelectedSkillIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        const name = newSkillName.trim();
        if (!name) return;
        try {
            const res = await fetch('http://127.0.0.1:8000/jobs/skill/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
                body: JSON.stringify({ name })
            });
            const data = await res.json();
            if (!res.ok) throw data;
            setSkillsList((s) => [...s, data]);
            setSelectedSkillIds((s) => [...s, data.id]);
            setNewSkillName('');
        } catch (err) {
            console.error('Failed to add skill', err);
            alert('Failed to add skill: ' + (err?.detail || JSON.stringify(err)));
        }
    };

    return (
        <div className="flex-1 p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create Job Posting</h1>
                <p className="text-gray-500 text-sm mt-1">Fill in the details below to post a new job opening</p>
            </header>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <div className="mb-8 pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Job Posting Details</h2>
                    <p className="text-sm text-gray-500">Basic information about the position</p>
                </div>

                <div className="space-y-6">
                    {/* Job Title */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Job Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="e.g. Senior Frontend Developer"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Location</label>
                        <input
                            type="text"
                            placeholder="Select location"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Job Type</label>
                        <div className="space-y-2">
                            {['Full-Time', 'Part-Time', 'Contract'].map((type) => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${jobType === type ? 'border-emerald-500' : 'border-gray-300'}`}>
                                        {jobType === type && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                                    </div>
                                    <input
                                        type="radio"
                                        name="jobType"
                                        className="hidden"
                                        checked={jobType === type}
                                        onChange={() => setJobType(type)}
                                    />
                                    <span className="text-sm font-medium text-gray-700">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Job Description */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Job Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                        ></textarea>
                    </div>

                    {/* Hiring Manager - Note: Label says "Job Description" in mockup but content is "Select hiring manager" */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Hiring Manager</label>
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer">
                            <option value="">Select hiring manager</option>
                            <option value="sarah">Sarah Martinez</option>
                            <option value="alex">Alex Chen</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mt-6">
                <div className="mb-8 pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Key Requirements</h2>
                    <p className="text-sm text-gray-500">Define qualifications and AI matching criteria</p>
                </div>

                <div className="space-y-6">
                    {/* Experience Level */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Experience Level</label>
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer">
                            <option value="">Select experience level</option>
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior Level</option>
                        </select>
                    </div>

                    {/* Required Skills */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Required Skills</label>
                        <div className="mb-2">
                            <div className="flex flex-wrap gap-2">
                                {selectedSkillIds.length === 0 && <p className="text-sm text-gray-500">No skills selected</p>}
                                {selectedSkillIds.map((id) => {
                                    const s = skillsList.find((x) => x.id === id);
                                    return (
                                        <span key={id} className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">
                                            {s ? s.name : 'skill'}
                                            <button type="button" onClick={() => handleToggleSkill(id)} className="ml-1 text-emerald-600 font-bold">×</button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mb-3">
                            <form onSubmit={handleAddSkill} className="flex gap-2">
                                <input
                                    value={newSkillName}
                                    onChange={(e) => setNewSkillName(e.target.value)}
                                    type="text"
                                    placeholder="Add new skill (e.g. React)"
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                />
                                <button type="submit" className="px-3 py-2 bg-emerald-600 text-white rounded-lg">Add</button>
                            </form>
                        </div>

                        <div className="max-h-32 overflow-auto border border-gray-100 rounded p-2 grid grid-cols-2 gap-2">
                            {skillsList.map((skill) => (
                                <label key={skill.id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedSkillIds.includes(skill.id) ? 'bg-emerald-50' : 'bg-white'}`}>
                                    <input type="checkbox" checked={selectedSkillIds.includes(skill.id)} onChange={() => handleToggleSkill(skill.id)} className="w-4 h-4" />
                                    <span className="text-sm text-gray-800">{skill.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Minimum Matching Score */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-gray-900">Minimum Matching Score %</label>
                            <span className="text-sm font-bold text-gray-900">{matchScore}%</span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={matchScore}
                            onChange={(e) => setMatchScore(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700 custom-range"
                        />
                        <style>{`
                            input[type='range'].custom-range::-webkit-slider-thumb {
                                -webkit-appearance: none;
                                appearance: none;
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                background: #ffffff;
                                border: 2px solid #15803d; /* green-700 */
                                cursor: pointer;
                                margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
                                box-shadow: 0 0 2px rgba(0,0,0,0.2);
                            }
                            input[type='range'].custom-range::-webkit-slider-runnable-track {
                                height: 4px;
                                cursor: pointer;
                                background: #15803d;
                                border-radius: 2px;
                            }
                         `}</style>
                        {/* Fallback styling for range input needing custom CSS for partial fill is tricky without a library, 
                             so I'll use a simple colored div overlay approach or just accent color for now. 
                             The accent-green-700 class works well in modern browsers. 
                         */}
                        <p className="text-xs text-gray-500 mt-2">Candidates below the threshold will be filtered out</p>
                    </div>

                    {/* Application Deadline */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Application Deadline</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        </div>
                    </div>
                </div>
            </div>

                <div className="flex justify-end gap-3 mt-8 pb-8">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    Save as Draft
                </button>
                    <button
                        onClick={publishJob}
                        disabled={loading}
                        className="px-4 py-2 bg-[#15803d] text-white font-bold rounded-lg hover:bg-green-800 transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Publishing...' : 'Publish Job'}
                    </button>
            </div>
        </div>
    );
};

export default PostJob;
