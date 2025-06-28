import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Pill, 
  Brain, 
  Heart, 
  Calendar,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Session, FinalDiagnosis as FinalDiagnosisType } from '../types';
import { apiService } from '../config/api';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const FinalDiagnosis: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    updatedReasoning: '',
    finalDiagnosis: '',
    finalMedications: [''],
    treatmentPlan: {
      lifestyleRecommendations: '',
      followUpInstructions: ''
    }
  });

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    try {
      if (sessionId) {
        const sessionData = await apiService.getSession(sessionId);
        setSession(sessionData);
        
        // Pre-populate with initial diagnosis if available
        if (sessionData.initialDiagnosis) {
          setFormData(prev => ({
            ...prev,
            updatedReasoning: sessionData.initialDiagnosis?.clinicalReasoning || '',
            finalDiagnosis: sessionData.initialDiagnosis?.preliminaryDiagnosis || '',
            finalMedications: sessionData.initialDiagnosis?.initialMedications || ['']
          }));
        }
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      finalMedications: [...prev.finalMedications, '']
    }));
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      finalMedications: prev.finalMedications.filter((_, i) => i !== index)
    }));
  };

  const updateMedication = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      finalMedications: prev.finalMedications.map((med, i) => i === index ? value : med)
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const diagnosis: Partial<FinalDiagnosisType> = {
        updatedReasoning: formData.updatedReasoning,
        finalDiagnosis: formData.finalDiagnosis,
        finalMedications: formData.finalMedications.filter(med => med.trim() !== ''),
        treatmentPlan: formData.treatmentPlan,
        submittedAt: new Date().toISOString()
      };

      if (sessionId) {
        await apiService.submitDiagnosis(sessionId, diagnosis);
        navigate(`/analysis/${sessionId}`);
      }
    } catch (error) {
      console.error('Failed to submit final diagnosis:', error);
      // For development, continue to next step
      navigate(`/analysis/${sessionId}`);
    } finally {
      setSubmitting(false);
    }
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
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Final Diagnosis & Treatment</h1>
          <p className="text-gray-600">
            Complete your assessment for {session?.patient.name} based on all available information
          </p>
        </div>

        {/* Test Results Summary */}
        {session?.testResults && session.testResults.length > 0 && (
          <Card className="p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Test Results Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {session.testResults.slice(0, 4).map((result, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-sm text-gray-900 mb-1">{result.testName}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{result.resultText}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Final Diagnosis Form */}
        <div className="space-y-8">
          {/* Updated Clinical Reasoning */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Updated Clinical Reasoning</h3>
                <p className="text-sm text-gray-600">Refine your reasoning based on test results</p>
              </div>
            </div>
            <textarea
              value={formData.updatedReasoning}
              onChange={(e) => setFormData(prev => ({ ...prev, updatedReasoning: e.target.value }))}
              placeholder="Update your clinical reasoning incorporating the test results and additional findings..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              required
            />
          </Card>

          {/* Final Diagnosis */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Final Diagnosis</h3>
                <p className="text-sm text-gray-600">Your definitive diagnostic conclusion</p>
              </div>
            </div>
            <Input
              value={formData.finalDiagnosis}
              onChange={(e) => setFormData(prev => ({ ...prev, finalDiagnosis: e.target.value }))}
              placeholder="e.g., ST-Elevation Myocardial Infarction (STEMI)"
              required
            />
          </Card>

          {/* Final Medications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Pill className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Final Medications</h3>
                <p className="text-sm text-gray-600">Complete treatment regimen</p>
              </div>
            </div>
            <div className="space-y-3">
              {formData.finalMedications.map((medication, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={medication}
                    onChange={(e) => updateMedication(index, e.target.value)}
                    placeholder="e.g., Aspirin 81mg daily, Metoprolol 25mg BID"
                    className="flex-1"
                  />
                  {formData.finalMedications.length > 1 && (
                    <Button
                      variant="ghost"
                      onClick={() => removeMedication(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={addMedication} className="w-full">
                Add Another Medication
              </Button>
            </div>
          </Card>

          {/* Treatment Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lifestyle Recommendations</h3>
                  <p className="text-sm text-gray-600">Patient education and lifestyle changes</p>
                </div>
              </div>
              <textarea
                value={formData.treatmentPlan.lifestyleRecommendations}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  treatmentPlan: {
                    ...prev.treatmentPlan,
                    lifestyleRecommendations: e.target.value
                  }
                }))}
                placeholder="Diet modifications, exercise recommendations, smoking cessation..."
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              />
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Follow-up Instructions</h3>
                  <p className="text-sm text-gray-600">Monitoring and next steps</p>
                </div>
              </div>
              <textarea
                value={formData.treatmentPlan.followUpInstructions}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  treatmentPlan: {
                    ...prev.treatmentPlan,
                    followUpInstructions: e.target.value
                  }
                }))}
                placeholder="Follow-up appointments, monitoring parameters, warning signs..."
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              />
            </Card>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleSubmit} 
            loading={submitting}
            disabled={!formData.updatedReasoning || !formData.finalDiagnosis}
            size="lg"
            className="flex items-center gap-2"
          >
            Complete Diagnosis
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FinalDiagnosis;