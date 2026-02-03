import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; 
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/dashboard';
import Residents from './pages/residents';
import Analytics from './pages/analytics';
import Verification from './pages/verification';
import Support from './pages/support';
import Settings from './pages/settings';
import Logout from './pages/logout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;