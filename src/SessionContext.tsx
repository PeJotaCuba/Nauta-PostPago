import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, MonthlyConsolidation } from './types';

interface SessionContextType {
  isAuthenticated: boolean;
  login: (user: string) => void;
  logout: () => void;
  activeSessionSeconds: number;
  isSessionActive: boolean;
  startSession: () => void;
  stopSession: () => void;
  saveSession: () => void;
  sessions: Session[];
  consolidations: MonthlyConsolidation[];
  consolidateMonth: () => void;
  currentUser: string | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeSessionSeconds, setActiveSessionSeconds] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [consolidations, setConsolidations] = useState<MonthlyConsolidation[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('nauta_sessions');
    const savedConsolidations = localStorage.getItem('nauta_consolidations');
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    if (savedConsolidations) setConsolidations(JSON.parse(savedConsolidations));
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (isSessionActive) {
      interval = setInterval(() => {
        setActiveSessionSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const login = (user: string) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    startSession();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsSessionActive(false);
    // Note: We don't reset activeSessionSeconds here because we might want to save it
  };

  const startSession = () => {
    setIsSessionActive(true);
    setActiveSessionSeconds(0);
  };

  const stopSession = () => {
    setIsSessionActive(false);
  };

  const saveSession = () => {
    const cost = (activeSessionSeconds / 3600) * 0.50;
    const newSession: Session = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      duration: activeSessionSeconds,
      cost: cost
    };
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('nauta_sessions', JSON.stringify(updatedSessions));
    setActiveSessionSeconds(0);
  };

  const consolidateMonth = () => {
    if (sessions.length === 0) return;
    
    const totalSeconds = sessions.reduce((acc, s) => acc + s.duration, 0);
    const totalCost = sessions.reduce((acc, s) => acc + s.cost, 0);
    
    const newConsolidation: MonthlyConsolidation = {
      month: new Date().toLocaleString('default', { month: 'long' }),
      totalHours: totalSeconds / 3600,
      totalCost: totalCost,
      date: new Date().toLocaleDateString()
    };
    
    const updatedConsolidations = [newConsolidation, ...consolidations];
    setConsolidations(updatedConsolidations);
    localStorage.setItem('nauta_consolidations', JSON.stringify(updatedConsolidations));
    
    // Clear sessions after consolidation
    setSessions([]);
    localStorage.removeItem('nauta_sessions');
  };

  return (
    <SessionContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      activeSessionSeconds,
      isSessionActive,
      startSession,
      stopSession,
      saveSession,
      sessions,
      consolidations,
      consolidateMonth,
      currentUser
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within a SessionProvider');
  return context;
};
