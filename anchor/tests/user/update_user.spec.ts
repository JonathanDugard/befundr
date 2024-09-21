import { Keypair, PublicKey } from "@solana/web3.js";
import { User } from './user_type';
import { userData1, userData2, userData3 } from './user_dataset';
import { confirmTransaction, createUser, createUserWalletWithSol } from '../utils';
import { program, systemProgram } from '../config';

describe('updateUser', () => {
    const updateUser = async (userPda: PublicKey, newUser: User, userWallet: Keypair): Promise<PublicKey> => {
        // Call the createUser method
        const createUserTx = await program.methods
            .updateUser(
                newUser.name ?? null,
                newUser.avatar_url ?? null,
                newUser.bio ?? null,
                newUser.city ?? null,
            )
            .accountsPartial({
                owner: userWallet.publicKey,
                user: userPda,
                systemProgram: systemProgram.programId,
            })
            .signers([userWallet])
            .rpc();
        await confirmTransaction(program, createUserTx);
        return userPda;
    }

    it("should update the user's metadata", async () => {
        const userWallet = await createUserWalletWithSol();
        const expectedData = {
            name: "James",
            avatar_url: "https://example.com/avatars/james.jpg",
            bio: "Blockchain enthusiast and Solana advisor",
            city: "Solana Beach"
        }
        const userPda = await createUser(userData1, userWallet);

        await updateUser(userPda, expectedData, userWallet);

        // Fetch the created user profile
        const user = await program.account.user.fetch(userPda);

        // Assert that the user profile was created correctly
        expect(user.owner.toString()).toEqual(userWallet.publicKey.toString());
        expect(user.name).toEqual(expectedData.name);
        expect(user.avatarUrl).toEqual(expectedData.avatar_url);
        expect(user.bio).toEqual(expectedData.bio);
        expect(user.city).toEqual(expectedData.city);
        expect(user.createdProjectCounter).toEqual(0);
    });

    it("should clean the user's metadata", async () => {
        const userWallet = await createUserWalletWithSol();
        const expectedData = {
            name: "",
            avatar_url: "",
            bio: "",
            city: ""
        }
        const userPda = await createUser(userData1, userWallet);

        await updateUser(userPda, expectedData, userWallet);

        // Fetch the created user profile
        const user = await program.account.user.fetch(userPda);

        // Assert that the user profile was created correctly
        expect(user.owner.toString()).toEqual(userWallet.publicKey.toString());
        expect(user.name).toBeNull();
        expect(user.avatarUrl).toBeNull();
        expect(user.bio).toBeNull();
        expect(user.city).toBeNull();
        expect(user.createdProjectCounter).toEqual(0);
    });
});
