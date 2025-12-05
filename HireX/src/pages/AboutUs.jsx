import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Brain, FileText, TrendingUp } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Navbar />

            {/* Header Section */}
            <section className="pt-16 pb-12 text-center max-w-7xl mx-auto px-4">
                <div className="relative inline-block mb-12">
                    <h1 className="text-5xl font-bold z-10 relative px-4">About Us</h1>
                    <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-200 -z-0 opacity-50 transform -translate-y-2"></div>
                    {/* The screenshot has a line under the text, let's substitute with a border-b for now or simple styling */}
                    <div className="h-0.5 w-1/2 bg-gray-400 mx-auto mt-4"></div>
                </div>

                <p className="max-w-5xl mx-auto text-lg md:text-xl text-gray-800 leading-relaxed">
                    HireX is a unified recruitment platform that uses AI to automate job matching, application ranking, and interview scheduling. We offer organizations an efficient solution to manage the entire hiring process and provide candidates with a streamlined experience and transparent application insights.
                </p>
            </section>

            {/* Core Values Section */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
                    <p className="text-gray-600">
                        HireX combines cutting edge AI with intuitive desgin to transform your recruiting process
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Value 1 */}
                    <div className="border border-gray-400 rounded-lg p-8 flex flex-col items-start text-left h-full">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                            <Brain className="text-gray-900" size={28} />
                        </div>
                        <h3 className="text-lg font-bold mb-3">AI Powered Software</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Commitment to unbiased, algorithm-backed decisions.
                        </p>
                    </div>

                    {/* Value 2 */}
                    <div className="border border-gray-400 rounded-lg p-8 flex flex-col items-start text-left h-full">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                            <FileText className="text-gray-900" size={28} />
                        </div>
                        <h3 className="text-lg font-bold mb-3">Candidate-Centric Design</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Designing tools that offer clarity and a positive experience for job seekers.
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="border border-gray-400 rounded-lg p-8 flex flex-col items-start text-left h-full">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                            <TrendingUp className="text-gray-900" size={28} />
                        </div>
                        <h3 className="text-lg font-bold mb-3">Unwavering Efficiency</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Streamlining workflows to save time for both HR and candidates.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 text-center">
                <h2 className="text-3xl font-normal mb-8 text-gray-800">Ready to See the Future of Hiring?</h2>
                <Button variant="primary" size="lg" className="px-10 py-3 text-base font-bold">
                    Sign Up
                </Button>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
