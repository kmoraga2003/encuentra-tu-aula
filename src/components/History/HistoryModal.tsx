import { useState, useEffect } from "react";
import {
  getSearchHistory,
  clearSearchHistory,
  removeFromHistory,
} from "../../utils/storageUtils";
import { Aula, HistoryItem } from "../../types";
import { motion } from "framer-motion";

interface HistoryModalProps {
  onClose: () => void;
  onSelectSearch: (codigo: string, aulaData: Aula) => void;
}

const HistoryModal = ({ onClose, onSelectSearch }: HistoryModalProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getSearchHistory());
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSelectSearch = (searchItem: HistoryItem) => {
    onSelectSearch(searchItem.codigo, searchItem.aulaData);
    onClose();
  };

  const handleRemove = (id: number) => {
    removeFromHistory(id);
    setHistory(getSearchHistory());
  };

  const handleClearAll = () => {
    if (window.confirm("¿Está seguro de que desea borrar todo el historial?")) {
      clearSearchHistory();
      setHistory([]);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer";
    } else {
      return date.toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      });
    }
  };

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
        className="glass-card bg-[#0c2522] border border-[#235048] flex flex-col w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex justify-between items-center p-5 border-b border-[#1b433c] bg-[#091c19]/90">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕒</span>
            <h2 className="text-lg font-bold text-white">Historial de Búsquedas</h2>
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

        <div className="flex-1 overflow-y-auto p-2">
          {history.length === 0 ? (
            <div className="text-center py-12 px-4">
              <span className="block text-4xl mb-3 opacity-60">📋</span>
              <p className="text-slate-400 font-medium">No tienes búsquedas recientes</p>
              <p className="text-xs text-slate-500 mt-1">Las salas que busques quedarán guardadas aquí.</p>
            </div>
          ) : (
            <div className="space-y-2 p-3">
              {history.map((item) => (
                <div key={item.id} className="flex items-center bg-[#13332e]/80 border border-[#235048] rounded-xl p-3 shadow-sm hover:border-emerald-400/40 hover:bg-[#163c36] transition-all group">
                  <button
                    className="flex-1 text-left flex flex-col sm:flex-row sm:items-center sm:justify-between pr-3 focus:outline-none"
                    onClick={() => handleSelectSearch(item)}
                  >
                    <div className="font-extrabold text-base sm:text-lg text-white mb-1 sm:mb-0">
                      {item.codigo}
                    </div>
                    <div className="flex items-center text-xs text-slate-400 gap-2">
                      {item.aulaData?.sede && (
                        <span className="bg-[#004c42] text-emerald-100 px-2 py-0.5 rounded-md font-semibold border border-emerald-500/20">
                          {item.aulaData.sede}
                        </span>
                      )}
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                  </button>
                  <button
                    className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors opacity-80 sm:opacity-50 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
                    onClick={() => handleRemove(item.id)}
                    title="Eliminar del historial"
                    aria-label="Eliminar búsqueda"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {history.length > 0 && (
          <div className="p-4 border-t border-[#1b433c] bg-[#091c19]/90 flex justify-center">
            <button 
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm font-semibold py-2 px-4 rounded-xl transition-colors w-full border border-red-500/20"
              onClick={handleClearAll}
            >
              Borrar todo el historial
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HistoryModal;
