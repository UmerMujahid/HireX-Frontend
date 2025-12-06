import React, { useState } from 'react';
import Footer from '../components/Footer';
import AuthSidebar from '../components/AuthSidebar';
import { Eye, EyeOff } from 'lucide-react';

const Login = ({ onNavigate }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">

            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Left Column: Marketing Info (Reusable) */}
                    <AuthSidebar />

                    {/* Right Column: Login Form */}
                    <div className="flex-1 w-full max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-8 md:p-10">

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold mb-2">Welcome Back To HireX</h2>
                                <p className="text-gray-500">Sign In to continue to your account</p>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="name@gmail.com"
                                        className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
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

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm font-bold text-gray-900">Remember Me</label>
                                    </div>
                                    <div className="text-sm">
                                        <button type="button" onClick={() => onNavigate('forgot-password')} className="font-bold text-cyan-400 hover:text-cyan-500">Forgot Password ?</button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                                    style={{ backgroundColor: '#00bbd3' }}
                                >
                                    Log In
                                </button>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-900 font-bold">Or Continue With</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 bg-gray-100 py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
                                        <span className="font-bold text-gray-900">G</span>
                                        <span className="text-gray-900 font-medium">Google</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 bg-gray-100 py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
                                        <span className="font-bold text-gray-900">in</span>
                                        <span className="text-gray-900 font-medium">LinkedIn</span>
                                    </button>
                                </div>
                            </div>

                            <p className="mt-8 text-center text-sm font-bold">
                                New to HireX? <a href="#" className="text-cyan-400 hover:text-cyan-500">SignUp</a>
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

export default Login;
