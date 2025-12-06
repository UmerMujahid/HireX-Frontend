import React from 'react';
import Footer from '../components/Footer';
import AuthSidebar from '../components/AuthSidebar';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">

            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Left Column: Marketing Info (Reusable) */}
                    <AuthSidebar onNavigate={onNavigate} />

                    {/* Right Column: Forgot Password Form */}
                    <div className="flex-1 w-full max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-8 md:p-10 h-full">

                            <button
                                onClick={() => onNavigate('login')}
                                className="flex items-center text-gray-900 font-bold mb-8 hover:text-gray-700 transition-colors"
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                Back To Login
                            </button>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="text-[#00bbd3]" size={32} />
                                </div>
                                <h2 className="text-2xl font-bold mb-3">Trouble Logging In ?</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Enter the email address associated with your email account and we'll send you a link to reset your password
                                </p>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="user@gmail.com"
                                        className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                                    />
                                    <div className="text-right mt-2">
                                        <a href="#" className="text-sm font-bold text-cyan-400 hover:text-cyan-500">Forgot Email ?</a>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                                    style={{ backgroundColor: '#00bbd3' }}
                                >
                                    Send Reset Link
                                </button>
                            </form>

                            <p className="mt-8 text-center text-sm font-bold text-gray-900">
                                Remember your Password? <button onClick={() => onNavigate('login')} className="text-cyan-400 hover:text-cyan-500">Return To Login</button>
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

export default ForgotPassword;
