import React from 'react';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Mail, Phone, MapPin, Search } from 'lucide-react';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Header Section */}
            <section className="pt-16 pb-8 text-center max-w-7xl mx-auto px-4">
                <div className="relative inline-block mb-12">
                    <h1 className="text-5xl font-bold z-10 relative px-4 inline-block border-b-4 border-primary pb-2">Contact Us</h1>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex flex-col md:flex-row gap-16">
                    {/* Left Column: Form */}
                    <div className="flex-1 border border-gray-300 rounded-3xl p-8 shadow-sm">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
                            <p className="text-gray-600 text-lg">
                                We are happy to answer you questions about HireX
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Full Name"
                                    className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="user@gmail.com"
                                    className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Subject</label>
                                <div className="relative">
                                    <select className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none appearance-none">
                                        <option>Subject</option>
                                        <option>General Inquiry</option>
                                        <option>Support</option>
                                        <option>Sales</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="Enter Your Message"
                                    className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-center pt-4">
                                <Button variant="dark" className="px-8 py-3 rounded-lg text-sm font-medium">Send Message</Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Info */}
                    <div className="flex-1 flex flex-col items-center pt-8">
                        <h2 className="text-2xl font-bold mb-10 text-center">Need Immediate Assistance?</h2>

                        <div className="space-y-6 w-full max-w-md">
                            <div className="bg-gray-200 rounded-lg py-3 px-6 text-center font-bold text-gray-900 text-sm md:text-base">
                                General Support Email: (support@hirex.com)
                            </div>

                            <div className="bg-gray-200 rounded-lg py-3 px-6 text-center font-bold text-gray-900 text-sm md:text-base">
                                Sales/Demo Requests: (sales@hirex.com)
                            </div>

                            <div className="bg-gray-200 rounded-lg py-3 px-6 text-center font-bold text-gray-900 text-sm md:text-base">
                                Phone Number: (+1-222-333-444)
                            </div>

                            <div className="bg-gray-200 rounded-lg py-3 px-6 text-center font-bold text-gray-900 text-sm md:text-base">
                                Location/Address: Houstoun, TX
                            </div>
                        </div>

                        <div className="mt-16">
                            <div className="bg-primary px-8 py-3 rounded-lg font-mono text-2xl font-bold text-black border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                24/7 Service
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactUs;
