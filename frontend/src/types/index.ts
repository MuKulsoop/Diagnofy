export interface User {
  _id: string;
  name: string;
  email: string;
  specialization: 'General' | 'Pediatrics' | 'Cardiology' | 'Neurology' | 'Gynecology' | 'Emergency' | 'Other';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  institutionName: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  currentRole: 'Student' | 'Intern' | 'Resident' | 'Practitioner';
  yearOfStudy?: number;
  interests: string[];
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  mainDiseases: string[];
  criticalFactors: string[];
  symptoms: string[];
  emotionalState: string;
  history: string;
  createdAt: string;
}

export interface Message {
  sender: 'user' | 'patient';
  text: string;
  timestamp: string;
}

export interface TestResult {
  testName: string;
  resultText: string;
  resultImageURL?: string;
  format: 'image' | 'pdf' | 'text';
}

export interface DiagnosisReport {
  questioningScore: number;
  questioningFeedback: string;
  diagnosisScore: number;
  diagnosisFeedback: string;
  treatmentScore: number;
  treatmentFeedback: string;
  overallScore: number;
  summaryFeedback: string;
  strengths: string[];
  areasToImprove: string[];
  analyzedAt: string;
}

export interface InitialDiagnosis {
  clinicalReasoning: string;
  preliminaryDiagnosis: string;
  initialMedications: string[];
  submittedAt: string;
}

export interface FinalDiagnosis {
  updatedReasoning: string;
  finalDiagnosis: string;
  finalMedications: string[];
  treatmentPlan: {
    lifestyleRecommendations: string;
    followUpInstructions: string;
  };
  submittedAt: string;
}

export interface Session {
  _id: string;
  user: string;
  patient: Patient;
  level: string;
  specialization: string;
  messages: Message[];
  testResults: TestResult[];
  initialDiagnosis?: InitialDiagnosis;
  finalDiagnosis?: FinalDiagnosis;
  initialDiagnosisReport?: DiagnosisReport;
  finalDiagnosisReport?: DiagnosisReport;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
}