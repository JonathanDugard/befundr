import { BlockheightBasedTransactionConfirmationStrategy, RpcResponseAndContext, SignatureResult, TransactionSignature, LAMPORTS_PER_SOL, Keypair, PublicKey } from "@solana/web3.js";
import { Befundr } from "../src";
import { User } from "./user/user_type";
import { anchor, program, systemProgram } from "./config";
import { BN, Program } from "@coral-xyz/anchor";
import { Project } from "./project/project_type";

export const INIT_BALANCE = 1000 * LAMPORTS_PER_SOL; // 1000 SOL per wallet

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
    const tx = await program.provider.connection.requestAirdrop(wallet.publicKey, INIT_BALANCE);
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
            projectData.projectDescription,
            projectData.goalAmount,
            new BN(Math.floor(projectData.endTime / 1000)),
            serializedRewards
        )
        .accountsPartial({
            user: userPubkey,
            project: projectPdaPublicKey,
            signer: wallet.publicKey,
        })
        .signers([wallet])
        .rpc();

    await confirmTransaction(program, createTx);

    return projectPdaPublicKey;
}