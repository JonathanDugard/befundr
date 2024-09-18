import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair, PublicKey } from "@solana/web3.js";
import { User } from './user_type';
import { usersDataset } from './users_dataset';
import { Befundr } from '../../target/types/befundr';
import { confirmTransaction, INIT_BALANCE } from '../utils';

describe('deleteUser', () => {
    // Reference to Solana's System Program, used for creating accounts and other system-level operations
    const systemProgram = anchor.web3.SystemProgram;

    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.Befundr as Program<Befundr>;

    const createUserWalletWithSol = async (): Promise<Keypair> => {
        const wallet = new Keypair()
        const tx = await program.provider.connection.requestAirdrop(wallet.publicKey, INIT_BALANCE);
        await confirmTransaction(program, tx);
        return wallet;
    }

    // Modify the createUser function
    const createUser = async (userData: User, wallet: Keypair): Promise<PublicKey> => {
        const [userPdaPublicKey] = await anchor.web3.PublicKey.findProgramAddressSync(
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

    // Add the deleteUser function definition
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
        console.log(signature);
    };

    it("should fail to delete the user by user himself", async () => {
        const userWallet = await createUserWalletWithSol();
        const userData = usersDataset[0];

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
        const userData = usersDataset[0];

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

    // Add test with user that has associated projects or contributions
    // Add test with admin user account
});
