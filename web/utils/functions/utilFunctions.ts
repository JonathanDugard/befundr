import { SPL_DECIMAL } from '@/data/constants';
import { Befundr } from '@befundr/anchor';
import { Program } from '@coral-xyz/anchor';
import {
  BlockheightBasedTransactionConfirmationStrategy,
  RpcResponseAndContext,
  SignatureResult,
  TransactionSignature,
} from '@solana/web3.js';

/**
 * Returns a timestamp for the current time plus the given number of days.
 *
 * @param days - The number of days to add to the current time.
 * @returns {number} - The timestamp representing the current time plus the specified number of days.
 */
export function getTimestampInFuture(days: number): number {
  const millisecondsInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const now = Date.now(); // Current timestamp in milliseconds
  return now + days * millisecondsInDay; // Add the number of days in milliseconds to the current timestamp
}

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

/**
 * Converts a string to camelCase format.
 *
 * @param input - The string to convert.
 * @returns The input string in camelCase format.
 */
export function toCamelCase(input: string): string {
  return input
    .toLowerCase() // Convert the entire string to lowercase
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase()); // Replace spaces or special characters and capitalize the next character
}

/**
 * For 0%, the function returns 75, and for 5%, it returns 100.
 * The function interpolates linearly between these two points.
 *
 * @param percentage - The input percentage (from 0 to 5).
 * @returns The calculated value based on the percentage.
 */
export function calculateTrustScore(
  safetyDeposit: number,
  goalAmount: number
): number {
  // calculate collateral ratio
  let percentage = (safetyDeposit * 100) / goalAmount;
  // Ensure the percentage is between 0 and 5
  if (percentage < 0) {
    percentage = 0;
  } else if (percentage > 5) {
    percentage = 5;
  }

  // Linear interpolation between 75 and 100
  const valueAt0Percent = 75;
  const valueAt5Percent = 100;

  // Calculate the value based on the percentage
  return (
    valueAt0Percent + (valueAt5Percent - valueAt0Percent) * (percentage / 5)
  );
}

export const convertSplAmountToNumber = (amount: bigint): number => {
  return Number(amount) / Math.pow(10, SPL_DECIMAL);
};

export const convertNumberToSplAmount = (number: number): number => {
  return Math.round(number * Math.pow(10, SPL_DECIMAL));
};

export const confirmTransaction = async (
  program: Program<Befundr>,
  tx: TransactionSignature
): Promise<RpcResponseAndContext<SignatureResult>> => {
  const latestBlockhash =
    await program.provider.connection.getLatestBlockhash();
  const confirmationStrategy: BlockheightBasedTransactionConfirmationStrategy =
    { ...latestBlockhash, signature: tx };

  return await program.provider.connection.confirmTransaction(
    confirmationStrategy,
    'confirmed'
  );
};
