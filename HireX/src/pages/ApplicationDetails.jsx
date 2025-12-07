import React from 'react';
import Footer from '../components/Footer';
import CandidateNavbar from '../components/CandidateNavbar';

const ApplicationDetails = ({ onNavigate }) => {
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
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ApplicationDetails;
