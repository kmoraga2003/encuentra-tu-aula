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
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/60 flex flex-col w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl text-slate-800"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white/80 sticky top-0 z-10 w-full">
          <h2 className="text-xl font-bold text-slate-800">Historial de búsquedas</h2>
          <button
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            onClick={onClose}
            title="Cerrar"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {history.length === 0 ? (
            <p className="text-center text-slate-500 py-10">No hay búsquedas anteriores</p>
          ) : (
            <div className="space-y-2 p-4">
              {history.map((item) => (
                <div key={item.id} className="flex bg-white/80 border border-slate-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow group">
                  <button
                    className="flex-1 text-left flex flex-col sm:flex-row sm:items-center sm:justify-between pr-4 focus:outline-none"
                    onClick={() => handleSelectSearch(item)}
                  >
                    <div className="font-bold text-lg text-slate-800 mb-1 sm:mb-0 flex items-center gap-2">
                      <span>{item.aulaData?.sala || item.codigo}</span>
                      {item.aulaData?.sala && item.aulaData.sala !== item.codigo && (
                        <span className="text-xs font-normal text-slate-500">({item.codigo})</span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-slate-500 gap-3">
                      {item.aulaData?.sede && (
                        <span className="bg-emerald-50 text-[#004c42] border border-emerald-200/60 px-2 py-0.5 rounded-md font-semibold">
                          {item.aulaData.sede}
                        </span>
                      )}
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                  </button>
                  <button
                    className="text-slate-300 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors opacity-100 sm:opacity-50 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
                    onClick={() => handleRemove(item.id)}
                    title="Eliminar"
                    aria-label="Eliminar búsqueda"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-white/80 flex justify-center">
            <button 
              className="text-red-500 hover:text-red-700 hover:bg-red-50 font-medium py-2 px-4 rounded-xl transition-colors w-full"
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
