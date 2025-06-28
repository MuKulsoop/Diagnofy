import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  User, 
  Calendar, 
  Target, 
  Filter,
  Search,
  Eye,
  TrendingUp,
  Award
} from 'lucide-react';
import { Session } from '../types';
import { apiService } from '../config/api';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Badge from '../components/UI/Badge';

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
      // Mock data for development
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
    if (score >= 8.5) return { variant: 'success' as const, label: 'Excellent' };
    if (score >= 7.0) return { variant: 'warning' as const, label: 'Good' };
    return { variant: 'error' as const, label: 'Fair' };
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
      <Layout>
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
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Session History</h1>
          <p className="text-gray-600">Review your past medical training sessions and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
                <p className="text-sm text-gray-600">Total Sessions</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
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
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {(stats.bestScore * 10).toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600">Best Score</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by patient name, condition, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="all">All Specializations</option>
                <option value="cardiology">Cardiology</option>
                <option value="pulmonology">Pulmonology</option>
                <option value="neurology">Neurology</option>
                <option value="emergency">Emergency</option>
                <option value="internal">Internal Medicine</option>
              </select>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.length === 0 ? (
            <Card className="p-12 text-center">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No sessions found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedSpecialization !== 'all' || selectedTimeframe !== 'all'
                  ? 'Try adjusting your filters to see more results'
                  : 'Start your first medical training session to see your history here'
                }
              </p>
              <Link to="/modules">
                <Button>Start New Session</Button>
              </Link>
            </Card>
          ) : (
            filteredSessions.map((session) => (
              <Card key={session._id} className="p-6" hover>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{session.patient.name}</h3>
                        <Badge variant="secondary" size="sm">{session.specialization}</Badge>
                        <Badge variant="secondary" size="sm">{session.level}</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {session.patient.age} years old, {session.patient.gender}
                      </p>
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Condition:</strong> {session.patient.mainDiseases.join(', ')}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatTimeAgo(session.createdAt)}
                        </div>
                        {session.finalDiagnosisReport && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            Score: {(session.finalDiagnosisReport.overallScore * 10).toFixed(0)}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {session.finalDiagnosisReport && (
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(session.finalDiagnosisReport.overallScore)}`}>
                          {(session.finalDiagnosisReport.overallScore * 10).toFixed(0)}%
                        </div>
                        <Badge variant={getScoreBadge(session.finalDiagnosisReport.overallScore).variant} size="sm">
                          {getScoreBadge(session.finalDiagnosisReport.overallScore).label}
                        </Badge>
                      </div>
                    )}
                    <Link to={`/analysis/${session._id}`}>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;