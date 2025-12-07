import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import {
    Users,
    Briefcase,
    Calendar,
    CreditCard,
    PieChart,
    BarChart,
    TrendingUp
} from 'lucide-react';

const AdminDashboard = ({ onNavigate }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: '', full_name: '', password: '', role: 'hr', company: '' });

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('hirex_access');
                const res = await fetch('http://127.0.0.1:8000/auth/admin/list-users/', { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
                const data = await res.json();
                if (!res.ok) throw data;
                if (mounted) setUsers(data || []);
            } catch (e) {
                console.error('Failed to load users', e);
            } finally { setLoading(false); }
        };
        load();
        return () => { mounted = false };
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('hirex_access');
            const res = await fetch('http://127.0.0.1:8000/auth/admin/create-user/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw data;
            setUsers(u => [data, ...u]);
            setForm({ email: '', full_name: '', password: '', role: 'hr', company: '' });
            alert('User created');
        } catch (err) {
            console.error(err);
            alert('Failed to create user: ' + JSON.stringify(err));
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete user?')) return;
        try {
            const token = localStorage.getItem('hirex_access');
            const res = await fetch(`http://127.0.0.1:8000/auth/admin/delete-user/${id}/`, { method: 'DELETE', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
            if (res.status !== 204) {
                const data = await res.json();
                throw data;
            }
            setUsers(u => u.filter(x => x.id !== id));
        } catch (e) {
            console.error('Failed to delete', e);
            alert('Delete failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">

            {/* Top Navigation Bar - Specific to Admin View as per design */}
            <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                    <Users className="text-gray-900" size={28} strokeWidth={2.5} />
                    <span className="text-lg font-bold text-gray-900">HireX</span>
                </div>

                <div className="flex gap-8 text-xs font-bold text-gray-600">
                    <button onClick={() => onNavigate('hr-dashboard')} className="hover:text-gray-900 transition-colors">HR Manager Dashboard</button>
                    <button className="hover:text-gray-900 transition-colors">Candidate Dashboard</button>
                    <button className="hover:text-gray-900 transition-colors">Interview Scheduling</button>
                    <button className="hover:text-gray-900 transition-colors">Interview Feedback</button>
                    <button className="text-gray-900">User Management</button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-8">

                <div className="mb-10">
                    <h1 className="text-xl font-bold text-gray-900">System Overview</h1>
                    <p className="text-gray-500 mt-2 text-xs">Monitor platform activity and system health.</p>
                </div>

                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                <Users size={20} />
                            </div>
                            <div className="flex items-center text-green-500 text-[10px] font-bold gap-1">
                                <TrendingUp size={14} />
                                12%
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Total Users</p>
                            <h3 className="text-xl font-bold text-gray-900">127</h3>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <Briefcase size={20} />
                            </div>
                            <div className="flex items-center text-green-500 text-[10px] font-bold gap-1">
                                <TrendingUp size={14} />
                                8%
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Active Job Posts</p>
                            <h3 className="text-xl font-bold text-gray-900">27</h3>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                                <Calendar size={20} />
                            </div>
                            <div className="flex items-center text-green-500 text-[10px] font-bold gap-1">
                                <TrendingUp size={14} />
                                26%
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Interviews this week</p>
                            <h3 className="text-xl font-bold text-gray-900">15</h3>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                                <CreditCard size={20} />
                            </div>
                            <div className="flex items-center text-green-500 text-[10px] font-bold gap-1">
                                <TrendingUp size={14} />
                                16%
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Applications processed</p>
                            <h3 className="text-xl font-bold text-gray-900">54</h3>
                        </div>
                    </div>
                </div>

                {/* 3 Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* User Management */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                        <h2 className="text-lg font-bold text-gray-900 mb-8 text-center">User Management</h2>
                        <div className="space-y-6">
                            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={(e) => setForm(f => ({...f, email: e.target.value}))} />
                                <input className="border p-2 rounded" placeholder="Full name" value={form.full_name} onChange={(e) => setForm(f => ({...f, full_name: e.target.value}))} />
                                <input className="border p-2 rounded" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm(f => ({...f, password: e.target.value}))} />
                                <select className="border p-2 rounded" value={form.role} onChange={(e) => setForm(f => ({...f, role: e.target.value}))}>
                                    <option value="hr">HR</option>
                                    <option value="interviewer">Interviewer</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <input className="border p-2 rounded md:col-span-2" placeholder="Company (optional)" value={form.company} onChange={(e) => setForm(f => ({...f, company: e.target.value}))} />
                                <div className="md:col-span-2 flex gap-3">
                                    <button type="submit" className="bg-[#84cc16] hover:bg-[#65a30d] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors">Create User</button>
                                    <button type="button" onClick={() => setForm({ email: '', full_name: '', password: '', role: 'hr', company: '' })} className="border px-4 rounded">Reset</button>
                                </div>
                            </form>

                            <div>
                                <h4 className="text-sm font-bold mb-2">Existing Users</h4>
                                {loading ? <p>Loading…</p> : (
                                    <ul className="space-y-2">
                                        {users.map(u => (
                                            <li key={u.id} className="flex justify-between items-center p-2 border rounded">
                                                <div>
                                                    <p className="text-sm font-medium">{u.full_name || u.email}</p>
                                                    <p className="text-xs text-gray-500">{u.email} — {u.role}</p>
                                                </div>
                                                <div>
                                                    <button onClick={() => handleDelete(u.id)} className="text-red-600 text-sm font-bold">Delete</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* System Settings */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                        <h2 className="text-lg font-bold text-gray-900 mb-8 text-center">System Settings</h2>

                        <div className="bg-gray-50 p-6 rounded-xl text-center h-[calc(100%-4rem)] flex flex-col justify-center items-center">
                            <p className="text-gray-600 font-medium mb-4 text-sm">Update Company Info</p>
                            <button className="bg-[#84cc16] hover:bg-[#65a30d] text-white font-bold py-2.5 px-8 rounded-lg shadow-sm transition-colors text-sm">
                                Edit Info
                            </button>
                        </div>
                    </div>

                    {/* System Analytics */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                        <h2 className="text-lg font-bold text-gray-900 mb-8 text-center">System Analytics</h2>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl flex items-center justify-center h-32">
                                <PieChart size={64} className="text-[#84cc16]" strokeWidth={1.5} />
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl flex items-center justify-center h-32">
                                <BarChart size={64} className="text-[#84cc16]" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
