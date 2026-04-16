import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import toast from 'react-hot-toast';
import { PlusCircle, Search, Filter } from 'lucide-react';

const StudentDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ category: 'Maintenance', description: '', priority: 'Low' });

    const fetchComplaints = async () => {
        try {
            const res = await api.get('/complaints/my-complaints');
            setComplaints(res.data);
        } catch (error) {
            toast.error("Failed to load complaints");
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/complaints', formData);
            toast.success("Complaint submitted successfully!");
            setFormData({ category: 'Maintenance', description: '', priority: 'Low' });
            setIsSubmitting(false);
            fetchComplaints();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error submitting complaint");
        }
    };

    return (
        <div className="pb-10 font-sans">
            <div className="flex justify-between items-center mb-10 pb-4 border-b-4 border-slate-900">
                <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter" style={{ textShadow: "2px 2px 0px #f472b6" }}>My Dashboard</h1>
                <button 
                    onClick={() => setIsSubmitting(!isSubmitting)}
                    className="flex items-center gap-2 bg-pink-500 hover:bg-pink-400 text-white px-5 py-3 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all font-black uppercase tracking-widest cursor-pointer"
                >
                    <PlusCircle size={20} strokeWidth={3} />
                    <span className="hidden sm:inline">{isSubmitting ? 'Cancel' : 'New Report'}</span>
                </button>
            </div>

            {isSubmitting && (
                <div className="bg-white p-8 rounded-2xl shadow-[8px_8px_0_0_rgba(15,23,42,1)] border-4 border-slate-900 mb-10 overflow-hidden relative">
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#f472b6_2px,transparent_2px)] [background-size:10px_10px] opacity-30 origin-top-right scale-150 rotate-45 pointer-events-none"></div>

                    <h2 className="text-2xl font-black mb-6 text-slate-900 uppercase tracking-tight flex items-center">
                        <span className="bg-yellow-300 w-3 h-8 mr-3 inline-block rounded-sm border-2 border-slate-900"></span>
                        File New Complaint
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-slate-900 uppercase mb-2">Category</label>
                                <select 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange}
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-900 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all font-bold text-slate-900 uppercase tracking-wider cursor-pointer"
                                >
                                    <option>Maintenance</option>
                                    <option>Cleanliness</option>
                                    <option>Food</option>
                                    <option>Security</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-black text-slate-900 uppercase mb-2">Priority</label>
                                <select 
                                    name="priority" 
                                    value={formData.priority} 
                                    onChange={handleChange}
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-900 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all font-bold text-slate-900 uppercase tracking-wider cursor-pointer"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-900 uppercase mb-2">Description</label>
                            <textarea 
                                name="description" 
                                required 
                                value={formData.description} 
                                onChange={handleChange}
                                placeholder="Clearly describe the issue you are facing..."
                                className="w-full p-4 bg-slate-50 border-2 border-slate-900 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-400 min-h-[120px] resize-y"
                                rows="3"
                            ></textarea>
                        </div>
                        
                        <div className="flex justify-end pt-2">
                            <button 
                                type="submit" 
                                className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-800 border-2 border-slate-900 shadow-[4px_4px_0_0_#f472b6] hover:shadow-[1px_1px_0_0_#f472b6] hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer"
                            >
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center">
                   <div className="w-3 h-3 bg-pink-500 rounded-full border-2 border-slate-900 mr-3 hidden sm:block"></div>
                   Complaint History
                </h2>
                <span className="bg-white border-2 border-slate-900 px-3 py-1 font-black text-slate-900 rounded-md shadow-[2px_2px_0_0_rgba(15,23,42,1)] uppercase text-xs">
                    {complaints.length} Records
                </span>
            </div>

            {complaints.length === 0 ? (
                <div className="text-center py-20 bg-slate-100/50 rounded-2xl border-4 border-slate-900 border-dashed">
                    <div className="inline-flex bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] mb-4 rotate-3">
                       <CheckCircle size={48} className="text-emerald-500" strokeWidth={2.5} />
                    </div>
                    <p className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">No active complaints</p>
                    <p className="text-slate-500 font-bold max-w-sm mx-auto">Your hostel life seems smooth. Click 'New Report' if you need any assistance.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {complaints.map(complaint => (
                        <ComplaintCard key={complaint.id} complaint={complaint} isAdmin={false} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
