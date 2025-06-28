import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Activity,
  Beaker,
  Heart,
  Zap
} from 'lucide-react';
import { Session, TestResult } from '../types';
import { apiService } from '../config/api';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

const TestReports: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [availableTests, setAvailableTests] = useState<string[]>([]);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  const allTests = [
    { name: 'Complete Blood Count (CBC)', category: 'Blood Work', icon: Activity },
    { name: 'Basic Metabolic Panel', category: 'Blood Work', icon: Beaker },
    { name: 'Cardiac Enzymes (Troponin)', category: 'Cardiac', icon: Heart },
    { name: 'Chest X-Ray', category: 'Imaging', icon: FileText },
    { name: 'ECG/EKG', category: 'Cardiac', icon: Zap },
    { name: 'Lipid Panel', category: 'Blood Work', icon: Beaker },
    { name: 'Thyroid Function Tests', category: 'Endocrine', icon: Activity },
    { name: 'Urinalysis', category: 'Urine', icon: Beaker },
    { name: 'CT Chest', category: 'Imaging', icon: FileText },
    { name: 'Echocardiogram', category: 'Cardiac', icon: Heart }
  ];

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    try {
      if (sessionId) {
        const sessionData = await apiService.getSession(sessionId);
        setSession(sessionData);
        setTestResults(sessionData.testResults || []);
        
        // Set available tests based on patient condition
        const patientTests = allTests.map(test => test.name);
        setAvailableTests(patientTests);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
      // Mock data for development
      setAvailableTests(allTests.map(test => test.name));
      setTestResults([
        {
          testName: 'ECG/EKG',
          resultText: 'ST-elevation in leads II, III, aVF consistent with inferior STEMI',
          format: 'text'
        },
        {
          testName: 'Cardiac Enzymes (Troponin)',
          resultText: 'Troponin I: 15.2 ng/mL (Normal: <0.04 ng/mL) - ELEVATED',
          format: 'text'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleTestSelection = (testName: string) => {
    setSelectedTests(prev => 
      prev.includes(testName) 
        ? prev.filter(t => t !== testName)
        : [...prev, testName]
    );
  };

  const orderTests = async () => {
    if (selectedTests.length === 0) return;
    
    setOrdering(true);
    try {
      if (sessionId) {
        const results = await apiService.requestTests(sessionId, selectedTests);
        setTestResults(prev => [...prev, ...results]);
        setSelectedTests([]);
      } else {
        // Mock results for development
        const mockResults: TestResult[] = selectedTests.map(testName => ({
          testName,
          resultText: generateMockResult(testName),
          format: 'text'
        }));
        setTestResults(prev => [...prev, ...mockResults]);
        setSelectedTests([]);
      }
    } catch (error) {
      console.error('Failed to order tests:', error);
    } finally {
      setOrdering(false);
    }
  };

  const generateMockResult = (testName: string): string => {
    const results: { [key: string]: string } = {
      'Complete Blood Count (CBC)': 'WBC: 12.5 K/uL (H), RBC: 4.2 M/uL, Hgb: 13.8 g/dL, Hct: 41.2%',
      'Basic Metabolic Panel': 'Glucose: 145 mg/dL (H), BUN: 18 mg/dL, Creatinine: 1.1 mg/dL, Na: 138 mEq/L',
      'Chest X-Ray': 'No acute cardiopulmonary abnormalities. Heart size normal.',
      'Lipid Panel': 'Total Cholesterol: 245 mg/dL (H), LDL: 165 mg/dL (H), HDL: 38 mg/dL (L)',
      'Thyroid Function Tests': 'TSH: 2.1 mIU/L (Normal), Free T4: 1.3 ng/dL (Normal)',
      'Urinalysis': 'Color: Yellow, Clarity: Clear, Protein: Negative, Glucose: Negative',
      'CT Chest': 'No pulmonary embolism. No acute abnormalities.',
      'Echocardiogram': 'EF: 45% (mildly reduced), Regional wall motion abnormalities in inferior wall'
    };
    return results[testName] || 'Results pending...';
  };

  const proceedToFinalDiagnosis = () => {
    navigate(`/diagnosis/final/${sessionId}`);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Blood Work': 'bg-red-100 text-red-800',
      'Cardiac': 'bg-pink-100 text-pink-800',
      'Imaging': 'bg-blue-100 text-blue-800',
      'Endocrine': 'bg-purple-100 text-purple-800',
      'Urine': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Reports</h1>
          <p className="text-gray-600">
            Order additional tests or review results for {session?.patient.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Tests */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Tests</h2>
              {selectedTests.length > 0 && (
                <Button 
                  onClick={orderTests} 
                  loading={ordering}
                  className="flex items-center gap-2"
                >
                  Order {selectedTests.length} Test{selectedTests.length > 1 ? 's' : ''}
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {allTests.map((test) => {
                const Icon = test.icon;
                const isSelected = selectedTests.includes(test.name);
                const isCompleted = testResults.some(result => result.testName === test.name);
                
                return (
                  <Card 
                    key={test.name} 
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      isSelected ? 'ring-2 ring-orange-500 bg-orange-50' : 
                      isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
                    }`}
                    onClick={() => !isCompleted && toggleTestSelection(test.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isCompleted ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Icon className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{test.name}</h3>
                          <Badge size="sm" className={getCategoryColor(test.category)}>
                            {test.category}
                          </Badge>
                        </div>
                      </div>
                      {isCompleted && (
                        <Badge variant="success">Completed</Badge>
                      )}
                      {isSelected && !isCompleted && (
                        <Badge variant="primary">Selected</Badge>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Test Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Test Results</h2>
              {testResults.length > 0 && (
                <Button 
                  onClick={proceedToFinalDiagnosis}
                  className="flex items-center gap-2"
                >
                  Final Diagnosis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>

            {testResults.length === 0 ? (
              <Card className="p-8 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No Tests Ordered Yet</h3>
                <p className="text-gray-600">Select tests from the left panel to order them</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{result.testName}</h3>
                        <Badge variant="success" size="sm">Completed</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {result.resultText}
                      </p>
                    </div>
                    
                    {result.resultImageURL && (
                      <div className="mt-4">
                        <img 
                          src={result.resultImageURL} 
                          alt={`${result.testName} result`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestReports;