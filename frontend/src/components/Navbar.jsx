import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b-2 border-slate-900 shadow-[0_4px_0_0_rgba(15,23,42,0.1)]">
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-8">
                <Link to="/" className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2 hover:translate-y-[-1px] transition-transform">
                   <div className="bg-pink-600 text-white p-1 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] rounded-md cursor-pointer">
                     <LayoutDashboard size={22} strokeWidth={3} />
                   </div>
                   HostelBase
                </Link>
                
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 text-slate-900 font-bold bg-pink-50 border-2 border-slate-900 shadow-[3px_3px_0_0_rgba(15,23,42,1)] px-4 py-2 rounded-lg">
                        <User size={18} className="text-pink-600" strokeWidth={3} />
                        <span className="hidden sm:inline">
                            {user?.name} 
                            <span className="text-pink-600 font-bold ml-1.5 text-xs bg-white px-1.5 py-0.5 border-2 border-slate-900 rounded uppercase tracking-wider">({user?.role})</span>
                        </span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-800 bg-white border-2 border-slate-900 shadow-[3px_3px_0_0_rgba(15,23,42,1)] hover:shadow-[1px_1px_0_0_rgba(15,23,42,1)] hover:translate-y-[2px] hover:translate-x-[2px] p-2 rounded-lg transition-all duration-150 font-medium cursor-pointer"
                        title="Logout"
                    >
                        <LogOut size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
