import sanJoaquinImg from '../../assets/images/san-joaquin.jpg';
import raquelImg from '../../assets/images/raquel.jpg';
import { Aula } from '../../types';

interface AulaResultProps {
  aula: Aula | null;
}

const AulaResult = ({ aula }: AulaResultProps) => {
  if (!aula) return null;

  const sedeImages: Record<string, string> = {
    "san joaquín": sanJoaquinImg,
    "san joaquin": sanJoaquinImg,
    "raquel": raquelImg,
  };

  const getImageByCode = (codigo: string) => {
    const lastChar = codigo[codigo.length - 1];
    if (['A', 'B', 'C'].includes(lastChar)) {
      return sanJoaquinImg;
    } else if (lastChar === 'R') {
      return raquelImg;
    }
    return null;
  };

  const getImageBySede = (sede: string) => {
    if (!sede) return null;
    const key = sede.trim().toLowerCase();
    return sedeImages[key] || null;
  };

  const image = getImageBySede(aula.sede) || getImageByCode(aula.codigo);

  return (
    <div className="glass-card bg-[#0c2522]/90 border border-[#235048] flex flex-col p-6 overflow-hidden divide-y divide-[#1b433c] shadow-2xl text-slate-100">
      {/* Header section with badge and code */}
      <div className="pb-4 mb-2 flex flex-col items-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#004c42] text-emerald-100 border border-emerald-400/30 uppercase mb-2 shadow-sm">
          AULA ENCONTRADA
        </span>
        <h2 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
          {aula.codigo}
        </h2>
      </div>

      {/* Details */}
      <div className="py-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-emerald-200/80 text-sm">Sede</span>
          <span className="text-right text-white font-bold">{aula.sede}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-emerald-200/80 text-sm">Edificio / Pabellón</span>
          <span className="text-right text-white font-bold">{aula.edificio}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-emerald-200/80 text-sm">Piso</span>
          <span className="text-right text-white font-bold">{aula.piso}</span>
        </div>
      </div>

      {/* Reference Image */}
      {image && (
        <div className="py-4 -mx-6 px-6">
          <div className="relative rounded-2xl overflow-hidden border border-[#235048] shadow-md group">
            <img
              src={image}
              alt={`Fotografía de referencia para sede ${aula.sede}`}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081a17]/80 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 left-3 text-xs font-medium text-emerald-200 bg-[#081a17]/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
              Referencia de acceso
            </div>
          </div>
        </div>
      )}

      {/* Step by step guide */}
      <div className="pt-4 mt-2">
        <span className="block font-bold text-emerald-200/90 text-sm mb-2 uppercase tracking-wide">
          Guía de llegada
        </span>
        <p className="bg-[#081a17]/90 p-4 rounded-xl border border-[#1b433c] text-slate-200 leading-relaxed shadow-inner text-sm sm:text-base">
          {aula.guia}
        </p>
      </div>
    </div>
  );
};

export default AulaResult;
