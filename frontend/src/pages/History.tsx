import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { 
  Clock, 
  User, 
  Calendar, 
  Target, 
  Filter,
  Search,
  Eye,
  TrendingUp,
  Award,
  Plus,
  Activity,
  HeartPulse
} from 'lucide-react';
import { Session } from '../types';
import { apiService } from '../config/api';

const History: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('all');

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    filterSessions();
  }, [sessions, searchTerm, selectedSpecialization, selectedTimeframe]);

  const loadSessions = async () => {
    try {
      const sessionsData = await apiService.getSessions();
      setSessions(sessionsData);
    } catch (error) {
      console.error('Failed to load sessions:', error);
      // Mock data with healthStatus added
      const mockSessions: Session[] = [
        {
          _id: '1',
          user: 'user1',
          patient: {
            _id: '1',
            name: 'Sarah Johnson',
            age: 45,
            gender: 'Female',
            mainDiseases: ['Acute Myocardial Infarction'],
            criticalFactors: ['Chest Pain', 'High BP'],
            symptoms: ['Severe chest pain', 'Shortness of breath', 'Nausea'],
            emotionalState: 'Anxious',
            history: 'Previous hypertension, family history of heart disease',
            healthStatus: 35,
            createdAt: new Date().toISOString()
          },
          level: 'Intermediate',
          specialization: 'Cardiology',
          messages: [],
          testResults: [],
          finalDiagnosisReport: {
            questioningScore: 8.5,
            questioningFeedback: 'Good questioning',
            diagnosisScore: 9.0,
            diagnosisFeedback: 'Accurate diagnosis',
            treatmentScore: 8.0,
            treatmentFeedback: 'Appropriate treatment',
            overallScore: 8.5,
            summaryFeedback: 'Excellent work',
            strengths: ['Good reasoning'],
            areasToImprove: ['Consider more tests'],
            analyzedAt: new Date().toISOString()
          },
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '2',
          user: 'user1',
          patient: {
            _id: '2',
            name: 'Michael Chen',
            age: 32,
            gender: 'Male',
            mainDiseases: ['Pneumonia'],
            criticalFactors: ['Fever', 'Difficulty Breathing'],
            symptoms: ['High fever', 'Productive cough', 'Chest tightness'],
            emotionalState: 'Worried',
            history: 'Recent travel, smoker',
            healthStatus: 65,
            createdAt: new Date().toISOString()
          },
          level: 'Beginner',
          specialization: 'Pulmonology',
          messages: [],
          testResults: [],
          finalDiagnosisReport: {
            questioningScore: 7.0,
            questioningFeedback: 'Good questioning',
            diagnosisScore: 7.5,
            diagnosisFeedback: 'Correct diagnosis',
            treatmentScore: 7.8,
            treatmentFeedback: 'Good treatment plan',
            overallScore: 7.4,
            summaryFeedback: 'Good performance',
            strengths: ['Systematic approach'],
            areasToImprove: ['More detailed history'],
            analyzedAt: new Date().toISOString()
          },
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '3',
          user: 'user1',
          patient: {
            _id: '3',
            name: 'Emma Davis',
            age: 28,
            gender: 'Female',
            mainDiseases: ['Migraine'],
            criticalFactors: ['Severe Headache', 'Visual Disturbance'],
            symptoms: ['Pulsating headache', 'Light sensitivity', 'Nausea'],
            emotionalState: 'Distressed',
            history: 'History of migraines, high stress job',
            healthStatus: 85,
            createdAt: new Date().toISOString()
          },
          level: 'Advanced',
          specialization: 'Neurology',
          messages: [],
          testResults: [],
          finalDiagnosisReport: {
            questioningScore: 9.2,
            questioningFeedback: 'Excellent questioning',
            diagnosisScore: 8.8,
            diagnosisFeedback: 'Accurate diagnosis',
            treatmentScore: 9.0,
            treatmentFeedback: 'Comprehensive treatment',
            overallScore: 9.0,
            summaryFeedback: 'Outstanding performance',
            strengths: ['Thorough assessment', 'Patient empathy'],
            areasToImprove: ['Consider preventive measures'],
            analyzedAt: new Date().toISOString()
          },
          createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
        }
      ];
      setSessions(mockSessions);
    } finally {
      setLoading(false);
    }
  };

  const filterSessions = () => {
    let filtered = sessions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.patient.mainDiseases.some(disease => 
          disease.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        session.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Specialization filter
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(session => 
        session.specialization.toLowerCase() === selectedSpecialization.toLowerCase()
      );
    }

    // Timeframe filter
    if (selectedTimeframe !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (selectedTimeframe) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(session => 
        new Date(session.createdAt) >= filterDate
      );
    }

    setFilteredSessions(filtered);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8.5) return { 
      className: 'bg-green-100 text-green-800', 
      label: 'Excellent' 
    };
    if (score >= 7.0) return { 
      className: 'bg-yellow-100 text-yellow-800', 
      label: 'Good' 
    };
    return { 
      className: 'bg-red-100 text-red-800', 
      label: 'Fair' 
    };
  };

  const getHealthStatusColor = (health: number) => {
    if (health >= 70) return 'bg-green-500';
    if (health >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getHealthStatusLabel = (health: number) => {
    if (health >= 70) return 'Good';
    if (health >= 40) return 'Moderate';
    return 'Critical';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const calculateStats = () => {
    const completedSessions = sessions.filter(s => s.finalDiagnosisReport);
    const totalScore = completedSessions.reduce((sum, s) => 
      sum + (s.finalDiagnosisReport?.overallScore || 0), 0
    );
    
    return {
      totalSessions: sessions.length,
      averageScore: completedSessions.length > 0 ? totalScore / completedSessions.length : 0,
      bestScore: Math.max(...completedSessions.map(s => s.finalDiagnosisReport?.overallScore || 0))
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Diagnosis History</h1>
            <p className="text-gray-600 max-w-2xl">
              Review your past medical cases, track patient health status, and restart diagnoses
            </p>
          </div>
          <Link to="/modules">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200">
              <Plus size={18} />
              New Diagnosis
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
                <p className="text-sm text-gray-600">Total Sessions</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {(stats.averageScore * 10).toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600">Average Score</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {(stats.bestScore * 10).toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600">Best Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 mb-8 bg-white rounded-2xl shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by patient name, condition, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[180px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
                >
                  <option value="all">All Specializations</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="pulmonology">Pulmonology</option>
                  <option value="neurology">Neurology</option>
                  <option value="emergency">Emergency</option>
                  <option value="internal">Internal Medicine</option>
                </select>
              </div>
              <div className="relative flex-1 min-w-[150px]">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.length === 0 ? (
            <div className="p-12 text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No sessions found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedSpecialization !== 'all' || selectedTimeframe !== 'all'
                  ? 'Try adjusting your filters to see more results'
                  : 'Start your first medical training session to see your history here'
                }
              </p>
              <Link to="/modules">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-xl transition-colors duration-200">
                  Start New Diagnosis
                </button>
              </Link>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div 
                key={session._id} 
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{session.patient.name}</h3>
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                          {session.specialization}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {session.level}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatTimeAgo(session.createdAt)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-gray-600 mb-1">
                            {session.patient.age} years old, {session.patient.gender}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Condition:</span> {session.patient.mainDiseases.join(', ')}
                          </p>
                        </div>
                        
                        {/* Health Meter */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                              <HeartPulse className="w-4 h-4 text-rose-500" />
                              Health Status
                            </div>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${getHealthStatusColor(session.patient.healthStatus)}`}>
                              {getHealthStatusLabel(session.patient.healthStatus)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${getHealthStatusColor(session.patient.healthStatus)}`} 
                              style={{ width: `${session.patient.healthStatus}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0%</span>
                            <span>{session.patient.healthStatus}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-4">
                    {session.finalDiagnosisReport && (
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(session.finalDiagnosisReport.overallScore)}`}>
                          {(session.finalDiagnosisReport.overallScore * 10).toFixed(0)}%
                        </div>
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getScoreBadge(session.finalDiagnosisReport.overallScore).className}`}>
                          {getScoreBadge(session.finalDiagnosisReport.overallScore).label}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Link to={`/simulation/1`}>
                        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200">
                          <Activity className="w-4 h-4" />
                          Restart Diagnosis
                        </button>
                      </Link>
                      <Link to={`/analysis/${session._id}`}>
                        <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-xl transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default History;