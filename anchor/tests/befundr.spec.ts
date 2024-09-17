import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { LAMPORTS_PER_SOL, Keypair, PublicKey } from "@solana/web3.js";
import { User } from './user_type';
import { usersDataset } from './users_dataset';
import { Befundr } from '../target/types/befundr';

describe('befundr', () => {

  // Reference to Solana's System Program, used for creating accounts and other system-level operations
  const systemProgram = anchor.web3.SystemProgram;

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Befundr as Program<Befundr>;

  const createUserWalletWithSol = async () : Promise<Keypair> => {
    const wallet = new Keypair()
    const tx = await program.provider.connection.requestAirdrop(wallet.publicKey, 1000 * LAMPORTS_PER_SOL);
    await program.provider.connection.confirmTransaction(tx);
    return wallet
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
    await program.provider.connection.confirmTransaction(createUserTx);
    return userPdaPublicKey;
  }

  it("Creates 3 users with predefined data", async () => {
    for (let i = 0; i < 3; i++) {
      const userWallet = await createUserWalletWithSol();
      const userData = usersDataset[i];

      const userProfilePda = await createUser(userData, userWallet);

      // Fetch the created user profile
      const userProfile = await program.account.userProfile.fetch(userProfilePda);

      // Assert that the user profile was created correctly
      expect(userProfile.walletPubkey.toString()).toEqual(userWallet.publicKey.toString());
      expect(userProfile.name).toEqual(userData.name ?? null);
      expect(userProfile.avatarUrl).toEqual(userData.avatar_url ?? null);
      expect(userProfile.bio).toEqual(userData.bio ?? null);
      expect(userProfile.createdProjectCounter).toEqual(0);

      console.log(`User ${i + 1} created:`, {
        wallet: userProfile.walletPubkey.toString(),
        name: userProfile.name,
        avatarUrl: userProfile.avatarUrl,
        bio: userProfile.bio,
        createdProjectCounter: userProfile.createdProjectCounter,
      });
    }
  });

  it("Creates 2 users with empty data", async () => {
    for (let i = 0; i < 2; i++) {
      const userWallet = await createUserWalletWithSol();

      const userProfilePda = await createUser({}, userWallet);

      // Fetch the created user profile
      const userProfile = await program.account.userProfile.fetch(userProfilePda);

      // Assert that the user profile was created correctly
      expect(userProfile.walletPubkey.toString()).toEqual(userWallet.publicKey.toString());
      expect(userProfile.name).toBeNull();
      expect(userProfile.avatarUrl).toBeNull();
      expect(userProfile.bio).toBeNull();
      expect(userProfile.createdProjectCounter).toEqual(0);

      console.log(`User ${i + 1} created:`, {
        wallet: userProfile.walletPubkey.toString(),
        name: userProfile.name,
        avatarUrl: userProfile.avatarUrl,
        bio: userProfile.bio,
        createdProjectCounter: userProfile.createdProjectCounter,
      });
    }
  });
  
});
