import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";

// Layout
import DashboardLayout from "./layout/DashboardLayout";

// Public Page
import AuthPage from "./pages/authpage";

// Dashboard Pages
import Dashboard from "./pages/dashboard";
import Residents from "./pages/residents";
import Analytics from "./pages/analytics";
import Verification from "./pages/verification";
import Households from "./pages/household";
import Certificates from "./pages/certificates";
import Support from "./pages/support";
import Settings from "./pages/settings";
import Logout from "./pages/logout";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>

            {/* PUBLIC ROUTE */}
            <Route path="/" element={<AuthPage />} />

            {/* PRIVATE ROUTES */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/residents" element={<Residents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/households" element={<Households />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/support" element={<Support />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
