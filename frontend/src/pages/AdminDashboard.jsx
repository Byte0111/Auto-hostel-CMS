import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import toast from 'react-hot-toast';
import { Search, Filter, BarChart3, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
    const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

    const fetchComplaints = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (filters.status) queryParams.append('status', filters.status);
            if (filters.priority) queryParams.append('priority', filters.priority);
            
            const [complaintsRes, statsRes] = await Promise.all([
                api.get(`/complaints?${queryParams.toString()}`),
                api.get('/complaints/stats')
            ]);
            
            setComplaints(complaintsRes.data);
            setStats(statsRes.data);
        } catch (error) {
            toast.error("Failed to load dashboard data");
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [filters]);

    const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    // Filter by search term locally for blazing fast responsiveness
    const filteredComplaints = complaints.filter(c => 
        c.student_name.toLowerCase().includes(filters.search.toLowerCase()) || 
        c.reg_no.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.room_no.toLowerCase().includes(filters.search.toLowerCase())
    );

    const StatCard = ({ title, count, icon, colorClass }) => (
        <div className={`bg-white rounded-xl p-5 border-2 border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] hover:shadow-[2px_2px_0_0_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between overflow-hidden relative group`}>
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${colorClass.split(' ')[0]} rounded-full opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-500`}></div>
            <div>
                <p className="text-slate-600 font-black uppercase tracking-widest text-[0.7rem] mb-1 z-10 relative">{title}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter z-10 relative">{count}</h3>
            </div>
            <div className={`${colorClass} p-3 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0_0_rgba(15,23,42,1)] rotate-3 group-hover:-rotate-3 transition-transform z-10 relative`}>
                {icon}
            </div>
        </div>
    );

    return (
        <div className="pb-10 font-sans">
            <div className="mb-10 pb-4 border-b-4 border-slate-900">
                <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter" style={{ textShadow: "2px 2px 0px #f472b6" }}>System Console</h1>
                <p className="text-slate-600 font-bold mt-2 text-sm uppercase tracking-widest">Admin Control Panel</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Assigned" count={stats.total} icon={<BarChart3 size={24} />} colorClass="bg-pink-300 text-slate-900" />
                <StatCard title="Needs Action" count={stats.pending} icon={<Clock size={24} />} colorClass="bg-yellow-300 text-slate-900" />
                <StatCard title="In Progress" count={stats.inProgress} icon={<AlertTriangle size={24} />} colorClass="bg-blue-300 text-slate-900" />
                <StatCard title="Completed" count={stats.resolved} icon={<CheckCircle size={24} />} colorClass="bg-emerald-400 text-slate-900" />
            </div>

            {/* Filter Hub */}
            <div className="bg-white p-6 rounded-xl border-4 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] mb-10 flex flex-col md:flex-row gap-5 items-center justify-between">
                
                <div className="relative w-full md:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500" strokeWidth={3} />
                    </div>
                    <input
                        type="text"
                        name="search"
                        placeholder="SEARCH ID OR ROOM..."
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-900 bg-slate-50 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] outline-none font-bold placeholder:text-slate-400 uppercase tracking-widest transition-all"
                    />
                </div>

                <div className="flex w-full md:w-auto gap-4">
                    <div className="relative flex-1 md:w-48">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-slate-500" strokeWidth={3} />
                        </div>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="w-full pl-9 pr-4 py-3 border-2 border-slate-900 bg-slate-50 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] outline-none font-bold text-slate-900 uppercase tracking-widest transition-all cursor-pointer appearance-none"
                        >
                            <option value="">ALL STATUS</option>
                            <option value="Pending">PENDING</option>
                            <option value="In Progress">IN PROGRESS</option>
                            <option value="Resolved">RESOLVED</option>
                        </select>
                    </div>

                    <div className="relative flex-1 md:w-48">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AlertTriangle className="h-4 w-4 text-slate-500" strokeWidth={3} />
                        </div>
                        <select
                            name="priority"
                            value={filters.priority}
                            onChange={handleFilterChange}
                            className="w-full pl-9 pr-4 py-3 border-2 border-slate-900 bg-slate-50 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] outline-none font-bold text-slate-900 uppercase tracking-widest transition-all cursor-pointer appearance-none"
                        >
                            <option value="">ALL PRIORITY</option>
                            <option value="High">HIGH</option>
                            <option value="Medium">MEDIUM</option>
                            <option value="Low">LOW</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center">
                   <div className="w-3 h-3 bg-pink-500 rounded-full border-2 border-slate-900 mr-3 hidden sm:block"></div>
                   Triage Queue
                </h2>
                <span className="bg-white border-2 border-slate-900 px-3 py-1 font-black text-slate-900 rounded-md shadow-[2px_2px_0_0_rgba(15,23,42,1)] uppercase text-xs">
                    {filteredComplaints.length} Records
                </span>
            </div>

            {filteredComplaints.length === 0 ? (
                <div className="text-center py-20 bg-slate-100/50 rounded-2xl border-4 border-slate-900 border-dashed">
                    <div className="inline-flex bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] mb-4 -rotate-3">
                       <CheckCircle size={48} className="text-slate-400" strokeWidth={2.5} />
                    </div>
                    <p className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Queue is empty</p>
                    <p className="text-slate-500 font-bold max-w-sm mx-auto">Either no complaints match your filters or everything is fully resolved.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {filteredComplaints.map(complaint => (
                        <ComplaintCard key={complaint.id} complaint={complaint} isAdmin={true} onUpdate={fetchComplaints} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
