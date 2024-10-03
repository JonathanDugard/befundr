import {
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Account,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  createAssociatedTokenAccountInstruction,
  mintTo,
} from '@solana/spl-token';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';

// function to get ATA and mint faucet
export const getATAAndMint = async (
  walletPublicKey: PublicKey,
  connection: Connection,
  sendTransaction: any,
  amount: number
) => {
  // get ATA
  let account: Account | null = null;
  let associatedToken: PublicKey | null = null;

  try {
    const { account: accountGot, associatedToken: associatedTokenGot } =
      await getOrCreateATA(walletPublicKey, connection, sendTransaction);

    if (!accountGot || !associatedTokenGot) {
      throw new Error('Failed to get account or associated token');
    }

    account = accountGot;
    associatedToken = associatedTokenGot;
  } catch (error) {
    console.error('Error getting ATA:', error);
    throw error;
  }

  // mint faucet
  try {
    await mintFaucet(connection, associatedToken, amount);
  } catch (error) {
    console.error('Error minting tokens:', error);
    throw error;
  }

  return account;
};

// function to get existing ATA
export const getATA = async (
  walletPublicKey: PublicKey,
  connection: Connection,
  sendTransaction: any
): Promise<{ account: Account | null; associatedToken: PublicKey }> => {
  // checks
  if (!process.env.NEXT_PUBLIC_MINT_ACCOUNT) {
    throw new Error('Environment variables for mint account are missing');
  }

  // get the token account publickey
  const associatedToken = await getAssociatedTokenAddress(
    new PublicKey(process.env.NEXT_PUBLIC_MINT_ACCOUNT),
    walletPublicKey,
    true,
    TOKEN_PROGRAM_ID, //programId
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  // get the user wallet ATA
  let account: Account | null = null;
  try {
    // check is ATA already exist
    account = await getAccount(
      connection, // connection — Connection to use
      associatedToken, // address — Token account
      /*commitment*/ 'single', // commitment — Desired level of commitment for querying the state
      TOKEN_PROGRAM_ID // programId — SPL Token program account
    );
  } catch (error: unknown) {
    console.error(error);
  }
  return { account, associatedToken };
};

// function to get ATA or create is needed
export const getOrCreateATA = async (
  walletPublicKey: PublicKey,
  connection: Connection,
  sendTransaction: any
) => {
  // checks
  if (!process.env.NEXT_PUBLIC_MINT_ACCOUNT) {
    throw new Error('Environment variables for mint account are missing');
  }

  // get the token account publickey
  const associatedToken = await getAssociatedTokenAddress(
    new PublicKey(process.env.NEXT_PUBLIC_MINT_ACCOUNT),
    walletPublicKey,
    true,
    TOKEN_PROGRAM_ID, //programId
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  // get the user wallet ATA
  let account: Account;
  try {
    // check is ATA already exist
    account = await getAccount(
      connection, // connection — Connection to use
      associatedToken, // address — Token account
      /*commitment*/ 'single', // commitment — Desired level of commitment for querying the state
      TOKEN_PROGRAM_ID // programId — SPL Token program account
    );
  } catch (error: unknown) {
    if (
      // is ATA not existing try to create one
      error instanceof TokenAccountNotFoundError ||
      error instanceof TokenInvalidAccountOwnerError
    ) {
      try {
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            walletPublicKey, // payer
            associatedToken, // associated token
            walletPublicKey, // owner
            new PublicKey(process.env.NEXT_PUBLIC_MINT_ACCOUNT), // token mint account
            TOKEN_PROGRAM_ID, // programId — SPL Token program account
            ASSOCIATED_TOKEN_PROGRAM_ID // associatedTokenProgramId — SPL Associated Token program account
          )
        );

        // wait for TX confirmation
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'confirmed');
      } catch (error: unknown) {
        /* empty */
      }
      // try again to get the user wallet ATA
      account = await getAccount(
        connection, // connection — Connection to use
        associatedToken, // address — Token account
        /*commitment*/ 'single', // commitment — Desired level of commitment for querying the state
        TOKEN_PROGRAM_ID // programId — SPL Token program account
      );
    } else {
      throw error;
    }
  }

  return { account, associatedToken };
};

// function to mint faucet
const mintFaucet = async (
  connection: Connection,
  associatedToken: PublicKey,
  amount: number
): Promise<string> => {
  // get the keypair used as mint authority for the MINT_ACCOUNT
  if (
    !process.env.NEXT_PUBLIC_LOCAL_KEY_PAIR ||
    !process.env.NEXT_PUBLIC_MINT_ACCOUNT
  ) {
    throw new Error(
      'Environment variables for key pair or mint account are missing'
    );
  }

  // return if amount === 0
  if (amount === 0) {
    throw new Error('No mint amount provided');
  }

  // get the keypair used as mint authority for the MINT_ACCOUNT
  const secretKey = Uint8Array.from(
    JSON.parse(process.env.NEXT_PUBLIC_LOCAL_KEY_PAIR)
  );
  const keyPair = Keypair.fromSecretKey(secretKey);

  // convert base amount to take into account USDC 6 decimals
  const convertedAmount = amount * Math.pow(10, 6);

  try {
    const mintSignature = await mintTo(
      connection, // connection — Connection to use
      keyPair, // payer — Payer of the transaction fees
      new PublicKey(process.env.NEXT_PUBLIC_MINT_ACCOUNT), // token account to mint from
      associatedToken, // Le compte de token associé vers lequel on veut mint
      keyPair, // authority — Minting authority
      convertedAmount // amount — Amount to mint
    );
    return mintSignature;
  } catch (error) {
    console.error('Error minting tokens:', error);
    throw error;
  }
};
