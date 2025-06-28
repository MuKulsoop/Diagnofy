import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Play, ChevronRight, Zap, Award, Activity, ClipboardList } from 'lucide-react';
import Button from '../components/UI/Button';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-100 to-red-100 opacity-20"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s infinite alternate`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="px-6 py-4 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className={`w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center transition-all duration-1000 ${isVisible ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'}`}
            >
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span 
              className={`text-xl font-bold text-gray-900 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
              style={{ transitionDelay: '100ms' }}
            >
              Diagnofy
            </span>
          </div>
          <Link to="/login">
            <Button 
              variant="outline"
              className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div 
              className={`w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h1 
              className={`text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            >
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Diagnofy</span>
            </h1>
            <p 
              className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: '500ms' }}
            >
              Advanced AI-powered medical training platform designed for healthcare professionals
            </p>
          </div>

          <div 
            className={`grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-orange-200 transition-colors duration-300">
                <Stethoscope className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Patient Simulation</h3>
              <p className="text-gray-600 text-sm">Interact with realistic AI patients and practice your diagnostic skills</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-red-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-red-200 transition-colors duration-300">
                <Play className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Diagnostic Training</h3>
              <p className="text-gray-600 text-sm">Comprehensive modules covering multiple medical specializations</p>
            </div>
          </div>

          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <Link to="/register">
              <Button 
                size="lg" 
                className="flex items-center gap-2 hover:gap-3 transition-all"
              >
                Get Started
                <ChevronRight className="w-5 h-5 transition-all" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="hover:bg-white/80 transition-colors"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className={`text-3xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              Why Choose Diagnofy?
            </h2>
            <p 
              className={`text-gray-600 max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: '900ms' }}
            >
              Our platform combines cutting-edge AI technology with comprehensive medical training to help you excel in your medical career.
            </p>
          </div>

          <div 
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            {[
              {
                title: 'Realistic Scenarios',
                description: 'Practice with AI-generated patient cases that mirror real-world medical situations.',
                icon: <Stethoscope className="w-8 h-8 text-orange-500 mx-auto" />,
                color: 'from-orange-50 to-orange-100'
              },
              {
                title: 'Instant Feedback',
                description: 'Get detailed analysis and feedback on your diagnostic decisions and reasoning.',
                icon: <Activity className="w-8 h-8 text-red-500 mx-auto" />,
                color: 'from-red-50 to-red-100'
              },
              {
                title: 'Track Progress',
                description: 'Monitor your improvement over time with comprehensive analytics and scoring.',
                icon: <ClipboardList className="w-8 h-8 text-amber-500 mx-auto" />,
                color: 'from-amber-50 to-amber-100'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`text-center bg-gradient-to-br ${feature.color} p-6 rounded-2xl border border-transparent hover:border-orange-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-md`}
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 mx-auto shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to enhance your diagnostic skills?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of medical professionals using Diagnofy</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                size="lg" 
                variant="white" 
                className="flex items-center gap-2 hover:gap-3 transition-all"
              >
                Get Started Free
                <Zap className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Add keyframes to your global CSS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;