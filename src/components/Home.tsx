import { useState, useEffect } from 'react';
import { CheckCircle2, Pause, Save, ChevronRight, History } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [seconds, setSeconds] = useState(2712); // 00:45:12
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-2xl mx-auto px-6 py-8">
      {/* Status Card */}
      <Link 
        to="/login"
        className="w-full bg-surface-container-low rounded-xl p-5 mb-10 flex items-center justify-between hover:bg-surface-container-high transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-on-secondary-container fill-current" />
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium">Estado de Red</p>
            <h2 className="text-on-surface font-semibold text-base">Red: Validada</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_#006e2c]"></div>
          <ChevronRight className="w-5 h-5 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Hero Metric Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full py-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-4">Sesión Activa</p>
          <h1 className="text-[72px] md:text-[96px] font-mono font-bold tracking-tighter text-on-surface timer-glow leading-none">
            {formatTime(seconds)}
          </h1>
        </div>

        {/* Precision Controls */}
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => setIsActive(!isActive)}
              className="w-20 h-20 rounded-full border-2 border-tertiary flex items-center justify-center text-tertiary hover:bg-tertiary/5 transition-all active:scale-90 group"
            >
              <Pause className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">
              {isActive ? 'Pausar' : 'Reanudar'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-on-secondary-container flex items-center justify-center text-white shadow-xl shadow-secondary/20 hover:scale-105 transition-all active:scale-90 group">
              <Save className="w-10 h-10 group-hover:scale-110 transition-transform fill-current" />
            </button>
            <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Guardar Sesión</span>
          </div>
        </div>
      </div>

      {/* Metadata Card */}
      <div className="w-full mt-12 bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-on-surface-variant" />
          <span className="text-on-surface-variant font-medium text-sm">Última sesión</span>
        </div>
        <span className="text-on-surface font-mono font-bold">01:20:00</span>
      </div>
    </div>
  );
}
