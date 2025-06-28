import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    specialization: '',
    experienceLevel: '',
    institutionName: '',
    location: { city: '', state: '', country: '' },
    currentRole: '',
    yearOfStudy: '',
    interests: [] as string[]
  });

  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Welcome to Diagnofy',
      subtitle: "Let's start your medical AI training journey",
      component: <WelcomeStep />
    },
    {
      title: 'Your Medical Background',
      subtitle: 'Tell us about your specialization and experience',
      component: <BackgroundStep formData={formData} setFormData={setFormData} />
    },
    {
      title: 'Institution & Location',
      subtitle: 'Where are you currently studying or practicing?',
      component: <InstitutionStep formData={formData} setFormData={setFormData} />
    },
    {
      title: 'Learning Preferences',
      subtitle: 'What areas would you like to focus on?',
      component: <PreferencesStep formData={formData} setFormData={setFormData} />
    },
    {
      title: 'All Set!',
      subtitle: 'Your profile is ready. Start your training now.',
      component: <CompletionStep />
    }
  ];

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      setLoading(true);
      try {
        // await updateUser({ ...formData, onboardingCompleted: true });
        navigate('/dashboard');
      } catch (error) {
        console.error('Onboarding completion failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div className="text-sm text-orange-600 mb-2">Step {currentStep + 1} of {steps.length}</div>
          <div className="flex space-x-2 justify-center mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-600">{steps[currentStep].subtitle}</p>
          </div>

          <div className="mb-8">
            {steps[currentStep].component}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
     
            <Button
              onClick={handleNext}
              loading={loading}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
              <ChevronRight className="w-4 h-4" />
            </Button>
        
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomeStep: React.FC = () => (
  <div className="text-center py-8">
    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
      <div className="bg-orange-50 p-6 rounded-2xl">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
          <Stethoscope className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">AI Patient Simulation</h3>
        <p className="text-sm text-gray-600">Practice with realistic AI patients</p>
      </div>
      <div className="bg-red-50 p-6 rounded-2xl">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
          <span className="text-lg">🎯</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Diagnostic Training</h3>
        <p className="text-sm text-gray-600">Improve your diagnostic accuracy</p>
      </div>
    </div>
    <p className="text-gray-600 mt-6">
      Advanced AI-powered medical training platform designed for healthcare professionals
    </p>
  </div>
);

interface StepProps {
  formData: any;
  setFormData: (data: any) => void;
}

const BackgroundStep: React.FC<StepProps> = ({ formData, setFormData }) => {
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

  return (
    <div className="space-y-6">
      <Select
        label="Medical Specialization"
        options={specializations}
        value={formData.specialization}
        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
      />
      <Select
        label="Experience Level"
        options={experienceLevels}
        value={formData.experienceLevel}
        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
      />
      <Select
        label="Current Role"
        options={roles}
        value={formData.currentRole}
        onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
      />
      {formData.currentRole === 'Student' && (
        <Input
          label="Year of Study"
          type="number"
          value={formData.yearOfStudy}
          onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
          placeholder="e.g., 3"
        />
      )}
    </div>
  );
};

const InstitutionStep: React.FC<StepProps> = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <Input
      label="Institution Name"
      value={formData.institutionName}
      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
      placeholder="e.g., Harvard Medical School"
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input
        label="City"
        value={formData.location.city}
        onChange={(e) => setFormData({ 
          ...formData, 
          location: { ...formData.location, city: e.target.value }
        })}
        placeholder="e.g., Boston"
      />
      <Input
        label="State"
        value={formData.location.state}
        onChange={(e) => setFormData({ 
          ...formData, 
          location: { ...formData.location, state: e.target.value }
        })}
        placeholder="e.g., MA"
      />
      <Input
        label="Country"
        value={formData.location.country}
        onChange={(e) => setFormData({ 
          ...formData, 
          location: { ...formData.location, country: e.target.value }
        })}
        placeholder="e.g., USA"
      />
    </div>
  </div>
);

const PreferencesStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const interests = [
    'Diagnostic Accuracy',
    'Patient Communication',
    'Emergency Medicine',
    'Pediatric Cases',
    'Cardiovascular Diseases',
    'Neurological Disorders',
    'Respiratory Conditions',
    'Infectious Diseases'
  ];

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.interests || [];
    if (currentInterests.includes(interest)) {
      setFormData({
        ...formData,
        interests: currentInterests.filter((i: string) => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...currentInterests, interest]
      });
    }
  };

  return (
    <div>
      <p className="text-gray-600 mb-6">Select areas you'd like to focus on (choose multiple):</p>
      <div className="grid grid-cols-2 gap-3">
        {interests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => toggleInterest(interest)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              formData.interests?.includes(interest)
                ? 'border-orange-500 bg-orange-50 text-orange-900'
                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
            }`}
          >
            <span className="font-medium">{interest}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const CompletionStep: React.FC = () => (
  <div className="text-center py-8">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <span className="text-3xl">🎉</span>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Profile is Complete!</h3>
    <p className="text-gray-600 mb-6">
      You're all set to start your AI-powered medical training journey. 
      Get ready to practice with realistic patient scenarios and improve your diagnostic skills.
    </p>
    <div className="bg-orange-50 p-4 rounded-xl">
      <p className="text-orange-800 font-medium">Ready to begin your first case study?</p>
    </div>
  </div>
);

export default Onboarding;