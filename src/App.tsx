/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import HistoryView from './components/HistoryView';
import LoginPortal from './components/LoginPortal';
import { SessionProvider, useSession } from './SessionContext';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSession();

  const isLogin = location.pathname === '/login';
  
  const getTitle = () => {
    if (location.pathname === '/') return 'Nauta PostPago';
    if (location.pathname === '/history') return 'Historial de Sesiones';
    if (location.pathname === '/login') return 'Portal de Acceso';
    return 'Nauta PostPago';
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans selection:bg-primary-fixed">
      <TopBar 
        title={getTitle()} 
        showBack={isLogin && isAuthenticated}
        onBack={() => navigate(-1)}
        onRefresh={() => window.location.reload()}
      />
      
      <main className="flex-1 pt-16 pb-24 flex flex-col">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPortal /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/history" element={isAuthenticated ? <HistoryView /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      {isAuthenticated && !isLogin && <BottomNav />}

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-fixed/30 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </SessionProvider>
  );
}
