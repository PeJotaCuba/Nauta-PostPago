import { useState } from 'react';
import { CheckCircle2, Power, Save, History, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSession } from '../SessionContext';

export default function Home() {
  const { activeSessionSeconds, isSessionActive, stopSession, saveSession, logout } = useSession();
  const [showSaveModal, setShowSaveModal] = useState(false);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
  };

  const handleCloseAccount = () => {
    stopSession();
    setShowSaveModal(true);
  };

  const handleSaveAndExit = () => {
    saveSession();
    setShowSaveModal(false);
    logout();
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-2xl mx-auto px-6 py-8">
      {/* Status Card */}
      <div className="w-full bg-surface-container-low rounded-xl p-5 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-on-secondary-container fill-current" />
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium">Estado de Conexión</p>
            <h2 className="text-on-surface font-semibold text-base">Sesión Iniciada</h2>
          </div>
        </div>
        <div className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_#006e2c]"></div>
      </div>

      {/* Hero Metric Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full py-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-4">Tiempo Conectado</p>
          <h1 className="text-[72px] md:text-[96px] font-mono font-bold tracking-tighter text-on-surface timer-glow leading-none">
            {formatTime(activeSessionSeconds)}
          </h1>
          <p className="text-on-surface-variant mt-4 font-medium">
            Costo actual: <span className="text-secondary font-bold font-mono">{((activeSessionSeconds / 3600) * 0.50).toFixed(2)} CUP</span>
          </p>
        </div>

        {/* Precision Controls */}
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={handleCloseAccount}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-tertiary to-tertiary-container flex items-center justify-center text-white shadow-xl shadow-tertiary/20 hover:scale-105 transition-all active:scale-90 group"
            >
              <Power className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Cerrar Cuenta</span>
          </div>
        </div>
      </div>

      {/* Metadata Card */}
      <div className="w-full mt-12 bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-on-surface-variant" />
          <span className="text-on-surface-variant font-medium text-sm">Tarifa</span>
        </div>
        <span className="text-on-surface font-mono font-bold">0.50 CUP / Hora</span>
      </div>

      {/* Save Session Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
              onClick={() => setShowSaveModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-surface-container-lowest rounded-3xl p-8 shadow-2xl border border-outline-variant/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-6">
                  <Save className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">Sesión Finalizada</h3>
                <p className="text-on-surface-variant mb-8">
                  Has estado conectado por <span className="font-bold text-on-surface">{formatTime(activeSessionSeconds)}</span>. 
                  ¿Deseas guardar esta sesión en tu historial?
                </p>
                
                <div className="w-full space-y-3">
                  <button 
                    onClick={handleSaveAndExit}
                    className="w-full py-4 bg-primary text-white rounded-full font-bold shadow-md active:scale-[0.98] transition-transform"
                  >
                    Guardar y Salir
                  </button>
                  <button 
                    onClick={() => { setShowSaveModal(false); logout(); }}
                    className="w-full py-4 text-on-surface-variant font-bold hover:bg-surface-container-low rounded-full transition-colors"
                  >
                    Descartar y Salir
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
