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
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/60 flex flex-col w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl text-slate-800"
        onClick={(e) => e.stopPropagation()} 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white/80 sticky top-0 z-10 w-full">
          <h2 className="text-xl font-bold text-slate-800">Ayuda</h2>
          <button
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            onClick={onClose}
            title="Cerrar"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
              <span className="text-2xl">🕵️‍♂️</span> Cómo buscar
            </h2>
            
            <div className="space-y-4">
              <h4 className="font-bold text-slate-700 bg-teal-50 inline-block px-3 py-1 rounded-lg">Paso 1: Encuentra el código</h4>
              <p className="text-slate-600">
                En el horario de <strong>Intranet</strong> identifica el código de aula.
              </p>
              <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <img 
                  src={codigoHorarioImg} 
                  alt="Ejemplo de código de aula en el horario de Intranet"
                  className="rounded-xl w-full"
                />
              </div>
              <p className="text-sm text-slate-500 flex items-start gap-2">
                <span className="text-lg">👁️</span> 
                <span>Los rectángulos rojos indican el código del aula. Se repiten en cada hora.</span>
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-700 bg-teal-50 inline-block px-3 py-1 rounded-lg">Paso 2: Ingresa el código</h4>
              <p className="text-slate-600">
                En <strong>encuentraTuAula</strong> ingresa el código del aula en la barra de búsqueda. Puedes usar:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Letras mayúsculas o minúsculas</li>
                <li>Incluir o no los guiones (S03P02A o S-03-P02-A)</li>
                <li>Presionar el bóton Buscar o Enter</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-700 bg-teal-50 inline-block px-3 py-1 rounded-lg">Paso 3: Sigue la guía </h4>
              <p className="text-slate-600">Al encontrar un aula, verás:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li><strong>Ubicación:</strong> Datos de ubicación de aula</li>
                <li><strong>Imagen:</strong> Imagen de sede correspondiente</li>
                <li><strong>Guía:</strong> Indicaciones paso a paso hasta llegar a tu aula.</li>
              </ul>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
              <span className="text-2xl">👁️‍🗨️</span> Entiende tu código
            </h2>
            <p className="text-slate-600">
              Cada aula tiene un código único que te ayuda a identificara. Así es cómo puedes interpretarlo:
            </p>

            <div className="bg-slate-800 text-white rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-900 to-slate-800 opacity-50"></div>
              <div className="relative font-mono text-3xl font-bold tracking-widest mb-2 flex justify-center drop-shadow-md">
                <span className="text-blue-300">S</span>
                <span>-</span>
                <span className="text-green-300">03</span>
                <span>-</span>
                <span className="text-yellow-300">P02</span>
                <span>-</span>
                <span className="text-purple-300">A</span>
              </div>
              <p className="relative text-slate-400 text-sm font-medium uppercase tracking-wider">Ejemplo: S-03-P02-A</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-slate-800">Primera letra (S)</h4>
                  <p className="text-sm text-slate-500 mb-2">Tipo de espacio</p>
                  <ul className="text-sm text-slate-600 grid grid-cols-1 gap-1">
                    <li><strong className="text-slate-800">S</strong> = Sala</li>
                    <li><strong className="text-slate-800">L</strong> = Laboratorio</li>
                    <li><strong className="text-slate-800">T</strong> = Taller</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-green-50/50 border border-green-100">
                <div className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-slate-800">Número (03)</h4>
                  <p className="text-sm text-slate-500 mb-2">Identificador único del espacio</p>
                  <ul className="text-sm text-slate-600 grid grid-cols-1 gap-1">
                    <li>Va del -02 al 08</li>
                    <li>Es único dentro de cada tipo</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-yellow-50/50 border border-yellow-100">
                <div className="bg-yellow-100 text-yellow-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-slate-800">Piso/Sótano (P/S + número)</h4>
                  <p className="text-sm text-slate-500 mb-2">En qué piso se encuentra</p>
                  <ul className="text-sm text-slate-600 grid grid-cols-2 gap-x-4 gap-y-1">
                    <li><strong className="text-slate-800">P01</strong> = Piso 1</li>
                    <li><strong className="text-slate-800">P02</strong> = Piso 2</li>
                    <li><strong className="text-slate-800">P03</strong> = Piso 3</li>
                    <li><strong className="text-slate-800">P04</strong> = Piso 4</li>
                    <li><strong className="text-slate-800">S01</strong> = Sotano 01</li>
                    <li><strong className="text-slate-800">S02</strong> = Sotano 02</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                <div className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-slate-800">Edificio (Letra)</h4>
                  <p className="text-sm text-slate-500 mb-2">En qué edificio se ubica</p>
                  <ul className="text-sm text-slate-600 grid grid-cols-1 gap-1">
                    <li><strong className="text-slate-800">A</strong> = Edificio A - San Joaquín</li>
                    <li><strong className="text-slate-800">B</strong> = Edificio B - San Joaquín</li>
                    <li><strong className="text-slate-800">C</strong> = Edificio C - San Joaquín</li>
                    <li><strong className="text-slate-800">R</strong> = Salas de Raquel</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HelpModal;
