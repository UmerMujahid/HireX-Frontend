import React from 'react';
import Footer from '../components/Footer';
import CandidateNavbar from '../components/CandidateNavbar';
import { Upload } from 'lucide-react';

const CandidateProfile = ({ onNavigate }) => {
    const fileInputRef = React.useRef(null);
    const [formData, setFormData] = React.useState({
        fullName: '',
        phone: '',
        location: '',
        linkedin: ''
    });
    const [resume, setResume] = React.useState(null);

    // Calculate progress
    const calculateProgress = () => {
        let filledCount = 0;
        const totalFields = 5; // 4 text fields + 1 resume

        if (formData.fullName) filledCount++;
        if (formData.phone) filledCount++;
        if (formData.location) filledCount++;
        if (formData.linkedin) filledCount++;
        if (resume) filledCount++;

        return Math.round((filledCount / totalFields) * 100);
    };

    const progress = calculateProgress();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleFileSelectStart = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile Updated Successfully! (This is a demo)');
        // In a real app, you would send formData and resume to the backend here
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
            <CandidateNavbar onNavigate={onNavigate} activePage="profile" />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                <div className="mb-8">
                    <h1 className="text-xl font-bold text-gray-900">Complete your HireX profile</h1>
                    <p className="text-gray-600 text-sm">A comprehensive profile increases your AI Matching score and job opportunities</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-2 font-bold text-gray-400 text-xs">
                        <span>Profile Completion</span>
                        <span className={`text-blue-500 transition-all duration-500`}>{progress}% Complete</span>
                    </div>
                    <div className="w-full bg-white h-4 rounded-full overflow-hidden">
                        <div
                            className="bg-black h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Resume Upload */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                    <h2 className="text-base font-bold text-gray-400 mb-4">Upload Your Resume</h2>
                    <div
                        className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl py-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-200/80 transition-colors mx-auto max-w-3xl"
                        onClick={handleFileSelectStart}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />
                        {resume ? (
                            <div className="flex flex-col items-center">
                                <span className="text-gray-900 font-bold mb-2 text-base">{resume.name}</span>
                                <span className="text-green-600 font-medium text-sm">Ready to upload</span>
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-500 mb-1 text-sm">Drag and drop your resume here , or click to browse</p>
                                <p className="text-gray-500 text-xs mb-6">PDF or DOCX files only</p>
                                <button type="button" className="bg-[#8cc63f] text-white font-bold py-2 px-8 rounded-lg hover:bg-[#7ab332] transition-colors text-sm">
                                    Select file
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                    <h2 className="text-base font-bold text-gray-400 mb-6">Contact and Basic Information</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="bg-gray-200 rounded-lg p-3 font-bold text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] w-full text-sm"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone no"
                            className="bg-gray-200 rounded-lg p-3 font-bold text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] w-full text-sm"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Current Location"
                            className="bg-gray-200 rounded-lg p-3 font-bold text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] w-full text-sm"
                        />
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            placeholder="LinkedIn profile URL"
                            className="bg-gray-200 rounded-lg p-3 font-bold text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] w-full text-sm"
                        />
                    </form>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end max-w-full mx-auto mb-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-black text-white font-bold py-3 px-10 rounded-xl text-base hover:opacity-90 shadow-lg transform active:scale-95 transition-all"
                    >
                        Submit Profile
                    </button>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default CandidateProfile;
