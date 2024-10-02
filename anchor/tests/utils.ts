import { BlockheightBasedTransactionConfirmationStrategy, RpcResponseAndContext, SignatureResult, TransactionSignature, LAMPORTS_PER_SOL, Keypair, PublicKey } from "@solana/web3.js";
import { Befundr } from "../src";
import { User } from "./user/user_type";
import { anchor, program, systemProgram } from "./config";
import { BN, Program } from "@coral-xyz/anchor";
import { Project } from "./project/project_type";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
    MintAmountTo,
    getSplTransferAccounts,
    newPdaAssociatedTokenAccount
} from "./token/token_config";

export const LAMPORTS_INIT_BALANCE = 1000 * LAMPORTS_PER_SOL; // 1000 SOL per wallet

export const confirmTransaction = async (program: Program<Befundr>, tx: TransactionSignature): Promise<RpcResponseAndContext<SignatureResult>> => {
    const latestBlockhash = await program.provider.connection.getLatestBlockhash();
    const confirmationStrategy: BlockheightBasedTransactionConfirmationStrategy = { ...latestBlockhash, signature: tx };

    return await program.provider.connection.confirmTransaction(confirmationStrategy, "confirmed");
}

/**
 * **************************************
 *             PDA CRUD UTILS
 * **************************************
 */

/**
 * Create wallet
 * It will contain some SOL
 * @returns 
 */
export const createUserWalletWithSol = async (): Promise<Keypair> => {
    const wallet = new Keypair()
    const tx = await program.provider.connection.requestAirdrop(wallet.publicKey, LAMPORTS_INIT_BALANCE);
    await confirmTransaction(program, tx);
    return wallet
}

/**
 * Create User PDA
 * @param userData 
 * @param wallet 
 * @returns 
 */
export const createUser = async (userData: User, wallet: Keypair): Promise<PublicKey> => {
    const [userPdaPublicKey] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user"), wallet.publicKey.toBuffer()],
        program.programId
    );

    // Call the createUser method
    const createUserTx = await program.methods
        .createUser(
            userData.name ?? null,
            userData.avatar_url ?? null,
            userData.bio ?? null,
            userData.city ?? null,
        )
        .accountsPartial({
            signer: wallet.publicKey,
            user: userPdaPublicKey,
            systemProgram: systemProgram.programId,
        })
        .signers([wallet])
        .rpc();
    await confirmTransaction(program, createUserTx);
    return userPdaPublicKey;
}
// Create a new project
export const createProject = async (
    projectData: Project,
    userProjectCounter: number,
    userPubkey: PublicKey,
    wallet: Keypair
): Promise<PublicKey> => {

    // Seeds building
    const seeds = [
        Buffer.from("project"),
        userPubkey.toBuffer(),
        new BN(userProjectCounter + 1).toArray('le', 2),
    ];

    // Project Pda address research with seeds
    const [projectPdaPublicKey] = PublicKey.findProgramAddressSync(
        seeds,
        program.programId
    );

    // Get projectContributions PDA Pubkey
    const [projectContributionsPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("project_contributions"),
            projectPdaPublicKey.toBuffer(),
        ],
        program.programId
    );

    // Rewards serialization
    const serializedRewards = projectData.rewards.map((reward) => ({
        name: reward.name,
        description: reward.description,
        price: new BN(reward.price),
        maxSupply: new BN(reward.maxSupply),
        currentSupply: new BN(reward.currentSupply),
    }));

    // Call the createProject method
    const createTx = await program.methods
        .createProject(
            projectData.name,
            projectData.imageUrl,
            projectData.description,
            projectData.goalAmount,
            new BN(Math.floor(projectData.endTime / 1000)),
            serializedRewards,
            projectData.safetyDeposit,
            projectData.xAccountUrl,
            projectData.category
        )
        .accountsPartial({
            user: userPubkey,
            project: projectPdaPublicKey,
            signer: wallet.publicKey,
        })
        .signers([wallet])
        .rpc();

    await confirmTransaction(program, createTx);

    // Create project ATA
    await newPdaAssociatedTokenAccount(wallet, projectPdaPublicKey);

    return projectPdaPublicKey;
}

