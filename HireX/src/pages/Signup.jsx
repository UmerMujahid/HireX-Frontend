import React, { useState } from 'react';
import Footer from '../components/Footer';
import AuthSidebar from '../components/AuthSidebar';
import { Eye, EyeOff, Briefcase, User } from 'lucide-react';

const Signup = ({ onNavigate }) => {
    const [role, setRole] = useState('hr'); // Default to HR Manager as per screenshot
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col relative">

            {/* Success Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-lg w-full transform scale-100 transition-all border border-gray-900 mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-4xl font-bold mb-8 leading-tight text-gray-900">
                            Account Creation <br /> Successfull
                        </h2>

                        <button
                            className="w-full font-bold py-4 rounded-xl text-xl hover:opacity-90 transition-opacity text-gray-900 shadow-md transform hover:scale-[1.02] transition-transform"
                            style={{ backgroundColor: '#a3e635' }}
                            onClick={() => onNavigate(role === 'candidate' ? 'candidate-dashboard' : 'hr-dashboard')}
                        >
                            Continue To Dashboard
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                    {/* Left Column: Marketing Info (Reusable) */}
                    <AuthSidebar onNavigate={onNavigate} />

                    {/* Right Column: Sign Up Form */}
                    <div className="flex-1 w-full max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-8 md:p-10">

                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold mb-2">Start Your Hiring Revolution</h2>
                                <p className="text-gray-500">Create your account and get started today</p>
                            </div>

                            {/* Role Selector */}
                            <div className="flex items-center justify-between gap-2 mb-6">
                                <span className="text-sm font-bold text-gray-900 whitespace-nowrap">I am a</span>

                                <button
                                    onClick={() => setRole('hr')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all flex-1 h-20 ${role === 'hr' ? 'bg-cyan-100 border-cyan-400 text-gray-900' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    <Briefcase size={20} className={`mb-1 ${role === 'hr' ? 'text-[#00bbd3]' : 'text-gray-400'}`} />
                                    <span className="text-xs font-bold text-center leading-tight">HR Manager</span>
                                </button>

                                <button
                                    onClick={() => setRole('candidate')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all flex-1 h-20 ${role === 'candidate' ? 'bg-cyan-100 border-cyan-400 text-gray-900' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    <User size={20} className={`mb-1 ${role === 'candidate' ? 'text-[#00bbd3]' : 'text-gray-400'}`} />
                                    <span className="text-xs font-bold text-center leading-tight">Candidate</span>
                                </button>

                                <button
                                    onClick={() => setRole('interviewer')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all flex-1 h-20 ${role === 'interviewer' ? 'bg-cyan-100 border-cyan-400 text-gray-900' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    <Briefcase size={20} className={`mb-1 ${role === 'interviewer' ? 'text-[#00bbd3]' : 'text-gray-400'}`} />
                                    <span className="text-xs font-bold text-center leading-tight">Interviewer</span>
                                </button>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Full Name"
                                        className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="name@gmail.com"
                                        className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                                    />
                                </div>

                                {/* Company Name - Show for HR and Interviewer */}
                                {role !== 'candidate' && (
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="Limited Inc."
                                            className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Re-Enter your password"
                                            className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary" required />
                                    </div>
                                    <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">
                                        I agree to the <a href="#" className="text-cyan-400 hover:underline">Terms Of Service</a> and <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all mt-2"
                                    style={{ backgroundColor: '#00bbd3' }}
                                >
                                    Create Account
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm font-bold text-gray-900">
                                Already have an account? <button onClick={() => onNavigate('login')} className="text-cyan-400 hover:text-cyan-500">Log In</button>
                            </p>

                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default Signup;
