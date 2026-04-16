import React from 'react';
import { Clock, AlertCircle, CheckCircle, MapPin, Trash2, ArrowRightCircle, User } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const ComplaintCard = ({ complaint, isAdmin, onUpdate }) => {

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Pending':
        return { color: 'bg-yellow-300 text-slate-900 border-2 border-slate-900', icon: <Clock size={15} strokeWidth={3} className="mr-1.5" /> };
      case 'In Progress':
        return { color: 'bg-blue-300 text-slate-900 border-2 border-slate-900', icon: <AlertCircle size={15} strokeWidth={3} className="mr-1.5" /> };
      case 'Resolved':
        return { color: 'bg-emerald-400 text-slate-900 border-2 border-slate-900', icon: <CheckCircle size={15} strokeWidth={3} className="mr-1.5" /> };
      default:
        return { color: 'bg-slate-200 text-slate-900 border-2 border-slate-900', icon: null };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-white bg-rose-500 border-2 border-slate-900';
      case 'Medium': return 'text-slate-900 bg-orange-400 border-2 border-slate-900';
      case 'Low': return 'text-slate-900 bg-teal-300 border-2 border-slate-900';
      default: return 'text-slate-900 bg-slate-300 border-2 border-slate-900';
    }
  };

  const handleStatusChange = async (e) => {
    try {
      await api.put(`/complaints/${complaint.id}`, { status: e.target.value });
      toast.success(`Status perfectly updated to ${e.target.value}`);
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you absolutely sure you want to completely remove this complaint?')) {
      try {
        await api.delete(`/complaints/${complaint.id}`);
        toast.success("Complaint deleted permanently", { icon: '🗑️' });
        if (onUpdate) onUpdate();
      } catch (error) {
        toast.error("Failed to delete complaint");
      }
    }
  }

  const dateStr = new Date(complaint.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const statusConfig = getStatusConfig(complaint.status);

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] hover:shadow-[2px_2px_0_0_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 relative flex flex-col group">

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-1 text-[0.75rem] uppercase tracking-widest font-black flex items-center shadow-[2px_2px_0_0_rgba(15,23,42,1)] rounded-md ${statusConfig.color}`}>
            {statusConfig.icon}
            {complaint.status}
          </span>
          <span className={`px-2.5 py-1 text-[0.75rem] uppercase tracking-widest font-black flex items-center shadow-[2px_2px_0_0_rgba(15,23,42,1)] rounded-md ${getPriorityColor(complaint.priority)}`}>
            {complaint.priority}
          </span>
        </div>
        <div className="text-slate-900 text-[0.75rem] font-black uppercase tracking-wider flex items-center bg-slate-100 px-3 py-1.5 rounded-md border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
          {dateStr}
        </div>
      </div>

      {/* Body */}
      <div className="mb-4 flex-grow">
        <h3 className="font-black text-2xl text-slate-900 mb-2 leading-tight uppercase tracking-tight">{complaint.category}</h3>
        <p className="text-slate-700 text-[0.95rem] leading-relaxed font-semibold border-l-4 border-pink-500 pl-3 py-1 bg-slate-50">{complaint.description}</p>
      </div>

      {/* Metadata Pill Box */}
      <div className="bg-slate-100/80 rounded-lg p-3 flex flex-wrap gap-x-5 gap-y-3 text-sm mt-auto mb-4 border-2 border-slate-900 border-dashed">
        <div className="flex items-center text-slate-900">
          <div className="bg-white p-1 rounded-md border-2 border-slate-900 mr-2 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
            <MapPin size={16} className="text-slate-900" strokeWidth={3} />
          </div>
          <span className="font-black text-slate-900 uppercase tracking-widest mr-1.5">Room</span>
          <span className="font-black text-white bg-pink-500 px-2 py-0.5 border-2 border-slate-900 rounded-md shadow-[2px_2px_0_0_rgba(15,23,42,1)]">{complaint.room_no}</span>
        </div>

        {isAdmin && (
          <div className="flex items-center text-slate-900">
            <div className="bg-white p-1 rounded-md border-2 border-slate-900 mr-2 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
              <User size={16} className="text-slate-900" strokeWidth={3} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-black text-slate-900 uppercase">{complaint.student_name}</span>
              <span className="text-[0.7rem] font-black text-white bg-slate-900 px-2 py-0.5 rounded-md uppercase tracking-wider ml-0 sm:ml-2 mt-1 sm:mt-0">{complaint.reg_no}</span>
            </div>
          </div>
        )}
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-slate-900 gap-3">
          <div className="flex items-center gap-3 flex-grow max-w-[200px]">
            <div className="relative w-full">
              <select
                value={complaint.status}
                onChange={handleStatusChange}
                className="w-full text-sm font-black border-2 border-slate-900 rounded-lg bg-pink-300 shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] outline-none pl-3 pr-8 py-2.5 transition-all text-slate-900 appearance-none cursor-pointer uppercase tracking-widest"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <ArrowRightCircle size={16} strokeWidth={3} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-900 pointer-events-none" />
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="text-white bg-rose-500 border-2 border-slate-900 hover:bg-rose-400 p-2.5 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer"
            title="Delete permanently"
          >
            <Trash2 size={18} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplaintCard;
