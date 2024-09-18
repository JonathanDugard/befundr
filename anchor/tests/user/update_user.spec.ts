import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { LAMPORTS_PER_SOL, Keypair, PublicKey } from "@solana/web3.js";
import { User } from './user_type';
import { usersDataset } from './users_dataset';
import { Befundr } from '../../target/types/befundr';
import { confirmTransaction, INIT_BALANCE } from '../utils';
import { isContext } from 'vm';

describe('updateUser', () => {
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

    const updateUser = async (userPda: PublicKey, newUser: User, userWallet: Keypair): Promise<PublicKey> => {
        // Call the createUser method
        const createUserTx = await program.methods
            .updateUser(
                newUser.name ?? null,
                newUser.avatar_url ?? null,
                newUser.bio ?? null,
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
        const userData = usersDataset[0];
        const expectedData = {
            name: "James",
            avatar_url: "https://example.com/avatars/james.jpg",
            bio: "Blockchain enthusiast and Solana advisor"
        }
        const userPda = await createUser(userData, userWallet);

        await updateUser(userPda, expectedData, userWallet);

        // Fetch the created user profile
        const user = await program.account.user.fetch(userPda);

        // Assert that the user profile was created correctly
        expect(user.owner.toString()).toEqual(userWallet.publicKey.toString());
        expect(user.name).toEqual(expectedData.name);
        expect(user.avatarUrl).toEqual(expectedData.avatar_url);
        expect(user.bio).toEqual(expectedData.bio);
        expect(user.createdProjectCounter).toEqual(0);
    });

    it("should clean the user's metadata", async () => {
        const userWallet = await createUserWalletWithSol();
        const userData = usersDataset[0];
        const expectedData = {
            name: "",
            avatar_url: "",
            bio: ""
        }
        const userPda = await createUser(userData, userWallet);

        await updateUser(userPda, expectedData, userWallet);

        // Fetch the created user profile
        const user = await program.account.user.fetch(userPda);

        // Assert that the user profile was created correctly
        expect(user.owner.toString()).toEqual(userWallet.publicKey.toString());
        expect(user.name).toBeNull();
        expect(user.avatarUrl).toBeNull();
        expect(user.bio).toBeNull();
        expect(user.createdProjectCounter).toEqual(0);
    });
});
