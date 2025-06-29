const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

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
      update: '/users/update',
      leaderboard: '/users/leaderboard'
    },
    patients: {
      list: '/patients',
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
    localStorage.removeItem('authToken');
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
    return this.request<User>(apiConfig.endpoints.auth.me);
  }

  async updateProfile(userData: Partial<User>) {
    return this.request<User>(apiConfig.endpoints.users.update, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Patients methods
  async getPatients() {
    return this.request<Patient[]>(apiConfig.endpoints.patients.list);
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