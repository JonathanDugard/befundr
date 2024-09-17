import { BlockheightBasedTransactionConfirmationStrategy, RpcResponseAndContext, SignatureResult, TransactionSignature, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Idl, Program } from "@coral-xyz//anchor";
import { Befundr } from "../src";

export const INIT_BALANCE = 1000 * LAMPORTS_PER_SOL; // 1000 SOL per wallet

export const confirmTransaction = async (program: Program<Befundr>, tx: TransactionSignature): Promise<RpcResponseAndContext<SignatureResult>>  => {
    const latestBlockhash = await program.provider.connection.getLatestBlockhash();
    const confirmationStrategy: BlockheightBasedTransactionConfirmationStrategy = { ...latestBlockhash, signature: tx };

    return await program.provider.connection.confirmTransaction(confirmationStrategy, "confirmed");
}