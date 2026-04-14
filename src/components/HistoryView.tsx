import { Calendar, Sparkles, Receipt, Clock, Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { useSession } from '../SessionContext';

export default function HistoryView() {
  const { sessions, consolidations, consolidateMonth } = useSession();

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
  };

  const totalSecondsThisMonth = sessions.reduce((acc, s) => acc + s.duration, 0);
  const totalCostThisMonth = sessions.reduce((acc, s) => acc + s.cost, 0);

  return (
    <div className="px-6 max-w-2xl mx-auto w-full py-8">
      {/* Summary Card */}
      <section className="mb-10">
        <div className="bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-on-primary shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium tracking-wide mb-2 uppercase">Estadísticas Actuales</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-1">Total este mes: {formatTime(totalSecondsThisMonth)}</h2>
            <p className="text-white/70 text-sm">Basado en {sessions.length} sesiones activas</p>
          </div>
          <div className="mt-6 flex gap-4 relative z-10">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-lg">
              <p className="text-xs text-white/60">Costo Estimado</p>
              <p className="text-lg font-bold">{totalCostThisMonth.toFixed(2)} CUP</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-lg">
              <p className="text-xs text-white/60">Tarifa</p>
              <p className="text-lg font-bold">0.50/h</p>
            </div>
          </div>
          
          {sessions.length > 0 && (
            <button 
              onClick={consolidateMonth}
              className="mt-8 w-full py-3 bg-white text-primary rounded-full font-bold shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Consolidar Mes
            </button>
          )}
        </div>
      </section>

      {/* Consolidations List */}
      {consolidations.length > 0 && (
        <div className="mb-10 space-y-4">
          <h3 className="text-on-surface-variant font-semibold text-sm px-1 mb-2">Meses Consolidados</h3>
          {consolidations.map((c, idx) => (
            <div key={idx} className="bg-secondary-container/30 border border-secondary/10 rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <Receipt className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-on-surface font-bold text-base capitalize">{c.month}</p>
                  <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Factura Cerrada</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-secondary tracking-tight">{c.totalCost.toFixed(2)} CUP</p>
                <p className="text-on-surface-variant font-semibold text-sm">{c.totalHours.toFixed(2)} h</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Session List */}
      <div className="space-y-4">
        <h3 className="text-on-surface-variant font-semibold text-sm px-1 mb-2">Actividad Reciente</h3>
        
        {sessions.length === 0 ? (
          <div className="py-12 flex flex-col items-center opacity-40 text-center">
            <Clock className="w-12 h-12 mb-4" />
            <p className="text-sm font-medium">No hay sesiones pendientes de consolidar</p>
          </div>
        ) : (
          sessions.map((session, idx) => (
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
                <p className="text-lg font-extrabold text-primary tracking-tight">{formatTime(session.duration)}</p>
                <p className="text-secondary font-semibold text-sm">{session.cost.toFixed(2)} CUP</p>
              </div>
            </motion.div>
          ))
        )}

        {/* End of history */}
        <div className="py-8 flex flex-col items-center opacity-40">
          <Sparkles className="w-8 h-8 mb-2" />
          <p className="text-xs font-medium tracking-widest uppercase">Fin del historial</p>
        </div>
      </div>
    </div>
  );
}
