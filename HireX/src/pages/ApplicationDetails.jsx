import React from 'react';
import Footer from '../components/Footer';
import CandidateNavbar from '../components/CandidateNavbar';
import ApplyJob from '../components/ApplyJob';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Read jobId from URL query param (?jobId=) or from localStorage fallback
const resolveJobIdFromUrlOrStorage = () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('jobId');
        if (id) return Number(id);
    } catch (e) {}
    const stored = localStorage.getItem('hirex_selected_job');
    if (stored) try { return Number(stored); } catch (e) {}
    return null;
}

const ApplicationDetails = ({ onNavigate }) => {
    const params = useParams();
    const paramJobId = params.jobId ? Number(params.jobId) : null;
    const [jobId, setJobId] = useState(paramJobId || resolveJobIdFromUrlOrStorage());

    // If a jobId is present, try to fetch the job to verify it exists
    useEffect(() => {
        let mounted = true;
        const load = async () => {
            if (!jobId) {
                // fallback: try to load first job
                try {
                    const res = await fetch('http://127.0.0.1:8000/jobs/');
                    if (!res.ok) return;
                    const data = await res.json();
                    if (mounted && Array.isArray(data) && data.length) setJobId(data[0].id);
                } catch (e) {
                    console.error('Failed to load jobs', e);
                }
                return;
            }

            try {
                const res = await fetch(`http://127.0.0.1:8000/jobs/${jobId}/`);
                if (!res.ok) {
                    // invalid id -> clear
                    setJobId(null);
                    return;
                }
                const data = await res.json();
                // persist selection for cross-page navigation
                localStorage.setItem('hirex_selected_job', String(jobId));
            } catch (e) {
                console.error('Failed to verify job', e);
            }
        };
        load();
        return () => { mounted = false };
    }, [jobId]);
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
            <CandidateNavbar onNavigate={onNavigate} activePage="dashboard" />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex justify-center">
                <div className="bg-gray-50 rounded-xl p-10 max-w-4xl w-full">
                    <h1 className="text-xl font-bold text-gray-900 text-center mb-6">UX/UI Designer – Join Our Team</h1>

                    <div className="mb-8 text-sm">
                        <p className="font-bold text-gray-900">Company: <span className="font-normal">HireX Technologies</span></p>
                        <p className="font-bold text-gray-900">Location: <span className="font-normal">Lahore, Pakistan (Hybrid / Remote Options)</span></p>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                        We are looking for a creative and detail-oriented UX/UI Designer to help us build intuitive, modern, and user-focused digital experiences.
                    </p>

                    <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-2 text-base">Responsibilities</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                            <li>Design clean and user-friendly interfaces</li>
                            <li>Create wireframes, prototypes, and flows</li>
                            <li>Maintain consistency using design systems</li>
                            <li>Collaborate with developers and product teams</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-2 text-base">Requirements</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                            <li>Strong skills in Figma and UI/UX principles</li>
                            <li>A portfolio showing previous work</li>
                            <li>Good understanding of user-centered design</li>
                        </ul>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-bold text-gray-900 mb-4 text-base">Apply for this job</h3>
                        {jobId ? <ApplyJob jobId={jobId} onApplied={(d) => { alert('Applied successfully'); console.log(d); }} /> : <p>Loading application form…</p>}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ApplicationDetails;
