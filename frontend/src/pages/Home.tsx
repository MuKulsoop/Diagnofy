import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Play, ChevronRight } from 'lucide-react';
import Button from '../components/UI/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Diagnofy</span>
          </div>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Diagnofy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Advanced AI-powered medical training platform designed for healthcare professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Stethoscope className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Patient Simulation</h3>
              <p className="text-gray-600 text-sm">Interact with realistic AI patients and practice your diagnostic skills</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Play className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Diagnostic Training</h3>
              <p className="text-gray-600 text-sm">Comprehensive modules covering multiple medical specializations</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="flex items-center gap-2">
                Get Started
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Diagnofy?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with comprehensive medical training to help you excel in your medical career.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Realistic Scenarios',
                description: 'Practice with AI-generated patient cases that mirror real-world medical situations.',
                icon: '🏥'
              },
              {
                title: 'Instant Feedback',
                description: 'Get detailed analysis and feedback on your diagnostic decisions and reasoning.',
                icon: '📊'
              },
              {
                title: 'Track Progress',
                description: 'Monitor your improvement over time with comprehensive analytics and scoring.',
                icon: '📈'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;