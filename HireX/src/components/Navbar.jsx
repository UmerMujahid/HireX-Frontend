import React, { useState } from 'react';
import { Menu, X, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white py-2 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <Users className="text-gray-900" size={32} strokeWidth={2.5} />
                            <span className="text-xl font-bold text-gray-900">HireX</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/" className="text-primary hover:text-primary-hover font-medium">Home</Link>
                        <Link to="/about" className="text-gray-900 hover:text-primary font-medium">About Us</Link>
                        <a href="#" className="text-gray-900 hover:text-primary font-medium">Contact Us</a>
                        <a href="#" className="text-gray-900 hover:text-primary font-medium">Login</a>
                        <Button variant="primary">Get Started</Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-900 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg z-50 py-4 px-4 flex flex-col space-y-4">
                    <Link to="/" className="text-primary font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/about" className="text-gray-900 font-medium" onClick={() => setIsOpen(false)}>About Us</Link>
                    <a href="#" className="text-gray-900 font-medium" onClick={() => setIsOpen(false)}>Contact Us</a>
                    <a href="#" className="text-gray-900 font-medium" onClick={() => setIsOpen(false)}>Login</a>
                    <Button variant="primary" className="w-full">Get Started</Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
