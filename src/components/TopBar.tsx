import { RefreshCcw, Wifi } from 'lucide-react';

interface TopBarProps {
  title: string;
  onRefresh?: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

export default function TopBar({ title, onRefresh, showBack, onBack }: TopBarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-6 h-16 bg-surface/80 backdrop-blur-xl transition-colors border-b border-outline-variant/10">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95"
          >
            <RefreshCcw className="w-5 h-5 text-on-surface-variant rotate-[-90deg]" />
          </button>
        ) : (
          <Wifi className="w-6 h-6 text-primary" />
        )}
        <span className="text-lg font-semibold text-on-surface font-headline tracking-tight">
          {title}
        </span>
      </div>
      <button 
        onClick={onRefresh}
        className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-200"
      >
        <RefreshCcw className="w-5 h-5 text-on-surface-variant" />
      </button>
    </nav>
  );
}
