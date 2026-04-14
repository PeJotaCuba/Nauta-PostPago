import { Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const SESSIONS = [
  { id: '1', date: '15 Oct 2023', duration: '02:30:15', cost: '2.50 CUP' },
  { id: '2', date: '14 Oct 2023', duration: '01:15:00', cost: '1.25 CUP' },
  { id: '3', date: '12 Oct 2023', duration: '04:20:45', cost: '4.35 CUP' },
  { id: '4', date: '10 Oct 2023', duration: '00:45:10', cost: '0.75 CUP' },
];

export default function HistoryView() {
  return (
    <div className="px-6 max-w-2xl mx-auto w-full py-8">
      {/* Summary Card */}
      <section className="mb-10">
        <div className="bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-on-primary shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium tracking-wide mb-2 uppercase">Estadísticas Actuales</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-1">Total este mes: 14:45:00</h2>
            <p className="text-white/70 text-sm">Basado en 24 sesiones activas en Octubre</p>
          </div>
          <div className="mt-6 flex gap-4 relative z-10">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-lg">
              <p className="text-xs text-white/60">Costo Estimado</p>
              <p className="text-lg font-bold">14.75 CUP</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-lg">
              <p className="text-xs text-white/60">Promedio/Día</p>
              <p className="text-lg font-bold">00:28:12</p>
            </div>
          </div>
        </div>
      </section>

      {/* Session List */}
      <div className="space-y-4">
        <h3 className="text-on-surface-variant font-semibold text-sm px-1 mb-2">Actividad Reciente</h3>
        
        {SESSIONS.map((session, idx) => (
          <motion.div 
            key={session.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container-lowest rounded-xl p-5 flex items-center justify-between group hover:bg-surface-container-low transition-colors duration-300 border border-outline-variant/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-on-surface font-bold text-base">{session.date}</p>
                <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Sesión Completada</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-extrabold text-primary tracking-tight">{session.duration}</p>
              <p className="text-secondary font-semibold text-sm">{session.cost}</p>
            </div>
          </motion.div>
        ))}

        {/* End of history */}
        <div className="py-8 flex flex-col items-center opacity-40">
          <Sparkles className="w-8 h-8 mb-2" />
          <p className="text-xs font-medium tracking-widest uppercase">Fin del historial reciente</p>
        </div>
      </div>
    </div>
  );
}
