import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Pill, Brain, ArrowLeft, ArrowRight } from 'lucide-react';
import { Session, InitialDiagnosis as InitialDiagnosisType } from '../types';
import { apiService } from '../config/api';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const InitialDiagnosis: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clinicalReasoning: '',
    preliminaryDiagnosis: '',
    initialMedications: ['']
  });

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    try {
      if (sessionId) {
        const sessionData = await apiService.getSession(sessionId);
        setSession(sessionData);
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
      initialMedications: [...prev.initialMedications, '']
    }));
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      initialMedications: prev.initialMedications.filter((_, i) => i !== index)
    }));
  };

  const updateMedication = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      initialMedications: prev.initialMedications.map((med, i) => i === index ? value : med)
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const diagnosis: Partial<InitialDiagnosisType> = {
        clinicalReasoning: formData.clinicalReasoning,
        preliminaryDiagnosis: formData.preliminaryDiagnosis,
        initialMedications: formData.initialMedications.filter(med => med.trim() !== ''),
        submittedAt: new Date().toISOString()
      };

      if (sessionId) {
        await apiService.submitDiagnosis(sessionId, diagnosis);
        navigate(`/tests/${sessionId}`);
      }
    } catch (error) {
      console.error('Failed to submit diagnosis:', error);
      // For development, continue to next step
      navigate(`/tests/${sessionId}`);
    } finally {
      setSubmitting(false);
    }
  };

  const goBackToChat = () => {
    navigate(`/simulation/${session?.patient._id || sessionId}`);
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
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={goBackToChat} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Chat
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Initial Diagnosis</h1>
          <p className="text-gray-600">
            Based on your conversation with {session?.patient.name}, provide your initial assessment
          </p>
        </div>

        {/* Patient Summary */}
        <Card className="p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Patient Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Patient</p>
              <p className="font-medium">{session?.patient.name}</p>
              <p className="text-sm text-gray-500">{session?.patient.age} years old, {session?.patient.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chief Complaints</p>
              <div className="space-y-1">
                {session?.patient.symptoms.slice(0, 2).map((symptom, index) => (
                  <p key={index} className="text-sm font-medium">{symptom}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Emotional State</p>
              <p className="font-medium">{session?.patient.emotionalState}</p>
            </div>
          </div>
        </Card>

        {/* Diagnosis Form */}
        <div className="space-y-8">
          {/* Clinical Reasoning */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Clinical Reasoning</h3>
                <p className="text-sm text-gray-600">Explain your thought process and analysis</p>
              </div>
            </div>
            <textarea
              value={formData.clinicalReasoning}
              onChange={(e) => setFormData(prev => ({ ...prev, clinicalReasoning: e.target.value }))}
              placeholder="Describe your clinical reasoning based on the patient's symptoms, history, and presentation..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              required
            />
          </Card>

          {/* Preliminary Diagnosis */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Preliminary Diagnosis</h3>
                <p className="text-sm text-gray-600">Your initial diagnostic impression</p>
              </div>
            </div>
            <Input
              value={formData.preliminaryDiagnosis}
              onChange={(e) => setFormData(prev => ({ ...prev, preliminaryDiagnosis: e.target.value }))}
              placeholder="e.g., Acute Myocardial Infarction"
              required
            />
          </Card>

          {/* Initial Medications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Pill className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Initial Medications</h3>
                <p className="text-sm text-gray-600">Immediate treatment recommendations</p>
              </div>
            </div>
            <div className="space-y-3">
              {formData.initialMedications.map((medication, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={medication}
                    onChange={(e) => updateMedication(index, e.target.value)}
                    placeholder="e.g., Aspirin 325mg, Nitroglycerin 0.4mg SL"
                    className="flex-1"
                  />
                  {formData.initialMedications.length > 1 && (
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
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={goBackToChat}>
            Continue Conversation
          </Button>
          <Button 
            onClick={handleSubmit} 
            loading={submitting}
            disabled={!formData.clinicalReasoning || !formData.preliminaryDiagnosis}
            className="flex items-center gap-2"
          >
            Order Tests & Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InitialDiagnosis;