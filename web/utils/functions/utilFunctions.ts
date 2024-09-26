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

export function concatFileName(fileName: string): string {
  // Extraction de l'extension du fichier
  const extension = fileName.split('.').pop();

  // Si le nom du fichier est plus long que 15 caractères, le tronquer et ajouter "..." suivi de l'extension
  if (fileName.length > 10) {
    const baseName = fileName.substring(0, 10);
    // Si le fichier a une extension, l'ajouter après les "..."
    return extension && fileName.includes('.')
      ? `${baseName}....${extension}`
      : `${baseName}...`;
  }

  // Si le nom du fichier est court, le retourner tel quel
  return fileName;
}
