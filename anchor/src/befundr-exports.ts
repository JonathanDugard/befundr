// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import BefundrIDL from '../target/idl/befundr.json';
import type { Befundr } from '../target/types/befundr';

// Re-export the generated IDL and type
export { Befundr, BefundrIDL };

// The programId is imported from the program IDL.
export const BEFUNDR_PROGRAM_ID = new PublicKey(BefundrIDL.address);

// This is a helper function to get the Befundr Anchor program.
export function getBefundrProgram(provider: AnchorProvider) {
  return new Program(BefundrIDL as Befundr, provider);
}

// This is a helper function to get the program ID for the Befundr program depending on the cluster.
export function getBefundrProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return BEFUNDR_PROGRAM_ID;
  }
}
