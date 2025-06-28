import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Target, 
  Brain, 
  Heart, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { Session, DiagnosisReport } from '../types';
import { apiService } from '../config/api';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

const SessionAnalysis: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessionAnalysis();
  }, [sessionId]);

  const loadSessionAnalysis = async () => {
    try {
      if (sessionId) {
        const sessionData = await apiService.getSession(sessionId);
        setSession(sessionData);
      }
    } catch (error) {
      console.error('Failed to load session analysis:', error);
      // Mock data for development
      const mockSession: Partial<Session> = {
        _id: sessionId!,
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
        finalDiagnosisReport: {
          questioningScore: 8.5,
          questioningFeedback: 'Excellent questioning technique. You asked relevant questions about chest pain characteristics, associated symptoms, and medical history.',
          diagnosisScore: 9.0,
          diagnosisFeedback: 'Accurate diagnosis of STEMI based on clinical presentation and ECG findings. Well-reasoned approach.',
          treatmentScore: 8.0,
          treatmentFeedback: 'Appropriate initial treatment with aspirin and nitroglycerin. Consider adding clopidogrel and statin therapy.',
          overallScore: 8.5,
          summaryFeedback: 'Outstanding performance! You demonstrated strong clinical reasoning and diagnostic skills.',
          strengths: [
            'Systematic approach to chest pain evaluation',
            'Appropriate use of diagnostic tests',
            'Timely recognition of STEMI',
            'Good patient communication skills'
          ],
          areasToImprove: [
            'Consider dual antiplatelet therapy earlier',
            'Discuss risk factor modification in more detail',
            'Include family counseling in treatment plan'
          ],
          analyzedAt: new Date().toISOString()
        },
        createdAt: new Date().toISOString()
      };
      setSession(mockSession as Session);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8.5) return { variant: 'success' as const, label: 'Excellent' };
    if (score >= 7.0) return { variant: 'warning' as const, label: 'Good' };
    return { variant: 'error' as const, label: 'Needs Improvement' };
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const viewHistory = () => {
    navigate('/history');
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  const report = session?.finalDiagnosisReport;

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Session Complete!</h1>
          <p className="text-gray-600">
            Here's your performance analysis for {session?.patient.name}'s case
          </p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 mb-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold mb-2" style={{ color: getScoreColor(report?.overallScore || 0) }}>
              {((report?.overallScore || 0) * 10).toFixed(0)}%
            </div>
            <Badge variant={getScoreBadge(report?.overallScore || 0).variant} size="md">
              {getScoreBadge(report?.overallScore || 0).label}
            </Badge>
          </div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            {report?.summaryFeedback}
          </p>
        </Card>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Questioning</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${getScoreColor(report?.questioningScore || 0)}`}>
                    {((report?.questioningScore || 0) * 10).toFixed(0)}%
                  </span>
                  <Badge variant={getScoreBadge(report?.questioningScore || 0).variant} size="sm">
                    {getScoreBadge(report?.questioningScore || 0).label}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{report?.questioningFeedback}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Diagnosis</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${getScoreColor(report?.diagnosisScore || 0)}`}>
                    {((report?.diagnosisScore || 0) * 10).toFixed(0)}%
                  </span>
                  <Badge variant={getScoreBadge(report?.diagnosisScore || 0).variant} size="sm">
                    {getScoreBadge(report?.diagnosisScore || 0).label}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{report?.diagnosisFeedback}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Treatment</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${getScoreColor(report?.treatmentScore || 0)}`}>
                    {((report?.treatmentScore || 0) * 10).toFixed(0)}%
                  </span>
                  <Badge variant={getScoreBadge(report?.treatmentScore || 0).variant} size="sm">
                    {getScoreBadge(report?.treatmentScore || 0).label}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{report?.treatmentFeedback}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Strengths</h3>
            </div>
            <div className="space-y-3">
              {report?.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{strength}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Areas to Improve */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Areas to Improve</h3>
            </div>
            <div className="space-y-3">
              {report?.areasToImprove.map((area, index) => (
                <div key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{area}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Performance Breakdown</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Questioning', score: report?.questioningScore || 0, color: 'bg-blue-500' },
              { label: 'Diagnosis', score: report?.diagnosisScore || 0, color: 'bg-green-500' },
              { label: 'Treatment', score: report?.treatmentScore || 0, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${item.color} transition-all duration-1000`}
                      style={{ width: `${(item.score * 10)}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-600">{(item.score * 10).toFixed(0)}%</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={goToDashboard} size="lg" className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={viewHistory} size="lg" className="flex items-center gap-2">
            View All Sessions
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SessionAnalysis;