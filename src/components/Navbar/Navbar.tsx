import { useState } from "react";
import HistoryModal from "../History/HistoryModal";
import HelpModal from "../Help/HelpModal";
import { Aula } from "../../types";
import { AnimatePresence } from "framer-motion";

interface NavbarProps {
  onNavigateHome: () => void;
  onSelectFromHistory: (codigo: string, aulaData: Aula) => void;
  onResetInput: () => void;
}

const Navbar = ({ onNavigateHome, onSelectFromHistory, onResetInput }: NavbarProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleHomeClick = () => {
    if (onResetInput) onResetInput();
    setShowHistory(false);
    setShowHelp(false);
    onNavigateHome();
  };

  const isHomeActive = !showHistory && !showHelp;

  const NavButton = ({ 
    onClick, 
    icon, 
    label, 
    baseColor, 
    activeBg, 
    activeShadow,
    isActive 
  }: { 
    onClick: () => void; 
    icon: React.ReactNode; 
    label: string; 
    baseColor: string; 
    activeBg: string; 
    activeShadow: string;
    isActive: boolean;
  }) => (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex flex-col items-center justify-center p-1.5 ${baseColor} transition-all active:scale-95 group`}
    >
      <div className={`
        ${isActive ? `${activeBg} ${activeShadow} text-white` : `bg-[#13332e]/70 text-slate-300 group-hover:${activeBg} group-hover:text-white`} 
        rounded-2xl p-2.5 sm:p-3 transition-all duration-300 mb-1 border border-[#235048]/50
        ${!isActive && 'transform group-hover:-translate-y-0.5'}
      `}>
        {icon}
      </div>
      <span className={`text-[11px] sm:text-xs ${isActive ? 'font-bold text-white' : 'font-medium text-slate-400 group-hover:text-slate-200'} transition-all`}>
        {label}
      </span>
    </button>
  );

  return (
    <>
      {/* Centered navigation within max-w-md */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none z-40">
        <div className="w-full max-w-md pointer-events-auto">
          <nav className="glass-card bg-[#0c2522]/95 border border-[#235048] mx-4 my-3 px-6 sm:px-8 py-2 flex justify-between items-center shadow-2xl backdrop-blur-xl">
            <NavButton 
              onClick={handleHomeClick} 
              label="Inicio" 
              baseColor="text-emerald-300"
              activeBg="bg-[#004c42]"
              activeShadow="shadow-lg shadow-[#004c42]/50 border-emerald-400/40"
              isActive={isHomeActive}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isHomeActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isHomeActive ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  {isHomeActive ? (
                    <path d="M12 3L4 9v12h5v-7h6v7h5V9z" />
                  ) : (
                    <>
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </>
                  )}
                </svg>
              } 
            />

            <NavButton 
              onClick={() => { setShowHistory(true); setShowHelp(false); }} 
              label="Historial" 
              baseColor="text-slate-300"
              activeBg="bg-[#18453c]"
              activeShadow="shadow-lg shadow-black/40 border-emerald-500/30"
              isActive={showHistory}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={showHistory ? "currentColor" : "none"} stroke="currentColor" strokeWidth={showHistory ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  {showHistory ? (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11V7h2v6.17l3.54 3.53-1.41 1.41-3.13-3.11z" />
                  ) : (
                    <>
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </>
                  )}
                </svg>
              } 
            />

            <NavButton 
              onClick={() => { setShowHelp(true); setShowHistory(false); }} 
              label="Ayuda" 
              baseColor="text-amber-300"
              activeBg="bg-amber-700/80"
              activeShadow="shadow-lg shadow-amber-900/40 border-amber-500/40"
              isActive={showHelp}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={showHelp ? "currentColor" : "none"} stroke="currentColor" strokeWidth={showHelp ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  {showHelp ? (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  ) : (
                    <>
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </>
                  )}
                </svg>
              } 
            />
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {showHistory && (
          <HistoryModal
            onClose={() => setShowHistory(false)}
            onSelectSearch={onSelectFromHistory}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
