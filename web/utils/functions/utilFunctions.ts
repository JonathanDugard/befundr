export function calculateDaysBetween<T extends Date | string>(startDate: T, endDate: T): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Calcul de la différence en millisecondes
    const timeDiff = end.getTime() - start.getTime();
  
    // Conversion des millisecondes en jours
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    // Retourne 0 si la date de fin est passée
    return daysRemaining >= 0 ? daysRemaining : 0;
  }