import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Play, 
  Users, 
  Award, 
  Brain, 
  Heart, 
  Activity, 
  Star, 
  ChevronRight,
  CheckCircle,
  Zap,
  Target,
  Trophy,
  BookOpen,
  Globe,
  Shield,
  Sparkles,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Patients',
      description: 'Interact with realistic AI patients that respond dynamically to your medical decisions',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Heart,
      title: 'Real Medical Cases',
      description: 'Practice with authentic medical scenarios across multiple specializations',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Earn badges, points, and climb the leaderboard as you master medical skills',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with medical professionals worldwide and learn from each other',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Skill Assessment',
      description: 'Get detailed feedback on your diagnostic accuracy and clinical reasoning',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Modules',
      description: 'Access specialized training modules for different medical fields',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Medical Students', icon: Users },
    { number: '1000+', label: 'AI Patients', icon: Heart },
    { number: '95%', label: 'Success Rate', icon: Target },
    { number: '24/7', label: 'Available', icon: Globe }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Medical Student, Harvard',
      content: 'Diagnofy transformed my learning experience. The AI patients feel incredibly real!',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Resident, Johns Hopkins',
      content: 'The gamification aspect makes learning addictive. I practice for hours without realizing it.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Attending, Mayo Clinic',
      content: 'Perfect for continuous learning. The cases are challenging and educational.',
      avatar: '👩‍⚕️'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Diagnofy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-orange-500 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-orange-500 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-orange-500 transition-colors">Testimonials</a>
              <Link to="/login" className="text-gray-700 hover:text-orange-500 transition-colors">Login</Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-slide-down">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-orange-500 transition-colors px-4">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-orange-500 transition-colors px-4">How it Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-orange-500 transition-colors px-4">Testimonials</a>
                <Link to="/login" className="text-gray-700 hover:text-orange-500 transition-colors px-4">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mx-4 text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-orange-200 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Virtual Patients
              <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Real Skills
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of medical education with our gamified AI platform. 
              Practice with realistic patients, earn achievements, and become a better doctor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="animate-bounce-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <stat.icon className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Brain className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Diagnofy?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with gamification to create 
              the most engaging medical learning experience ever built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and begin your journey to becoming a better medical professional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Path',
                description: 'Select your specialization and experience level to get personalized content',
                icon: Target,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'Meet AI Patients',
                description: 'Interact with realistic AI patients presenting various medical conditions',
                icon: Users,
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '03',
                title: 'Earn & Learn',
                description: 'Get instant feedback, earn points, and climb the global leaderboard',
                icon: Trophy,
                color: 'from-yellow-500 to-orange-500'
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative text-center animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-4 border-gray-100">
                  <span className="text-lg font-bold text-gray-900">{step.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 -right-16 w-32 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of medical professionals who are already transforming their careers with Diagnofy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Medical Career?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join the future of medical education today. Start practicing with AI patients 
              and see your skills improve dramatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Free Trial
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="group text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Diagnofy</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Revolutionizing medical education through AI-powered patient simulations 
                and gamified learning experiences.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Diagnofy. All rights reserved. Made with ❤️ for medical professionals worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;