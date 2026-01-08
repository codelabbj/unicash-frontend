import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import PasswordReset from './pages/auth/PasswordReset';
import Dashboard from './pages/Dashboard';
import NewTransaction from './pages/transaction/NewTransaction';
import TransactionHistory from './pages/transaction/TransactionHistory';
import TransactionDetails from './pages/transaction/TransactionDetails';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Notifications from './pages/Notifications';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <PublicRoute>
                <VerifyEmail />
              </PublicRoute>
            }
          />
          <Route
            path="/password-reset"
            element={
              <PublicRoute>
                <PasswordReset />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transaction/new" element={<NewTransaction />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/transaction/:id" element={<TransactionDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Navigate to="/profile" replace />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
