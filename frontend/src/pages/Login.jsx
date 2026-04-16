import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Building, Lock, LayoutDashboard } from 'lucide-react';

const ParticleSphere = () => {
  const containerRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const numPoints = 1200;
    const radius = 900; // Huge radius to fill the whole screen
    
    // Antigravity themed colors: soft blues, pinks, purples, oranges
    const colors = ['bg-blue-500', 'bg-pink-500', 'bg-purple-500', 'bg-orange-400', 'bg-teal-400', 'bg-indigo-500'];
    const newPoints = [];

    // Use Fibonacci Sphere algorithm for even distribution across the 3D surface
    for (let i = 0; i < numPoints; i++) {
        const phi = Math.acos(-1 + (2 * i) / numPoints);
        const theta = Math.sqrt(numPoints * Math.PI) * phi;
        
        // CSS rotations
        const rotX = (phi * 180 / Math.PI) - 90;
        const rotY = (theta * 180 / Math.PI);

        newPoints.push({
            id: i,
            rotX, 
            rotY, 
            radius: radius + (Math.random() * 15 - 7.5), // slight jitter in depth
            color: colors[Math.floor(Math.random() * colors.length)],
            width: Math.random() * 10 + 4, // 4px to 14px dashes
            opacity: 0.3 + Math.random() * 0.7
        });
    }
    setPoints(newPoints);
  }, []);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
        // Normalize mouse to [-1, 1] relative to screen center
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
        // Smooth easing towards target mouse position
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        if (containerRef.current) {
            // Apply constant slow idle rotation plus interactive mouse tilt
            const time = Date.now() * 0.0005;
            const idleRotY = time * 15; // 15 degrees per second spin
            
            const targetRotX = currentY * -45; // up to 45 deg tilt up/down
            const targetRotY = idleRotY + currentX * 45; 

            containerRef.current.style.transform = `rotateX(${targetRotX}deg) rotateY(${targetRotY}deg)`;
        }

        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[0] flex items-center justify-center bg-transparent" style={{ perspective: '800px' }}>
      <div 
        ref={containerRef} 
        style={{ transformStyle: 'preserve-3d', width: '0', height: '0' }}
        className="relative"
      >
         {points.map(pt => (
            <div 
               key={pt.id}
               className={`absolute rounded-full ${pt.color}`}
               style={{
                  width: `${pt.width}px`,
                  height: '2.5px', // tiny dash thickness
                  marginLeft: `${-pt.width / 2}px`,
                  marginTop: '-1px',
                  opacity: pt.opacity,
                  // We rotate first and then translate out to push it onto the surface of the sphere!
                  transform: `rotateY(${pt.rotY}deg) rotateX(${pt.rotX}deg) translateZ(${pt.radius}px)`,
               }}
            />
         ))}
      </div>
    </div>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({ reg_no: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.reg_no, formData.password);
      toast.success("Welcome back!");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <>
      {/* Dynamic 3D Tracking Sphere */}
      <ParticleSphere />

      <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 relative z-10 w-full">
        {/* 3D Structural Login Window */}
        <div className="w-full max-w-lg bg-white border-4 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] rounded-2xl overflow-hidden mt-10">
          
          {/* Header Block */}
          <div className="bg-pink-400 border-b-4 border-slate-900 p-8 flex flex-col items-center text-slate-900 relative overflow-hidden h-40 justify-center">
               <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_10%,transparent_10%,transparent_50%,#000_50%,#000_60%,transparent_60%,transparent_100%)] bg-[length:20px_20px]"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                   <div className="bg-white border-2 border-slate-900 p-2 shadow-[3px_3px_0_0_rgba(15,23,42,1)] rounded-lg mb-4 rotate-3">
                      <LayoutDashboard size={32} className="text-pink-600" strokeWidth={3} />
                   </div>
                   <h1 className="text-3xl font-black tracking-tight text-white uppercase" style={{ textShadow: "2px 2px 0px #0f172a" }}>HostelBase</h1>
               </div>
          </div>

          {/* Input Form Area */}
          <div className="p-8 sm:p-10 flex flex-col justify-center bg-slate-50 relative">
            
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                System Login
              </h2>
              <p className="text-slate-600 mt-1 font-bold text-sm">
                Move your cursor to interact with the 3D core
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
              <div>
                <label className="block text-[0.85rem] font-bold text-slate-900 uppercase tracking-widest mb-2 ml-1">Registration ID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-slate-400 group-focus-within:text-pink-600 transition-colors" strokeWidth={2.5}/>
                  </div>
                  <input
                    type="text"
                    name="reg_no"
                    required
                    placeholder="21BCE0001"
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-900 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300"
                    onChange={handleChange}
                    value={formData.reg_no}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.85rem] font-bold text-slate-900 uppercase tracking-widest mb-2 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-pink-600 transition-colors" strokeWidth={2.5} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-900 rounded-lg shadow-[3px_3px_0_0_rgba(15,23,42,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full block py-4 px-4 mt-8 border-2 border-slate-900 rounded-lg text-white text-lg font-black uppercase tracking-widest bg-pink-500 hover:bg-pink-400 shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer"
              >
                Sign In
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
