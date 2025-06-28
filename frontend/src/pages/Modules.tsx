import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Settings as Lungs, Stethoscope, Baby, Activity, Search, Filter, ChevronRight, Star } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Badge from '../components/UI/Badge';

interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  cases: number;
  progress: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  estimatedTime: string;
}

const Modules: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setModules([
      {
        id: 'cardiology',
        name: 'Cardiology Cases',
        description: 'Master cardiac emergencies and chronic conditions',
        icon: Heart,
        color: 'text-red-500',
        cases: 12,
        progress: 75,
        difficulty: 'Intermediate',
        rating: 4.8,
        estimatedTime: '2-3 hours'
      },
      {
        id: 'pulmonology',
        name: 'Pulmonology Cases',
        description: 'Respiratory conditions and diagnostic challenges',
        icon: Lungs,
        color: 'text-blue-500',
        cases: 8,
        progress: 60,
        difficulty: 'Beginner',
        rating: 4.6,
        estimatedTime: '1-2 hours'
      },
      {
        id: 'neurology',
        name: 'Neurology Cases',
        description: 'Complex neurological disorders and assessments',
        icon: Brain,
        color: 'text-purple-500',
        cases: 10,
        progress: 30,
        difficulty: 'Advanced',
        rating: 4.9,
        estimatedTime: '3-4 hours'
      },
      {
        id: 'emergency',
        name: 'Emergency Medicine',
        description: 'Critical care and rapid assessment skills',
        icon: Stethoscope,
        color: 'text-orange-500',
        cases: 15,
        progress: 45,
        difficulty: 'Advanced',
        rating: 4.7,
        estimatedTime: '2-3 hours'
      },
      {
        id: 'pediatrics',
        name: 'Pediatric Cases',
        description: 'Child and adolescent medical conditions',
        icon: Baby,
        color: 'text-green-500',
        cases: 9,
        progress: 20,
        difficulty: 'Intermediate',
        rating: 4.5,
        estimatedTime: '2-3 hours'
      },
      {
        id: 'internal',
        name: 'Internal Medicine',
        description: 'Complex medical cases and differential diagnosis',
        icon: Activity,
        color: 'text-indigo-500',
        cases: 20,
        progress: 10,
        difficulty: 'Advanced',
        rating: 4.8,
        estimatedTime: '3-5 hours'
      }
    ]);
  }, []);

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             module.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'secondary';
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Modules</h1>
          <p className="text-gray-600">Choose a specialization to start practicing with AI patients</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.id} className="p-6 group" hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Icon className={`w-6 h-6 ${module.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {module.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{module.rating}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{module.cases} cases</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={getDifficultyColor(module.difficulty) as any}>
                    {module.difficulty}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {module.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    ⏱️ {module.estimatedTime}
                  </span>
                  <Link to={`/modules/${module.id}/patients`}>
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2 group-hover:shadow-lg transition-all duration-200"
                    >
                      Start Module
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No modules found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Modules;