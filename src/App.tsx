/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import HistoryView from './components/HistoryView';
import LoginPortal from './components/LoginPortal';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === '/login';
  
  const getTitle = () => {
    if (location.pathname === '/') return 'WiFi Time Keeper';
    if (location.pathname === '/history') return 'Historial de Sesiones';
    if (location.pathname === '/login') return 'Portal de Acceso';
    return 'WiFi Time Keeper';
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans selection:bg-primary-fixed">
      <TopBar 
        title={getTitle()} 
        showBack={isLogin}
        onBack={() => navigate(-1)}
        onRefresh={() => window.location.reload()}
      />
      
      <main className="flex-1 pt-16 pb-24 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<HistoryView />} />
          <Route path="/login" element={<LoginPortal />} />
        </Routes>
      </main>

      {!isLogin && <BottomNav />}

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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
