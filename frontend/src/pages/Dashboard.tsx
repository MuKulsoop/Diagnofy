import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Target, TrendingUp, Award, Heart, Stethoscope, Brain, Settings as Lungs, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../config/api';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

interface DashboardStats {
  casesCompleted: number;
  averageScore: number;
  studyHours: number;
  currentStreak: number;
}

interface RecentActivity {
  id: string;
  title: string;
  score: number;
  timeAgo: string;
}

interface ModuleProgress {
  name: string;
  cases: number;
  progress: number;
  icon: React.ComponentType<any>;
  color: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    casesCompleted: 0,
    averageScore: 0,
    studyHours: 0,
    currentStreak: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // In a real app, these would be separate API calls
      const sessions = await apiService.getSessions();
      
      // Calculate stats from sessions
      const completedSessions = sessions.filter(s => s.finalDiagnosis);
      const totalScore = completedSessions.reduce((sum, s) => 
        sum + (s.finalDiagnosisReport?.overallScore || 0), 0
      );

      setStats({
        casesCompleted: completedSessions.length,
        averageScore: completedSessions.length > 0 ? Math.round(totalScore / completedSessions.length * 10) : 0,
        studyHours: Math.round(completedSessions.length * 1.5), // Estimated
        currentStreak: 7 // Mock data
      });

      // Set recent activity
      setRecentActivity(
        sessions.slice(0, 3).map(session => ({
          id: session._id,
          title: `${session.patient.name} Case`,
          score: session.finalDiagnosisReport?.overallScore ? 
            Math.round(session.finalDiagnosisReport.overallScore * 10) : 0,
          timeAgo: new Date(session.createdAt).toLocaleDateString()
        }))
      );
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Set mock data as fallback
      setStats({
        casesCompleted: 24,
        averageScore: 87,
        studyHours: 48,
        currentStreak: 7
      });
      setRecentActivity([
        { id: '1', title: 'Acute MI Case', score: 94, timeAgo: '2 hours ago' },
        { id: '2', title: 'Pneumonia Case', score: 78, timeAgo: '1 day ago' },
        { id: '3', title: 'GERD Case', score: 89, timeAgo: '2 days ago' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const modules: ModuleProgress[] = [
    {
      name: 'Cardiology Cases',
      cases: 12,
      progress: 75,
      icon: Heart,
      color: 'text-red-500'
    },
    {
      name: 'Pulmonology Cases',
      cases: 8,
      progress: 60,
      icon: Lungs,
      color: 'text-blue-500'
    },
    {
      name: 'Emergency Medicine',
      cases: 15,
      progress: 45,
      icon: Stethoscope,
      color: 'text-orange-500'
    },
    {
      name: 'Internal Medicine',
      cases: 20,
      progress: 30,
      icon: Brain,
      color: 'text-purple-500'
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
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
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-orange-100 mb-6">Ready to continue your medical training?</p>
              <div className="flex gap-4">
                <Link to="/modules">
                  <Button variant="secondary" className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Start New Case
                  </Button>
                </Link>
                <Link to="/history">
                  <Button variant="outline" className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10">
                    <Clock className="w-5 h-5" />
                    View History
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Cases Completed',
              value: stats.casesCompleted,
              icon: Award,
              color: 'text-green-500',
              bg: 'bg-green-50'
            },
            {
              label: 'Average Score',
              value: `${stats.averageScore}%`,
              icon: Target,
              color: 'text-blue-500',
              bg: 'bg-blue-50'
            },
            {
              label: 'Study Hours',
              value: `${stats.studyHours}h`,
              icon: Clock,
              color: 'text-purple-500',
              bg: 'bg-purple-50'
            },
            {
              label: 'Current Streak',
              value: `${stats.currentStreak} days`,
              icon: TrendingUp,
              color: 'text-orange-500',
              bg: 'bg-orange-50'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Learning Modules</h2>
              <Link to="/modules">
                <Button variant="ghost" className="flex items-center gap-2">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Card key={index} className="p-6" hover>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${module.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.name}</h3>
                        <p className="text-gray-600 text-sm">{module.cases} cases</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              <Link to="/history">
                <Button variant="ghost" className="text-orange-600">
                  View All Sessions →
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <Card key={activity.id} className="p-4" hover>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <Badge variant={activity.score >= 90 ? 'success' : activity.score >= 70 ? 'warning' : 'error'}>
                      {activity.score}%
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{activity.timeAgo}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;