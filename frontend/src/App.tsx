// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';

// // Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Onboarding from './pages/Onboarding';
// import Dashboard from './pages/Dashboard';
// import Modules from './pages/Modules';
// import PatientSelection from './pages/PatientSelection';
// import SimulationChat from './pages/SimulationChat';
// import InitialDiagnosis from './pages/InitialDiagnosis';
// import TestReports from './pages/TestReports';
// import FinalDiagnosis from './pages/FinalDiagnosis';
// import SessionAnalysis from './pages/SessionAnalysis';
// import History from './pages/History';
// import Profile from './pages/Profile';
// import Leaderboard from './pages/Leaderboard';

// // Protected Route Component
// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!user.onboardingCompleted) {
//     return <Navigate to="/onboarding" replace />;
//   }

//   return <>{children}</>;
// };

// // Public Route Component (redirect if authenticated)
// const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (user && user.onboardingCompleted) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <>{children}</>;
// };

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route 
//             path="/" 
//             element={
//               <PublicRoute>
//                 <Home />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/login" 
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/register" 
//             element={
//               <PublicRoute>
//                 <Register />
//               </PublicRoute>
//             } 
//           />

//           {/* Onboarding Route */}
//           <Route path="/onboarding" element={<Onboarding />} />

//           {/* Protected Routes */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/modules" 
//             element={
//               <ProtectedRoute>
//                 <Modules />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/modules/:moduleId/patients" 
//             element={
//               <ProtectedRoute>
//                 <PatientSelection />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/simulation/:patientId" 
//             element={
//               <ProtectedRoute>
//                 <SimulationChat />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/diagnosis/initial/:sessionId" 
//             element={
//               <ProtectedRoute>
//                 <InitialDiagnosis />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/tests/:sessionId" 
//             element={
//               <ProtectedRoute>
//                 <TestReports />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/diagnosis/final/:sessionId" 
//             element={
//               <ProtectedRoute>
//                 <FinalDiagnosis />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/analysis/:sessionId" 
//             element={
//               <ProtectedRoute>
//                 <SessionAnalysis />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/history" 
//             element={
//               <ProtectedRoute>
//                 <History />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/sessions" 
//             element={
//               <ProtectedRoute>
//                 <History />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/profile" 
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/leaderboard" 
//             element={
//               <ProtectedRoute>
//                 <Leaderboard />
//               </ProtectedRoute>
//             } 
//           />

//           {/* Catch all route */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;









import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import PatientSelection from './pages/PatientSelection';
import SimulationChat from './pages/SimulationChat';
import InitialDiagnosis from './pages/InitialDiagnosis';
import TestReports from './pages/TestReports';
import FinalDiagnosis from './pages/FinalDiagnosis';
import SessionAnalysis from './pages/SessionAnalysis';
import History from './pages/History';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* All Routes are now public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleId/patients" element={<PatientSelection />} />
          <Route path="/simulation/:patientId" element={<SimulationChat />} />
          <Route path="/diagnosis/initial/:sessionId" element={<InitialDiagnosis />} />
          <Route path="/tests/:sessionId" element={<TestReports />} />
          <Route path="/diagnosis/final/:sessionId" element={<FinalDiagnosis />} />
          <Route path="/analysis/:sessionId" element={<SessionAnalysis />} />
          <Route path="/history" element={<History />} />
          <Route path="/sessions" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
