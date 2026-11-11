import sanJoaquinImg from '../../assets/images/san-joaquin.jpg';
import raquelImg from '../../assets/images/raquel.jpg';
import { Aula } from '../../types';

interface AulaResultProps {
  aula: Aula | null;
  onResetSearch?: () => void;
}

const AulaResult = ({ aula, onResetSearch }: AulaResultProps) => {
  if (!aula) return null;

  const isRaquel = 
    aula.sede?.toLowerCase().includes("raquel") ||
    aula.pabellon?.toUpperCase() === "R" ||
    aula.codigo?.toUpperCase().endsWith("R");

  const image = isRaquel ? raquelImg : sanJoaquinImg;
  const imageAlt = isRaquel 
    ? "Acceso a Sede Raquel (Raquel 9, San Joaquín)" 
    : "Sede San Joaquín (Vicuña Mackenna 4835)";

  const sedeTexto = isRaquel ? "Raquel" : "San Joaquín";
  const direccionTexto = aula.direccion || (isRaquel ? "Raquel 9, San Joaquín" : "Vicuña Mackenna 4835, San Joaquín");
  const edificioTexto = aula.edificio || (aula.pabellon ? `Edificio ${aula.pabellon}` : (isRaquel ? "Sector Raquel" : "Edificio A"));
  const pisoTexto = typeof aula.piso === "number" 
    ? (aula.piso < 0 ? `Sótano ${aula.piso}` : `Piso ${aula.piso}`)
    : aula.piso;

  // Mensaje de orientación dinámico
  const mensajeOrientacion = aula.mensajeOrientacion || (
    isRaquel 
      ? `Esta sala se encuentra en la sede Raquel, por lo que tienes que ir a la dirección ${direccionTexto}. Queda ubicada en el ${pisoTexto}.`
      : `Esta sala se encuentra en la sede de Vicuña Mackenna (${direccionTexto}), en el ${edificioTexto} y queda ubicada en el ${pisoTexto}.`
  );

  return (
    <div className="glass-card bg-[#0c2522]/90 border border-[#235048] flex flex-col p-6 overflow-hidden divide-y divide-[#1b433c] shadow-2xl text-slate-100">
      {/* Header section with prominent SALA */}
      <div className="pb-4 mb-2 flex flex-col items-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#004c42] text-emerald-100 border border-emerald-400/30 uppercase mb-2 shadow-sm">
          AULA ENCONTRADA
        </span>

        {/* SALA destacada en grande */}
        <div className="text-center my-1">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block mb-0.5">
            SALA
          </span>
          <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
            {aula.sala || aula.codigo}
          </h2>
          {aula.codigo && aula.sala && aula.codigo !== aula.sala && (
            <span className="text-xs sm:text-sm font-medium text-slate-400 mt-1 inline-block">
              Código horario: <strong className="text-emerald-200">{aula.codigo}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="py-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-emerald-200/80 text-sm">Sede</span>
          <span className="text-right text-white font-bold">{sedeTexto}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-emerald-200/80 text-sm">Edificio / Pabellón</span>
          <span className="text-right text-white font-bold">{edificioTexto}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-emerald-200/80 text-sm">Piso</span>
          <span className="text-right text-white font-bold">{pisoTexto}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="font-semibold text-emerald-200/80 text-sm flex-shrink-0">Dirección</span>
          <span className="text-right text-white font-medium text-xs sm:text-sm">{direccionTexto}</span>
        </div>
      </div>

      {/* Reference Image */}
      <div className="py-4 -mx-6 px-6">
        <div className="relative rounded-2xl overflow-hidden border border-[#235048] shadow-md group">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081a17]/85 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-2 left-3 text-xs font-semibold text-emerald-200 bg-[#081a17]/90 px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#235048]">
            {isRaquel ? "Sede Raquel" : "Sede Vicuña Mackenna"}
          </div>
        </div>
      </div>

      {/* Mensaje de Orientación (reemplaza la guía de llegada anterior) */}
      <div className="pt-4 mt-2">
        <span className="block font-bold text-emerald-200/90 text-xs sm:text-sm mb-2 uppercase tracking-wide flex items-center gap-1.5">
          <span>📍</span> Información de Ubicación
        </span>
        <p className="bg-[#081a17]/90 p-4 rounded-xl border border-[#1b433c] text-slate-200 leading-relaxed shadow-inner text-sm sm:text-base">
          {mensajeOrientacion}
        </p>
      </div>

      {/* Botón Volver a buscar */}
      {onResetSearch && (
        <div className="pt-5 mt-2 flex justify-center">
          <button
            onClick={onResetSearch}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#004c42] hover:bg-[#003831] border border-emerald-400/40 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#004c42]/50 active:scale-95 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Buscar otra aula</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AulaResult;
