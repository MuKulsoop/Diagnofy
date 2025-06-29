import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Send,
  User,
  Bot,
  Heart,
  Activity,
  Thermometer,
  Clock,
  FileText,
  Stethoscope,
  AlertCircle
} from 'lucide-react';
import { Patient, Session, Message } from '../types';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const SimulationChat: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeSession();
  }, [patientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeSession = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sessions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId, specialization: 'general' }),
      });

      if (!response.ok) throw new Error('Failed to create session');

      const sessionData = await response.json();
      setSession(sessionData);
      setPatient(sessionData.patient);
      setMessages(sessionData.messages || []);

      if (!sessionData.messages || sessionData.messages.length === 0) {
        const initialMessage: Message = {
          sender: 'patient',
          text: `Hello doctor, I'm ${sessionData.patient.name}. I've been feeling unwell and I'm hoping you can help me figure out what's wrong.`,
          timestamp: new Date().toISOString()
        };
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error('Failed to initialize session:', error);
      const mockPatient: Patient = {
        _id: patientId!,
        name: 'Sarah Johnson',
        age: 45,
        gender: 'Female',
        mainDiseases: ['Acute Myocardial Infarction'],
        criticalFactors: ['Chest Pain', 'High BP'],
        symptoms: ['Severe chest pain', 'Shortness of breath', 'Nausea'],
        emotionalState: 'Anxious',
        history: 'Previous hypertension, family history of heart disease',
        createdAt: new Date().toISOString()
      };
      setPatient(mockPatient);
      setMessages([{
        sender: 'patient',
        text: `Hello doctor, I'm ${mockPatient.name}. I've been experiencing severe chest pain and I'm really worried. Can you help me?`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const userMessage: Message = {
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    try {
      if (session) {
        const res = await fetch(`${API_BASE_URL}/sessions/${session._id}/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: newMessage }),
        });

        if (!res.ok) throw new Error('Failed to send message');

        const response = await res.json();

        const patientMessage: Message = {
          sender: 'patient',
          text: response.response,
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, patientMessage]);
      } else {
        setTimeout(() => {
          const mockResponse: Message = {
            sender: 'patient',
            text: generateMockResponse(newMessage),
            timestamp: new Date().toISOString()
          };
          setMessages(prev => [...prev, mockResponse]);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const generateMockResponse = (userMessage: string): string => {
    const responses = [
      "The pain started about 2 hours ago. It feels like someone is squeezing my chest really tight.",
      "Yes, I've been feeling nauseous and a bit dizzy. The pain sometimes radiates to my left arm.",
      "I have a history of high blood pressure, and my father had a heart attack when he was 50.",
      "The pain is about 8 out of 10. It's constant and doesn't seem to get better when I rest.",
      "I haven't taken any medication yet. I was hoping it would go away, but it's getting worse."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleEndChat = () => {
    navigate(`/diagnosis/initial/${session?._id || patientId}`);
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
      <div className="flex h-screen">
        {/* Patient Info Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{patient?.name}</h3>
                <p className="text-sm text-gray-600">{patient?.age} years old, {patient?.gender}</p>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <Card className="p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500" />
              Vital Signs
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Heart Rate</span>
                <span className="text-sm font-medium">95 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Blood Pressure</span>
                <span className="text-sm font-medium">150/95 mmHg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Temperature</span>
                <span className="text-sm font-medium">98.6°F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Respiratory Rate</span>
                <span className="text-sm font-medium">22/min</span>
              </div>
            </div>
          </Card>

          {/* Symptoms */}
          <Card className="p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              Reported Symptoms
            </h4>
            <div className="space-y-2">
              {patient?.symptoms.map((symptom, index) => (
                <div key={index} className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  {symptom}
                </div>
              ))}
            </div>
          </Card>

          {/* Medical History */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Medical History
            </h4>
            <p className="text-sm text-gray-700">{patient?.history}</p>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Stethoscope className="w-6 h-6 text-orange-500" />
                <div>
                  <h2 className="font-semibold text-gray-900">Patient Consultation</h2>
                  <p className="text-sm text-gray-600">AI Simulation in Progress</p>
                </div>
              </div>
              <Button onClick={handleEndChat} className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                End Chat & Diagnose
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {message.sender === 'patient' ? (
                        <User className="w-4 h-4 text-blue-500 mt-0.5" />
                      ) : (
                        <Bot className="w-4 h-4 text-white mt-0.5" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === 'user' ? 'You' : patient?.name}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-900 shadow-sm border border-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">Patient is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask the patient about their symptoms..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!newMessage.trim() || sending}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationChat;