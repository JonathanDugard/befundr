import { Keypair, PublicKey } from "@solana/web3.js";
import { userData1, userData2, userData3 } from './user_dataset';
import { projectData1 } from "../project/project_dataset";
import { confirmTransaction, createUser, createUserWalletWithSol, createProject } from '../utils';
import { program, systemProgram } from '../config';
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
    const deleteUser = async (userPda: PublicKey, authorityWallet: Keypair): Promise<void> => {
        // Implement the logic to delete the user
        const deleteUserTx = await program.methods
            .deleteUser()
            .accountsPartial({
                user: userPda,
                authority: authorityWallet.publicKey,
                systemProgram: systemProgram.programId,
            })
            .signers([authorityWallet])
            .rpc();
        const signature = await confirmTransaction(program, deleteUserTx);
    };

    it("should success to delete the user by admin", async () => {
        const userWallet = await createUserWalletWithSol();
        
        const userData = userData1;

        const userPda = await createUser(userData, userWallet);

        await deleteUser(userPda, adminKeypair);

        try {
            await program.account.user.fetch(userPda);
        } catch (err) {
            expect(err.message).toContain("Account does not exist");
        }
    });

    // Add the deleteUser function definition
    it("should fail to delete the user by user himself", async () => {
        const userWallet = await createUserWalletWithSol();
        const userData = userData1;

        const userPda = await createUser(userData, userWallet);

        // Fetch the created user profile to delete
        const user = await program.account.user.fetch(userPda);

        // Delete the user profile
        try {
            await deleteUser(userPda, userWallet);
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
        const user = await program.account.user.fetch(userPda);

        // Delete the user profile
        try {
            const anotherWallet = await createUserWalletWithSol();
            await deleteUser(userPda, anotherWallet);
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

        // Attempt to delete the user profile
        try {
            await deleteUser(userPda, adminKeypair);
        } catch (err) {
            expect(err).toHaveProperty("error");
            expect(err.error.errorCode.code).toEqual("UserHasActivity"); // Assuming this error code exists
        }
    });

    // Add test with admin user account
});
