import React from 'react';
import Footer from '../components/Footer';
import loginIllustration from '../assets/login-illustration.png';

const GetStarted = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">

            <div className="flex-grow flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-20 w-full">

                    {/* Left Column: Illustration */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={loginIllustration}
                            alt="HireX Collaboration"
                            className="max-w-md w-full object-contain"
                        />
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex-1 flex flex-col items-center text-center">
                        <h1 className="text-6xl font-bold mb-8 text-black">HireX</h1>

                        <div className="w-full border-t border-gray-400 my-4"></div>
                        <p className="text-xl font-semibold text-black py-2">
                            Transform Your Hiring Process effortlessly !
                        </p>
                        <div className="w-full border-t border-gray-400 my-4 mb-12"></div>

                        <div className="flex flex-col gap-6 w-full max-w-xs">
                            <button onClick={() => onNavigate('signup')} className="bg-gray-900 text-white font-bold py-4 px-8 rounded-xl text-xl hover:bg-gray-800 transition-colors">
                                Sign Up
                            </button>
                            <button
                                onClick={() => onNavigate('login')}
                                className="bg-gray-900 text-white font-bold py-4 px-8 rounded-xl text-xl hover:bg-gray-800 transition-colors"
                            >
                                Sign In
                            </button>
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

export default GetStarted;
