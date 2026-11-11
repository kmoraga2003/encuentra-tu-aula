import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { normalizeCode } from "../../utils/normalizeCode";

interface SearchBarProps {
  onSearch: (codigo: string) => void;
}

export interface SearchBarHandle {
  clearInput: () => void;
}

const box1Options = ["S", "L", "A", "T"];
const box2Options = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08",
  "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"
];
const box3Options = ["P01", "P02", "P03", "P04", "S01", "S02"];
const box4Options = ["A", "B", "C", "R"];

const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(({ onSearch }, ref) => {
  const [b1, setB1] = useState(box1Options[0]);
  const [b2, setB2] = useState(box2Options[1]);
  const [b3, setB3] = useState(box3Options[1]);
  const [b4, setB4] = useState(box4Options[0]);

  const select2Ref = useRef<HTMLSelectElement>(null);
  const select3Ref = useRef<HTMLSelectElement>(null);
  const select4Ref = useRef<HTMLSelectElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    clearInput: () => {
      setB1(box1Options[0]);
      setB2(box2Options[1]);
      setB3(box3Options[1]);
      setB4(box4Options[0]);
    },
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const joined = `${b1}-${b2}-${b3}-${b4}`;
    const normalized = normalizeCode(joined);
    if (!normalized) return;
    onSearch(normalized);
  };

  const selectClasses = "bg-[#143932] hover:bg-[#18453c] text-white text-center text-sm sm:text-lg py-2 px-1 rounded-lg border border-[#235048] focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-[#007060]/50 cursor-pointer flex-1 disabled:opacity-50 appearance-none font-bold shadow-inner transition-all";

  return (
    <form 
      className="w-full relative glass-card p-2.5 sm:p-3.5 group focus-within:ring-2 focus-within:ring-emerald-500/60 transition-all shadow-2xl border border-[#235048] flex items-center bg-[#0c2522]/90 backdrop-blur-xl" 
      onSubmit={handleSubmit}
    >
      <div className="flex w-full items-center justify-between gap-1 sm:gap-2 pr-20 sm:pr-28">
        <select value={b1} onChange={e => { setB1(e.target.value); select2Ref.current?.focus(); }} className={selectClasses} title="Tipo de Espacio">
          {box1Options.map(opt => <option key={opt} value={opt} className="bg-[#0c2522] text-white">{opt}</option>)}
        </select>
        <span className="text-emerald-400/70 font-black">-</span>
        <select ref={select2Ref} value={b2} onChange={e => { setB2(e.target.value); select3Ref.current?.focus(); }} className={selectClasses} title="Número de Sala">
          {box2Options.map(opt => <option key={opt} value={opt} className="bg-[#0c2522] text-white">{opt}</option>)}
        </select>
        <span className="text-emerald-400/70 font-black">-</span>
        <select ref={select3Ref} value={b3} onChange={e => { setB3(e.target.value); select4Ref.current?.focus(); }} className={selectClasses} title="Pabellón / Nivel">
          {box3Options.map(opt => <option key={opt} value={opt} className="bg-[#0c2522] text-white">{opt}</option>)}
        </select>
        <span className="text-emerald-400/70 font-black">-</span>
        <select ref={select4Ref} value={b4} onChange={e => { setB4(e.target.value); submitRef.current?.focus(); }} className={selectClasses} title="Edificio / Sector">
          {box4Options.map(opt => <option key={opt} value={opt} className="bg-[#0c2522] text-white">{opt}</option>)}
        </select>
      </div>

      <button
        ref={submitRef}
        type="submit"
        className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 bg-[#004c42] hover:bg-[#003831] border border-emerald-400/40 text-white font-bold text-sm sm:text-base px-3 sm:px-6 rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-[#004c42]/50 active:scale-95 flex items-center justify-center z-10 cursor-pointer"
      >
        Buscar
      </button>
    </form>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
