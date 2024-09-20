export function calculateTimeRemaining(futureDate: number): number {
  const now = Date.now();
  const timeDiff = futureDate * 1000 - now;

  // Conversion des millisecondes en jours
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // Retourne 0 si la date est déjà passée
  return daysRemaining >= 0 ? daysRemaining : 0;
}

export function calculateTimeElapsed(pastDate: number): number {
  const now = Date.now();
  const timeDiff = now - pastDate * 1000;

  // Conversion des millisecondes en jours
  const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Retourne 0 si la date est dans le futur
  return daysElapsed >= 0 ? daysElapsed : 0;
}
