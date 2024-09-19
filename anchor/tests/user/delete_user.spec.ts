import { Keypair, PublicKey } from "@solana/web3.js";
import { userData1, userData2, userData3 } from './user_dataset';
import { projectData1 } from "../project/project_dataset";
import { confirmTransaction, createUser, createUserWalletWithSol, createProject } from '../utils';
import { program, systemProgram, anchor } from '../config';
import * as bs58 from "bs58";

// Generate admin keypair from secret key 
// FOR LOCAL TESTING PURPOSES ONLY
const adminKeypair = Keypair.fromSecretKey(
  bs58.decode(
    "tpXxTgtdHNPiXeU7cQ8WWkZdti9spg3GoXVCViFjdY5FXhDVwaGCFXvdDGbgCtSBrnQ5C1XW87qUYfa3m6iQyd9",
  ),
);

describe('deleteUser', () => {

    /**
    * Delete user function
    * @param userPda - The PDA of the user to delete
    * @param authorityWallet - The wallet of the authority to delete the user
    */
    const deleteUser = async (userPda: PublicKey, ownerWallet: PublicKey, authorityWallet: Keypair): Promise<void> => {
        // Implement the logic to delete the user
        const deleteUserTx = await program.methods
            .deleteUser()
            .accountsPartial({
                user: userPda,
                owner: ownerWallet,
                authority: authorityWallet.publicKey,
                systemProgram: systemProgram.programId,
            })
            .signers([authorityWallet])
            .rpc();
        const signature = await confirmTransaction(program, deleteUserTx);
    };

    it("should success to delete the user by admin", async () => {

        /* This test is to check : 
        * 1. if the user's owner lamports will be returned to the owner after the user pda is deleted
        * 2. if the user's pda is deleted
        */

        const userWallet = await createUserWalletWithSol();
        const userWallet2 = await createUserWalletWithSol();
        
        const userData = userData1;

        const userPda = await createUser(userData, userWallet);
        const fetchUserAccount = await program.account.user.fetch(userPda);
        const fetchOwnerWalletBf = await anchor.getProvider().connection.getAccountInfo(fetchUserAccount.owner);

        await deleteUser(userPda, fetchUserAccount.owner, adminKeypair);

        const fetchOwnerWalletAf = await anchor.getProvider().connection.getAccountInfo(fetchUserAccount.owner);

        expect(fetchOwnerWalletAf.lamports).toBeGreaterThan(fetchOwnerWalletBf.lamports);

        try {
            await program.account.user.fetch(userPda);
        } catch (err) {
            expect(err.message).toContain("Account does not exist");
        }
    });

    it("should failed to delete the user by admin as the sol destination wallet is not the user account owner", async () => {

        const userWallet = await createUserWalletWithSol();
        const userWallet2 = await createUserWalletWithSol();
        
        const userData = userData1;

        const userPda = await createUser(userData, userWallet);
        const fetchUserAccount = await program.account.user.fetch(userPda);

        try {
            await deleteUser(userPda, userWallet2.publicKey, adminKeypair);
        } catch (err) {
            expect(err).toHaveProperty("error");
            expect(err.error.errorCode.code).toEqual("BadOwnerAccount");
        }
    });

    // Add the deleteUser function definition
    it("should fail to delete the user by user himself", async () => {
        const userWallet = await createUserWalletWithSol();
        const userData = userData1;

        const userPda = await createUser(userData, userWallet);

        // Fetch the created user profile to delete
        const fetchUserAccount = await program.account.user.fetch(userPda);

        // Delete the user profile
        try {
            await deleteUser(userPda, fetchUserAccount.owner, userWallet);
        } catch (err) {
            expect(err).toHaveProperty("error");
            expect(err.error.errorCode.code).toEqual("Unauthorized");
        }
    });

    it("should fail to delete the user by another user", async () => {
        const userWallet = await createUserWalletWithSol();
        const userData = userData2;

        const userPda = await createUser(userData, userWallet);

        // Fetch the created user profile to delete
        const fetchUserAccount = await program.account.user.fetch(userPda);

        // Delete the user profile
        try {
            const anotherWallet = await createUserWalletWithSol();
            await deleteUser(userPda, fetchUserAccount.owner, anotherWallet);
        } catch (err) {
            expect(err).toHaveProperty("error");
            expect(err.error.errorCode.code).toEqual("Unauthorized");
        }
    });

    it("should fail to delete the user by admin if the user has created a project", async () => {
        const userWallet = await createUserWalletWithSol();
        const userData = userData1;

        const userPda = await createUser(userData, userWallet);
        // Create a project for the user
        const projectPda = await createProject(projectData1, 0, userPda, userWallet);

        const fetchUserAccount = await program.account.user.fetch(userPda);

        // Attempt to delete the user profile
        try {
            await deleteUser(userPda, fetchUserAccount.owner, adminKeypair);
        } catch (err) {
            expect(err).toHaveProperty("error");
            expect(err.error.errorCode.code).toEqual("UserHasActivity"); // Assuming this error code exists
        }
    });
});
