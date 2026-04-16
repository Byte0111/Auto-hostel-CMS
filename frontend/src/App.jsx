import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './contexts/AuthContext';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children, roleRequired }) => {
    if (!user) return <Navigate to="/login" />;
    if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      {/* SaaS Structure: Solid off-white with subtle structural dot grid */}
      <div className="min-h-screen flex flex-col bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] selection:bg-pink-200 text-slate-900 pb-16">
        <Toaster 
          position="top-center" 
          toastOptions={{ 
            style: {
              border: '2px solid #1e293b',
              boxShadow: '4px 4px 0px 0px rgba(30,41,59,1)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#1e293b',
              fontWeight: '600',
            },
            className: 'font-bold rounded-lg shadow-[4px_4px_0px_#1e293b] border-2 border-slate-900',
            duration: 3000
          }} 
        />
        {user && <Navbar />}
        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                {user?.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
              </ProtectedRoute>
            } />
            
            <Route path="/student" element={
              <ProtectedRoute roleRequired="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute roleRequired="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
