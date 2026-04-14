import { Wifi, Lock, User, Key, Eye, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoginPortal() {
  return (
    <div className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto w-full px-4 py-8">
      {/* Connectivity Context Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-6 flex items-center gap-6 border border-outline-variant/15">
          <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
            <Wifi className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Red Detectada</p>
            <h2 className="text-xl font-bold tracking-tight text-on-surface">WIFI_ETECSA</h2>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-3xl p-6 flex flex-col justify-center border border-outline-variant/10">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2">Estado</p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-tertiary-container animate-pulse"></span>
            <span className="font-semibold text-on-surface">Autenticación Requerida</span>
          </div>
        </div>
      </div>

      {/* Simulated WebView Container */}
      <div className="relative bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/20 overflow-hidden flex-grow min-h-[500px] flex flex-col">
        {/* WebView Header/URL Bar */}
        <div className="bg-surface-container-highest/50 px-4 py-3 flex items-center gap-3 border-b border-outline-variant/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error/20"></div>
            <div className="w-3 h-3 rounded-full bg-secondary-container/50"></div>
            <div className="w-3 h-3 rounded-full bg-outline-variant/40"></div>
          </div>
          <div className="flex-grow bg-surface-container-lowest rounded-lg px-3 py-1.5 flex items-center gap-2 border border-outline-variant/10">
            <Lock className="w-3 h-3 text-secondary fill-current" />
            <span className="text-xs text-on-surface-variant truncate">https://portal.nauta.cu/login</span>
          </div>
        </div>

        {/* Simulated Content Area (ETECSA Login Page) */}
        <div className="flex-grow bg-white flex flex-col items-center justify-center p-8 md:p-12 overflow-y-auto">
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* Branding Placeholder */}
            <div className="mb-10 text-center">
              <div className="w-20 h-20 bg-[#004291] rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-white font-black text-2xl tracking-tighter italic">ETECSA</span>
              </div>
              <h3 className="text-2xl font-bold text-[#004291]">Portal Nauta</h3>
              <p className="text-sm text-on-surface-variant mt-2 font-medium">Autenticación de Usuario</p>
            </div>

            {/* Login Form */}
            <div className="w-full space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Usuario</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline-variant transition-all" 
                    placeholder="nombre.apellido@nauta.com.cu" 
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Contraseña</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                  <input 
                    className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline-variant transition-all" 
                    placeholder="••••••••" 
                    type="password"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full py-4 bg-[#004291] text-white rounded-full font-bold shadow-md active:scale-[0.98] transition-transform hover:shadow-lg">
                  Iniciar Sesión
                </button>
              </div>
              <div className="flex justify-between items-center px-2 py-2">
                <a className="text-xs font-semibold text-primary hover:underline" href="#">¿Olvidó su contraseña?</a>
                <a className="text-xs font-semibold text-primary hover:underline" href="#">Registrar cuenta</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Validation Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="w-full max-w-xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.15)] border border-outline-variant/30 px-6 py-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div>
              <h4 className="text-base font-bold text-on-surface leading-tight">Esperando validación...</h4>
              <p className="text-xs text-on-surface-variant font-medium">Detectando tokens de sesión activos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Tiempo</span>
              <span className="text-sm font-mono font-bold text-on-surface">00:14</span>
            </div>
            <button className="bg-surface-container-highest text-on-surface-variant p-2 rounded-xl hover:bg-surface-container-high transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
