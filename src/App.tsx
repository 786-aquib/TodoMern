import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { TasksPage } from './pages/TasksPage';
import { Navigation } from './components/layout/Navigation';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/signin" />;
  
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <LoginForm />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUpForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TasksPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;