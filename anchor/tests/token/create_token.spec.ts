import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
} from '@solana/web3.js';
import {
    createInitializeMetadataPointerInstruction,
    createInitializeMintInstruction,
    ExtensionType,
    getMintLen,
    LENGTH_SIZE,
    TOKEN_2022_PROGRAM_ID,
    TYPE_SIZE,
} from '@solana/spl-token';
import type { TokenMetadata } from '@solana/spl-token-metadata';
import {
    createInitializeInstruction,
    pack,
    createUpdateFieldInstruction,
    createRemoveKeyInstruction,
} from '@solana/spl-token-metadata';
import { createUserWalletWithSol } from "../utils"
import { program } from "../config";

/* Use this test file to: 
 *  > Generate a USDC like mockup token Mint account
 *  > Create an Token Account with mint and authority account
 *  > Mint token with metadata
 */

// Notes / USDC account on devnet: https://explorer.solana.com/address/4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU?cluster=devnet

describe('createToken', () => {
    it("should successfully create a token and mint", async () => {
        
        const payer = await createUserWalletWithSol();

        const mint = Keypair.generate();
        const decimals = 6;

        const metadata: TokenMetadata = {
            mint: mint.publicKey,
            name: 'mocked USDC',
            symbol: 'mkUSDC',
            uri: '',
            additionalMetadata: [],
        };

        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        const connection = program.provider.connection;

        const mintLamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
        const mintTransaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: mint.publicKey,
                space: mintLen,
                lamports: mintLamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMetadataPointerInstruction(
                mint.publicKey,
                payer.publicKey,
                mint.publicKey,
                TOKEN_2022_PROGRAM_ID,
            ),
            createInitializeMintInstruction(mint.publicKey, decimals, payer.publicKey, null, TOKEN_2022_PROGRAM_ID),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mint.publicKey,
                metadata: mint.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: payer.publicKey,
                updateAuthority: payer.publicKey,
            }),
        );
        const sig = await sendAndConfirmTransaction(connection, mintTransaction, [payer, mint]);
        console.log('Signature:', sig);                
    });
});