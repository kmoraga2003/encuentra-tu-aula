import { useRef } from "react";
import Home, { HomeHandle } from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Aula } from "./types";
import campusBg from "./assets/images/san-joaquin.jpg";

function App() {
  const homeRef = useRef<HomeHandle>(null);

  const handleNavigateHome = () => {
    if (homeRef.current) {
      homeRef.current.resetSearch();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectFromHistory = (codigo: string, aulaData: Aula) => {
    if (homeRef.current) {
      homeRef.current.displayAula(codigo, aulaData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full pb-20 relative bg-[#081a17] text-slate-100 overflow-x-hidden selection:bg-[#004c42] selection:text-white">
      {/* Background Campus Image with Santo Tomás Green Duotone Overlay */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <img
          src={campusBg}
          alt="Campus Santo Tomás"
          className="w-full h-full object-cover object-center opacity-15 filter blur-[2px] scale-105"
        />
        {/* Institutional dark green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081a17]/95 via-[#0c2522]/85 to-[#081a17]/98"></div>
      </div>

      {/* Ambient decorative glowing light effects */}
      <div className="fixed top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-[#004c42]/35 blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-[#003831]/40 blur-[130px] -z-10 pointer-events-none"></div>

      {/* Top institutional subtle stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#004c42] via-emerald-500 to-[#004c42]"></div>

      {/* Main Content Container */}
      <main className="max-w-md mx-auto w-full pt-4 px-4 pb-24 min-h-[calc(100vh-6px)] flex flex-col relative z-10">
        <Home ref={homeRef} />
      </main>

      {/* Floating Bottom Navigation */}
      <Navbar
        onNavigateHome={handleNavigateHome}
        onSelectFromHistory={handleSelectFromHistory}
        onResetInput={() => homeRef.current?.resetSearch()}
      />
    </div>
  );
}

export default App;
