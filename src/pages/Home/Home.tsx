import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import SearchBar, { SearchBarHandle } from "../../components/SearchBar/SearchBar";
import AulaResult from "../../components/AulaResult/AulaResult";
import { getAulaByCode } from "../../services/aulaService";
import { addSearchToHistory } from "../../utils/storageUtils";
import { Aula } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import stLogo from "../../assets/images/santo-tomas-horizontal.png";

export interface HomeHandle {
  resetSearch: () => void;
  displayAula: (codigo: string, aulaData: Aula) => void;
}

const Home = forwardRef<HomeHandle>((_props, ref) => {
  const searchBarRef = useRef<SearchBarHandle>(null);
  const [aula, setAula] = useState<Aula | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [_searchCode, setSearchCode] = useState<string>("");

  useImperativeHandle(ref, () => ({
    resetSearch: () => {
      setAula(null);
      setError("");
      setSearchCode("");
      if (searchBarRef.current) {
        searchBarRef.current.clearInput();
      }
    },
    displayAula: (codigo: string, aulaData: Aula) => {
      setAula(aulaData);
      setSearchCode(codigo);
      setError("");
    },
  }));

  const handleSearch = async (codigoNormalizado: string) => {
    setLoading(true);
    setError("");
    setAula(null);
    setSearchCode(codigoNormalizado);

    try {
      const result = await getAulaByCode(codigoNormalizado);

      if (!result) {
        setError("No se encontró el aula ingresada");
      } else {
        setAula(result);
        addSearchToHistory(codigoNormalizado, result);
      }
    } catch (err) {
      setError("Error al consultar el aula. Intenta nuevamente.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full pb-8">
      <AnimatePresence mode="wait">
        {!aula && (
          <motion.div
            key="search-container"
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* Institutional Logo Santo Tomás */}
            <div className="w-full flex flex-col items-center mt-6 mb-8">
              <div className="p-3 bg-[#0c2522]/60 rounded-2xl border border-[#1d463f]/60 backdrop-blur-md shadow-xl mb-6">
                <img 
                  src={stLogo} 
                  alt="Santo Tomás" 
                  className="h-12 sm:h-14 w-auto object-contain drop-shadow-md"
                />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-center drop-shadow-sm mb-2">
                EncuentraTuAula
              </h1>
              
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-200/90 uppercase">
                  Buscador Oficial de Aulas · Santo Tomás
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              </div>
            </div>

            <SearchBar ref={searchBarRef} onSearch={handleSearch} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full mt-6">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-center items-center py-12"
            >
              <div className="w-12 h-12 border-4 border-[#1b433c] border-t-emerald-400 rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-medium text-emerald-200/80">Consultando información del aula...</p>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="glass-card bg-[#281313]/90 border border-red-500/30 p-6 text-center text-red-200 shadow-xl"
            >
              <span className="block text-3xl mb-2">🔍</span>
              <p className="font-semibold text-lg text-white mb-1">Aula no encontrada</p>
              <p className="text-sm text-red-200/80">{error}</p>
            </motion.div>
          )}

          {aula && !loading && !error && (
            <motion.div 
              key="aula-result"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <AulaResult aula={aula} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