/**
 * Create a new contribution
 * @param projectPubkey 
 * @param userPubkey 
 * @param wallet
 * @param projectContributionCounter
 * @param amount 
 * @param rewardId 
 * @returns 
 */
export const createContribution = async (
    projectPubkey: PublicKey,
    userPubkey: PublicKey,
    wallet: Keypair,
    projectContributionCounter: number,
    amount: number,
    rewardId: number | null,
    mintAmount?: number | null
): Promise<PublicKey> => {

    const [contributionPdaPublicKey] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("contribution"),
            projectPubkey.toBuffer(),
            new BN(projectContributionCounter + 1).toArray('le', 2),
        ],
        program.programId
    );

    // Get projectContributions PDA Pubkey
    const [projectContributionsPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("project_contributions"),
            projectPubkey.toBuffer(),
        ],
        program.programId
    );
    // Get userContributions PDA Pubkey
    const [userContributionsPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_contributions"),
            userPubkey.toBuffer(),
        ],
        program.programId
    );

    // Get SPL Token transfer accounts
    const { fromAta, toAta } = await getSplTransferAccounts(wallet, projectPubkey);
    if (mintAmount && mintAmount !== undefined) {
        // Add 500 mocked up USDC to the wallet before sending contribution
        await MintAmountTo(wallet, fromAta, mintAmount);
    }

    // Call the addContribution method
    const createTx = await program.methods
        .addContribution(
            new BN(amount),
            rewardId !== null ? new BN(rewardId) : null
        )
        .accountsPartial({
            project: projectPubkey,
            projectContributions: projectContributionsPubkey,
            user: userPubkey,
            userContributions: userContributionsPubkey,
            contribution: contributionPdaPublicKey,
            fromAta: fromAta,
            toAta: toAta,
            signer: wallet.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([wallet])
        .rpc();

    await confirmTransaction(program, createTx);

    return contributionPdaPublicKey;
}

export const createUnlockRequest = async (
    projectPubkey: PublicKey,
    userPubkey: PublicKey,
    wallet: Keypair,
    unlockRequestsCounter: number,
    amountRequested: number
): Promise<PublicKey> => {
    const [unlockRequestsPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("project_unlock_requests"),
            projectPubkey.toBuffer(),
        ],
        program.programId
    );
    const [newUnlockRequestPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("unlock_request"),
            projectPubkey.toBuffer(),
            new BN(unlockRequestsCounter + 1).toArray('le', 2),
        ],
        program.programId
    );

    const [currentUnlockRequestPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("unlock_request"),
            projectPubkey.toBuffer(),
            new BN(unlockRequestsCounter).toArray('le', 2),
        ],
        program.programId
    );


    const createTx = await program.methods
        .createUnlockRequest(
            new BN(amountRequested)
        )
        .accountsPartial({
            user: userPubkey,
            unlockRequests: unlockRequestsPubkey,
            newUnlockRequest: newUnlockRequestPubkey,
            currentUnlockRequest: unlockRequestsCounter && currentUnlockRequestPubkey || null, //null account if no requests yet
            project: projectPubkey,
            owner: wallet.publicKey,
        })
        .signers([wallet])
        .rpc();

    await confirmTransaction(program, createTx);

    return newUnlockRequestPubkey;
}

export const createTransaction = async (
    contributionPubkey: PublicKey,
    userPubkey: PublicKey,
    sellerWallet: Keypair,
    sellingPrice: number
): Promise<PublicKey> => {

    const [saleTransactionPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("sale_transaction"),
            contributionPubkey.toBuffer(),
        ],
        program.programId
    );

    const createTx = await program.methods
        .createTransaction(
            new BN(sellingPrice)
        )
        .accountsPartial({
            saleTransaction: saleTransactionPubkey,
            user: userPubkey,
            contribution: contributionPubkey,
            owner: sellerWallet.publicKey,
        })
        .signers([sellerWallet])
        .rpc();

    await confirmTransaction(program, createTx);

    return saleTransactionPubkey;
}