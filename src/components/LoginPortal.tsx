import { Wifi, Lock, Loader2, ChevronRight, AlertCircle, ShieldCheck, RotateCw, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { useSession } from '../SessionContext';

export default function LoginPortal() {
  const { login } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [showIframe, setShowIframe] = useState(true);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleConfirmLogin = () => {
    setIsLoading(true);
    // Simulación de validación final antes de entrar a la app
    setTimeout(() => {
      login('Usuario Nauta');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 h-full">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-black tracking-tight text-on-surface">Nauta Hogar</h2>
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Portal de Autenticación Real</p>
      </div>

      {/* Webview Container */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl border border-outline-variant/20 overflow-hidden flex-grow flex flex-col min-h-[450px]">
        {/* Browser Toolbar */}
        <div className="bg-surface-container-highest/30 px-4 py-2 flex items-center gap-3 border-b border-outline-variant/10">
          <button onClick={handleRefresh} className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant">
            <RotateCw className="w-4 h-4" />
          </button>
          <div className="flex-grow bg-surface-container-lowest rounded-lg px-3 py-1 flex items-center gap-2 border border-outline-variant/10">
            <Lock className="w-3 h-3 text-secondary fill-current" />
            <span className="text-[10px] font-mono text-on-surface-variant truncate">https://secure.etecsa.net:8443//LoginServlet</span>
          </div>
        </div>

        {/* Real ETECSA Iframe */}
        <div className="flex-grow relative bg-white">
          <iframe 
            key={iframeKey}
            src="https://secure.etecsa.net:8443//LoginServlet" 
            className="w-full h-full border-0"
            title="ETECSA Portal"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          />
        </div>

        {/* Action Panel */}
        <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-medium text-on-surface-variant leading-tight">
              Inicia sesión en el portal de ETECSA arriba. Si los datos son incorrectos o ya hay una sesión activa, el portal te lo indicará allí mismo.
            </p>
          </div>
          
          <button 
            onClick={handleConfirmLogin}
            disabled={isLoading}
            className="w-full py-4 bg-[#004291] text-white rounded-2xl font-black text-xs tracking-widest uppercase shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                <span>Confirmar y Entrar a la App</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Security Footer */}
      <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
        <ShieldCheck className="w-3 h-3 text-secondary" />
        <span className="text-[9px] font-bold uppercase tracking-tighter">Validación Directa con ETECSA</span>
      </div>
    </div>
  );
}
