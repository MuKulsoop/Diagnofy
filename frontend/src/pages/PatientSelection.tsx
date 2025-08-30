import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Heart, 
  AlertCircle, 
  Clock,
  Filter,
  Search,
  ChevronLeft
} from 'lucide-react';
import { Patient } from '../types';
import { apiService } from '../config/api';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Badge from '../components/UI/Badge';

const PatientSelection: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');

  useEffect(() => {
    loadPatients();
  }, [moduleId]);

  const loadPatients = async () => {
    try {
      // In a real app, this would filter by module/specialization
      // const patientsData = await apiService.getPatients();
      console.log(patientsData)
      setPatients(patientsData);
    } catch (error) {
      console.error('Failed to load patients:', error);
      // Set mock data as fallback
      setPatients([
        {
          _id: '1',
          name: 'Sarah Johnson',
          age: 45,
          gender: 'Female',
          mainDiseases: ['Acute Myocardial Infarction'],
          criticalFactors: ['Chest Pain', 'High BP'],
          symptoms: ['Severe chest pain', 'Shortness of breath', 'Nausea'],
          emotionalState: 'Anxious',
          history: 'Previous hypertension, family history of heart disease',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Michael Chen',
          age: 32,
          gender: 'Male',
          mainDiseases: ['Pneumonia'],
          criticalFactors: ['Fever', 'Difficulty Breathing'],
          symptoms: ['High fever', 'Productive cough', 'Chest tightness'],
          emotionalState: 'Worried',
          history: 'Recent travel, smoker',
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Emma Davis',
          age: 28,
          gender: 'Female',
          mainDiseases: ['Migraine'],
          criticalFactors: ['Severe Headache', 'Visual Disturbance'],
          symptoms: ['Pulsating headache', 'Light sensitivity', 'Nausea'],
          emotionalState: 'Distressed',
          history: 'History of migraines, high stress job',
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getComplexityLevel = (patient: Patient): 'Low' | 'Medium' | 'High' => {
    const factorCount = patient.criticalFactors.length + patient.symptoms.length;
    if (factorCount <= 3) return 'Low';
    if (factorCount <= 6) return 'Medium';
    return 'High';
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'error';
      default: return 'secondary';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.mainDiseases.some(disease => 
                           disease.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const complexity = getComplexityLevel(patient);
    const matchesComplexity = selectedComplexity === 'all' || 
                             complexity.toLowerCase() === selectedComplexity.toLowerCase();
    return matchesSearch && matchesComplexity;
  });

  const getModuleName = (moduleId: string) => {
    const moduleNames: { [key: string]: string } = {
      cardiology: 'Cardiology',
      pulmonology: 'Pulmonology',
      neurology: 'Neurology',
      emergency: 'Emergency Medicine',
      pediatrics: 'Pediatrics',
      internal: 'Internal Medicine'
    };
    return moduleNames[moduleId] || 'Medical';
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/modules">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Modules
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getModuleName(moduleId!)} Cases
            </h1>
            <p className="text-gray-600">Select a patient to start your simulation</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="all">All Complexity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Patient Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => {
            const complexity = getComplexityLevel(patient);
            return (
              <Card key={patient._id} className="p-6 group" hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {patient.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {patient.age} years old, {patient.gender}
                      </div>
                    </div>
                  </div>
                  <Badge variant={getComplexityColor(complexity) as any}>
                    {complexity}
                  </Badge>
                </div>

                {/* Main Condition */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">Primary Condition</span>
                  </div>
                  <p className="text-gray-900 font-medium">{patient.mainDiseases[0]}</p>
                </div>

                {/* Key Symptoms */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">Key Symptoms</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {patient.symptoms.slice(0, 2).map((symptom, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {symptom}
                      </Badge>
                    ))}
                    {patient.symptoms.length > 2 && (
                      <Badge variant="secondary" size="sm">
                        +{patient.symptoms.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Emotional State */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">😟</span>
                    <span className="text-sm text-gray-600">Patient is {patient.emotionalState.toLowerCase()}</span>
                  </div>
                </div>

                {/* Action */}
                <Link to={`/simulation/${patient._id}`}>
                  <Button 
                    className="w-full flex items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-200"
                  >
                    <Clock className="w-4 h-4" />
                    Start Session
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PatientSelection;