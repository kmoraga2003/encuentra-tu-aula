import { useEffect } from "react";
import codigoHorarioImg from "../../assets/images/codigo-horario.jpg";
import { motion } from "framer-motion";

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal = ({ onClose }: HelpModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="glass-card bg-[#0c2522] border border-[#235048] flex flex-col w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()} 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex justify-between items-center p-5 border-b border-[#1b433c] bg-[#091c19]/90 sticky top-0 z-10 w-full">
          <div className="flex items-center gap-2">
            <span className="text-xl">ℹ️</span>
            <h2 className="text-lg font-bold text-white">Guía y Ayuda</h2>
          </div>
          <button
            className="text-slate-400 hover:text-white hover:bg-[#18453c] rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            onClick={onClose}
            title="Cerrar"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <section className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              <span>🧭</span> ¿Cómo buscar tu aula?
            </h3>
            
            <div className="space-y-3 bg-[#13332e]/60 p-4 rounded-xl border border-[#235048]">
              <h4 className="font-bold text-emerald-300 text-sm">Paso 1: Identifica el código</h4>
              <p className="text-slate-300 text-sm">
                En el horario de tu <strong>Intranet Santo Tomás</strong>, ubica la columna de sala o aula.
              </p>
              <div className="rounded-xl overflow-hidden border border-[#235048] shadow">
                <img 
                  src={codigoHorarioImg} 
                  alt="Ejemplo de código de aula en el horario de Intranet"
                  className="w-full"
                />
              </div>
              <p className="text-xs text-emerald-200/70 flex items-center gap-1.5">
                <span>💡</span> Los recuadros rojos marcan el código del aula asignada.
              </p>
            </div>

            <div className="space-y-2 bg-[#13332e]/60 p-4 rounded-xl border border-[#235048]">
              <h4 className="font-bold text-emerald-300 text-sm">Paso 2: Usa los selectores</h4>
              <p className="text-slate-300 text-sm">
                Selecciona en cada casilla el Tipo, Número, Pabellón/Piso y Edificio de tu sala (ej. <strong>S - 03 - P02 - A</strong>) y pulsa <strong>Buscar</strong>.
              </p>
            </div>

            <div className="space-y-2 bg-[#13332e]/60 p-4 rounded-xl border border-[#235048]">
              <h4 className="font-bold text-emerald-300 text-sm">Paso 3: Sigue la orientación</h4>
              <p className="text-slate-300 text-sm">
                La app te indicará la sede, edificio, piso, fotografía de referencia y la ruta paso a paso desde el acceso.
              </p>
            </div>
          </section>

          <hr className="border-[#1b433c]" />

          <section className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              <span>🏷️</span> Estructura del Código
            </h3>

            <div className="bg-[#081a17] text-white rounded-xl p-4 text-center border border-[#1b433c] shadow-inner relative overflow-hidden">
              <div className="font-mono text-2xl font-black tracking-widest flex justify-center gap-1 drop-shadow-md">
                <span className="text-blue-400">S</span>
                <span className="text-slate-500">-</span>
                <span className="text-emerald-400">03</span>
                <span className="text-slate-500">-</span>
                <span className="text-amber-400">P02</span>
                <span className="text-slate-500">-</span>
                <span className="text-purple-400">A</span>
              </div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">Ejemplo: S-03-P02-A</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#13332e]/70 border border-[#235048]">
                <strong className="text-blue-300 block mb-1">1. Tipo (S)</strong>
                <p className="text-slate-300"><strong>S</strong> = Sala · <strong>L</strong> = Laboratorio · <strong>T</strong> = Taller</p>
              </div>
              <div className="p-3 rounded-xl bg-[#13332e]/70 border border-[#235048]">
                <strong className="text-emerald-300 block mb-1">2. Número (03)</strong>
                <p className="text-slate-300">Número específico asignado al aula dentro del piso.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#13332e]/70 border border-[#235048]">
                <strong className="text-amber-300 block mb-1">3. Piso / Nivel (P02)</strong>
                <p className="text-slate-300"><strong>P01</strong> = Piso 1, <strong>P02</strong> = Piso 2, <strong>S01</strong> = Subterráneo 1.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#13332e]/70 border border-[#235048]">
                <strong className="text-purple-300 block mb-1">4. Edificio (A / R)</strong>
                <p className="text-slate-300"><strong>A, B, C</strong> = Edificios campus · <strong>R</strong> = Salas de Raquel.</p>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HelpModal;
