import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  User as UserIcon,
  Crown,
  Star,
  Target,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserType } from '../types';
import { apiService } from '../config/api';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';

interface LeaderboardUser extends UserType {
  rank: number;
  totalScore: number;
  casesCompleted: number;
  averageScore: number;
  studyHours: number;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  }
};

const podiumVariants = {
  hidden: { opacity: 0, y: 50 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      type: "spring",
      stiffness: 300
    }
  })
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const shimmerVariants = {
  shimmer: {
    backgroundPosition: ['-100% 0', '100% 0'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    loadLeaderboard();
  }, [timeframe]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const users = await apiService.getLeaderboard();
      // Transform and sort users for leaderboard
      const leaderboardData: LeaderboardUser[] = users.map((u, index) => ({
        ...u,
        rank: index + 1,
        totalScore: Math.floor(Math.random() * 1000) + 500, // Mock data
        casesCompleted: Math.floor(Math.random() * 50) + 10,
        averageScore: Math.floor(Math.random() * 30) + 70,
        studyHours: Math.floor(Math.random() * 100) + 20
      }));
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      // Mock data for development
      const mockLeaderboard: LeaderboardUser[] = [
        {
          _id: '1',
          name: 'Dr. Sarah Chen',
          email: 'sarah@example.com',
          specialization: 'Cardiology',
          experienceLevel: 'Advanced',
          institutionName: 'Harvard Medical School',
          location: { city: 'Boston', state: 'MA', country: 'USA' },
          currentRole: 'Resident',
          interests: ['Cardiology', 'Emergency Medicine'],
          onboardingCompleted: true,
          createdAt: new Date().toISOString(),
          rank: 1,
          totalScore: 950,
          casesCompleted: 45,
          averageScore: 94,
          studyHours: 120
        },
        {
          _id: '2',
          name: 'Dr. Michael Rodriguez',
          email: 'michael@example.com',
          specialization: 'Emergency',
          experienceLevel: 'Intermediate',
          institutionName: 'Johns Hopkins',
          location: { city: 'Baltimore', state: 'MD', country: 'USA' },
          currentRole: 'Resident',
          interests: ['Emergency Medicine', 'Trauma'],
          onboardingCompleted: true,
          createdAt: new Date().toISOString(),
          rank: 2,
          totalScore: 920,
          casesCompleted: 42,
          averageScore: 91,
          studyHours: 115
        },
        {
          _id: '3',
          name: 'Dr. Emily Johnson',
          email: 'emily@example.com',
          specialization: 'Neurology',
          experienceLevel: 'Advanced',
          institutionName: 'Stanford Medical',
          location: { city: 'Stanford', state: 'CA', country: 'USA' },
          currentRole: 'Practitioner',
          interests: ['Neurology', 'Research'],
          onboardingCompleted: true,
          createdAt: new Date().toISOString(),
          rank: 3,
          totalScore: 890,
          casesCompleted: 38,
          averageScore: 89,
          studyHours: 98
        },
        {
          _id: '4',
          name: 'Dr. James Wilson',
          email: 'james@example.com',
          specialization: 'Internal',
          experienceLevel: 'Intermediate',
          institutionName: 'Mayo Clinic',
          location: { city: 'Rochester', state: 'MN', country: 'USA' },
          currentRole: 'Resident',
          interests: ['Internal Medicine', 'Diagnostics'],
          onboardingCompleted: true,
          createdAt: new Date().toISOString(),
          rank: 4,
          totalScore: 875,
          casesCompleted: 40,
          averageScore: 87,
          studyHours: 105
        },
        {
          _id: '5',
          name: 'Dr. Lisa Park',
          email: 'lisa@example.com',
          specialization: 'Pediatrics',
          experienceLevel: 'Beginner',
          institutionName: 'UCLA Medical',
          location: { city: 'Los Angeles', state: 'CA', country: 'USA' },
          currentRole: 'Student',
          yearOfStudy: 4,
          interests: ['Pediatrics', 'Child Development'],
          onboardingCompleted: true,
          createdAt: new Date().toISOString(),
          rank: 5,
          totalScore: 850,
          casesCompleted: 35,
          averageScore: 85,
          studyHours: 90
        }
      ];
      setLeaderboard(mockLeaderboard);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_30px_rgba(234,179,8,0.5)]';
      case 2:
        return 'bg-gradient-to-br from-gray-300 to-gray-500 shadow-[0_0_20px_rgba(156,163,175,0.4)]';
      case 3:
        return 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_20px_rgba(217,119,6,0.4)]';
      default:
        return 'bg-gradient-to-br from-gray-100 to-gray-200';
    }
  };

  const currentUserRank = leaderboard.find(u => u._id === user?._id);

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gradient-to-r from-orange-100 to-amber-100 rounded w-1/4 mx-auto"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            animate={{ rotate: [0, 10, -10, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
            transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
            style={{ 
              backgroundSize: '200% 100%',
            }}
          >
            Leaderboard
          </motion.h1>
          <p className="text-gray-600">See how you rank among medical training peers</p>
        </motion.div>

        {/* Timeframe Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-1 flex shadow-md">
            {(['week', 'month', 'all'] as const).map((period, i) => (
              <motion.button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeframe === period
                    ? 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.4 }}
              >
                {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'All Time'}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Current User Rank */}
        {currentUserRank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 mb-8 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 shadow-lg relative overflow-hidden">
              <motion.div 
                className="absolute inset-0"
                variants={shimmerVariants}
                animate="shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  backgroundSize: '200% 100%',
                }}
              />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className={`w-12 h-12 ${getRankColor(currentUserRank.rank)} rounded-xl flex items-center justify-center shadow-md`}
                    variants={pulseVariants}
                    animate="pulse"
                  >
                    {getRankIcon(currentUserRank.rank)}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Your Rank</h3>
                    <p className="text-sm text-gray-600">#{currentUserRank.rank} out of {leaderboard.length}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">{currentUserRank.totalScore}</p>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Top 3 Podium */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {leaderboard.slice(0, 3).map((user, index) => (
            <motion.div 
              key={user._id} 
              className={index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}
              custom={index}
              variants={podiumVariants}
            >
              <Card 
                className={`p-6 text-center h-full relative overflow-hidden ${
                  index === 0 
                    ? 'ring-2 ring-yellow-400 shadow-[0_10px_40px_rgba(234,179,8,0.3)]' 
                    : ''
                }`}
              >
                {index === 0 && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse" />
                )}
                <motion.div 
                  className={`w-16 h-16 ${getRankColor(user.rank)} rounded-full flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.1 }}
                >
                  {getRankIcon(user.rank)}
                </motion.div>
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <UserIcon className="w-6 h-6 text-blue-600" />
                </motion.div>
                <motion.h3 
                  className="font-semibold text-gray-900 mb-1"
                  whileHover={{ scale: 1.03 }}
                >
                  {user.name}
                </motion.h3>
                <Badge 
                  variant="secondary" 
                  size="sm" 
                  className="mb-3 shadow-sm"
                >
                  {user.specialization}
                </Badge>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Score</span>
                    <span className="font-medium">{user.totalScore}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cases</span>
                    <span className="font-medium">{user.casesCompleted}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Score</span>
                    <span className="font-medium">{user.averageScore}%</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Full Rankings</h2>
            </div>
            <motion.div 
              className="divide-y divide-gray-100"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence>
                {leaderboard.map((user) => (
                  <motion.div 
                    key={user._id} 
                    variants={itemVariants}
                    className={`p-4 md:p-6 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition-all ${
                      user._id === currentUserRank?._id 
                        ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500' 
                        : ''
                    }`}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                    }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${getRankColor(user.rank)} rounded-xl flex items-center justify-center shadow-sm`}>
                          {getRankIcon(user.rank)}
                        </div>
                        <motion.div 
                          className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 20 }}
                          transition={{ type: "spring" }}
                        >
                          <UserIcon className="w-5 h-5 text-blue-600" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" size="sm" className="shadow-sm">
                              {user.specialization}
                            </Badge>
                            <span className="text-sm text-gray-500">{user.institutionName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 md:gap-8">
                        <div className="text-center min-w-[70px]">
                          <div className="flex items-center gap-1 mb-1 justify-center">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-gray-900">{user.totalScore}</span>
                          </div>
                          <p className="text-xs text-gray-500">Total Score</p>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="flex items-center gap-1 mb-1 justify-center">
                            <Target className="w-4 h-4 text-green-500" />
                            <span className="font-bold text-gray-900">{user.casesCompleted}</span>
                          </div>
                          <p className="text-xs text-gray-500">Cases</p>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="flex items-center gap-1 mb-1 justify-center">
                            <TrendingUp className="w-4 h-4 text-blue-500" />
                            <span className="font-bold text-gray-900">{user.averageScore}%</span>
                          </div>
                          <p className="text-xs text-gray-500">Avg Score</p>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="flex items-center gap-1 mb-1 justify-center">
                            <Clock className="w-4 h-4 text-purple-500" />
                            <span className="font-bold text-gray-900">{user.studyHours}h</span>
                          </div>
                          <p className="text-xs text-gray-500">Study Time</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Leaderboard;