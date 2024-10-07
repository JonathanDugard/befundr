import { NextRequest, NextResponse } from 'next/server';
import {
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  mintTo,
} from '@solana/spl-token';
import {
  Cluster,
  ConfirmOptions,
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { message: 'Method not allowed' },
      { status: 405 }
    );
  }

  const body = await req.json();
  const { walletPublicKey: walletPublicKeyString, amount } = body;

  if (!walletPublicKeyString || !amount) {
    return NextResponse.json(
      { message: 'Missing wallet public key or amount' },
      { status: 400 }
    );
  }

  const walletPublicKey = new PublicKey(walletPublicKeyString);

  if (!process.env.LOCAL_KEY_PAIR || !process.env.NEXT_PUBLIC_MINT_ACCOUNT) {
    throw new Error(
      'Environment variables for key pair or mint account are missing'
    );
  }

  try {
    // get the token account publickey
    const associatedToken = await getAssociatedTokenAddress(
      new PublicKey(process.env.NEXT_PUBLIC_MINT_ACCOUNT),
      walletPublicKey,
      true,
      TOKEN_PROGRAM_ID, //programId
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // get the keypair used as mint authority for the MINT_ACCOUNT
    const secretKey = Uint8Array.from(JSON.parse(process.env.LOCAL_KEY_PAIR));
    const keyPair = Keypair.fromSecretKey(secretKey);

    // convert base amount to take into account USDC 6 decimals
    const convertedAmount = amount * Math.pow(10, 6);

    const connection = new Connection(
      process.env.CLUSTER_API_URL
        ? process.env.CLUSTER_API_URL
        : clusterApiUrl(process.env.CLUSTER_API_URL as Cluster)
    );

    try {
      const confirmOptions: ConfirmOptions = {
        skipPreflight: false,
        commitment: 'confirmed',
        preflightCommitment: 'processed',
        maxRetries: 5,
      };
      await mintTo(
        connection, // connection — Connection to use
        keyPair, // payer — Payer of the transaction fees
        new PublicKey(process.env.NEXT_PUBLIC_MINT_ACCOUNT), // token account to mint from
        associatedToken, // Le compte de token associé vers lequel on veut mint
        keyPair, // authority — Minting authority
        convertedAmount,
        undefined,
        confirmOptions
      );

      return NextResponse.json(
        { message: 'mint successfull' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error minting tokens:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error processing faucet request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
