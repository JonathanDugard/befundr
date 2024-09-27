export function calculateTimeRemaining(futureDate: number): number {
  const now = Date.now();
  const timeDiff = futureDate * 1000 - now;

  // Convert milliseconds to days
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // Return 0 if the date has already passed
  return daysRemaining >= 0 ? daysRemaining : 0;
}

export function calculateTimeElapsed(pastDate: number): number {
  const now = Date.now();
  const timeDiff = now - pastDate * 1000;

  // Convert milliseconds to days
  const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Return 0 if the date is in the future
  return daysElapsed >= 0 ? daysElapsed : 0;
}

export function getDateFromTimestamp(
  timestamp: number,
  durationInDays: number
): string {
  // Convert the duration in days to milliseconds
  const durationInMs = durationInDays * 24 * 60 * 60 * 1000;

  // Calculate the new date by adding the duration to the timestamp
  const newDate = new Date(timestamp + durationInMs);

  // Get the day, month, and year
  const day = newDate.getDate().toString().padStart(2, '0'); // Add leading zero for single-digit days
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so +1
  const year = newDate.getFullYear().toString();

  // Return the date in the format dd/mm/yyyy
  return `${day}/${month}/${year}`;
}

export function convertTimestampToDateString(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 10); // Retourne la date sous forme de yyyy-mm-dd
}

export function concatFileName(fileName: string): string {
  // Extract the file extension
  const extension = fileName.split('.').pop();

  // If the file name is longer than 15 characters, truncate it and add "..." followed by the extension
  if (fileName.length > 10) {
    const baseName = fileName.substring(0, 10);
    // If the file has an extension, append it after "..."
    return extension && fileName.includes('.')
      ? `${baseName}....${extension}`
      : `${baseName}...`;
  }

  // If the file name is short, return it as is
  return fileName;
}
