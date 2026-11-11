import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Aula } from "../types";
import { findAula } from "../data/aulasData";

export const getAulaByCode = async (codigoNormalizado: string): Promise<Aula | null> => {
  // 1. Consulta el catálogo oficial actualizado local
  const localMatch = findAula(codigoNormalizado);
  if (localMatch) {
    return localMatch;
  }

  // 2. Respaldo en Firestore para consultas históricas
  try {
    const aulasRef = collection(db, "aulas");
    const q = query(
      aulasRef,
      where("codigoNormalizado", "==", codigoNormalizado),
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as Aula;
  } catch (error) {
    console.warn("Consulta a Firestore no disponible, aula no encontrada:", error);
    return null;
  }
};
