import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-6 border-t border-gray-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-900">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <p className="font-bold">© 2025 HireX. All rights reserved.</p>
                    <div className="space-x-1">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <a href="#" className="text-gray-900 hover:text-gray-600"><Facebook size={20} fill="currentColor" strokeWidth={0} /></a>
                    <a href="#" className="text-gray-900 hover:text-gray-600"><Twitter size={20} fill="currentColor" strokeWidth={0} /></a>
                    <a href="#" className="text-gray-900 hover:text-gray-600"><Linkedin size={20} fill="currentColor" strokeWidth={0} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
