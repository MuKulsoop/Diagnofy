import { User } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  degree?: string;         
  specialization?: string;  
  interests?: string[];   
  avatar?: string;         
}

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      me: '/auth/me',
      logout: '/auth/logout'
    },
    users: {
      profile: '/users/profile',
      update: '/users/onboarding',
      leaderboard: '/users/leaderboard'
    },
    patients: {
      list: '/patients/all-patients',
      bySpecialization: (specialization: string) => `/patients/specialization/${specialization}`
    },
    sessions: {
      create: '/sessions',
      list: '/sessions',
      byId: (id: string) => `/sessions/${id}`,
      chat: (id: string) => `/sessions/${id}/chat`,
      diagnose: (id: string) => `/sessions/${id}/diagnose`,
      tests: (id: string) => `/sessions/${id}/tests`,
      analyze: (id: string) => `/sessions/${id}/analyze`
    },
    modules: {
      list: '/modules',
      progress: '/modules/progress'
    }
  }
};

export class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    // localStorage.removeItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: User }>(
      apiConfig.endpoints.auth.login,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    console.log(response.user)
    localStorage.setItem('name', response.user.name);
    localStorage.setItem('id', response.user._id);
    localStorage.setItem('email', response.user.email);
    localStorage.setItem('specialization', response.user.specialization);
    localStorage.setItem('level', response.user.experienceLevel);
    localStorage.setItem('institution_name', response.user.institutionName);
    localStorage.setItem('current_role', response.user.currentRole);
    localStorage.setItem('location', response.user.location.city);
    localStorage.setItem('location', response.user.location.state);
    localStorage.setItem('location', response.user.location.country);
    localStorage.setItem('interests', response.user.interests);

    this.setToken(response.token);
    return response;
  }

  async register(userData: Partial<User> & { password: string }) {
    return this.request<{ token: string; user: User }>(
      apiConfig.endpoints.auth.register,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );
  }

  async getProfile() {
    const email = localStorage.getItem("email");
    return this.request<User>(apiConfig.endpoints.auth.me, { 
      method: "POST",
      body: JSON.stringify(email)
     } );

  }

  async updateProfile(userData: Partial<User>) {
    return this.request<User>(apiConfig.endpoints.users.update, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  };




  // Patients methods
  
  async getPatients() {
    const userId = localStorage.getItem("id")
    const specialization = localStorage.getItem("specialization")
    const level = localStorage.getItem("level")
    return this.request<Patient[]>(apiConfig.endpoints.patients.list, {
      method: 'POST',
      body: JSON.stringify({ userId, specialization, level  })
    });
  }

  async getPatientsBySpecialization(specialization: string) {
    return this.request<Patient[]>(
      apiConfig.endpoints.patients.bySpecialization(specialization)
    );
  }

  // Sessions methods
  async createSession(patientId: string, specialization: string) {
    return this.request<Session>(apiConfig.endpoints.sessions.create, {
      method: 'POST',
      body: JSON.stringify({ patientId, specialization }),
    });
  }

  async getSessions() {
    return this.request<Session[]>(apiConfig.endpoints.sessions.list);
  }

  async getSession(id: string) {
    return this.request<Session>(apiConfig.endpoints.sessions.byId(id));
  }

  async sendMessage(sessionId: string, message: string) {
    return this.request<{ response: string }>(
      apiConfig.endpoints.sessions.chat(sessionId),
      {
        method: 'POST',
        body: JSON.stringify({ message }),
      }
    );
  }

  async submitDiagnosis(sessionId: string, diagnosis: Partial<InitialDiagnosis | FinalDiagnosis>) {
    return this.request<Session>(
      apiConfig.endpoints.sessions.diagnose(sessionId),
      {
        method: 'POST',
        body: JSON.stringify(diagnosis),
      }
    );
  }

  async requestTests(sessionId: string, tests: string[]) {
    return this.request<TestResult[]>(
      apiConfig.endpoints.sessions.tests(sessionId),
      {
        method: 'POST',
        body: JSON.stringify({ tests }),
      }
    );
  }

  async getLeaderboard() {
    return this.request<User[]>(apiConfig.endpoints.users.leaderboard);
  }
}

export const apiService = new ApiService();