import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Briefcase,
  Edit3,
  Save,
  X,
  Award,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Badge from '../components/UI/Badge';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    experienceLevel: '',
    institutionName: '',
    location: {
      city: '',
      state: '',
      country: ''
    },
    currentRole: '',
    yearOfStudy: 0,
    interests: [] as string[]
  });
  

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        specialization: user.specialization || '',
        experienceLevel: user.experienceLevel || '',
        institutionName: user.institutionName || '',
        location: user.location || { city: '', state: '', country: '' },
        currentRole: user.currentRole || '',
        yearOfStudy: user.yearOfStudy || 0,
        interests: user.interests || []
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser(formData);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        specialization: user.specialization || '',
        experienceLevel: user.experienceLevel || '',
        institutionName: user.institutionName || '',
        location: user.location || { city: '', state: '', country: '' },
        currentRole: user.currentRole || '',
        yearOfStudy: user.yearOfStudy || 0,
        interests: user.interests || []
      });
    }
    setEditing(false);
  };

  const specializations = [
    { value: 'General', label: 'General Medicine' },
    { value: 'Pediatrics', label: 'Pediatrics' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Gynecology', label: 'Gynecology' },
    { value: 'Emergency', label: 'Emergency Medicine' },
    { value: 'Other', label: 'Other' }
  ];

  const experienceLevels = [
    { value: 'Beginner', label: 'Beginner (0-2 years)' },
    { value: 'Intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'Advanced', label: 'Advanced (5+ years)' }
  ];

  const roles = [
    { value: 'Student', label: 'Medical Student' },
    { value: 'Intern', label: 'Intern' },
    { value: 'Resident', label: 'Resident' },
    { value: 'Practitioner', label: 'Practicing Physician' }
  ];

  // Mock achievements data
  const achievements = [
    { name: 'First Diagnosis', description: 'Complete your first case', earned: true },
    { name: 'Perfect Score', description: 'Score 100% on a case', earned: true },
    { name: 'Cardiology Expert', description: 'Complete 10 cardiology cases', earned: false },
    { name: 'Speed Demon', description: 'Complete a case in under 10 minutes', earned: false }
  ];

  const stats = {
    casesCompleted: 24,
    averageScore: 87,
    studyHours: 48,
    currentStreak: 7
  };

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account information and track your progress</p>
          </div>
          {!editing ? (
            <Button onClick={() => setEditing(true)} className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} loading={loading} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!editing}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!editing}
                />
                <Select
                  label="Specialization"
                  options={specializations}
                  value={formData.specialization}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                  disabled={!editing}
                />
                <Select
                  label="Experience Level"
                  options={experienceLevels}
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                  disabled={!editing}
                />
              </div>
            </Card>

            {/* Professional Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Institution Name"
                  value={formData.institutionName}
                  onChange={(e) => setFormData(prev => ({ ...prev, institutionName: e.target.value }))}
                  disabled={!editing}
                />
                <Select
                  label="Current Role"
                  options={roles}
                  value={formData.currentRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                  disabled={!editing}
                />
                {formData.currentRole === 'Student' && (
                  <Input
                    label="Year of Study"
                    type="number"
                    value={formData.yearOfStudy.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, yearOfStudy: parseInt(e.target.value) || 0 }))}
                    disabled={!editing}
                  />
                )}
              </div>
            </Card>

            {/* Location */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="City"
                  value={formData.location.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, city: e.target.value }
                  }))}
                  disabled={!editing}
                />
                <Input
                  label="State"
                  value={formData.location.state}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, state: e.target.value }
                  }))}
                  disabled={!editing}
                />
                <Input
                  label="Country"
                  value={formData.location.country}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, country: e.target.value }
                  }))}
                  disabled={!editing}
                />
              </div>
            </Card>

            {/* Interests */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Areas of Interest</h3>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest, index) => (
                  <Badge key={index} variant="primary">
                    {interest}
                  </Badge>
                ))}
                {formData.interests.length === 0 && (
                  <p className="text-gray-500 text-sm">No interests selected</p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{user?.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{user?.specialization}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {user?.location?.city && user?.location?.country ? 
                  `${user.location.city}, ${user.location.country}` : 
                  'Location not set'
                }
              </div>
            </Card>

            {/* Performance Stats */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Performance Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Cases Completed</span>
                  </div>
                  <span className="font-medium">{stats.casesCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Average Score</span>
                  </div>
                  <span className="font-medium">{stats.averageScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">Study Hours</span>
                  </div>
                  <span className="font-medium">{stats.studyHours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Current Streak</span>
                  </div>
                  <span className="font-medium">{stats.currentStreak} days</span>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                    achievement.earned ? 'bg-green-50' : 'bg-gray-50'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                      <Award className={`w-4 h-4 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${
                        achievement.earned ? 'text-green-900' : 'text-gray-600'
                      }`}>
                        {achievement.name}
                      </p>
                      <p className={`text-xs ${
                        achievement.earned ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;