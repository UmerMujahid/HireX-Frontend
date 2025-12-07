import React from 'react';
import { Zap, BarChart3, CheckCircle2, Users } from 'lucide-react';

const AuthSidebar = ({ onNavigate }) => {
    return (
        <div className="flex-1 space-y-10 pt-4">
            {/* Logo Header */}
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>
                <Users className="text-gray-900" size={32} strokeWidth={2.5} />
                <span className="text-2xl font-bold text-gray-900">HireX</span>
            </div>

            <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    Transform your Hiring Process with AI-Powered Intelligence
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Join thousand of companies using HireX to discover, evaluate, and hire the best talent faster than ever before
                </p>
            </div>

            {/* Feature Blocks */}
            <div className="space-y-8">
                {/* Feature 1 */}
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#a3e635] rounded-xl flex items-center justify-center">
                        <Zap size={24} className="text-black" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">AI-Powered Matching</h3>
                        <p className="text-sm text-gray-600">Advanced algorithms match candidates with perfect job opportunities</p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-pink-300 rounded-xl flex items-center justify-center">
                        <BarChart3 size={24} className="text-black" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Data-Driven Insights</h3>
                        <p className="text-sm text-gray-600">Make informed decisions with comprehensive analysis</p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-200 rounded-xl flex items-center justify-center">
                        <CheckCircle2 size={24} className="text-black" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Streamlined Workflows</h3>
                        <p className="text-sm text-gray-600">Automate repetitive tasks and focus on what matters most</p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 pt-8 mt-4">
                <div className="grid grid-cols-3 gap-8">
                    <div className="border-r border-gray-300">
                        <h4 className="text-2xl font-bold">100+</h4>
                        <p className="text-gray-900 font-medium">Companies</p>
                    </div>
                    <div className="border-r border-gray-300">
                        <h4 className="text-2xl font-bold">500+</h4>
                        <p className="text-gray-900 font-medium">Hired Made</p>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold">98%</h4>
                        <p className="text-gray-900 font-medium">Satisfaction</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthSidebar;
