import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">

          {/* Main Layout Wrap */}
          <main className="flex-1 flex flex-col relative">
            <Routes>
              {/* Public Views */}
              <Route path="/" element={<LandingPage />} />

              {/* Protected Views */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
