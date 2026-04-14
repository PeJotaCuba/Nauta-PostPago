import { Gauge, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isHistory = location.pathname === '/history';

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white/80 backdrop-blur-xl rounded-t-[1.5rem] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] border-t border-outline-variant/15">
      <Link
        to="/"
        className={`flex flex-col items-center justify-center px-6 py-1 transition-all active:scale-90 ${
          isHome 
            ? 'bg-primary-fixed text-primary rounded-full' 
            : 'text-on-surface-variant'
        }`}
      >
        <Gauge className={`w-6 h-6 ${isHome ? 'fill-current' : ''}`} />
        <span className="text-[12px] font-medium mt-0.5">Inicio</span>
      </Link>
      
      <Link
        to="/history"
        className={`flex flex-col items-center justify-center px-6 py-1 transition-all active:scale-90 ${
          isHistory 
            ? 'bg-primary-fixed text-primary rounded-full' 
            : 'text-on-surface-variant'
        }`}
      >
        <History className={`w-6 h-6 ${isHistory ? 'fill-current' : ''}`} />
        <span className="text-[12px] font-medium mt-0.5">Historial</span>
      </Link>
    </nav>
  );
}
