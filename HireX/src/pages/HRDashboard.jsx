import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import PostJob from '../components/PostJob';
import ApplicationsList from '../components/ApplicationsList';
import Interviews from '../components/Interviews';
import useFetch from '../hooks/useFetch';
import {
    Users,
    Home,
    Briefcase,
    Calendar,
    BarChart2,
    Plus,
    MessageSquare,
    ChevronRight,
    Bell,
    Search
} from 'lucide-react';

const HRDashboard = ({ onNavigate, initialView = 'dashboard' }) => {
    const [currentView, setCurrentView] = useState(initialView);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        let mounted = true;
        const loadCount = async () => {
            try {
                const token = localStorage.getItem('hirex_access');
                const res = await fetch('http://127.0.0.1:8000/jobs/notifications/', { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
                const data = await res.json();
                if (!res.ok) return;
                if (mounted) setUnreadCount((data || []).filter(n => !n.is_read).length);
            } catch (e) {
                // ignore
            }
        };
        loadCount();
        return () => { mounted = false };
    }, []);

    // Sync state with prop if it changes (handling route changes in App.jsx)
    useEffect(() => {
        setCurrentView(initialView);
    }, [initialView]);

    // Scroll to top whenever the internal view changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentView]);

    // Fetch jobs and applications for the HR dashboard
    const { data: jobsData, loading: jobsLoading } = useFetch('http://127.0.0.1:8000/jobs/');
    const { data: appsData, loading: appsLoading } = useFetch('http://127.0.0.1:8000/jobs/applications/');
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                <div
                    className="p-6 flex items-center gap-2 cursor-pointer"
                    onClick={() => onNavigate('home')}
                >
                    <Users className="text-gray-900" size={28} strokeWidth={2.5} />
                    <span className="text-xl font-bold text-gray-900">HireX</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <button
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-colors ${currentView === 'dashboard' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                        onClick={() => setCurrentView('dashboard')}
                    >
                        <Home size={20} />
                        Home
                    </button>
                    <button
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors"
                        onClick={() => onNavigate('hr-job-listings')}
                    >
                        <Briefcase size={20} />
                        Job Listings
                    </button>
                    <button
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-colors ${currentView === 'interviews' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                        onClick={() => setCurrentView('interviews')}
                    >
                        <Calendar size={20} />
                        Interviews
                    </button>
                    <button
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-colors ${currentView === 'applications' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                        onClick={() => setCurrentView('applications')}
                    >
                        <BarChart2 size={20} />
                        Reports
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-[#a3e635] flex items-center justify-center text-gray-900 font-bold">
                            SM
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Sarah Martinez</p>
                            <p className="text-xs text-gray-500">HR Manager</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <main className="flex-1 p-8">

                    {currentView === 'dashboard' ? (
                        <>
                            {/* Top Header */}
                            <header className="flex justify-between items-start mb-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                                    <p className="text-gray-500 text-sm mt-1">Welcome back, Sarah! Here's what's happening today.</p>
                                </div>
                                <div>
                                        <div className="flex items-center gap-2">
                                                    <button onClick={async () => { setNotificationsOpen(true); try { const token = localStorage.getItem('hirex_access'); const res = await fetch('http://127.0.0.1:8000/jobs/notifications/', { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } }); const data = await res.json(); if (!res.ok) throw data; setNotifications(data || []); const unread = (data || []).filter(n => !n.is_read).length; setUnreadCount(unread); } catch (e) { console.error('Failed to load notifications', e); } }} className="relative text-gray-600 hover:text-gray-900 p-2 rounded-full">
                                                        <Bell size={18} />
                                                        {unreadCount > 0 && (
                                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">{unreadCount}</span>
                                                        )}
                                                    </button>
                                            <button
                                                onClick={() => setCurrentView('post-job')}
                                                className="bg-[#10b981] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#059669] transition-colors shadow-sm"
                                            >
                                                <Plus size={18} />
                                                Post New Job
                                            </button>
                                        </div>
                                </div>
                            </header>

                            {/* Stats Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {/* Card 1 */}
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Open Jobs</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{jobsData ? jobsData.length : jobsLoading ? '…' : 0}</h3>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                                        <Briefcase size={20} />
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Total Applications</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{appsData ? appsData.length : appsLoading ? '…' : 0}</h3>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                                        <Users size={20} />
                                    </div>
                                </div>
                                {/* Card 3 */}
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Interviews This week</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{appsData ? appsData.filter(a => a.status === 'interview').length : '—'}</h3>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                                        <Calendar size={20} />
                                    </div>
                                </div>
                                {/* Card 4 */}
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Pending Feedback</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{appsData ? appsData.filter(a => a.status === 'interview' && !a.feedback).length : '—'}</h3>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                                        <MessageSquare size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Content Column: Active Job Postings Table */}
                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900">My Active Job Postings</h2>
                                                <p className="text-sm text-gray-500">Track and manage your open positions</p>
                                            </div>
                                            <button className="text-sm font-bold text-[#10b981] border border-[#10b981] px-4 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
                                                View All
                                            </button>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-left border-b border-gray-100">
                                                        <th className="pb-4 font-bold text-sm text-gray-900">Job Title</th>
                                                        <th className="pb-4 font-bold text-sm text-gray-900 text-center">Applications</th>
                                                        <th className="pb-4 font-bold text-sm text-gray-900 text-center">Deadline</th>
                                                        <th className="pb-4 font-bold text-sm text-gray-900">Avg. Match Score</th>
                                                        <th className="pb-4 font-bold text-sm text-gray-900 text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {(jobsData || []).map((job) => (
                                                        <tr key={job.id}>
                                                            <td className="py-4 text-sm font-medium text-gray-600">
                                                                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2"></span>
                                                                {job.title}
                                                            </td>
                                                            <td className="py-4 text-center">
                                                                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">{job.applications ? job.applications.length : 0}</span>
                                                            </td>
                                                            <td className="py-4 text-center text-sm text-gray-600">{job.deadline ? new Date(job.deadline).toLocaleDateString() : '—'}</td>
                                                            <td className="py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                        <div className={`h-full bg-emerald-500`} style={{ width: `${Math.min(100, 70)}%` }}></div>
                                                                    </div>
                                                                    <span className="text-xs text-gray-500">—%</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 text-right">
                                                                <button
                                                                    className="bg-[#10b981] text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-[#059669] transition-colors"
                                                                    onClick={() => setCurrentView('applications')}
                                                                >
                                                                    View Applications
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Sidebar: Action Required */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                                            <span className="text-[#10b981]"><Search size={20} /></span>
                                            Action required
                                        </h2>
                                        <p className="text-sm text-gray-500 mb-6">Priority items needing you attention</p>

                                        <div className="space-y-4">
                                            {/* Item 1 */}
                                            <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow bg-white">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                                                    <ChevronRight size={16} className="text-gray-400" />
                                                </div>
                                                <div className="pl-4">
                                                    <h4 className="text-sm font-bold text-gray-900">Review 15 New</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Applications dor Senior Frontend Developer</p>
                                                </div>
                                            </div>

                                            {/* Item 2 */}
                                            <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow bg-white">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5"></div>
                                                    <ChevronRight size={16} className="text-gray-400" />
                                                </div>
                                                <div className="pl-4">
                                                    <h4 className="text-sm font-bold text-gray-900">Follow up on 3 Pending</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Interviewer Feedbacks</p>
                                                </div>
                                            </div>

                                            {/* Item 3 */}
                                            <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow bg-white">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5"></div>
                                                    <ChevronRight size={16} className="text-gray-400" />
                                                </div>
                                                <div className="pl-4">
                                                    <h4 className="text-sm font-bold text-gray-900">Draft Job Posting:</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Marketing Manager</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : currentView === 'post-job' ? (
                        <PostJob onCancel={() => setCurrentView('dashboard')} onPosted={() => { setCurrentView('dashboard'); window.location.reload(); }} />
                    ) : currentView === 'applications' ? (
                        <ApplicationsList applications={appsData || []} onScheduleClick={() => setCurrentView('interviews')} />
                    ) : (
                        <Interviews />
                    )}
                </main>
                <Footer />
            </div>

            {notificationsOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setNotificationsOpen(false)}>
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-bold mb-4">Notifications</h3>
                        <div className="space-y-3 max-h-72 overflow-auto">
                            {notifications.length === 0 ? (
                                <p className="text-sm text-gray-500">No notifications</p>
                            ) : (
                                notifications.map((n) => (
                                    <div key={n.id} className="p-3 border rounded">
                                        <p className="text-sm text-gray-800">{n.message}</p>
                                        <p className="text-xs text-gray-500">{new Date(n.created_at).toLocaleString()}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="space-y-3 max-h-72 overflow-auto">
                                {notifications.length === 0 ? (
                                    <p className="text-sm text-gray-500">No notifications</p>
                                ) : (
                                    notifications.map((n) => (
                                        <div key={n.id} className="p-3 border rounded flex justify-between items-start">
                                            <div>
                                                <p className="text-sm text-gray-800">{n.message}</p>
                                                <p className="text-xs text-gray-500">{new Date(n.created_at).toLocaleString()}</p>
                                            </div>
                                            <div className="ml-4">
                                                {!n.is_read ? (
                                                    <button className="text-sm text-emerald-600 font-bold" onClick={async () => {
                                                        try {
                                                            const token = localStorage.getItem('hirex_access');
                                                            const res = await fetch(`http://127.0.0.1:8000/jobs/notifications/${n.id}/read/`, { method: 'PUT', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {} ) } });
                                                            const data = await res.json();
                                                            if (!res.ok) throw data;
                                                            // update local state
                                                            setNotifications((prev) => prev.map(x => x.id === data.id ? data : x));
                                                            setUnreadCount((c) => Math.max(0, c - 1));
                                                        } catch (e) {
                                                            console.error('Failed to mark as read', e);
                                                        }
                                                    }}>Mark read</button>
                                                ) : (
                                                    <span className="text-xs text-gray-400">Read</span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="px-4 py-2 bg-emerald-600 text-white rounded" onClick={async () => {
                                    try {
                                        const token = localStorage.getItem('hirex_access');
                                        const res = await fetch('http://127.0.0.1:8000/jobs/notifications/', { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
                                        const data = await res.json();
                                        if (!res.ok) throw data;
                                        setNotifications(data || []);
                                        setUnreadCount((data || []).filter(n => !n.is_read).length);
                                    } catch (e) {
                                        console.error('Failed to load notifications', e);
                                    }
                                }}>Refresh</button>
                            </div>
                    
                    </div>
                </div>
            )}

        </div>
    );
};

export default HRDashboard;
