import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  Trophy, 
  User, 
  LogOut,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeGlow, setActiveGlow] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
    setActiveGlow(true);
    const timer = setTimeout(() => setActiveGlow(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: BookOpen,
      label: 'Modules',
      path: '/modules'
    },
    {
      icon: Stethoscope,
      label: 'Sessions',
      path: '/sessions'
    },
    {
      icon: Trophy,
      label: 'Leaderboard',
      path: '/leaderboard'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-40 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-orange-100 opacity-10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 2 + 0.5})`,
              animation: `pulse ${Math.random() * 10 + 10}s infinite alternate`
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col h-full relative z-10">
        {/* Logo with animation */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-100 relative overflow-hidden">
          <div 
            className={`w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center transition-all duration-1000 ${isFirstRender ? 'scale-0' : 'scale-100'}`}
            style={{
              transformOrigin: 'center',
              transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span 
            className="text-xl font-bold text-gray-900 relative"
            style={{
              opacity: isFirstRender ? 0 : 1,
              transform: isFirstRender ? 'translateX(-20px)' : 'translateX(0)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: '0.2s'
            }}
          >
            Diagnofy
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></span>
          </span>
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30"></div>
        </div>

        {/* Navigation with advanced animations */}
        <nav className="flex-1 px-4 py-6 space-y-2 relative">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <div 
                key={item.path}
                className="relative"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {hoveredItem === index && (
                  <div className="absolute inset-0 bg-orange-100 rounded-xl opacity-30 animate-pulse-fast"></div>
                )}
                
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    active
                      ? 'text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {/* Active state glow */}
                  {active && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 z-0 ${activeGlow ? 'opacity-100' : 'opacity-100'}`}></div>
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 z-0 ${activeGlow ? 'opacity-100 scale-110' : 'opacity-100 scale-100'}`}
                        style={{
                          transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                        }}
                      ></div>
                    </>
                  )}
                  
                  {/* Hover effect */}
                  {!active && (
                    <div 
                      className="absolute inset-0 bg-orange-50 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{
                        clipPath: hoveredItem === index ? 'circle(100% at center)' : 'circle(0% at center)',
                        transition: 'clip-path 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
                      }}
                    ></div>
                  )}
                  
                  <Icon 
                    className={`w-5 h-5 z-10 transition-transform ${active ? 'scale-110' : ''} ${hoveredItem === index && !active ? 'scale-105' : ''}`}
                    style={{
                      filter: active ? 'drop-shadow(0 0 2px rgba(255,255,255,0.8))' : 'none'
                    }}
                  />
                  <span 
                    className={`font-medium z-10 transition-all ${active ? 'font-semibold' : ''}`}
                    style={{
                      transform: hoveredItem === index && !active ? 'translateX(5px)' : 'translateX(0)'
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)] animate-ping-fast"></div>
                    </div>
                  )}
                </NavLink>
              </div>
            );
          })}
          
          {/* Floating orb that follows mouse */}
          <div 
            className="absolute top-0 left-0 w-4 h-4 bg-orange-400 rounded-full pointer-events-none opacity-0 transition-opacity duration-300"
            style={{
              transform: hoveredItem !== null ? `translateY(${hoveredItem! * 56 + 28}px)` : 'translateY(0)',
              opacity: hoveredItem !== null ? 0.3 : 0,
              filter: 'blur(8px)',
              transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.3s ease'
            }}
          />
        </nav>

        {/* Logout with animation */}
        <div className="p-4 border-t border-gray-100 relative">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:text-red-600 rounded-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            <LogOut className="w-5 h-5 z-10 transition-transform group-hover:scale-110" />
            <span className="font-medium z-10 transition-all group-hover:translate-x-1">Logout</span>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red-500">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
      
      {/* Add keyframes to your global CSS */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.05; transform: scale(1); }
            100% { opacity: 0.15; transform: scale(1.2); }
          }
          @keyframes pulse-fast {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }
          @keyframes ping-fast {
            0% { transform: scale(0.8); opacity: 1; }
            70%, 100% { transform: scale(2.5); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;