  // Charger l'historique depuis localStorage
  export function loadHistoryFromStorage() : string[] {
    try {
      const raw = localStorage.getItem("weatherHistory");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (e) {
      console.warn(
        "Impossible de charger l'historique depuis localStorage.",
        e
      );
      return [];
    }
  }

  // Sauvegarder l'historique dans localStorage
  export const saveHistoryToStorage = (history : string[]) => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
};