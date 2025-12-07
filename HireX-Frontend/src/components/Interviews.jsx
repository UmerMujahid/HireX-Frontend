import React, { useState } from 'react';

const Interviews = () => {
    const [selectedDate, setSelectedDate] = useState(26);
    const [selectedTime, setSelectedTime] = useState('1:00 PM');
    const [showPopup, setShowPopup] = useState(false);

    // Dummy calendar days for visual representation
    const calendarDays = [
        { day: 'Mon', date: 31, inactive: true },
        { day: 'Tue', date: 1, inactive: false },
        { day: 'Wed', date: 2, inactive: false },
        { day: 'Thu', date: 3, inactive: false },
        { day: 'Fri', date: 4, inactive: false },
        { day: 'Sat', date: 5, inactive: false },
        { day: 'Sun', date: 6, inactive: false },

        { day: 'Mon', date: 7, inactive: false },
        { day: 'Tue', date: 8, inactive: false },
        { day: 'Wed', date: 9, inactive: false },
        { day: 'Thu', date: 10, inactive: false },
        { day: 'Fri', date: 11, inactive: false },
        { day: 'Sat', date: 12, inactive: false },
        { day: 'Sun', date: 13, inactive: false },

        { day: 'Mon', date: 14, inactive: false },
        { day: 'Tue', date: 15, inactive: false },
        { day: 'Wed', date: 16, inactive: false },
        { day: 'Thu', date: 17, inactive: false },
        { day: 'Fri', date: 18, inactive: false },
        { day: 'Sat', date: 19, inactive: false },
        { day: 'Sun', date: 20, inactive: false },

        { day: 'Mon', date: 21, inactive: false },
        { day: 'Tue', date: 22, inactive: false },
        { day: 'Wed', date: 23, inactive: false },
        { day: 'Thu', date: 24, inactive: false },
        { day: 'Fri', date: 25, inactive: false },
        { day: 'Sat', date: 26, inactive: false }, // Selected by default
        { day: 'Sun', date: 27, inactive: false },
    ];

    const scheduledInterviews = [
        {
            name: "Umer Karamat",
            date: "26th Nov 2025",
            time: "1:00 PM"
        },
        {
            name: "Basim Irfan",
            date: "01st Dec 2025",
            time: "11:00 AM"
        }
    ];

    return (
        <div className="relative h-full flex-1">
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                {/* Left Column: Scheduler */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Calendar Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                        <div className="p-6 flex-1">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Select a date</h2>

                            {/* Days Header */}
                            <div className="grid grid-cols-7 mb-4">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                                    <div key={d} className="text-center text-xs font-medium text-gray-500">{d}</div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-y-4">
                                {calendarDays.map((d, i) => (
                                    <div key={i} className="flex justify-center">
                                        <button
                                            onClick={() => !d.inactive && setSelectedDate(d.date)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                                            ${d.inactive ? 'text-gray-300 cursor-default' : 'text-gray-900 hover:bg-gray-100'}
                                            ${!d.inactive && selectedDate === d.date ? 'bg-[#10b981] text-white hover:bg-[#10b981]' : ''}
                                        `}
                                        >
                                            {d.date < 10 ? `0${d.date}` : d.date}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Decorative Image/Pattern Area (Right side of calendar card) */}
                        <div className="w-full md:w-1/3 bg-[#f3f0e8] relative hidden md:block">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"></div>
                            {/* Placeholder for the aesthetic image in the screenshot */}
                            {/* Using a subtle shadow or just the color to mimic the look for now */}
                        </div>
                    </div>

                    {/* Available Times */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Times</h2>
                        <div className="space-y-3">
                            {['9:00 AM', '11:00 AM', '1:00 PM'].map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`w-full py-3 rounded-lg font-bold text-white transition-all
                                    ${selectedTime === time ? 'bg-[#10b981] shadow-md scale-[1.01]' : 'bg-[#10b981] hover:bg-[#059669] opacity-70 hover:opacity-100'}
                                `}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Candidate and Interviewers Form */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Candidate and Interviewers</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Candidate name"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                            />
                            <input
                                type="text"
                                placeholder="Interviewer name"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                            />
                            <button
                                onClick={() => setShowPopup(true)}
                                className="w-full py-4 bg-[#10b981] text-white font-bold rounded-lg hover:bg-[#059669] transition-colors mt-2 shadow-sm uppercase tracking-wide"
                            >
                                Send Invitations
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Scheduled Interviews */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Scheduled Interviews</h2>

                        <div className="space-y-6">
                            {scheduledInterviews.map((interview, index) => (
                                <div key={index} className="bg-gray-200/50 rounded-xl p-5 border border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{interview.name}</h3>
                                    <div className="text-gray-700 text-sm font-medium">
                                        <p>Date : {interview.date}</p>
                                        <p>Time : {interview.time}</p>
                                    </div>
                                    <button className="w-full mt-4 py-2 bg-[#10b981] text-white font-bold rounded-lg hover:bg-[#059669] transition-colors">
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Popup Overlay */}
            {showPopup && (
                <div
                    className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]"
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full transform transition-all scale-100 border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-[#10b981] rounded-xl p-8 flex items-center justify-center text-center shadow-inner">
                            <h3 className="text-white text-xl font-bold leading-tight">
                                Notifications sent<br />successfully
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Interviews;
